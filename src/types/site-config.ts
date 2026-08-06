export interface NavLinkItem {
  label: string;
  href: string;
}

export interface PartnerLogoItem {
  id?: string;
  name: string;
  subtext?: string;
  textLogo?: string;
  logoUrl?: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatar?: string | null;
}

export interface CaseStudyItem {
  id?: string | number;
  clientName: string;
  campaignName: string;
  campaignGoal: string;
  stats: CaseStudyStat[];
  tags: string[];
  videoSrc: string;
  poster: string;
  testimonial: CaseStudyTestimonial;
}

export interface ServiceItem {
  id?: string | number;
  title: string;
  price: string;
  desc: string;
  image: string;
  gridClass?: string;
}

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role: string;
  text: string;
  avatar?: string | null;
  videoUrl?: string | null;
  poster?: string | null;
}

export interface ProcessStepItem {
  id?: string | number;
  num: string;
  title: string;
  desc: string;
  image: string;
}

export interface FaqItem {
  id?: string | number;
  question: string;
  answer: string;
}

export interface FooterNavLinkItem {
  id?: string | number;
  label: string;
  href: string;
}

export interface CourseHeroStatItem {
  id?: string;
  icon?: string;
  value: string;
  label: string;
}

export interface CourseLearnItem {
  id?: string;
  number: string;
  title: string;
  lessons: string;
  description: string;
  icon?: string;
}

export interface CourseCurriculumModuleItem {
  id?: string;
  num: string;
  title: string;
  sub: string;
  duration: string;
}

export interface CourseToolItem {
  id?: string;
  name: string;
  iconType?: string;
  iconUrl?: string | null;
}

export interface CourseSuccessItem {
  id?: string;
  name: string;
  quote: string;
  stars?: number;
  metric1Value?: string;
  metric1Label?: string;
  metric2Value?: string;
  metric2Label?: string;
  image?: string | null;
}

