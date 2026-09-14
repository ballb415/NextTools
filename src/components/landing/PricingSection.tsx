"use client";

import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { PRICING_PLANS } from "@/config/pricing";
import { PricingPlan } from "@/types";
import { Check, Zap, QrCode, ShieldCheck, ArrowRight } from "lucide-react";
import { cn, formatThaiCurrency } from "@/lib/utils";

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isPromptPayModalOpen, setIsPromptPayModalOpen] = useState(false);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPromptPayModalOpen(true);
  };

  return (
    <section id="pricing" className="py-16 md:py-24 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="แพ็กเกจราคา"
          badgeVariant="purple"
          title="เลือกแผนที่เหมาะกับคุณ ชำระง่ายผ่าน PromptPay"
          description="ใช้งานฟรีทุกวัน หรืออัปเกรดเป็น Pro เพื่อปลดล็อกความเร็วและขนาดไฟล์สูงสุด"
        />

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-card hover:shadow-card-hover",
                  isPro
                    ? "bg-white border-2 border-brand-charcoal shadow-lg"
                    : "bg-white/80 backdrop-blur-xl border border-white/90 hover:bg-white"
                )}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant={isPro ? "yellow" : "purple"} size="md" className="shadow-xs px-3.5 py-0.5">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tag */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-text-primary font-thai">
                      {plan.name}
                    </h3>
                    <span className="text-xs text-text-muted font-english">
                      {plan.nameEn}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-text-primary font-english">
                      {plan.price === 0 ? "฿0" : `฿${plan.price}`}
                    </span>
                    <span className="text-xs text-text-muted font-thai">
                      {plan.period === "month" ? "/ เดือน" : "/ ครั้งเดียว"}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary font-thai leading-relaxed mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 pt-4 border-t border-black/[0.05] text-xs font-thai text-text-secondary">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  variant={isPro ? "yellow" : plan.price === 0 ? "outline" : "primary"}
                  size="md"
                  onClick={() => handleSelectPlan(plan)}
                  className="w-full font-thai"
                  rightIcon={plan.price > 0 ? <QrCode className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                >
                  {plan.ctaText}
                </Button>
              </div>
            );
          })}
        </div>

        {/* PromptPay Info Footnote */}
        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted font-thai">
          <span className="flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-brand-charcoal" />
            <span>รองรับ Thai QR PromptPay ทุกธนาคาร (SCB, KBank, BBL, Krungthai, etc.)</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span>เติมเครดิตเข้าทันทีหลังชำระ</span>
          </span>
        </div>
      </div>

      {/* PromptPay QR Modal Placeholder */}
      <Modal
        isOpen={isPromptPayModalOpen}
        onClose={() => setIsPromptPayModalOpen(false)}
        title={selectedPlan?.price === 0 ? "เริ่มใช้งานฟรี" : "ชำระเงินผ่าน PromptPay QR"}
        description={selectedPlan ? `แพ็กเกจ: ${selectedPlan.name} (${formatThaiCurrency(selectedPlan.price)})` : ""}
      >
        {selectedPlan && selectedPlan.price === 0 ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-thai text-text-secondary">
              คุณสามารถเริ่มใช้งานเครื่องมือพื้นฐานได้ทันที รับฟรี 10 เครดิตต่อวัน
            </p>
            <Button
              variant="yellow"
              size="md"
              onClick={() => setIsPromptPayModalOpen(false)}
              className="w-full font-thai"
            >
              ไปยังหน้าเครื่องมือทั้งหมด
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            {/* Mock Thai QR */}
            <div className="bg-white p-6 rounded-3xl max-w-[220px] mx-auto text-center shadow-lg border border-black/[0.08]">
              <div className="text-[11px] font-bold text-blue-900 mb-2 tracking-wider">
                THAI QR PAYMENT
              </div>
              <div className="aspect-square bg-slate-950 rounded-2xl flex flex-col items-center justify-center p-3 text-white">
                <QrCode className="w-24 h-24 text-white" />
                <span className="text-[10px] text-slate-300 mt-1 font-mono">NEXT-TOOLS-QR</span>
              </div>
              <div className="mt-2 text-xs font-bold text-slate-800 font-thai">
                {selectedPlan && formatThaiCurrency(selectedPlan.price)}
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-4 text-xs text-text-secondary font-thai space-y-2 shadow-xs">
              <div className="flex justify-between">
                <span>ยอดชำระ:</span>
                <span className="font-bold text-text-primary">{selectedPlan && formatThaiCurrency(selectedPlan.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>จำนวนเครดิตที่จะได้รับ:</span>
                <span className="font-bold text-brand-charcoal">+{selectedPlan?.credits} เครดิต</span>
              </div>
              <div className="flex justify-between">
                <span>สถานะระบบ:</span>
                <span className="text-emerald-700 font-medium">พร้อมรับชำระ (จำลองใน Phase 1A)</span>
              </div>
            </div>

            <div className="flex gap-2.5">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsPromptPayModalOpen(false)}
                className="w-1/2 font-thai"
              >
                ยกเลิก
              </Button>
              <Button
                variant="yellow"
                size="md"
                onClick={() => {
                  alert("จำลองการชำระเงินสำเร็จ! (ระบบการชำระเงินจริงจะเชื่อมต่อใน Phase ต่อไป)");
                  setIsPromptPayModalOpen(false);
                }}
                className="w-1/2 font-thai"
              >
                จำลองสแกนจ่าย
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
