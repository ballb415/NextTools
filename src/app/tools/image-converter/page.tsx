"use client";

import React, { useState } from "react";
import { ToolLayoutShell } from "@/components/tools/ToolLayoutShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { RefreshCw, UploadCloud, Download, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageConverterPage() {
  const [targetFormat, setTargetFormat] = useState<string>("WEBP");
  const [isConverted, setIsConverted] = useState(false);

  const formats = ["WEBP", "PNG", "JPG", "AVIF", "PDF"];

  return (
    <ToolLayoutShell
      name="แปลงไฟล์รูปภาพ"
      nameEn="Image Converter"
      categoryName="Image Tools"
      description="แปลงสกุลไฟล์รูปภาพไปมาระหว่าง JPG, PNG, WebP, AVIF อย่างรวดเร็ว รองรับการแปลงครั้งละหลายไฟล์"
      iconName="RefreshCw"
      creditCost={0}
      badge="ฟรี 100%"
    >
      <div className="space-y-8">
        {/* Format Selector Bar */}
        <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-5 shadow-xs">
          <label className="block text-xs font-semibold text-text-secondary font-thai mb-3">
            เลือกสกุลไฟล์ปลายทางที่ต้องการแปลง:
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
            {formats.map((fmt) => {
              const isSelected = targetFormat === fmt;
              return (
                <button
                  key={fmt}
                  onClick={() => setTargetFormat(fmt)}
                  className={cn(
                    "py-2.5 px-3 rounded-full text-xs font-bold font-english transition-all duration-200 border text-center",
                    isSelected
                      ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm"
                      : "bg-white text-text-secondary border-black/[0.06] hover:text-text-primary hover:border-black/[0.15] shadow-xs"
                  )}
                >
                  .{fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropzone / Upload Placeholder */}
        {!isConverted ? (
          <div
            onClick={() => setIsConverted(true)}
            className="border-2 border-dashed border-black/[0.1] hover:border-brand-charcoal rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 bg-[#FAF9F6]/60 hover:bg-white shadow-xs group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-brand-charcoal mx-auto mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-text-primary font-thai mb-1">
              ลากรูปภาพมาวางที่นี่เพื่อแปลงเป็น .{targetFormat}
            </h3>
            <p className="text-xs text-text-muted font-thai max-w-sm mx-auto mb-4">
              รองรับไฟล์ต้นฉบับ JPG, PNG, WEBP, GIF, SVG, BMP (สูงสุด 20 รูปพร้อมกัน)
            </p>
            <Button variant="yellow" size="md" className="font-thai">
              เลือกไฟล์รูปภาพ
            </Button>
            <p className="text-[11px] text-text-muted mt-3 font-thai">
              (คลิกเพื่อดูตัวอย่างจำลองการแปลงไฟล์)
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-bold text-text-primary font-thai">
                    photo-banner.png <span className="text-text-muted">→</span> photo-banner.{targetFormat.toLowerCase()}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    สถานะ: แปลงไฟล์สำเร็จเรียบร้อย
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                พร้อมดาวน์โหลด
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="yellow"
                size="lg"
                className="w-full sm:w-auto font-thai shadow-pill"
                rightIcon={<Download className="w-4 h-4" />}
                onClick={() => alert(`ดาวน์โหลดไฟล์ .${targetFormat.toLowerCase()} เรียบร้อย`)}
              >
                ดาวน์โหลดไฟล์ .{targetFormat}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-thai"
                onClick={() => setIsConverted(false)}
              >
                แปลงไฟล์อื่น
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] text-xs font-thai text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>แปลงรูปภาพฟรี ไม่มีลายน้ำ</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>รักษาความละเอียดภาพเดิม</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>ไม่เก็บไฟล์บนเซิร์ฟเวอร์</span>
          </div>
        </div>
      </div>
    </ToolLayoutShell>
  );
}
