export const HOME_CONTENT_STORAGE_KEY = "anro-home-content";
export const HOME_CONTENT_UPDATED_EVENT = "anro-home-content-updated";

export interface HomeHeroSlide {
  id: string;
  src: string;
  alt: string;
}

export interface HomeFeatureItem {
  id: string;
  text: string;
}

export interface HomeQuickFact {
  id: string;
  label: string;
  value: string;
}

export interface HomeHeroSection {
  badge: string;
  titleLineOne: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  locationLinkText: string;
  locationLink: string;
  featureItems: HomeFeatureItem[];
  quickFacts: HomeQuickFact[];
}

export interface HomeVisualCard {
  id: string;
  title: string;
  tag: string;
  image: string;
  order: number;
  active: boolean;
}

export interface HomeDevelopmentSection {
  badge: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  sideList: string[];
  buttonText: string;
  buttonLink: string;
  cards: HomeVisualCard[];
}

export interface HomeServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
}

export interface HomeServicesSection {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  cards: HomeServiceCard[];
}

export interface HomeCommitmentFeature {
  title: string;
  description: string;
}

export interface HomeCommitmentImage {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

export interface HomeCommitmentSection {
  badge: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  featureBlocks: HomeCommitmentFeature[];
  mainImage: HomeCommitmentImage;
  sideImages: HomeCommitmentImage[];
}

export interface HomeCtaSection {
  title: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  footerText: string;
}

export interface HomeContentConfig {
  heroSlides: HomeHeroSlide[];
  heroSection: HomeHeroSection;
  developmentSection: HomeDevelopmentSection;
  servicesSection: HomeServicesSection;
  commitmentSection: HomeCommitmentSection;
  ctaSection: HomeCtaSection;
  updatedAt: string;
}

export const DEFAULT_HOME_CONTENT: HomeContentConfig = {
  heroSlides: [
    {
      id: "hero-1",
      src: "/fraccionamiento/carrusel1.jpg",
      alt: "Fraccionamiento - imagen 1",
    },
    {
      id: "hero-2",
      src: "/fraccionamiento/carrusel2.jpg",
      alt: "Fraccionamiento - imagen 2",
    },
    {
      id: "hero-3",
      src: "/fraccionamiento/carrusel3.jpg",
      alt: "Fraccionamiento - imagen 3",
    },
  ],
  heroSection: {
    badge: "Desarrollo residencial",
    titleLineOne: "Fraccionamiento",
    titleHighlight: "Daniel Andrade Fayad",
    description:
      "Un desarrollo pensado para brindar seguridad, accesibilidad y plusvalía, con espacios planificados para tu patrimonio.",
    primaryButtonText: "Ver Desarrollo",
    primaryButtonLink: "/desarrollo",
    secondaryButtonText: "Agendar Cita",
    secondaryButtonLink: "/contacto",
    locationLinkText: "Ver ubicación",
    locationLink: "/contacto#ubicacion",
    featureItems: [
      { id: "feat-1", text: "Escrituras públicas" },
      { id: "feat-2", text: "Promociones al contado" },
      { id: "feat-3", text: "Atención personalizada" },
    ],
    quickFacts: [
      { id: "qf-1", label: "Lotes", value: "10x20 (200 m²)" },
      { id: "qf-2", label: "Ubicación", value: "Huejutla de Reyes, Hgo." },
      {
        id: "qf-3",
        label: "Escrituración",
        value: "Entrega de escrituras públicas",
      },
      { id: "qf-4", label: "Promos", value: "Consulta promociones" },
    ],
  },
  developmentSection: {
    badge: "Desarrollo principal",
    title: "Nuestro Desarrollo Principal",
    subtitle: "Etapas, avances, beneficios y recorrido virtual.",
    backgroundImage: "/fraccionamiento/carrusel3.jpg",
    sideList: [
      "Primera etapa",
      "Segunda etapa / ampliación",
      "Avances y beneficios",
      "Recorrido virtual",
    ],
    buttonText: "Ver ubicación",
    buttonLink: "/contacto#ubicacion",
    cards: [
      {
        id: "dev-1",
        title: "Primera etapa",
        tag: "Etapa 1",
        image: "/fraccionamiento/primeraEtapa.jpg",
        order: 1,
        active: true,
      },
      {
        id: "dev-2",
        title: "Segunda etapa",
        tag: "Etapa 2",
        image: "/fraccionamiento/carrusel2.jpg",
        order: 2,
        active: true,
      },
      {
        id: "dev-3",
        title: "Recorrido virtual",
        tag: "Tour",
        image: "/fraccionamiento/carrusel3.jpg",
        order: 3,
        active: true,
      },
    ],
  },
  servicesSection: {
    badge: "Soluciones ANRO",
    title: "Servicios",
    description:
      "Soluciones inmobiliarias y de construcción a tu medida, con atención profesional y acompañamiento en cada etapa.",
    buttonText: "Ver todos los servicios",
    buttonLink: "/desarrollo#beneficios-servicios",
    cards: [
      {
        id: "servicio-1",
        title: "Desarrollo Inmobiliario",
        description:
          "Planeación y ejecución de proyectos inmobiliarios con visión de crecimiento, orden y plusvalía.",
        image: "/fraccionamiento/desarrolloInmobilario.png",
        order: 1,
        active: true,
      },
      {
        id: "servicio-2",
        title: "Compra, Venta y Renta",
        description:
          "Acompañamiento en operaciones de bienes raíces, con atención clara y enfoque en las necesidades del cliente.",
        image: "/fraccionamiento/carrusel1.jpg",
        order: 2,
        active: true,
      },
      {
        id: "servicio-3",
        title: "Arrendamiento de Maquinaria",
        description:
          "Maquinaria ligera y pesada para obras y proyectos, orientada a facilitar el trabajo en campo y construcción.",
        image: "/fraccionamiento/arrendamientoMaquinaria.jpg",
        order: 3,
        active: true,
      },
      {
        id: "servicio-4",
        title: "Construcción de Obras",
        description:
          "Desarrollo de obras públicas y privadas con enfoque en calidad, cumplimiento y funcionalidad.",
        image: "/fraccionamiento/construccionObras.jpg",
        order: 4,
        active: true,
      },
    ],
  },
  commitmentSection: {
    badge: "Confianza ANRO",
    title: "Compromiso y resultados",
    description:
      "En ANRO trabajamos con responsabilidad, atención personalizada y seguimiento constante para brindar confianza en cada etapa del proyecto. Nuestro compromiso se demuestra con hechos, avance y presencia real.",
    primaryButtonText: "Ver avances",
    primaryButtonLink: "/desarrollo",
    secondaryButtonText: "Agendar cita",
    secondaryButtonLink: "/contacto",
    featureBlocks: [
      {
        title: "Atención cercana",
        description: "Seguimiento claro y acompañamiento en el proceso.",
      },
      {
        title: "Trabajo constante",
        description: "Evidencia real del desarrollo y compromiso con cada etapa.",
      },
    ],
    mainImage: {
      image: "/fraccionamiento/carrusel1.jpg",
      alt: "Presencia y avance real",
      title: "Presencia y avance real",
      subtitle: "Seguimiento constante del desarrollo.",
    },
    sideImages: [
      {
        image: "/fraccionamiento/carrusel2.jpg",
        alt: "Seguimiento constante",
        title: "Seguimiento constante",
        subtitle: "Avance documentado del proyecto.",
      },
      {
        image: "/fraccionamiento/carrusel3.jpg",
        alt: "Desarrollo en marcha",
        title: "Desarrollo en marcha",
        subtitle: "Obra y espacios en evolución.",
      },
    ],
  },
  ctaSection: {
    title: "Agenda tu cita y conoce tu próximo patrimonio",
    primaryButtonText: "WhatsApp",
    primaryButtonLink: "https://wa.me/52771974658",
    secondaryButtonText: "Llamar",
    secondaryButtonLink: "/contacto",
    footerText: "ANRO · Privada",
  },
  updatedAt: "2026-03-31T00:00:00.000Z",
};

function text(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function bool(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function num(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function sanitizeHeroSlides(value: unknown): HomeHeroSlide[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_CONTENT.heroSlides;

  const slides = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const slide = item as Partial<HomeHeroSlide>;
      return {
        id: text(slide.id, `hero-${index + 1}`),
        src: text(
          slide.src,
          DEFAULT_HOME_CONTENT.heroSlides[index]?.src ||
            "/fraccionamiento/carrusel1.jpg"
        ),
        alt: text(
          slide.alt,
          DEFAULT_HOME_CONTENT.heroSlides[index]?.alt || `Slide ${index + 1}`
        ),
      };
    })
    .filter((slide): slide is HomeHeroSlide => slide !== null);

  return slides.length > 0 ? slides : DEFAULT_HOME_CONTENT.heroSlides;
}

function sanitizeHeroSection(value: unknown): HomeHeroSection {
  if (!value || typeof value !== "object") return DEFAULT_HOME_CONTENT.heroSection;

  const section = value as Partial<HomeHeroSection>;

  return {
    badge: text(section.badge, DEFAULT_HOME_CONTENT.heroSection.badge),
    titleLineOne: text(
      section.titleLineOne,
      DEFAULT_HOME_CONTENT.heroSection.titleLineOne
    ),
    titleHighlight: text(
      section.titleHighlight,
      DEFAULT_HOME_CONTENT.heroSection.titleHighlight
    ),
    description: text(
      section.description,
      DEFAULT_HOME_CONTENT.heroSection.description
    ),
    primaryButtonText: text(
      section.primaryButtonText,
      DEFAULT_HOME_CONTENT.heroSection.primaryButtonText
    ),
    primaryButtonLink: text(
      section.primaryButtonLink,
      DEFAULT_HOME_CONTENT.heroSection.primaryButtonLink
    ),
    secondaryButtonText: text(
      section.secondaryButtonText,
      DEFAULT_HOME_CONTENT.heroSection.secondaryButtonText
    ),
    secondaryButtonLink: text(
      section.secondaryButtonLink,
      DEFAULT_HOME_CONTENT.heroSection.secondaryButtonLink
    ),
    locationLinkText: text(
      section.locationLinkText,
      DEFAULT_HOME_CONTENT.heroSection.locationLinkText
    ),
    locationLink: text(
      section.locationLink,
      DEFAULT_HOME_CONTENT.heroSection.locationLink
    ),
    featureItems: Array.isArray(section.featureItems)
      ? section.featureItems.map((item, index) => ({
          id: text(item.id, `feat-${index + 1}`),
          text: text(item.text, `Punto ${index + 1}`),
        }))
      : DEFAULT_HOME_CONTENT.heroSection.featureItems,
    quickFacts: Array.isArray(section.quickFacts)
      ? section.quickFacts.map((item, index) => ({
          id: text(item.id, `qf-${index + 1}`),
          label: text(item.label, `Dato ${index + 1}`),
          value: text(item.value, ""),
        }))
      : DEFAULT_HOME_CONTENT.heroSection.quickFacts,
  };
}

function sanitizeVisualCards(
  value: unknown,
  fallback: HomeVisualCard[]
): HomeVisualCard[] {
  if (!Array.isArray(value)) return fallback;

  const cards = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const card = item as Partial<HomeVisualCard>;
      return {
        id: text(card.id, `card-${index + 1}`),
        title: text(card.title, `Tarjeta ${index + 1}`),
        tag: text(card.tag, ""),
        image: text(
          card.image,
          fallback[index]?.image || "/fraccionamiento/carrusel1.jpg"
        ),
        order: num(card.order, index + 1),
        active: bool(card.active, true),
      };
    })
    .filter((card): card is HomeVisualCard => card !== null);

