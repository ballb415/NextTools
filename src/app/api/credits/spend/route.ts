import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { spendCredits, InsufficientCreditsError } from "@/lib/credits/creditManager";
import { getToolCreditCost } from "@/config/credits";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "กรุณาเข้าสู่ระบบก่อนใช้งานฟีเจอร์นี้" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { toolId, reason } = body;

    if (!toolId) {
      return NextResponse.json(
        { error: "จำเป็นต้องระบุรหัสเครื่องมือ (toolId is required)" },
        { status: 400 }
      );
    }

    // Always determine credit cost server-side from centralized configuration
    const creditCost = getToolCreditCost(toolId);
    const actionReason = reason || `ใช้งานเครื่องมือ: ${toolId}`;

    const result = await spendCredits(user.id, creditCost, actionReason, toolId);

    return NextResponse.json({
      success: true,
      balanceAfter: result.balanceAfter,
      creditsUsed: creditCost,
      transactionId: result.transaction?.id ?? null,
    });
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json(
        { error: error.message, code: "INSUFFICIENT_CREDITS" },
        { status: 402 }
      );
    }

    console.error("Error spending credits:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการประมวลผลเครดิต กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
