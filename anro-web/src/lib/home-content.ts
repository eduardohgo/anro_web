export const HOME_CONTENT_STORAGE_KEY = "anro.home.content.v1";

export interface HomeHeroSlide {
  id: string;
  src: string;
  alt: string;
}

export interface HomeSectionCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface HomeContentConfig {
  heroSlides: HomeHeroSlide[];
  desarrolloCards: HomeSectionCard[];
  serviceCards: HomeSectionCard[];
  updatedAt: string;
}

export const DEFAULT_HOME_CONTENT: HomeContentConfig = {
  heroSlides: [
    { id: "hero-1", src: "/fraccionamiento/carrusel1.jpg", alt: "Fraccionamiento - imagen 1" },
    { id: "hero-2", src: "/fraccionamiento/carrusel2.jpg", alt: "Fraccionamiento - imagen 2" },
    { id: "hero-3", src: "/fraccionamiento/carrusel3.jpg", alt: "Fraccionamiento - imagen 3" },
    { id: "hero-4", src: "/fraccionamiento/carrusel4.jpg", alt: "Fraccionamiento - imagen 4" },
  ],
  desarrolloCards: [
    {
      id: "desarrollo-1",
      title: "Primera etapa",
      description: "Avances de urbanización y habilitación de espacios clave.",
      image: "/fraccionamiento/primeraEtapa.jpg",
    },
    {
      id: "desarrollo-2",
      title: "Segunda etapa",
      description: "Ampliación del proyecto y conexión con nuevas zonas.",
      image: "/fraccionamiento/carrusel2.jpg",
    },
    {
      id: "desarrollo-3",
      title: "Recorrido virtual",
      description: "Vista general de ubicación, accesos y entorno.",
      image: "/fraccionamiento/carrusel3.jpg",
    },
  ],
  serviceCards: [
    {
      id: "servicio-1",
      title: "Desarrollo Inmobiliario",
      description: "Planeación y ejecución de proyectos inmobiliarios con visión de crecimiento, orden y plusvalía.",
      image: "/fraccionamiento/desarrolloInmobilario.png",
    },
    {
      id: "servicio-2",
      title: "Compra, Venta y Renta",
      description: "Acompañamiento en operaciones de bienes raíces, con atención clara y enfoque en las necesidades del cliente.",
      image: "/fraccionamiento/carrusel1.jpg",
    },
    {
      id: "servicio-3",
      title: "Arrendamiento de Maquinaria",
      description: "Maquinaria ligera y pesada para obras y proyectos, orientada a facilitar el trabajo en campo y construcción.",
      image: "/fraccionamiento/arrendamientoMaquinaria.jpg",
    },
    {
      id: "servicio-4",
      title: "Construcción de Obras",
      description: "Desarrollo de obras públicas y privadas con enfoque en calidad, cumplimiento y funcionalidad.",
      image: "/fraccionamiento/construccionObras.jpg",
    },
  ],
  updatedAt: "2026-03-31T00:00:00.000Z",
};

function sanitizeHeroSlides(value: unknown): HomeHeroSlide[] {
  if (!Array.isArray(value)) return DEFAULT_HOME_CONTENT.heroSlides;

  const slides = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const slide = item as Partial<HomeHeroSlide>;
      return {
        id: slide.id || `hero-${index + 1}`,
        src: slide.src || DEFAULT_HOME_CONTENT.heroSlides[index]?.src || "/fraccionamiento/carrusel1.jpg",
        alt: slide.alt || DEFAULT_HOME_CONTENT.heroSlides[index]?.alt || `Slide ${index + 1}`,
      };
    })
    .filter((slide): slide is HomeHeroSlide => slide !== null);

  return slides.length > 0 ? slides : DEFAULT_HOME_CONTENT.heroSlides;
}

function sanitizeSectionCards(value: unknown, fallback: HomeSectionCard[], max: number): HomeSectionCard[] {
  if (!Array.isArray(value)) return fallback;

  const cards = value
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;
      const card = item as Partial<HomeSectionCard>;
      return {
        id: card.id || fallback[index]?.id || `card-${index + 1}`,
        title: card.title || fallback[index]?.title || "Sin título",
        description: card.description || fallback[index]?.description || "",
        image: card.image || fallback[index]?.image || "/fraccionamiento/carrusel1.jpg",
      };
    })
    .filter((card): card is HomeSectionCard => card !== null);

  return cards.length > 0 ? cards.slice(0, max) : fallback;
}

export function resolveHomeContent(raw: unknown): HomeContentConfig {
  if (!raw || typeof raw !== "object") return DEFAULT_HOME_CONTENT;

  const source = raw as Partial<HomeContentConfig>;

  return {
    heroSlides: sanitizeHeroSlides(source.heroSlides),
    desarrolloCards: sanitizeSectionCards(source.desarrolloCards, DEFAULT_HOME_CONTENT.desarrolloCards, 3),
    serviceCards: sanitizeSectionCards(source.serviceCards, DEFAULT_HOME_CONTENT.serviceCards, 4),
    updatedAt: source.updatedAt || DEFAULT_HOME_CONTENT.updatedAt,
  };
}

export function parseStoredHomeContent(value: string | null): HomeContentConfig {
  if (!value) return DEFAULT_HOME_CONTENT;

  try {
    return resolveHomeContent(JSON.parse(value) as unknown);
  } catch {
    return DEFAULT_HOME_CONTENT;
  }
}
