import React from "react";
import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/PricingSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Check, HelpCircle, ShieldCheck, Zap, QrCode } from "lucide-react";

export const metadata: Metadata = {
  title: "ราคาและแพ็กเกจ (Pricing & Plans)",
  description:
    "เลือกแพ็กเกจการใช้งาน NEXT TOOLS ใช้งานฟรี 10 เครดิตต่อวัน หรืออัปเกรดเป็น Pro สแกนจ่ายง่ายผ่าน PromptPay",
};

export default function PricingPage() {
  const faqs = [
    {
      q: "เครดิตฟรีจะหมดอายุเมื่อไหร่?",
      a: "สำหรับผู้ใช้งานฟรี จะได้รับเครดิตฟรี 10 เครดิตทุกวัน และจะถูกรีเซ็ตใหม่ในเวลา 00:00 น. ของทุกวัน ส่วนเครดิตที่ซื้อแบบแพ็กเกจเติมเงิน (Credit Packs) จะไม่มีวันหมดอายุ",
    },
    {
      q: "ชำระเงินผ่าน PromptPay อย่างไร?",
      a: "เมื่อเลือกแพ็กเกจ ระบบจะแสดง QR Code พร้อมยอดเงินที่ต้องชำระ สามารถใช้แอปพลิเคชันธนาคารในประเทศไทย (เช่น K PLUS, SCB EASY, KTB NEXT ฯลฯ) สแกนเพื่อจ่ายเงินได้ทันที เครดิตจะเข้าอัตโนมัติภายในไม่กี่วินาที",
    },
    {
      q: "ไฟล์ของฉันจะถูกเก็บไว้หรือไม่?",
      a: "เราไม่มีการเก็บไฟล์ของผู้ใช้ไว้ในระบบถาวร ไฟล์ทั้งหมดจะถูกลบทันทีหลังจากประมวลผลเสร็จสิ้น เพื่อความเป็นส่วนตัวและความปลอดภัยสูงสุด",
    },
    {
      q: "สามารถยกเลิกแพ็กเกจ Pro ได้ตลอดเวลาหรือไม่?",
      a: "สามารถจัดการหรือยกเลิกการต่ออายุได้ตลอดเวลาผ่านหน้าแดชบอร์ด โดยไม่คิดค่าธรรมเนียมเพิ่มเติม",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingSection />

        {/* FAQ Section */}
        <div className="mt-20 pt-16 border-t border-black/[0.06] max-w-4xl mx-auto">
          <SectionHeader
            badge="คำถามที่พบบ่อย"
            badgeVariant="purple"
            title="คำถามและข้อสงสัยเกี่ยวกับการชำระเงิน"
            description="รวบรวมคำตอบเกี่ยวกับเครดิต การใช้งาน และระบบ PromptPay"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 shadow-card hover:bg-white hover:shadow-card-hover transition-all duration-300"
              >
                <h4 className="text-base font-bold text-text-primary font-thai mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-charcoal shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary font-thai leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
