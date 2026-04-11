export type NosotrosPillar = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type NosotrosValue = {
  id: string;
  number: string;
  title: string;
  text: string;
};

export type NosotrosStrength = {
  id: string;
  title: string;
  text: string;
};

export type NosotrosAboutCard = {
  id: string;
  label: string;
  title: string;
  text: string;
};

export type NosotrosContent = {
  hero: {
    badge: string;
    titleWhite: string;
    titleGold: string;
    description: string;
    image: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  about: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    image: string;
    cards: NosotrosAboutCard[];
  };
  mission: {
    badge: string;
    title: string;
    description: string;
  };
  vision: {
    badge: string;
    title: string;
    description: string;
  };
  pillars: {
    badge: string;
    title: string;
    description: string;
    items: NosotrosPillar[];
  };
  values: {
    badge: string;
    title: string;
    description: string;
    items: NosotrosValue[];
    strengths: NosotrosStrength[];
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
  };
  updatedAt: string;
};

export const DEFAULT_NOSOTROS_CONTENT: NosotrosContent = {
  hero: {
    badge: "Nosotros ANRO",
    titleWhite: "Una firma que integra visión,",
    titleGold: "ejecución y valor patrimonial",
    description:
      "En ANRO unimos desarrollo inmobiliario, construcción, compra, venta, renta y arrendamiento de maquinaria para ofrecer soluciones sólidas, bien estructuradas y alineadas al crecimiento de cada cliente.",
    image: "/fraccionamiento/carrusel1.jpg",
    primaryButtonText: "Hablar con ANRO",
    primaryButtonLink: "/contacto",
    secondaryButtonText: "Ver servicios",
    secondaryButtonLink: "/servicios",
  },
  about: {
    badge: "Quiénes somos",
    title: "Sobre ANRO: estructura empresarial para proyectos bien resueltos",
    paragraph1:
      "Somos una empresa enfocada en transformar oportunidades en proyectos concretos. Integramos capacidades de desarrollo inmobiliario, construcción y operación para atender necesidades patrimoniales con mayor solidez técnica y mejor toma de decisiones.",
    paragraph2:
      "Nuestro modelo de trabajo combina análisis, planeación y ejecución responsable. Esto nos permite acompañar a cada cliente con claridad, cuidar cada etapa del proceso y mantener una visión empresarial que prioriza funcionalidad, rendimiento y crecimiento sostenible.",
    image: "/fraccionamiento/carrusel2.jpg",
    cards: [
      {
        id: "about-card-1",
        label: "Visión clara",
        title: "Decisiones con rumbo",
        text: "Evaluamos contexto, viabilidad y proyección para establecer estrategias realistas que reduzcan incertidumbre y fortalezcan el valor del proyecto.",
      },
      {
        id: "about-card-2",
        label: "Trabajo serio",
        title: "Ejecución con control",
        text: "Operamos con procesos definidos, seguimiento permanente y una cultura de cumplimiento que respalda tiempos, calidad y resultados.",
      },
    ],
  },
  mission: {
    badge: "Misión",
    title: "Construir proyectos sólidos con atención cercana",
    description:
      "Ofrecer soluciones integrales en desarrollo inmobiliario, construcción y servicios patrimoniales, combinando planeación técnica, ejecución responsable y acompañamiento profesional en cada etapa.",
  },
  vision: {
    badge: "Visión",
    title: "Ser referencia regional en desarrollo y construcción",
    description:
      "Consolidarnos como una empresa confiable y competitiva, reconocida por transformar oportunidades en proyectos funcionales, rentables y sostenibles para familias e inversionistas.",
  },
  pillars: {
    badge: "Esencia de trabajo",
    title: "Pilares que guían cómo trabajamos en ANRO",
    description:
      "Nuestro enfoque se basa en procesos claros, ejecución disciplinada y acompañamiento constante para generar valor real.",
    items: [
      {
        id: "pillar-1",
        number: "01",
        title: "Visión clara de proyecto",
        description:
          "Iniciamos con diagnóstico técnico, financiero y urbano para tomar decisiones con rumbo, minimizar riesgos y sostener una proyección patrimonial real.",
      },
      {
        id: "pillar-2",
        number: "02",
        title: "Trabajo serio en ejecución",
        description:
          "Convertimos planes en resultados con procesos ordenados, supervisión constante y criterios de calidad que cuidan tiempos, presupuesto y funcionalidad.",
      },
      {
        id: "pillar-3",
        number: "03",
        title: "Atención cercana y profesional",
        description:
          "Escuchamos cada contexto para orientar con claridad en compra, venta, renta y construcción, manteniendo acompañamiento continuo durante todo el proceso.",
      },
      {
        id: "pillar-4",
        number: "04",
        title: "Respaldo integral ANRO",
        description:
          "Articulamos desarrollo inmobiliario, construcción y arrendamiento de maquinaria para dar soluciones completas y mayor certidumbre operativa.",
      },
    ],
  },
  values: {
    badge: "Valores y fortalezas",
    title: "Nuestra cultura de trabajo y ventajas operativas",
    description:
      "Combinamos principios sólidos con capacidades técnicas para ejecutar mejor cada proyecto.",
    items: [
      {
        id: "value-1",
        number: "01",
        title: "Confianza",
        text: "Trabajamos con transparencia, seguimiento y comunicación clara para que cada decisión se tome con seguridad y fundamento.",
      },
      {
        id: "value-2",
        number: "02",
        title: "Compromiso",
        text: "Asumimos cada proyecto como propio, con responsabilidad en la planeación, cumplimiento en la ejecución y constancia en el acompañamiento.",
      },
      {
        id: "value-3",
        number: "03",
        title: "Calidad funcional",
        text: "Priorizamos soluciones que funcionen en la realidad: bien diseñadas, bien construidas y alineadas a los objetivos patrimoniales de cada cliente.",
      },
      {
        id: "value-4",
        number: "04",
        title: "Cercanía",
        text: "Mantenemos una relación directa y humana, entendiendo necesidades reales para construir experiencias más simples, ordenadas y confiables.",
      },
    ],
    strengths: [
      {
        id: "strength-1",
        title: "Desarrollo inmobiliario estratégico",
        text: "Planeamos y estructuramos proyectos con enfoque de plusvalía, orden urbano y proyección de largo plazo.",
      },
      {
        id: "strength-2",
        title: "Construcción con control técnico",
        text: "Ejecución supervisada con procesos definidos, criterios de calidad y avances medibles en cada etapa.",
      },
      {
        id: "strength-3",
        title: "Compra, venta y renta con asesoría",
        text: "Orientación profesional para tomar decisiones patrimoniales claras, rentables y sostenibles.",
      },
      {
        id: "strength-4",
        title: "Arrendamiento de maquinaria",
        text: "Soporte operativo para obras y desarrollos que requieren continuidad, eficiencia y respuesta oportuna.",
      },
    ],
  },
  cta: {
    badge: "Hablemos de tu proyecto",
    title: "Estamos listos para acompañarte en tu próximo paso",
    description:
      "Ya sea inversión, desarrollo o construcción, en ANRO te orientamos con claridad para convertir una oportunidad en un proyecto real.",
    primaryButtonText: "Solicitar asesoría",
    primaryButtonLink: "/contacto",
    secondaryButtonText: "Conocer servicios",
    secondaryButtonLink: "/servicios",
  },
  updatedAt: new Date().toISOString(),
};

