import React from "react";
import { Hero } from "@/components/landing/Hero";
import { ToolSearch } from "@/components/landing/ToolSearch";
import { PopularTools } from "@/components/landing/PopularTools";
import { ToolCategories } from "@/components/landing/ToolCategories";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { SecurityBanner } from "@/components/landing/SecurityBanner";
import { PricingSection } from "@/components/landing/PricingSection";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Interactive Tool Search Area */}
      <section className="py-14 border-b border-black/[0.06] bg-[#FAF9F6]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-thai">
              ค้นหาและเข้าถึงเครื่องมือทันใจ
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary font-thai mt-1.5">
              พิมพ์ชื่อเครื่องมือที่คุณต้องการค้นหา หรือกรองตามหมวดหมู่
            </p>
          </div>
          <ToolSearch />
        </div>
      </section>

      {/* 4. Popular Tools Section */}
      <PopularTools />

      {/* 5. Tool Categories Showcase */}
      <ToolCategories />

      {/* 6. How It Works */}
      <HowItWorks />

      {/* 7. Privacy & Security */}
      <SecurityBanner />

      {/* 8. Pricing & PromptPay */}
      <PricingSection />

      {/* 9. Final CTA */}
      <FinalCta />
    </div>
  );
}
