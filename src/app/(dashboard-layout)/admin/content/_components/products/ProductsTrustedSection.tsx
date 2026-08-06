"use client";

import React from "react";
import { MessageSquare, Plus, Trash2, UserCheck, Type } from "lucide-react";
import { SiteConfig, TestimonialItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface ProductsTrustedSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ProductsTrustedSection({ form, updateForm }: ProductsTrustedSectionProps) {
  return (
    <SectionCard
      id="sec-products-trusted"
      title='Trusted by Creators Section ("Trusted by Thousands of Creators")'
      subtitle="Header badge, 4-line main title, and creator testimonial cards"
      icon={UserCheck}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.productsTestimonialsItems)
              ? form.productsTestimonialsItems
              : [];
            const newItem: TestimonialItem = {
              id: String(Date.now()),
              name: "Sara Austin",
              role: "Senior Video Editor",
              text: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
            };
            updateForm("productsTestimonialsItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Creator Review
        </button>
      }
    >
      {/* Badge & Subtitle Header */}
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Section Badge Tagline
        </label>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium">Badge Label</label>
          <input
            type="text"
            value={form.productsTrustedBadgeText || ""}
            onChange={(e) => updateForm("productsTrustedBadgeText", e.target.value)}
            placeholder="TRUSTED BY THOUSANDS OF CREATORS"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      {/* 4-Line Stacked Main Title */}
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          4-Line Stacked Main Title Header
        </label>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((num) => {
            const key = `productsTrustedTitleLine${num}` as keyof SiteConfig;
            return (
              <div key={num} className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Line {num}</label>
                <input
                  type="text"
                  value={(form[key] as string) || ""}
                  onChange={(e) => updateForm(key, e.target.value)}
                  placeholder={`Line ${num}...`}
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Creator Testimonial Cards */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Creator Testimonial Cards ({form.productsTestimonialsItems?.length || 0})
          </label>
        </div>

        {(form.productsTestimonialsItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Creator #{idx + 1}: {item.name || "Untitled"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.productsTestimonialsItems)
                    ? form.productsTestimonialsItems
                    : [];
                  updateForm(
                    "productsTestimonialsItems",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Creator Name</label>
                <input
                  type="text"
                  value={item.name || ""}
                  onChange={(e) => {
                    const current = [...(form.productsTestimonialsItems || [])];
                    current[idx] = { ...current[idx], name: e.target.value };
                    updateForm("productsTestimonialsItems", current);
                  }}
                  placeholder="e.g. Sara Austin"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Creator Role / Title</label>
                <input
                  type="text"
                  value={item.role || ""}
                  onChange={(e) => {
                    const current = [...(form.productsTestimonialsItems || [])];
                    current[idx] = { ...current[idx], role: e.target.value };
                    updateForm("productsTestimonialsItems", current);
                  }}
                  placeholder="e.g. Senior Video Editor"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Quote Text</label>
              <textarea
                rows={3}
                value={item.text || ""}
                onChange={(e) => {
                  const current = [...(form.productsTestimonialsItems || [])];
                  current[idx] = { ...current[idx], text: e.target.value };
                  updateForm("productsTestimonialsItems", current);
                }}
                placeholder="Full testimonial quote text..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>

            <MediaUploader
              label="Creator Avatar Image"
              value={item.avatar}
              onChange={(url) => {
                const current = [...(form.productsTestimonialsItems || [])];
                current[idx] = { ...current[idx], avatar: url || "" };
                updateForm("productsTestimonialsItems", current);
              }}
              accept="image/*"
              type="image"
            />
          </div>
        ))}

        {(!form.productsTestimonialsItems || form.productsTestimonialsItems.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No creator review cards added yet. Click &quot;Add Creator Review&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
