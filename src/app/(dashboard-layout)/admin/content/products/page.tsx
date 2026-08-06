"use client";

import React, { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Package, GraduationCap, Mail, Layers, Sparkles, UserCheck, HelpCircle } from "lucide-react";

import { siteConfigService } from "@/services/site-config.service";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import type { SiteConfig, UpdateSiteConfigPayload } from "@/types/site-config";
import { useAdminTheme } from "@/context/admin-theme-context";

import { ContentHeader } from "../_components/ContentHeader";
import { SectionNav, SectionTab } from "../_components/SectionNav";
import { ProductsHeroSection } from "../_components/products/ProductsHeroSection";
import { ProductsTrustedSection } from "../_components/products/ProductsTrustedSection";
import { ProductsFaqSection } from "../_components/products/ProductsFaqSection";

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
  productsHeroTitle1: "Creative Assets & Digital",
  productsHeroTitle2: "Products, Crafted for",
  productsHeroTitle3: "Impact",
  productsHeroFeature1Title: "Premium Creative Assets",
  productsHeroFeature1Desc:
    "Access high-quality motion graphics, transitions, sound effects, and visual elements that elevate every video.",
  productsHeroFeature2Title: "Platform-Optimized Content",
  productsHeroFeature2Desc:
    "Videos tailored for YouTube, TikTok, Instagram, Meta Ads, and other platforms. From a few videos per month to high-volume content workflows.",
  productsTrustedBadgeText: "TRUSTED BY THOUSANDS OF CREATORS",
  productsTrustedTitleLine1: "Our templates and",
  productsTrustedTitleLine2: "resources help creators",
  productsTrustedTitleLine3: "work faster and achieve",
  productsTrustedTitleLine4: "better results.",
  productsTestimonialsItems: [
    {
      id: "1",
      name: "Sara Austin",
      role: "Senior Video Editor",
      text: "These asset packs have completely transformed our editing workflow. The quality is outstanding, and we've cut production time by nearly 40%.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
  ],
  productsFaqTitleLine1: "Have any questions?",
  productsFaqTitleLine2: "Read popular answers below",
  productsFaqItems: [],
  courseHeroBadgeText: "Courses",
  courseHeroTitle1: "Master",
  courseHeroTitle2: "Cinematic",
  courseHeroTitle3: "Video Editing",
  courseCtaText: "Enroll Now - $149",
  courseCtaLink: "/contact",
  courseStudentsText: "Loved by 1200++ Students",
  courseRatingText: "4.9 (200+ Reviews)",
  courseVideoUrl: "/video/video.mp4",
  coursePosterUrl: null,
  courseHeroStats: [],
  courseLearnBadgeText: "What we Learn",
  courseLearnTitleLine1: "Create High Converting",
  courseLearnTitleLine2: "Video Content",
  courseLearnSubtitle: "Learn how to create engaging videos that capture attention, build trust, and drive results. Master proven editing and content strategies to turn viewers into customers.",
  courseLearnItems: [],
  courseCurriculumBadgeText: "Course Curriculam",
  courseCurriculumTitleLine1: "What's Inside",
  courseCurriculumTitleLine2: "The",
  courseCurriculumTitleLine3: "Course",
  courseCurriculumSubtitle: "Explore a step-by-step learning path designed to help you master video editing, content strategy, and high-converting video creation through practical lessons and real-world projects.",
  courseCurriculumModules: [],
  courseCurriculumPerks: [],
  courseCurriculumCtaDesc: "Everything you need to create professional, high-converting videos.",
  courseCurriculumCtaBtnText: "Enroll Now - $149",
  courseCurriculumCtaBtnLink: "/contact",
  courseToolsTitle: "TOOLS YOU'LL MASTER",
  courseToolsItems: [],
  courseSuccessBadgeText: "Success Stories",
  courseSuccessTitleLine1: "Real Student Results.",
  courseSuccessTitleLine2: "Real Impact.",
  courseSuccessSubtitle: "See how creators transformed their skills and landed real projects after the course.",
  courseSuccessItems: [],
  coursePriceCents: 0,
  courseCurrency: "USD",
  coursePriceLabel: "",
  courseDescription: "",
  mentorBadgeText: "Your Mentor",
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
  contactHeroSubtitle: "",
  contactFormTitle: "Fill the Form to Get a Quick Answer",
  contactFormSubtitle: "",
  contactFaqLinkText: "Have general Questions? View FAQs",
  contactPersonPhotoUrl: null,
  contactPersonName: "",
  contactPersonTitle: "",
  contactPersonDesc: "",
  contactFormBtnText: "Send Message",
  contactFaqTitleLine1: "Have any questions?",
  contactFaqTitleLine2: "Read popular answers below",
  contactFaqItems: [],
  updatedAt: new Date().toISOString(),
};