  return cards.length > 0 ? cards : fallback;
}

function sanitizeDevelopmentSection(value: unknown): HomeDevelopmentSection {
  if (!value || typeof value !== "object") {
    return DEFAULT_HOME_CONTENT.developmentSection;
  }

  const section = value as Partial<HomeDevelopmentSection>;

  return {
    badge: text(section.badge, DEFAULT_HOME_CONTENT.developmentSection.badge),
    title: text(section.title, DEFAULT_HOME_CONTENT.developmentSection.title),
    subtitle: text(
      section.subtitle,
      DEFAULT_HOME_CONTENT.developmentSection.subtitle
    ),
    backgroundImage: text(
      section.backgroundImage,
      DEFAULT_HOME_CONTENT.developmentSection.backgroundImage
    ),
    sideList: Array.isArray(section.sideList)
      ? section.sideList.map((item, index) => text(item, `Punto ${index + 1}`))
      : DEFAULT_HOME_CONTENT.developmentSection.sideList,
    buttonText: text(
      section.buttonText,
      DEFAULT_HOME_CONTENT.developmentSection.buttonText
    ),
    buttonLink: text(
      section.buttonLink,
      DEFAULT_HOME_CONTENT.developmentSection.buttonLink
    ),
    cards: sanitizeVisualCards(
      section.cards,
      DEFAULT_HOME_CONTENT.developmentSection.cards
    ),
  };
}

