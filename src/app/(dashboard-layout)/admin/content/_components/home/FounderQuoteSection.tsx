"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface FounderQuoteSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function FounderQuoteSection({ form, updateForm }: FounderQuoteSectionProps) {
  return (
    <SectionCard
      id="sec-founder-quote"
      title="Founder / Testimonial Quote Card"
      subtitle="Personal quote card with author avatar and company details"
      icon={Sparkles}
    >
      <div className="flex flex-col gap-1">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Quote Text
        </label>
        <textarea
          rows={3}
          value={form.heroQuoteText || ""}
          onChange={(e) => updateForm("heroQuoteText", e.target.value)}
          placeholder="Quote content..."
          className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MediaUploader
          label="Author Image"
          value={form.heroQuoteAuthorImage}
          onChange={(url) => updateForm("heroQuoteAuthorImage", url)}
          accept="image/*"
          type="image"
        />

        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Author Name
          </label>
          <input
            type="text"
            value={form.heroQuoteAuthorName || ""}
            onChange={(e) => updateForm("heroQuoteAuthorName", e.target.value)}
            placeholder="Jowel Mahmud"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Author Title
          </label>
          <input
            type="text"
            value={form.heroQuoteAuthorTitle || ""}
            onChange={(e) => updateForm("heroQuoteAuthorTitle", e.target.value)}
            placeholder="Founder & CEO"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Company Name
          </label>
          <input
            type="text"
            value={form.heroQuoteCompany || ""}
            onChange={(e) => updateForm("heroQuoteCompany", e.target.value)}
            placeholder="KQ Visuals"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>
    </SectionCard>
  );
}
