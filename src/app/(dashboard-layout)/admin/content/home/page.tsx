"use client";

import React, { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Home,
  Package,
  GraduationCap,
  Mail,
  Layers,
  Image,
  Type,
  Link as LinkIcon,
  User,
  Video,
  Award,
  Briefcase,
  Sparkles,
  MessageSquare,
  ListOrdered,
  HelpCircle,
  Footprints,
} from "lucide-react";

import { siteConfigService } from "@/services/site-config.service";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import type { SiteConfig, UpdateSiteConfigPayload } from "@/types/site-config";
import { useAdminTheme } from "@/context/admin-theme-context";

import { ContentHeader } from "../_components/ContentHeader";
import { SectionNav, SectionTab } from "../_components/SectionNav";

import { HeaderLogoSection } from "../_components/home/HeaderLogoSection";
import { HeroHeadlineSection } from "../_components/home/HeroHeadlineSection";
import { HeroCtaSection } from "../_components/home/HeroCtaSection";
import { FounderQuoteSection } from "../_components/home/FounderQuoteSection";
import { HeroMediaSection } from "../_components/home/HeroMediaSection";
import { ShowcaseSection } from "../_components/home/ShowcaseSection";
import { TrustedPartnersSection } from "../_components/home/TrustedPartnersSection";
import { CaseStudiesSection } from "../_components/home/CaseStudiesSection";
import { ServicesSection } from "../_components/home/ServicesSection";
import { TestimonialsSection } from "../_components/home/TestimonialsSection";
import { ProcessSection } from "../_components/home/ProcessSection";
import { CtaBannerSection } from "../_components/home/CtaBannerSection";
import { FaqSection } from "../_components/home/FaqSection";
import { FooterSection } from "../_components/home/FooterSection";

