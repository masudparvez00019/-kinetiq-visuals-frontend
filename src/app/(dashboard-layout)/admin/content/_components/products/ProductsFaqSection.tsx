"use client";

import React from "react";
import { HelpCircle, Plus, Trash2, Type } from "lucide-react";
import { SiteConfig, FaqItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ProductsFaqSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ProductsFaqSection({ form, updateForm }: ProductsFaqSectionProps) {
  return (
    <SectionCard
      id="sec-products-faq"
      title='Products FAQ Section ("Have any questions?")'
      subtitle="Header title lines and expandable Q&A items"
      icon={HelpCircle}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.productsFaqItems) ? form.productsFaqItems : [];
            const newItem: FaqItem = {
              id: String(Date.now()),
              question: "What format are the asset files in?",
              answer:
                "Our asset packs include industry-standard formats such as MOV, MP4, WAV, CUBE LUTs, and project templates compatible with major video editing software.",
            };
            updateForm("productsFaqItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add FAQ Item
        </button>
      }
    >
      {/* 2-Line Header Title */}
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-blue-400" />
          Section Header Title Lines
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.productsFaqTitleLine1 || ""}
              onChange={(e) => updateForm("productsFaqTitleLine1", e.target.value)}
              placeholder="Have any questions?"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.productsFaqTitleLine2 || ""}
              onChange={(e) => updateForm("productsFaqTitleLine2", e.target.value)}
              placeholder="Read popular answers below"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
            />
          </div>
        </div>
      </div>

      {/* FAQ Items List */}
      <div className="flex flex-col gap-4 pt-2">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Accordion FAQ Items ({form.productsFaqItems?.length || 0})
          </label>
        </div>

        {(form.productsFaqItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Question #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.productsFaqItems) ? form.productsFaqItems : [];
                  updateForm(
                    "productsFaqItems",
                    current.filter((_, i) => i !== idx)
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove FAQ
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Question Text</label>
              <input
                type="text"
                value={item.question || ""}
                onChange={(e) => {
                  const current = [...(form.productsFaqItems || [])];
                  current[idx] = { ...current[idx], question: e.target.value };
                  updateForm("productsFaqItems", current);
                }}
                placeholder="What's included in the asset packs?"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Answer Text</label>
              <textarea
                rows={3}
                value={item.answer || ""}
                onChange={(e) => {
                  const current = [...(form.productsFaqItems || [])];
                  current[idx] = { ...current[idx], answer: e.target.value };
                  updateForm("productsFaqItems", current);
                }}
                placeholder="Detailed answer text..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}

        {(!form.productsFaqItems || form.productsFaqItems.length === 0) && (
          <div className="p-6 rounded-xl bg-black/20 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No FAQ items added yet. Click &quot;Add FAQ Item&quot; above to create one.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
