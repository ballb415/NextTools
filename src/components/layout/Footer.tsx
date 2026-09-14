import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Lock, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#FAF9F6] pt-14 pb-10 text-text-secondary text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-charcoal flex items-center justify-center text-white font-extrabold text-xs">
                N
              </div>
              <span className="font-extrabold text-base tracking-tight font-english text-text-primary">
                NEXT<span className="text-brand-charcoal opacity-75">TOOLS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-text-muted font-thai">
              เครื่องมือออนไลน์ยุคใหม่สำหรับคนไทย จัดการไฟล์ PDF, แปลงรูปภาพ, และงาน AI ให้เสร็จได้ในไม่กี่คลิก รวดเร็ว ปลอดภัย ไม่เก็บไฟล์
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL 256-bit</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-text-primary" />
                <span>Auto-Delete</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3 font-english">
              เครื่องมือยอดนิยม
            </h4>
            <ul className="space-y-2 text-xs font-thai text-text-secondary">
              <li>
                <Link href="/tools/image-compressor" className="hover:text-text-primary transition-colors">
                  บีบอัดรูปภาพ (Image Compressor)
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf-merger" className="hover:text-text-primary transition-colors">
                  รวมไฟล์ PDF (PDF Merger)
                </Link>
              </li>
              <li>
                <Link href="/tools/image-converter" className="hover:text-text-primary transition-colors">
                  แปลงไฟล์รูปภาพ (JPG, PNG, WebP)
                </Link>
              </li>
              <li>
                <Link href="/tools/ai-thai-refiner" className="hover:text-text-primary transition-colors">
                  AI ขัดเกลาภาษาไทย
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories & Platform */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3 font-english">
              หมวดหมู่เครื่องมือ
            </h4>
            <ul className="space-y-2 text-xs font-thai text-text-secondary">
              <li>
                <Link href="/tools" className="hover:text-text-primary transition-colors">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-text-primary transition-colors">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-text-primary transition-colors">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-text-primary transition-colors">
                  File Conversion
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-text-primary transition-colors">
                  แพ็กเกจราคา PromptPay
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Admin */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3 font-english">
              ความปลอดภัย & ซัพพอร์ต
            </h4>
            <p className="text-xs text-text-muted font-thai leading-relaxed mb-3">
              ไฟล์ทั้งหมดจะถูกประมวลผลและลบออกจากระบบทันที ไม่มีการเก็บไฟล์ถาวร ปลอดภัยสูงสุด
            </p>
            <div className="pt-2 border-t border-black/[0.06] flex flex-col gap-1.5 text-xs">
              <Link href="/dashboard" className="text-text-muted hover:text-text-primary transition-colors font-thai">
                ศูนย์จัดการผู้ใช้ (Dashboard)
              </Link>
              <Link href="/admin" className="text-text-muted hover:text-text-primary transition-colors font-thai">
                ระบบผู้ดูแลระบบ (Admin)
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted font-thai">
          <div>
            © {new Date().getFullYear()} NEXT TOOLS. All rights reserved. ออกแบบสำหรับผู้ใช้งานในประเทศไทย
          </div>
          <div className="flex items-center gap-1">
            <span>สร้างขึ้นด้วยความใส่ใจเพื่อผลผลิตที่ดีขึ้น</span>
            <Zap className="w-3.5 h-3.5 text-brand-charcoal" />
          </div>
        </div>
      </div>
    </footer>
  );
}
