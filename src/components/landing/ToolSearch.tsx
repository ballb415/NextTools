"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { ToolCard } from "@/components/ui/ToolCard";
import { TOOLS, CATEGORIES } from "@/config/tools";
import { Search, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolSearchProps {
  initialCategory?: string;
  showCategories?: boolean;
}

export function ToolSearch({ initialCategory = "all", showCategories = true }: ToolSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.nameEn.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาเครื่องมือ เช่น บีบอัดรูป, รวม PDF, AI ขัดเกลาภาษา..."
          leftIcon={<Search className="w-4 h-4 text-text-muted" />}
          rightIcon={
            query ? (
              <button
                onClick={() => setQuery("")}
                className="hover:text-text-primary p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : undefined
          }
          className="bg-white/80 backdrop-blur-md border-black/[0.08] py-3.5 text-sm sm:text-base shadow-card rounded-2xl focus:border-brand-charcoal"
        />
      </div>

      {/* Category Pills */}
      {showCategories && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 font-thai border",
                  isSelected
                    ? "bg-brand-charcoal text-white border-brand-charcoal shadow-sm font-semibold"
                    : "bg-white/70 text-text-secondary border-black/[0.06] hover:bg-white hover:text-text-primary hover:border-black/[0.12] shadow-xs"
                )}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Search Results / Tools Grid */}
      <div>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/70 backdrop-blur-md border border-black/[0.06] rounded-3xl p-8 shadow-card">
            <Sparkles className="w-8 h-8 text-text-muted mx-auto mb-3" />
            <h4 className="text-base font-bold text-text-primary font-thai">
              ไม่พบเครื่องมือที่ตรงกับ &quot;{query}&quot;
            </h4>
            <p className="text-xs text-text-secondary mt-1 font-thai">
              ลองค้นหาด้วยคำสำคัญอื่น หรือเลือกดูจากหมวดหมู่ทั้งหมด
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-xs font-semibold text-brand-charcoal hover:underline font-thai"
            >
              ล้างการค้นหาทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
