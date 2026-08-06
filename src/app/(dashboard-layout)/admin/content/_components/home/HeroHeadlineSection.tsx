"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface HeroHeadlineSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function HeroHeadlineSection({ form, updateForm }: HeroHeadlineSectionProps) {
  return (
    <SectionCard
      id="sec-hero-headline"
      title="Hero Headline Lines & Subtitle"
      subtitle="Main stacked hero titles and description text displayed on the home page"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Title Line 1
          </label>
          <input
            type="text"
            value={form.homeHeroTitle1 || ""}
            onChange={(e) => updateForm("homeHeroTitle1", e.target.value)}
            placeholder="Luxury Real Estate"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Title Line 2
          </label>
          <input
            type="text"
            value={form.homeHeroTitle2 || ""}
            onChange={(e) => updateForm("homeHeroTitle2", e.target.value)}
            placeholder="Videos That Sell"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Title Line 3
          </label>
          <input
            type="text"
            value={form.homeHeroTitle3 || ""}
            onChange={(e) => updateForm("homeHeroTitle3", e.target.value)}
            placeholder="Faster"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Hero Subtitle / Description
        </label>
        <textarea
          rows={3}
          value={form.homeHeroSubtitle || ""}
          onChange={(e) => updateForm("homeHeroSubtitle", e.target.value)}
          placeholder="Subheadline text under title..."
          className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
        />
      </div>
    </SectionCard>
  );
}
