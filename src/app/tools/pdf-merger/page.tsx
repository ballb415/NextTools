"use client";

import React, { useState } from "react";
import { ToolLayoutShell } from "@/components/tools/ToolLayoutShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UploadCloud, Files, FileText, Trash2, ArrowUpDown, Download, CheckCircle2 } from "lucide-react";

export default function PdfMergerPage() {
  const [hasDemoFiles, setHasDemoFiles] = useState(false);

  return (
    <ToolLayoutShell
      name="รวมไฟล์ PDF"
      nameEn="PDF Merger"
      categoryName="PDF Tools"
      description="รวมไฟล์ PDF หลายไฟล์เข้าด้วยกันเป็นไฟล์เดียว ลากจัดลำดับหน้าได้ตามใจ ประมวลผลรวดเร็วทันใจ ปลอดภัย ไม่เก็บไฟล์"
      iconName="Files"
      creditCost={1}
      badge="ใช้งานง่าย"
    >
      <div className="space-y-8">
        {!hasDemoFiles ? (
          <div
            onClick={() => setHasDemoFiles(true)}
            className="border-2 border-dashed border-black/[0.1] hover:border-brand-charcoal rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 bg-[#FAF9F6]/60 hover:bg-white shadow-xs group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal mx-auto mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Files className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary font-thai mb-1">
              ลากไฟล์ PDF มาวางที่นี่เพื่อรวมไฟล์
            </h3>
            <p className="text-xs text-text-muted font-thai max-w-sm mx-auto mb-4">
              สามารถเลือกไฟล์พร้อมกันได้หลายไฟล์ (ขนาดสูงสุด 50MB ต่อชุด)
            </p>
            <Button variant="yellow" size="md" className="font-thai">
              เลือกไฟล์ PDF จากเครื่อง
            </Button>
            <p className="text-[11px] text-text-muted mt-3 font-thai">
              (คลิกเพื่อดูตัวอย่างจำลองการจัดเรียงไฟล์ PDF)
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-text-primary font-thai flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-charcoal" />
                <span>ไฟล์ที่เลือก (3 ไฟล์ - พร้อมรวม)</span>
              </h4>
              <button
                onClick={() => setHasDemoFiles(false)}
                className="text-xs text-text-muted hover:text-red-500 font-thai transition-colors"
              >
                ล้างรายการทั้งหมด
              </button>
            </div>

            {/* List of Mock PDF Files */}
            <div className="space-y-2.5">
              {[
                { name: "01_บทนำและภาพรวม.pdf", size: "1.2 MB", pages: 4 },
                { name: "02_รายละเอียดเนื้อหา_โครงการ.pdf", size: "3.8 MB", pages: 12 },
                { name: "03_ภาคผนวกและสรุปผล.pdf", size: "850 KB", pages: 2 },
              ].map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-black/[0.06] rounded-2xl text-xs shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal font-bold font-english shadow-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-text-primary font-thai">{file.name}</p>
                      <p className="text-text-muted text-[11px]">
                        {file.size} • {file.pages} หน้า
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-text-muted hover:text-text-primary rounded-lg hover:bg-black/5">
                      <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-text-muted hover:text-red-500 rounded-lg hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="yellow"
                size="lg"
                className="w-full sm:w-auto font-thai shadow-pill"
                rightIcon={<Download className="w-4 h-4" />}
                onClick={() => alert("จำลองการรวมไฟล์ PDF สำเร็จ (1 เครดิต)")}
              >
                รวมและดาวน์โหลด PDF (ใช้ 1 เครดิต)
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-thai"
                onClick={() => setHasDemoFiles(false)}
              >
                เพิ่มไฟล์ PDF อื่น
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] text-xs font-thai text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>รักษาคุณภาพข้อความและรูปภาพ 100%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>จัดเรียงลำดับไฟล์ได้อิสระ</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>ระบบลบไฟล์ชั่วคราวอัตโนมัติ</span>
          </div>
        </div>
      </div>
    </ToolLayoutShell>
  );
}
