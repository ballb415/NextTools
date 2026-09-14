import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@nexttools.co" },
    update: { role: "ADMIN", plan: "PRO" },
    create: {
      name: "Admin NextTools",
      email: "admin@nexttools.co",
      role: "ADMIN",
      plan: "PRO",
      password: hashedPassword,
      lastDailyCreditAt: new Date(),
    },
  });

  await prisma.creditWallet.upsert({
    where: { userId: admin.id },
    update: { balance: 9999 },
    create: {
      userId: admin.id,
      balance: 9999,
    },
  });

  // 2. Create Standard Free User
  const freeUser = await prisma.user.upsert({
    where: { email: "user@nexttools.co" },
    update: { role: "USER", plan: "FREE" },
    create: {
      name: "Somchai Developer",
      email: "user@nexttools.co",
      role: "USER",
      plan: "FREE",
      password: hashedPassword,
      lastDailyCreditAt: new Date(),
    },
  });

  const freeWallet = await prisma.creditWallet.upsert({
    where: { userId: freeUser.id },
    update: { balance: 10 },
    create: {
      userId: freeUser.id,
      balance: 10,
    },
  });

  // Add initial transaction for free user
  const existingTx = await prisma.creditTransaction.findFirst({
    where: { userId: freeUser.id },
  });

  if (!existingTx) {
    await prisma.creditTransaction.create({
      data: {
        userId: freeUser.id,
        type: "EARN",
        amount: 10,
        balanceBefore: 0,
        balanceAfter: 10,
        reason: "เครดิตฟรีประจำวันเริ่มต้น (Free Daily Allowance)",
      },
    });

    await prisma.toolUsage.create({
      data: {
        userId: freeUser.id,
        toolId: "pdf-merger",
        creditsUsed: 1,
      },
    });
  }

  // 3. Create Pro User
  const proUser = await prisma.user.upsert({
    where: { email: "pro@nexttools.co" },
    update: { role: "USER", plan: "PRO" },
    create: {
      name: "Anan Creator",
      email: "pro@nexttools.co",
      role: "USER",
      plan: "PRO",
      password: hashedPassword,
      lastDailyCreditAt: new Date(),
    },
  });

  await prisma.creditWallet.upsert({
    where: { userId: proUser.id },
    update: { balance: 500 },
    create: {
      userId: proUser.id,
      balance: 500,
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: "SYSTEM_INITIALIZED",
      metadata: JSON.stringify({ environment: "development", seededAt: new Date() }),
    },
  });

  console.log("Database seeded successfully!");
  console.log("- Admin: admin@nexttools.co (password123)");
  console.log("- Free User: user@nexttools.co (password123)");
  console.log("- Pro User: pro@nexttools.co (password123)");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
