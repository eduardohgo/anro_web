export type TextItem = { id: string; text: string };

export type HeroCard = { id: string; title: string; description: string };
export type HeroContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  floatingBadge: string;
  floatingTitle: string;
  floatingCards: HeroCard[];
};

export type ServiceInfoBox = { id: string; title: string; items: TextItem[] };
export type DetailedService = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  idealFor: string;
  image: string;
  reverse: boolean;
  boxes: ServiceInfoBox[];
  active: boolean;
};

export type ServicesDetailedContent = {
  badge: string;
  title: string;
  description: string;
  services: DetailedService[];
};

export type WorkStep = { id: string; number: string; title: string; description: string; wide?: boolean };
export type WorkProcessContent = {
  badge: string;
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  steps: WorkStep[];
};

export type SpecialtyCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  strengthTitle: string;
  strengthText: string;
  valueTitle: string;
  valueText: string;
};

export type SpecialtiesContent = {
  badge: string;
  title: string;
  description: string;
  featuredBadge: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredPointOneTitle: string;
  featuredPointOneText: string;
  featuredPointTwoTitle: string;
  featuredPointTwoText: string;
  featuredFooterTitle: string;
  featuredFooterText: string;
  cards: SpecialtyCard[];
};

export type VisualSupportImage = {
  id: string;
  image: string;
  title: string;
  description: string;
  badge?: string;
  featured?: boolean;
};

export type BottomInfoCard = { id: string; title: string; description: string };

export type VisualSupportContent = {
  badge: string;
  title: string;
  description: string;
  images: VisualSupportImage[];
  bottomCards: BottomInfoCard[];
};

export type BenefitCard = { id: string; number: string; title: string; description: string };

export type BenefitsContent = {
  badge: string;
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  cards: BenefitCard[];
};

export type PremiumFeature = { id: string; number: string; title: string; description: string };
export type ContactFormField = { id: string; placeholder: string; type: string };

export type FinalCtaContent = {
  topBadge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  features: PremiumFeature[];
  contactBadge: string;
  contactTitle: string;
  image: string;
  imageBadge: string;
  imageTitle: string;
  imageDescription: string;
  submitText: string;
  privacyText: string;
  formFields: ContactFormField[];
};

export type ServicesContentConfig = {
  hero: HeroContent;
  detailedServices: ServicesDetailedContent;
  workProcess: WorkProcessContent;
  specialties: SpecialtiesContent;
  visualSupport: VisualSupportContent;
  benefits: BenefitsContent;
  finalCta: FinalCtaContent;
  updatedAt: string;
};

const DEFAULT_SERVICIOS_CONTENT: ServicesContentConfig = {
  hero: { badge: "", titleWhite: "", titleGold: "", description: "", backgroundImage: "", primaryButtonText: "", primaryButtonLink: "", secondaryButtonText: "", secondaryButtonLink: "", floatingBadge: "", floatingTitle: "", floatingCards: [] },
  detailedServices: { badge: "", title: "", description: "", services: [] },
  workProcess: { badge: "", title: "", description: "", focusTitle: "", focusDescription: "", steps: [] },
  specialties: { badge: "", title: "", description: "", featuredBadge: "", featuredTitle: "", featuredDescription: "", featuredPointOneTitle: "", featuredPointOneText: "", featuredPointTwoTitle: "", featuredPointTwoText: "", featuredFooterTitle: "", featuredFooterText: "", cards: [] },
  visualSupport: { badge: "", title: "", description: "", images: [], bottomCards: [] },
  benefits: { badge: "", title: "", description: "", focusTitle: "", focusDescription: "", cards: [] },
  finalCta: { topBadge: "", titleWhite: "", titleGold: "", description: "", features: [], contactBadge: "", contactTitle: "", image: "", imageBadge: "", imageTitle: "", imageDescription: "", submitText: "", privacyText: "", formFields: [] },
  updatedAt: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function resolveServiciosContent(content: unknown): ServicesContentConfig {
  if (!isRecord(content)) return structuredClone(DEFAULT_SERVICIOS_CONTENT);
  const raw = content as Partial<ServicesContentConfig>;
  return {
    ...DEFAULT_SERVICIOS_CONTENT,
    ...raw,
    hero: { ...DEFAULT_SERVICIOS_CONTENT.hero, ...raw.hero },
    detailedServices: { ...DEFAULT_SERVICIOS_CONTENT.detailedServices, ...raw.detailedServices },
    workProcess: { ...DEFAULT_SERVICIOS_CONTENT.workProcess, ...raw.workProcess },
    specialties: { ...DEFAULT_SERVICIOS_CONTENT.specialties, ...raw.specialties },
    visualSupport: { ...DEFAULT_SERVICIOS_CONTENT.visualSupport, ...raw.visualSupport },
    benefits: { ...DEFAULT_SERVICIOS_CONTENT.benefits, ...raw.benefits },
    finalCta: { ...DEFAULT_SERVICIOS_CONTENT.finalCta, ...raw.finalCta },
  };
}
