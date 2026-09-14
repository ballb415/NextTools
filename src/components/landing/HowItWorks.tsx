import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MousePointerClick, UploadCloud, DownloadCloud } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      title: "เลือกเครื่องมือที่ต้องการ",
      description:
        "เลือกจากเครื่องมือ PDF, แปลงรูปภาพ, บีบอัดไฟล์ หรือเครื่องมือ AI ที่ต้องการใช้งาน",
      icon: MousePointerClick,
    },
    {
      stepNumber: "02",
      title: "อัปโหลดไฟล์หรือพิมพ์ข้อความ",
      description:
        "ลากไฟล์มาวางในช่องอัปโหลด หรือพิมพ์ข้อความภาษาไทยที่ต้องการให้ AI ช่วยปรับปรุง",
      icon: UploadCloud,
    },
    {
      stepNumber: "03",
      title: "รับผลลัพธ์และดาวน์โหลดทันที",
      description:
        "ระบบประมวลผลทันทีในเบราว์เซอร์ของคุณ ดาวน์โหลดไฟล์ได้ทันทีโดยไม่ต้องรอนาน",
      icon: DownloadCloud,
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="ขั้นตอนง่ายๆ"
          badgeVariant="purple"
          title="ทำงานเสร็จไวใน 3 ขั้นตอน"
          description="ไม่จำเป็นต้องสมัครสมาชิกหรือลงโปรแกรมให้ยุ่งยาก ใช้งานได้ทันทีบนทุกอุปกรณ์"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover hover:bg-white transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] flex items-center justify-center text-brand-charcoal shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black font-english text-black/10 tracking-wider">
                      {step.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-text-primary font-thai mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary font-thai leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
