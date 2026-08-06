"use client";

import React from "react";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { SiteConfig, CourseFaqItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ContactFaqSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ContactFaqSection({ form, updateForm }: ContactFaqSectionProps) {
  const faqs: CourseFaqItem[] = Array.isArray(form.contactFaqItems) ? form.contactFaqItems : [];

  const addFaq = () => {
    updateForm("contactFaqItems", [
      ...faqs,
      { id: String(Date.now()), question: "", answer: "" },
    ]);
  };

  const updateFaq = (idx: number, field: keyof CourseFaqItem, value: string) => {
    const updated = faqs.map((faq, i) =>
      i === idx ? { ...faq, [field]: value } : faq
    );
    updateForm("contactFaqItems", updated);
  };

  const removeFaq = (idx: number) => {
    updateForm("contactFaqItems", faqs.filter((_, i) => i !== idx));
  };

  return (
    <SectionCard
      id="sec-contact-faq"
      title="Contact FAQ Section"
      subtitle="FAQ section headline and accordion Q&A items"
      icon={HelpCircle}
      headerAction={
        <button
          type="button"
          onClick={addFaq}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add FAQ
        </button>
      }
    >
      {/* Section Headlines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Title Line 1
          </label>
          <input
            type="text"
            value={form.contactFaqTitleLine1 || ""}
            onChange={(e) => updateForm("contactFaqTitleLine1", e.target.value)}
            placeholder="Have any questions?"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
            Title Line 2
          </label>
          <input
            type="text"
            value={form.contactFaqTitleLine2 || ""}
            onChange={(e) => updateForm("contactFaqTitleLine2", e.target.value)}
            placeholder="Read popular answers below"
            className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-semibold"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="flex flex-col gap-3 pt-2">
        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          FAQ Accordion Items ({faqs.length})
        </label>

        {faqs.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4 border border-dashed border-white/10 rounded-xl">
            No FAQ items yet. Click "Add FAQ" to add a question.
          </p>
        )}

        {faqs.map((faq, idx) => (
          <div
            key={faq.id || idx}
            className="flex flex-col gap-2.5 bg-[#0a0d1a] border border-white/8 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-blue-400 font-medium">FAQ #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeFaq(idx)}
                className="text-red-400 hover:text-red-300 transition-colors p-1 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateFaq(idx, "question", e.target.value)}
                placeholder="Enter question…"
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Answer</label>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                placeholder="Enter answer…"
                className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
