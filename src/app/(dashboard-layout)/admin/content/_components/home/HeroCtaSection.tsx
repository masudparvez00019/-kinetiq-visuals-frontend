"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface HeroCtaSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function HeroCtaSection({ form, updateForm }: HeroCtaSectionProps) {
  return (
    <SectionCard
      id="sec-hero-cta"
      title="CTA Button & Social Proof Badge"
      subtitle="Primary call-to-action button and client satisfaction badge"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            CTA Button Label
          </label>
          <input
            type="text"
            value={form.heroCtaText || ""}
            onChange={(e) => updateForm("heroCtaText", e.target.value)}
            placeholder="Book a Free Strategy Call"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            CTA Target Link
          </label>
          <input
            type="text"
            value={form.heroCtaLink || ""}
            onChange={(e) => updateForm("heroCtaLink", e.target.value)}
            placeholder="/contact or https://..."
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Social Proof Badge Text
          </label>
          <input
            type="text"
            value={form.heroHappyClientsText || ""}
            onChange={(e) => updateForm("heroHappyClientsText", e.target.value)}
            placeholder="60+ Happy Clients"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>
    </SectionCard>
  );
}
