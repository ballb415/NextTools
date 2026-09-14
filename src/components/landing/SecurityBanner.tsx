import React from "react";
import { ShieldCheck, Trash2, Lock, EyeOff } from "lucide-react";

export function SecurityBanner() {
  const securityPillars = [
    {
      icon: Trash2,
      title: "ลบไฟล์อัตโนมัติ 100%",
      description: "ไฟล์ทั้งหมดถูกประมวลผลชั่วคราวและลบทิ้งทันที ไม่มีการจัดเก็บในฐานข้อมูล",
    },
    {
      icon: EyeOff,
      title: "ประมวลผลในเบราว์เซอร์",
      description: "เครื่องมือรูปภาพและ PDF หลายรายการประมวลผลในเครื่องของคุณ ข้อมูลไม่ออกจากคอม",
    },
    {
      icon: Lock,
      title: "เข้ารหัส SSL 256-bit",
      description: "การเชื่อมต่อทั้งหมดได้รับการเข้ารหัสความปลอดภัยระดับธนาคารสากล",
    },
    {
      icon: ShieldCheck,
      title: "มาตรฐานความปลอดภัยไทย",
      description: "พร้อมรองรับมาตรฐานการคุ้มครองข้อมูลส่วนบุคคล (PDPA) อย่างเคร่งครัด",
    },
  ];

  return (
    <section className="py-16 md:py-20 border-b border-black/[0.06] bg-[#FAF9F6]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-card">
          {/* Subtle Glow background */}
          <div className="ambient-glow top-0 right-0 w-96 h-96 bg-[#E8DAC8]/30" />

          <div className="max-w-3xl mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3 font-thai shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ความปลอดภัยและความเป็นส่วนตัวสูงสุด</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-primary font-thai">
              ข้อมูลและไฟล์ของคุณปลอดภัย 100%
            </h2>
            <p className="text-sm sm:text-base text-text-secondary font-thai mt-2 leading-relaxed">
              เราออกแบบระบบโดยยึดหลักความปลอดภัยเป็นอันดับหนึ่ง ไฟล์ของคุณจะไม่ถูกนำไปเทรน AI หรือเก็บไว้ในเซิร์ฟเวอร์
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-5 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary font-thai mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-thai leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