export function resolveNosotrosContent(content: unknown): NosotrosContent {
  if (!content || typeof content !== "object") {
    return structuredClone(DEFAULT_NOSOTROS_CONTENT);
  }

  const raw = content as Partial<NosotrosContent>;
  return {
    ...DEFAULT_NOSOTROS_CONTENT,
    ...raw,
    hero: { ...DEFAULT_NOSOTROS_CONTENT.hero, ...raw.hero },
    about: {
      ...DEFAULT_NOSOTROS_CONTENT.about,
      ...raw.about,
      cards: raw.about?.cards?.length ? raw.about.cards : DEFAULT_NOSOTROS_CONTENT.about.cards,
    },
    mission: { ...DEFAULT_NOSOTROS_CONTENT.mission, ...raw.mission },
    vision: { ...DEFAULT_NOSOTROS_CONTENT.vision, ...raw.vision },
    pillars: {
      ...DEFAULT_NOSOTROS_CONTENT.pillars,
      ...raw.pillars,
      items: raw.pillars?.items?.length ? raw.pillars.items : DEFAULT_NOSOTROS_CONTENT.pillars.items,
    },
    values: {
      ...DEFAULT_NOSOTROS_CONTENT.values,
      ...raw.values,
      items: raw.values?.items?.length ? raw.values.items : DEFAULT_NOSOTROS_CONTENT.values.items,
      strengths: raw.values?.strengths?.length ? raw.values.strengths : DEFAULT_NOSOTROS_CONTENT.values.strengths,
    },
    cta: { ...DEFAULT_NOSOTROS_CONTENT.cta, ...raw.cta },
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : new Date().toISOString(),
  };
}
