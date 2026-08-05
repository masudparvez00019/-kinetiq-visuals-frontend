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
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import {
  centsToDollars,
  dollarsToCents,
  type SiteConfig,
  type UpdateSiteConfigPayload,
} from "@/types/site-config";
import { useAdminTheme } from "@/context/admin-theme-context";
import { MediaUploader } from "@/components/shared/dashboard/MediaUploader";

type Tab = "home" | "course" | "contact";

const DEFAULT_CONFIG: SiteConfig = {
  id: "singleton",
  brandLogoUrl: null,
  brandLogoText: "KQ VISUALS",
  navLinks: [],
  homeHeroTitle1: "",
  homeHeroTitle2: "",
  homeHeroTitle3: "",
  homeHeroSubtitle: "",
  heroCtaText: "Book a Free Strategy Call",
  heroCtaLink: "/contact",
  heroHappyClientsText: "60+ Happy Clients",
  heroHappyClientsAvatars: [],
  heroQuoteText: "",
  heroQuoteAuthorImage: null,
  heroQuoteAuthorName: "",
  heroQuoteAuthorTitle: "",
  heroQuoteCompany: "KinetiQ Visuals",
  heroVideoUrl: null,
  heroPosterUrl: null,
  showcaseTitle: "See What Your Content Could Become",
  showcaseSubtitle: "",
  showcaseVideoUrl: null,
  showcasePosterUrl: null,
  trustedByTitle: "Recent clients & partners",
  trustedByLogos: [],
  caseStudiesTitle: "Case Studies",
  caseStudiesSubtitle: "Real projects. Real growth. Real impact.",
  caseStudiesItems: [],
  servicesTitle: "Video Editing Services Built Around Your Goals",
  servicesCtaText: "Book A Service Today",
  servicesCtaLink: "/contact",
  servicesItems: [],
  testimonialsBadgeText: "Testimonials",
  testimonialsTitle: "What they say about Us?",
  testimonialsItems: [],
  processBadgeText: "Our Process",
  processTitleLine1: "THE",
  processTitleLine2: "PROCESS",
  processTitleLine3: "BEHIND",
  processTitleLine4: "THE",
  processTitleLine5: "RESULTS.",
  processSubtitle: "A streamlined workflow designed to turn raw footage into scroll-stopping content that drives real growth.",
  processSteps: [],
  ctaSectionBadgeText: "Let's Create Engaging Contents",
  ctaSectionTitle1: "Ready to Turn Raw Footage",
  ctaSectionTitle2: "Into High-Performing",
  ctaSectionTitle3: "Content?",
  ctaSectionDesc: "In today's crowded digital landscape, great content alone isn't enough—presentation matters. Professionally edited videos help your brand stand out, communicate your message clearly, and keep viewers engaged from the first second to the last.",
  ctaSectionTags: ["Travel", "Cooking", "Fitness", "Gardening", "Tech Reviews"],
  ctaSectionBtnText: "Get Started Today",
  ctaSectionBtnLink: "/#services",
  faqBadgeLeftTitle: "Your RAW",
  faqBadgeLeftSubtitle: "Footage",
  faqBadgeRightTitle: "KQ",
  faqBadgeRightSubtitle: "Visuals",
  faqTitleLine1: "Have any questions?",
  faqTitleLine2: "Read popular answers below",
  faqItems: [],
  footerTwitterUrl: "https://twitter.com",
  footerLinkedinUrl: "https://linkedin.com",
  footerInstagramUrl: "https://instagram.com",
  footerTitleLine1: "Let's Create",
  footerTitleLine2: "Something Worth",
  footerTitleLine3: "Watching",
  footerBrandText: "KQ VISUALS",
  footerCopyrightText: "© KQ Visuals All Rights Reserved 2026",
  footerNavLinks: [
    { label: "Services", href: "/#services" },
    { label: "Works", href: "/#works" },
    { label: "Process", href: "/#process" },
    { label: "Products", href: "/products" },
    { label: "Course", href: "/course" },
  ],
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
  updatedAt: new Date().toISOString(),
};

