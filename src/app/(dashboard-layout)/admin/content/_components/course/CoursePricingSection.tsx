"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface CoursePricingSectionProps {
  form: SiteConfig;
  coursePriceDollars: string;
  onPriceChange: (val: string) => void;
}

export function CoursePricingSection({
  form,
  coursePriceDollars,
  onPriceChange,
}: CoursePricingSectionProps) {
  return (
    <SectionCard
      id="sec-course-pricing"
      title="Course Pricing & Enrollment Fee"
      subtitle="Public course price in dollars and currency format"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Course Price (USD $)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={coursePriceDollars}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="199.00"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 font-mono"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Calculated Price Preview
          </label>
          <div className="bg-[#0a0d1a]/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono flex items-center justify-between">
            <span>Amount in Cents: {form.coursePriceCents || 0}¢</span>
            <span className="font-bold">${coursePriceDollars || "0"} USD</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
