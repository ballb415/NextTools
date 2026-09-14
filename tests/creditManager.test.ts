import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import {
  getOrCreateWallet,
  getBalance,
  addCredits,
  spendCredits,
  refundCredits,
  claimDailyFreeCredits,
  getTransactions,
  hasEnoughCredits,
  InsufficientCreditsError,
} from "@/lib/credits/creditManager";
import { FREE_DAILY_CREDITS, INITIAL_SIGNUP_CREDITS } from "@/config/credits";

describe("Credit Engine & Wallet Operations", () => {
  let testUserId: string;

  beforeEach(async () => {
    // Create a unique test user for each test case
    const testUser = await prisma.user.create({
      data: {
        name: `Test User ${Date.now()}`,
        email: `test_${Date.now()}_${Math.random().toString(36).substring(7)}@test.com`,
        role: "USER",
        plan: "FREE",
      },
    });
    testUserId = testUser.id;
  });

  it("1. New user receives wallet with initial signup credits", async () => {
    const wallet = await getOrCreateWallet(testUserId);
    expect(wallet).toBeDefined();
    expect(wallet.userId).toBe(testUserId);
    expect(wallet.balance).toBe(INITIAL_SIGNUP_CREDITS);

    const balance = await getBalance(testUserId);
    expect(balance).toBe(INITIAL_SIGNUP_CREDITS);
  });

  it("2. Add credits increases balance and records transaction", async () => {
    await getOrCreateWallet(testUserId);
    const initialBalance = await getBalance(testUserId);

    const result = await addCredits(
      testUserId,
      50,
      "ซื้อแพ็กเกจ 50 เครดิต",
      "PURCHASE",
      "REF-12345"
    );

    expect(result.success).toBe(true);
    expect(result.balanceAfter).toBe(initialBalance + 50);

    const newBalance = await getBalance(testUserId);
    expect(newBalance).toBe(initialBalance + 50);

    const txs = await getTransactions(testUserId);
    const purchaseTx = txs.find((t) => t.type === "PURCHASE");
    expect(purchaseTx).toBeDefined();
    expect(purchaseTx?.amount).toBe(50);
    expect(purchaseTx?.referenceId).toBe("REF-12345");
  });

  it("3. Spend credits decreases balance and records tool usage", async () => {
    await getOrCreateWallet(testUserId);
    const initialBalance = await getBalance(testUserId);

    const result = await spendCredits(
      testUserId,
      2,
      "ใช้งาน AI ขัดเกลาภาษาไทย",
      "ai-thai-refiner"
    );

    expect(result.success).toBe(true);
    expect(result.balanceAfter).toBe(initialBalance - 2);

    const newBalance = await getBalance(testUserId);
    expect(newBalance).toBe(initialBalance - 2);

    // Verify transaction ledger
    const txs = await getTransactions(testUserId);
    const spendTx = txs.find((t) => t.type === "SPEND");
    expect(spendTx).toBeDefined();
    expect(spendTx?.amount).toBe(-2);
    expect(spendTx?.balanceBefore).toBe(initialBalance);
    expect(spendTx?.balanceAfter).toBe(initialBalance - 2);

    // Verify tool usage logged
    const usages = await prisma.toolUsage.findMany({
      where: { userId: testUserId, toolId: "ai-thai-refiner" },
    });
    expect(usages.length).toBe(1);
    expect(usages[0].creditsUsed).toBe(2);
  });

  it("4. Cannot spend more than balance (throws InsufficientCreditsError)", async () => {
    await getOrCreateWallet(testUserId);
    const currentBalance = await getBalance(testUserId);

    // Attempt to spend more credits than available
    const excessiveAmount = currentBalance + 500;

    await expect(
      spendCredits(
        testUserId,
        excessiveAmount,
        "พยายามใช้เครดิตเกินจำนวนที่มี",
        "pdf-merger"
      )
    ).rejects.toThrow(InsufficientCreditsError);

    // Verify balance remains unchanged
    const finalBalance = await getBalance(testUserId);
    expect(finalBalance).toBe(currentBalance);
  });

  it("5. Refund credits increases balance and creates REFUND transaction", async () => {
    await getOrCreateWallet(testUserId);
    await spendCredits(testUserId, 4, "งานทดสอบก่อนคืนเงิน", "pdf-merger");
    const balanceBeforeRefund = await getBalance(testUserId);

    const result = await refundCredits(
      testUserId,
      4,
      "คืนเงินเนื่องจากเกิดข้อผิดพลาดในการประมวลผล",
      "JOB-ERR-99"
    );

    expect(result.success).toBe(true);
    expect(result.balanceAfter).toBe(balanceBeforeRefund + 4);

    const txs = await getTransactions(testUserId);
    const refundTx = txs.find((t) => t.type === "REFUND");
    expect(refundTx).toBeDefined();
    expect(refundTx?.amount).toBe(4);
    expect(refundTx?.referenceId).toBe("JOB-ERR-99");
  });

  it("6. Transaction history is append-only and retains accurate ledger balances", async () => {
    await getOrCreateWallet(testUserId);
    await addCredits(testUserId, 20, "เติมเครดิตรอบ 1", "PURCHASE");
    await spendCredits(testUserId, 5, "ตัดเครดิตรอบ 1", "pdf-merger");
    await spendCredits(testUserId, 3, "ตัดเครดิตรอบ 2", "ai-thai-refiner");

    const txs = await getTransactions(testUserId);
    expect(txs.length).toBeGreaterThanOrEqual(4);

    // Transactions are ordered desc by createdAt
    const latestTx = txs[0];
    expect(latestTx.type).toBe("SPEND");
    expect(latestTx.amount).toBe(-3);
  });

  it("7. Concurrent spending protection prevents race condition overdraft", async () => {
    // Set user balance to exactly 5 credits
    await prisma.creditWallet.upsert({
      where: { userId: testUserId },
      update: { balance: 5 },
      create: { userId: testUserId, balance: 5 },
    });

    // Fire 2 simultaneous requests each requesting to spend 3 credits (total 6 > 5)
    const results = await Promise.allSettled([
      spendCredits(testUserId, 3, "Concurrent Request 1", "tool-1"),
      spendCredits(testUserId, 3, "Concurrent Request 2", "tool-2"),
    ]);

    const fulfilled = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r) => r.status === "rejected");

    // Exactly one must succeed and one must fail
    expect(fulfilled.length).toBe(1);
    expect(rejected.length).toBe(1);

    // Final balance must be 2 (5 - 3), never negative
    const finalBalance = await getBalance(testUserId);
    expect(finalBalance).toBe(2);
    expect(finalBalance).toBeGreaterThanOrEqual(0);
  });

  it("8. Free daily credit logic grants allowance once per calendar day", async () => {
    // Set user's lastDailyCreditAt to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await prisma.user.update({
      where: { id: testUserId },
      data: { lastDailyCreditAt: yesterday, plan: "FREE" },
    });

    await prisma.creditWallet.upsert({
      where: { userId: testUserId },
      update: { balance: 0 },
      create: { userId: testUserId, balance: 0 },
    });

    // 1st claim today -> Granted
    const firstClaim = await claimDailyFreeCredits(testUserId);
    expect(firstClaim.granted).toBe(true);
    expect(firstClaim.balance).toBe(FREE_DAILY_CREDITS);

    // 2nd claim today -> Already claimed (not granted again)
    const secondClaim = await claimDailyFreeCredits(testUserId);
    expect(secondClaim.granted).toBe(false);
    expect(secondClaim.balance).toBe(FREE_DAILY_CREDITS);
  });
});
