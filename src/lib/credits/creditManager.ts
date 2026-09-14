import { prisma } from "@/lib/prisma";
import { FREE_DAILY_CREDITS, INITIAL_SIGNUP_CREDITS } from "@/config/credits";

export class InsufficientCreditsError extends Error {
  constructor(message = "ยอดเครดิตของคุณไม่เพียงพอสำหรับการทำรายการนี้") {
    super(message);
    this.name = "InsufficientCreditsError";
  }
}

export type TransactionType =
  | "EARN"
  | "SPEND"
  | "REFUND"
  | "BONUS"
  | "PURCHASE"
  | "EXPIRE"
  | "ADJUSTMENT";

/**
 * Ensures a user has a credit wallet. If not, creates one with initial signup credits.
 */
export async function getOrCreateWallet(userId: string) {
  let wallet = await prisma.creditWallet.findUnique({
    where: { userId },
  });

  if (!wallet) {
    wallet = await prisma.$transaction(async (tx) => {
      const createdWallet = await tx.creditWallet.create({
        data: {
          userId,
          balance: INITIAL_SIGNUP_CREDITS,
        },
      });

      await tx.creditTransaction.create({
        data: {
          userId,
          type: "BONUS",
          amount: INITIAL_SIGNUP_CREDITS,
          balanceBefore: 0,
          balanceAfter: INITIAL_SIGNUP_CREDITS,
          reason: "โบนัสต้อนรับสมาชิกใหม่ (Welcome Bonus Credits)",
        },
      });

      await tx.user.update({
        where: { id: userId },
        data: { lastDailyCreditAt: new Date() },
      });

      return createdWallet;
    });
  }

  return wallet;
}

/**
 * Retrieves the current balance for a user.
 */
export async function getBalance(userId: string): Promise<number> {
  const wallet = await getOrCreateWallet(userId);
  return wallet.balance;
}

/**
 * Checks if the user has at least `amount` credits.
 */
export async function hasEnoughCredits(userId: string, amount: number): Promise<boolean> {
  if (amount <= 0) return true;
  const balance = await getBalance(userId);
  return balance >= amount;
}

/**
 * Server-side daily credit allowance grant.
 * Checks whether user has already received daily credits today.
 */
export async function claimDailyFreeCredits(userId: string): Promise<{ granted: boolean; balance: number }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { wallet: true },
  });

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const wallet = user.wallet ?? (await getOrCreateWallet(userId));

  // If user is not on FREE plan, daily allowance logic may differ (PRO gets monthly credits)
  if (user.plan !== "FREE") {
    return { granted: false, balance: wallet.balance };
  }

  const now = new Date();
  const lastGrant = user.lastDailyCreditAt;

  const isSameDay =
    lastGrant &&
    lastGrant.getUTCFullYear() === now.getUTCFullYear() &&
    lastGrant.getUTCMonth() === now.getUTCMonth() &&
    lastGrant.getUTCDate() === now.getUTCDate();

  if (isSameDay) {
    return { granted: false, balance: wallet.balance };
  }

  // Grant daily credits atomically
  const result = await prisma.$transaction(async (tx) => {
    const currentWallet = await tx.creditWallet.findUnique({
      where: { userId },
    });

    const balanceBefore = currentWallet ? currentWallet.balance : 0;
    const balanceAfter = balanceBefore + FREE_DAILY_CREDITS;

    const updatedWallet = await tx.creditWallet.upsert({
      where: { userId },
      update: { balance: balanceAfter },
      create: { userId, balance: balanceAfter },
    });

    await tx.creditTransaction.create({
      data: {
        userId,
        type: "EARN",
        amount: FREE_DAILY_CREDITS,
        balanceBefore,
        balanceAfter,
        reason: "เครดิตฟรีประจำวัน (Daily Free Credit Allowance)",
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { lastDailyCreditAt: now },
    });

    return { granted: true, balance: updatedWallet.balance };
  });

  return result;
}

/**
 * Atomically spends credits from a user's wallet with concurrency protection.
 * Prevents double spending and negative balances.
 */
