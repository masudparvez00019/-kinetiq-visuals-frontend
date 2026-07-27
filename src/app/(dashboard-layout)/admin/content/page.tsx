"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Sparkles,
  Check,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { siteConfigService } from "@/services/site-config.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import {
  centsToDollars,
  dollarsToCents,
  type SiteConfig,
  type UpdateSiteConfigPayload,
} from "@/types/site-config";

type Tab = "home" | "course" | "contact";

const DEFAULT_CONFIG: SiteConfig = {
  id: "singleton",
  homeHeroTitle1: "",
  homeHeroTitle2: "",
  homeHeroTitle3: "",
  homeHeroSubtitle: "",
  coursePriceCents: 0,
  courseCurrency: "USD",
  coursePriceLabel: "",
  courseDescription: "",
  mentorName: "",
  mentorTitle: "",
  mentorBio: "",
  mentorAvatarUrl: null,
  mentorExperience: "",
  mentorProjects: "",
  mentorStudents: "",
  contactEmail: "",
  contactPhone: "",
  updatedAt: "",
};

export default function AdminContentPage() {
  const router = useRouter();

  // Server data
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state (mirrors `config` once loaded)
  const [form, setForm] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [coursePriceDollars, setCoursePriceDollars] = useState("");

  // UI state
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchConfig = useCallback(async () => {
    if (!authService.getStoredToken()) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await siteConfigService.get();
      setConfig(data);
      setForm(data);
      setCoursePriceDollars(centsToDollars(data.coursePriceCents));
      setDirty(false);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load site config.");
      setError(message);
      if (/unauthor|forbidden|session|invalid|authentication/i.test(message)) {
        authService.clearSession();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Detect dirty state whenever the user edits any field
  useEffect(() => {
    const priceDollars = parseFloat(coursePriceDollars);
    const priceMatches =
      !Number.isNaN(priceDollars) &&
      Math.round(priceDollars * 100) === form.coursePriceCents;
    const isDirty =
      form.homeHeroTitle1 !== config.homeHeroTitle1 ||
      form.homeHeroTitle2 !== config.homeHeroTitle2 ||
      form.homeHeroTitle3 !== config.homeHeroTitle3 ||
      form.homeHeroSubtitle !== config.homeHeroSubtitle ||
      !priceMatches ||
      form.courseDescription !== config.courseDescription ||
      form.mentorName !== config.mentorName ||
      form.mentorTitle !== config.mentorTitle ||
      form.mentorBio !== config.mentorBio ||
      form.mentorExperience !== config.mentorExperience ||
      form.mentorProjects !== config.mentorProjects ||
      form.mentorStudents !== config.mentorStudents ||
      form.contactEmail !== config.contactEmail ||
      form.contactPhone !== config.contactPhone;
    setDirty(isDirty);
  }, [form, coursePriceDollars, config]);

  const updateForm = <K extends keyof SiteConfig>(
    key: K,
    value: SiteConfig[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dirty || saving) return;

    setSaving(true);
    setError(null);

    const priceCents = dollarsToCents(coursePriceDollars);

    // Build a partial patch — only the dirty fields are sent.
    const payload: UpdateSiteConfigPayload = {
      homeHeroTitle1: form.homeHeroTitle1,
      homeHeroTitle2: form.homeHeroTitle2,
      homeHeroTitle3: form.homeHeroTitle3,
      homeHeroSubtitle: form.homeHeroSubtitle,
      coursePriceCents: priceCents,
      courseDescription: form.courseDescription,
      mentorName: form.mentorName,
      mentorTitle: form.mentorTitle,
      mentorBio: form.mentorBio,
      mentorExperience: form.mentorExperience,
      mentorProjects: form.mentorProjects,
      mentorStudents: form.mentorStudents,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
    };

    try {
      const updated = await siteConfigService.update(payload);
      setConfig(updated);
      setForm(updated);
      setCoursePriceDollars(centsToDollars(updated.coursePriceCents));
      setDirty(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(getErrorMessage(err, "Could not save site content."));
    } finally {
      setSaving(false);
    }
  };

  const lastSavedLabel = useMemo(() => {
    if (!config.updatedAt) return null;
    return new Date(config.updatedAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [config.updatedAt]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
            Page Content CMS
          </h1>
          <p className="font-satoshi text-xs text-slate-500 font-light">
            Edit titles, subtitles, bios, contact credentials, and course prices dynamically.
          </p>
          {lastSavedLabel && (
            <span className="font-satoshi text-[10px] text-slate-600 mt-1">
              Last updated {lastSavedLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchConfig}
            disabled={loading || saving}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50"
            aria-label="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Reload
          </button>
          <button
            type="submit"
            form="content-form"
            disabled={!dirty || saving}
            className={`flex items-center gap-2 font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all self-start sm:self-auto ${
              saved
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : dirty
                  ? "bg-[#0080ff] hover:bg-[#0070e6] text-white shadow-[0_0_15px_rgba(0,128,255,0.25)]"
                  : "bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed"
            }`}
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving…
              </>
            ) : saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Changes Saved
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="font-satoshi text-xs text-red-400 font-light">
            {error}
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-6">
        {(["home", "course", "contact"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`font-heading font-normal text-sm pb-3.5 border-b-2 transition-all capitalize px-1 ${
              activeTab === tab
                ? "border-[#0080ff] text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab === "contact" ? "Contact Details" : `${tab} page`}
          </button>
        ))}
      </div>

      {/* Form Panel */}
      <div className="bg-[#070914] border border-white/5 rounded-2xl p-6 md:p-8 shadow-lg">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-500 font-satoshi text-xs">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading site content…
          </div>
        ) : (
          <form
            id="content-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {/* TAB 1: HOME */}
            {activeTab === "home" && (
              <div className="flex flex-col gap-5">
                <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  Home Hero Section Content
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Hero Title Line 1
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={160}
                      value={form.homeHeroTitle1}
                      onChange={(e) => updateForm("homeHeroTitle1", e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Hero Title Line 2
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={160}
                      value={form.homeHeroTitle2}
                      onChange={(e) => updateForm("homeHeroTitle2", e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Hero Title Line 3
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={160}
                      value={form.homeHeroTitle3}
                      onChange={(e) => updateForm("homeHeroTitle3", e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                    Hero Subtitle Copy
                  </label>
                  <textarea
                    rows={4}
                    required
                    maxLength={600}
                    value={form.homeHeroSubtitle}
                    onChange={(e) => updateForm("homeHeroSubtitle", e.target.value)}
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                  />
                  <span className="font-satoshi text-[10px] text-slate-600 self-end">
                    {form.homeHeroSubtitle.length}/600
                  </span>
                </div>
              </div>
            )}

            {/* TAB 2: COURSE */}
            {activeTab === "course" && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Course Hero Info
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Enrollment Price (USD)
                      </label>
                      <input
                        type="number"
                        required
                        min={0}
                        step="0.01"
                        value={coursePriceDollars}
                        onChange={(e) => setCoursePriceDollars(e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                      <span className="font-satoshi text-[10px] text-slate-600">
                        Stored as {dollarsToCents(coursePriceDollars) || 0} ¢
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-3">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Course Description
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={600}
                        value={form.courseDescription}
                        onChange={(e) => updateForm("courseDescription", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Course Mentor Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Mentor Name
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={120}
                        value={form.mentorName}
                        onChange={(e) => updateForm("mentorName", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Mentor Title
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={160}
                        value={form.mentorTitle}
                        onChange={(e) => updateForm("mentorTitle", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Years Experience
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={form.mentorExperience}
                        onChange={(e) => updateForm("mentorExperience", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Projects Delivered
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={form.mentorProjects}
                        onChange={(e) => updateForm("mentorProjects", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        Students Trained
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={form.mentorStudents}
                        onChange={(e) => updateForm("mentorStudents", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Mentor Biography
                    </label>
                    <textarea
                      rows={4}
                      required
                      maxLength={1200}
                      value={form.mentorBio}
                      onChange={(e) => updateForm("mentorBio", e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                    />
                    <span className="font-satoshi text-[10px] text-slate-600 self-end">
                      {form.mentorBio.length}/1200
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONTACT */}
            {activeTab === "contact" && (
              <div className="flex flex-col gap-5">
                <h3 className="font-heading font-normal text-base text-white flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  Business Contact Credentials
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Support Email Address
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      value={form.contactEmail}
                      onChange={(e) => updateForm("contactEmail", e.target.value.trim())}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      Support Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      minLength={3}
                      maxLength={40}
                      value={form.contactPhone}
                      onChange={(e) => updateForm("contactPhone", e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}