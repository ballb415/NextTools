import React from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolCard } from "@/components/ui/ToolCard";
import { TOOLS } from "@/config/tools";
import { ArrowRight, Flame } from "lucide-react";

export function PopularTools() {
  const popularTools = TOOLS.filter((t) => t.isPopular);

  return (
    <section className="py-16 md:py-20 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary mb-2 font-thai uppercase tracking-wider">
              <Flame className="w-4 h-4 text-brand-charcoal" />
              <span>เครื่องมือยอดนิยม</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-thai">
              เครื่องมือที่มีผู้ใช้งานมากที่สุด
            </h2>
            <p className="text-sm text-text-secondary font-thai mt-1">
              เริ่มใช้งานได้ทันทีโดยไม่ต้องลงทะเบียน
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-primary hover:text-black transition-colors font-thai shrink-0 group"
          >
            <span>ดูเครื่องมือทั้งหมด ({TOOLS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
