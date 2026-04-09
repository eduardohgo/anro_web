"use client";

import {
  CheckCircle2,
  FilePenLine,
  Images,
  LayoutPanelTop,
  MapPinned,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type SectionKey =
  | "hero"
  | "sobre"
  | "beneficios"
  | "etapas"
  | "compromiso"
  | "promociones"
  | "galeria"
  | "cta";

type TextItem = {
  id: string;
  text: string;
};

type HeroStat = {
  id: string;
  value: string;
  title: string;
  description: string;
  wide?: boolean;
};

type HeroContent = {
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

type SobreFact = {
  id: string;
  badge: string;
  value: string;
  title: string;
  description: string;
};

type SobreReason = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type SobreContent = {
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

type BenefitsContent = {
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

type Stage = {
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

type EtapasContent = {
  badge: string;
  title: string;
  description: string;
  stages: Stage[];
};

type CommitmentStat = {
  id: string;
  value: string;
  label: string;
};

type CommitmentImage = {
  id: string;
  image: string;
  title: string;
  visible: boolean;
};

type CommitmentContent = {
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

type PromotionItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

type PlusPoint = {
  id: string;
  title: string;
  text: string;
};

type PromotionsContent = {
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

type GalleryImage = {
  id: string;
  image: string;
  title: string;
  featured: boolean;
};

type GalleryContent = {
  badge: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

type CtaButton = {
  id: string;
  text: string;
  link: string;
  style: "whatsapp" | "primary";
};

type CtaContent = {
  title: string;
  buttons: CtaButton[];
};

type DesarrolloContentConfig = {
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
    badge: "Desarrollo residencial",
    title: "Fraccionamiento Daniel Andrade Fayad",
    description:
      "Un desarrollo pensado para ofrecer seguridad, orden, crecimiento y plusvalía, con infraestructura y servicios que fortalecen tu patrimonio.",
    backgroundImage: "/fraccionamiento/heroDesarrollo.jpg",
    primaryButtonText: "Solicitar información",
    primaryButtonLink: "/contacto",
    secondaryButtonText: "Agendar cita",
    secondaryButtonLink: "/contacto",
    stats: [
      {
        id: "hero-stat-1",
        value: "120",
        title: "Lotes disponibles",
        description: "10x20 m (200 m²)",
      },
      {
        id: "hero-stat-2",
        value: "Alta",
        title: "Plusvalía",
        description: "Inversión patrimonial",
      },
      {
        id: "hero-stat-3",
        value: "Promo",
        title: "Promociones disponibles",
        description: "Consulta contado y facilidades de pago.",
        wide: true,
      },
      {
        id: "hero-stat-4",
        value: "ANRO",
        title: "Atención personalizada",
        description: "Seguimiento cercano y acompañamiento.",
        wide: true,
      },
    ],
  },
  sobre: {
    badge: "Sobre el desarrollo",
    title:
      "Un proyecto residencial pensado para crecer con orden, seguridad y valor patrimonial",
    paragraph1:
      "Fraccionamiento Daniel Andrade Fayad es un desarrollo concebido para quienes buscan invertir con visión y construir en un entorno confiable. Su ubicación estratégica permite conectar con servicios, vialidades y zonas clave, manteniendo al mismo tiempo una atmósfera residencial, ordenada y tranquila.",
    paragraph2:
      "Cada lote ha sido planeado para ofrecer funcionalidad, comodidad y proyección a futuro, respaldado por infraestructura, acompañamiento profesional y una propuesta inmobiliaria enfocada en el crecimiento patrimonial de las familias e inversionistas.",
    image: "/fraccionamiento/sobre_desarrollo.jpg",
    highlightLabel: "Desarrollo ANRO",
    highlightTitle: "Patrimonio con visión a futuro",
    reasonsBadge: "Valor agregado",
    reasonsTitle: "Razones para elegir este desarrollo",
    reasonsDescription:
      "Un proyecto pensado para ofrecer orden, conectividad, crecimiento urbano y una oportunidad patrimonial sólida para familias e inversionistas.",
    facts: [
      {
        id: "sobre-fact-1",
        badge: "Medidas",
        value: "10x20",
        title: "Lotes de 200 m²",
        description:
          "Espacios ideales para desarrollar una vivienda cómoda, funcional y con excelente proyección.",
      },
      {
        id: "sobre-fact-2",
        badge: "Inversión",
        value: "+15%",
        title: "Proyección de plusvalía",
        description:
          "Una oportunidad patrimonial con enfoque de crecimiento y valor a mediano y largo plazo.",
      },
      {
        id: "sobre-fact-3",
        badge: "Concepto",
        value: "Residencial",
        title: "Entorno familiar",
        description:
          "Un concepto pensado para brindar tranquilidad, orden y un estilo de vida más seguro.",
      },
      {
        id: "sobre-fact-4",
        badge: "Infraestructura",
        value: "Moderno",
        title: "Infraestructura planeada",
        description:
          "Servicios e instalaciones proyectadas para ofrecer funcionalidad, imagen urbana y respaldo real.",
      },
    ],
    reasons: [
      {
        id: "sobre-reason-1",
        number: "01",
        title: "Ubicación estratégica",
        description:
          "Cercanía a vialidades, servicios y puntos clave para una vida práctica y una inversión inteligente.",
      },
      {
        id: "sobre-reason-2",
        number: "02",
        title: "Entorno funcional",
        description:
          "Un espacio residencial pensado para brindar tranquilidad, orden urbano y mejor calidad de vida.",
      },
      {
        id: "sobre-reason-3",
        number: "03",
        title: "Inversión con plusvalía",
        description:
          "Una oportunidad patrimonial respaldada por crecimiento, infraestructura y proyección de valor.",
      },
    ],
  },
  beneficios: {
    badge: "Beneficios y servicios",
    title: "Todo lo que necesitas para vivir e invertir con tranquilidad",
    subtitle:
      "Un desarrollo respaldado por hechos, avance visible y atención real",
    items: [
      { id: "benefit-1", text: "Agua potable" },
      { id: "benefit-2", text: "Drenaje sanitario" },
      { id: "benefit-3", text: "Energía subterránea" },
      { id: "benefit-4", text: "Caseta de vigilancia" },
      { id: "benefit-5", text: "Acceso controlado" },
      { id: "benefit-6", text: "Circuito cerrado" },
      { id: "benefit-7", text: "Calles pavimentadas" },
      { id: "benefit-8", text: "Alumbrado público" },
      { id: "benefit-9", text: "Drenaje pluvial" },
      { id: "benefit-10", text: "Zona comercial" },
      { id: "benefit-11", text: "Área social" },
    ],
    image: "/fraccionamiento/beneficios.jpg",
    cardBadge: "Infraestructura ANRO",
    cardTitle: "Servicios que elevan la calidad de vida y el valor patrimonial",
    cardDescription:
      "Cada elemento del desarrollo está planeado para brindar seguridad, orden urbano, funcionalidad y una mejor experiencia residencial.",
    tags: [
      { id: "benefit-tag-1", text: "Seguridad" },
      { id: "benefit-tag-2", text: "Infraestructura" },
      { id: "benefit-tag-3", text: "Valor patrimonial" },
    ],
  },
  etapas: {
    badge: "Etapas del desarrollo",
    title:
      "Conoce el avance y las oportunidades de cada etapa del proyecto",
    description:
      "Cada fase del desarrollo ha sido planeada para ofrecer crecimiento, orden urbano y oportunidades patrimoniales en distintos momentos del proyecto.",
    stages: [
      {
        id: "stage-1",
        stageLabel: "Etapa 01",
        status: "Entrega inmediata",
        title: "Primera etapa",
        description:
          "Consolidada, con lotes listos para construir, servicios al 100% y plusvalía en aumento. Una opción ideal para quienes buscan certeza, avance real y disponibilidad inmediata.",
        buttonText: "Ver más",
        buttonLink: "/desarrollo/etapa-1",
        image: "/fraccionamiento/primera_Etapa .jpg",
        active: true,
        tags: [
          { id: "stage-1-tag-1", text: "Servicios al 100%" },
          { id: "stage-1-tag-2", text: "Lotes disponibles" },
          { id: "stage-1-tag-3", text: "Plusvalía activa" },
        ],
      },
      {
        id: "stage-2",
        stageLabel: "Etapa 02",
        status: "Nueva oportunidad",
        title: "Segunda etapa y ampliación",
        description:
          "Expansión del desarrollo con nuevos lotes disponibles, vistas privilegiadas y una gran oportunidad de inversión para quienes buscan crecer junto con el proyecto.",
        buttonText: "Ver más",
        buttonLink: "/desarrollo/etapa-2",
        image: "/fraccionamiento/segundaEtapa.jpg",
        active: true,
        tags: [
          { id: "stage-2-tag-1", text: "Expansión del proyecto" },
          { id: "stage-2-tag-2", text: "Nuevos lotes" },
          { id: "stage-2-tag-3", text: "Inversión estratégica" },
        ],
      },
    ],
  },
  compromiso: {
    badge: "Compromiso y resultados",
    title:
      "Un desarrollo respaldado por hechos, avance visible y atención real",
    description:
      "En ANRO trabajamos con responsabilidad, atención personalizada y seguimiento constante para brindar confianza en cada etapa del proyecto. Nuestro compromiso se refleja en infraestructura visible, avance real y una relación cercana con cada cliente.",
    primaryButtonText: "Ver avances",
    primaryButtonLink: "/avances",
    secondaryButtonText: "Agendar cita",
    secondaryButtonLink: "/contacto",
    stats: [
      {
        id: "commit-stat-1",
        value: "100%",
        label: "Compromiso en seguimiento",
      },
      {
        id: "commit-stat-2",
        value: "Real",
        label: "Avance comprobable",
      },
      {
        id: "commit-stat-3",
        value: "Cercana",
        label: "Atención personalizada",
      },
    ],
    images: [
      {
        id: "commit-image-1",
        image: "/fraccionamiento/acceso.jpg",
        title: "Acceso",
        visible: true,
      },
      {
        id: "commit-image-2",
        image: "/fraccionamiento/calles.jpg",
        title: "Calles",
        visible: true,
      },
      {
        id: "commit-image-3",
        image: "/fraccionamiento/obra.jpg",
        title: "Obra",
        visible: true,
      },
      {
        id: "commit-image-4",
        image: "/fraccionamiento/atencion.jpg",
        title: "Atención",
        visible: true,
      },
    ],
    supportBadge: "Respaldo ANRO",
    supportTitle: "Compromiso que se refleja en cada avance del desarrollo",
    supportDescription:
      "Nuestro trabajo se traduce en infraestructura visible, seguimiento constante y una atención enfocada en brindar confianza real a cada cliente.",
    supportTags: [
      { id: "support-tag-1", text: "Seguimiento constante" },
      { id: "support-tag-2", text: "Atención cercana" },
      { id: "support-tag-3", text: "Avance visible" },
    ],
  },
  promociones: {
    badge: "Inversión inteligente",
    title:
      "Promociones exclusivas y una plusvalía que impulsa tu patrimonio",
    description:
      "En ANRO desarrollamos oportunidades que combinan ubicación estratégica, beneficios comerciales y visión de crecimiento. Esta etapa está pensada para brindarte facilidades de adquisición y un alto potencial de valorización a mediano y largo plazo.",
    promotions: [
      {
        id: "promo-1",
        label: "Promoción 01",
        title: "Precios de lanzamiento",
        description:
          "Accede a valores preferenciales durante la etapa inicial del desarrollo, obteniendo mejores condiciones de compra y mayor ventaja de inversión.",
      },
      {
        id: "promo-2",
        label: "Promoción 02",
        title: "Facilidades de pago",
        description:
          "Diseñamos esquemas flexibles para que el proceso de adquisición sea más accesible, ordenado y alineado con tus objetivos.",
      },
      {
        id: "promo-3",
        label: "Promoción 03",
        title: "Beneficios por etapa",
        description:
          "Aprovecha incentivos especiales según el avance del proyecto y el momento de apartar tu inversión dentro del desarrollo.",
      },
      {
        id: "promo-4",
        label: "Promoción 04",
        title: "Inversión con visión futura",
        description:
          "Una oportunidad ideal para quienes buscan resguardar capital en un proyecto con proyección de crecimiento urbano y alta demanda.",
      },
    ],
    plusBadge: "Plusvalía",
    plusTitle: "Un desarrollo diseñado para aumentar su valor con el tiempo",
    plusDescription:
      "La plusvalía de un proyecto depende de su ubicación, planeación, conectividad y proyección comercial. En ANRO reunimos estos factores para crear espacios con mayor capacidad de crecimiento y retorno.",
    plusPoints: [
      {
        id: "plus-1",
        title: "Ubicación estratégica",
        text: "Un punto clave para fortalecer la demanda y el valor del desarrollo en el futuro.",
      },
      {
        id: "plus-2",
        title: "Crecimiento sostenido",
        text: "La evolución del entorno y la consolidación del proyecto favorecen la valorización del patrimonio.",
      },
      {
        id: "plus-3",
        title: "Mayor proyección patrimonial",
        text: "Invertir desde etapas tempranas puede representar una ventaja importante para maximizar el valor de tu inversión.",
      },
    ],
    valueBadge: "Valor agregado",
    valueText:
      "Más que adquirir un espacio, inviertes en una oportunidad con visión, respaldo y proyección de crecimiento.",
  },
  galeria: {
    badge: "Galería",
    title: "Galería del desarrollo",
    description:
      "Explora visualmente los espacios, avances y detalles del desarrollo a través de una selección de imágenes que reflejan su identidad, infraestructura y proyección.",
    images: [
      {
        id: "gallery-1",
        image: "/fraccionamiento/galeria1.jpg",
        title: "Galería principal",
        featured: true,
      },
      {
        id: "gallery-2",
        image: "/fraccionamiento/galeria2.jpg",
        title: "Galería 2",
        featured: false,
      },
      {
        id: "gallery-3",
        image: "/fraccionamiento/galeria3.jpg",
        title: "Galería 3",
        featured: false,
      },
      {
        id: "gallery-4",
        image: "/fraccionamiento/galeria4.jpg",
        title: "Galería 4",
        featured: false,
      },
      {
        id: "gallery-5",
        image: "/fraccionamiento/galeria5.jpg",
        title: "Galería 5",
        featured: false,
      },
    ],
  },
  cta: {
    title: "Agenda tu cita y conoce más sobre el desarrollo",
    buttons: [
      {
        id: "cta-button-1",
        text: "WhatsApp",
        link: "https://wa.me/5217711974658",
        style: "whatsapp",
      },
      {
        id: "cta-button-2",
        text: "Agendar cita",
        link: "/contacto",
        style: "primary",
      },
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

async function fetchDesarrolloContentFromApi(
  endpoint = "/api/admin/desarrollo"
): Promise<DesarrolloContentConfig> {
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No fue posible cargar Desarrollo desde la API.");
  }

  return (await response.json()) as DesarrolloContentConfig;
}

async function saveDesarrolloContentToApi(
  content: DesarrolloContentConfig,
  endpoint = "/api/admin/desarrollo"
): Promise<DesarrolloContentConfig> {
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
    throw new Error("No fue posible guardar Desarrollo en la API.");
  }

  return (await response.json()) as DesarrolloContentConfig;
}

async function persistDesarrolloContent(
  content: DesarrolloContentConfig
): Promise<DesarrolloContentConfig> {
  return saveDesarrolloContentToApi(content);
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
    body: JSON.stringify({ folder: "anro/desarrollo" }),
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
      pageKey: "desarrollo",
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

function SmallTag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[#d8b36a]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f2824]">
      {children}
    </span>
  );
}

function DevelopmentPreview({
  sectionKey,
  content,
}: {
  sectionKey: SectionKey;
  content:
    | HeroContent
    | SobreContent
    | BenefitsContent
    | EtapasContent
    | CommitmentContent
    | PromotionsContent
    | GalleryContent
    | CtaContent;
}) {
  if (sectionKey === "hero") {
    const hero = content as HeroContent;

    return (
      <section className="relative overflow-hidden rounded-[32px] border border-[#d8cdb8] bg-[#151515] text-white">
        <img
          src={hero.backgroundImage}
          alt={hero.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.76)_0%,rgba(10,10,10,0.45)_48%,rgba(10,10,10,0.68)_100%)]" />
        <div className="relative z-10 grid gap-6 p-6 xl:grid-cols-[1.05fr_0.7fr]">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              {hero.badge}
            </span>
            <h3 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
              {hero.title}
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
              {hero.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-2xl bg-[#1f1a17] px-5 py-3 text-sm font-semibold text-white">
                {hero.primaryButtonText}
              </span>
              <span className="rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31]">
                {hero.secondaryButtonText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {hero.stats.map((stat) => (
              <article
                key={stat.id}
                className={`rounded-[22px] border border-white/10 bg-white/92 p-5 shadow-sm ${
                  stat.wide ? "col-span-2" : ""
                }`}
              >
                <div className="text-3xl font-extrabold text-[#1f1a17] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-base font-semibold text-[#1f1a17]">
                  {stat.title}
                </div>
                <p className="mt-1 text-sm text-[#7a7069]">{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sectionKey === "sobre") {
    const sobre = content as SobreContent;

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[linear-gradient(135deg,#f3ede5,#f7f3ee,#ece3d7)] p-6">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#d4a62a]/50 bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c7418]">
              {sobre.badge}
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight text-[#17120f]">
              {sobre.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-[#2f2824]">{sobre.paragraph1}</p>

            <div className="group relative mt-6 overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-sm">
              <img
                src={sobre.image}
                alt={sobre.highlightTitle}
                className="h-[320px] w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/92 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9c7418]">
                  {sobre.highlightLabel}
                </p>
                <p className="mt-1 text-sm font-bold text-[#1f1a17] md:text-base">
                  {sobre.highlightTitle}
                </p>
              </div>
            </div>

            <p className="mt-5 text-base leading-8 text-[#2f2824]">{sobre.paragraph2}</p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {sobre.facts.map((fact) => (
                <article
                  key={fact.id}
                  className="rounded-[26px] border border-white/60 bg-white/90 p-5 shadow-sm"
                >
                  <span className="inline-flex rounded-full bg-[#f5e7bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                    {fact.badge}
                  </span>
                  <p className="mt-4 text-3xl font-extrabold text-[#c99a1a]">{fact.value}</p>
                  <h4 className="mt-2 text-xl font-bold text-[#1f1a17]">{fact.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b615b]">{fact.description}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[30px] bg-[linear-gradient(135deg,#2c2622,#362e29,#443831)] p-6 text-white shadow-[0_24px_60px_rgba(20,15,10,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e7c978]">
                {sobre.reasonsBadge}
              </p>
              <h4 className="mt-4 text-2xl font-extrabold">{sobre.reasonsTitle}</h4>
              <p className="mt-4 text-sm leading-relaxed text-[#f1e7db]">
                {sobre.reasonsDescription}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {sobre.reasons.map((reason) => (
                  <article
                    key={reason.id}
                    className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a62a]/15 text-[#e7c978]">
                      <span className="text-lg font-bold">{reason.number}</span>
                    </div>
                    <h5 className="mt-4 text-lg font-bold text-white">{reason.title}</h5>
                    <p className="mt-2 text-sm leading-relaxed text-[#f1e7db]">
                      {reason.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sectionKey === "beneficios") {
    const beneficios = content as BenefitsContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#2b2521,#352d28,#433730)] p-6 text-white">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e7c978]">
              {beneficios.badge}
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight">{beneficios.title}</h3>
            <p className="mt-3 text-xl font-bold text-white/90">{beneficios.subtitle}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {beneficios.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a62a]/15 text-sm font-bold text-[#e7c978]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <span className="text-sm font-medium text-white">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[30px] border border-white/12 bg-white/8 shadow-sm">
              <img
                src={beneficios.image}
                alt={beneficios.cardTitle}
                className="h-[320px] w-full object-cover"
              />
            </div>

            <div className="rounded-[28px] border border-[#dcc7a1]/35 bg-[#f7efe2] p-6 text-[#1f1a17] shadow-sm">
              <span className="inline-flex rounded-full border border-[#d8b36a]/45 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a56a10]">
                {beneficios.cardBadge}
              </span>
              <h4 className="mt-4 text-2xl font-extrabold leading-tight">{beneficios.cardTitle}</h4>
              <p className="mt-3 text-sm leading-relaxed text-[#5f5650]">
                {beneficios.cardDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {beneficios.tags.map((tag) => (
                  <SmallTag key={tag.id}>{tag.text}</SmallTag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sectionKey === "etapas") {
    const etapas = content as EtapasContent;

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[linear-gradient(135deg,#f3ede5,#f8f5ef,#ece2d5)] p-6">
        <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9c7418]">
          {etapas.badge}
        </span>
        <h3 className="mt-4 text-3xl font-black text-[#1f1a17]">{etapas.title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[#5f5650]">{etapas.description}</p>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {etapas.stages
            .filter((stage) => stage.active)
            .map((stage) => (
              <article
                key={stage.id}
                className="overflow-hidden rounded-[30px] border border-black/5 bg-[#fffdf9] shadow-sm"
              >
                <div className="relative h-[260px] w-full overflow-hidden">
                  <img src={stage.image} alt={stage.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.52))]" />
                  <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#f4e4b8]/95 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                    {stage.stageLabel}
                  </div>
                  <div className="absolute bottom-5 left-5 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white">
                    {stage.status}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-2xl font-extrabold text-[#1f1a17]">{stage.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-[#5f5650]">{stage.description}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {stage.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]"
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black">
                    {stage.buttonText}
                  </span>
                </div>
              </article>
            ))}
        </div>
      </section>
    );
  }

  if (sectionKey === "compromiso") {
    const compromiso = content as CommitmentContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#2c2622,#362e29,#443831)] p-6 text-white">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#d4a62a]/40 bg-[#d4a62a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e7c978]">
              {compromiso.badge}
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight">{compromiso.title}</h3>
            <p className="mt-4 text-base leading-8 text-[#f1e7db]">{compromiso.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-2xl border border-[#d4a62a]/35 px-5 py-3 text-sm font-bold text-[#e7c978]">
                {compromiso.primaryButtonText}
              </span>
              <span className="rounded-2xl border border-[#d4a62a]/35 px-5 py-3 text-sm font-bold text-[#e7c978]">
                {compromiso.secondaryButtonText}
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {compromiso.stats.map((stat) => (
                <article
                  key={stat.id}
                  className="rounded-[24px] border border-white/12 bg-white/8 p-5 shadow-sm backdrop-blur"
                >
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm font-semibold text-[#f1e7db]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              {compromiso.images
                .filter((image) => image.visible)
                .map((image) => (
                  <article
                    key={image.id}
                    className="relative h-48 overflow-hidden rounded-[28px] border border-white/12 shadow-sm md:h-56"
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.48))]" />
                    <div className="absolute bottom-4 left-4 text-sm font-semibold text-white">
                      {image.title}
                    </div>
                  </article>
                ))}
            </div>

            <div className="mt-5 rounded-[28px] border border-[#dcc7a1]/45 bg-[linear-gradient(135deg,rgba(248,241,228,0.92),rgba(251,246,238,0.9),rgba(239,226,204,0.88))] p-6 text-[#1f1a17] shadow-sm">
              <span className="inline-flex rounded-full border border-[#d8b36a]/55 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a56a10]">
                {compromiso.supportBadge}
              </span>
              <h4 className="mt-4 text-2xl font-extrabold leading-tight">{compromiso.supportTitle}</h4>
              <p className="mt-3 text-sm leading-relaxed text-[#5f5650]">
                {compromiso.supportDescription}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {compromiso.supportTags.map((tag) => (
                  <SmallTag key={tag.id}>{tag.text}</SmallTag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sectionKey === "promociones") {
    const promociones = content as PromotionsContent;

    return (
      <section className="overflow-hidden rounded-[32px] border border-black/10 bg-[#fffdf9] shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-6 py-8 md:px-8">
            <span className="inline-flex rounded-full border border-[#c99a1a]/35 bg-[#f3e2b1] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d6a1c]">
              {promociones.badge}
            </span>
            <h3 className="mt-4 text-3xl font-black leading-tight text-[#1f1a17]">
              {promociones.title}
            </h3>
            <p className="mt-4 text-base leading-8 text-[#5f5650]">{promociones.description}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {promociones.promotions.map((promotion) => (
                <article
                  key={promotion.id}
                  className="rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5"
                >
                  <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {promotion.label}
                  </div>
                  <h4 className="text-lg font-semibold text-[#1f1a17]">{promotion.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#605853]">{promotion.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,#2b2521_0%,#3a3029_100%)] px-6 py-8 text-white md:px-8">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f3dfb7]">
              {promociones.plusBadge}
            </span>

            <h4 className="mt-4 text-2xl font-black leading-tight">{promociones.plusTitle}</h4>
            <p className="mt-4 text-sm leading-7 text-white/80">{promociones.plusDescription}</p>

            <div className="mt-6 space-y-4">
              {promociones.plusPoints.map((point) => (
                <article
                  key={point.id}
                  className="rounded-[22px] border border-white/12 bg-white/8 p-5"
                >
                  <h5 className="text-base font-semibold text-white">{point.title}</h5>
                  <p className="mt-2 text-sm leading-6 text-white/75">{point.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-[#d4a62a]/25 bg-[#d4a62a]/10 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f1ddb5]">
                {promociones.valueBadge}
              </p>
              <p className="mt-3 text-lg font-medium leading-8 text-white">
                {promociones.valueText}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (sectionKey === "galeria") {
    const galeria = content as GalleryContent;
    const featured = galeria.images.find((image) => image.featured) ?? galeria.images[0];
    const secondary = galeria.images.filter((image) => image.id !== featured?.id);

    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[#fcfaf6] p-6">
        <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a87810]">
          {galeria.badge}
        </span>
        <h3 className="mt-4 text-3xl font-black text-[#1f1a17]">{galeria.title}</h3>
        <p className="mt-3 max-w-3xl text-base leading-8 text-[#5f5650]">{galeria.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {featured ? (
            <article className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-sm sm:col-span-2 lg:col-span-5 lg:row-span-2">
              <img
                src={featured.image}
                alt={featured.title}
                className="min-h-[620px] w-full object-cover"
              />
            </article>
          ) : null}

          {secondary.map((image, index) => (
            <article
              key={image.id}
              className={`group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-sm ${
                index % 2 === 0 ? "lg:col-span-3" : "lg:col-span-4"
              }`}
            >
              <img
                src={image.image}
                alt={image.title}
                className="h-[240px] w-full object-cover md:h-[280px]"
              />
            </article>
          ))}
        </div>
      </section>
    );
  }

  const cta = content as CtaContent;

  return (
    <section className="rounded-[32px] bg-[linear-gradient(135deg,#2c2622,#362e29,#443831)] p-8 text-center text-white shadow-sm">
      <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{cta.title}</h3>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {cta.buttons.map((button) => (
          <span
            key={button.id}
            className={`inline-flex items-center rounded-2xl px-6 py-3 text-base font-bold ${
              button.style === "whatsapp"
                ? "bg-green-600 text-white"
                : "bg-[#d4a62a] text-black"
            }`}
          >
            {button.text}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function AdminDesarrolloPage() {
  const [content, setContent] = useState<DesarrolloContentConfig>(DEFAULT_DESARROLLO_CONTENT);
  const [lastUpdated, setLastUpdated] = useState<Date>(
    DEFAULT_DESARROLLO_CONTENT.updatedAt
      ? new Date(DEFAULT_DESARROLLO_CONTENT.updatedAt)
      : new Date()
  );

  const [isHeroEditing, setIsHeroEditing] = useState(false);
  const [heroDraft, setHeroDraft] = useState<HeroContent | null>(null);

  const [isSobreEditing, setIsSobreEditing] = useState(false);
  const [sobreDraft, setSobreDraft] = useState<SobreContent | null>(null);

  const [isBeneficiosEditing, setIsBeneficiosEditing] = useState(false);
  const [beneficiosDraft, setBeneficiosDraft] = useState<BenefitsContent | null>(null);

  const [isEtapasEditing, setIsEtapasEditing] = useState(false);
  const [etapasDraft, setEtapasDraft] = useState<EtapasContent | null>(null);

  const [isCompromisoEditing, setIsCompromisoEditing] = useState(false);
  const [compromisoDraft, setCompromisoDraft] = useState<CommitmentContent | null>(null);

  const [isPromocionesEditing, setIsPromocionesEditing] = useState(false);
  const [promocionesDraft, setPromocionesDraft] = useState<PromotionsContent | null>(null);

  const [isGaleriaEditing, setIsGaleriaEditing] = useState(false);
  const [galeriaDraft, setGaleriaDraft] = useState<GalleryContent | null>(null);

  const [isCtaEditing, setIsCtaEditing] = useState(false);
  const [ctaDraft, setCtaDraft] = useState<CtaContent | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const apiContent = await fetchDesarrolloContentFromApi();
        if (!mounted) return;
        setContent(apiContent);
        setLastUpdated(new Date(apiContent.updatedAt));
      } catch (error) {
        console.error("No fue posible cargar Desarrollo desde API.", error);
      }
    };

    void loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  async function applyAndPersist(nextContent: DesarrolloContentConfig) {
    setContent(nextContent);
    const saved = await persistDesarrolloContent(nextContent);
    setContent(saved);
    setLastUpdated(new Date(saved.updatedAt));
  }

  const overviewCards = [
    {
      label: "Secciones del panel",
      value: "8",
      hint: "Hero, sobre, beneficios, etapas, compromiso, promociones, galería y CTA.",
    },
    {
      label: "Mismo estilo visual",
      value: "Sí",
      hint: "Mantiene la misma línea del panel de Home.",
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
          Panel alineado con Desarrollo público
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Administración de Desarrollo
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Aquí puedes administrar las mismas secciones que existen en la ventana pública de
          Desarrollo, manteniendo el mismo estilo visual y estructura que ya venimos
          trabajando en Home.
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

      <InlineEditorShell
        badge="Bloque superior"
        title="Hero interno del desarrollo"
        description="Edita imagen principal, badge, título, descripción, botones y tarjetas de información del hero."
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
        preview={<DevelopmentPreview sectionKey="hero" content={heroDraft ?? content.hero} />}
      >
        {heroDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado principal">
              <Field
                label="Badge"
                value={heroDraft.badge}
                onChange={(value) => setHeroDraft((current) => (current ? { ...current, badge: value } : current))}
              />
              <Field
                label="Título"
                value={heroDraft.title}
                onChange={(value) => setHeroDraft((current) => (current ? { ...current, title: value } : current))}
              />
              <TextAreaField
                label="Descripción"
                value={heroDraft.description}
                onChange={(value) =>
                  setHeroDraft((current) => (current ? { ...current, description: value } : current))
                }
              />
            </SectionShell>

            <SectionShell title="Imagen principal">
              <ImageUploader
                label="Imagen del hero"
                image={heroDraft.backgroundImage}
                sectionKey="hero-background"
                onChange={(value) =>
                  setHeroDraft((current) => (current ? { ...current, backgroundImage: value } : current))
                }
                heightClass="h-56"
              />
            </SectionShell>

            <SectionShell title="Botones">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Texto botón 1"
                  value={heroDraft.primaryButtonText}
                  onChange={(value) =>
                    setHeroDraft((current) =>
                      current ? { ...current, primaryButtonText: value } : current
                    )
                  }
                />
                <Field
                  label="Enlace botón 1"
                  value={heroDraft.primaryButtonLink}
                  onChange={(value) =>
                    setHeroDraft((current) =>
                      current ? { ...current, primaryButtonLink: value } : current
                    )
                  }
                />
                <Field
                  label="Texto botón 2"
                  value={heroDraft.secondaryButtonText}
                  onChange={(value) =>
                    setHeroDraft((current) =>
                      current ? { ...current, secondaryButtonText: value } : current
                    )
                  }
                />
                <Field
                  label="Enlace botón 2"
                  value={heroDraft.secondaryButtonLink}
                  onChange={(value) =>
                    setHeroDraft((current) =>
                      current ? { ...current, secondaryButtonLink: value } : current
                    )
                  }
                />
              </div>
            </SectionShell>

            <SectionShell title="Tarjetas de datos del hero">
              {heroDraft.stats.map((stat, index) => (
                <div key={stat.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Valor"
                      value={stat.value}
                      onChange={(value) =>
                        setHeroDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stats];
                          next[index] = { ...next[index], value };
                          return { ...current, stats: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={stat.title}
                      onChange={(value) =>
                        setHeroDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stats];
                          next[index] = { ...next[index], title: value };
                          return { ...current, stats: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={stat.description}
                      onChange={(value) =>
                        setHeroDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stats];
                          next[index] = { ...next[index], description: value };
                          return { ...current, stats: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <ToggleField
                      label="Tarjeta ancha"
                      checked={Boolean(stat.wide)}
                      onChange={(value) =>
                        setHeroDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stats];
                          next[index] = { ...next[index], wide: value };
                          return { ...current, stats: next };
                        })
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setHeroDraft((current) => {
                          if (!current) return current;
                          return {
                            ...current,
                            stats: current.stats.filter((item) => item.id !== stat.id),
                          };
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setHeroDraft((current) =>
                    current
                      ? {
                          ...current,
                          stats: [
                            ...current.stats,
                            {
                              id: `hero-stat-${Date.now()}`,
                              value: "Nuevo",
                              title: "Nueva tarjeta",
                              description: "Descripción de la tarjeta.",
                            },
                          ],
                        }
                      : current
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
              >
                <Plus className="h-4 w-4" />
                Agregar tarjeta
              </button>
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Contexto del proyecto"
        title="Sobre el desarrollo"
        description="Edita textos principales, imagen central, tarjetas informativas y razones para elegir el desarrollo."
        editLabel="Editar Sobre"
        idleMessage="Ya conserva la misma experiencia visual de edición inline que Home."
        isEditing={isSobreEditing}
        onEdit={() => {
          setSobreDraft(structuredClone(content.sobre));
          setIsSobreEditing(true);
        }}
        onCancel={() => {
          setSobreDraft(structuredClone(content.sobre));
          setIsSobreEditing(false);
        }}
        onSave={async () => {
          if (!sobreDraft) return;
          await applyAndPersist({
            ...content,
            sobre: structuredClone(sobreDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsSobreEditing(false);
        }}
        preview={<DevelopmentPreview sectionKey="sobre" content={sobreDraft ?? content.sobre} />}
      >
        {sobreDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado y textos">
              <Field
                label="Badge"
                value={sobreDraft.badge}
                onChange={(value) => setSobreDraft((current) => (current ? { ...current, badge: value } : current))}
              />
              <Field
                label="Título"
                value={sobreDraft.title}
                onChange={(value) => setSobreDraft((current) => (current ? { ...current, title: value } : current))}
              />
              <TextAreaField
                label="Párrafo 1"
                value={sobreDraft.paragraph1}
                onChange={(value) =>
                  setSobreDraft((current) => (current ? { ...current, paragraph1: value } : current))
                }
              />
              <TextAreaField
                label="Párrafo 2"
                value={sobreDraft.paragraph2}
                onChange={(value) =>
                  setSobreDraft((current) => (current ? { ...current, paragraph2: value } : current))
                }
              />
            </SectionShell>

            <SectionShell title="Imagen destacada">
              <ImageUploader
                label="Imagen principal"
                image={sobreDraft.image}
                sectionKey="sobre-main-image"
                onChange={(value) =>
                  setSobreDraft((current) => (current ? { ...current, image: value } : current))
                }
                heightClass="h-56"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Etiqueta inferior"
                  value={sobreDraft.highlightLabel}
                  onChange={(value) =>
                    setSobreDraft((current) =>
                      current ? { ...current, highlightLabel: value } : current
                    )
                  }
                />
                <Field
                  label="Título inferior"
                  value={sobreDraft.highlightTitle}
                  onChange={(value) =>
                    setSobreDraft((current) =>
                      current ? { ...current, highlightTitle: value } : current
                    )
                  }
                />
              </div>
            </SectionShell>

            <SectionShell title="Tarjetas informativas">
              {sobreDraft.facts.map((fact, index) => (
                <div key={fact.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Badge"
                      value={fact.badge}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.facts];
                          next[index] = { ...next[index], badge: value };
                          return { ...current, facts: next };
                        })
                      }
                    />
                    <Field
                      label="Valor"
                      value={fact.value}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.facts];
                          next[index] = { ...next[index], value };
                          return { ...current, facts: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={fact.title}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.facts];
                          next[index] = { ...next[index], title: value };
                          return { ...current, facts: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={fact.description}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.facts];
                          next[index] = { ...next[index], description: value };
                          return { ...current, facts: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          return {
                            ...current,
                            facts: current.facts.filter((item) => item.id !== fact.id),
                          };
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setSobreDraft((current) =>
                    current
                      ? {
                          ...current,
                          facts: [
                            ...current.facts,
                            {
                              id: `sobre-fact-${Date.now()}`,
                              badge: "Nuevo",
                              value: "Dato",
                              title: "Nueva tarjeta",
                              description: "Descripción de la nueva tarjeta.",
                            },
                          ],
                        }
                      : current
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
              >
                <Plus className="h-4 w-4" />
                Agregar tarjeta
              </button>
            </SectionShell>

            <SectionShell title="Bloque de razones">
              <Field
                label="Badge del bloque"
                value={sobreDraft.reasonsBadge}
                onChange={(value) =>
                  setSobreDraft((current) => (current ? { ...current, reasonsBadge: value } : current))
                }
              />
              <Field
                label="Título del bloque"
                value={sobreDraft.reasonsTitle}
                onChange={(value) =>
                  setSobreDraft((current) => (current ? { ...current, reasonsTitle: value } : current))
                }
              />
              <TextAreaField
                label="Descripción del bloque"
                value={sobreDraft.reasonsDescription}
                onChange={(value) =>
                  setSobreDraft((current) =>
                    current ? { ...current, reasonsDescription: value } : current
                  )
                }
              />

              {sobreDraft.reasons.map((reason, index) => (
                <div key={reason.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={reason.number}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.reasons];
                          next[index] = { ...next[index], number: value };
                          return { ...current, reasons: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={reason.title}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.reasons];
                          next[index] = { ...next[index], title: value };
                          return { ...current, reasons: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={reason.description}
                      onChange={(value) =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          const next = [...current.reasons];
                          next[index] = { ...next[index], description: value };
                          return { ...current, reasons: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setSobreDraft((current) => {
                          if (!current) return current;
                          return {
                            ...current,
                            reasons: current.reasons.filter((item) => item.id !== reason.id),
                          };
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Infraestructura y ventajas"
        title="Beneficios y servicios"
        description="Edita beneficios listados, imagen lateral y tarjeta complementaria del bloque."
        editLabel="Editar Beneficios"
        idleMessage="La sección queda organizada con el mismo estilo modular del panel anterior."
        isEditing={isBeneficiosEditing}
        onEdit={() => {
          setBeneficiosDraft(structuredClone(content.beneficios));
          setIsBeneficiosEditing(true);
        }}
        onCancel={() => {
          setBeneficiosDraft(structuredClone(content.beneficios));
          setIsBeneficiosEditing(false);
        }}
        onSave={async () => {
          if (!beneficiosDraft) return;
          await applyAndPersist({
            ...content,
            beneficios: structuredClone(beneficiosDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsBeneficiosEditing(false);
        }}
        preview={
          <DevelopmentPreview
            sectionKey="beneficios"
            content={beneficiosDraft ?? content.beneficios}
          />
        }
      >
        {beneficiosDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={beneficiosDraft.badge}
                onChange={(value) =>
                  setBeneficiosDraft((current) => (current ? { ...current, badge: value } : current))
                }
              />
              <Field
                label="Título"
                value={beneficiosDraft.title}
                onChange={(value) =>
                  setBeneficiosDraft((current) => (current ? { ...current, title: value } : current))
                }
              />
              <TextAreaField
                label="Subtítulo"
                value={beneficiosDraft.subtitle}
                onChange={(value) =>
                  setBeneficiosDraft((current) =>
                    current ? { ...current, subtitle: value } : current
                  )
                }
              />
            </SectionShell>

            <SectionShell title="Listado de beneficios">
              {beneficiosDraft.items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <Field
                      label={`Beneficio ${index + 1}`}
                      value={item.text}
                      onChange={(value) =>
                        setBeneficiosDraft((current) => {
                          if (!current) return current;
                          const next = [...current.items];
                          next[index] = { ...next[index], text: value };
                          return { ...current, items: next };
                        })
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBeneficiosDraft((current) => {
                        if (!current) return current;
                        return {
                          ...current,
                          items: current.items.filter((entry) => entry.id !== item.id),
                        };
                      })
                    }
                    className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  setBeneficiosDraft((current) =>
                    current
                      ? {
                          ...current,
                          items: [
                            ...current.items,
                            { id: `benefit-${Date.now()}`, text: "Nuevo beneficio" },
                          ],
                        }
                      : current
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
              >
                <Plus className="h-4 w-4" />
                Agregar beneficio
              </button>
            </SectionShell>

            <SectionShell title="Imagen y tarjeta lateral">
              <ImageUploader
                label="Imagen principal"
                image={beneficiosDraft.image}
                sectionKey="beneficios-image"
                onChange={(value) =>
                  setBeneficiosDraft((current) => (current ? { ...current, image: value } : current))
                }
                heightClass="h-56"
              />
              <Field
                label="Badge de la tarjeta"
                value={beneficiosDraft.cardBadge}
                onChange={(value) =>
                  setBeneficiosDraft((current) =>
                    current ? { ...current, cardBadge: value } : current
                  )
                }
              />
              <Field
                label="Título de la tarjeta"
                value={beneficiosDraft.cardTitle}
                onChange={(value) =>
                  setBeneficiosDraft((current) =>
                    current ? { ...current, cardTitle: value } : current
                  )
                }
              />
              <TextAreaField
                label="Descripción de la tarjeta"
                value={beneficiosDraft.cardDescription}
                onChange={(value) =>
                  setBeneficiosDraft((current) =>
                    current ? { ...current, cardDescription: value } : current
                  )
                }
              />

              <div className="space-y-3">
                {beneficiosDraft.tags.map((tag, index) => (
                  <div key={tag.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Field
                        label={`Tag ${index + 1}`}
                        value={tag.text}
                        onChange={(value) =>
                          setBeneficiosDraft((current) => {
                            if (!current) return current;
                            const next = [...current.tags];
                            next[index] = { ...next[index], text: value };
                            return { ...current, tags: next };
                          })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setBeneficiosDraft((current) => {
                          if (!current) return current;
                          return {
                            ...current,
                            tags: current.tags.filter((entry) => entry.id !== tag.id),
                          };
                        })
                      }
                      className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Estructura por fases"
        title="Etapas del desarrollo"
        description="Edita el encabezado y cada tarjeta de etapa con su imagen, estado, tags y enlace."
        editLabel="Editar Etapas"
        idleMessage="Aquí ya te queda el módulo armado para manejar etapas como bloques visuales."
        isEditing={isEtapasEditing}
        onEdit={() => {
          setEtapasDraft(structuredClone(content.etapas));
          setIsEtapasEditing(true);
        }}
        onCancel={() => {
          setEtapasDraft(structuredClone(content.etapas));
          setIsEtapasEditing(false);
        }}
        onSave={async () => {
          if (!etapasDraft) return;
          await applyAndPersist({
            ...content,
            etapas: structuredClone(etapasDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsEtapasEditing(false);
        }}
        preview={<DevelopmentPreview sectionKey="etapas" content={etapasDraft ?? content.etapas} />}
      >
        {etapasDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado de etapas">
              <Field
                label="Badge"
                value={etapasDraft.badge}
                onChange={(value) =>
                  setEtapasDraft((current) => (current ? { ...current, badge: value } : current))
                }
              />
              <Field
                label="Título"
                value={etapasDraft.title}
                onChange={(value) =>
                  setEtapasDraft((current) => (current ? { ...current, title: value } : current))
                }
              />
              <TextAreaField
                label="Descripción"
                value={etapasDraft.description}
                onChange={(value) =>
                  setEtapasDraft((current) =>
                    current ? { ...current, description: value } : current
                  )
                }
              />
            </SectionShell>

            <SectionShell title="Tarjetas de etapas">
              {etapasDraft.stages.map((stage, index) => (
                <div key={stage.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Etiqueta de etapa"
                      value={stage.stageLabel}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], stageLabel: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                    <Field
                      label="Estado"
                      value={stage.status}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], status: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={stage.title}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], title: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Etapa activa"
                      checked={stage.active}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], active: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={stage.description}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], description: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field
                      label="Texto del botón"
                      value={stage.buttonText}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], buttonText: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                    <Field
                      label="Enlace del botón"
                      value={stage.buttonLink}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], buttonLink: value };
                          return { ...current, stages: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <ImageUploader
                      label="Imagen de la etapa"
                      image={stage.image}
                      sectionKey={`stage-image-${stage.id}`}
                      onChange={(value) =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          const next = [...current.stages];
                          next[index] = { ...next[index], image: value };
                          return { ...current, stages: next };
                        })
                      }
                      heightClass="h-48"
                    />
                  </div>

                  <div className="mt-4 space-y-3">
                    {stage.tags.map((tag, tagIndex) => (
                      <div key={tag.id} className="flex items-center gap-3">
                        <div className="flex-1">
                          <Field
                            label={`Tag ${tagIndex + 1}`}
                            value={tag.text}
                            onChange={(value) =>
                              setEtapasDraft((current) => {
                                if (!current) return current;
                                const next = [...current.stages];
                                const nextTags = [...next[index].tags];
                                nextTags[tagIndex] = { ...nextTags[tagIndex], text: value };
                                next[index] = { ...next[index], tags: nextTags };
                                return { ...current, stages: next };
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setEtapasDraft((current) => {
                          if (!current) return current;
                          return {
                            ...current,
                            stages: current.stages.filter((entry) => entry.id !== stage.id),
                          };
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Confianza y respaldo"
        title="Compromiso y resultados"
        description="Edita el mensaje principal, botones, indicadores, galería visual y el bloque de respaldo."
        editLabel="Editar Compromiso"
        idleMessage="Esta parte ya queda con la misma lógica visual del panel que llevas en Home."
        isEditing={isCompromisoEditing}
        onEdit={() => {
          setCompromisoDraft(structuredClone(content.compromiso));
          setIsCompromisoEditing(true);
        }}
        onCancel={() => {
          setCompromisoDraft(structuredClone(content.compromiso));
          setIsCompromisoEditing(false);
        }}
        onSave={async () => {
          if (!compromisoDraft) return;
          await applyAndPersist({
            ...content,
            compromiso: structuredClone(compromisoDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsCompromisoEditing(false);
        }}
        preview={
          <DevelopmentPreview
            sectionKey="compromiso"
            content={compromisoDraft ?? content.compromiso}
          />
        }
      >
        {compromisoDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado y botones">
              <Field
                label="Badge"
                value={compromisoDraft.badge}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, badge: value } : current
                  )
                }
              />
              <Field
                label="Título"
                value={compromisoDraft.title}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, title: value } : current
                  )
                }
              />
              <TextAreaField
                label="Descripción"
                value={compromisoDraft.description}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, description: value } : current
                  )
                }
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Texto botón 1"
                  value={compromisoDraft.primaryButtonText}
                  onChange={(value) =>
                    setCompromisoDraft((current) =>
                      current ? { ...current, primaryButtonText: value } : current
                    )
                  }
                />
                <Field
                  label="Enlace botón 1"
                  value={compromisoDraft.primaryButtonLink}
                  onChange={(value) =>
                    setCompromisoDraft((current) =>
                      current ? { ...current, primaryButtonLink: value } : current
                    )
                  }
                />
                <Field
                  label="Texto botón 2"
                  value={compromisoDraft.secondaryButtonText}
                  onChange={(value) =>
                    setCompromisoDraft((current) =>
                      current ? { ...current, secondaryButtonText: value } : current
                    )
                  }
                />
                <Field
                  label="Enlace botón 2"
                  value={compromisoDraft.secondaryButtonLink}
                  onChange={(value) =>
                    setCompromisoDraft((current) =>
                      current ? { ...current, secondaryButtonLink: value } : current
                    )
                  }
                />
              </div>
            </SectionShell>

            <SectionShell title="Indicadores">
              {compromisoDraft.stats.map((stat, index) => (
                <div key={stat.id} className="grid gap-4 md:grid-cols-2">
                  <Field
                    label={`Valor ${index + 1}`}
                    value={stat.value}
                    onChange={(value) =>
                      setCompromisoDraft((current) => {
                        if (!current) return current;
                        const next = [...current.stats];
                        next[index] = { ...next[index], value };
                        return { ...current, stats: next };
                      })
                    }
                  />
                  <Field
                    label={`Etiqueta ${index + 1}`}
                    value={stat.label}
                    onChange={(value) =>
                      setCompromisoDraft((current) => {
                        if (!current) return current;
                        const next = [...current.stats];
                        next[index] = { ...next[index], label: value };
                        return { ...current, stats: next };
                      })
                    }
                  />
                </div>
              ))}
            </SectionShell>

            <SectionShell title="Galería visual del bloque">
              {compromisoDraft.images.map((image, index) => (
                <div key={image.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Título de imagen"
                      value={image.title}
                      onChange={(value) =>
                        setCompromisoDraft((current) => {
                          if (!current) return current;
                          const next = [...current.images];
                          next[index] = { ...next[index], title: value };
                          return { ...current, images: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Visible"
                      checked={image.visible}
                      onChange={(value) =>
                        setCompromisoDraft((current) => {
                          if (!current) return current;
                          const next = [...current.images];
                          next[index] = { ...next[index], visible: value };
                          return { ...current, images: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <ImageUploader
                      label="Imagen"
                      image={image.image}
                      sectionKey={`compromiso-image-${image.id}`}
                      onChange={(value) =>
                        setCompromisoDraft((current) => {
                          if (!current) return current;
                          const next = [...current.images];
                          next[index] = { ...next[index], image: value };
                          return { ...current, images: next };
                        })
                      }
                      heightClass="h-44"
                    />
                  </div>
                </div>
              ))}
            </SectionShell>

            <SectionShell title="Bloque de respaldo">
              <Field
                label="Badge"
                value={compromisoDraft.supportBadge}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, supportBadge: value } : current
                  )
                }
              />
              <Field
                label="Título"
                value={compromisoDraft.supportTitle}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, supportTitle: value } : current
                  )
                }
              />
              <TextAreaField
                label="Descripción"
                value={compromisoDraft.supportDescription}
                onChange={(value) =>
                  setCompromisoDraft((current) =>
                    current ? { ...current, supportDescription: value } : current
                  )
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Promociones e inversión"
        title="Promociones y plusvalía"
        description="Edita el bloque comercial, sus tarjetas de promoción y el panel de plusvalía."
        editLabel="Editar Promociones"
        idleMessage="Este bloque ya queda alineado al mismo lenguaje visual premium del panel."
        isEditing={isPromocionesEditing}
        onEdit={() => {
          setPromocionesDraft(structuredClone(content.promociones));
          setIsPromocionesEditing(true);
        }}
        onCancel={() => {
          setPromocionesDraft(structuredClone(content.promociones));
          setIsPromocionesEditing(false);
        }}
        onSave={async () => {
          if (!promocionesDraft) return;
          await applyAndPersist({
            ...content,
            promociones: structuredClone(promocionesDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsPromocionesEditing(false);
        }}
        preview={
          <DevelopmentPreview
            sectionKey="promociones"
            content={promocionesDraft ?? content.promociones}
          />
        }
      >
        {promocionesDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado comercial">
              <Field
                label="Badge"
                value={promocionesDraft.badge}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, badge: value } : current
                  )
                }
              />
              <Field
                label="Título"
                value={promocionesDraft.title}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, title: value } : current
                  )
                }
              />
              <TextAreaField
                label="Descripción"
                value={promocionesDraft.description}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, description: value } : current
                  )
                }
              />
            </SectionShell>

            <SectionShell title="Tarjetas de promoción">
              {promocionesDraft.promotions.map((promotion, index) => (
                <div key={promotion.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Etiqueta"
                      value={promotion.label}
                      onChange={(value) =>
                        setPromocionesDraft((current) => {
                          if (!current) return current;
                          const next = [...current.promotions];
                          next[index] = { ...next[index], label: value };
                          return { ...current, promotions: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={promotion.title}
                      onChange={(value) =>
                        setPromocionesDraft((current) => {
                          if (!current) return current;
                          const next = [...current.promotions];
                          next[index] = { ...next[index], title: value };
                          return { ...current, promotions: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={promotion.description}
                      onChange={(value) =>
                        setPromocionesDraft((current) => {
                          if (!current) return current;
                          const next = [...current.promotions];
                          next[index] = { ...next[index], description: value };
                          return { ...current, promotions: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>

            <SectionShell title="Panel de plusvalía">
              <Field
                label="Badge"
                value={promocionesDraft.plusBadge}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, plusBadge: value } : current
                  )
                }
              />
              <Field
                label="Título"
                value={promocionesDraft.plusTitle}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, plusTitle: value } : current
                  )
                }
              />
              <TextAreaField
                label="Descripción"
                value={promocionesDraft.plusDescription}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, plusDescription: value } : current
                  )
                }
              />

              {promocionesDraft.plusPoints.map((point, index) => (
                <div key={point.id} className="grid gap-4 md:grid-cols-2">
                  <Field
                    label={`Punto ${index + 1} - título`}
                    value={point.title}
                    onChange={(value) =>
                      setPromocionesDraft((current) => {
                        if (!current) return current;
                        const next = [...current.plusPoints];
                        next[index] = { ...next[index], title: value };
                        return { ...current, plusPoints: next };
                      })
                    }
                  />
                  <TextAreaField
                    label={`Punto ${index + 1} - texto`}
                    value={point.text}
                    onChange={(value) =>
                      setPromocionesDraft((current) => {
                        if (!current) return current;
                        const next = [...current.plusPoints];
                        next[index] = { ...next[index], text: value };
                        return { ...current, plusPoints: next };
                      })
                    }
                    rows={3}
                  />
                </div>
              ))}

              <Field
                label="Badge del valor agregado"
                value={promocionesDraft.valueBadge}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, valueBadge: value } : current
                  )
                }
              />
              <TextAreaField
                label="Texto del valor agregado"
                value={promocionesDraft.valueText}
                onChange={(value) =>
                  setPromocionesDraft((current) =>
                    current ? { ...current, valueText: value } : current
                  )
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Recorrido visual"
        title="Galería del desarrollo"
        description="Edita el encabezado y las imágenes de la galería, incluyendo cuál será la principal."
        editLabel="Editar Galería"
        idleMessage="La galería ya queda organizada para seguir el mismo sistema de edición del resto del panel."
        isEditing={isGaleriaEditing}
        onEdit={() => {
          setGaleriaDraft(structuredClone(content.galeria));
          setIsGaleriaEditing(true);
        }}
        onCancel={() => {
          setGaleriaDraft(structuredClone(content.galeria));
          setIsGaleriaEditing(false);
        }}
        onSave={async () => {
          if (!galeriaDraft) return;
          await applyAndPersist({
            ...content,
            galeria: structuredClone(galeriaDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsGaleriaEditing(false);
        }}
        preview={<DevelopmentPreview sectionKey="galeria" content={galeriaDraft ?? content.galeria} />}
      >
        {galeriaDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado de la galería">
              <Field
                label="Badge"
                value={galeriaDraft.badge}
                onChange={(value) =>
                  setGaleriaDraft((current) => (current ? { ...current, badge: value } : current))
                }
              />
              <Field
                label="Título"
                value={galeriaDraft.title}
                onChange={(value) =>
                  setGaleriaDraft((current) => (current ? { ...current, title: value } : current))
                }
              />
              <TextAreaField
                label="Descripción"
                value={galeriaDraft.description}
                onChange={(value) =>
                  setGaleriaDraft((current) =>
                    current ? { ...current, description: value } : current
                  )
                }
              />
            </SectionShell>

            <SectionShell title="Imágenes">
              {galeriaDraft.images.map((image, index) => (
                <div key={image.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Título"
                      value={image.title}
                      onChange={(value) =>
                        setGaleriaDraft((current) => {
                          if (!current) return current;
                          const next = [...current.images];
                          next[index] = { ...next[index], title: value };
                          return { ...current, images: next };
                        })
                      }
                    />
                    <ToggleField
                      label="Imagen principal"
                      checked={image.featured}
                      onChange={(value) =>
                        setGaleriaDraft((current) => {
                          if (!current) return current;
                          const next = current.images.map((entry, entryIndex) => ({
                            ...entry,
                            featured: entryIndex === index ? value : value ? false : entry.featured,
                          }));
                          return { ...current, images: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <ImageUploader
                      label="Imagen"
                      image={image.image}
                      sectionKey={`gallery-image-${image.id}`}
                      onChange={(value) =>
                        setGaleriaDraft((current) => {
                          if (!current) return current;
                          const next = [...current.images];
                          next[index] = { ...next[index], image: value };
                          return { ...current, images: next };
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
        badge="Cierre del desarrollo"
        title="CTA final"
        description="Edita el mensaje final y los botones del cierre de la ventana de Desarrollo."
        editLabel="Editar CTA"
        idleMessage="Este cierre ya queda con el mismo patrón visual y acciones que el resto del panel."
        isEditing={isCtaEditing}
        onEdit={() => {
          setCtaDraft(structuredClone(content.cta));
          setIsCtaEditing(true);
        }}
        onCancel={() => {
          setCtaDraft(structuredClone(content.cta));
          setIsCtaEditing(false);
        }}
        onSave={async () => {
          if (!ctaDraft) return;
          await applyAndPersist({
            ...content,
            cta: structuredClone(ctaDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsCtaEditing(false);
        }}
        preview={<DevelopmentPreview sectionKey="cta" content={ctaDraft ?? content.cta} />}
      >
        {ctaDraft ? (
          <div className="space-y-5">
            <SectionShell title="Contenido del CTA">
              <Field
                label="Título"
                value={ctaDraft.title}
                onChange={(value) => setCtaDraft((current) => (current ? { ...current, title: value } : current))}
              />

              {ctaDraft.buttons.map((button, index) => (
                <div key={button.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Texto del botón"
                      value={button.text}
                      onChange={(value) =>
                        setCtaDraft((current) => {
                          if (!current) return current;
                          const next = [...current.buttons];
                          next[index] = { ...next[index], text: value };
                          return { ...current, buttons: next };
                        })
                      }
                    />
                    <Field
                      label="Enlace"
                      value={button.link}
                      onChange={(value) =>
                        setCtaDraft((current) => {
                          if (!current) return current;
                          const next = [...current.buttons];
                          next[index] = { ...next[index], link: value };
                          return { ...current, buttons: next };
                        })
                      }
                    />
                    <Field
                      label="Estilo"
                      value={button.style}
                      onChange={(value) =>
                        setCtaDraft((current) => {
                          if (!current) return current;
                          const next = [...current.buttons];
                          next[index] = {
                            ...next[index],
                            style: value === "whatsapp" ? "whatsapp" : "primary",
                          };
                          return { ...current, buttons: next };
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

      <section className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 text-sm leading-7 text-slate-600">
        <p className="font-semibold text-[#142033]">Estado actual del módulo</p>
        <p className="mt-2">
          Este panel de Desarrollo ya quedó con la misma base visual del módulo Home:
          hero superior, tarjetas de resumen, previews grandes, edición inline y guardado
          preparado con lectura y escritura exclusiva por API conectada a Neon.
        </p>
      </section>
    </div>
  );
}