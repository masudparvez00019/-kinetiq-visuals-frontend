"use client";

import React, { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Package, GraduationCap, Mail, Layers, MessageSquare, HelpCircle, Sparkles } from "lucide-react";

import { siteConfigService } from "@/services/site-config.service";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import type { SiteConfig, UpdateSiteConfigPayload } from "@/types/site-config";
import { useAdminTheme } from "@/context/admin-theme-context";

import { ContentHeader } from "../_components/ContentHeader";
import { SectionNav, SectionTab } from "../_components/SectionNav";
import { ContactInfoSection } from "../_components/contact/ContactInfoSection";
import { ContactHeroFormSection } from "../_components/contact/ContactHeroFormSection";
import { ContactFaqSection } from "../_components/contact/ContactFaqSection";

const DEFAULT_CONFIG: SiteConfig = {
  id: "singleton",
  brandLogoUrl: null,
  brandLogoText: "",
  navLinks: [],
  homeHeroTitle1: "",
  homeHeroTitle2: "",
  homeHeroTitle3: "",
  homeHeroSubtitle: "",
  heroCtaText: "",
  heroCtaLink: "",
  heroHappyClientsText: "",
  heroHappyClientsAvatars: [],
  heroQuoteText: "",
  heroQuoteAuthorImage: null,
  heroQuoteAuthorName: "",
  heroQuoteAuthorTitle: "",
  heroQuoteCompany: "",
  heroVideoUrl: null,
  heroPosterUrl: null,
  showcaseTitle: "",
  showcaseSubtitle: "",
  showcaseVideoUrl: null,
  showcasePosterUrl: null,
  trustedByTitle: "",
  trustedByLogos: [],
  caseStudiesTitle: "",
  caseStudiesSubtitle: "",
  caseStudiesItems: [],
  servicesTitle: "",
  servicesCtaText: "",
  servicesCtaLink: "",
  servicesItems: [],
  testimonialsBadgeText: "",
  testimonialsTitle: "",
  testimonialsItems: [],
  processBadgeText: "",
  processTitleLine1: "",
  processTitleLine2: "",
  processTitleLine3: "",
  processTitleLine4: "",
  processTitleLine5: "",
  processSubtitle: "",
  processSteps: [],
  ctaSectionBadgeText: "",
  ctaSectionTitle1: "",
  ctaSectionTitle2: "",
  ctaSectionTitle3: "",
  ctaSectionDesc: "",
  ctaSectionTags: [],
  ctaSectionBtnText: "",
  ctaSectionBtnLink: "",
  faqBadgeLeftTitle: "",
  faqBadgeLeftSubtitle: "",
  faqBadgeRightTitle: "",
  faqBadgeRightSubtitle: "",
  faqTitleLine1: "",
  faqTitleLine2: "",
  faqItems: [],
  footerTwitterUrl: "",
  footerLinkedinUrl: "",
  footerInstagramUrl: "",
  footerTitleLine1: "",
  footerTitleLine2: "",
  footerTitleLine3: "",
  footerBrandLogoUrl: null,
  footerBrandText: "",
  footerCopyrightText: "",
  footerNavLinks: [],
  productsHeroTitle1: "",
  productsHeroTitle2: "",
  productsHeroTitle3: "",
  productsHeroFeature1Title: "",
  productsHeroFeature1Desc: "",
  productsHeroFeature2Title: "",
  productsHeroFeature2Desc: "",
  productsTrustedBadgeText: "",
  productsTrustedTitleLine1: "",
  productsTrustedTitleLine2: "",
  productsTrustedTitleLine3: "",
  productsTrustedTitleLine4: "",
  productsTestimonialsItems: [],
  productsFaqTitleLine1: "",
  productsFaqTitleLine2: "",
  productsFaqItems: [],
  courseHeroBadgeText: "",
  courseHeroTitle1: "",
  courseHeroTitle2: "",
  courseHeroTitle3: "",
  courseCtaText: "",
  courseCtaLink: "",
  courseStudentsText: "",
  courseRatingText: "",
  courseVideoUrl: null,
  coursePosterUrl: null,
  courseHeroStats: [],
  courseLearnBadgeText: "",
  courseLearnTitleLine1: "",
  courseLearnTitleLine2: "",
  courseLearnSubtitle: "",
  courseLearnItems: [],
  courseCurriculumBadgeText: "",
  courseCurriculumTitleLine1: "",
  courseCurriculumTitleLine2: "",
  courseCurriculumTitleLine3: "",
  courseCurriculumSubtitle: "",
  courseCurriculumModules: [],
  courseCurriculumPerks: [],
  courseCurriculumCtaDesc: "",
  courseCurriculumCtaBtnText: "",
  courseCurriculumCtaBtnLink: "",
  courseToolsTitle: "",
  courseToolsItems: [],
  courseSuccessBadgeText: "",
  courseSuccessTitleLine1: "",
  courseSuccessTitleLine2: "",
  courseSuccessSubtitle: "",
  courseSuccessItems: [],
  coursePriceCents: 0,
  courseCurrency: "USD",
  coursePriceLabel: "",
  courseDescription: "",
  mentorBadgeText: "",
  mentorName: "",
  mentorTitle: "",
  mentorBio: "",
  mentorAvatarUrl: null,
  mentorExperience: "",
  mentorProjects: "",
  mentorStudents: "",
  courseIncludedBadgeText: "Included in",
  courseIncludedTitle: "What's Included in This Course",
  courseIncludedSubtitle: "",
  courseIncludedItems: [],
  courseIncludedCtaBtnText: "Enroll Now",
  courseIncludedCtaBtnLink: "/contact",
  courseFaqTitleLine1: "Have any questions?",
  courseFaqTitleLine2: "Read popular answers below",
  courseFaqItems: [],
  contactEmail: "",
  contactPhone: "",
  contactHeroTitle: "Questions? Ideas? Let's Connect.",
  contactHeroSubtitle: "Every great project starts with a conversation. If you're looking for professional video editing, creative support, or simply want to explore what's possible, send us a message. We're always happy to help.",
  contactFormTitle: "Fill the Form to Get a Quick Answer",
  contactFormSubtitle: "Fill out the form and our team will get back to you shortly. You may also find instant answers in the FAQ section.",
  contactFaqLinkText: "Have general Questions? View FAQs",
  contactPersonPhotoUrl: null,
  contactPersonName: "Jowel Mahmud",
  contactPersonTitle: "Mentor | Founder & CEO\nKinetiQ Visuals",
  contactPersonDesc: "Fill out the form or reach out by email or phone—we'd love to hear about your project.",
  contactFormBtnText: "Send Message",
  contactFaqTitleLine1: "Have any questions?",
  contactFaqTitleLine2: "Read popular answers below",
  contactFaqItems: [],
  updatedAt: new Date().toISOString(),
};

