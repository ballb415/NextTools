import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E8DAC8]/40" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/90 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF9F6] border border-black/[0.06] text-text-primary text-xs font-semibold mb-5 font-thai shadow-xs">
            <Zap className="w-3.5 h-3.5 text-brand-charcoal" />
            <span>เริ่มต้นฟรี ไม่มีค่าใช้จ่ายแอบแฝง</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary font-thai leading-tight">
            พร้อมเปลี่ยนงานเอกสารและรูปภาพ <br className="hidden sm:inline" />
            ให้เป็น เรื่องง่าย แล้วหรือยัง?
          </h2>

          <p className="mt-4 text-sm sm:text-base text-text-secondary font-thai max-w-xl mx-auto leading-relaxed">
            เข้าร่วมกับผู้ใช้งานทั่วไป ฟรีแลนซ์ และครีเอเตอร์ชาวไทยที่ไว้วางใจ NEXT TOOLS เพื่อประหยัดเวลาการทำงานทุกวัน
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/tools" className="w-full sm:w-auto">
              <Button
                variant="yellow"
                size="lg"
                className="w-full sm:w-auto font-thai shadow-pill"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                เริ่มใช้งานฟรีทันที
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto font-thai"
              >
                ดูรายละเอียดแพ็กเกจ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
