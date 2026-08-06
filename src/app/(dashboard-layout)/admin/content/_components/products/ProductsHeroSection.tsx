"use client";

import React from "react";
import { Package, Type, Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ProductsHeroSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ProductsHeroSection({ form, updateForm }: ProductsHeroSectionProps) {
  return (
    <SectionCard
      id="sec-products-hero"
      title="Products Hero Section"
      subtitle="Main 3-line headline and 2-column feature highlight boxes"
      icon={Package}
    >
      {/* Main 3-Line Title */}
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          Main Headline Lines (3 Lines)
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.productsHeroTitle1 || ""}
              onChange={(e) => updateForm("productsHeroTitle1", e.target.value)}
              placeholder="Creative Assets & Digital"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.productsHeroTitle2 || ""}
              onChange={(e) => updateForm("productsHeroTitle2", e.target.value)}
              placeholder="Products, Crafted for"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 3</label>
            <input
              type="text"
              value={form.productsHeroTitle3 || ""}
              onChange={(e) => updateForm("productsHeroTitle3", e.target.value)}
              placeholder="Impact"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-bold text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Feature Boxes (Left & Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Feature Box 1 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3">
          <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Feature Box 1 (Left)
          </span>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Feature 1 Title</label>
            <input
              type="text"
              value={form.productsHeroFeature1Title || ""}
              onChange={(e) => updateForm("productsHeroFeature1Title", e.target.value)}
              placeholder="Premium Creative Assets"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Feature 1 Description</label>
            <textarea
              rows={3}
              value={form.productsHeroFeature1Desc || ""}
              onChange={(e) => updateForm("productsHeroFeature1Desc", e.target.value)}
              placeholder="Access high-quality motion graphics, transitions..."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Feature Box 2 */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3">
          <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Feature Box 2 (Right)
          </span>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Feature 2 Title</label>
            <input
              type="text"
              value={form.productsHeroFeature2Title || ""}
              onChange={(e) => updateForm("productsHeroFeature2Title", e.target.value)}
              placeholder="Platform-Optimized Content"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Feature 2 Description</label>
            <textarea
              rows={3}
              value={form.productsHeroFeature2Desc || ""}
              onChange={(e) => updateForm("productsHeroFeature2Desc", e.target.value)}
              placeholder="Videos tailored for YouTube, TikTok, Instagram..."
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
