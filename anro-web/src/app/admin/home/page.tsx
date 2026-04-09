//src/app/admin/home/page.tsx

"use client";

import {
  CheckCircle2,
  CircleDashed,
  FilePenLine,
  Flame,
  Images,
  Plus,
  Power,
  Rocket,
  Sparkles,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import type {
  ChangeEvent,
  ComponentType,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import { useEffect, useMemo, useState } from "react"; 
import {
  DEFAULT_HOME_CONTENT,
  resolveHomeContent,
  type HomeContentConfig,
} from "@/lib/home-content";

type ModuleStatus = "ACTIVE" | "INACTIVE";
type ModuleKey = "hero" | "desarrollo" | "servicios" | "compromiso" | "cta";

type HeroBenefit = { id: string; text: string };
type QuickFact = { id: string; label: string; value: string };
type HeroSlide = { id: string; image: string; active: boolean; title: string };

type HeroContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  benefits: HeroBenefit[];
  quickFactsTitle: string;
  quickFacts: QuickFact[];
  quickFactsLinkText: string;
  quickFactsLink: string;
  slides: HeroSlide[];
  activeSlideId: string;
};

type DevelopmentPoint = { id: string; text: string };
type DevelopmentCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  active: boolean;
};

type DesarrolloContent = {
  badge: string;
  title: string;
  subtitle: string;
  points: DevelopmentPoint[];
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  cards: DevelopmentCard[];
};

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  visible: boolean;
};

type ServicesContent = {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  cards: ServiceCard[];
};

type SupportBlock = { id: string; title: string; text: string; visible: boolean };
type CommitmentImageCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  visible: boolean;
};

type CompromisoContent = {
  badge: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  featureBlocks: SupportBlock[];
  mainImage: CommitmentImageCard;
  sideImages: CommitmentImageCard[];
};

type CtaContent = {
  title: string;
  description: string;
  buttonText: string;
  link: string;
};

type ModuleContent =
  | HeroContent
  | DesarrolloContent
  | ServicesContent
  | CompromisoContent
  | CtaContent;

interface HomeModule {
  key: ModuleKey;
  name: string;
  publicReference: string;
  description: string;
  status: ModuleStatus;
  icon: ComponentType<{ className?: string }>;
  content: ModuleContent;
}

const STATUS_META: Record<
  ModuleStatus,
  {
    label: string;
    className: string;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  ACTIVE: {
    label: "Activo",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: CheckCircle2,
  },
  INACTIVE: {
    label: "Inactivo",
    className: "bg-slate-100 text-slate-700 border border-slate-200",
    icon: CircleDashed,
  },
};

