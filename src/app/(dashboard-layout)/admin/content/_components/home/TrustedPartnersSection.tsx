"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, PartnerLogoItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface TrustedPartnersSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function TrustedPartnersSection({ form, updateForm }: TrustedPartnersSectionProps) {
  return (
    <SectionCard
      id="sec-trusted-partners"
      title='Trusted By ("Brands We Work With")'
      subtitle="Client/Partner brand logos marquee banner"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.trustedByLogos) ? form.trustedByLogos : [];
            const newItem: PartnerLogoItem = {
              id: String(Date.now()),
              name: "New Partner",
              logoUrl: "",
            };
            updateForm("trustedByLogos", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Partner
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Section Title Header
        </label>
        <input
          type="text"
          value={form.trustedByTitle || ""}
          onChange={(e) => updateForm("trustedByTitle", e.target.value)}
          placeholder="TRUSTED BY INDUSTRY LEADERS"
          className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {(form.trustedByLogos || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                Partner #{idx + 1}: {item.name || "Untitled"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.trustedByLogos) ? form.trustedByLogos : [];
                  updateForm(
                    "trustedByLogos",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Partner Name</label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => {
                  const current = [...(form.trustedByLogos || [])];
                  current[idx] = { ...current[idx], name: e.target.value };
                  updateForm("trustedByLogos", current);
                }}
                placeholder="e.g. Sotheby's"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>

            <MediaUploader
              label="Partner Logo Image"
              value={item.logoUrl}
              onChange={(url) => {
                const current = [...(form.trustedByLogos || [])];
                current[idx] = { ...current[idx], logoUrl: url || "" };
                updateForm("trustedByLogos", current);
              }}
              accept="image/*"
              type="image"
            />
          </div>
        ))}

        {(!form.trustedByLogos || form.trustedByLogos.length === 0) && (
          <div className="lg:col-span-3 p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No partner logos added yet. Click "+ Add Partner" above to add client brand logos.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
