export interface SiteConfig {
  id: string;
  homeHeroTitle1: string;
  homeHeroTitle2: string;
  homeHeroTitle3: string;
  homeHeroSubtitle: string;
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
