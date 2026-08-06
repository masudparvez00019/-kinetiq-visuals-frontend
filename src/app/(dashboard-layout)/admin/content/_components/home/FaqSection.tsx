"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, FaqItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface FaqSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function FaqSection({ form, updateForm }: FaqSectionProps) {
  return (
    <SectionCard
      id="sec-faq"
      title='FAQ Section ("Frequently Asked Questions")'
      subtitle="Side badges, main titles, and collapsible Q&A list items"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.faqItems) ? form.faqItems : [];
            const newItem: FaqItem = {
              id: String(Date.now()),
              question: "New Question?",
              answer: "Detailed answer goes here.",
            };
            updateForm("faqItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add FAQ Item
        </button>
      }
    >
      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Floating Side Badges
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-3 rounded-lg bg-black/30 border border-white/5">
            <span className="text-[10px] font-bold text-blue-400">Left Badge Card</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={form.faqBadgeLeftTitle || ""}
                onChange={(e) => updateForm("faqBadgeLeftTitle", e.target.value)}
                placeholder="24/7 Support"
                className="bg-[#0a0d1a] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                value={form.faqBadgeLeftSubtitle || ""}
                onChange={(e) => updateForm("faqBadgeLeftSubtitle", e.target.value)}
                placeholder="Always Here"
                className="bg-[#0a0d1a] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3 rounded-lg bg-black/30 border border-white/5">
            <span className="text-[10px] font-bold text-blue-400">Right Badge Card</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={form.faqBadgeRightTitle || ""}
                onChange={(e) => updateForm("faqBadgeRightTitle", e.target.value)}
                placeholder="100% Quality"
                className="bg-[#0a0d1a] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="text"
                value={form.faqBadgeRightSubtitle || ""}
                onChange={(e) => updateForm("faqBadgeRightSubtitle", e.target.value)}
                placeholder="Guaranteed"
                className="bg-[#0a0d1a] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Section Title (2 Lines)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 1</label>
            <input
              type="text"
              value={form.faqTitleLine1 || ""}
              onChange={(e) => updateForm("faqTitleLine1", e.target.value)}
              placeholder="Have any questions?"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-400 font-medium">Title Line 2</label>
            <input
              type="text"
              value={form.faqTitleLine2 || ""}
              onChange={(e) => updateForm("faqTitleLine2", e.target.value)}
              placeholder="Read popular answers below"
              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {(form.faqItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-3 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                FAQ #{idx + 1}: {item.question || "Untitled Question"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.faqItems) ? form.faqItems : [];
                  updateForm(
                    "faqItems",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove FAQ
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Question</label>
              <input
                type="text"
                value={item.question || ""}
                onChange={(e) => {
                  const current = [...(form.faqItems || [])];
                  current[idx] = { ...current[idx], question: e.target.value };
                  updateForm("faqItems", current);
                }}
                placeholder="e.g. What video editing services do you provide?"
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Answer</label>
              <textarea
                rows={3}
                value={item.answer || ""}
                onChange={(e) => {
                  const current = [...(form.faqItems || [])];
                  current[idx] = { ...current[idx], answer: e.target.value };
                  updateForm("faqItems", current);
                }}
                placeholder="Full answer text..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}

        {(!form.faqItems || form.faqItems.length === 0) && (
          <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No FAQ items added yet. Click "+ Add FAQ Item" above to add questions and answers.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
