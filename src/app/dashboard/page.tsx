import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { claimDailyFreeCredits, getBalance, getTransactions, getToolUsages } from "@/lib/credits/creditManager";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Zap,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Files,
  Image as ImageIcon,
  History,
  QrCode,
  TrendingUp,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    redirect("/login");
  }

  // Ensure daily credits check on server load
  await claimDailyFreeCredits(sessionUser.id);

  // Fetch fresh user data, balance, transactions, and tool usage from database
  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      wallet: true,
    },
  });

  const balance = await getBalance(sessionUser.id);
  const transactions = await getTransactions(sessionUser.id, 10);
  const toolUsages = await getToolUsages(sessionUser.id, 5);

  const isPro = user?.plan === "PRO";

  return (
    <div className="min-h-screen bg-bg-dark py-8 sm:py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-peach/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Welcome & Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-xl border border-white/90 shadow-card rounded-3xl p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-thai">
                สวัสดี, {user?.name || user?.email || "ผู้ใช้งาน"}
              </h1>
              <Badge variant={isPro ? "yellow" : "purple"} size="sm">
                {isPro ? "PRO MEMBER" : "FREE MEMBER"}
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary font-thai">
              อีเมล: {user?.email} • แดชบอร์ดศูนย์กลางจัดการเครดิตและประวัติการทำงานของคุณ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/pricing">
              <Button variant="primary" size="md" className="font-thai shadow-pill" leftIcon={<QrCode className="w-4 h-4 text-brand-yellow" />}>
                {isPro ? "เติมเครดิตเพิ่ม" : "อัปเกรดเป็น Pro"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Credit Box */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-text-secondary font-thai">
                เครดิตคงเหลือ (Balance)
              </span>
              <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-charcoal">
                <Zap className="w-4 h-4 fill-brand-charcoal" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-english text-text-primary tracking-tight">
                {balance}
              </span>
              <span className="text-xs text-text-muted font-thai">
                {isPro ? "เครดิตคงเหลือ" : "/ 10 เครดิตฟรีต่อวัน"}
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-3 font-thai flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-charcoal/60" />
              <span>
                {isPro
                  ? "เครดิตไม่มีวันหมดอายุ"
                  : "รับฟรี 10 เครดิตทุกวันอัตโนมัติเมื่อเข้าใช้งาน"}
              </span>
            </p>
          </div>

          {/* Plan Tier Box */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-text-secondary font-thai">
                สถานะแพ็กเกจปัจจุบัน
              </span>
              <Badge variant={isPro ? "yellow" : "muted"} size="sm">
                {isPro ? "Pro Plan" : "Free Tier"}
              </Badge>
            </div>
            <div className="text-xl font-bold text-text-primary font-thai">
              {isPro ? "แพ็กเกจ Pro ระดับพรีเมียม" : "แพ็กเกจฟรีมาตรฐาน"}
            </div>
            <p className="text-xs text-text-secondary mt-2 font-thai">
              {isPro
                ? "ขนาดไฟล์สูงสุด 100MB • ประมวลผลด่วนพิเศษ"
                : "ขนาดไฟล์สูงสุด 15MB • ความเร็วปกติ"}
            </p>
            {!isPro ? (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal font-bold hover:underline mt-3 font-thai"
              >
                <span>อัปเกรดเป็น Pro ฿149/เดือน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <span className="text-xs text-emerald-600 font-semibold mt-3 block font-thai">
                ✓ สมาชิก Pro พร้อมใช้งานทุกฟีเจอร์
              </span>
            )}
          </div>

          {/* Security Status */}
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-card hover:shadow-card-hover transition-all duration-300 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-text-secondary font-thai">
                ความปลอดภัยไฟล์
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl font-bold text-emerald-600 font-thai">
              ปลอดภัย 100%
            </div>
            <p className="text-xs text-text-secondary mt-2 font-thai">
              ไม่มีไฟล์ตกค้างในระบบ (Zero Permanent Storage)
            </p>
            <span className="text-[11px] text-text-muted mt-3 block font-thai">
              นโยบาย Auto-Delete หลังประมวลผลทันที
            </span>
          </div>
        </div>

        {/* Quick Tools Access */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text-primary font-thai">
            เปิดเครื่องมือด่วน (Quick Launch)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "บีบอัดรูปภาพ", href: "/tools/image-compressor", icon: ImageIcon, color: "text-brand-charcoal" },
              { name: "รวมไฟล์ PDF", href: "/tools/pdf-merger", icon: Files, color: "text-brand-charcoal" },
              { name: "แปลงไฟล์รูปภาพ", href: "/tools/image-converter", icon: TrendingUp, color: "text-brand-charcoal" },
              { name: "AI ภาษาไทย", href: "/tools/ai-thai-refiner", icon: Sparkles, color: "text-brand-charcoal" },
            ].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className="bg-white/80 backdrop-blur-xl border border-white/90 hover:border-brand-charcoal/20 shadow-card hover:shadow-card-hover rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-black/[0.06] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4 text-text-primary" />
                  </div>
                  <span className="text-xs font-bold text-text-primary font-thai group-hover:text-brand-charcoal transition-colors">
                    {tool.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Real Credit Transaction Ledger Table */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-card rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-black/[0.06] flex items-center justify-center">
                <History className="w-4 h-4 text-brand-charcoal" />
              </div>
              <h2 className="text-base font-bold text-text-primary font-thai">
                ประวัติรายการเครดิต (Transaction Ledger)
              </h2>
            </div>
            <span className="text-xs text-text-muted font-thai">
              บันทึกแบบ Append-Only โปร่งใส ตรวจสอบได้
            </span>
          </div>

          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-thai">
                <thead>
                  <tr className="border-b border-black/[0.06] text-text-muted">
                    <th className="pb-3 font-semibold">ประเภทรายการ</th>
                    <th className="pb-3 font-semibold">รายละเอียด / เหตุผล</th>
                    <th className="pb-3 font-semibold text-center">จำนวนเครดิต</th>
                    <th className="pb-3 font-semibold text-center">ยอดก่อน → หลัง</th>
                    <th className="pb-3 font-semibold text-right">เวลาทำรายการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04] text-text-secondary">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            tx.type === "SPEND"
                              ? "bg-rose-50 text-rose-600 border border-rose-200/50"
                              : tx.type === "EARN" || tx.type === "PURCHASE" || tx.type === "BONUS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                              : "bg-stone-100 text-stone-700 border border-stone-200"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3.5 font-medium text-text-primary">
                        {tx.reason}
                      </td>
                      <td className="py-3.5 text-center font-english font-bold">
                        <span
                          className={
                            tx.amount > 0
                              ? "text-emerald-600"
                              : tx.amount < 0
                              ? "text-rose-600"
                              : "text-text-muted"
                          }
                        >
                          {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                        </span>
                      </td>
                      <td className="py-3.5 text-center font-english text-text-muted">
                        {tx.balanceBefore} → <span className="text-text-primary font-bold">{tx.balanceAfter}</span>
                      </td>
                      <td className="py-3.5 text-right text-text-muted font-english">
                        {new Date(tx.createdAt).toLocaleDateString("th-TH", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-text-muted font-thai">
              ยังไม่มีประวัติการทำรายการเครดิต
            </div>
          )}
        </div>

        {/* Tool Usage Records */}
        {toolUsages.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/90 shadow-card rounded-3xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary font-thai">
              <Activity className="w-4 h-4 text-brand-charcoal" />
              <span>ประวัติการเรียกใช้เครื่องมือล่าสุด ({toolUsages.length} รายการ)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {toolUsages.map((usage) => (
                <div
                  key={usage.id}
                  className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-3.5 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-text-primary font-english">{usage.toolId}</p>
                    <p className="text-[11px] text-text-muted font-english">
                      {new Date(usage.createdAt).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Badge variant="yellow" size="sm">
                    {usage.creditsUsed} เครดิต
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