function sanitizeServiceCards(
  value: unknown,
  fallback: HomeServiceCard[]
): HomeServiceCard[] {
  if (!Array.isArray(value)) return fallback;

  const cards = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const card = item as Partial<HomeServiceCard>;
      return {
        id: text(card.id, `service-${index + 1}`),
        title: text(card.title, `Servicio ${index + 1}`),
        description: text(card.description, ""),
        image: text(
          card.image,
          fallback[index]?.image || "/fraccionamiento/carrusel1.jpg"
        ),
        order: num(card.order, index + 1),
        active: bool(card.active, true),
      };
    })
    .filter((card): card is HomeServiceCard => card !== null);

  return cards.length > 0 ? cards : fallback;
}

function sanitizeServicesSection(value: unknown): HomeServicesSection {
  if (!value || typeof value !== "object") return DEFAULT_HOME_CONTENT.servicesSection;

  const section = value as Partial<HomeServicesSection>;

  return {
    badge: text(section.badge, DEFAULT_HOME_CONTENT.servicesSection.badge),
    title: text(section.title, DEFAULT_HOME_CONTENT.servicesSection.title),
    description: text(
      section.description,
      DEFAULT_HOME_CONTENT.servicesSection.description
    ),
    buttonText: text(
      section.buttonText,
      DEFAULT_HOME_CONTENT.servicesSection.buttonText
    ),
    buttonLink: text(
      section.buttonLink,
      DEFAULT_HOME_CONTENT.servicesSection.buttonLink
    ),
    cards: sanitizeServiceCards(
      section.cards,
      DEFAULT_HOME_CONTENT.servicesSection.cards
    ),
  };
}

