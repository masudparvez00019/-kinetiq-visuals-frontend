"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteConfig } from "@/types/site-config";
import { SectionCard } from "../shared/SectionCard";

interface ContactInfoSectionProps {
  form: SiteConfig;
  updateForm: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void;
}

export function ContactInfoSection({ form, updateForm }: ContactInfoSectionProps) {
  return (
    <SectionCard
      id="sec-contact-info"
      title="Contact Credentials & Business Email"
      subtitle="Public contact email address and business phone numbers"
      icon={Sparkles}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Support / Inquiry Email
          </label>
          <input
            type="email"
            value={form.contactEmail || ""}
            onChange={(e) => updateForm("contactEmail", e.target.value)}
            placeholder="hello@kinetiqvisuals.com"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Business Phone / WhatsApp
          </label>
          <input
            type="text"
            value={form.contactPhone || ""}
            onChange={(e) => updateForm("contactPhone", e.target.value)}
            placeholder="+1 (555) 019-2834"
            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>
    </SectionCard>
  );
}
