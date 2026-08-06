"use client";

import React from "react";
import { Sparkles, Trash2, Plus } from "lucide-react";
import { SiteConfig, ServiceItem } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ServicesSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ServicesSection({ form, updateForm }: ServicesSectionProps) {
  return (
    <SectionCard
      id="sec-services"
      title="Video Editing Services Offered"
      subtitle="Interactive services list cards and call-to-action link"
      icon={Sparkles}
      headerAction={
        <button
          type="button"
          onClick={() => {
            const current = Array.isArray(form.servicesItems) ? form.servicesItems : [];
            const newItem: ServiceItem = {
              id: String(Date.now()),
              title: "New Service",
              desc: "",
              price: "$499",
              image: "/service-1.jpg",
            };
            updateForm("servicesItems", [...current, newItem]);
          }}
          className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> Add Service Card
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Services Section Main Title
          </label>
          <input
            type="text"
            value={form.servicesTitle || ""}
            onChange={(e) => updateForm("servicesTitle", e.target.value)}
            placeholder="Services Built Around Your Goals"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Services CTA Link Label
          </label>
          <input
            type="text"
            value={form.servicesCtaText || ""}
            onChange={(e) => updateForm("servicesCtaText", e.target.value)}
            placeholder="Book a Discovery Call"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Services CTA Href URL
          </label>
          <input
            type="text"
            value={form.servicesCtaLink || ""}
            onChange={(e) => updateForm("servicesCtaLink", e.target.value)}
            placeholder="/contact"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {(form.servicesItems || []).map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
              <span className="text-xs font-semibold text-blue-400">
                Service #{idx + 1}: {item.title || "Untitled"}
              </span>
              <button
                type="button"
                onClick={() => {
                  const current = Array.isArray(form.servicesItems) ? form.servicesItems : [];
                  updateForm(
                    "servicesItems",
                    current.filter((_, i) => i !== idx),
                  );
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Service Title</label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) => {
                    const current = [...(form.servicesItems || [])];
                    current[idx] = { ...current[idx], title: e.target.value };
                    updateForm("servicesItems", current);
                  }}
                  placeholder="e.g. Cinematic Property Walkthroughs"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Price / Tag</label>
                <input
                  type="text"
                  value={item.price || ""}
                  onChange={(e) => {
                    const current = [...(form.servicesItems || [])];
                    current[idx] = { ...current[idx], price: e.target.value };
                    updateForm("servicesItems", current);
                  }}
                  placeholder="e.g. $499 / video"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-400 font-medium">Image URL</label>
                <input
                  type="text"
                  value={item.image || ""}
                  onChange={(e) => {
                    const current = [...(form.servicesItems || [])];
                    current[idx] = { ...current[idx], image: e.target.value };
                    updateForm("servicesItems", current);
                  }}
                  placeholder="/service-1.jpg"
                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-slate-400 font-medium">Description</label>
              <textarea
                rows={2}
                value={item.desc || ""}
                onChange={(e) => {
                  const current = [...(form.servicesItems || [])];
                  current[idx] = { ...current[idx], desc: e.target.value };
                  updateForm("servicesItems", current);
                }}
                placeholder="Full description of this editing service offering..."
                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none"
              />
            </div>
          </div>
        ))}

        {(!form.servicesItems || form.servicesItems.length === 0) && (
          <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
            No service items added yet. Click "+ Add Service Card" above to add services.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
