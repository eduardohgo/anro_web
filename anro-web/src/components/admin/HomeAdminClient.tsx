"use client";

import {
  CheckCircle2,
  ImagePlus,
  Layers,
  RefreshCw,
  Save,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_HOME_CONTENT,
  HOME_CONTENT_STORAGE_KEY,
  HomeContentConfig,
  HomeSectionCard,
  parseStoredHomeContent,
} from "@/lib/home-content";

function cloneConfig(config: HomeContentConfig): HomeContentConfig {
  return {
    ...config,
    heroSlides: config.heroSlides.map((slide) => ({ ...slide })),
    desarrolloCards: config.desarrolloCards.map((card) => ({ ...card })),
    serviceCards: config.serviceCards.map((card) => ({ ...card })),
  };
}

export default function HomeAdminClient() {
  const [config, setConfig] = useState<HomeContentConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_HOME_CONTENT;
    return parseStoredHomeContent(window.localStorage.getItem(HOME_CONTENT_STORAGE_KEY));
  });

  const [feedback, setFeedback] = useState<{ tone: "success" | "info"; message: string } | null>(
    null
  );

  const summary = useMemo(
    () => [
      { label: "Slides hero", value: String(config.heroSlides.length) },
      { label: "Cards desarrollo", value: String(config.desarrolloCards.length) },
      { label: "Cards servicios", value: String(config.serviceCards.length) },
      {
        label: "Última actualización",
        value: new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(
          new Date(config.updatedAt)
        ),
      },
    ],
    [config]
  );

  const updateCard = (
    section: "desarrolloCards" | "serviceCards",
    id: string,
    field: keyof HomeSectionCard,
    value: string
  ) => {
    setConfig((prev) => ({
      ...prev,
      [section]: prev[section].map((card) => (card.id === id ? { ...card, [field]: value } : card)),
    }));
  };

  const updateHero = (id: string, field: "src" | "alt", value: string) => {
    setConfig((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)),
    }));
  };

  const saveChanges = () => {
    const next = { ...config, updatedAt: new Date().toISOString() };
    setConfig(next);
    window.localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(next));
    setFeedback({ tone: "success", message: "Cambios guardados. El Home público ya usa esta configuración." });
  };

  const resetDefaults = () => {
    const next = cloneConfig(DEFAULT_HOME_CONTENT);
    setConfig(next);
    window.localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(next));
    setFeedback({ tone: "info", message: "Se restauró la configuración predeterminada del Home." });
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          <Sparkles className="h-3.5 w-3.5" />
          Editor activo del Home
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">Administración de Home</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Desde esta vista puedes actualizar textos e imágenes visibles del inicio público sin tocar
          código. Los cambios se aplican al instante en el navegador.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-[#132035]">Hero principal y slides</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f0e4] px-4 py-1.5 text-xs font-semibold text-[#9f7822]">
            <ImagePlus className="h-3.5 w-3.5" />
            URLs de imágenes editables
          </span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {config.heroSlides.map((slide, index) => (
            <article key={slide.id} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4">
              <p className="text-sm font-semibold text-[#132035]">Slide {index + 1}</p>
              <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                URL de imagen
                <input
                  value={slide.src}
                  onChange={(event) => updateHero(slide.id, "src", event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#d4a62a]"
                  placeholder="/fraccionamiento/carrusel1.jpg"
                />
              </label>
              <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Texto alternativo
                <input
                  value={slide.alt}
                  onChange={(event) => updateHero(slide.id, "alt", event.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#d4a62a]"
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <EditableCardsSection
        title="Desarrollo principal"
        description="Edita las 3 cards destacadas del bloque de desarrollo."
        icon={<Wrench className="h-3.5 w-3.5" />}
        cards={config.desarrolloCards}
        onChange={(id, field, value) => updateCard("desarrolloCards", id, field, value)}
      />

      <EditableCardsSection
        title="Servicios destacados"
        description="Actualiza imagen, título y texto de cada servicio del Home."
        icon={<Layers className="h-3.5 w-3.5" />}
        cards={config.serviceCards}
        onChange={(id, field, value) => updateCard("serviceCards", id, field, value)}
      />

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e0d8cb] bg-[#fffdf9] p-5">
        <div>
          <p className="text-sm font-semibold text-[#132035]">Publicación manual</p>
          <p className="text-sm text-slate-600">Guarda para aplicar cambios en Home. Puedes restaurar valores por defecto.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={resetDefaults}
            className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-4 py-2.5 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
          >
            <RefreshCw className="h-4 w-4" />
            Restaurar
          </button>
          <button
            type="button"
            onClick={saveChanges}
            className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
          >
            <Save className="h-4 w-4" />
            Guardar cambios
          </button>
        </div>
      </section>

      {feedback ? (
        <div
          className={[
            "rounded-2xl border px-4 py-3 text-sm font-medium",
            feedback.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-slate-100 text-slate-700",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {feedback.message}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function EditableCardsSection({
  title,
  description,
  icon,
  cards,
  onChange,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  cards: HomeSectionCard[];
  onChange: (id: string, field: keyof HomeSectionCard, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-[#132035]">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f0e4] px-4 py-1.5 text-xs font-semibold text-[#9f7822]">
          {icon}
          Contenido editable
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article key={card.id} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Título
              <input
                value={card.title}
                onChange={(event) => onChange(card.id, "title", event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#d4a62a]"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              URL imagen
              <input
                value={card.image}
                onChange={(event) => onChange(card.id, "image", event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#d4a62a]"
              />
            </label>
            <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Descripción
              <textarea
                value={card.description}
                onChange={(event) => onChange(card.id, "description", event.target.value)}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#d4a62a]"
              />
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}
