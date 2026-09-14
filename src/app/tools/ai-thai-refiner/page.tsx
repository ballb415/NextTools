"use client";

import React, { useState } from "react";
import { ToolLayoutShell } from "@/components/tools/ToolLayoutShell";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Copy, Check, RefreshCw, Wand2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiThaiRefinerPage() {
  const tones = [
    { id: "formal", label: "ทางการ / ติดต่อราชการ", prompt: "เน้นความสุภาพ ถูกต้องตามระเบียบแบบแผน" },
    { id: "business", label: "ธุรกิจ / อีเมลมืออาชีพ", prompt: "กระชับ ชัดเจน เป็นมืออาชีพ" },
    { id: "marketing", label: "เขียนโพสต์ขาย / การตลาด", prompt: "ดึงดูดใจ กระตุ้นยอดขาย มีลูกเล่น" },
    { id: "social", label: "แคปชั่นโซเชียล / วัยรุ่น", prompt: "เป็นกันเอง สดใส น่ากดไลก์" },
    { id: "concise", label: "ย่อกระชับ / สรุปประเด็น", prompt: "ตัดคำฟุ่มเฟือย คงเนื้อหาสำคัญครบ" },
  ];

  const [selectedTone, setSelectedTone] = useState("marketing");
  const [inputText, setInputText] = useState(
    "สินค้าเราดีมาก ใช้งานง่าย ราคาถูก สั่งซื้อวันนี้ส่งฟรีเลยนะครับ"
  );
  const [isRefining, setIsRefining] = useState(false);
  const [refinedText, setRefinedText] = useState(
    "✨ ปลดล็อกความคุ้มค่า! ตัวช่วยที่ตอบโจทย์ทุกการใช้งาน ดีไซน์เรียบง่าย ใช้งานสะดวกทันใจในราคาสุดพิเศษ 🎉 พิเศษเฉพาะวันนี้: สั่งซื้อทันที รับสิทธิ์จัดส่งฟรีทั่วประเทศ! ทักแชทเลย"
  );
  const [copied, setCopied] = useState(false);

  const handleRefine = () => {
    setIsRefining(true);
    setTimeout(() => {
      setIsRefining(false);
      if (selectedTone === "formal") {
        setRefinedText(
          "ผลิตภัณฑ์ดังกล่าวมีประสิทธิภาพสูงและมีความสะดวกในการใช้งาน ในราคาที่เหมาะสม ทางเรามีความยินดีมอบสิทธิพิเศษบริการจัดส่งโดยไม่มีค่าธรรมเนียมสำหรับการสั่งซื้อในวันนี้"
        );
      } else if (selectedTone === "business") {
        setRefinedText(
          "ขอแนะนำโซลูชันที่มีประสิทธิภาพและคุ้มค่า พร้อมรองรับการทำงานอย่างราบรื่น สำหรับคำสั่งซื้อภายในวันนี้ รับบริการจัดส่งฟรีโดยไม่มีค่าใช้จ่ายเพิ่มเติม"
        );
      } else if (selectedTone === "concise") {
        setRefinedText(
          "สินค้าคุณภาพ ใช้งานง่าย ราคาประหยัด สั่งซื้อวันนี้ ส่งฟรีทันที"
        );
      } else {
        setRefinedText(
          "✨ ปลดล็อกความคุ้มค่า! ตัวช่วยที่ตอบโจทย์ทุกการใช้งาน ดีไซน์เรียบง่าย ใช้งานสะดวกทันใจในราคาสุดพิเศษ 🎉 พิเศษเฉพาะวันนี้: สั่งซื้อทันที รับสิทธิ์จัดส่งฟรีทั่วประเทศ! ทักแชทเลย"
        );
      }
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refinedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayoutShell
      name="AI ขัดเกลาภาษาไทย"
      nameEn="AI Thai Refiner"
      categoryName="AI Tools"
      description="ปรับสำนวนภาษาไทยให้สละสลวย ถูกต้องตามกาลเทศะ เปลี่ยนข้อความร่างธรรมดาให้กลายเป็นข้อความระดับมืออาชีพ"
      iconName="Sparkles"
      creditCost={2}
      badge="AI ภาษาไทย"
    >
      <div className="space-y-6">
        {/* Tone Selector */}
        <div>
          <label className="block text-xs font-semibold text-text-secondary font-thai mb-3">
            เลือกโทนเสียงและสไตล์ที่ต้องการ:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {tones.map((tone) => {
              const isSelected = selectedTone === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "p-3.5 rounded-2xl text-left transition-all duration-200 border shadow-xs",
                    isSelected
                      ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm"
                      : "bg-[#FAF9F6] border-black/[0.06] text-text-secondary hover:text-text-primary hover:bg-white"
                  )}
                >
                  <p className={cn("text-xs font-bold font-thai", isSelected ? "text-white" : "text-text-primary")}>
                    {tone.label}
                  </p>
                  <p className={cn("text-[10px] mt-1 leading-snug", isSelected ? "text-white/70" : "text-text-muted")}>
                    {tone.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Column Editor Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-thai text-text-secondary">
              <span className="font-semibold">ข้อความต้นฉบับของคุณ:</span>
              <span className="text-text-muted">{inputText.length} ตัวอักษร</span>
            </div>
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="พิมพ์หรือวางข้อความภาษาไทยที่ต้องการให้ AI ช่วยขัดเกลา..."
              className="w-full bg-[#FAF9F6] border border-black/[0.08] rounded-2xl p-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand-charcoal focus:ring-1 focus:ring-brand-charcoal font-thai resize-none leading-relaxed shadow-xs"
            />
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-thai text-text-secondary">
              <span className="font-semibold flex items-center gap-1.5 text-brand-charcoal">
                <Sparkles className="w-3.5 h-3.5" />
                ข้อความที่ขัดเกลาแล้ว (AI Output):
              </span>
              {refinedText && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-brand-charcoal hover:text-black transition-colors font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "คัดลอกแล้ว" : "คัดลอก"}</span>
                </button>
              )}
            </div>
            <div className="w-full bg-[#FAF9F6] border border-black/[0.08] rounded-2xl p-4 text-sm text-text-primary font-thai min-h-[178px] flex flex-col justify-between leading-relaxed shadow-xs">
              <p className="leading-relaxed">{refinedText}</p>
              <div className="text-[11px] text-text-muted pt-2 border-t border-black/[0.05] flex justify-between items-center">
                <span>โทน: {tones.find((t) => t.id === selectedTone)?.label}</span>
                <span className="text-emerald-700 font-medium">พร้อมใช้งาน</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs text-text-muted font-thai">
            <Badge variant="purple" size="sm">
              ใช้ 2 เครดิต
            </Badge>
            <span>เครดิตคงเหลือ: 10 เครดิต (ฟรี)</span>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="yellow"
              size="lg"
              onClick={handleRefine}
              isLoading={isRefining}
              className="w-full sm:w-auto font-thai shadow-pill"
              leftIcon={<Wand2 className="w-4 h-4" />}
            >
              ขัดเกลาข้อความด้วย AI
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/[0.06] text-xs font-thai text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>ปรับสำนวนตามบริบทภาษาไทยแท้</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-charcoal shrink-0" />
            <span>ไม่นำข้อมูลส่วนตัวไปบันทึกประวัติ</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>ปรับแต่งได้ไม่จำกัดครั้งสำหรับ Pro</span>
          </div>
        </div>
      </div>
    </ToolLayoutShell>
  );
}
