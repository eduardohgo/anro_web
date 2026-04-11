"use client";

import {
  CheckCircle2,
  FilePenLine,
  Images,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type TextItem = {
  id: string;
  text: string;
};

type HeroCard = {
  id: string;
  title: string;
  description: string;
};

type HeroContent = {
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

type ServiceInfoBox = {
  id: string;
  title: string;
  items: TextItem[];
};

type DetailedService = {
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

type ServicesDetailedContent = {
  badge: string;
  title: string;
  description: string;
  services: DetailedService[];
};

type WorkStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  wide?: boolean;
};

type WorkProcessContent = {
  badge: string;
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  steps: WorkStep[];
};

type SpecialtyCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  strengthTitle: string;
  strengthText: string;
  valueTitle: string;
  valueText: string;
};

type SpecialtiesContent = {
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

type VisualSupportImage = {
  id: string;
  image: string;
  title: string;
  description: string;
  badge?: string;
  featured?: boolean;
};

type BottomInfoCard = {
  id: string;
  title: string;
  description: string;
};

type VisualSupportContent = {
  badge: string;
  title: string;
  description: string;
  images: VisualSupportImage[];
  bottomCards: BottomInfoCard[];
};

type BenefitCard = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type BenefitsContent = {
  badge: string;
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  cards: BenefitCard[];
};

type PremiumFeature = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type ContactFormField = {
  id: string;
  placeholder: string;
  type: string;
};

type FinalCtaContent = {
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

type ServicesContentConfig = {
  hero: HeroContent;
  detailedServices: ServicesDetailedContent;
  workProcess: WorkProcessContent;
  specialties: SpecialtiesContent;
  visualSupport: VisualSupportContent;
  benefits: BenefitsContent;
  finalCta: FinalCtaContent;
  updatedAt: string;
};


const DEFAULT_SERVICES_CONTENT: ServicesContentConfig = {
  hero: {
    badge: "Servicios ANRO",
    titleWhite: "Soluciones integrales para",
    titleGold: "desarrollar, construir y crecer",
    description:
      "En ANRO desarrollamos proyectos con visión, solidez y atención al detalle, ofreciendo servicios inmobiliarios y de construcción que generan confianza, valor y proyección.",
    backgroundImage: "/fraccionamiento/carrusel4.jpg",
    primaryButtonText: "Solicitar información",
    primaryButtonLink: "/contacto",
    secondaryButtonText: "Conocer desarrollos",
    secondaryButtonLink: "/desarrollo",
    floatingBadge: "Respaldo ANRO",
    floatingTitle: "Planeación, ejecución y acompañamiento profesional",
    floatingCards: [
      {
        id: "hero-card-1",
        title: "Desarrollo inmobiliario",
        description: "Proyectos pensados para generar valor y crecimiento.",
      },
      {
        id: "hero-card-2",
        title: "Construcción y supervisión",
        description: "Ejecución responsable con enfoque en calidad y cumplimiento.",
      },
      {
        id: "hero-card-3",
        title: "Atención personalizada",
        description: "Soluciones adaptadas a cada cliente y cada proyecto.",
      },
    ],
  },
  detailedServices: {
    badge: "Nuestros servicios",
    title: "Cuatro áreas de servicio que impulsan cada etapa de tu proyecto",
    description:
      "En ANRO concentramos nuestra experiencia en cuatro líneas principales de servicio: desarrollo inmobiliario, compra, venta y renta, arrendamiento de maquinaria y construcción de obras.",
    services: [
      {
        id: "service-1",
        label: "Servicio 01",
        eyebrow: "Planeación estratégica, proyección y plusvalía",
        title: "Desarrollo inmobiliario",
        summary:
          "Diseñamos desarrollos con visión de crecimiento, orden y valor a futuro.",
        description:
          "En ANRO concebimos el desarrollo inmobiliario como una etapa clave para transformar un espacio en una oportunidad real de inversión y crecimiento. Nuestro enfoque considera la organización del proyecto, su proyección comercial, su funcionalidad y el valor que puede generar con el tiempo.",
        idealFor:
          "Clientes e inversionistas que buscan desarrollar terrenos o espacios con una visión sólida de crecimiento, orden y valor patrimonial.",
        image: "/fraccionamiento/carrusel1.jpg",
        reverse: false,
        active: true,
        boxes: [
          {
            id: "service-1-box-1",
            title: "Qué hacemos",
            items: [
              { id: "s1b1i1", text: "Planeación de desarrollos inmobiliarios." },
              { id: "s1b1i2", text: "Organización estratégica del espacio y terreno." },
              { id: "s1b1i3", text: "Proyección de crecimiento y valor patrimonial." },
              { id: "s1b1i4", text: "Enfoque en desarrollos funcionales y atractivos." },
            ],
          },
          {
            id: "service-1-box-2",
            title: "Beneficios",
            items: [
              { id: "s1b2i1", text: "Mayor orden desde la base del proyecto." },
              { id: "s1b2i2", text: "Mejor proyección de plusvalía a futuro." },
              { id: "s1b2i3", text: "Desarrollos con visión patrimonial." },
              { id: "s1b2i4", text: "Planeación más clara y bien orientada." },
            ],
          },
        ],
      },
      {
        id: "service-2",
        label: "Servicio 02",
        eyebrow: "Asesoría inmobiliaria con cercanía y claridad",
        title: "Compra, venta y renta",
        summary:
          "Acompañamos decisiones importantes con atención clara y respaldo profesional.",
        description:
          "Brindamos acompañamiento en operaciones de compra, venta y renta de inmuebles, ofreciendo orientación cercana y seguimiento durante el proceso. Nuestro objetivo es que cada cliente pueda avanzar con mayor confianza, entendiendo mejor cada etapa y sintiéndose respaldado en una decisión importante.",
        idealFor:
          "Personas o empresas que buscan comprar, vender o rentar con mayor seguridad, respaldo y acompañamiento profesional.",
        image: "/fraccionamiento/carrusel2.jpg",
        reverse: true,
        active: true,
        boxes: [
          {
            id: "service-2-box-1",
            title: "Qué hacemos",
            items: [
              { id: "s2b1i1", text: "Asesoría para compra de propiedades." },
              { id: "s2b1i2", text: "Acompañamiento en procesos de venta." },
              { id: "s2b1i3", text: "Orientación para renta de inmuebles." },
              { id: "s2b1i4", text: "Seguimiento personalizado durante la operación." },
            ],
          },
          {
            id: "service-2-box-2",
            title: "Beneficios",
            items: [
              { id: "s2b2i1", text: "Mayor claridad en el proceso inmobiliario." },
              { id: "s2b2i2", text: "Atención más cercana y confiable." },
              { id: "s2b2i3", text: "Mejor orientación para tomar decisiones." },
              { id: "s2b2i4", text: "Operaciones más ordenadas y comprensibles." },
            ],
          },
        ],
      },
      {
        id: "service-3",
        label: "Servicio 03",
        eyebrow: "Capacidad operativa para obra, campo y ejecución",
        title: "Arrendamiento de maquinaria",
        summary:
          "Fortalecemos los proyectos con respaldo operativo y apoyo en campo.",
        description:
          "Ofrecemos arrendamiento de maquinaria para respaldar distintas etapas de obra y trabajo en campo. Este servicio aporta capacidad operativa, eficiencia y soporte práctico en procesos que requieren movimiento de tierra, fuerza de trabajo especializada o recursos adicionales para avanzar de forma más ordenada.",
        idealFor:
          "Proyectos que requieren maquinaria y soporte operativo para ejecutar trabajos en campo con mayor capacidad y eficiencia.",
        image: "/fraccionamiento/carrusel3.jpg",
        reverse: false,
        active: true,
        boxes: [
          {
            id: "service-3-box-1",
            title: "Qué hacemos",
            items: [
              { id: "s3b1i1", text: "Apoyo con maquinaria para obra y campo." },
              { id: "s3b1i2", text: "Respaldo en movimiento de tierra." },
              { id: "s3b1i3", text: "Soporte para procesos de ejecución operativa." },
              { id: "s3b1i4", text: "Capacidad adicional para trabajos en sitio." },
            ],
          },
          {
            id: "service-3-box-2",
            title: "Beneficios",
            items: [
              { id: "s3b2i1", text: "Mayor eficiencia en tareas operativas." },
              { id: "s3b2i2", text: "Mejor capacidad de respuesta en campo." },
              { id: "s3b2i3", text: "Apoyo práctico en procesos de obra." },
              { id: "s3b2i4", text: "Fortalecimiento de proyectos en ejecución." },
            ],
          },
        ],
      },
      {
        id: "service-4",
        label: "Servicio 04",
        eyebrow: "Calidad constructiva, funcionalidad y cumplimiento",
        title: "Construcción de obras",
        summary:
          "Ejecutamos obras con responsabilidad, orden y atención al detalle.",
        description:
          "Desarrollamos obras con un enfoque centrado en la calidad, la funcionalidad y el cumplimiento. En ANRO entendemos la construcción como una etapa decisiva, por eso trabajamos cuidando cada fase del proceso para lograr resultados sólidos, bien respaldados y alineados a las necesidades reales del proyecto.",
        idealFor:
          "Clientes que buscan desarrollar obras con respaldo profesional, enfoque funcional y compromiso con la calidad del resultado final.",
        image: "/fraccionamiento/carrusel4.jpg",
        reverse: true,
        active: true,
        boxes: [
          {
            id: "service-4-box-1",
            title: "Qué hacemos",
            items: [
              { id: "s4b1i1", text: "Ejecución de obras públicas y privadas." },
              { id: "s4b1i2", text: "Seguimiento de procesos constructivos." },
              { id: "s4b1i3", text: "Atención a funcionalidad y calidad de obra." },
              { id: "s4b1i4", text: "Desarrollo responsable de cada etapa del proyecto." },
            ],
          },
          {
            id: "service-4-box-2",
            title: "Beneficios",
            items: [
              { id: "s4b2i1", text: "Mayor confianza durante la ejecución." },
              { id: "s4b2i2", text: "Resultados más sólidos y funcionales." },
              { id: "s4b2i3", text: "Compromiso con calidad y cumplimiento." },
              { id: "s4b2i4", text: "Atención seria al detalle constructivo." },
            ],
          },
        ],
      },
    ],
  },
  workProcess: {
    badge: "Cómo trabajamos",
    title: "Un proceso claro para desarrollar cada proyecto con orden y visión",
    description:
      "En ANRO entendemos que cada proyecto requiere atención, seguimiento y decisiones bien estructuradas. Por eso trabajamos bajo un proceso que nos permite analizar, planear, ejecutar y acompañar cada etapa con compromiso profesional.",
    focusTitle: "Nuestro enfoque",
    focusDescription:
      "Más que ofrecer un servicio, buscamos construir confianza desde el primer acercamiento hasta la ejecución final, cuidando cada detalle del proceso para lograr resultados sólidos, funcionales y bien respaldados.",
    steps: [
      {
        id: "step-1",
        number: "01",
        title: "Escuchamos y analizamos",
        description:
          "Conocemos las necesidades, objetivos y contexto del proyecto para entender con claridad qué se busca lograr y cuál es el mejor punto de partida.",
      },
      {
        id: "step-2",
        number: "02",
        title: "Planeamos con visión",
        description:
          "Estructuramos cada etapa considerando funcionalidad, viabilidad, orden y proyección, buscando que el proyecto tenga una base sólida desde su planeación.",
      },
      {
        id: "step-3",
        number: "03",
        title: "Ejecutamos con compromiso",
        description:
          "Llevamos a cabo los procesos con responsabilidad, atención al detalle y enfoque en resultados, cuidando que cada fase avance con orden y respaldo profesional.",
      },
      {
        id: "step-4",
        number: "04",
        title: "Damos seguimiento cercano",
        description:
          "Mantenemos acompañamiento durante el desarrollo del servicio para dar mayor claridad, confianza y continuidad en la toma de decisiones.",
      },
      {
        id: "step-5",
        number: "05",
        title: "Entregamos resultados con valor",
        description:
          "Nuestro objetivo final es que cada proyecto o servicio deje un resultado funcional, sólido y bien orientado, aportando valor real al cliente y fortaleciendo su confianza en cada etapa del proceso.",
        wide: true,
      },
    ],
  },
  specialties: {
    badge: "Especialidades ANRO",
    title: "Áreas donde ANRO aporta mayor valor",
    description:
      "Nuestro trabajo integra planeación, construcción, respaldo operativo y acompañamiento inmobiliario para fortalecer proyectos con una visión más clara, funcional y orientada a resultados sólidos.",
    featuredBadge: "Especialidad principal",
    featuredTitle:
      "Desarrollo de proyectos con visión patrimonial y de crecimiento",
    featuredDescription:
      "En ANRO damos especial importancia a los proyectos que requieren planeación sólida, organización estratégica y proyección de valor, buscando que cada desarrollo tenga sentido funcional, comercial y patrimonial desde su origen.",
    featuredPointOneTitle: "Planeación clara",
    featuredPointOneText:
      "Estructuración ordenada desde las primeras etapas del proyecto.",
    featuredPointTwoTitle: "Visión de plusvalía",
    featuredPointTwoText:
      "Enfoque en valor real, crecimiento y proyección a futuro.",
    featuredFooterTitle: "Lo que distingue esta especialidad",
    featuredFooterText:
      "Combinamos análisis, orden y visión patrimonial para desarrollar proyectos con mejor estructura, mayor sentido estratégico y una base más sólida para crecer.",
    cards: [
      {
        id: "specialty-1",
        number: "01",
        title: "Ejecución de obra con enfoque funcional",
        description:
          "Desarrollamos obras con atención a la calidad constructiva, la funcionalidad del resultado y el cumplimiento responsable en cada etapa del proceso.",
        strengthTitle: "Fortaleza",
        strengthText: "Orden y seguimiento durante la ejecución.",
        valueTitle: "Valor",
        valueText: "Resultados más sólidos y funcionales.",
      },
      {
        id: "specialty-2",
        number: "02",
        title: "Respaldo operativo en campo",
        description:
          "Aportamos capacidad de respuesta para proyectos que requieren apoyo operativo, maquinaria y recursos para avanzar con mayor eficiencia.",
        strengthTitle: "Fortaleza",
        strengthText: "Apoyo práctico para obra y trabajo en sitio.",
        valueTitle: "Valor",
        valueText: "Mayor capacidad operativa y mejor respuesta.",
      },
      {
        id: "specialty-3",
        number: "03",
        title: "Atención cercana en operaciones inmobiliarias",
        description:
          "Acompañamos procesos de compra, venta y renta con claridad, seguimiento y una atención orientada a generar confianza.",
        strengthTitle: "Fortaleza",
        strengthText: "Trato cercano y seguimiento profesional.",
        valueTitle: "Valor",
        valueText: "Mayor claridad y confianza para decidir.",
      },
    ],
  },
  visualSupport: {
    badge: "Respaldo visual",
    title: "Proyectos, espacios y procesos que respaldan nuestro trabajo",
    description:
      "En ANRO creemos que cada proyecto también debe hablar por sí mismo. Estas imágenes reflejan parte del trabajo, la ejecución y el entorno real en el que desarrollamos nuestras soluciones.",
    images: [
      {
        id: "visual-1",
        image: "/fraccionamiento/carrusel1.jpg",
        title: "Espacios proyectados con orden, visión y potencial de crecimiento",
        description:
          "Proyectos concebidos con una estructura clara, una mejor proyección de valor y una visión orientada al desarrollo.",
        badge: "Desarrollo inmobiliario",
        featured: true,
      },
      {
        id: "visual-2",
        image: "/fraccionamiento/carrusel2.jpg",
        title: "Atención inmobiliaria cercana",
        description:
          "Procesos respaldados con seguimiento y orientación profesional.",
      },
      {
        id: "visual-3",
        image: "/fraccionamiento/carrusel3.jpg",
        title: "Respaldo operativo",
        description:
          "Maquinaria y apoyo para ejecución en campo.",
      },
      {
        id: "visual-4",
        image: "/fraccionamiento/carrusel4.jpg",
        title: "Ejecución de obra",
        description:
          "Procesos constructivos con enfoque funcional.",
      },
    ],
    bottomCards: [
      {
        id: "bottom-1",
        title: "Evidencia real",
        description:
          "Mostramos entornos, procesos y espacios que reflejan el trabajo real detrás de cada servicio.",
      },
      {
        id: "bottom-2",
        title: "Trabajo en campo",
        description:
          "Desde el desarrollo inmobiliario hasta la operación y construcción, cada etapa cuenta con respaldo visual.",
      },
      {
        id: "bottom-3",
        title: "Confianza y presencia",
        description:
          "Esta sección ayuda a transmitir experiencia, actividad y capacidad de ejecución de una forma más tangible.",
      },
    ],
  },
  benefits: {
    badge: "Beneficios ANRO",
    title: "Razones para confiar en ANRO en cada etapa de tu proyecto",
    description:
      "Nuestro trabajo busca ofrecer más que un servicio: buscamos aportar claridad, respaldo y una ejecución confiable que permita a cada cliente avanzar con mayor seguridad, orden y visión.",
    focusTitle: "Lo que buscamos en cada proyecto",
    focusDescription:
      "Combinar experiencia, atención cercana y compromiso profesional para ofrecer resultados funcionales, sólidos y alineados a las necesidades reales de cada cliente.",
    cards: [
      {
        id: "benefit-card-1",
        number: "01",
        title: "Atención personalizada",
        description:
          "Cada proyecto recibe seguimiento cercano para comprender mejor sus necesidades y responder con mayor claridad y confianza.",
      },
      {
        id: "benefit-card-2",
        number: "02",
        title: "Visión estratégica",
        description:
          "Trabajamos con una perspectiva que considera funcionalidad, crecimiento, orden y valor a futuro en cada decisión.",
      },
      {
        id: "benefit-card-3",
        number: "03",
        title: "Respaldo profesional",
        description:
          "Integramos experiencia, capacidad operativa y acompañamiento para que cada etapa del proyecto tenga una base sólida.",
      },
      {
        id: "benefit-card-4",
        number: "04",
        title: "Compromiso con resultados",
        description:
          "Nuestro enfoque está en entregar soluciones funcionales, bien orientadas y alineadas a los objetivos de cada cliente.",
      },
    ],
  },
  finalCta: {
    topBadge: "EXPERIENCIA PREMIUM EN DESARROLLO INMOBILIARIO",
    titleWhite: "DONDE LAS IDEAS",
    titleGold: "CONSTRUYEN REALIDAD",
    description:
      "En ANRO convertimos tu visión en proyectos sólidos, funcionales y con respaldo profesional. Una conversación puede ser el inicio de algo extraordinario.",
    features: [
      {
        id: "feature-1",
        number: "01",
        title: "Arquitectura de Autor",
        description:
          "Diseños exclusivos que fusionan estética, funcionalidad y sostenibilidad para crear espacios únicos.",
      },
      {
        id: "feature-2",
        number: "02",
        title: "Construcción de Alta Gama",
        description:
          "Materiales premium y acabados excepcionales que garantizan durabilidad y distinción en cada detalle.",
      },
      {
        id: "feature-3",
        number: "03",
        title: "Asesoría Integral",
        description:
          "Acompañamiento personalizado desde la conceptualización hasta la entrega final de tu proyecto.",
      },
    ],
    contactBadge: "Contacto Exclusivo",
    contactTitle: "Solicita una asesoría personalizada",
    image: "/fraccionamiento/carrusel2.jpg",
    imageBadge: "Inicia tu proyecto",
    imageTitle: "HABLEMOS DE TU PRÓXIMA OBRA MAESTRA",
    imageDescription:
      "Cada gran proyecto comienza con una conversación. Descubre cómo podemos hacer realidad tu visión.",
    submitText: "Enviar solicitud",
    privacyText: "*Tu privacidad es importante. No compartiremos tus datos.",
    formFields: [
      { id: "form-1", placeholder: "Nombre completo", type: "text" },
      { id: "form-2", placeholder: "Correo electrónico", type: "email" },
      { id: "form-3", placeholder: "Teléfono", type: "tel" },
      { id: "form-4", placeholder: "Tipo de proyecto", type: "select" },
    ],
  },
  updatedAt: new Date().toISOString(),
};

function formatDate(date: Date) {
  return date.toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

async function fetchServicesContentFromApi(
  endpoint = "/api/admin/servicios"
): Promise<ServicesContentConfig> {
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No fue posible cargar Servicios desde la API.");
  }

  return (await response.json()) as ServicesContentConfig;
}

async function saveServicesContentToApi(
  content: ServicesContentConfig,
  endpoint = "/api/admin/servicios"
): Promise<ServicesContentConfig> {
  const payload = {
    ...content,
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No fue posible guardar Servicios en la API.");
  }

  return (await response.json()) as ServicesContentConfig;
}

async function persistServicesContent(
  content: ServicesContentConfig
): Promise<ServicesContentConfig> {
  return saveServicesContentToApi(content);
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[120px] rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-3 text-sm font-medium text-[#2d3b52]">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full border transition ${
          checked ? "border-[#d4a62a] bg-[#d4a62a]" : "border-[#d7c9b3] bg-white"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      {label}
    </label>
  );
}

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#ece3d6] bg-white/80 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
        {title}
      </p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function InlineEditorShell({
  badge,
  title,
  description,
  editLabel,
  idleMessage,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  preview,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  editLabel: string;
  idleMessage: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  preview: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-[#e0d8cb] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className="border-b border-[#ece3d6] px-6 py-6 md:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#ecd9aa] bg-[#fff7e6] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a3771d]">
              {badge}
            </span>

            <h2 className="mt-4 text-2xl font-semibold text-[#132035] md:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              {description}
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
            >
              <FilePenLine className="h-4 w-4" />
              {editLabel}
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6 md:px-7 md:py-7">
        <div className="overflow-hidden rounded-[28px] border border-[#e8dcc8] bg-[#fcf8f1] p-3 md:p-4">
          {preview}
        </div>

        {isEditing ? (
          <div className="mt-6 border-t border-[#ece3d6] pt-6">
            {children}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#ece3d6] pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-[#ddd1bc] bg-white px-5 py-3 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] border border-[#ece3d6] bg-[#fffaf4] p-5">
            <p className="text-sm font-semibold text-[#132035]">Vista de edición preparada</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{idleMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}

interface CloudinaryUploadResult {
  public_id: string;
  url: string;
  secure_url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

async function getCloudinarySignature() {
  const response = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder: "anro/servicios" }),
  });

  if (!response.ok) {
    throw new Error("No se pudo generar la firma de Cloudinary.");
  }

  return (await response.json()) as {
    timestamp: number;
    folder: string;
    signature: string;
    apiKey: string;
    cloudName: string;
  };
}

async function uploadImageToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const signatureData = await getCloudinarySignature();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", String(signatureData.timestamp));
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("No se pudo subir la imagen a Cloudinary.");
  }

  return (await response.json()) as CloudinaryUploadResult;
}

async function registerMediaAsset({
  sectionKey,
  upload,
}: {
  sectionKey: string;
  upload: CloudinaryUploadResult;
}) {
  await fetch("/api/admin/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageKey: "servicios",
      sectionKey,
      publicId: upload.public_id,
      url: upload.url,
      secureUrl: upload.secure_url,
      format: upload.format,
      width: upload.width,
      height: upload.height,
      bytes: upload.bytes,
    }),
  });
}

