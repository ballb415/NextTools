import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FileText, Image as ImageIcon, Sparkles, RefreshCw, ArrowRight } from "lucide-react";

export function ToolCategories() {
  const categoryHighlights = [
    {
      id: "pdf",
      title: "PDF Tools",
      thaiTitle: "จัดการเอกสาร PDF",
      description: "รวมไฟล์ PDF, แยกหน้าเอกสาร, จัดการลำดับหน้าอย่างง่ายดาย ปลอดภัย 100%",
      icon: FileText,
      color: "bg-[#FAF8F5]",
      iconColor: "text-brand-charcoal",
      borderHover: "hover:border-black/15",
      href: "/tools?category=pdf",
      features: ["รวมไฟล์ PDF", "แยกหน้า PDF", "บีบอัดขนาด PDF"],
    },
    {
      id: "image",
      title: "Image Tools",
      thaiTitle: "จัดการและตกแต่งรูปภาพ",
      description: "บีบอัดรูปภาพให้ขนาดเล็กลง แปลงนามสกุลภาพ WebP, JPG, PNG คมชัดเท่าเดิม",
      icon: ImageIcon,
      color: "bg-[#FDF6F4]",
      iconColor: "text-brand-peach",
      borderHover: "hover:border-black/15",
      href: "/tools?category=image",
      features: ["บีบอัดรูปภาพ", "แปลงสกุลภาพ", "ปรับขนาดภาพ"],
    },
    {
      id: "ai",
      title: "AI Tools",
      thaiTitle: "เครื่องมือ AI เพิ่มผลผลิต",
      description: "ขัดเกลาสำนวนภาษาไทย สรุปเนื้อหาเอกสาร และแปลงความคิดเป็นข้อความสละสลวย",
      icon: Sparkles,
      color: "bg-[#F7F5FA]",
      iconColor: "text-stone-800",
      borderHover: "hover:border-black/15",
      href: "/tools?category=ai",
      features: ["AI ขัดเกลาภาษาไทย", "AI สรุปเอกสาร", "AI สร้างแคปชั่น"],
    },
    {
      id: "conversion",
      title: "File Conversion",
      thaiTitle: "แปลงไฟล์สารพัดประโยชน์",
      description: "แปลงสกุลไฟล์เอกสาร รูปภาพข้ามแพลตฟอร์มอย่างแม่นยำ ไม่เสียฟอร์แมต",
      icon: RefreshCw,
      color: "bg-[#F3FAF6]",
      iconColor: "text-emerald-700",
      borderHover: "hover:border-black/15",
      href: "/tools?category=conversion",
      features: ["แปลงเป็น PDF", "PDF เป็นรูปภาพ", "แปลงไฟล์หลายรายการ"],
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-black/[0.06] bg-[#FAF9F6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="หมวดหมู่เครื่องมือ"
          badgeVariant="purple"
          title="ครบครันทุกความต้องการในที่เดียว"
          description="เลือกหมวดหมู่เครื่องมือที่คุณต้องการใช้งาน พร้อมระบบประมวลผลทันทีในเบราว์เซอร์"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group relative flex flex-col justify-between bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white shadow-card hover:shadow-card-hover ${cat.borderHover}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${cat.color} border border-black/[0.05] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs`}>
                    <Icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>

                  <span className="text-[11px] font-semibold text-text-muted font-english uppercase tracking-wider">
                    {cat.title}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary font-thai mt-1 mb-2">
                    {cat.thaiTitle}
                  </h3>
                  <p className="text-xs text-text-secondary font-thai leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <ul className="space-y-1.5 mb-6 pt-3.5 border-t border-black/[0.05] text-xs font-thai text-text-muted">
                    {cat.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/30" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-text-primary group-hover:text-black transition-colors font-thai">
                  <span>ดูเครื่องมือในหมวดนี้</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