function sanitizeCommitmentImage(
  value: unknown,
  fallback: HomeCommitmentImage
): HomeCommitmentImage {
  if (!value || typeof value !== "object") return fallback;

  const image = value as Partial<HomeCommitmentImage>;

  return {
    image: text(image.image, fallback.image),
    alt: text(image.alt, fallback.alt),
    title: text(image.title, fallback.title),
    subtitle: text(image.subtitle, fallback.subtitle),
  };
}

function sanitizeCommitmentSection(value: unknown): HomeCommitmentSection {
  if (!value || typeof value !== "object") {
    return DEFAULT_HOME_CONTENT.commitmentSection;
  }

  const section = value as Partial<HomeCommitmentSection>;

  return {
    badge: text(section.badge, DEFAULT_HOME_CONTENT.commitmentSection.badge),
    title: text(section.title, DEFAULT_HOME_CONTENT.commitmentSection.title),
    description: text(
      section.description,
      DEFAULT_HOME_CONTENT.commitmentSection.description
    ),
    primaryButtonText: text(
      section.primaryButtonText,
      DEFAULT_HOME_CONTENT.commitmentSection.primaryButtonText
    ),
    primaryButtonLink: text(
      section.primaryButtonLink,
      DEFAULT_HOME_CONTENT.commitmentSection.primaryButtonLink
    ),
    secondaryButtonText: text(
      section.secondaryButtonText,
      DEFAULT_HOME_CONTENT.commitmentSection.secondaryButtonText
    ),
    secondaryButtonLink: text(
      section.secondaryButtonLink,
      DEFAULT_HOME_CONTENT.commitmentSection.secondaryButtonLink
    ),
    featureBlocks: Array.isArray(section.featureBlocks)
      ? section.featureBlocks.map((item, index) => ({
          title: text(item.title, `Bloque ${index + 1}`),
          description: text(item.description, ""),
        }))
      : DEFAULT_HOME_CONTENT.commitmentSection.featureBlocks,
    mainImage: sanitizeCommitmentImage(
      section.mainImage,
      DEFAULT_HOME_CONTENT.commitmentSection.mainImage
    ),
    sideImages: Array.isArray(section.sideImages)
      ? section.sideImages.map((item, index) =>
          sanitizeCommitmentImage(
            item,
            DEFAULT_HOME_CONTENT.commitmentSection.sideImages[index] ||
              DEFAULT_HOME_CONTENT.commitmentSection.sideImages[0]
          )
        )
      : DEFAULT_HOME_CONTENT.commitmentSection.sideImages,
  };
}

