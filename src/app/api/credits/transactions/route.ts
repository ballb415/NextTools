import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { getTransactions } from "@/lib/credits/creditManager";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "กรุณาเข้าสู่ระบบก่อนทำรายการ" },
        { status: 401 }
      );
    }

    const transactions = await getTransactions(user.id, 50);

    return NextResponse.json({
      transactions,
    });
  } catch (error) {
    console.error("Error fetching credit transactions:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลประวัติเครดิตได้ในขณะนี้" },
      { status: 500 }
    );
  }
}