async function handleImageFile(
  event: ChangeEvent<HTMLInputElement>,
  sectionKey: string,
  onReady: (url: string) => void | Promise<void>,
  onUploadingChange: (uploading: boolean) => void
) {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    onUploadingChange(true);
    const upload = await uploadImageToCloudinary(file);
    await registerMediaAsset({ sectionKey, upload });
    await onReady(upload.secure_url || upload.url);
  } catch (error) {
    console.error("No fue posible subir/registrar la imagen.", error);
    alert("No fue posible subir la imagen en este momento.");
  } finally {
    onUploadingChange(false);
    event.target.value = "";
  }
}

function ImageUploader({
  label,
  image,
  onChange,
  sectionKey,
  heightClass = "h-44",
}: {
  label: string;
  image: string;
  onChange: (value: string) => void | Promise<void>;
  sectionKey: string;
  heightClass?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="space-y-4 rounded-[24px] border border-[#e7dcc9] bg-[linear-gradient(180deg,#fffdfa_0%,#f8f2e8_100%)] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#2d3b52]">{label}</p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[#d9ccb6] bg-white px-4 py-2.5 text-sm font-semibold text-[#314058] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff8ed]">
          <Upload className="h-4 w-4" />
          {isUploading ? "Subiendo..." : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={(event) => handleImageFile(event, sectionKey, onChange, setIsUploading)}
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Field label="Ruta o URL de imagen" value={image} onChange={onChange} />

        <div className="overflow-hidden rounded-2xl border border-[#eadfcd] bg-[#faf7f1] p-2.5">
          {image ? (
            <img src={image} alt={label} className={`${heightClass} w-full rounded-lg object-cover`} />
          ) : (
            <div
              className={`${heightClass} flex items-center justify-center rounded-lg bg-[#f3ece1] text-sm text-slate-500`}
            >
              Sin imagen
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ServicesPreview({
  section,
  content,
}: {
  section:
    | "hero"
    | "detailed"
    | "work"
    | "specialties"
    | "visual"
    | "benefits"
    | "cta";
  content:
    | HeroContent
    | ServicesDetailedContent
    | WorkProcessContent
    | SpecialtiesContent
    | VisualSupportContent
    | BenefitsContent
    | FinalCtaContent;
}) {
  if (section === "hero") {
    const hero = content as HeroContent;

    return (
      <section className="relative overflow-hidden rounded-[32px] border border-[#d8cdb8] bg-[#151515] text-white">
        <img
          src={hero.backgroundImage}
          alt={hero.titleWhite}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,13,0.78)_0%,rgba(18,15,13,0.58)_38%,rgba(18,15,13,0.18)_68%,rgba(18,15,13,0.10)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

        <div className="relative z-10 grid gap-6 p-6 xl:grid-cols-[1fr_0.48fr]">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              {hero.badge}
            </span>

            <h3 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
              {hero.titleWhite}
              <span className="block text-[#d4a62a]">{hero.titleGold}</span>
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/85">
              {hero.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#d4a62a] px-6 py-3 text-sm font-bold text-[#1f1a17]">
                {hero.primaryButtonText}
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white">
                {hero.secondaryButtonText}
              </span>
            </div>
          </div>

          <div className="self-end">
            <div className="rounded-[28px] border border-white/15 bg-white/12 p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0d48a]">
                {hero.floatingBadge}
              </p>

              <h4 className="mt-3 text-2xl font-bold leading-tight text-white">
                {hero.floatingTitle}
              </h4>

              <div className="mt-5 grid gap-3">
                {hero.floatingCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-1 text-sm text-white/75">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section === "detailed") {
    const detailed = content as ServicesDetailedContent;
    const firstActive = detailed.services.find((service) => service.active) ?? detailed.services[0];

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[#fffdf9] p-6">
        <div className="mx-auto max-w-[1000px] text-center">
          <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a87911]">
            {detailed.badge}
          </span>

          <h3 className="mt-5 text-3xl font-black leading-tight text-[#1f1a17]">
            {detailed.title}
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#665d57]">
            {detailed.description}
          </p>
        </div>

        {firstActive ? (
          <article className="mt-8 overflow-hidden rounded-[30px] border border-black/10 bg-[#f8f4ee] shadow-sm">
            <div className="grid items-stretch lg:grid-cols-2">
              <div className="relative min-h-[320px]">
                <img
                  src={firstActive.image}
                  alt={firstActive.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#1f1a17]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {firstActive.label}
                </div>
              </div>

              <div className="flex flex-col justify-center px-6 py-8">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a87911]">
                  {firstActive.eyebrow}
                </p>
                <h4 className="mt-3 text-3xl font-bold leading-tight text-[#1f1a17]">
                  {firstActive.title}
                </h4>
                <p className="mt-4 text-lg font-medium leading-7 text-[#3e372f]">
                  {firstActive.summary}
                </p>
                <p className="mt-5 text-base leading-8 text-[#675f59]">
                  {firstActive.description}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {firstActive.boxes.map((box) => (
                    <div key={box.id} className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                        {box.title}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                        {box.items.map((item) => (
                          <li key={item.id}>{item.text}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-[#d4a62a]/20 bg-[#fffaf0] px-5 py-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                    Ideal para
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#5f5650]">{firstActive.idealFor}</p>
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </section>
    );
  }

  if (section === "work") {
    const work = content as WorkProcessContent;

    return (
      <section className="rounded-[32px] bg-[#1f1a17] p-6 text-white">
        <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a]">
              {work.badge}
            </span>

            <h3 className="mt-5 text-3xl font-black leading-tight">{work.title}</h3>

            <p className="mt-5 text-base leading-8 text-white/75">{work.description}</p>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0d48a]">
                {work.focusTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">{work.focusDescription}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {work.steps.map((step) => (
              <article
                key={step.id}
                className={`rounded-[28px] border border-white/10 bg-white/8 p-5 ${
                  step.wide ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                  {step.number}
                </div>
                <h4 className="mt-5 text-2xl font-bold text-white">{step.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/75">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section === "specialties") {
    const specialties = content as SpecialtiesContent;

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[#fffdf9] p-6">
        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a87911]">
              {specialties.badge}
            </span>

            <h3 className="mt-5 text-3xl font-black leading-tight text-[#1f1a17]">
              {specialties.title}
            </h3>

            <p className="mt-4 text-base leading-8 text-[#665d57]">{specialties.description}</p>

            <article className="relative mt-6 overflow-hidden rounded-[30px] border border-black/10 bg-[#1f1a17] p-6 text-white shadow-sm">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a]">
                {specialties.featuredBadge}
              </span>

              <h4 className="mt-5 text-3xl font-bold leading-tight">{specialties.featuredTitle}</h4>

              <p className="mt-4 text-base leading-8 text-white/75">
                {specialties.featuredDescription}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    {specialties.featuredPointOneTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {specialties.featuredPointOneText}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    {specialties.featuredPointTwoTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {specialties.featuredPointTwoText}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f0d48a]">
                  {specialties.featuredFooterTitle}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/75">
                  {specialties.featuredFooterText}
                </p>
              </div>
            </article>
          </div>

          <div className="grid gap-4">
            {specialties.cards.map((card, index) => (
              <article
                key={card.id}
                className="rounded-[28px] border border-black/10 bg-[#f8f4ee] p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
                      index % 2 === 0
                        ? "bg-[#d4a62a] text-[#1f1a17]"
                        : "bg-[#1f1a17] text-white"
                    }`}
                  >
                    {card.number}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-[#1f1a17]">{card.title}</h4>
                    <p className="mt-3 text-base leading-7 text-[#675f59]">{card.description}</p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-sm font-semibold text-[#1f1a17]">{card.strengthTitle}</p>
                        <p className="mt-1 text-sm leading-6 text-[#675f59]">{card.strengthText}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-sm font-semibold text-[#1f1a17]">{card.valueTitle}</p>
                        <p className="mt-1 text-sm leading-6 text-[#675f59]">{card.valueText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section === "visual") {
    const visual = content as VisualSupportContent;
    const featured = visual.images.find((image) => image.featured) ?? visual.images[0];
    const others = visual.images.filter((image) => image.id !== featured?.id);

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[#fffdf9] p-6">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a87911]">
              {visual.badge}
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight text-[#1f1a17]">
              {visual.title}
            </h3>
          </div>

          <div>
            <p className="text-base leading-7 text-[#665d57]">{visual.description}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {featured ? (
            <article className="group relative overflow-hidden rounded-[30px] lg:col-span-7 lg:row-span-2">
              <img src={featured.image} alt={featured.title} className="min-h-[420px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                {featured.badge ? (
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a]">
                    {featured.badge}
                  </span>
                ) : null}

                <h4 className="mt-4 max-w-[620px] text-2xl font-bold leading-tight text-white md:text-4xl">
                  {featured.title}
                </h4>

                <p className="mt-3 max-w-[620px] text-sm leading-7 text-white/80 md:text-base">
                  {featured.description}
                </p>
              </div>
            </article>
          ) : null}

          {others.map((image) => (
            <article
              key={image.id}
              className="group relative overflow-hidden rounded-[28px] lg:col-span-5"
            >
              <img src={image.image} alt={image.title} className="min-h-[250px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h4 className="text-xl font-bold text-white md:text-2xl">{image.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/80">{image.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {visual.bottomCards.map((card) => (
            <div
              key={card.id}
              className="rounded-[24px] border border-black/10 bg-[#f8f4ee] px-5 py-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#665d57]">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section === "benefits") {
    const benefits = content as BenefitsContent;

    return (
      <section className="rounded-[32px] border border-[#1f1a17] bg-[#1f1a17] p-6 text-white">
        <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a]">
                {benefits.badge}
              </span>

              <h3 className="mt-4 text-3xl font-black leading-tight">{benefits.title}</h3>

              <p className="mt-4 text-base leading-7 text-white/75">{benefits.description}</p>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0d48a]">
                {benefits.focusTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">{benefits.focusDescription}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.cards.map((card) => (
              <article
                key={card.id}
                className="rounded-[28px] border border-white/10 bg-white/8 p-5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                  {card.number}
                </div>
                <h4 className="mt-4 text-2xl font-bold text-white">{card.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/75">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const cta = content as FinalCtaContent;

  return (
    <section className="rounded-[32px] bg-[#faf7f2] p-6">
      <div className="mb-8 flex justify-center">
        <span className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[#7b5d2e] shadow-sm">
          {cta.topBadge}
        </span>
      </div>

      <div className="text-center">
        <h3 className="text-4xl font-black leading-tight text-[#2d241f] md:text-5xl">
          {cta.titleWhite}
          <span className="block text-[#d4a62a]">{cta.titleGold}</span>
        </h3>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-[#6b5849]">
          {cta.description}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cta.features.map((feature) => (
          <div
            key={feature.id}
            className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
          >
            <span className="font-serif text-6xl font-bold text-[#d4a62a]/10">
              {feature.number}
            </span>

            <h4 className="mt-4 text-2xl font-bold text-[#2d241f]">{feature.title}</h4>
            <p className="mt-4 leading-relaxed text-[#6b5849]">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid overflow-hidden rounded-[40px] bg-[#2d241f] shadow-2xl lg:grid-cols-2">
        <div className="relative min-h-[320px]">
          <img src={cta.image} alt={cta.imageTitle} className="h-full w-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d241f] via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 p-8">
            <div className="max-w-md">
              <span className="inline-block rounded-full bg-[#d4a62a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2d241f]">
                {cta.imageBadge}
              </span>

              <h4 className="mt-6 text-3xl font-bold text-white md:text-4xl">
                {cta.imageTitle}
              </h4>

              <p className="mt-4 leading-relaxed text-white/80">{cta.imageDescription}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-md">
            <h4 className="text-lg font-medium uppercase tracking-[0.2em] text-[#d4a62a]">
              {cta.contactBadge}
            </h4>

            <p className="mt-2 text-2xl font-bold text-white">{cta.contactTitle}</p>

            <div className="mt-8 space-y-6">
              {cta.formFields.map((field) => (
                <div key={field.id}>
                  <div className="w-full border-b border-white/20 px-4 py-3 text-white/50">
                    {field.placeholder}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="w-full rounded-full bg-[#d4a62a] px-8 py-4 font-bold text-[#2d241f]"
              >
                {cta.submitText}
              </button>

              <p className="text-center text-xs text-white/50">{cta.privacyText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminServiciosPage() {
  const [content, setContent] = useState<ServicesContentConfig>(DEFAULT_SERVICES_CONTENT);
  const [lastUpdated, setLastUpdated] = useState<Date>(
    DEFAULT_SERVICES_CONTENT.updatedAt
      ? new Date(DEFAULT_SERVICES_CONTENT.updatedAt)
      : new Date()
  );

  const [isHeroEditing, setIsHeroEditing] = useState(false);
  const [heroDraft, setHeroDraft] = useState<HeroContent | null>(null);

  const [isDetailedEditing, setIsDetailedEditing] = useState(false);
  const [detailedDraft, setDetailedDraft] = useState<ServicesDetailedContent | null>(null);

  const [isWorkEditing, setIsWorkEditing] = useState(false);
  const [workDraft, setWorkDraft] = useState<WorkProcessContent | null>(null);

  const [isSpecialtiesEditing, setIsSpecialtiesEditing] = useState(false);
  const [specialtiesDraft, setSpecialtiesDraft] = useState<SpecialtiesContent | null>(null);

  const [isVisualEditing, setIsVisualEditing] = useState(false);
  const [visualDraft, setVisualDraft] = useState<VisualSupportContent | null>(null);

  const [isBenefitsEditing, setIsBenefitsEditing] = useState(false);
  const [benefitsDraft, setBenefitsDraft] = useState<BenefitsContent | null>(null);

  const [isCtaEditing, setIsCtaEditing] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [ctaDraft, setCtaDraft] = useState<FinalCtaContent | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const apiContent = await fetchServicesContentFromApi();
        if (!mounted) return;
        setContent(apiContent);
        setLastUpdated(new Date(apiContent.updatedAt));
      } catch (error) {
        console.error("No fue posible cargar Servicios desde API.", error);
      }
    };

    void loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  async function applyAndPersist(nextContent: ServicesContentConfig) {
    setContent(nextContent);
    setSaveFeedback(null);

    try {
      const saved = await persistServicesContent(nextContent);
      setContent(saved);
      setLastUpdated(new Date(saved.updatedAt));
      setSaveFeedback({ type: "success", text: "Cambios guardados correctamente" });
    } catch {
      setSaveFeedback({ type: "error", text: "No fue posible guardar los cambios" });
      throw new Error("No fue posible guardar los cambios");
    }
  }

  const overviewCards = [
    {
      label: "Secciones del panel",
      value: "7",
      hint: "Hero, servicios, proceso, especialidades, respaldo visual, beneficios y CTA.",
    },
    {
      label: "Diseño alineado",
      value: "Sí",
      hint: "Mantiene la misma línea que Home y Desarrollo.",
    },
    {
      label: "Guardado actual",
      value: "API (Neon)",
      hint: "Lectura y escritura exclusivas por API con persistencia en Neon.",
    },
    {
      label: "Última actualización",
      value: formatDate(lastUpdated),
      hint: "Fecha del último contenido guardado.",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          Panel alineado con Servicios público
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Administración de Servicios
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Aquí puedes administrar la ventana pública de Servicios con el mismo estilo,
          estructura y experiencia visual que ya venimos trabajando en Home y Desarrollo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{card.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.hint}</p>
          </article>
        ))}
      </section>


      {saveFeedback ? (
        <div className={`rounded-2xl px-4 py-3 text-sm font-medium ${
          saveFeedback.type === "success"
            ? "border border-[#d8e4d6] bg-[#f3faf1] text-[#234128]"
            : "border border-[#f1d1d1] bg-[#fff5f5] text-[#7a1f1f]"
        }`}>
          {saveFeedback.text}
        </div>
      ) : null}
      <InlineEditorShell
        badge="Bloque superior"
        title="Hero interno de servicios"
        description="Edita fondo, textos principales, botones y la tarjeta flotante del hero."
        editLabel="Editar Hero"
        idleMessage="Este bloque ya quedó preparado con el mismo patrón visual del admin de Home."
        isEditing={isHeroEditing}
        onEdit={() => {
          setHeroDraft(structuredClone(content.hero));
          setIsHeroEditing(true);
        }}
        onCancel={() => {
          setHeroDraft(structuredClone(content.hero));
          setIsHeroEditing(false);
        }}
        onSave={async () => {
          if (!heroDraft) return;
          await applyAndPersist({
            ...content,
            hero: structuredClone(heroDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsHeroEditing(false);
        }}
        preview={<ServicesPreview section="hero" content={heroDraft ?? content.hero} />}
      >
        {heroDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado principal">
              <Field
                label="Badge"
                value={heroDraft.badge}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={heroDraft.titleWhite}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, titleWhite: value } : c))}
              />
              <Field
                label="Título dorado"
                value={heroDraft.titleGold}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, titleGold: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={heroDraft.description}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Imagen principal">
              <ImageUploader
                label="Imagen del hero"
                image={heroDraft.backgroundImage}
                sectionKey="services-hero-background"
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, backgroundImage: value } : c))}
                heightClass="h-56"
              />
            </SectionShell>

            <SectionShell title="Botones">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Texto botón 1"
                  value={heroDraft.primaryButtonText}
                  onChange={(value) => setHeroDraft((c) => (c ? { ...c, primaryButtonText: value } : c))}
                />
                <Field
                  label="Enlace botón 1"
                  value={heroDraft.primaryButtonLink}
                  onChange={(value) => setHeroDraft((c) => (c ? { ...c, primaryButtonLink: value } : c))}
                />
                <Field
                  label="Texto botón 2"
                  value={heroDraft.secondaryButtonText}
                  onChange={(value) => setHeroDraft((c) => (c ? { ...c, secondaryButtonText: value } : c))}
                />
                <Field
                  label="Enlace botón 2"
                  value={heroDraft.secondaryButtonLink}
                  onChange={(value) => setHeroDraft((c) => (c ? { ...c, secondaryButtonLink: value } : c))}
                />
              </div>
            </SectionShell>

            <SectionShell title="Tarjeta flotante">
              <Field
                label="Badge flotante"
                value={heroDraft.floatingBadge}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, floatingBadge: value } : c))}
              />
              <Field
                label="Título flotante"
                value={heroDraft.floatingTitle}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, floatingTitle: value } : c))}
              />

              {heroDraft.floatingCards.map((card, index) => (
                <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <Field
                    label="Título"
                    value={card.title}
                    onChange={(value) =>
                      setHeroDraft((c) => {
                        if (!c) return c;
                        const next = [...c.floatingCards];
                        next[index] = { ...next[index], title: value };
                        return { ...c, floatingCards: next };
                      })
                    }
                  />
                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={card.description}
                      onChange={(value) =>
                        setHeroDraft((c) => {
                          if (!c) return c;
                          const next = [...c.floatingCards];
                          next[index] = { ...next[index], description: value };
                          return { ...c, floatingCards: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Servicios principales"
        title="Nuestros servicios detallados"
        description="Edita el encabezado y las tarjetas largas de cada servicio."
        editLabel="Editar Servicios"
        idleMessage="Aquí ya te queda el módulo armado para manejar servicios como bloques visuales."
        isEditing={isDetailedEditing}
        onEdit={() => {
          setDetailedDraft(structuredClone(content.detailedServices));
          setIsDetailedEditing(true);
        }}
        onCancel={() => {
          setDetailedDraft(structuredClone(content.detailedServices));
          setIsDetailedEditing(false);
        }}
        onSave={async () => {
          if (!detailedDraft) return;
          await applyAndPersist({
            ...content,
            detailedServices: structuredClone(detailedDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsDetailedEditing(false);
        }}
        preview={<ServicesPreview section="detailed" content={detailedDraft ?? content.detailedServices} />}
      >
        {detailedDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado de la sección">
              <Field
                label="Badge"
                value={detailedDraft.badge}
                onChange={(value) => setDetailedDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título"
                value={detailedDraft.title}
                onChange={(value) => setDetailedDraft((c) => (c ? { ...c, title: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={detailedDraft.description}
                onChange={(value) => setDetailedDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Bloques de servicio">
              {detailedDraft.services.map((service, index) => (
                <div key={service.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Etiqueta"
                      value={service.label}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], label: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Activo"
                      checked={service.active}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], active: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                    <Field
                      label="Eyebrow"
                      value={service.eyebrow}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], eyebrow: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={service.title}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], title: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Invertido"
                      checked={service.reverse}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], reverse: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <Field
                      label="Resumen"
                      value={service.summary}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], summary: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={service.description}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], description: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Ideal para"
                      value={service.idealFor}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], idealFor: value };
                          return { ...c, services: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <ImageUploader
                      label="Imagen del servicio"
                      image={service.image}
                      sectionKey={`services-detailed-image-${service.id}`}
                      onChange={(value) =>
                        setDetailedDraft((c) => {
                          if (!c) return c;
                          const next = [...c.services];
                          next[index] = { ...next[index], image: value };
                          return { ...c, services: next };
                        })
                      }
                      heightClass="h-48"
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Proceso de trabajo"
        title="Cómo trabajamos"
        description="Edita el bloque del proceso, su texto principal y los pasos del flujo."
        editLabel="Editar Proceso"
        idleMessage="Esta parte ya queda con la misma lógica visual del panel que llevas en Home."
        isEditing={isWorkEditing}
        onEdit={() => {
          setWorkDraft(structuredClone(content.workProcess));
          setIsWorkEditing(true);
        }}
        onCancel={() => {
          setWorkDraft(structuredClone(content.workProcess));
          setIsWorkEditing(false);
        }}
        onSave={async () => {
          if (!workDraft) return;
          await applyAndPersist({
            ...content,
            workProcess: structuredClone(workDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsWorkEditing(false);
        }}
        preview={<ServicesPreview section="work" content={workDraft ?? content.workProcess} />}
      >
        {workDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado del bloque">
              <Field
                label="Badge"
                value={workDraft.badge}
                onChange={(value) => setWorkDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título"
                value={workDraft.title}
                onChange={(value) => setWorkDraft((c) => (c ? { ...c, title: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={workDraft.description}
                onChange={(value) => setWorkDraft((c) => (c ? { ...c, description: value } : c))}
              />
              <Field
                label="Título enfoque"
                value={workDraft.focusTitle}
                onChange={(value) => setWorkDraft((c) => (c ? { ...c, focusTitle: value } : c))}
              />
              <TextAreaField
                label="Descripción enfoque"
                value={workDraft.focusDescription}
                onChange={(value) => setWorkDraft((c) => (c ? { ...c, focusDescription: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Pasos">
              {workDraft.steps.map((step, index) => (
                <div key={step.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={step.number}
                      onChange={(value) =>
                        setWorkDraft((c) => {
                          if (!c) return c;
                          const next = [...c.steps];
                          next[index] = { ...next[index], number: value };
                          return { ...c, steps: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Tarjeta ancha"
                      checked={Boolean(step.wide)}
                      onChange={(value) =>
                        setWorkDraft((c) => {
                          if (!c) return c;
                          const next = [...c.steps];
                          next[index] = { ...next[index], wide: value };
                          return { ...c, steps: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <Field
                      label="Título"
                      value={step.title}
                      onChange={(value) =>
                        setWorkDraft((c) => {
                          if (!c) return c;
                          const next = [...c.steps];
                          next[index] = { ...next[index], title: value };
                          return { ...c, steps: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={step.description}
                      onChange={(value) =>
                        setWorkDraft((c) => {
                          if (!c) return c;
                          const next = [...c.steps];
                          next[index] = { ...next[index], description: value };
                          return { ...c, steps: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Valor diferencial"
        title="Especialidades / servicios destacados"
        description="Edita el bloque destacado principal y las tarjetas laterales."
        editLabel="Editar Especialidades"
        idleMessage="Este bloque ya queda alineado al mismo lenguaje visual premium del panel."
        isEditing={isSpecialtiesEditing}
        onEdit={() => {
          setSpecialtiesDraft(structuredClone(content.specialties));
          setIsSpecialtiesEditing(true);
        }}
        onCancel={() => {
          setSpecialtiesDraft(structuredClone(content.specialties));
          setIsSpecialtiesEditing(false);
        }}
        onSave={async () => {
          if (!specialtiesDraft) return;
          await applyAndPersist({
            ...content,
            specialties: structuredClone(specialtiesDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsSpecialtiesEditing(false);
        }}
        preview={<ServicesPreview section="specialties" content={specialtiesDraft ?? content.specialties} />}
      >
        {specialtiesDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado general">
              <Field
                label="Badge"
                value={specialtiesDraft.badge}
                onChange={(value) => setSpecialtiesDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título"
                value={specialtiesDraft.title}
                onChange={(value) => setSpecialtiesDraft((c) => (c ? { ...c, title: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={specialtiesDraft.description}
                onChange={(value) => setSpecialtiesDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Tarjeta principal">
              <Field
                label="Badge principal"
                value={specialtiesDraft.featuredBadge}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredBadge: value } : c))
                }
              />
              <Field
                label="Título principal"
                value={specialtiesDraft.featuredTitle}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredTitle: value } : c))
                }
              />
              <TextAreaField
                label="Descripción principal"
                value={specialtiesDraft.featuredDescription}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredDescription: value } : c))
                }
              />
              <Field
                label="Punto 1 - título"
                value={specialtiesDraft.featuredPointOneTitle}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredPointOneTitle: value } : c))
                }
              />
              <Field
                label="Punto 1 - texto"
                value={specialtiesDraft.featuredPointOneText}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredPointOneText: value } : c))
                }
              />
              <Field
                label="Punto 2 - título"
                value={specialtiesDraft.featuredPointTwoTitle}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredPointTwoTitle: value } : c))
                }
              />
              <Field
                label="Punto 2 - texto"
                value={specialtiesDraft.featuredPointTwoText}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredPointTwoText: value } : c))
                }
              />
              <Field
                label="Footer - título"
                value={specialtiesDraft.featuredFooterTitle}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredFooterTitle: value } : c))
                }
              />
              <TextAreaField
                label="Footer - texto"
                value={specialtiesDraft.featuredFooterText}
                onChange={(value) =>
                  setSpecialtiesDraft((c) => (c ? { ...c, featuredFooterText: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Tarjetas laterales">
              {specialtiesDraft.cards.map((card, index) => (
                <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={card.number}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], number: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={card.title}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], title: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={card.description}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], description: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field
                      label="Fortaleza - título"
                      value={card.strengthTitle}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], strengthTitle: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                    <Field
                      label="Fortaleza - texto"
                      value={card.strengthText}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], strengthText: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                    <Field
                      label="Valor - título"
                      value={card.valueTitle}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], valueTitle: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                    <Field
                      label="Valor - texto"
                      value={card.valueText}
                      onChange={(value) =>
                        setSpecialtiesDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], valueText: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Respaldo visual"
        title="Proyectos reales / respaldo visual"
        description="Edita el encabezado, las imágenes del bloque y las tarjetas inferiores."
        editLabel="Editar Respaldo"
        idleMessage="La galería y el respaldo visual ya quedan en la misma lógica de edición por bloques."
        isEditing={isVisualEditing}
        onEdit={() => {
          setVisualDraft(structuredClone(content.visualSupport));
          setIsVisualEditing(true);
        }}
        onCancel={() => {
          setVisualDraft(structuredClone(content.visualSupport));
          setIsVisualEditing(false);
        }}
        onSave={async () => {
          if (!visualDraft) return;
          await applyAndPersist({
            ...content,
            visualSupport: structuredClone(visualDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsVisualEditing(false);
        }}
        preview={<ServicesPreview section="visual" content={visualDraft ?? content.visualSupport} />}
      >
        {visualDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={visualDraft.badge}
                onChange={(value) => setVisualDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título"
                value={visualDraft.title}
                onChange={(value) => setVisualDraft((c) => (c ? { ...c, title: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={visualDraft.description}
                onChange={(value) => setVisualDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Imágenes">
              {visualDraft.images.map((image, index) => (
                <div key={image.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <Field
                    label="Título"
                    value={image.title}
                    onChange={(value) =>
                      setVisualDraft((c) => {
                        if (!c) return c;
                        const next = [...c.images];
                        next[index] = { ...next[index], title: value };
                        return { ...c, images: next };
                      })
                    }
                  />
                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={image.description}
                      onChange={(value) =>
                        setVisualDraft((c) => {
                          if (!c) return c;
                          const next = [...c.images];
                          next[index] = { ...next[index], description: value };
                          return { ...c, images: next };
                        })
                      }
                    />
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field
                      label="Badge opcional"
                      value={image.badge ?? ""}
                      onChange={(value) =>
                        setVisualDraft((c) => {
                          if (!c) return c;
                          const next = [...c.images];
                          next[index] = { ...next[index], badge: value };
                          return { ...c, images: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Imagen principal"
                      checked={Boolean(image.featured)}
                      onChange={(value) =>
                        setVisualDraft((c) => {
                          if (!c) return c;
                          const next = c.images.map((entry, entryIndex) => ({
                            ...entry,
                            featured: entryIndex === index ? value : value ? false : entry.featured,
                          }));
                          return { ...c, images: next };
                        })
                      }
                    />
                  </div>
                  <div className="mt-4">
                    <ImageUploader
                      label="Imagen"
                      image={image.image}
                      sectionKey={`services-visual-${image.id}`}
                      onChange={(value) =>
                        setVisualDraft((c) => {
                          if (!c) return c;
                          const next = [...c.images];
                          next[index] = { ...next[index], image: value };
                          return { ...c, images: next };
                        })
                      }
                      heightClass="h-48"
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Confianza y respaldo"
        title="Beneficios de trabajar con ANRO"
        description="Edita el mensaje principal, la tarjeta de enfoque y los beneficios destacados."
        editLabel="Editar Beneficios"
        idleMessage="Este bloque ya queda con la misma organización visual y experiencia que los demás."
        isEditing={isBenefitsEditing}
        onEdit={() => {
          setBenefitsDraft(structuredClone(content.benefits));
          setIsBenefitsEditing(true);
        }}
        onCancel={() => {
          setBenefitsDraft(structuredClone(content.benefits));
          setIsBenefitsEditing(false);
        }}
        onSave={async () => {
          if (!benefitsDraft) return;
          await applyAndPersist({
            ...content,
            benefits: structuredClone(benefitsDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsBenefitsEditing(false);
        }}
        preview={<ServicesPreview section="benefits" content={benefitsDraft ?? content.benefits} />}
      >
        {benefitsDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={benefitsDraft.badge}
                onChange={(value) => setBenefitsDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título"
                value={benefitsDraft.title}
                onChange={(value) => setBenefitsDraft((c) => (c ? { ...c, title: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={benefitsDraft.description}
                onChange={(value) => setBenefitsDraft((c) => (c ? { ...c, description: value } : c))}
              />
              <Field
                label="Título del enfoque"
                value={benefitsDraft.focusTitle}
                onChange={(value) => setBenefitsDraft((c) => (c ? { ...c, focusTitle: value } : c))}
              />
              <TextAreaField
                label="Descripción del enfoque"
                value={benefitsDraft.focusDescription}
                onChange={(value) =>
                  setBenefitsDraft((c) => (c ? { ...c, focusDescription: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Tarjetas de beneficios">
              {benefitsDraft.cards.map((card, index) => (
                <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={card.number}
                      onChange={(value) =>
                        setBenefitsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], number: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={card.title}
                      onChange={(value) =>
                        setBenefitsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], title: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={card.description}
                      onChange={(value) =>
                        setBenefitsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.cards];
                          next[index] = { ...next[index], description: value };
                          return { ...c, cards: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Cierre premium"
        title="CTA final"
        description="Edita el cierre premium, los highlights, la imagen y el formulario visual."
        editLabel="Editar CTA"
        idleMessage="Este cierre ya queda unificado con el mismo patrón visual premium del resto del admin."
        isEditing={isCtaEditing}
        onEdit={() => {
          setCtaDraft(structuredClone(content.finalCta));
          setIsCtaEditing(true);
        }}
        onCancel={() => {
          setCtaDraft(structuredClone(content.finalCta));
          setIsCtaEditing(false);
        }}
        onSave={async () => {
          if (!ctaDraft) return;
          await applyAndPersist({
            ...content,
            finalCta: structuredClone(ctaDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsCtaEditing(false);
        }}
        preview={<ServicesPreview section="cta" content={ctaDraft ?? content.finalCta} />}
      >
        {ctaDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado superior">
              <Field
                label="Badge superior"
                value={ctaDraft.topBadge}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, topBadge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={ctaDraft.titleWhite}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, titleWhite: value } : c))}
              />
              <Field
                label="Título dorado"
                value={ctaDraft.titleGold}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, titleGold: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={ctaDraft.description}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Highlights">
              {ctaDraft.features.map((feature, index) => (
                <div key={feature.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={feature.number}
                      onChange={(value) =>
                        setCtaDraft((c) => {
                          if (!c) return c;
                          const next = [...c.features];
                          next[index] = { ...next[index], number: value };
                          return { ...c, features: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={feature.title}
                      onChange={(value) =>
                        setCtaDraft((c) => {
                          if (!c) return c;
                          const next = [...c.features];
                          next[index] = { ...next[index], title: value };
                          return { ...c, features: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={feature.description}
                      onChange={(value) =>
                        setCtaDraft((c) => {
                          if (!c) return c;
                          const next = [...c.features];
                          next[index] = { ...next[index], description: value };
                          return { ...c, features: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>

            <SectionShell title="Bloque de contacto">
              <Field
                label="Badge contacto"
                value={ctaDraft.contactBadge}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, contactBadge: value } : c))}
              />
              <Field
                label="Título contacto"
                value={ctaDraft.contactTitle}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, contactTitle: value } : c))}
              />
              <Field
                label="Badge imagen"
                value={ctaDraft.imageBadge}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, imageBadge: value } : c))}
              />
              <Field
                label="Título imagen"
                value={ctaDraft.imageTitle}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, imageTitle: value } : c))}
              />
              <TextAreaField
                label="Descripción imagen"
                value={ctaDraft.imageDescription}
                onChange={(value) =>
                  setCtaDraft((c) => (c ? { ...c, imageDescription: value } : c))
                }
              />
              <ImageUploader
                label="Imagen del bloque"
                image={ctaDraft.image}
                sectionKey="services-cta-image"
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, image: value } : c))}
                heightClass="h-56"
              />
              <Field
                label="Texto del botón enviar"
                value={ctaDraft.submitText}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, submitText: value } : c))}
              />
              <Field
                label="Texto de privacidad"
                value={ctaDraft.privacyText}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, privacyText: value } : c))}
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <section className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 text-sm leading-7 text-slate-600">
        <p className="font-semibold text-[#142033]">Estado actual del módulo</p>
        <p className="mt-2">
          Este panel de Servicios ya quedó con la misma base visual del módulo Home y
          Desarrollo: hero superior, tarjetas de resumen, previews grandes, edición inline
          y guardado exclusivo por API conectado a Neon.
        </p>
      </section>
    </div>
  );
}