"use client";

import React from "react";
import Link from "next/link";
import { Package, ExternalLink } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";

export function ProductsOverviewSection() {
  return (
    <SectionCard
      id="sec-products-overview"
      title="Products & Preset Catalog CMS"
      subtitle="Manage digital products, video presets, LUTs, and categories"
      icon={Package}
      headerAction={
        <Link
          href="/admin/products"
          className="px-3.5 py-2 rounded-xl bg-[#0080ff] hover:bg-[#0070e6] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md"
        >
          Open Products Manager <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="p-6 rounded-xl bg-slate-900/40 border border-white/10 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#0080ff]">
          <Package className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <h4 className="font-heading text-sm text-white font-medium">
            Digital Product & LUT Catalog
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-satoshi">
            Products, presets, pricing tiers, assets, and download links are managed in the dedicated Products Dashboard module.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="mt-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
        >
          Go to /admin/products →
        </Link>
      </div>
    </SectionCard>
  );
}