export async function spendCredits(
  userId: string,
  amount: number,
  reason: string,
  toolId?: string,
  referenceId?: string
) {
  if (amount < 0) {
    throw new Error("Spend amount must be non-negative.");
  }

  if (amount === 0) {
    // 0 credit tools (e.g. Free image compressor) - record tool usage if toolId present
    if (toolId) {
      await prisma.toolUsage.create({
        data: {
          userId,
          toolId,
          creditsUsed: 0,
        },
      });
    }
    const balance = await getBalance(userId);
    return { success: true, balanceAfter: balance, transaction: null };
  }

  return await prisma.$transaction(async (tx) => {
    // Read current wallet inside transaction
    const wallet = await tx.creditWallet.findUnique({
      where: { userId },
    });

    const currentBalance = wallet ? wallet.balance : 0;

    if (currentBalance < amount) {
      throw new InsufficientCreditsError(
        `ยอดเครดิตของคุณไม่เพียงพอ (ต้องการ ${amount} เครดิต แต่มีอยู่ ${currentBalance} เครดิต)`
      );
    }

    const balanceAfter = currentBalance - amount;

    // Update wallet balance
    const updatedWallet = await tx.creditWallet.update({
      where: { userId },
      data: { balance: balanceAfter },
    });

    // Create append-only ledger record
    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        type: "SPEND",
        amount: -amount,
        balanceBefore: currentBalance,
        balanceAfter,
        reason,
        referenceId,
      },
    });

    // If a tool was used, log the usage analytics
    if (toolId) {
      await tx.toolUsage.create({
        data: {
          userId,
          toolId,
          creditsUsed: amount,
        },
      });
    }

    return {
      success: true,
      balanceAfter: updatedWallet.balance,
      transaction,
    };
  });
}

/**
 * Atomically adds credits to a user's wallet (e.g. Purchase, Bonus, Adjustment).
 */
export async function addCredits(
  userId: string,
  amount: number,
  reason: string,
  type: TransactionType = "PURCHASE",
  referenceId?: string
) {
  if (amount <= 0) {
    throw new Error("Credit addition amount must be greater than zero.");
  }

  return await prisma.$transaction(async (tx) => {
    const wallet = await tx.creditWallet.findUnique({
      where: { userId },
    });

    const balanceBefore = wallet ? wallet.balance : 0;
    const balanceAfter = balanceBefore + amount;

    const updatedWallet = await tx.creditWallet.upsert({
      where: { userId },
      update: { balance: balanceAfter },
      create: { userId, balance: balanceAfter },
    });

    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        type,
        amount,
        balanceBefore,
        balanceAfter,
        reason,
        referenceId,
      },
    });

    return {
      success: true,
      balanceAfter: updatedWallet.balance,
      transaction,
    };
  });
}

/**
 * Atomically refunds credits back to a user's wallet.
 */
export async function refundCredits(
  userId: string,
  amount: number,
  reason: string,
  referenceId?: string
) {
  if (amount <= 0) {
    throw new Error("Refund amount must be greater than zero.");
  }

  return await prisma.$transaction(async (tx) => {
    const wallet = await tx.creditWallet.findUnique({
      where: { userId },
    });

    const balanceBefore = wallet ? wallet.balance : 0;
    const balanceAfter = balanceBefore + amount;

    const updatedWallet = await tx.creditWallet.update({
      where: { userId },
      data: { balance: balanceAfter },
    });

    const transaction = await tx.creditTransaction.create({
      data: {
        userId,
        type: "REFUND",
        amount,
        balanceBefore,
        balanceAfter,
        reason,
        referenceId,
      },
    });

    return {
      success: true,
      balanceAfter: updatedWallet.balance,
      transaction,
    };
  });
}

/**
 * Retrieves append-only transaction ledger records for a user.
 */
export async function getTransactions(userId: string, limit = 50) {
  return await prisma.creditTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/**
 * Retrieves tool usage analytics for a user.
 */
export async function getToolUsages(userId: string, limit = 50) {
  return await prisma.toolUsage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