const DEFAULT_CONFIG: SiteConfig = {
  id: "singleton",
  brandLogoUrl: null,
  brandLogoText: "KQ VISUALS",
  navLinks: [],
  homeHeroTitle1: "Luxury Real Estate",
  homeHeroTitle2: "Videos That Sell",
  homeHeroTitle3: "Faster",
  homeHeroSubtitle:
    "We craft high-converting video edits for luxury agents, developers, and brokers. Stand out with cinematic pacing, drone mastery, and premium sound design.",
  heroCtaText: "Book a Free Strategy Call",
  heroCtaLink: "/contact",
  heroHappyClientsText: "60+ Happy Clients",
  heroHappyClientsAvatars: [],
  heroQuoteText:
    "We turn raw property clips into million-dollar listing stories that command attention and close deals faster.",
  heroQuoteAuthorImage: null,
  heroQuoteAuthorName: "Jowel Mahmud",
  heroQuoteAuthorTitle: "Founder & CEO",
  heroQuoteCompany: "KQ Visuals",
  heroVideoUrl: null,
  heroPosterUrl: null,
  showcaseTitle: "Crafting Cinematic Masterpieces",
  showcaseSubtitle: "Take a look at how we transform raw property footage into high-converting visual stories.",
  showcaseVideoUrl: null,
  showcasePosterUrl: null,
  trustedByTitle: "TRUSTED BY TOP REAL ESTATE BROKERS",
  trustedByLogos: [],
  caseStudiesTitle: "Proven Results That Speak For Themselves",
  caseStudiesSubtitle: "Explore how our cinematic video edits helped luxury listings sell faster and attract qualified buyers.",
  caseStudiesItems: [],
  servicesTitle: "Services Built Around Your Goals",
  servicesCtaText: "Book a Discovery Call",
  servicesCtaLink: "/contact",
  servicesItems: [],
  testimonialsBadgeText: "TESTIMONIALS",
  testimonialsTitle: "Trusted by Top Real Estate Brokers Worldwide",
  testimonialsItems: [],
  processBadgeText: "OUR PROCESS",
  processTitleLine1: "How",
  processTitleLine2: "We",
  processTitleLine3: "Work",
  processTitleLine4: "With",
  processTitleLine5: "You",
  processSubtitle: "A streamlined 5-step workflow designed to deliver cinematic real estate videos with zero hassle.",
  processSteps: [],
  ctaSectionBadgeText: "LET'S TALK",
  ctaSectionTitle1: "Ready to Elevate",
  ctaSectionTitle2: "Your Real Estate",
  ctaSectionTitle3: "Videos?",
  ctaSectionDesc: "Get in touch with our team today and let's create high-converting visual stories for your luxury listings.",
  ctaSectionTags: ["Fast Turnaround", "Unlimited Revisions", "4K Export"],
  ctaSectionBtnText: "Start Your Project",
  ctaSectionBtnLink: "/contact",
  faqBadgeLeftTitle: "24/7 Support",
  faqBadgeLeftSubtitle: "Always Available",
  faqBadgeRightTitle: "100% Quality",
  faqBadgeRightSubtitle: "Guaranteed",
  faqTitleLine1: "Have any questions?",
  faqTitleLine2: "Read popular answers below",
  faqItems: [],
  footerTwitterUrl: "https://twitter.com",
  footerLinkedinUrl: "https://linkedin.com",
  footerInstagramUrl: "https://instagram.com",
  footerTitleLine1: "Let's Create",
  footerTitleLine2: "Something Worth",
  footerTitleLine3: "Watching",
  footerBrandLogoUrl: null,
  footerBrandText: "KQ VISUALS",
  footerCopyrightText: "© KQ Visuals All Rights Reserved 2026",
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
  productsTestimonialsItems: [],
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

const HOME_SECTION_TABS: SectionTab[] = [
  { id: "all", label: "Show All Sections", icon: Layers },
  { id: "sec-header-logo", label: "Header & Logo", icon: Image },
  { id: "sec-hero-headline", label: "Hero Headline", icon: Type },
  { id: "sec-hero-media", label: "Hero Video Media", icon: Video },
  { id: "sec-hero-cta", label: "CTA & Social Proof", icon: LinkIcon },
  { id: "sec-founder-quote", label: "Founder Quote", icon: User },
  { id: "sec-trusted-partners", label: "Trusted Partners", icon: Award },
  { id: "sec-showcase", label: "Showcase Video", icon: Video },
  { id: "sec-case-studies", label: "Case Studies", icon: Briefcase },
  { id: "sec-services", label: "Services Offered", icon: Sparkles },
  { id: "sec-testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "sec-process", label: "Process Steps", icon: ListOrdered },
  { id: "sec-cta-banner", label: "CTA Banner", icon: LinkIcon },
  { id: "sec-faq", label: "FAQ Items", icon: HelpCircle },
  { id: "sec-footer", label: "Footer Section", icon: Footprints },
];

function HomePageCMSInner() {
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
      const message = getErrorMessage(err, "Failed to load site config.");
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
      footerBrandLogoUrl: form.footerBrandLogoUrl,
      footerBrandText: form.footerBrandText,
      footerCopyrightText: form.footerCopyrightText,
      footerNavLinks: form.footerNavLinks,
    };

    try {
      const updated = await siteConfigService.update(payload);
      setConfig(updated);
      setForm(updated);
      setDirty(false);
      setSaved(true);
      toast.success("Home Page content saved successfully!");
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save home page content."));
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
      {/* LEFT COLUMN: Vertical Section Sub-Sidebar (Red Box Area!) */}
      <SectionNav
        tabs={HOME_SECTION_TABS}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* RIGHT COLUMN: Main Form Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-8 w-full">
        {/* Top Action Header */}
        <ContentHeader
          pageTitle="Home Page"
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
            { href: "/admin/content/home", label: "Home Page", icon: Home, active: true },
            { href: "/admin/content/products", label: "Products Page", icon: Package, active: false },
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

        {/* Form UI Panel */}
        {loading ? (
          <div className="p-12 rounded-2xl bg-black/20 border border-white/5 text-center text-xs text-slate-400 animate-pulse w-full">
            Loading Home Page content…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            {(activeSection === "all" || activeSection === "sec-header-logo") && (
              <HeaderLogoSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-hero-headline") && (
              <HeroHeadlineSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-hero-media") && (
              <HeroMediaSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-hero-cta") && (
              <HeroCtaSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-founder-quote") && (
              <FounderQuoteSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-trusted-partners") && (
              <TrustedPartnersSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-showcase") && (
              <ShowcaseSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-case-studies") && (
              <CaseStudiesSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-services") && (
              <ServicesSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-testimonials") && (
              <TestimonialsSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-process") && (
              <ProcessSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-cta-banner") && (
              <CtaBannerSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-faq") && (
              <FaqSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-footer") && (
              <FooterSection form={form} updateForm={updateForm} />
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function HomePageCMS() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading Home Page CMS…</div>}>
      <HomePageCMSInner />
    </Suspense>
  );
}
