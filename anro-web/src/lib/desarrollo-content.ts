export type TextItem = { id: string; text: string };

export type HeroStat = {
  id: string;
  value: string;
  title: string;
  description: string;
  wide?: boolean;
};

export type HeroContent = {
  badge: string;
  title: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  stats: HeroStat[];
};

export type SobreFact = {
  id: string;
  badge: string;
  value: string;
  title: string;
  description: string;
};

export type SobreReason = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type SobreContent = {
  badge: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  highlightLabel: string;
  highlightTitle: string;
  reasonsBadge: string;
  reasonsTitle: string;
  reasonsDescription: string;
  facts: SobreFact[];
  reasons: SobreReason[];
};

export type BenefitsContent = {
  badge: string;
  title: string;
  subtitle: string;
  items: TextItem[];
  image: string;
  cardBadge: string;
  cardTitle: string;
  cardDescription: string;
  tags: TextItem[];
};

export type Stage = {
  id: string;
  stageLabel: string;
  status: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  tags: TextItem[];
  active: boolean;
};

export type EtapasContent = {
  badge: string;
  title: string;
  description: string;
  stages: Stage[];
};

export type CommitmentStat = { id: string; value: string; label: string };

export type CommitmentImage = {
  id: string;
  image: string;
  title: string;
  visible: boolean;
};

export type CommitmentContent = {
  badge: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  stats: CommitmentStat[];
  images: CommitmentImage[];
  supportBadge: string;
  supportTitle: string;
  supportDescription: string;
  supportTags: TextItem[];
};

export type PromotionItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export type PlusPoint = { id: string; title: string; text: string };

export type PromotionsContent = {
  badge: string;
  title: string;
  description: string;
  promotions: PromotionItem[];
  plusBadge: string;
  plusTitle: string;
  plusDescription: string;
  plusPoints: PlusPoint[];
  valueBadge: string;
  valueText: string;
};

export type GalleryImage = {
  id: string;
  image: string;
  title: string;
  featured: boolean;
};

export type GalleryContent = {
  badge: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

export type CtaButton = {
  id: string;
  text: string;
  link: string;
  style: "whatsapp" | "primary";
};

export type CtaContent = {
  title: string;
  buttons: CtaButton[];
};

export type DesarrolloContentConfig = {
  hero: HeroContent;
  sobre: SobreContent;
  beneficios: BenefitsContent;
  etapas: EtapasContent;
  compromiso: CommitmentContent;
  promociones: PromotionsContent;
  galeria: GalleryContent;
  cta: CtaContent;
  updatedAt: string;
};

const DEFAULT_DESARROLLO_CONTENT: DesarrolloContentConfig = {
  hero: {
    badge: "",
    title: "",
    description: "",
    backgroundImage: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    stats: [],
  },
  sobre: {
    badge: "",
    title: "",
    paragraph1: "",
    paragraph2: "",
    image: "",
    highlightLabel: "",
    highlightTitle: "",
    reasonsBadge: "",
    reasonsTitle: "",
    reasonsDescription: "",
    facts: [],
    reasons: [],
  },
  beneficios: {
    badge: "",
    title: "",
    subtitle: "",
    items: [],
    image: "",
    cardBadge: "",
    cardTitle: "",
    cardDescription: "",
    tags: [],
  },
  etapas: {
    badge: "",
    title: "",
    description: "",
    stages: [],
  },
  compromiso: {
    badge: "",
    title: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    stats: [],
    images: [],
    supportBadge: "",
    supportTitle: "",
    supportDescription: "",
    supportTags: [],
  },
  promociones: {
    badge: "",
    title: "",
    description: "",
    promotions: [],
    plusBadge: "",
    plusTitle: "",
    plusDescription: "",
    plusPoints: [],
    valueBadge: "",
    valueText: "",
  },
  galeria: {
    badge: "",
    title: "",
    description: "",
    images: [],
  },
  cta: {
    title: "",
    buttons: [],
  },
  updatedAt: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function resolveDesarrolloContent(content: unknown): DesarrolloContentConfig {
  if (!isRecord(content)) return structuredClone(DEFAULT_DESARROLLO_CONTENT);

  const raw = content as Partial<DesarrolloContentConfig>;
  return {
    ...DEFAULT_DESARROLLO_CONTENT,
    ...raw,
    hero: { ...DEFAULT_DESARROLLO_CONTENT.hero, ...raw.hero },
    sobre: { ...DEFAULT_DESARROLLO_CONTENT.sobre, ...raw.sobre },
    beneficios: { ...DEFAULT_DESARROLLO_CONTENT.beneficios, ...raw.beneficios },
    etapas: { ...DEFAULT_DESARROLLO_CONTENT.etapas, ...raw.etapas },
    compromiso: { ...DEFAULT_DESARROLLO_CONTENT.compromiso, ...raw.compromiso },
    promociones: { ...DEFAULT_DESARROLLO_CONTENT.promociones, ...raw.promociones },
    galeria: { ...DEFAULT_DESARROLLO_CONTENT.galeria, ...raw.galeria },
    cta: { ...DEFAULT_DESARROLLO_CONTENT.cta, ...raw.cta },
  };
}
