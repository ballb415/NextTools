import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers, FileCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-black/[0.06]">
      {/* Background Ambient Warm Glows */}
      <div className="ambient-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#E8DAC8]/40" />
      <div className="ambient-glow top-1/4 right-10 w-[350px] h-[220px] bg-[#F5D4CD]/30" />
      <div className="ambient-glow bottom-0 left-10 w-[300px] h-[200px] bg-[#E2D9CC]/30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="purple" size="md" className="py-1 px-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-charcoal" />
            <span className="text-xs font-semibold">แพลตฟอร์มเครื่องมือออนไลน์สำหรับคนไทย 🇹🇭</span>
          </Badge>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary font-thai tracking-tight leading-[1.15] max-w-4xl mx-auto">
          ทำเรื่องยุ่งให้เป็น <br className="hidden sm:inline" />
          <span className="text-text-primary">
            เรื่องง่าย
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary font-thai max-w-2xl mx-auto leading-relaxed">
          เครื่องมือออนไลน์สำหรับจัดการไฟล์ PDF รูปภาพ และงาน AI ในที่เดียว
          รวดเร็ว ปลอดภัย และใช้งานได้ทันทีโดยไม่ต้องติดตั้งโปรแกรม
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link href="/tools" className="w-full sm:w-auto">
            <Button
              variant="yellow"
              size="lg"
              className="w-full sm:w-auto font-thai shadow-pill"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              ลองใช้เครื่องมือฟรี
            </Button>
          </Link>
          <Link href="/tools" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto font-thai"
              leftIcon={<Layers className="w-4 h-4 text-text-muted" />}
            >
              ดูเครื่องมือทั้งหมด
            </Button>
          </Link>
        </div>

        {/* Value Highlights in Frosted Glass */}
        <div className="mt-14 pt-8 border-t border-black/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-thai text-text-secondary">
          <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/90 py-3 px-3 rounded-2xl shadow-xs">
            <Zap className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span className="font-medium">ฟรี 10 เครดิตทุกวัน</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/90 py-3 px-3 rounded-2xl shadow-xs">
            <ShieldCheck className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span className="font-medium">ลบไฟล์ทันทีหลังใช้งาน</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/90 py-3 px-3 rounded-2xl shadow-xs">
            <FileCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-medium">ไม่จำกัดสำหรับ Pro</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/70 backdrop-blur-md border border-white/90 py-3 px-3 rounded-2xl shadow-xs">
            <span className="font-english font-bold text-text-primary">PromptPay</span>
            <span className="font-medium">จ่ายง่าย QR ไทย</span>
          </div>
        </div>
      </div>
    </section>
  );
}
