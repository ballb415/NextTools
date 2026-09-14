import React from "react";
import Link from "next/link";
import { ToolItem } from "@/types";
import { IconResolver } from "./IconResolver";
import { Badge } from "./Badge";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: ToolItem;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link href={tool.href} className="group block h-full">
      <div
        className={cn(
          "relative h-full flex flex-col justify-between bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-card transition-all duration-300 group-hover:bg-white group-hover:-translate-y-1.5 group-hover:shadow-card-hover group-hover:border-black/[0.08]",
          className
        )}
      >
        <div>
          {/* Top Bar: Icon + Category/Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-black/[0.06] flex items-center justify-center text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-all duration-200 shadow-xs shrink-0">
              <IconResolver name={tool.iconName} className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {tool.badge && (
                <Badge variant="yellow" size="sm">
                  {tool.badge}
                </Badge>
              )}
              <Badge variant="muted" size="sm">
                {tool.categoryName}
              </Badge>
            </div>
          </div>

          {/* Titles */}
          <div className="mb-2">
            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-black transition-colors font-thai leading-snug">
              {tool.name}
            </h3>
            <span className="text-xs text-text-muted font-english font-medium block mt-0.5">
              {tool.nameEn}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed font-thai">
            {tool.description}
          </p>
        </div>

        {/* Footer: Credit info + Arrow */}
        <div className="mt-5 pt-3.5 border-t border-black/[0.05] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-text-muted font-thai">
            <Zap className="w-3.5 h-3.5 text-brand-charcoal" />
            <span>
              {tool.creditCost === 0 ? (
                <strong className="text-text-primary font-medium">ฟรี 0 เครดิต</strong>
              ) : (
                `${tool.creditCost} เครดิต`
              )}
            </span>
          </div>

          <div className="flex items-center gap-1 text-text-primary font-medium group-hover:translate-x-0.5 transition-transform text-xs">
            <span>เปิดเครื่องมือ</span>
            <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand-charcoal" />
          </div>
        </div>
      </div>
    </Link>
  );
}
