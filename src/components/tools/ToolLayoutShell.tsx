import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { IconResolver } from "@/components/ui/IconResolver";
import { ChevronRight, ShieldCheck, Zap, ArrowLeft } from "lucide-react";

interface ToolLayoutShellProps {
  name: string;
  nameEn: string;
  categoryName: string;
  description: string;
  iconName: string;
  creditCost: number;
  badge?: string;
  children: React.ReactNode;
}

export function ToolLayoutShell({
  name,
  nameEn,
  categoryName,
  description,
  iconName,
  creditCost,
  badge,
  children,
}: ToolLayoutShellProps) {
  return (
    <div className="min-h-screen bg-bg-dark py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6 font-thai">
          <Link href="/" className="hover:text-text-primary transition-colors">
            หน้าแรก
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-text-primary transition-colors">
            เครื่องมือ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-primary font-medium">{name}</span>
        </div>

        {/* Tool Header Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 mb-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] flex items-center justify-center text-brand-charcoal shrink-0 shadow-xs">
                <IconResolver name={iconName} className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-thai">
                    {name}
                  </h1>
                  {badge && (
                    <Badge variant="yellow" size="sm">
                      {badge}
                    </Badge>
                  )}
                  <Badge variant="muted" size="sm">
                    {categoryName}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-text-muted font-english font-medium">
                  {nameEn}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary font-thai leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
            </div>

            {/* Credit Cost Badge */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-black/[0.06] gap-1.5 shrink-0">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF9F6] border border-black/[0.06] text-xs font-thai shadow-xs">
                <Zap className="w-3.5 h-3.5 text-brand-charcoal" />
                <span className="text-text-secondary">ค่าบริการ:</span>
                <span className="font-bold text-text-primary">
                  {creditCost === 0 ? "ฟรี 0 เครดิต" : `${creditCost} เครดิต`}
                </span>
              </div>
              <span className="text-[11px] text-text-muted flex items-center gap-1 font-thai">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>ลบไฟล์ทันทีหลังใช้งาน</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Workspace Container */}
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-8 shadow-card">
          {children}
        </div>

        {/* Footer info note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted font-thai gap-2">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>กลับไปหน้ารวมเครื่องมือ</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>ประมวลผลบนหน่วยความจำชั่วคราว ปลอดภัย 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
