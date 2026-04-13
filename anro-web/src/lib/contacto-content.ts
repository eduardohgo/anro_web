export type TextItem = { id: string; text: string };
export type InfoCard = { id: string; title: string; description: string };
export type NumberCard = { id: string; number: string; title: string; description: string };

export type HeroFeatureCard = {
  id: string;
  icon: "phone" | "mail";
  keyword: string;
  title: string;
  description: string;
};

export type HeroContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  sideBadge: string;
  sideTitle: string;
  sideDescription: string;
  featureCards: HeroFeatureCard[];
  attentionTitle: string;
  attentionText: string;
  companyLabel: string;
  companyText: string;
};

export type WelcomeContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftCards: NumberCard[];
  messageBadge: string;
  messageTitle: string;
  messageDescription: string;
  rightCards: InfoCard[];
};

export type ChannelCard = {
  id: string;
  badge: string;
  title: string;
  description: string;
  value: string;
  footnote: string;
  icon: "chat" | "mail" | "phone" | "map";
};

export type ChannelsContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftBadge: string;
  leftTitle: string;
  leftDescription: string;
  channels: ChannelCard[];
};

export type FormCard = { id: string; badge: string; title: string; description: string; highlighted?: boolean };
export type FooterInfoCard = { id: string; title: string; description: string };

export type FormContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftCards: FormCard[];
  formHeaderBadge: string;
  formHeaderTitle: string;
  formHeaderDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  reasonLabel: string;
  reasonOptions: TextItem[];
  messageLabel: string;
  messagePlaceholder: string;
  consentText: string;
  submitText: string;
  footerCards: FooterInfoCard[];
};

export type TrustContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  sideBadge: string;
  sideTitle: string;
  sideDescription: string;
  cards: NumberCard[];
  bottomBadge: string;
  bottomTitle: string;
  bottomCards: InfoCard[];
};

export type LocationInfoCard = { id: string; title: string; value: string; description: string };

export type LocationContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  companyCard: LocationInfoCard;
  addressCard: LocationInfoCard;
  coordinatesCard: LocationInfoCard;
  routeCard: LocationInfoCard;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  mapEmbedUrl: string;
  rightCards: InfoCard[];
};

export type CtaBottomCard = { id: string; label: string; title: string; description: string };

export type CtaContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  bottomCards: CtaBottomCard[];
};

export type ContactContentConfig = {
  hero: HeroContent;
  welcome: WelcomeContent;
  channels: ChannelsContent;
  form: FormContent;
  trust: TrustContent;
  location: LocationContent;
  cta: CtaContent;
  updatedAt: string;
};

const EMPTY_LOCATION_CARD: LocationInfoCard = { id: "", title: "", value: "", description: "" };

const DEFAULT_CONTACT_CONTENT: ContactContentConfig = {
  hero: { badge: "", titleWhite: "", titleGold: "", description: "", primaryButtonText: "", primaryButtonLink: "", secondaryButtonText: "", secondaryButtonLink: "", sideBadge: "", sideTitle: "", sideDescription: "", featureCards: [], attentionTitle: "", attentionText: "", companyLabel: "", companyText: "" },
  welcome: { badge: "", titleWhite: "", titleGold: "", description: "", leftCards: [], messageBadge: "", messageTitle: "", messageDescription: "", rightCards: [] },
  channels: { badge: "", titleWhite: "", titleGold: "", description: "", leftBadge: "", leftTitle: "", leftDescription: "", channels: [] },
  form: { badge: "", titleWhite: "", titleGold: "", description: "", leftCards: [], formHeaderBadge: "", formHeaderTitle: "", formHeaderDescription: "", nameLabel: "", namePlaceholder: "", phoneLabel: "", phonePlaceholder: "", emailLabel: "", emailPlaceholder: "", reasonLabel: "", reasonOptions: [], messageLabel: "", messagePlaceholder: "", consentText: "", submitText: "", footerCards: [] },
  trust: { badge: "", titleWhite: "", titleGold: "", description: "", sideBadge: "", sideTitle: "", sideDescription: "", cards: [], bottomBadge: "", bottomTitle: "", bottomCards: [] },
  location: { badge: "", titleWhite: "", titleGold: "", description: "", companyCard: EMPTY_LOCATION_CARD, addressCard: EMPTY_LOCATION_CARD, coordinatesCard: EMPTY_LOCATION_CARD, routeCard: EMPTY_LOCATION_CARD, primaryButtonText: "", primaryButtonLink: "", secondaryButtonText: "", secondaryButtonLink: "", mapEmbedUrl: "", rightCards: [] },
  cta: { badge: "", titleWhite: "", titleGold: "", description: "", primaryButtonText: "", primaryButtonLink: "", secondaryButtonText: "", secondaryButtonLink: "", bottomCards: [] },
  updatedAt: "",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

export function resolveContactoContent(content: unknown): ContactContentConfig {
  if (!isRecord(content)) return structuredClone(DEFAULT_CONTACT_CONTENT);

  const raw = content as Partial<ContactContentConfig>;
  return {
    ...DEFAULT_CONTACT_CONTENT,
    ...raw,
    hero: { ...DEFAULT_CONTACT_CONTENT.hero, ...raw.hero },
    welcome: { ...DEFAULT_CONTACT_CONTENT.welcome, ...raw.welcome },
    channels: { ...DEFAULT_CONTACT_CONTENT.channels, ...raw.channels },
    form: { ...DEFAULT_CONTACT_CONTENT.form, ...raw.form },
    trust: { ...DEFAULT_CONTACT_CONTENT.trust, ...raw.trust },
    location: {
      ...DEFAULT_CONTACT_CONTENT.location,
      ...raw.location,
      companyCard: { ...DEFAULT_CONTACT_CONTENT.location.companyCard, ...raw.location?.companyCard },
      addressCard: { ...DEFAULT_CONTACT_CONTENT.location.addressCard, ...raw.location?.addressCard },
      coordinatesCard: { ...DEFAULT_CONTACT_CONTENT.location.coordinatesCard, ...raw.location?.coordinatesCard },
      routeCard: { ...DEFAULT_CONTACT_CONTENT.location.routeCard, ...raw.location?.routeCard },
    },
    cta: { ...DEFAULT_CONTACT_CONTENT.cta, ...raw.cta },
  };
}