export default function AdminContentPage() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  // Server data
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state (mirrors `config` once loaded)
  const [form, setForm] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [coursePriceDollars, setCoursePriceDollars] = useState<string>("0");

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

  const updateForm = <K extends keyof SiteConfig>(
    key: K,
    value: SiteConfig[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handlePriceChange = (val: string) => {
    setCoursePriceDollars(val);
    setDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dirty || saving) return;

    setSaving(true);
    setError(null);

    const priceCents = dollarsToCents(coursePriceDollars);

    // Build a partial patch — only the dirty fields are sent.
    const payload: UpdateSiteConfigPayload = {
      brandLogoUrl: form.brandLogoUrl,
      brandLogoText: form.brandLogoText,
      navLinks: form.navLinks,
      homeHeroTitle1: form.homeHeroTitle1,
      homeHeroTitle2: form.homeHeroTitle2,
      homeHeroTitle3: form.homeHeroTitle3,
      homeHeroSubtitle: form.homeHeroSubtitle,
      heroCtaText: form.heroCtaText,
      heroCtaLink: form.heroCtaLink,
      heroHappyClientsText: form.heroHappyClientsText,
      heroHappyClientsAvatars: form.heroHappyClientsAvatars,
      heroQuoteText: form.heroQuoteText,
      heroQuoteAuthorImage: form.heroQuoteAuthorImage,
      heroQuoteAuthorName: form.heroQuoteAuthorName,
      heroQuoteAuthorTitle: form.heroQuoteAuthorTitle,
      heroQuoteCompany: form.heroQuoteCompany,
      heroVideoUrl: form.heroVideoUrl,
      heroPosterUrl: form.heroPosterUrl,
      showcaseTitle: form.showcaseTitle,
      showcaseSubtitle: form.showcaseSubtitle,
      showcaseVideoUrl: form.showcaseVideoUrl,
      showcasePosterUrl: form.showcasePosterUrl,
      trustedByTitle: form.trustedByTitle,
      trustedByLogos: form.trustedByLogos,
      caseStudiesTitle: form.caseStudiesTitle,
      caseStudiesSubtitle: form.caseStudiesSubtitle,
      caseStudiesItems: form.caseStudiesItems,
      servicesTitle: form.servicesTitle,
      servicesCtaText: form.servicesCtaText,
      servicesCtaLink: form.servicesCtaLink,
      servicesItems: form.servicesItems,
      testimonialsBadgeText: form.testimonialsBadgeText,
      testimonialsTitle: form.testimonialsTitle,
      testimonialsItems: form.testimonialsItems,
      processBadgeText: form.processBadgeText,
      processTitleLine1: form.processTitleLine1,
      processTitleLine2: form.processTitleLine2,
      processTitleLine3: form.processTitleLine3,
      processTitleLine4: form.processTitleLine4,
      processTitleLine5: form.processTitleLine5,
      processSubtitle: form.processSubtitle,
      processSteps: form.processSteps,
      ctaSectionBadgeText: form.ctaSectionBadgeText,
      ctaSectionTitle1: form.ctaSectionTitle1,
      ctaSectionTitle2: form.ctaSectionTitle2,
      ctaSectionTitle3: form.ctaSectionTitle3,
      ctaSectionDesc: form.ctaSectionDesc,
      ctaSectionTags: form.ctaSectionTags,
      ctaSectionBtnText: form.ctaSectionBtnText,
      ctaSectionBtnLink: form.ctaSectionBtnLink,
      faqBadgeLeftTitle: form.faqBadgeLeftTitle,
      faqBadgeLeftSubtitle: form.faqBadgeLeftSubtitle,
      faqBadgeRightTitle: form.faqBadgeRightTitle,
      faqBadgeRightSubtitle: form.faqBadgeRightSubtitle,
      faqTitleLine1: form.faqTitleLine1,
      faqTitleLine2: form.faqTitleLine2,
      faqItems: form.faqItems,
      footerTwitterUrl: form.footerTwitterUrl,
      footerLinkedinUrl: form.footerLinkedinUrl,
      footerInstagramUrl: form.footerInstagramUrl,
      footerTitleLine1: form.footerTitleLine1,
      footerTitleLine2: form.footerTitleLine2,
      footerTitleLine3: form.footerTitleLine3,
      footerBrandText: form.footerBrandText,
      footerCopyrightText: form.footerCopyrightText,
      footerNavLinks: form.footerNavLinks,
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
      toast.success("Page content updated successfully!");
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      const msg = getErrorMessage(err, "Could not save site content.");
      setError(msg);
      toast.error(msg);
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

  const handleReload = async () => {
    await fetchConfig();
    toast.success("Content reloaded successfully!");
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className={`font-heading font-normal text-2xl md:text-3xl ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Page Content CMS
          </h1>
          <p className={`font-satoshi text-xs font-light ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Edit titles, subtitles, CTAs, media uploads, bios, contact credentials, and course prices dynamically.
          </p>
          {lastSavedLabel && (
            <span className={`font-satoshi text-[10px] mt-1 ${
              isLight ? "text-slate-500" : "text-slate-600"
            }`}>
              Last updated {lastSavedLabel}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReload}
            disabled={loading || saving}
            className={`flex items-center gap-2 font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50 border ${
              isLight
                ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
            }`}
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
                ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                : dirty
                  ? "bg-[#0080ff] hover:bg-[#0070e6] text-white shadow-md"
                  : isLight
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
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
      <div className={`flex border-b gap-6 ${isLight ? "border-slate-200" : "border-white/5"}`}>
        {(["home", "course", "contact"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`font-heading font-normal text-sm pb-3.5 border-b-2 transition-all capitalize px-1 ${
              activeTab === tab
                ? "border-[#0080ff] text-[#0080ff] font-bold"
                : isLight
                ? "border-transparent text-slate-500 hover:text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab === "contact" ? "Contact Details" : `${tab} page`}
          </button>
        ))}
      </div>

      {/* Form Panel */}
      <div className={`border rounded-2xl p-6 md:p-8 ${
        isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5 shadow-lg"
      }`}>
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-slate-500 font-satoshi text-xs">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading site content…
          </div>
        ) : (
          <form
            id="content-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
          >
            {/* TAB 1: HOME */}
            {activeTab === "home" && (
              <div className="flex flex-col gap-8">
                {/* 1. Header & Brand Logo */}
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Header & Brand Logo
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Brand Logo Text
                      </label>
                      <input
                        type="text"
                        value={form.brandLogoText || ""}
                        onChange={(e) => updateForm("brandLogoText", e.target.value)}
                        placeholder="e.g. KQ VISUALS"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <MediaUploader
                      label="Brand Logo Image (Optional)"
                      value={form.brandLogoUrl}
                      onChange={(url) => updateForm("brandLogoUrl", url)}
                      accept="image/*"
                      type="image"
                      placeholder="Upload logo image..."
                    />
                  </div>
                </div>

                {/* 2. Hero Headline & Subtitle */}
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Hero Headline Lines
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Title Line 1
                      </label>
                      <input
                        type="text"
                        required
                        value={form.homeHeroTitle1}
                        onChange={(e) => updateForm("homeHeroTitle1", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Title Line 2
                      </label>
                      <input
                        type="text"
                        required
                        value={form.homeHeroTitle2}
                        onChange={(e) => updateForm("homeHeroTitle2", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Title Line 3
                      </label>
                      <input
                        type="text"
                        required
                        value={form.homeHeroTitle3}
                        onChange={(e) => updateForm("homeHeroTitle3", e.target.value)}
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Primary CTA & Social Proof */}
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    CTA Button & Social Proof
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={form.heroCtaText || ""}
                        onChange={(e) => updateForm("heroCtaText", e.target.value)}
                        placeholder="e.g. Book a Free Strategy Call"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Target Link
                      </label>
                      <input
                        type="text"
                        value={form.heroCtaLink || ""}
                        onChange={(e) => updateForm("heroCtaLink", e.target.value)}
                        placeholder="e.g. /contact or Calendly link"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Social Proof Badge Text
                      </label>
                      <input
                        type="text"
                        value={form.heroHappyClientsText || ""}
                        onChange={(e) => updateForm("heroHappyClientsText", e.target.value)}
                        placeholder="e.g. 60+ Happy Clients"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Testimonial / Founder Quote Card */}
                <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Founder / Testimonial Quote Card
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                          Quote Text
                        </label>
                        <textarea
                          rows={3}
                          value={form.heroQuoteText || ""}
                          onChange={(e) => updateForm("heroQuoteText", e.target.value)}
                          placeholder="e.g. FAST DELIVERY, CLEAR COMMUNICATION..."
                          className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Author Name
                          </label>
                          <input
                            type="text"
                            value={form.heroQuoteAuthorName || ""}
                            onChange={(e) => updateForm("heroQuoteAuthorName", e.target.value)}
                            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                            Author Designation
                          </label>
                          <input
                            type="text"
                            value={form.heroQuoteAuthorTitle || ""}
                            onChange={(e) => updateForm("heroQuoteAuthorTitle", e.target.value)}
                            className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                          />
                        </div>
                      </div>
                    </div>

                    <MediaUploader
                      label="Founder / Author Image"
                      value={form.heroQuoteAuthorImage}
                      onChange={(url) => updateForm("heroQuoteAuthorImage", url)}
                      accept="image/*"
                      type="image"
                      placeholder="Upload founder photo..."
                    />
                  </div>
                </div>

                {/* 5. Background Media (Video & Poster) */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Hero Background Media
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <MediaUploader
                      label="Background Video"
                      value={form.heroVideoUrl}
                      onChange={(url) => updateForm("heroVideoUrl", url)}
                      accept="video/mp4,video/webm,video/*"
                      type="video"
                      placeholder="Upload background video (MP4/WebM)..."
                    />

                    <MediaUploader
                      label="Video Poster Image (Fallback)"
                      value={form.heroPosterUrl}
                      onChange={(url) => updateForm("heroPosterUrl", url)}
                      accept="image/*"
                      type="image"
                      placeholder="Upload poster image..."
                    />
                  </div>
                </div>

                 {/* 6. Recent Clients & Partners Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Recent Clients & Partners Section ("Trusted By")
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Section Heading Title
                    </label>
                    <input
                      type="text"
                      required
                      value={form.trustedByTitle || ""}
                      onChange={(e) => updateForm("trustedByTitle", e.target.value)}
                      placeholder="e.g. Recent clients & partners"
                      className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>

                  {/* Dynamic Partner Logos List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Partner Logos & Brands ({form.trustedByLogos?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.trustedByLogos) ? form.trustedByLogos : [];
                          const newItem = {
                            id: String(Date.now()),
                            name: `Partner ${current.length + 1}`,
                            textLogo: `BRAND ${current.length + 1}`,
                            subtext: "",
                            logoUrl: "",
                          };
                          updateForm("trustedByLogos", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Partner Logo
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {(form.trustedByLogos || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                            <span className="text-xs font-semibold text-slate-300">
                              Partner #{idx + 1}: {item.name || "Unnamed Brand"}
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
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] text-slate-400 font-medium">Brand Name</label>
                                <input
                                  type="text"
                                  value={item.name || ""}
                                  onChange={(e) => {
                                    const current = [...(form.trustedByLogos || [])];
                                    current[idx] = { ...current[idx], name: e.target.value, textLogo: e.target.value };
                                    updateForm("trustedByLogos", current);
                                  }}
                                  placeholder="e.g. Sotheby's / Compass"
                                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-[10px] text-slate-400 font-medium">Subtext / Tagline (Optional)</label>
                                <input
                                  type="text"
                                  value={item.subtext || ""}
                                  onChange={(e) => {
                                    const current = [...(form.trustedByLogos || [])];
                                    current[idx] = { ...current[idx], subtext: e.target.value };
                                    updateForm("trustedByLogos", current);
                                  }}
                                  placeholder="e.g. International Realty"
                                  className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                                />
                              </div>
                            </div>

                            <MediaUploader
                              label="Partner Logo Image (Optional - overrides text)"
                              value={item.logoUrl}
                              onChange={(url) => {
                                const current = [...(form.trustedByLogos || [])];
                                current[idx] = { ...current[idx], logoUrl: url };
                                updateForm("trustedByLogos", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload logo SVG/PNG..."
                            />
                          </div>
                        </div>
                      ))}

                      {(!form.trustedByLogos || form.trustedByLogos.length === 0) && (
                        <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
                          No partner logos added yet. Click "+ Add Partner Logo" above to add clients/partners.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 7. Showcase Video Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Showcase Video Section ("See What Your Content Could Become")
                  </h3>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Showcase Heading Title
                    </label>
                    <input
                      type="text"
                      required
                      value={form.showcaseTitle}
                      onChange={(e) => updateForm("showcaseTitle", e.target.value)}
                      placeholder="e.g. See What Your Content Could Become"
                      className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Showcase Subtitle Description
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={form.showcaseSubtitle}
                      onChange={(e) => updateForm("showcaseSubtitle", e.target.value)}
                      placeholder="e.g. From short–form social content to high–end commercial edits..."
                      className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <MediaUploader
                      label="Showcase Video (MP4/WebM)"
                      value={form.showcaseVideoUrl}
                      onChange={(url) => updateForm("showcaseVideoUrl", url)}
                      accept="video/mp4,video/webm,video/*"
                      type="video"
                      placeholder="Upload showcase video file..."
                    />

                    <MediaUploader
                      label="Showcase Video Poster Image"
                      value={form.showcasePosterUrl}
                      onChange={(url) => updateForm("showcasePosterUrl", url)}
                      accept="image/*"
                      type="image"
                      placeholder="Upload video poster image..."
                    />
                  </div>
                </div>

                {/* 8. Case Studies Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Case Studies Section ("Real projects. Real growth. Real impact.")
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Section Title
                      </label>
                      <input
                        type="text"
                        required
                        value={form.caseStudiesTitle || ""}
                        onChange={(e) => updateForm("caseStudiesTitle", e.target.value)}
                        placeholder="e.g. Case Studies"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Section Tagline / Subtitle
                      </label>
                      <input
                        type="text"
                        required
                        value={form.caseStudiesSubtitle || ""}
                        onChange={(e) => updateForm("caseStudiesSubtitle", e.target.value)}
                        placeholder="e.g. Real projects. Real growth. Real impact."
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* Dynamic Case Studies List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Case Study Cards ({form.caseStudiesItems?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.caseStudiesItems) ? form.caseStudiesItems : [];
                          const newItem = {
                            id: String(Date.now()),
                            clientName: `New Client ${current.length + 1}`,
                            campaignName: "90 Day Campaign",
                            campaignGoal: "Goal: Growth & Conversions",
                            stats: [
                              { value: "200%", label: "Growth" },
                              { value: "150+", label: "Leads" },
                              { value: "45%", label: "Retention" },
                            ],
                            tags: ["Video", "Ads", "Growth"],
                            videoSrc: "/video/video.mp4",
                            poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                            testimonial: {
                              quote: "Great results and clear communication throughout the campaign.",
                              authorName: "Client Name",
                              authorTitle: "CEO | Company",
                              avatar: "",
                            },
                          };
                          updateForm("caseStudiesItems", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Case Study Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {(form.caseStudiesItems || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-5 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <span className="text-xs font-semibold text-blue-400">
                              Case Study #{idx + 1}: {item.clientName || "Unnamed Client"}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(form.caseStudiesItems) ? form.caseStudiesItems : [];
                                updateForm(
                                  "caseStudiesItems",
                                  current.filter((_, i) => i !== idx),
                                );
                              }}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove Card
                            </button>
                          </div>

                          {/* Basic Info */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Client Name</label>
                              <input
                                type="text"
                                value={item.clientName || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = { ...current[idx], clientName: e.target.value };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="e.g. Fashion Brand"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Campaign Duration</label>
                              <input
                                type="text"
                                value={item.campaignName || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = { ...current[idx], campaignName: e.target.value };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="e.g. 90 Day Campaign"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Campaign Goal</label>
                              <input
                                type="text"
                                value={item.campaignGoal || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = { ...current[idx], campaignGoal: e.target.value };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="e.g. Goal: Increase Revenue & ROAS"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>
                          </div>

                          {/* Stats (3 stats) */}
                          <div className="flex flex-col gap-2 bg-black/20 p-3.5 rounded-xl border border-white/5">
                            <label className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                              3 Key Stats (Numbers & Labels)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {[0, 1, 2].map((sIdx) => (
                                <div key={sIdx} className="flex flex-col gap-1 bg-[#0a0d1a] p-2.5 rounded-lg border border-white/5">
                                  <span className="text-[9px] text-slate-500 font-medium">Stat #{sIdx + 1}</span>
                                  <input
                                    type="text"
                                    value={item.stats?.[sIdx]?.value || ""}
                                    onChange={(e) => {
                                      const current = [...(form.caseStudiesItems || [])];
                                      const newStats = [...(current[idx].stats || [{}, {}, {}])];
                                      newStats[sIdx] = { ...newStats[sIdx], value: e.target.value };
                                      current[idx] = { ...current[idx], stats: newStats };
                                      updateForm("caseStudiesItems", current);
                                    }}
                                    placeholder="Value (e.g. 250%)"
                                    className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-emerald-400 font-mono focus:outline-none"
                                  />
                                  <input
                                    type="text"
                                    value={item.stats?.[sIdx]?.label || ""}
                                    onChange={(e) => {
                                      const current = [...(form.caseStudiesItems || [])];
                                      const newStats = [...(current[idx].stats || [{}, {}, {}])];
                                      newStats[sIdx] = { ...newStats[sIdx], label: e.target.value };
                                      current[idx] = { ...current[idx], stats: newStats };
                                      updateForm("caseStudiesItems", current);
                                    }}
                                    placeholder="Label (e.g. Revenue Growth)"
                                    className="bg-transparent border border-white/10 rounded px-2 py-1 text-[11px] text-slate-300 focus:outline-none"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tags & Media */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Tags (comma separated)</label>
                              <input
                                type="text"
                                value={Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  const parsedTags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                                  current[idx] = { ...current[idx], tags: parsedTags };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="Fashion, UGC, TikTok, Meta Ads"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>

                            <MediaUploader
                              label="Case Study Video (MP4/WebM)"
                              value={item.videoSrc}
                              onChange={(url) => {
                                const current = [...(form.caseStudiesItems || [])];
                                current[idx] = { ...current[idx], videoSrc: url };
                                updateForm("caseStudiesItems", current);
                              }}
                              accept="video/mp4,video/webm,video/*"
                              type="video"
                              placeholder="Upload video file..."
                            />

                            <MediaUploader
                              label="Video Poster Image"
                              value={item.poster}
                              onChange={(url) => {
                                const current = [...(form.caseStudiesItems || [])];
                                current[idx] = { ...current[idx], poster: url };
                                updateForm("caseStudiesItems", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload poster image..."
                            />
                          </div>

                          {/* Testimonial Quote */}
                          <div className="flex flex-col gap-3 bg-black/20 p-3.5 rounded-xl border border-white/5">
                            <label className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                              Client Testimonial Quote
                            </label>
                            <textarea
                              rows={2}
                              value={item.testimonial?.quote || ""}
                              onChange={(e) => {
                                const current = [...(form.caseStudiesItems || [])];
                                current[idx] = {
                                  ...current[idx],
                                  testimonial: { ...current[idx].testimonial, quote: e.target.value },
                                };
                                updateForm("caseStudiesItems", current);
                              }}
                              placeholder="Quote text..."
                              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={item.testimonial?.authorName || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = {
                                    ...current[idx],
                                    testimonial: { ...current[idx].testimonial, authorName: e.target.value },
                                  };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="Author Name (e.g. Jowel Mahmud)"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                              <input
                                type="text"
                                value={item.testimonial?.authorTitle || ""}
                                onChange={(e) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = {
                                    ...current[idx],
                                    testimonial: { ...current[idx].testimonial, authorTitle: e.target.value },
                                  };
                                  updateForm("caseStudiesItems", current);
                                }}
                                placeholder="Author Title (e.g. Founder & CEO)"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                              />
                              <MediaUploader
                                label="Author Avatar Photo"
                                value={item.testimonial?.avatar}
                                onChange={(url) => {
                                  const current = [...(form.caseStudiesItems || [])];
                                  current[idx] = {
                                    ...current[idx],
                                    testimonial: { ...current[idx].testimonial, avatar: url },
                                  };
                                  updateForm("caseStudiesItems", current);
                                }}
                                accept="image/*"
                                type="image"
                                placeholder="Upload avatar..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {(!form.caseStudiesItems || form.caseStudiesItems.length === 0) && (
                        <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
                          No case studies added yet. Click "+ Add Case Study Card" above to add project case studies.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 9. Services Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Video Editing Services Section ("Built Around Your Goals")
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-3 flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Section Title
                      </label>
                      <input
                        type="text"
                        required
                        value={form.servicesTitle || ""}
                        onChange={(e) => updateForm("servicesTitle", e.target.value)}
                        placeholder="e.g. Video Editing Services Built Around Your Goals"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        required
                        value={form.servicesCtaText || ""}
                        onChange={(e) => updateForm("servicesCtaText", e.target.value)}
                        placeholder="e.g. Book A Service Today"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Button Link URL
                      </label>
                      <input
                        type="text"
                        required
                        value={form.servicesCtaLink || ""}
                        onChange={(e) => updateForm("servicesCtaLink", e.target.value)}
                        placeholder="e.g. /contact"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* Dynamic Services List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Service Cards ({form.servicesItems?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.servicesItems) ? form.servicesItems : [];
                          const newItem = {
                            id: String(Date.now()),
                            title: `New Service ${current.length + 1}`,
                            price: "$249 / project",
                            desc: "Performance-driven video ads crafted to capture attention and maximize conversions.",
                            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&h=400&q=80",
                            gridClass: "md:col-span-2",
                          };
                          updateForm("servicesItems", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Service Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {(form.servicesItems || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <span className="text-xs font-semibold text-blue-400">
                              Service #{idx + 1}: {item.title || "Unnamed Service"}
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
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove Card
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                placeholder="e.g. Social Media Reels Editing"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Price Label</label>
                              <input
                                type="text"
                                value={item.price || ""}
                                onChange={(e) => {
                                  const current = [...(form.servicesItems || [])];
                                  current[idx] = { ...current[idx], price: e.target.value };
                                  updateForm("servicesItems", current);
                                }}
                                placeholder="e.g. $249 / project"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Grid Width (6-col grid)</label>
                              <select
                                value={item.gridClass || "md:col-span-2"}
                                onChange={(e) => {
                                  const current = [...(form.servicesItems || [])];
                                  current[idx] = { ...current[idx], gridClass: e.target.value };
                                  updateForm("servicesItems", current);
                                }}
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              >
                                <option value="md:col-span-2">2 Columns (1/3 Width - 3 Per Row)</option>
                                <option value="md:col-span-3">3 Columns (1/2 Width - 2 Per Row)</option>
                                <option value="md:col-span-6">6 Columns (Full Width)</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Description</label>
                              <textarea
                                rows={3}
                                value={item.desc || ""}
                                onChange={(e) => {
                                  const current = [...(form.servicesItems || [])];
                                  current[idx] = { ...current[idx], desc: e.target.value };
                                  updateForm("servicesItems", current);
                                }}
                                placeholder="Service description..."
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                              />
                            </div>

                            <MediaUploader
                              label="Service Card Mockup Image"
                              value={item.image}
                              onChange={(url) => {
                                const current = [...(form.servicesItems || [])];
                                current[idx] = { ...current[idx], image: url };
                                updateForm("servicesItems", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload mockup image..."
                            />
                          </div>
                        </div>
                      ))}

                      {(!form.servicesItems || form.servicesItems.length === 0) && (
                        <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
                          No service cards added yet. Click "+ Add Service Card" above to add services.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 10. Testimonials Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Testimonials Section ("What they say about Us?")
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        required
                        value={form.testimonialsBadgeText || ""}
                        onChange={(e) => updateForm("testimonialsBadgeText", e.target.value)}
                        placeholder="e.g. Testimonials"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Section Heading Title
                      </label>
                      <input
                        type="text"
                        required
                        value={form.testimonialsTitle || ""}
                        onChange={(e) => updateForm("testimonialsTitle", e.target.value)}
                        placeholder="e.g. What they say about Us?"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* Dynamic Testimonials List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Testimonial Cards ({form.testimonialsItems?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.testimonialsItems) ? form.testimonialsItems : [];
                          const newItem = {
                            id: String(Date.now()),
                            name: `Client ${current.length + 1}`,
                            role: "Luxury Real Estate Agent",
                            text: "Working with this team completely changed our content game. Our engagement increased within weeks.",
                            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
                            videoUrl: "/video/video.mp4",
                            poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&h=400&q=80",
                          };
                          updateForm("testimonialsItems", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Testimonial Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {(form.testimonialsItems || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <span className="text-xs font-semibold text-blue-400">
                              Testimonial #{idx + 1}: {item.name || "Unnamed Client"}
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
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove Card
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                placeholder="e.g. Daniel Carter"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>

                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Role / Designation</label>
                              <input
                                type="text"
                                value={item.role || ""}
                                onChange={(e) => {
                                  const current = [...(form.testimonialsItems || [])];
                                  current[idx] = { ...current[idx], role: e.target.value };
                                  updateForm("testimonialsItems", current);
                                }}
                                placeholder="e.g. Luxury Real Estate Agent"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-slate-400 font-medium">Testimonial Quote Text</label>
                            <textarea
                              rows={3}
                              value={item.text || ""}
                              onChange={(e) => {
                                const current = [...(form.testimonialsItems || [])];
                                current[idx] = { ...current[idx], text: e.target.value };
                                updateForm("testimonialsItems", current);
                              }}
                              placeholder="Testimonial text quote..."
                              className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <MediaUploader
                              label="Client Avatar Photo"
                              value={item.avatar}
                              onChange={(url) => {
                                const current = [...(form.testimonialsItems || [])];
                                current[idx] = { ...current[idx], avatar: url };
                                updateForm("testimonialsItems", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload avatar..."
                            />

                            <MediaUploader
                              label="Video File (MP4/WebM)"
                              value={item.videoUrl}
                              onChange={(url) => {
                                const current = [...(form.testimonialsItems || [])];
                                current[idx] = { ...current[idx], videoUrl: url };
                                updateForm("testimonialsItems", current);
                              }}
                              accept="video/mp4,video/webm,video/*"
                              type="video"
                              placeholder="Upload video file..."
                            />

                            <MediaUploader
                              label="Video Poster Image"
                              value={item.poster}
                              onChange={(url) => {
                                const current = [...(form.testimonialsItems || [])];
                                current[idx] = { ...current[idx], poster: url };
                                updateForm("testimonialsItems", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload poster..."
                            />
                          </div>
                        </div>
                      ))}

                      {(!form.testimonialsItems || form.testimonialsItems.length === 0) && (
                        <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
                          No testimonial cards added yet. Click "+ Add Testimonial Card" above to add testimonials.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 11. Process Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Process Section ("THE PROCESS BEHIND THE RESULTS")
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        required
                        value={form.processBadgeText || ""}
                        onChange={(e) => updateForm("processBadgeText", e.target.value)}
                        placeholder="e.g. Our Process"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Subtitle Description
                      </label>
                      <input
                        type="text"
                        required
                        value={form.processSubtitle || ""}
                        onChange={(e) => updateForm("processSubtitle", e.target.value)}
                        placeholder="e.g. A streamlined workflow designed to turn raw footage into scroll-stopping content..."
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* 5 Title Lines */}
                  <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Main Heading Title (5 Stacked Lines)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Line 1</label>
                        <input
                          type="text"
                          value={form.processTitleLine1 || ""}
                          onChange={(e) => updateForm("processTitleLine1", e.target.value)}
                          placeholder="THE"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-blue-400 font-medium">Line 2 (Highlighted)</label>
                        <input
                          type="text"
                          value={form.processTitleLine2 || ""}
                          onChange={(e) => updateForm("processTitleLine2", e.target.value)}
                          placeholder="PROCESS"
                          className="bg-[#0a0d1a] border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-blue-300 font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Line 3</label>
                        <input
                          type="text"
                          value={form.processTitleLine3 || ""}
                          onChange={(e) => updateForm("processTitleLine3", e.target.value)}
                          placeholder="BEHIND"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Line 4</label>
                        <input
                          type="text"
                          value={form.processTitleLine4 || ""}
                          onChange={(e) => updateForm("processTitleLine4", e.target.value)}
                          placeholder="THE"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Line 5</label>
                        <input
                          type="text"
                          value={form.processTitleLine5 || ""}
                          onChange={(e) => updateForm("processTitleLine5", e.target.value)}
                          placeholder="RESULTS."
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Process Steps List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Process Steps Timeline ({form.processSteps?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.processSteps) ? form.processSteps : [];
                          const stepNum = String(current.length + 1).padStart(2, "0");
                          const newItem = {
                            id: String(Date.now()),
                            num: stepNum,
                            title: `Step ${stepNum}`,
                            desc: "Description of the step workflow.",
                            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80",
                          };
                          updateForm("processSteps", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Process Step
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {(form.processSteps || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
                            <span className="text-xs font-semibold text-blue-400">
                              Step {item.num || idx + 1}: {item.title || "Unnamed Step"}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const current = Array.isArray(form.processSteps) ? form.processSteps : [];
                                updateForm(
                                  "processSteps",
                                  current.filter((_, i) => i !== idx),
                                );
                              }}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove Step
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Step Number</label>
                              <input
                                type="text"
                                value={item.num || ""}
                                onChange={(e) => {
                                  const current = [...(form.processSteps || [])];
                                  current[idx] = { ...current[idx], num: e.target.value };
                                  updateForm("processSteps", current);
                                }}
                                placeholder="e.g. 01"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>

                            <div className="md:col-span-2 flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Step Title</label>
                              <input
                                type="text"
                                value={item.title || ""}
                                onChange={(e) => {
                                  const current = [...(form.processSteps || [])];
                                  current[idx] = { ...current[idx], title: e.target.value };
                                  updateForm("processSteps", current);
                                }}
                                placeholder="e.g. STRATEGY / Asset Collection"
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] text-slate-400 font-medium">Description</label>
                              <textarea
                                rows={3}
                                value={item.desc || ""}
                                onChange={(e) => {
                                  const current = [...(form.processSteps || [])];
                                  current[idx] = { ...current[idx], desc: e.target.value };
                                  updateForm("processSteps", current);
                                }}
                                placeholder="Step description..."
                                className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                              />
                            </div>

                            <MediaUploader
                              label="Step Mockup Graphic Image"
                              value={item.image}
                              onChange={(url) => {
                                const current = [...(form.processSteps || [])];
                                current[idx] = { ...current[idx], image: url };
                                updateForm("processSteps", current);
                              }}
                              accept="image/*"
                              type="image"
                              placeholder="Upload step graphic..."
                            />
                          </div>
                        </div>
                      ))}

                      {(!form.processSteps || form.processSteps.length === 0) && (
                        <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-white/10 text-center text-xs text-slate-500">
                          No process steps added yet. Click "+ Add Process Step" above to add steps.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 12. CTA Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    CTA Banner Section ("Ready to Turn Raw Footage Into High-Performing Content?")
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Badge Text
                      </label>
                      <input
                        type="text"
                        required
                        value={form.ctaSectionBadgeText || ""}
                        onChange={(e) => updateForm("ctaSectionBadgeText", e.target.value)}
                        placeholder="e.g. Let's Create Engaging Contents"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Button Label
                      </label>
                      <input
                        type="text"
                        required
                        value={form.ctaSectionBtnText || ""}
                        onChange={(e) => updateForm("ctaSectionBtnText", e.target.value)}
                        placeholder="e.g. Get Started Today"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        CTA Button Target Link
                      </label>
                      <input
                        type="text"
                        required
                        value={form.ctaSectionBtnLink || ""}
                        onChange={(e) => updateForm("ctaSectionBtnLink", e.target.value)}
                        placeholder="e.g. /#services or /contact"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* 3 Title Lines */}
                  <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Main Heading Title (3 Stacked Lines)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Title Line 1</label>
                        <input
                          type="text"
                          value={form.ctaSectionTitle1 || ""}
                          onChange={(e) => updateForm("ctaSectionTitle1", e.target.value)}
                          placeholder="Ready to Turn Raw Footage"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Title Line 2</label>
                        <input
                          type="text"
                          value={form.ctaSectionTitle2 || ""}
                          onChange={(e) => updateForm("ctaSectionTitle2", e.target.value)}
                          placeholder="Into High-Performing"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Title Line 3</label>
                        <input
                          type="text"
                          value={form.ctaSectionTitle3 || ""}
                          onChange={(e) => updateForm("ctaSectionTitle3", e.target.value)}
                          placeholder="Content?"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Description Copy Text
                    </label>
                    <textarea
                      rows={3}
                      value={form.ctaSectionDesc || ""}
                      onChange={(e) => updateForm("ctaSectionDesc", e.target.value)}
                      placeholder="e.g. In today's crowded digital landscape, great content alone isn't enough..."
                      className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Category Pill Tags */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Category Tag Pills (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(form.ctaSectionTags) ? form.ctaSectionTags.join(", ") : form.ctaSectionTags || ""}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                        updateForm("ctaSectionTags", tags);
                      }}
                      placeholder="Travel, Cooking, Fitness, Gardening, Tech Reviews"
                      className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                    />
                    <span className="text-[10px] text-slate-500">
                      Separate each pill tag with a comma. Currently {form.ctaSectionTags?.length || 0} tags active.
                    </span>
                  </div>
                </div>

                {/* 13. FAQ Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    FAQ Section ("Have any questions? Read popular answers below")
                  </h3>

                  {/* Emblem Badge Titles */}
                  <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
                    <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Overlapping Emblem Circle Badges
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Left Circle Top Text</label>
                        <input
                          type="text"
                          value={form.faqBadgeLeftTitle || ""}
                          onChange={(e) => updateForm("faqBadgeLeftTitle", e.target.value)}
                          placeholder="Your RAW"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Left Circle Bottom Text</label>
                        <input
                          type="text"
                          value={form.faqBadgeLeftSubtitle || ""}
                          onChange={(e) => updateForm("faqBadgeLeftSubtitle", e.target.value)}
                          placeholder="Footage"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-blue-400 font-medium">Right Circle Top Text</label>
                        <input
                          type="text"
                          value={form.faqBadgeRightTitle || ""}
                          onChange={(e) => updateForm("faqBadgeRightTitle", e.target.value)}
                          placeholder="KQ"
                          className="bg-[#0a0d1a] border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-blue-300 font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-slate-400">Right Circle Bottom Text</label>
                        <input
                          type="text"
                          value={form.faqBadgeRightSubtitle || ""}
                          onChange={(e) => updateForm("faqBadgeRightSubtitle", e.target.value)}
                          placeholder="Visuals"
                          className="bg-[#0a0d1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Title Lines */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Heading Title Line 1
                      </label>
                      <input
                        type="text"
                        value={form.faqTitleLine1 || ""}
                        onChange={(e) => updateForm("faqTitleLine1", e.target.value)}
                        placeholder="Have any questions?"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Heading Title Line 2
                      </label>
                      <input
                        type="text"
                        value={form.faqTitleLine2 || ""}
                        onChange={(e) => updateForm("faqTitleLine2", e.target.value)}
                        placeholder="Read popular answers below"
                        className="bg-[#0a0d1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/40"
                      />
                    </div>
                  </div>

                  {/* Dynamic FAQ Items Accordion Editor */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        FAQ Accordion List ({form.faqItems?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.faqItems) ? form.faqItems : [];
                          const newItem = {
                            id: String(Date.now()),
                            question: "New FAQ Question?",
                            answer: "Provide detailed answer explanation here...",
                          };
                          updateForm("faqItems", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add FAQ Item
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {(form.faqItems || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col gap-4 relative group"
                        >
                          <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
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
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove FAQ
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
                  </div>
                </div>

                {/* 14. Footer Section */}
                <div className="flex flex-col gap-4 border-t border-white/5 pt-6">
                  <h3 className="font-heading font-normal text-base text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0080ff]" />
                    Footer Section ("Let's Create Something Worth Watching")
                  </h3>

                  {/* Social Links */}
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

                  {/* Heading Title (3 lines) */}
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

                  {/* Brand Text & Copyright */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  {/* Footer Navigation Links List */}
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-satoshi text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Footer Horizon Menu Links ({form.footerNavLinks?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const current = Array.isArray(form.footerNavLinks) ? form.footerNavLinks : [];
                          const newItem = {
                            id: String(Date.now()),
                            label: "New Link",
                            href: "/#section",
                          };
                          updateForm("footerNavLinks", [...current, newItem]);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-medium transition-colors flex items-center gap-1.5"
                      >
                        + Add Nav Link
                      </button>
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
                              className="text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-0.5 rounded bg-red-500/10 hover:bg-red-500/20"
                            >
                              Remove
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