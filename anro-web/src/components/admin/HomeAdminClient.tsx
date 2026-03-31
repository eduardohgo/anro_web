"use client";

import {
  CheckCircle2,
  CircleDashed,
  Eye,
  FilePenLine,
  Flame,
  Headphones,
  Images,
  Megaphone,
  Power,
  Rocket,
  Save,
  Sparkles,
  TimerReset,
  Wrench,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import {
  DEFAULT_HOME_CONTENT,
  HOME_CONTENT_STORAGE_KEY,
  HomeContentConfig,
  HomeSectionCard,
  parseStoredHomeContent,
} from "@/lib/home-content";

type ModuleStatus = "ACTIVE" | "COMING_SOON" | "UNCONFIGURED";
type EditableModuleKey = "hero" | "slides" | "desarrollo" | "servicios";
type ModuleKey = EditableModuleKey | "nosotros" | "metricas" | "podcast" | "cta";

interface ModuleItem {
  key: ModuleKey;
  name: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  status: ModuleStatus;
  editable: boolean;
}

const MODULES: ModuleItem[] = [
  {
    key: "hero",
    name: "Hero principal",
    description: "Controla titular, subtítulo, imagen/fondo y CTA principal de apertura.",
    icon: Rocket,
    status: "ACTIVE",
    editable: true,
  },
  {
    key: "slides",
    name: "Slides destacados",
    description: "Administra orden, copys e imágenes del carrusel destacado del inicio.",
    icon: Images,
    status: "ACTIVE",
    editable: true,
  },
  {
    key: "desarrollo",
    name: "Desarrollo principal",
    description: "Edita bloque de desarrollo, descripción breve y visuales principales.",
    icon: Wrench,
    status: "ACTIVE",
    editable: true,
  },
  {
    key: "servicios",
    name: "Servicios destacados",
    description: "Selecciona servicios visibles y define el orden de aparición en Home.",
    icon: Sparkles,
    status: "ACTIVE",
    editable: true,
  },
  {
    key: "nosotros",
    name: "Nosotros resumido",
    description: "Gestiona extracto institucional, imagen y enlace al módulo de Nosotros.",
    icon: Megaphone,
    status: "COMING_SOON",
    editable: false,
  },
  {
    key: "metricas",
    name: "Métricas o cifras",
    description: "Configura cifras clave de marca: proyectos, alcance y crecimiento.",
    icon: CircleDashed,
    status: "UNCONFIGURED",
    editable: false,
  },
  {
    key: "podcast",
    name: "Podcast destacado en Home",
    description: "Define episodios destacados y contenido audiovisual prioritario.",
    icon: Headphones,
    status: "ACTIVE",
    editable: false,
  },
  {
    key: "cta",
    name: "CTA final",
    description: "Edita llamada final, mensaje de cierre y botones de conversión.",
    icon: Flame,
    status: "COMING_SOON",
    editable: false,
  },
];

const STATUS_META: Record<
  ModuleStatus,
  { label: string; className: string; icon: ComponentType<{ className?: string }> }
> = {
  ACTIVE: {
    label: "Activo",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: CheckCircle2,
  },
  COMING_SOON: {
    label: "Próximamente",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    icon: TimerReset,
  },
  UNCONFIGURED: {
    label: "Sin configurar",
    className: "bg-slate-100 text-slate-700 border border-slate-200",
    icon: CircleDashed,
  },
};

export default function HomeAdminClient() {
  const [config, setConfig] = useState<HomeContentConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_HOME_CONTENT;
    return parseStoredHomeContent(window.localStorage.getItem(HOME_CONTENT_STORAGE_KEY));
  });
  const [selectedModule, setSelectedModule] = useState<EditableModuleKey>("hero");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const summary = useMemo(
    () => ({
      total: MODULES.length,
      active: MODULES.filter((module) => module.status === "ACTIVE").length,
      pending: MODULES.filter((module) => module.status !== "ACTIVE").length,
      updatedAt: new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(
        new Date(config.updatedAt)
      ),
    }),
    [config.updatedAt]
  );

  const openEditor = (module: EditableModuleKey) => {
    setSelectedModule(module);
    setIsEditorOpen(true);
  };

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
    setFeedback("Cambios guardados correctamente. Ya puedes verlos reflejados en el Home público.");
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          <Sparkles className="h-3.5 w-3.5" />
          Gestión premium de contenido
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">Administración de Home</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Administra bloques del inicio público desde este panel. Haz clic en Editar para abrir
          formularios funcionales y guardar cambios reales.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total de módulos" value={String(summary.total)} />
        <InfoCard title="Módulos activos" value={String(summary.active)} />
        <InfoCard title="Pendientes" value={String(summary.pending)} />
        <InfoCard title="Última actualización" value={summary.updatedAt} />
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Módulos editables</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#132035]">Panel de bloques del Home</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f0e4] px-4 py-1.5 text-xs font-semibold text-[#9f7822]">
            <Power className="h-3.5 w-3.5" />
            Estructura lista para conexión CRUD
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((module) => {
            const Icon = module.icon;
            const statusMeta = STATUS_META[module.status];
            const StatusIcon = statusMeta.icon;

            return (
              <article key={module.key} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2e7ce] text-[#8f6717]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusMeta.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusMeta.label}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[#132035]">{module.name}</h3>
                <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">{module.description}</p>

                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    disabled={!module.editable}
                    onClick={() => module.editable && openEditor(module.key as EditableModuleKey)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition enabled:hover:bg-[#bf931d] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FilePenLine className="h-4 w-4" />
                    Editar
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={!module.editable}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] transition enabled:hover:bg-[#f8f4ed] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Eye className="h-4 w-4" />
                      Vista previa
                    </button>
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] opacity-70"
                    >
                      <Power className="h-4 w-4" />
                      {module.status === "ACTIVE" ? "Desactivar" : "Activar"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {isEditorOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/45 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl border border-[#e0d8cb] bg-[#fefcf8] p-4 shadow-2xl md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#132035]">Editor funcional de módulo</h3>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2 text-sm font-semibold text-slate-700"
              >
                <X className="h-4 w-4" />
                Cerrar
              </button>
            </div>
            <EditorSection
              selectedModule={selectedModule}
              config={config}
              updateHero={updateHero}
              updateCard={updateCard}
            />
          </div>
        </div>
      ) : null}

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#e0d8cb] bg-[#fffdf9] p-5">
        <p className="text-sm text-slate-700">Guarda para publicar los cambios del Home desde el panel administrativo.</p>
        <button
          type="button"
          onClick={saveChanges}
          className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
        >
          <Save className="h-4 w-4" />
          Guardar cambios
        </button>
      </section>

      {feedback ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-[#142033]">{value}</p>
    </article>
  );
}

function EditorSection({
  selectedModule,
  config,
  updateHero,
  updateCard,
}: {
  selectedModule: EditableModuleKey;
  config: HomeContentConfig;
  updateHero: (id: string, field: "src" | "alt", value: string) => void;
  updateCard: (
    section: "desarrolloCards" | "serviceCards",
    id: string,
    field: keyof HomeSectionCard,
    value: string
  ) => void;
}) {
  if (selectedModule === "hero" || selectedModule === "slides") {
    return (
      <ModulePanel title="Editor de Hero / Slides">
        <div className="grid gap-4 md:grid-cols-2">
          {config.heroSlides.map((slide, index) => (
            <article key={slide.id} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4">
              <p className="text-sm font-semibold text-[#132035]">Slide {index + 1}</p>
              <Field label="URL de imagen">
                <input
                  value={slide.src}
                  onChange={(event) => updateHero(slide.id, "src", event.target.value)}
                  className="input-base"
                />
              </Field>
              <Field label="Alt">
                <input
                  value={slide.alt}
                  onChange={(event) => updateHero(slide.id, "alt", event.target.value)}
                  className="input-base"
                />
              </Field>
            </article>
          ))}
        </div>
      </ModulePanel>
    );
  }

  if (selectedModule === "desarrollo") {
    return (
      <ModulePanel title="Editor de Desarrollo principal">
        <CardEditorList
          cards={config.desarrolloCards}
          onChange={(id, field, value) => updateCard("desarrolloCards", id, field, value)}
        />
      </ModulePanel>
    );
  }

  return (
    <ModulePanel title="Editor de Servicios destacados">
      <CardEditorList
        cards={config.serviceCards}
        onChange={(id, field, value) => updateCard("serviceCards", id, field, value)}
      />
    </ModulePanel>
  );
}

function ModulePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
      <h3 className="text-xl font-semibold text-[#132035]">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CardEditorList({
  cards,
  onChange,
}: {
  cards: HomeSectionCard[];
  onChange: (id: string, field: keyof HomeSectionCard, value: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.id} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4">
          <Field label="Título">
            <input
              value={card.title}
              onChange={(event) => onChange(card.id, "title", event.target.value)}
              className="input-base"
            />
          </Field>
          <Field label="URL imagen">
            <input
              value={card.image}
              onChange={(event) => onChange(card.id, "image", event.target.value)}
              className="input-base"
            />
          </Field>
          <Field label="Descripción">
            <textarea
              rows={3}
              value={card.description}
              onChange={(event) => onChange(card.id, "description", event.target.value)}
              className="input-base"
            />
          </Field>
        </article>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-500 first:mt-0">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
