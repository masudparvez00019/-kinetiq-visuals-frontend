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
  coursePriceCents: number;
  courseCurrency: string;
  coursePriceLabel: string | null;
  courseDescription: string;
  mentorName: string;
  mentorTitle: string;
  mentorBio: string;
  mentorAvatarUrl: string | null;
  mentorExperience: string;
  mentorProjects: string;
  mentorStudents: string;
  contactEmail: string;
  contactPhone: string;
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
