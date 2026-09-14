import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getBalance, claimDailyFreeCredits } from "@/lib/credits/creditManager";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({
        isLoggedIn: false,
        balance: 10,
        plan: "FREE",
      });
    }

    // Attempt daily free credit claim if eligible
    const dailyResult = await claimDailyFreeCredits(user.id);
    const balance = await getBalance(user.id);

    return NextResponse.json({
      isLoggedIn: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        plan: user.plan,
      },
      balance,
      dailyCreditGranted: dailyResult.granted,
    });
  } catch (error) {
    console.error("Error fetching credit balance:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลเครดิตได้ในขณะนี้" },
      { status: 500 }
    );
  }
}