export interface CourseFaqItem {
  id?: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  id: string;
  brandLogoUrl: string | null;
  brandLogoText: string;
  navLinks: NavLinkItem[] | string[] | null;
  homeHeroTitle1: string;
  homeHeroTitle2: string;
  homeHeroTitle3: string;
  homeHeroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroHappyClientsText: string;
  heroHappyClientsAvatars: string[] | null;
  heroQuoteText: string;
  heroQuoteAuthorImage: string | null;
  heroQuoteAuthorName: string;
  heroQuoteAuthorTitle: string;
  heroQuoteCompany: string;
  heroVideoUrl: string | null;
  heroPosterUrl: string | null;
  showcaseTitle: string;
  showcaseSubtitle: string;
  showcaseVideoUrl: string | null;
  showcasePosterUrl: string | null;
  trustedByTitle: string;
  trustedByLogos: PartnerLogoItem[] | null;
  caseStudiesTitle: string;
  caseStudiesSubtitle: string;
  caseStudiesItems: CaseStudyItem[] | null;
  servicesTitle: string;
  servicesCtaText: string;
  servicesCtaLink: string;
  servicesItems: ServiceItem[] | null;
  testimonialsBadgeText: string;
  testimonialsTitle: string;
  testimonialsItems: TestimonialItem[] | null;
  processBadgeText: string;
  processTitleLine1: string;
  processTitleLine2: string;
  processTitleLine3: string;
  processTitleLine4: string;
  processTitleLine5: string;
  processSubtitle: string;
  processSteps: ProcessStepItem[] | null;
  ctaSectionBadgeText: string;
  ctaSectionTitle1: string;
  ctaSectionTitle2: string;
  ctaSectionTitle3: string;
  ctaSectionDesc: string;
  ctaSectionTags: string[] | null;
  ctaSectionBtnText: string;
  ctaSectionBtnLink: string;
  faqBadgeLeftTitle: string;
  faqBadgeLeftSubtitle: string;
  faqBadgeRightTitle: string;
  faqBadgeRightSubtitle: string;
  faqTitleLine1: string;
  faqTitleLine2: string;
  faqItems: FaqItem[] | null;
  footerTwitterUrl: string;
  footerLinkedinUrl: string;
  footerInstagramUrl: string;
  footerTitleLine1: string;
  footerTitleLine2: string;
  footerTitleLine3: string;
  footerBrandLogoUrl: string | null;
  footerBrandText: string;
  footerCopyrightText: string;
  footerNavLinks: FooterNavLinkItem[] | null;
  productsHeroTitle1: string;
  productsHeroTitle2: string;
  productsHeroTitle3: string;
  productsHeroFeature1Title: string;
  productsHeroFeature1Desc: string;
  productsHeroFeature2Title: string;
  productsHeroFeature2Desc: string;
  productsTrustedBadgeText: string;
  productsTrustedTitleLine1: string;
  productsTrustedTitleLine2: string;
  productsTrustedTitleLine3: string;
  productsTrustedTitleLine4: string;
  productsTestimonialsItems: TestimonialItem[] | null;
  productsFaqTitleLine1: string;
  productsFaqTitleLine2: string;
  productsFaqItems: FaqItem[] | null;
  courseHeroBadgeText: string;
  courseHeroTitle1: string;
  courseHeroTitle2: string;
  courseHeroTitle3: string;
  courseCtaText: string;
  courseCtaLink: string;
  courseStudentsText: string;
  courseRatingText: string;
  courseVideoUrl: string | null;
  coursePosterUrl: string | null;
  courseHeroStats: CourseHeroStatItem[] | null;
  courseLearnBadgeText: string;
  courseLearnTitleLine1: string;
  courseLearnTitleLine2: string;
  courseLearnSubtitle: string;
  courseLearnItems: CourseLearnItem[] | null;
  courseCurriculumBadgeText: string;
  courseCurriculumTitleLine1: string;
  courseCurriculumTitleLine2: string;
  courseCurriculumTitleLine3: string;
  courseCurriculumSubtitle: string;
  courseCurriculumModules: CourseCurriculumModuleItem[] | null;
  courseCurriculumPerks: string[] | null;
  courseCurriculumCtaDesc: string;
  courseCurriculumCtaBtnText: string;
  courseCurriculumCtaBtnLink: string;
  courseToolsTitle: string;
  courseToolsItems: CourseToolItem[] | null;
  courseSuccessBadgeText: string;
  courseSuccessTitleLine1: string;
  courseSuccessTitleLine2: string;
  courseSuccessSubtitle: string;
  courseSuccessItems: CourseSuccessItem[] | null;
  coursePriceCents: number;
  courseCurrency: string;
  coursePriceLabel: string | null;
  courseDescription: string;
  mentorBadgeText: string;
  mentorName: string;
  mentorTitle: string;
  mentorBio: string;
  mentorAvatarUrl: string | null;
  mentorExperience: string;
  mentorProjects: string;
  mentorStudents: string;
  courseIncludedBadgeText: string;
  courseIncludedTitle: string;
  courseIncludedSubtitle: string;
  courseIncludedItems: string[] | null;
  courseIncludedCtaBtnText: string;
  courseIncludedCtaBtnLink: string;
  courseFaqTitleLine1: string;
  courseFaqTitleLine2: string;
  courseFaqItems: CourseFaqItem[] | null;
  contactEmail: string;
  contactPhone: string;
  contactHeroTitle: string;
  contactHeroSubtitle: string;
  contactFormTitle: string;
  contactFormSubtitle: string;
  contactFaqLinkText: string;
  contactPersonPhotoUrl: string | null;
  contactPersonName: string;
  contactPersonTitle: string;
  contactPersonDesc: string;
  contactFormBtnText: string;
  contactFaqTitleLine1: string;
  contactFaqTitleLine2: string;
  contactFaqItems: CourseFaqItem[] | null;
  updatedAt: string;
}

export type UpdateSiteConfigPayload = Partial<
  Omit<SiteConfig, "id" | "updatedAt" | "coursePriceLabel">
>;

/** Convert dollars (UI) to cents (API). */
export const dollarsToCents = (s: string): number => {
  const num = parseFloat(s);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
};

/** Convert cents (API) to a 2-decimal dollar string for the UI. */
export const centsToDollars = (cents: number | null | undefined): string => {
  if (cents == null) return "";
  return (cents / 100).toFixed(2);
};