function formatDate(date: Date) {
  return date.toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

function isHeroContent(content: ModuleContent): content is HeroContent {
  return "activeSlideId" in content && "quickFacts" in content && "benefits" in content;
}

function isDesarrolloContent(content: ModuleContent): content is DesarrolloContent {
  return "points" in content && "cards" in content && "backgroundImage" in content;
}

function isServicesContent(content: ModuleContent): content is ServicesContent {
  return "cards" in content && !("points" in content) && !("activeSlideId" in content);
}

function isCompromisoContent(content: ModuleContent): content is CompromisoContent {
  return "featureBlocks" in content && "mainImage" in content && "sideImages" in content;
}

function isCtaContent(content: ModuleContent): content is CtaContent {
  return (
    "title" in content &&
    "description" in content &&
    "buttonText" in content &&
    "link" in content &&
    !("cards" in content) &&
    !("featureBlocks" in content) &&
    !("points" in content) &&
    !("activeSlideId" in content)
  );
}

function cloneTypedContent<T extends ModuleContent>(content: T): T {
  return structuredClone(content);
}

function createModulesFromHomeContent(home: HomeContentConfig): HomeModule[] {
  return [
    {
      key: "hero",
      name: "Hero principal",
      publicReference: "Sección pública: Hero superior",
      description:
        "Edita encabezado principal, botones, beneficios, datos rápidos e imágenes del hero.",
      status: "ACTIVE",
      icon: Rocket,
      content: {
        badge: home.heroSection.badge,
        titleWhite: home.heroSection.titleLineOne,
        titleGold: home.heroSection.titleHighlight,
        description: home.heroSection.description,
        primaryButtonText: home.heroSection.primaryButtonText,
        primaryButtonLink: home.heroSection.primaryButtonLink,
        secondaryButtonText: home.heroSection.secondaryButtonText,
        secondaryButtonLink: home.heroSection.secondaryButtonLink,
        benefits: home.heroSection.featureItems.map((item) => ({
          id: item.id,
          text: item.text,
        })),
        quickFactsTitle: "Datos rápidos",
        quickFacts: home.heroSection.quickFacts.map((fact) => ({
          id: fact.id,
          label: fact.label,
          value: fact.value,
        })),
        quickFactsLinkText: home.heroSection.locationLinkText,
        quickFactsLink: home.heroSection.locationLink,
        slides: home.heroSlides.map((slide) => ({
          id: slide.id,
          image: slide.src,
          active: true,
          title: slide.alt,
        })),
        activeSlideId: home.heroSlides[0]?.id || "hero-1",
      },
    },
    {
      key: "desarrollo",
      name: "Desarrollo principal",
      publicReference: "Sección pública: Nuestro Desarrollo Principal",
      description:
        "Edita encabezado, lista lateral, botón, fondo e imágenes de las tarjetas del desarrollo.",
      status: "ACTIVE",
      icon: Wrench,
      content: {
        badge: home.developmentSection.badge,
        title: home.developmentSection.title,
        subtitle: home.developmentSection.subtitle,
        points: home.developmentSection.sideList.map((text, index) => ({
          id: `point-${index + 1}`,
          text,
        })),
        buttonText: home.developmentSection.buttonText,
        buttonLink: home.developmentSection.buttonLink,
        backgroundImage: home.developmentSection.backgroundImage,
        cards: home.developmentSection.cards.map((card) => ({
          id: card.id,
          title: card.title,
          subtitle: card.tag,
          image: card.image,
          active: card.active,
        })),
      },
    },
    {
      key: "servicios",
      name: "Servicios",
      publicReference: "Sección pública: Servicios",
      description:
        "Edita badge, título, descripción, CTA y las tarjetas visuales de servicios.",
      status: "ACTIVE",
      icon: Sparkles,
      content: {
        badge: home.servicesSection.badge,
        title: home.servicesSection.title,
        description: home.servicesSection.description,
        buttonText: home.servicesSection.buttonText,
        buttonLink: home.servicesSection.buttonLink,
        cards: home.servicesSection.cards.map((card) => ({
          id: card.id,
          title: card.title,
          description: card.description,
          image: card.image,
          visible: card.active,
        })),
      },
    },
    {
      key: "compromiso",
      name: "Compromiso y resultados",
      publicReference: "Sección pública: Compromiso y resultados",
      description:
        "Edita textos, botones, bloques de apoyo e imágenes principales y secundarias.",
      status: "ACTIVE",
      icon: Flame,
      content: {
        badge: home.commitmentSection.badge,
        title: home.commitmentSection.title,
        description: home.commitmentSection.description,
        primaryButtonText: home.commitmentSection.primaryButtonText,
        primaryButtonLink: home.commitmentSection.primaryButtonLink,
        secondaryButtonText: home.commitmentSection.secondaryButtonText,
        secondaryButtonLink: home.commitmentSection.secondaryButtonLink,
        featureBlocks: home.commitmentSection.featureBlocks.map((block, index) => ({
          id: `support-${index + 1}`,
          title: block.title,
          text: block.description,
          visible: true,
        })),
        mainImage: {
          id: "commit-main",
          title: home.commitmentSection.mainImage.title,
          subtitle: home.commitmentSection.mainImage.subtitle,
          image: home.commitmentSection.mainImage.image,
          visible: true,
        },
        sideImages: home.commitmentSection.sideImages.map((image, index) => ({
          id: `commit-side-${index + 1}`,
          title: image.title,
          subtitle: image.subtitle,
          image: image.image,
          visible: true,
        })),
      },
    },
    {
      key: "cta",
      name: "CTA final",
      publicReference: "Sección pública: CTA final",
      description: "Bloque final de contacto y cierre del Home.",
      status: "ACTIVE",
      icon: Images,
      content: {
        title: home.ctaSection.title,
        description: home.ctaSection.footerText,
        buttonText: home.ctaSection.primaryButtonText,
        link: home.ctaSection.primaryButtonLink,
      },
    },
  ];
}

function buildHomeContentFromModules(currentModules: HomeModule[]): HomeContentConfig {
  const hero = currentModules.find((module) => module.key === "hero");
  const desarrollo = currentModules.find((module) => module.key === "desarrollo");
  const servicios = currentModules.find((module) => module.key === "servicios");
  const compromiso = currentModules.find((module) => module.key === "compromiso");
  const cta = currentModules.find((module) => module.key === "cta");

  const base = structuredClone(DEFAULT_HOME_CONTENT);

  if (hero && isHeroContent(hero.content)) {
    base.heroSlides = hero.content.slides
      .filter((slide) => slide.active)
      .map((slide) => ({
        id: slide.id,
        src: slide.image,
        alt: slide.title,
      }));

    base.heroSection = {
      badge: hero.content.badge,
      titleLineOne: hero.content.titleWhite,
      titleHighlight: hero.content.titleGold,
      description: hero.content.description,
      primaryButtonText: hero.content.primaryButtonText,
      primaryButtonLink: hero.content.primaryButtonLink,
      secondaryButtonText: hero.content.secondaryButtonText,
      secondaryButtonLink: hero.content.secondaryButtonLink,
      locationLinkText: hero.content.quickFactsLinkText,
      locationLink: hero.content.quickFactsLink,
      featureItems: hero.content.benefits.map((item) => ({
        id: item.id,
        text: item.text,
      })),
      quickFacts: hero.content.quickFacts.map((fact) => ({
        id: fact.id,
        label: fact.label,
        value: fact.value,
      })),
    };
  }

  if (desarrollo && isDesarrolloContent(desarrollo.content)) {
    base.developmentSection = {
      badge: desarrollo.content.badge,
      title: desarrollo.content.title,
      subtitle: desarrollo.content.subtitle,
      backgroundImage: desarrollo.content.backgroundImage,
      sideList: desarrollo.content.points.map((point) => point.text),
      buttonText: desarrollo.content.buttonText,
      buttonLink: desarrollo.content.buttonLink,
      cards: desarrollo.content.cards.map((card, index) => ({
        id: card.id,
        title: card.title,
        tag: card.subtitle,
        image: card.image,
        order: index + 1,
        active: card.active,
      })),
    };
  }

  if (servicios && isServicesContent(servicios.content)) {
    base.servicesSection = {
      badge: servicios.content.badge,
      title: servicios.content.title,
      description: servicios.content.description,
      buttonText: servicios.content.buttonText,
      buttonLink: servicios.content.buttonLink,
      cards: servicios.content.cards.map((card, index) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        image: card.image,
        order: index + 1,
        active: card.visible,
      })),
    };
  }

  if (compromiso && isCompromisoContent(compromiso.content)) {
    base.commitmentSection = {
      badge: compromiso.content.badge,
      title: compromiso.content.title,
      description: compromiso.content.description,
      primaryButtonText: compromiso.content.primaryButtonText,
      primaryButtonLink: compromiso.content.primaryButtonLink,
      secondaryButtonText: compromiso.content.secondaryButtonText,
      secondaryButtonLink: compromiso.content.secondaryButtonLink,
      featureBlocks: compromiso.content.featureBlocks
        .filter((block) => block.visible)
        .map((block) => ({
          title: block.title,
          description: block.text,
        })),
      mainImage: {
        image: compromiso.content.mainImage.image,
        alt: compromiso.content.mainImage.title,
        title: compromiso.content.mainImage.title,
        subtitle: compromiso.content.mainImage.subtitle,
      },
      sideImages: compromiso.content.sideImages
        .filter((image) => image.visible)
        .map((image) => ({
          image: image.image,
          alt: image.title,
          title: image.title,
          subtitle: image.subtitle,
        })),
    };
  }

  if (cta && isCtaContent(cta.content)) {
    base.ctaSection = {
      title: cta.content.title,
      primaryButtonText: cta.content.buttonText,
      primaryButtonLink: cta.content.link,
      secondaryButtonText: "Llamar",
      secondaryButtonLink: "/contacto",
      footerText: cta.content.description,
    };
  }

  base.updatedAt = new Date().toISOString();

  return base;
}

async function persistHomeContent(currentModules: HomeModule[]) {
  const nextHomeContent = buildHomeContentFromModules(currentModules);

  const response = await fetch("/api/admin/home", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nextHomeContent),
  });

  if (!response.ok) {
    throw new Error("No fue posible guardar Home en la API.");
  }

  const payload = (await response.json()) as unknown;
  return resolveHomeContent(payload);
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
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
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

function SectionShell({ title, children }: { title: string; children: ReactNode }) {
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
  onSave: () => void;
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

function handleImageFile(
  event: ChangeEvent<HTMLInputElement>,
  onReady: (dataUrl: string) => void
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      onReady(reader.result);
    }
  };
  reader.readAsDataURL(file);
}