function sanitizeCtaSection(value: unknown): HomeCtaSection {
  if (!value || typeof value !== "object") return DEFAULT_HOME_CONTENT.ctaSection;

  const section = value as Partial<HomeCtaSection>;

  return {
    title: text(section.title, DEFAULT_HOME_CONTENT.ctaSection.title),
    primaryButtonText: text(
      section.primaryButtonText,
      DEFAULT_HOME_CONTENT.ctaSection.primaryButtonText
    ),
    primaryButtonLink: text(
      section.primaryButtonLink,
      DEFAULT_HOME_CONTENT.ctaSection.primaryButtonLink
    ),
    secondaryButtonText: text(
      section.secondaryButtonText,
      DEFAULT_HOME_CONTENT.ctaSection.secondaryButtonText
    ),
    secondaryButtonLink: text(
      section.secondaryButtonLink,
      DEFAULT_HOME_CONTENT.ctaSection.secondaryButtonLink
    ),
    footerText: text(
      section.footerText,
      DEFAULT_HOME_CONTENT.ctaSection.footerText
    ),
  };
}

export function resolveHomeContent(raw: unknown): HomeContentConfig {
  if (!raw || typeof raw !== "object") return DEFAULT_HOME_CONTENT;

  const source = raw as Record<string, unknown>;

  return {
    heroSlides: sanitizeHeroSlides(source.heroSlides),
    heroSection: sanitizeHeroSection(source.heroSection),
    developmentSection: sanitizeDevelopmentSection(source.developmentSection),
    servicesSection: sanitizeServicesSection(source.servicesSection),
    commitmentSection: sanitizeCommitmentSection(source.commitmentSection),
    ctaSection: sanitizeCtaSection(source.ctaSection),
    updatedAt: text(source.updatedAt, DEFAULT_HOME_CONTENT.updatedAt),
  };
}

export function parseStoredHomeContent(value: string | null): HomeContentConfig {
  if (!value) return structuredClone(DEFAULT_HOME_CONTENT);

  try {
    return resolveHomeContent(JSON.parse(value) as unknown);
  } catch {
    return structuredClone(DEFAULT_HOME_CONTENT);
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function mergeHomeContentWithDefaults(raw: unknown): HomeContentConfig {
  return resolveHomeContent(raw);
}

export function getHomeContentFromStorage(): HomeContentConfig {
  if (!isBrowser()) return structuredClone(DEFAULT_HOME_CONTENT);
  return parseStoredHomeContent(window.localStorage.getItem(HOME_CONTENT_STORAGE_KEY));
}

export function saveHomeContentToStorage(
  content: HomeContentConfig,
  { dispatchEvent = true }: { dispatchEvent?: boolean } = {}
): HomeContentConfig {
  const normalizedContent = resolveHomeContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  if (!isBrowser()) return normalizedContent;

  window.localStorage.setItem(
    HOME_CONTENT_STORAGE_KEY,
    JSON.stringify(normalizedContent)
  );

  if (dispatchEvent) {
    window.dispatchEvent(new CustomEvent(HOME_CONTENT_UPDATED_EVENT));
  }

  return normalizedContent;
}

export function resetHomeContentInStorage(
  { dispatchEvent = true }: { dispatchEvent?: boolean } = {}
): HomeContentConfig {
  const resetContent = structuredClone(DEFAULT_HOME_CONTENT);
  return saveHomeContentToStorage(resetContent, { dispatchEvent });
}

export async function fetchHomeContentFromApi(
  endpoint = "/api/public/home"
): Promise<HomeContentConfig> {
  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`No fue posible cargar Home (${response.status})`);
  }

  const data = (await response.json()) as { content?: unknown };
  return resolveHomeContent(data.content);
}

export async function saveHomeContentToApi(
  content: HomeContentConfig,
  endpoint = "/api/admin/home"
): Promise<HomeContentConfig> {
  const normalizedContent = resolveHomeContent({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: normalizedContent }),
  });

  if (!response.ok) {
    throw new Error(`No fue posible guardar Home (${response.status})`);
  }

  const data = (await response.json()) as { content?: unknown };
  return resolveHomeContent(data.content);
}