function ContactPageCMSInner() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [form, setForm] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    try {
      const data = await siteConfigService.get();
      setConfig(data);
      setForm(data);
      setDirty(false);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load contact config.");
      toast.error(message);
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
    value: SiteConfig[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!dirty) {
      toast.info("No changes to save.");
      return;
    }

    setSaving(true);

    const payload: UpdateSiteConfigPayload = {
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      contactHeroTitle: form.contactHeroTitle,
      contactHeroSubtitle: form.contactHeroSubtitle,
      contactFormTitle: form.contactFormTitle,
      contactFormSubtitle: form.contactFormSubtitle,
      contactFaqLinkText: form.contactFaqLinkText,
      contactPersonPhotoUrl: form.contactPersonPhotoUrl,
      contactPersonName: form.contactPersonName,
      contactPersonTitle: form.contactPersonTitle,
      contactPersonDesc: form.contactPersonDesc,
      contactFormBtnText: form.contactFormBtnText,
      contactFaqTitleLine1: form.contactFaqTitleLine1,
      contactFaqTitleLine2: form.contactFaqTitleLine2,
      contactFaqItems: form.contactFaqItems,
    };

    try {
      const updated = await siteConfigService.update(payload);
      setConfig(updated);
      setForm(updated);
      setDirty(false);
      setSaved(true);
      toast.success("Contact Page content saved successfully!");
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save contact details."));
    } finally {
      setSaving(false);
    }
  };

  const lastSavedLabel = useMemo(() => {
    if (!config.updatedAt) return "";
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

  const [activeSection, setActiveSection] = useState<string>("all");

  const CONTACT_SECTION_TABS: SectionTab[] = [
    { id: "all", label: "Show All Sections", icon: Layers },
    { id: "sec-contact-hero", label: "Contact Hero Section", icon: MessageSquare },
    { id: "sec-contact-form", label: "Contact Form & Person", icon: Sparkles },
    { id: "sec-contact-info", label: "Contact Credentials", icon: Mail },
    { id: "sec-contact-faq", label: "Contact FAQ Section", icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <ContentHeader
        pageTitle="Contact Page"
        dirty={dirty}
        saving={saving}
        saved={saved}
        loading={loading}
        lastSavedLabel={lastSavedLabel}
        onSave={handleSubmit}
        onReload={handleReload}
      />

      {/* Page Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 overflow-x-auto no-scrollbar">
        {[
          { href: "/admin/content/home", label: "Home Page", icon: Home, active: false },
          { href: "/admin/content/products", label: "Products Page", icon: Package, active: false },
          { href: "/admin/content/course", label: "Course Page", icon: GraduationCap, active: false },
          { href: "/admin/content/contact", label: "Contact Details", icon: Mail, active: true },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-normal text-xs transition-all shrink-0 ${
                tab.active
                  ? "bg-[#0080ff] text-white shadow-md font-bold"
                  : isLight
                  ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      <SectionNav
        tabs={CONTACT_SECTION_TABS}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {loading ? (
        <div className="p-12 rounded-2xl bg-black/20 border border-white/5 text-center text-xs text-slate-400 animate-pulse w-full">
          Loading Contact Page content…
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          {(activeSection === "all" || activeSection === "sec-contact-hero" || activeSection === "sec-contact-form") && (
            <ContactHeroFormSection form={form} updateForm={updateForm} />
          )}
          {(activeSection === "all" || activeSection === "sec-contact-info") && (
            <ContactInfoSection form={form} updateForm={updateForm} />
          )}
          {(activeSection === "all" || activeSection === "sec-contact-faq") && (
            <ContactFaqSection form={form} updateForm={updateForm} />
          )}
        </form>
      )}
    </div>
  );
}

export default function ContactPageCMS() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading Contact Details CMS…</div>}>
      <ContactPageCMSInner />
    </Suspense>
  );
}
