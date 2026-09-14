import React from "react";
import type { Metadata } from "next";
import { ToolSearch } from "@/components/landing/ToolSearch";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "รวมเครื่องมือออนไลน์ทั้งหมด (All Tools)",
  description:
    "ค้นหาและเลือกใช้เครื่องมือจัดการไฟล์ PDF, แปลงรูปภาพ, บีบอัดไฟล์, และ AI เพิ่มผลผลิต ภาษาไทย ใช้งานง่าย รวดเร็ว",
};

export default function ToolsDirectoryPage() {
  return (
    <div className="min-h-screen bg-bg-dark py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="คลังเครื่องมือทั้งหมด"
          badgeVariant="purple"
          title="เครื่องมือทั้งหมดของ NEXT TOOLS"
          description="เลือกใช้งานเครื่องมือที่ตรงกับความต้องการของคุณ ประมวลผลรวดเร็ว ไม่เก็บไฟล์ และรองรับการทำงานบนทุกอุปกรณ์"
        />

        <div className="mt-8">
          <ToolSearch showCategories={true} />
        </div>
      </div>
    </div>
  );
}