const PRODUCTS_SECTION_TABS: SectionTab[] = [
  { id: "all", label: "Show All Sections", icon: Layers },
  { id: "sec-products-hero", label: "Products Hero Section", icon: Package },
  { id: "sec-products-trusted", label: "Trusted by Creators", icon: UserCheck },
  { id: "sec-products-faq", label: "Products FAQ Section", icon: HelpCircle },
];

function ProductsPageCMSInner() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  const [activeSection, setActiveSection] = useState<string>("all");
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
      const message = getErrorMessage(err, "Failed to load products page config.");
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
      productsHeroTitle1: form.productsHeroTitle1,
      productsHeroTitle2: form.productsHeroTitle2,
      productsHeroTitle3: form.productsHeroTitle3,
      productsHeroFeature1Title: form.productsHeroFeature1Title,
      productsHeroFeature1Desc: form.productsHeroFeature1Desc,
      productsHeroFeature2Title: form.productsHeroFeature2Title,
      productsHeroFeature2Desc: form.productsHeroFeature2Desc,
      productsTrustedBadgeText: form.productsTrustedBadgeText,
      productsTrustedTitleLine1: form.productsTrustedTitleLine1,
      productsTrustedTitleLine2: form.productsTrustedTitleLine2,
      productsTrustedTitleLine3: form.productsTrustedTitleLine3,
      productsTrustedTitleLine4: form.productsTrustedTitleLine4,
      productsTestimonialsItems: form.productsTestimonialsItems,
      productsFaqTitleLine1: form.productsFaqTitleLine1,
      productsFaqTitleLine2: form.productsFaqTitleLine2,
      productsFaqItems: form.productsFaqItems,
    };

    try {
      const updated = await siteConfigService.update(payload);
      setConfig(updated);
      setForm(updated);
      setDirty(false);
      setSaved(true);
      toast.success("Products Page content saved successfully!");
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save products page content."));
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

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 w-full">
      {/* LEFT COLUMN: Vertical Section Sub-Sidebar */}
      <SectionNav
        tabs={PRODUCTS_SECTION_TABS}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* RIGHT COLUMN: Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-8 w-full">
        <ContentHeader
          pageTitle="Products Page"
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
            { href: "/admin/content/products", label: "Products Page", icon: Package, active: true },
            { href: "/admin/content/course", label: "Course Page", icon: GraduationCap, active: false },
            { href: "/admin/content/contact", label: "Contact Details", icon: Mail, active: false },
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

        {loading ? (
          <div className="p-12 rounded-2xl bg-black/20 border border-white/5 text-center text-xs text-slate-400 animate-pulse w-full">
            Loading Products Page content…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            {(activeSection === "all" || activeSection === "sec-products-hero") && (
              <ProductsHeroSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-products-trusted") && (
              <ProductsTrustedSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-products-faq") && (
              <ProductsFaqSection form={form} updateForm={updateForm} />
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProductsPageCMS() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading Products Page CMS…</div>}>
      <ProductsPageCMSInner />
    </Suspense>
  );
}
