"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface CtaBannerSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function CtaBannerSection({ form, updateForm }: CtaBannerSectionProps) {
  return (
    <SectionCard
      id="sec-cta-banner"
      title='CTA Banner Section ("Ready to Elevate Your Listings?")'
      subtitle="Bottom call-to-action banner with feature tags and button"
      icon={Sparkles}
    >
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Badge Label & Feature Tags
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">CTA Badge Text</label>
            <input
              type="text"
              value={form.ctaSectionBadgeText || ""}
              onChange={(e) => updateForm("ctaSectionBadgeText", e.target.value)}
              placeholder="LET'S TALK"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Feature Tags (Comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(form.ctaSectionTags) ? form.ctaSectionTags.join(", ") : form.ctaSectionTags || ""}
              onChange={(e) => {
                const raw = e.target.value;
                const parsed = raw
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                updateForm("ctaSectionTags", parsed);
              }}
              placeholder="Fast Turnaround, Unlimited Revisions, 4K Export"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Banner Main Title (3 Stacked Lines)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.ctaSectionTitle1 || ""}
              onChange={(e) => updateForm("ctaSectionTitle1", e.target.value)}
              placeholder="Ready to Elevate"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.ctaSectionTitle2 || ""}
              onChange={(e) => updateForm("ctaSectionTitle2", e.target.value)}
              placeholder="Your Real Estate"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 3</label>
            <input
              type="text"
              value={form.ctaSectionTitle3 || ""}
              onChange={(e) => updateForm("ctaSectionTitle3", e.target.value)}
              placeholder="Videos?"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          CTA Description Text
        </label>
        <textarea
          rows={3}
          value={form.ctaSectionDesc || ""}
          onChange={(e) => updateForm("ctaSectionDesc", e.target.value)}
          placeholder="Get in touch with our team today..."
          className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            CTA Button Label
          </label>
          <input
            type="text"
            value={form.ctaSectionBtnText || ""}
            onChange={(e) => updateForm("ctaSectionBtnText", e.target.value)}
            placeholder="Start Your Project"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            CTA Target Link Href
          </label>
          <input
            type="text"
            value={form.ctaSectionBtnLink || ""}
            onChange={(e) => updateForm("ctaSectionBtnLink", e.target.value)}
            placeholder="/contact"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>
    </SectionCard>
  );
}