function ImageUploader({
  label,
  image,
  onChange,
  heightClass = "h-44",
}: {
  label: string;
  image: string;
  onChange: (value: string) => void;
  heightClass?: string;
}) {
  return (
    <div className="space-y-4 rounded-[24px] border border-[#e7dcc9] bg-[linear-gradient(180deg,#fffdfa_0%,#f8f2e8_100%)] p-4 shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#2d3b52]">{label}</p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-[#d9ccb6] bg-white px-4 py-2.5 text-sm font-semibold text-[#314058] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff8ed]">
          <Upload className="h-4 w-4" />
          Subir imagen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleImageFile(event, onChange)}
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

function PreviewModule({ content, moduleKey }: { content: ModuleContent; moduleKey: ModuleKey }) {
  if (moduleKey === "hero" && isHeroContent(content)) {
    const activeSlide =
      content.slides.find((slide) => slide.id === content.activeSlideId && slide.active) ??
      content.slides.find((slide) => slide.active) ??
      content.slides[0];

    return (
      <section className="relative overflow-hidden rounded-[32px] border border-[#d8cdb8] bg-[#151515] text-white">
        <img
          src={activeSlide?.image || ""}
          alt={activeSlide?.title || content.titleWhite}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.86)_0%,rgba(10,10,10,0.62)_48%,rgba(10,10,10,0.72)_100%)]" />
        <div className="relative z-10 grid gap-8 p-6 xl:grid-cols-[1.05fr_0.62fr] xl:items-start">
          <div>
            <span className="inline-flex rounded-full border border-[#b6932c]/40 bg-[#1a1712]/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e9c85e]">
              {content.badge}
            </span>
            <h3 className="mt-5 text-4xl font-black leading-none md:text-5xl">
              {content.titleWhite}
              <span className="mt-2 block text-[#d4a62a]">{content.titleGold}</span>
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
              {content.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31]">
                {content.primaryButtonText}
              </span>
              <span className="rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                {content.secondaryButtonText}
              </span>
            </div>
            <ul className="mt-6 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
              {content.benefits.map((benefit) => (
                <li key={benefit.id}>✓ {benefit.text}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-[rgba(34,24,14,0.58)] p-5 backdrop-blur-md">
            <h4 className="text-3xl font-bold text-white">{content.quickFactsTitle}</h4>
            <div className="mt-4 divide-y divide-white/12">
              {content.quickFacts.map((fact) => (
                <div key={fact.id} className="grid grid-cols-[0.8fr_1.2fr] gap-3 py-4 text-sm">
                  <span className="text-slate-200">{fact.label}</span>
                  <span className="font-semibold text-white">{fact.value}</span>
                </div>
              ))}
            </div>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#d4a62a]">
              {content.quickFactsLinkText}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (moduleKey === "desarrollo" && isDesarrolloContent(content)) {
    return (
      <section className="relative overflow-hidden rounded-[32px] border border-[#ddd1bc] bg-[#f3f0ea] p-6">
        <img
          src={content.backgroundImage}
          alt={content.title}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="relative z-10 grid gap-5 xl:grid-cols-[1.05fr_0.62fr]">
          <div className="space-y-5">
            <div className="max-w-3xl rounded-[30px] bg-[rgba(255,255,255,0.78)] p-6 shadow-sm backdrop-blur-sm">
              <span className="inline-flex rounded-full border border-[#dcc47d] bg-[#fff7e6] px-4 py-2 text-[11px] font-semibold text-[#b07f13]">
                {content.badge}
              </span>
              <h3 className="mt-4 text-4xl font-black leading-tight text-[#17120f]">
                {content.title}
              </h3>
              <p className="mt-2 text-lg text-[#6a5f53]">{content.subtitle}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.cards.filter((card) => card.active).map((card) => (
                <article
                  key={card.id}
                  className="overflow-hidden rounded-[24px] bg-[rgba(255,255,255,0.84)] shadow-sm backdrop-blur-sm"
                >
                  <img src={card.image} alt={card.title} className="h-52 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xl font-bold text-[#22201c]">{card.title}</p>
                    <p className="mt-1 text-sm text-[#b07f13]">{card.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="self-start rounded-[28px] bg-[rgba(255,255,255,0.72)] p-5 shadow-sm backdrop-blur-sm">
            <ul className="space-y-5 text-xl text-[#4f483f]">
              {content.points.map((point) => (
                <li key={point.id}>• {point.text}</li>
              ))}
            </ul>
            <span className="mt-8 inline-flex rounded-full bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31]">
              {content.buttonText}
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (moduleKey === "servicios" && isServicesContent(content)) {
    return (
      <section className="space-y-5 rounded-[32px] border border-[#e2d9cd] bg-[#f7f4ef] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-[#dcc47d] bg-[#fff7e6] px-4 py-2 text-[11px] font-semibold text-[#b07f13]">
              {content.badge}
            </span>
            <h3 className="mt-4 text-4xl font-black text-[#17120f]">{content.title}</h3>
            <p className="mt-3 max-w-3xl text-lg text-[#5f5448]">{content.description}</p>
          </div>
          <span className="inline-flex rounded-[18px] bg-[#1d1713] px-6 py-4 text-base font-semibold text-white">
            {content.buttonText}
          </span>
        </div>
        <div className="grid gap-5 xl:grid-cols-4">
          {content.cards.filter((card) => card.visible).map((card) => (
            <article key={card.id} className="overflow-hidden rounded-[26px] bg-white shadow-sm">
              <img src={card.image} alt={card.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h4 className="text-[1.7rem] font-bold leading-tight text-[#17120f]">
                  {card.title}
                </h4>
                <p className="mt-3 text-base leading-8 text-[#5f5448]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (moduleKey === "compromiso" && isCompromisoContent(content)) {
    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[#f8f5f0] p-6">
        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#dcc47d] bg-[#fff7e6] px-4 py-2 text-[11px] font-semibold text-[#b07f13]">
              {content.badge}
            </span>
            <h3 className="mt-4 text-4xl font-black text-[#17120f]">{content.title}</h3>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5f5448]">
              {content.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-[18px] bg-[#1d1713] px-5 py-3 text-base font-semibold text-white">
                {content.primaryButtonText}
              </span>
              <span className="rounded-[18px] bg-[#d4a62a] px-5 py-3 text-base font-semibold text-[#111d31]">
                {content.secondaryButtonText}
              </span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {content.featureBlocks
                .filter((block) => block.visible)
                .map((block) => (
                  <article key={block.id} className="rounded-[22px] bg-[#f0eae2] p-5">
                    <h4 className="text-2xl font-bold text-[#17120f]">{block.title}</h4>
                    <p className="mt-2 text-base leading-7 text-[#5f5448]">{block.text}</p>
                  </article>
                ))}
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            {content.mainImage.visible && (
              <article className="relative overflow-hidden rounded-[30px]">
                <img
                  src={content.mainImage.image}
                  alt={content.mainImage.title}
                  className="h-full min-h-[460px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-2xl font-bold">{content.mainImage.title}</p>
                  <p className="mt-2 text-base">{content.mainImage.subtitle}</p>
                </div>
              </article>
            )}
            <div className="grid gap-4">
              {content.sideImages
                .filter((image) => image.visible)
                .map((image) => (
                  <article key={image.id} className="relative overflow-hidden rounded-[26px]">
                    <img
                      src={image.image}
                      alt={image.title}
                      className="h-[220px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-xl font-bold">{image.title}</p>
                      <p className="mt-1 text-sm">{image.subtitle}</p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (moduleKey === "cta" && isCtaContent(content)) {
    return (
      <section className="rounded-[32px] border border-[#e2d9cd] bg-[linear-gradient(135deg,#111827,#1f2937)] p-6 text-white">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-[#d4a62a]/40 bg-[#d4a62a]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f4d78e]">
              Cierre del Home
            </span>
            <h3 className="mt-4 text-4xl font-black">{content.title}</h3>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
              {content.description}
            </p>
          </div>
          <span className="inline-flex rounded-full bg-[#d4a62a] px-6 py-3 text-sm font-semibold text-[#111d31]">
            {content.buttonText}
          </span>
        </div>
      </section>
    );
  }

  return null;
}

function renderModuleEditor(
  moduleKey: ModuleKey,
  content: ModuleContent,
  setDraftContent: Dispatch<SetStateAction<ModuleContent | null>>
) {
  if (moduleKey === "hero" && isHeroContent(content)) {
    const activeSlide =
      content.slides.find((slide) => slide.id === content.activeSlideId) ?? content.slides[0];

    return (
      <div className="space-y-5">
        <SectionShell title="Encabezado principal">
          <Field
            label="Badge"
            value={content.badge}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isHeroContent(current) ? { ...current, badge: value } : current
              )
            }
          />
          <Field
            label="Título blanco"
            value={content.titleWhite}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isHeroContent(current) ? { ...current, titleWhite: value } : current
              )
            }
          />
          <Field
            label="Título dorado"
            value={content.titleGold}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isHeroContent(current) ? { ...current, titleGold: value } : current
              )
            }
          />
          <TextAreaField
            label="Descripción"
            value={content.description}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isHeroContent(current) ? { ...current, description: value } : current
              )
            }
          />
        </SectionShell>

        <SectionShell title="Botones">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto botón principal"
              value={content.primaryButtonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, primaryButtonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace botón principal"
              value={content.primaryButtonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, primaryButtonLink: value }
                    : current
                )
              }
            />
            <Field
              label="Texto botón secundario"
              value={content.secondaryButtonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, secondaryButtonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace botón secundario"
              value={content.secondaryButtonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, secondaryButtonLink: value }
                    : current
                )
              }
            />
          </div>
        </SectionShell>

        <SectionShell title="Beneficios del lado izquierdo">
          <div className="space-y-3">
            {content.benefits.map((benefit, index) => (
              <div key={benefit.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <Field
                    label={`Beneficio ${index + 1}`}
                    value={benefit.text}
                    onChange={(value) =>
                      setDraftContent((current) => {
                        if (!current || !isHeroContent(current)) return current;
                        const next = [...current.benefits];
                        next[index] = { ...next[index], text: value };
                        return { ...current, benefits: next };
                      })
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraftContent((current) => {
                      if (!current || !isHeroContent(current)) return current;
                      return {
                        ...current,
                        benefits: current.benefits.filter((item) => item.id !== benefit.id),
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
                setDraftContent((current) => {
                  if (!current || !isHeroContent(current)) return current;
                  return {
                    ...current,
                    benefits: [
                      ...current.benefits,
                      { id: `benefit-${Date.now()}`, text: "Nuevo beneficio" },
                    ],
                  };
                })
              }
              className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
            >
              <Plus className="h-4 w-4" />
              Agregar beneficio
            </button>
          </div>
        </SectionShell>

        <SectionShell title="Panel de datos rápidos">
          <Field
            label="Título del panel"
            value={content.quickFactsTitle}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isHeroContent(current)
                  ? { ...current, quickFactsTitle: value }
                  : current
              )
            }
          />
          <div className="grid gap-3">
            {content.quickFacts.map((fact, index) => (
              <div key={fact.id} className="grid gap-3 md:grid-cols-[0.9fr_1.1fr_auto]">
                <Field
                  label={`Etiqueta ${index + 1}`}
                  value={fact.label}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isHeroContent(current)) return current;
                      const next = [...current.quickFacts];
                      next[index] = { ...next[index], label: value };
                      return { ...current, quickFacts: next };
                    })
                  }
                />
                <Field
                  label={`Valor ${index + 1}`}
                  value={fact.value}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isHeroContent(current)) return current;
                      const next = [...current.quickFacts];
                      next[index] = { ...next[index], value };
                      return { ...current, quickFacts: next };
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraftContent((current) => {
                      if (!current || !isHeroContent(current)) return current;
                      return {
                        ...current,
                        quickFacts: current.quickFacts.filter((item) => item.id !== fact.id),
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
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                setDraftContent((current) => {
                  if (!current || !isHeroContent(current)) return current;
                  return {
                    ...current,
                    quickFacts: [
                      ...current.quickFacts,
                      {
                        id: `fact-${Date.now()}`,
                        label: "Nueva etiqueta",
                        value: "Nuevo valor",
                      },
                    ],
                  };
                })
              }
              className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
            >
              <Plus className="h-4 w-4" />
              Agregar dato rápido
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto enlace del panel"
              value={content.quickFactsLinkText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, quickFactsLinkText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace del panel"
              value={content.quickFactsLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isHeroContent(current)
                    ? { ...current, quickFactsLink: value }
                    : current
                )
              }
            />
          </div>
        </SectionShell>

        <SectionShell title="Imágenes del hero / slides">
          <div className="space-y-4">
            {content.slides.map((slide, index) => (
              <div key={slide.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label={`Título slide ${index + 1}`}
                    value={slide.title}
                    onChange={(value) =>
                      setDraftContent((current) => {
                        if (!current || !isHeroContent(current)) return current;
                        const next = [...current.slides];
                        next[index] = { ...next[index], title: value };
                        return { ...current, slides: next };
                      })
                    }
                  />
                  <div className="flex items-end gap-3">
                    <ToggleField
                      label="Slide activo"
                      checked={slide.active}
                      onChange={(value) =>
                        setDraftContent((current) => {
                          if (!current || !isHeroContent(current)) return current;
                          const next = [...current.slides];
                          next[index] = { ...next[index], active: value };
                          const nextActiveId = value ? slide.id : current.activeSlideId;
                          return { ...current, slides: next, activeSlideId: nextActiveId };
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDraftContent((current) => {
                          if (!current || !isHeroContent(current)) return current;
                          const filtered = current.slides.filter((item) => item.id !== slide.id);
                          return {
                            ...current,
                            slides: filtered,
                            activeSlideId:
                              current.activeSlideId === slide.id && filtered[0]
                                ? filtered[0].id
                                : current.activeSlideId,
                          };
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadfcd] text-slate-500 hover:bg-[#faf7f1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
                  <ImageUploader
                    label="Imagen del slide"
                    image={slide.image}
                    onChange={(value) =>
                      setDraftContent((current) => {
                        if (!current || !isHeroContent(current)) return current;
                        const next = [...current.slides];
                        next[index] = { ...next[index], image: value };
                        return { ...current, slides: next };
                      })
                    }
                    heightClass="h-36"
                  />
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDraftContent((current) =>
                          current && isHeroContent(current)
                            ? { ...current, activeSlideId: slide.id }
                            : current
                        )
                      }
                      className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                        activeSlide?.id === slide.id
                          ? "bg-[#d4a62a] text-[#111d31]"
                          : "border border-[#ddd1bc] bg-white text-[#3a465a]"
                      }`}
                    >
                      Usar en preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setDraftContent((current) => {
                  if (!current || !isHeroContent(current)) return current;
                  const newSlide: HeroSlide = {
                    id: `hero-slide-${Date.now()}`,
                    title: "Nuevo slide",
                    image: "",
                    active: true,
                  };
                  return {
                    ...current,
                    slides: [...current.slides, newSlide],
                    activeSlideId: newSlide.id,
                  };
                })
              }
              className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
            >
              <Plus className="h-4 w-4" />
              Agregar slide
            </button>
          </div>
        </SectionShell>
      </div>
    );
  }

  if (moduleKey === "desarrollo" && isDesarrolloContent(content)) {
    return (
      <div className="space-y-5">
        <SectionShell title="Encabezado de la sección">
          <Field
            label="Badge"
            value={content.badge}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isDesarrolloContent(current) ? { ...current, badge: value } : current
              )
            }
          />
          <Field
            label="Título"
            value={content.title}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isDesarrolloContent(current) ? { ...current, title: value } : current
              )
            }
          />
          <TextAreaField
            label="Subtítulo"
            value={content.subtitle}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isDesarrolloContent(current)
                  ? { ...current, subtitle: value }
                  : current
              )
            }
          />
        </SectionShell>

        <SectionShell title="Imagen de fondo de la sección">
          <ImageUploader
            label="Fondo de Desarrollo principal"
            image={content.backgroundImage}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isDesarrolloContent(current)
                  ? { ...current, backgroundImage: value }
                  : current
              )
            }
          />
        </SectionShell>

        <SectionShell title="Lista lateral">
          {content.points.map((point, index) => (
            <div key={point.id} className="flex items-center gap-3">
              <div className="flex-1">
                <Field
                  label={`Punto ${index + 1}`}
                  value={point.text}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      const nextPoints = [...current.points];
                      nextPoints[index] = { ...nextPoints[index], text: value };
                      return { ...current, points: nextPoints };
                    })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setDraftContent((current) => {
                    if (!current || !isDesarrolloContent(current)) return current;
                    return {
                      ...current,
                      points: current.points.filter((item) => item.id !== point.id),
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
              setDraftContent((current) => {
                if (!current || !isDesarrolloContent(current)) return current;
                return {
                  ...current,
                  points: [
                    ...current.points,
                    { id: `point-${Date.now()}`, text: "Nuevo punto" },
                  ],
                };
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
          >
            <Plus className="h-4 w-4" />
            Agregar punto
          </button>
        </SectionShell>

        <SectionShell title="Botón de sección">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto del botón"
              value={content.buttonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isDesarrolloContent(current)
                    ? { ...current, buttonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace del botón"
              value={content.buttonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isDesarrolloContent(current)
                    ? { ...current, buttonLink: value }
                    : current
                )
              }
            />
          </div>
        </SectionShell>

        <SectionShell title="Tarjetas visuales">
          {content.cards.map((card, index) => (
            <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Título de tarjeta"
                  value={card.title}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], title: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
                <Field
                  label="Subtítulo / etiqueta"
                  value={card.subtitle}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], subtitle: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <ImageUploader
                  label="Imagen de la tarjeta"
                  image={card.image}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], image: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                  heightClass="h-36"
                />
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <ToggleField
                  label="Tarjeta activa"
                  checked={card.active}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], active: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    setDraftContent((current) => {
                      if (!current || !isDesarrolloContent(current)) return current;
                      return {
                        ...current,
                        cards: current.cards.filter((item) => item.id !== card.id),
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
              setDraftContent((current) => {
                if (!current || !isDesarrolloContent(current)) return current;
                return {
                  ...current,
                  cards: [
                    ...current.cards,
                    {
                      id: `dev-card-${Date.now()}`,
                      title: "Nueva tarjeta",
                      subtitle: "Nueva etiqueta",
                      image: "",
                      active: true,
                    },
                  ],
                };
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
          >
            <Plus className="h-4 w-4" />
            Agregar tarjeta
          </button>
        </SectionShell>
      </div>
    );
  }

  if (moduleKey === "servicios" && isServicesContent(content)) {
    return (
      <div className="space-y-5">
        <SectionShell title="Encabezado de la sección">
          <Field
            label="Badge"
            value={content.badge}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isServicesContent(current) ? { ...current, badge: value } : current
              )
            }
          />
          <Field
            label="Título"
            value={content.title}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isServicesContent(current) ? { ...current, title: value } : current
              )
            }
          />
          <TextAreaField
            label="Descripción"
            value={content.description}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isServicesContent(current)
                  ? { ...current, description: value }
                  : current
              )
            }
          />
        </SectionShell>

        <SectionShell title="Botón de la sección">
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto del botón"
              value={content.buttonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isServicesContent(current)
                    ? { ...current, buttonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace del botón"
              value={content.buttonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isServicesContent(current)
                    ? { ...current, buttonLink: value }
                    : current
                )
              }
            />
          </div>
        </SectionShell>

        <SectionShell title="Tarjetas de servicios">
          {content.cards.map((card, index) => (
            <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Nombre del servicio"
                  value={card.title}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], title: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
                <ToggleField
                  label="Visible"
                  checked={card.visible}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], visible: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <TextAreaField
                  label="Descripción del servicio"
                  value={card.description}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], description: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <ImageUploader
                  label="Imagen del servicio"
                  image={card.image}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      const nextCards = [...current.cards];
                      nextCards[index] = { ...nextCards[index], image: value };
                      return { ...current, cards: nextCards };
                    })
                  }
                  heightClass="h-36"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      return {
                        ...current,
                        cards: current.cards.filter((item) => item.id !== card.id),
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
              setDraftContent((current) => {
                if (!current || !isServicesContent(current)) return current;
                return {
                  ...current,
                  cards: [
                    ...current.cards,
                    {
                      id: `service-${Date.now()}`,
                      title: "Nuevo servicio",
                      description: "Descripción del nuevo servicio.",
                      image: "",
                      visible: true,
                    },
                  ],
                };
              })
            }
            className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-[#3a465a]"
          >
            <Plus className="h-4 w-4" />
            Agregar servicio
          </button>
        </SectionShell>
      </div>
    );
  }

  if (moduleKey === "compromiso" && isCompromisoContent(content)) {
    return (
      <div className="space-y-5">
        <SectionShell title="Encabezado y botones">
          <Field
            label="Badge"
            value={content.badge}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current) ? { ...current, badge: value } : current
              )
            }
          />
          <Field
            label="Título"
            value={content.title}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current) ? { ...current, title: value } : current
              )
            }
          />
          <TextAreaField
            label="Descripción"
            value={content.description}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current)
                  ? { ...current, description: value }
                  : current
              )
            }
            rows={5}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto botón principal"
              value={content.primaryButtonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCompromisoContent(current)
                    ? { ...current, primaryButtonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace botón principal"
              value={content.primaryButtonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCompromisoContent(current)
                    ? { ...current, primaryButtonLink: value }
                    : current
                )
              }
            />
            <Field
              label="Texto botón secundario"
              value={content.secondaryButtonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCompromisoContent(current)
                    ? { ...current, secondaryButtonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace botón secundario"
              value={content.secondaryButtonLink}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCompromisoContent(current)
                    ? { ...current, secondaryButtonLink: value }
                    : current
                )
              }
            />
          </div>
        </SectionShell>

        <SectionShell title="Bloques de apoyo inferiores">
          {content.featureBlocks.map((block, index) => (
            <div key={block.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label={`Título bloque ${index + 1}`}
                  value={block.title}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.featureBlocks];
                      next[index] = { ...next[index], title: value };
                      return { ...current, featureBlocks: next };
                    })
                  }
                />
                <ToggleField
                  label="Visible"
                  checked={block.visible}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.featureBlocks];
                      next[index] = { ...next[index], visible: value };
                      return { ...current, featureBlocks: next };
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <TextAreaField
                  label="Texto del bloque"
                  value={block.text}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.featureBlocks];
                      next[index] = { ...next[index], text: value };
                      return { ...current, featureBlocks: next };
                    })
                  }
                />
              </div>
            </div>
          ))}
        </SectionShell>

        <SectionShell title="Imagen principal grande">
          <Field
            label="Título de la imagen principal"
            value={content.mainImage.title}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current)
                  ? { ...current, mainImage: { ...current.mainImage, title: value } }
                  : current
              )
            }
          />
          <Field
            label="Subtítulo de la imagen principal"
            value={content.mainImage.subtitle}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current)
                  ? { ...current, mainImage: { ...current.mainImage, subtitle: value } }
                  : current
              )
            }
          />
          <ImageUploader
            label="Imagen principal"
            image={content.mainImage.image}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCompromisoContent(current)
                  ? { ...current, mainImage: { ...current.mainImage, image: value } }
                  : current
              )
            }
            heightClass="h-56"
          />
        </SectionShell>

        <SectionShell title="Imágenes secundarias">
          {content.sideImages.map((image, index) => (
            <div key={image.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label={`Título imagen ${index + 1}`}
                  value={image.title}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.sideImages];
                      next[index] = { ...next[index], title: value };
                      return { ...current, sideImages: next };
                    })
                  }
                />
                <Field
                  label={`Subtítulo imagen ${index + 1}`}
                  value={image.subtitle}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.sideImages];
                      next[index] = { ...next[index], subtitle: value };
                      return { ...current, sideImages: next };
                    })
                  }
                />
              </div>
              <div className="mt-4">
                <ImageUploader
                  label={`Imagen secundaria ${index + 1}`}
                  image={image.image}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isCompromisoContent(current)) return current;
                      const next = [...current.sideImages];
                      next[index] = { ...next[index], image: value };
                      return { ...current, sideImages: next };
                    })
                  }
                  heightClass="h-36"
                />
              </div>
            </div>
          ))}
        </SectionShell>
      </div>
    );
  }

  if (moduleKey === "cta" && isCtaContent(content)) {
    return (
      <div className="space-y-5">
        <SectionShell title="Contenido del CTA final">
          <Field
            label="Título"
            value={content.title}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCtaContent(current) ? { ...current, title: value } : current
              )
            }
          />
          <TextAreaField
            label="Descripción"
            value={content.description}
            onChange={(value) =>
              setDraftContent((current) =>
                current && isCtaContent(current)
                  ? { ...current, description: value }
                  : current
              )
            }
            rows={5}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Texto del botón"
              value={content.buttonText}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCtaContent(current)
                    ? { ...current, buttonText: value }
                    : current
                )
              }
            />
            <Field
              label="Enlace"
              value={content.link}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isCtaContent(current) ? { ...current, link: value } : current
                )
              }
            />
          </div>
        </SectionShell>
      </div>
    );
  }

  return null;
}

export default function AdminHomePage() {
  const initialHomeContent = useMemo(() => DEFAULT_HOME_CONTENT, []);
  const [modules, setModules] = useState<HomeModule[]>(() =>
    createModulesFromHomeContent(initialHomeContent)
  );
  const [lastUpdated, setLastUpdated] = useState<Date>(
    () =>
      initialHomeContent.updatedAt
        ? new Date(initialHomeContent.updatedAt)
        : new Date()
  );

  useEffect(() => {
    let mounted = true;

    const loadHomeFromApi = async () => {
      try {
        const response = await fetch("/api/admin/home", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("No fue posible cargar Home desde la API.");
        }

        const payload = (await response.json()) as unknown;
        const normalized = resolveHomeContent(payload);
        if (!mounted) return;

        setModules(createModulesFromHomeContent(normalized));
        setLastUpdated(new Date(normalized.updatedAt));
      } catch (error) {
        console.error("No fue posible cargar Home desde Neon.", error);
      }
    };

    void loadHomeFromApi();

    return () => {
      mounted = false;
    };
  }, []);

  const heroModule = useMemo(
    () => modules.find((module) => module.key === "hero") ?? null,
    [modules]
  );

  const desarrolloModule = useMemo(
    () => modules.find((module) => module.key === "desarrollo") ?? null,
    [modules]
  );

  const serviciosModule = useMemo(
    () => modules.find((module) => module.key === "servicios") ?? null,
    [modules]
  );

  const compromisoModule = useMemo(
    () => modules.find((module) => module.key === "compromiso") ?? null,
    [modules]
  );

  const ctaModule = useMemo(
    () => modules.find((module) => module.key === "cta") ?? null,
    [modules]
  );

  const [isInlineHeroEditing, setIsInlineHeroEditing] = useState(false);
  const [inlineHeroDraft, setInlineHeroDraft] = useState<HeroContent | null>(null);

  const [isInlineDesarrolloEditing, setIsInlineDesarrolloEditing] = useState(false);
  const [inlineDesarrolloDraft, setInlineDesarrolloDraft] =
    useState<DesarrolloContent | null>(null);

  const [isInlineServiciosEditing, setIsInlineServiciosEditing] = useState(false);
  const [inlineServiciosDraft, setInlineServiciosDraft] =
    useState<ServicesContent | null>(null);

  const [isInlineCompromisoEditing, setIsInlineCompromisoEditing] = useState(false);
  const [inlineCompromisoDraft, setInlineCompromisoDraft] =
    useState<CompromisoContent | null>(null);

  const [isInlineCtaEditing, setIsInlineCtaEditing] = useState(false);
  const [inlineCtaDraft, setInlineCtaDraft] = useState<CtaContent | null>(null);

  const openInlineHeroEditor = () => {
    if (!heroModule || !isHeroContent(heroModule.content)) return;
    setInlineHeroDraft(cloneTypedContent(heroModule.content));
    setIsInlineHeroEditing(true);
  };

  const cancelInlineHeroEditor = () => {
    if (!heroModule || !isHeroContent(heroModule.content)) {
      setIsInlineHeroEditing(false);
      return;
    }
    setInlineHeroDraft(cloneTypedContent(heroModule.content));
    setIsInlineHeroEditing(false);
  };

  const saveInlineHeroEditor = async () => {
    if (!inlineHeroDraft) return;

    const nextModules = modules.map((module) =>
      module.key === "hero"
        ? { ...module, content: cloneTypedContent(inlineHeroDraft) }
        : module
    );

    setModules(nextModules);
    const savedContent = await persistHomeContent(nextModules);
    setLastUpdated(new Date(savedContent.updatedAt));
    setIsInlineHeroEditing(false);
  };

  const setInlineHeroDraftAsModule: Dispatch<SetStateAction<ModuleContent | null>> = (
    value
  ) => {
    setInlineHeroDraft((current) => {
      if (typeof value === "function") {
        const computed = (
          value as (prevState: ModuleContent | null) => ModuleContent | null
        )(current);
        return computed && isHeroContent(computed) ? computed : current;
      }
      return value && isHeroContent(value) ? value : current;
    });
  };

  const openInlineDesarrolloEditor = () => {
    if (!desarrolloModule || !isDesarrolloContent(desarrolloModule.content)) return;
    setInlineDesarrolloDraft(cloneTypedContent(desarrolloModule.content));
    setIsInlineDesarrolloEditing(true);
  };

  const cancelInlineDesarrolloEditor = () => {
    if (!desarrolloModule || !isDesarrolloContent(desarrolloModule.content)) {
      setIsInlineDesarrolloEditing(false);
      return;
    }
    setInlineDesarrolloDraft(cloneTypedContent(desarrolloModule.content));
    setIsInlineDesarrolloEditing(false);
  };

  const saveInlineDesarrolloEditor = async () => {
    if (!inlineDesarrolloDraft) return;

    const nextModules = modules.map((module) =>
      module.key === "desarrollo"
        ? { ...module, content: cloneTypedContent(inlineDesarrolloDraft) }
        : module
    );

    setModules(nextModules);
    const savedContent = await persistHomeContent(nextModules);
    setLastUpdated(new Date(savedContent.updatedAt));
    setIsInlineDesarrolloEditing(false);
  };

  const setInlineDesarrolloDraftAsModule: Dispatch<
    SetStateAction<ModuleContent | null>
  > = (value) => {
    setInlineDesarrolloDraft((current) => {
      if (typeof value === "function") {
        const computed = (
          value as (prevState: ModuleContent | null) => ModuleContent | null
        )(current);
        return computed && isDesarrolloContent(computed) ? computed : current;
      }
      return value && isDesarrolloContent(value) ? value : current;
    });
  };

  const openInlineServiciosEditor = () => {
    if (!serviciosModule || !isServicesContent(serviciosModule.content)) return;
    setInlineServiciosDraft(cloneTypedContent(serviciosModule.content));
    setIsInlineServiciosEditing(true);
  };

  const cancelInlineServiciosEditor = () => {
    if (!serviciosModule || !isServicesContent(serviciosModule.content)) {
      setIsInlineServiciosEditing(false);
      return;
    }
    setInlineServiciosDraft(cloneTypedContent(serviciosModule.content));
    setIsInlineServiciosEditing(false);
  };

  const saveInlineServiciosEditor = async () => {
    if (!inlineServiciosDraft) return;

    const nextModules = modules.map((module) =>
      module.key === "servicios"
        ? { ...module, content: cloneTypedContent(inlineServiciosDraft) }
        : module
    );

    setModules(nextModules);
    const savedContent = await persistHomeContent(nextModules);
    setLastUpdated(new Date(savedContent.updatedAt));
    setIsInlineServiciosEditing(false);
  };

  const setInlineServiciosDraftAsModule: Dispatch<
    SetStateAction<ModuleContent | null>
  > = (value) => {
    setInlineServiciosDraft((current) => {
      if (typeof value === "function") {
        const computed = (
          value as (prevState: ModuleContent | null) => ModuleContent | null
        )(current);
        return computed && isServicesContent(computed) ? computed : current;
      }
      return value && isServicesContent(value) ? value : current;
    });
  };

  const openInlineCompromisoEditor = () => {
    if (!compromisoModule || !isCompromisoContent(compromisoModule.content)) return;
    setInlineCompromisoDraft(cloneTypedContent(compromisoModule.content));
    setIsInlineCompromisoEditing(true);
  };

  const cancelInlineCompromisoEditor = () => {
    if (!compromisoModule || !isCompromisoContent(compromisoModule.content)) {
      setIsInlineCompromisoEditing(false);
      return;
    }
    setInlineCompromisoDraft(cloneTypedContent(compromisoModule.content));
    setIsInlineCompromisoEditing(false);
  };

  const saveInlineCompromisoEditor = async () => {
    if (!inlineCompromisoDraft) return;

    const nextModules = modules.map((module) =>
      module.key === "compromiso"
        ? { ...module, content: cloneTypedContent(inlineCompromisoDraft) }
        : module
    );

    setModules(nextModules);
    const savedContent = await persistHomeContent(nextModules);
    setLastUpdated(new Date(savedContent.updatedAt));
    setIsInlineCompromisoEditing(false);
  };

  const setInlineCompromisoDraftAsModule: Dispatch<
    SetStateAction<ModuleContent | null>
  > = (value) => {
    setInlineCompromisoDraft((current) => {
      if (typeof value === "function") {
        const computed = (
          value as (prevState: ModuleContent | null) => ModuleContent | null
        )(current);
        return computed && isCompromisoContent(computed) ? computed : current;
      }
      return value && isCompromisoContent(value) ? value : current;
    });
  };

  const openInlineCtaEditor = () => {
    if (!ctaModule || !isCtaContent(ctaModule.content)) return;
    setInlineCtaDraft(cloneTypedContent(ctaModule.content));
    setIsInlineCtaEditing(true);
  };

  const cancelInlineCtaEditor = () => {
    if (!ctaModule || !isCtaContent(ctaModule.content)) {
      setIsInlineCtaEditing(false);
      return;
    }
    setInlineCtaDraft(cloneTypedContent(ctaModule.content));
    setIsInlineCtaEditing(false);
  };

  const saveInlineCtaEditor = async () => {
    if (!inlineCtaDraft) return;

    const nextModules = modules.map((module) =>
      module.key === "cta"
        ? { ...module, content: cloneTypedContent(inlineCtaDraft) }
        : module
    );

    setModules(nextModules);
    const savedContent = await persistHomeContent(nextModules);
    setLastUpdated(new Date(savedContent.updatedAt));
    setIsInlineCtaEditing(false);
  };

  const setInlineCtaDraftAsModule: Dispatch<SetStateAction<ModuleContent | null>> = (
    value
  ) => {
    setInlineCtaDraft((current) => {
      if (typeof value === "function") {
        const computed = (
          value as (prevState: ModuleContent | null) => ModuleContent | null
        )(current);
        return computed && isCtaContent(computed) ? computed : current;
      }
      return value && isCtaContent(value) ? value : current;
    });
  };

  const totalModules = modules.length;
  const activeModules = modules.filter((module) => module.status === "ACTIVE").length;
  const pendingModules = modules.filter((module) => module.status !== "ACTIVE").length;

  const overviewCards = [
    {
      label: "Total de módulos",
      value: String(totalModules),
      hint: "Secciones administrables del Home público.",
    },
    {
      label: "Módulos activos",
      value: String(activeModules),
      hint: "Actualmente visibles o listos para publicar.",
    },
    {
      label: "Pendientes por configurar",
      value: String(pendingModules),
      hint: "Bloques en preparación o sin contenido final.",
    },
    {
      label: "Última actualización",
      value: formatDate(lastUpdated),
      hint: "Guardado local conectado al Home público.",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          Panel alineado con Home público
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Administración de Home
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Aquí puedes administrar las mismas secciones que existen en la ventana pública:
          hero, desarrollo principal, servicios, compromiso y resultados y CTA final.
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

      {heroModule && isHeroContent(heroModule.content) && (
        <InlineEditorShell
          badge="Primer bloque visual"
          title="Hero principal"
          description="Edita la sección principal del Home con preview amplia, edición integrada y acciones al final del bloque."
          editLabel="Editar Hero"
          idleMessage="Este bloque ya guarda cambios y los refleja en la ventana pública del Home."
          isEditing={isInlineHeroEditing}
          onEdit={openInlineHeroEditor}
          onCancel={cancelInlineHeroEditor}
          onSave={saveInlineHeroEditor}
          preview={
            <PreviewModule
              content={inlineHeroDraft ?? heroModule.content}
              moduleKey="hero"
            />
          }
        >
          {inlineHeroDraft ? (
            <div className="space-y-5">
              {renderModuleEditor("hero", inlineHeroDraft, setInlineHeroDraftAsModule)}
            </div>
          ) : null}
        </InlineEditorShell>
      )}

      {desarrolloModule && isDesarrolloContent(desarrolloModule.content) && (
        <InlineEditorShell
          badge="Sección del desarrollo"
          title="Desarrollo principal"
          description="Aquí puedes editar el encabezado, el fondo, la lista lateral, el botón y las tarjetas visuales del desarrollo."
          editLabel="Editar Desarrollo"
          idleMessage="Esta sección también ya queda conectada con la Home pública."
          isEditing={isInlineDesarrolloEditing}
          onEdit={openInlineDesarrolloEditor}
          onCancel={cancelInlineDesarrolloEditor}
          onSave={saveInlineDesarrolloEditor}
          preview={
            <PreviewModule
              content={inlineDesarrolloDraft ?? desarrolloModule.content}
              moduleKey="desarrollo"
            />
          }
        >
          {inlineDesarrolloDraft ? (
            <div className="space-y-5">
              {renderModuleEditor(
                "desarrollo",
                inlineDesarrolloDraft,
                setInlineDesarrolloDraftAsModule
              )}
            </div>
          ) : null}
        </InlineEditorShell>
      )}

      {serviciosModule && isServicesContent(serviciosModule.content) && (
        <InlineEditorShell
          badge="Sección de servicios"
          title="Servicios"
          description="Edita el bloque de servicios del Home con una vista previa más visual y una edición más cómoda dentro de la página."
          editLabel="Editar Servicios"
          idleMessage="Este bloque ya escribe sus cambios en la configuración pública del Home."
          isEditing={isInlineServiciosEditing}
          onEdit={openInlineServiciosEditor}
          onCancel={cancelInlineServiciosEditor}
          onSave={saveInlineServiciosEditor}
          preview={
            <PreviewModule
              content={inlineServiciosDraft ?? serviciosModule.content}
              moduleKey="servicios"
            />
          }
        >
          {inlineServiciosDraft ? (
            <div className="space-y-5">
              {renderModuleEditor(
                "servicios",
                inlineServiciosDraft,
                setInlineServiciosDraftAsModule
              )}
            </div>
          ) : null}
        </InlineEditorShell>
      )}

      {compromisoModule && isCompromisoContent(compromisoModule.content) && (
        <InlineEditorShell
          badge="Sección de confianza"
          title="Compromiso y resultados"
          description="Aquí puedes editar el bloque de confianza, textos, botones, bloques de apoyo e imágenes principales y secundarias."
          editLabel="Editar Compromiso"
          idleMessage="Ahora esta sección ya no depende de texto hardcodeado y también se refleja en la Home pública."
          isEditing={isInlineCompromisoEditing}
          onEdit={openInlineCompromisoEditor}
          onCancel={cancelInlineCompromisoEditor}
          onSave={saveInlineCompromisoEditor}
          preview={
            <PreviewModule
              content={inlineCompromisoDraft ?? compromisoModule.content}
              moduleKey="compromiso"
            />
          }
        >
          {inlineCompromisoDraft ? (
            <div className="space-y-5">
              {renderModuleEditor(
                "compromiso",
                inlineCompromisoDraft,
                setInlineCompromisoDraftAsModule
              )}
            </div>
          ) : null}
        </InlineEditorShell>
      )}

      {ctaModule && isCtaContent(ctaModule.content) && (
        <InlineEditorShell
          badge="Cierre del Home"
          title="CTA final"
          description="Edita el bloque de cierre del Home para reforzar el mensaje final y la llamada a la acción."
          editLabel="Editar CTA"
          idleMessage="El CTA final también ya queda sincronizado con la Home pública."
          isEditing={isInlineCtaEditing}
          onEdit={openInlineCtaEditor}
          onCancel={cancelInlineCtaEditor}
          onSave={saveInlineCtaEditor}
          preview={
            <PreviewModule
              content={inlineCtaDraft ?? ctaModule.content}
              moduleKey="cta"
            />
          }
        >
          {inlineCtaDraft ? (
            <div className="space-y-5">
              {renderModuleEditor("cta", inlineCtaDraft, setInlineCtaDraftAsModule)}
            </div>
          ) : null}
        </InlineEditorShell>
      )}

      <section className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 text-sm leading-7 text-slate-600">
        <p className="font-semibold text-[#142033]">Guardado actual</p>
        <p className="mt-2">
          Los cambios se guardan exclusivamente por API en Neon mediante Prisma.
          Las imágenes nuevas que subas también se guardarán ahí como base64 temporalmente.
          Más adelante ya las podemos migrar a backend + almacenamiento real.
        </p>
      </section>
    </div>
  );
}
