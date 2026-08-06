"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, TestimonialItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

interface TestimonialsSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function TestimonialsSection({ form, updateForm }: TestimonialsSectionProps) {
  return (
    <SectionCard
      id="sec-testimonials"
      title='Client Testimonials ("What Clients Say")'
      subtitle="Client feedback cards with avatars, ratings, and video URL"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.testimonialsItems) ? form.testimonialsItems : [];
            const newItem: TestimonialItem = {
              id: String(Date.now()),
              name: "New Client",
              role: "Real Estate Agent",
              text: "",
              avatar: "",
              videoUrl: "",
            };
            updateForm("testimonialsItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Testimonial Card
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Testimonials Badge Text
          </label>
          <input
            type="text"
            value={form.testimonialsBadgeText || ""}
            onChange={(e) => updateForm("testimonialsBadgeText", e.target.value)}
            placeholder="TESTIMONIALS"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Testimonials Section Title
          </label>
          <input
            type="text"
            value={form.testimonialsTitle || ""}
            onChange={(e) => updateForm("testimonialsTitle", e.target.value)}
            placeholder="Trusted by Top Real Estate Brokers Worldwide"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {(form.testimonialsItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                Testimonial #{idx + 1}: {item.name || "Untitled"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.testimonialsItems) ? form.testimonialsItems : [];
                  updateForm(
                    "testimonialsItems",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove Testimonial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Client Name</label>
                <input
                  type="text"
                  value={item.name || ""}
                  onChange={(e) => {
                    const current = [...(form.testimonialsItems || [])];
                    current[idx] = { ...current[idx], name: e.target.value };
                    updateForm("testimonialsItems", current);
                  }}
                  placeholder="e.g. Sarah Jenkins"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Client Role / Title</label>
                <input
                  type="text"
                  value={item.role || ""}
                  onChange={(e) => {
                    const current = [...(form.testimonialsItems || [])];
                    current[idx] = { ...current[idx], role: e.target.value };
                    updateForm("testimonialsItems", current);
                  }}
                  placeholder="e.g. Senior Broker, Compass"
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
                  const current = [...(form.testimonialsItems || [])];
                  current[idx] = { ...current[idx], text: e.target.value };
                  updateForm("testimonialsItems", current);
                }}
                placeholder="Full testimonial text quote..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <MediaUploader
                label="Client Avatar Image"
                value={item.avatar}
                onChange={(url) => {
                  const current = [...(form.testimonialsItems || [])];
                  current[idx] = { ...current[idx], avatar: url || "" };
                  updateForm("testimonialsItems", current);
                }}
                accept="image/*"
                type="image"
              />

              <MediaUploader
                label="Video Testimonial URL (Optional)"
                value={item.videoUrl}
                onChange={(url) => {
                  const current = [...(form.testimonialsItems || [])];
                  current[idx] = { ...current[idx], videoUrl: url || "" };
                  updateForm("testimonialsItems", current);
                }}
                accept="video/*"
                type="video"
              />
            </div>
          </div>
        ))}

        {(!form.testimonialsItems || form.testimonialsItems.length === 0) && (
          <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No testimonial cards added yet. Click "+ Add Testimonial Card" above to add client reviews.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
