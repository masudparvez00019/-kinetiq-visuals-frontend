"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, FooterNavLinkItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface FooterSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function FooterSection({ form, updateForm }: FooterSectionProps) {
  return (
    <SectionCard
      id="sec-footer"
      title={'Footer Section ("Let\'s Create Something Worth Watching")'}
      subtitle="Social links, 3-line heading, brand text, copyright notice, and horizon navigation links"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.footerNavLinks) ? form.footerNavLinks : [];
            const newItem: FooterNavLinkItem = {
              id: String(Date.now()),
              label: "New Link",
              href: "/#section",
            };
            updateForm("footerNavLinks", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Nav Link
        </button>
      }
    >
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Social Media Links
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Twitter / X URL</label>
            <input
              type="text"
              value={form.footerTwitterUrl || ""}
              onChange={(e) => updateForm("footerTwitterUrl", e.target.value)}
              placeholder="https://twitter.com"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">LinkedIn URL</label>
            <input
              type="text"
              value={form.footerLinkedinUrl || ""}
              onChange={(e) => updateForm("footerLinkedinUrl", e.target.value)}
              placeholder="https://linkedin.com"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Instagram URL</label>
            <input
              type="text"
              value={form.footerInstagramUrl || ""}
              onChange={(e) => updateForm("footerInstagramUrl", e.target.value)}
              placeholder="https://instagram.com"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Footer Heading Title (3 Stacked Lines)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.footerTitleLine1 || ""}
              onChange={(e) => updateForm("footerTitleLine1", e.target.value)}
              placeholder="Let's Create"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.footerTitleLine2 || ""}
              onChange={(e) => updateForm("footerTitleLine2", e.target.value)}
              placeholder="Something Worth"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 3</label>
            <input
              type="text"
              value={form.footerTitleLine3 || ""}
              onChange={(e) => updateForm("footerTitleLine3", e.target.value)}
              placeholder="Watching"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaUploader
          label="Footer Brand Logo Image (Optional)"
          value={form.footerBrandLogoUrl}
          onChange={(url) => updateForm("footerBrandLogoUrl", url)}
          accept="image/*"
          type="image"
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Brand Logo Text
            </label>
            <input
              type="text"
              value={form.footerBrandText || ""}
              onChange={(e) => updateForm("footerBrandText", e.target.value)}
              placeholder="KQ VISUALS"
              className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Copyright Notice Text
            </label>
            <input
              type="text"
              value={form.footerCopyrightText || ""}
              onChange={(e) => updateForm("footerCopyrightText", e.target.value)}
              placeholder="© KQ Visuals All Rights Reserved 2026"
              className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Footer Horizon Menu Links ({form.footerNavLinks?.length || 0})
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(form.footerNavLinks || []).map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
            >
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="text-xs font-semibold text-blue-400">
                  Link #{idx + 1}: {item.label || "Untitled Link"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const current = Array.isArray(form.footerNavLinks) ? form.footerNavLinks : [];
                    updateForm(
                      "footerNavLinks",
                      current.filter((_, i) => i !== idx),
                    );
                  }}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-medium">Link Label</label>
                  <input
                    type="text"
                    value={item.label || ""}
                    onChange={(e) => {
                      const current = [...(form.footerNavLinks || [])];
                      current[idx] = { ...current[idx], label: e.target.value };
                      updateForm("footerNavLinks", current);
                    }}
                    placeholder="Services"
                    className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-400 font-medium">Target URL / Href</label>
                  <input
                    type="text"
                    value={item.href || ""}
                    onChange={(e) => {
                      const current = [...(form.footerNavLinks || [])];
                      current[idx] = { ...current[idx], href: e.target.value };
                      updateForm("footerNavLinks", current);
                    }}
                    placeholder="/#services"
                    className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                  />
                </div>
              </div>
            </div>
          ))}

          {(!form.footerNavLinks || form.footerNavLinks.length === 0) && (
            <div className="md:col-span-2 p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
              No footer nav links added yet. Click "+ Add Nav Link" above to add menu items.
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}
