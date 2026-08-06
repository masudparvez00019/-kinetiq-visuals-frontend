"use client";

import React, { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, Package, GraduationCap, Mail, Layers, UserCheck, DollarSign, Building2, BookOpen, ListChecks, Wrench, Award, CheckSquare, HelpCircle } from "lucide-react";

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

import { ContentHeader } from "../_components/ContentHeader";
import { SectionNav, SectionTab } from "../_components/SectionNav";
import { CourseHeroSection } from "../_components/course/CourseHeroSection";
import { TrustedPartnersSection } from "../_components/home/TrustedPartnersSection";
import { CourseWhatWeLearnSection } from "../_components/course/CourseWhatWeLearnSection";
import { CourseCurriculumSection } from "../_components/course/CourseCurriculumSection";
import { CourseToolsSection } from "../_components/course/CourseToolsSection";
import { CourseSuccessStoriesSection } from "../_components/course/CourseSuccessStoriesSection";
import { MentorBioSection } from "../_components/course/MentorBioSection";
import { CoursePricingSection } from "../_components/course/CoursePricingSection";
import { CourseIncludedSection } from "../_components/course/CourseIncludedSection";
import { CourseFaqSection } from "../_components/course/CourseFaqSection";

const DEFAULT_CONFIG: SiteConfig = {
  id: "singleton",
  brandLogoUrl: null,
  brandLogoText: "KQ VISUALS",
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
  courseHeroStats: [
    { id: "1", icon: "play", value: "500+", label: "PREMIUM LESSONS" },
    { id: "2", icon: "graduation", value: "50K+", label: "HAPPY STUDENTS" },
    { id: "3", icon: "clock", value: "120+", label: "HOURS OF CONTENT" },
    { id: "4", icon: "shield", value: "100%", label: "JOB-READY SKILLS" },
  ],
  courseLearnBadgeText: "What we Learn",
  courseLearnTitleLine1: "Create High Converting",
  courseLearnTitleLine2: "Video Content",
  courseLearnSubtitle:
    "Learn how to create engaging videos that capture attention, build trust, and drive results. Master proven editing and content strategies to turn viewers into customers.",
  courseLearnItems: [],
  courseCurriculumBadgeText: "Course Curriculam",
  courseCurriculumTitleLine1: "What's Inside",
  courseCurriculumTitleLine2: "The",
  courseCurriculumTitleLine3: "Course",
  courseCurriculumSubtitle:
    "Explore a step-by-step learning path designed to help you master video editing, content strategy, and high-converting video creation through practical lessons and real-world projects.",
  courseCurriculumModules: [],
  courseCurriculumPerks: [
    "Hands-on Projects",
    "Real-world Assets",
    "Lifetime Access",
    "Downloadable Resources",
  ],
  courseCurriculumCtaDesc: "Everything you need to create professional, high-converting videos.",
  courseCurriculumCtaBtnText: "Enroll Now - $149",
  courseCurriculumCtaBtnLink: "/contact",
  courseToolsTitle: "TOOLS YOU'LL MASTER",
  courseToolsItems: [],
  courseSuccessBadgeText: "Success Stories",
  courseSuccessTitleLine1: "Real Student Results.",
  courseSuccessTitleLine2: "Real Impact.",
  courseSuccessSubtitle:
    "See how creators transformed their skills and landed real projects after the course.",
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
  courseIncludedSubtitle: "Unlock your video editing journey with Lifetime Access, Downloadable Assets, and real-world Project Files. Get Free Future Updates, access exclusive Community Assets, and earn a Certification upon completion.",
  courseIncludedItems: ["Lifetime Access", "Downloadable Assets", "Project Files", "Future Updates", "Community Assets", "Certification"],
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

const COURSE_SECTION_TABS: SectionTab[] = [
  { id: "all", label: "Show All Sections", icon: Layers },
  { id: "sec-course-hero", label: "Course Hero Section", icon: GraduationCap },
  { id: "sec-trusted-partners", label: "Trusted Partners & Clients", icon: Building2 },
  { id: "sec-course-learn", label: "What We Learn Modules", icon: BookOpen },
  { id: "sec-course-curriculum", label: "Course Curriculum Modules", icon: ListChecks },
  { id: "sec-course-tools", label: "Tools You'll Master", icon: Wrench },
  { id: "sec-course-success", label: "Success Stories", icon: Award },
  { id: "sec-mentor-bio", label: "Mentor Bio & Stats", icon: UserCheck },
  { id: "sec-course-pricing", label: "Pricing & Fee", icon: DollarSign },
  { id: "sec-course-included", label: "What's Included", icon: CheckSquare },
  { id: "sec-course-faq", label: "FAQ Section", icon: HelpCircle },
];

function CoursePageCMSInner() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  const [activeSection, setActiveSection] = useState<string>("all");
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [form, setForm] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [coursePriceDollars, setCoursePriceDollars] = useState<string>("0");
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
      setCoursePriceDollars(centsToDollars(data.coursePriceCents));
      setDirty(false);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load course config.");
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

  const handlePriceChange = (val: string) => {
    setCoursePriceDollars(val);
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

    const priceCents = dollarsToCents(coursePriceDollars);

    const payload: UpdateSiteConfigPayload = {
      courseHeroBadgeText: form.courseHeroBadgeText,
      courseHeroTitle1: form.courseHeroTitle1,
      courseHeroTitle2: form.courseHeroTitle2,
      courseHeroTitle3: form.courseHeroTitle3,
      courseCtaText: form.courseCtaText,
      courseCtaLink: form.courseCtaLink,
      courseStudentsText: form.courseStudentsText,
      courseRatingText: form.courseRatingText,
      courseVideoUrl: form.courseVideoUrl,
      coursePosterUrl: form.coursePosterUrl,
      courseHeroStats: form.courseHeroStats,
      trustedByTitle: form.trustedByTitle,
      trustedByLogos: form.trustedByLogos,
      courseLearnBadgeText: form.courseLearnBadgeText,
      courseLearnTitleLine1: form.courseLearnTitleLine1,
      courseLearnTitleLine2: form.courseLearnTitleLine2,
      courseLearnSubtitle: form.courseLearnSubtitle,
      courseLearnItems: form.courseLearnItems,
      courseCurriculumBadgeText: form.courseCurriculumBadgeText,
      courseCurriculumTitleLine1: form.courseCurriculumTitleLine1,
      courseCurriculumTitleLine2: form.courseCurriculumTitleLine2,
      courseCurriculumTitleLine3: form.courseCurriculumTitleLine3,
      courseCurriculumSubtitle: form.courseCurriculumSubtitle,
      courseCurriculumModules: form.courseCurriculumModules,
      courseCurriculumPerks: form.courseCurriculumPerks,
      courseCurriculumCtaDesc: form.courseCurriculumCtaDesc,
      courseCurriculumCtaBtnText: form.courseCurriculumCtaBtnText,
      courseCurriculumCtaBtnLink: form.courseCurriculumCtaBtnLink,
      courseToolsTitle: form.courseToolsTitle,
      courseToolsItems: form.courseToolsItems,
      courseSuccessBadgeText: form.courseSuccessBadgeText,
      courseSuccessTitleLine1: form.courseSuccessTitleLine1,
      courseSuccessTitleLine2: form.courseSuccessTitleLine2,
      courseSuccessSubtitle: form.courseSuccessSubtitle,
      courseSuccessItems: form.courseSuccessItems,
      coursePriceCents: priceCents,
      courseDescription: form.courseDescription,
      mentorBadgeText: form.mentorBadgeText,
      mentorName: form.mentorName,
      mentorTitle: form.mentorTitle,
      mentorBio: form.mentorBio,
      mentorAvatarUrl: form.mentorAvatarUrl,
      mentorExperience: form.mentorExperience,
      mentorProjects: form.mentorProjects,
      mentorStudents: form.mentorStudents,
      courseIncludedBadgeText: form.courseIncludedBadgeText,
      courseIncludedTitle: form.courseIncludedTitle,
      courseIncludedSubtitle: form.courseIncludedSubtitle,
      courseIncludedItems: form.courseIncludedItems,
      courseIncludedCtaBtnText: form.courseIncludedCtaBtnText,
      courseIncludedCtaBtnLink: form.courseIncludedCtaBtnLink,
      courseFaqTitleLine1: form.courseFaqTitleLine1,
      courseFaqTitleLine2: form.courseFaqTitleLine2,
      courseFaqItems: form.courseFaqItems,
    };

    try {
      const updated = await siteConfigService.update(payload);
      setConfig(updated);
      setForm(updated);
      setCoursePriceDollars(centsToDollars(updated.coursePriceCents));
      setDirty(false);
      setSaved(true);
      toast.success("Course Page content saved successfully!");
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save course page content."));
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
        tabs={COURSE_SECTION_TABS}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* RIGHT COLUMN: Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-8 w-full">
        <ContentHeader
          pageTitle="Course Page"
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
            { href: "/admin/content/course", label: "Course Page", icon: GraduationCap, active: true },
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
            Loading Course Page content…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            {(activeSection === "all" || activeSection === "sec-course-hero") && (
              <CourseHeroSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-trusted-partners") && (
              <TrustedPartnersSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-learn") && (
              <CourseWhatWeLearnSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-curriculum") && (
              <CourseCurriculumSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-tools") && (
              <CourseToolsSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-success") && (
              <CourseSuccessStoriesSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-mentor-bio") && (
              <MentorBioSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-pricing") && (
              <CoursePricingSection
                form={form}
                coursePriceDollars={coursePriceDollars}
                onPriceChange={handlePriceChange}
              />
            )}
            {(activeSection === "all" || activeSection === "sec-course-included") && (
              <CourseIncludedSection form={form} updateForm={updateForm} />
            )}
            {(activeSection === "all" || activeSection === "sec-course-faq") && (
              <CourseFaqSection form={form} updateForm={updateForm} />
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default function CoursePageCMS() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading Course Page CMS…</div>}>
      <CoursePageCMSInner />
    </Suspense>
  );
}
