export interface DesarrolloCard {
  id: string;
  badge: string;
  title: string;
  description: string;
}

export interface DesarrolloCtaButton {
  id: string;
  text: string;
  link: string;
}

export interface DesarrolloContent {
  hero: {
    badge: string;
    title: string;
    description: string;
    backgroundImage: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  benefits: {
    cards: DesarrolloCard[];
  };
  cta: {
    title: string;
    buttons: DesarrolloCtaButton[];
  };
}

export interface ServiciosItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServiciosContent {
  hero: {
    badge: string;
    titleWhite: string;
    titleGold: string;
    description: string;
    backgroundImage: string;
  };
  servicesDetailed: {
    items: ServiciosItem[];
  };
  finalCta: {
    titleWhite: string;
    titleGold: string;
    description: string;
    submitText: string;
  };
}

export interface ContactoCard {
  id: string;
  badge: string;
  title: string;
  description: string;
}

export interface ContactoContent {
  hero: {
    badge: string;
    titleWhite: string;
    titleGold: string;
    description: string;
  };
  channels: {
    cards: ContactoCard[];
  };
  cta: {
    badge: string;
    titleWhite: string;
    titleGold: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
}

export const DEFAULT_DESARROLLO_CONTENT: DesarrolloContent = {
  hero: {
    badge: "Desarrollo ANRO",
    title: "Desarrollo inmobiliario",
    description: "Conoce etapas, beneficios y avances del proyecto.",
    backgroundImage: "/fraccionamiento/carrusel1.jpg",
    primaryButtonText: "Solicitar información",
    primaryButtonLink: "/contacto",
    secondaryButtonText: "Ver servicios",
    secondaryButtonLink: "/servicios",
  },
  about: {
    title: "Sobre el desarrollo",
    paragraph1: "Estamos actualizando esta sección con información del proyecto.",
    paragraph2: "Muy pronto encontrarás aquí todos los detalles.",
  },
  benefits: {
    cards: [],
  },
  cta: {
    title: "¿Te interesa este desarrollo?",
    buttons: [
      {
        id: "cta-1",
        text: "Contáctanos",
        link: "/contacto",
      },
    ],
  },
};

export const DEFAULT_SERVICIOS_CONTENT: ServiciosContent = {
  hero: {
    badge: "Servicios ANRO",
    titleWhite: "Servicios",
    titleGold: "ANRO",
    description: "Soluciones integrales para proyectos inmobiliarios y de construcción.",
    backgroundImage: "/fraccionamiento/carrusel1.jpg",
  },
  servicesDetailed: {
    items: [],
  },
  finalCta: {
    titleWhite: "¿Listo para",
    titleGold: "iniciar tu proyecto?",
    description: "Hablemos y diseñemos la mejor solución para ti.",
    submitText: "Contactar ahora",
  },
};

export const DEFAULT_CONTACTO_CONTENT: ContactoContent = {
  hero: {
    badge: "Contacto ANRO",
    titleWhite: "Hablemos",
    titleGold: "de tu proyecto",
    description: "Estamos listos para ayudarte.",
  },
  channels: {
    cards: [],
  },
  cta: {
    badge: "Atención personalizada",
    titleWhite: "Agenda",
    titleGold: "tu cita",
    description: "Te acompañamos en cada etapa.",
    primaryButtonText: "Ir a servicios",
    primaryButtonLink: "/servicios",
    secondaryButtonText: "Conócenos",
    secondaryButtonLink: "/nosotros",
  },
};

export function resolveDesarrolloContent(content: unknown): DesarrolloContent {
  if (!content || typeof content !== "object") {
    return structuredClone(DEFAULT_DESARROLLO_CONTENT);
  }

  const raw = content as Partial<DesarrolloContent>;
  return {
    ...DEFAULT_DESARROLLO_CONTENT,
    ...raw,
    hero: { ...DEFAULT_DESARROLLO_CONTENT.hero, ...raw.hero },
    about: { ...DEFAULT_DESARROLLO_CONTENT.about, ...raw.about },
    benefits: {
      ...DEFAULT_DESARROLLO_CONTENT.benefits,
      ...raw.benefits,
      cards: raw.benefits?.cards?.length ? raw.benefits.cards : DEFAULT_DESARROLLO_CONTENT.benefits.cards,
    },
    cta: {
      ...DEFAULT_DESARROLLO_CONTENT.cta,
      ...raw.cta,
      buttons: raw.cta?.buttons?.length ? raw.cta.buttons : DEFAULT_DESARROLLO_CONTENT.cta.buttons,
    },
  };
}

export function resolveServiciosContent(content: unknown): ServiciosContent {
  if (!content || typeof content !== "object") {
    return structuredClone(DEFAULT_SERVICIOS_CONTENT);
  }

  const raw = content as Partial<ServiciosContent>;
  return {
    ...DEFAULT_SERVICIOS_CONTENT,
    ...raw,
    hero: { ...DEFAULT_SERVICIOS_CONTENT.hero, ...raw.hero },
    servicesDetailed: {
      ...DEFAULT_SERVICIOS_CONTENT.servicesDetailed,
      ...raw.servicesDetailed,
      items: raw.servicesDetailed?.items?.length ? raw.servicesDetailed.items : DEFAULT_SERVICIOS_CONTENT.servicesDetailed.items,
    },
    finalCta: { ...DEFAULT_SERVICIOS_CONTENT.finalCta, ...raw.finalCta },
  };
}

export function resolveContactoContent(content: unknown): ContactoContent {
  if (!content || typeof content !== "object") {
    return structuredClone(DEFAULT_CONTACTO_CONTENT);
  }

  const raw = content as Partial<ContactoContent>;
  return {
    ...DEFAULT_CONTACTO_CONTENT,
    ...raw,
    hero: { ...DEFAULT_CONTACTO_CONTENT.hero, ...raw.hero },
    channels: {
      ...DEFAULT_CONTACTO_CONTENT.channels,
      ...raw.channels,
      cards: raw.channels?.cards?.length ? raw.channels.cards : DEFAULT_CONTACTO_CONTENT.channels.cards,
    },
    cta: { ...DEFAULT_CONTACTO_CONTENT.cta, ...raw.cta },
  };
}
