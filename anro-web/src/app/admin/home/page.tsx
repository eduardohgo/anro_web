"use client";

import {
  BarChart3,
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
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import type { ComponentType, Dispatch, FormEvent, SetStateAction } from "react";
import { useMemo, useState } from "react";

type ModuleStatus = "ACTIVE" | "INACTIVE";

type ModuleKey =
  | "hero"
  | "slides"
  | "desarrollo"
  | "servicios"
  | "nosotros"
  | "metricas"
  | "podcast-home"
  | "cta";

type HeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundImage: string;
};

type SlideItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  order: number;
  active: boolean;
};

type SlidesContent = {
  slides: SlideItem[];
};

type DevelopmentCard = {
  id: string;
  label: string;
  title: string;
  image: string;
  active: boolean;
};

type DesarrolloContent = {
  badge: string;
  title: string;
  subtitle: string;
  points: string[];
  buttonText: string;
  buttonLink: string;
  cards: DevelopmentCard[];
};

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  order: number;
  visible: boolean;
};

type ServicesContent = {
  services: ServiceItem[];
};

type NosotrosContent = {
  title: string;
  description: string;
  link: string;
};

type MetricasContent = {
  proyectos: string;
  ciudades: string;
  crecimiento: string;
};

type PodcastHomeContent = {
  episodio: string;
  host: string;
  enlace: string;
};

type CtaContent = {
  title: string;
  description: string;
  buttonText: string;
  link: string;
};

type GenericContent = Record<string, string>;

type ModuleContent =
  | HeroContent
  | SlidesContent
  | DesarrolloContent
  | ServicesContent
  | NosotrosContent
  | MetricasContent
  | PodcastHomeContent
  | CtaContent
  | GenericContent;

interface HomeModule {
  key: ModuleKey;
  name: string;
  publicReference: string;
  description: string;
  status: ModuleStatus;
  icon: ComponentType<{ className?: string }>;
  content: ModuleContent;
}

const INITIAL_HOME_MODULES: HomeModule[] = [
  {
    key: "hero",
    name: "Hero principal",
    publicReference: "Sección pública: Hero superior",
    description:
      "Edita badge, título, subtítulo, descripción, botones e imagen principal.",
    status: "ACTIVE",
    icon: Rocket,
    content: {
      badge: "ANRO Grupo Desarrollador",
      title: "Vive el futuro con ANRO",
      subtitle: "Espacios premium que conectan contigo",
      description:
        "Creamos experiencias inmobiliarias con diseño, ubicación y plusvalía para cada etapa.",
      primaryButtonText: "Conoce proyectos",
      primaryButtonLink: "/proyectos",
      secondaryButtonText: "Hablar con asesor",
      secondaryButtonLink: "/contacto",
      backgroundImage: "/fraccionamiento/carrusel1.jpg",
    },
  },
  {
    key: "slides",
    name: "Slides destacados",
    publicReference: "Sección pública: Carrusel principal",
    description:
      "Administra orden, textos e imágenes del carrusel destacado del inicio.",
    status: "ACTIVE",
    icon: Images,
    content: {
      slides: [
        {
          id: "slide-1",
          title: "Residencial Premium",
          description: "Diseño y plusvalía en una sola vista.",
          image: "/fraccionamiento/carrusel1.jpg",
          order: 1,
          active: true,
        },
        {
          id: "slide-2",
          title: "Ubicación estratégica",
          description: "Conectividad y servicios cerca de ti.",
          image: "/fraccionamiento/carrusel2.jpg",
          order: 2,
          active: true,
        },
      ],
    },
  },
  {
    key: "desarrollo",
    name: "Desarrollo principal",
    publicReference: "Sección pública: Nuestro Desarrollo Principal",
    description:
      "Edita badge, título, subtítulo, lista lateral, botón y tarjetas visuales.",
    status: "ACTIVE",
    icon: Wrench,
    content: {
      badge: "Desarrollo principal",
      title: "Nuestro Desarrollo Principal",
      subtitle: "Etapas, avances, beneficios y recorrido virtual.",
      points: [
        "Primera etapa",
        "Segunda etapa",
        "Avances y beneficios",
        "Recorrido virtual",
      ],
      buttonText: "Ver ubicación",
      buttonLink: "/contacto",
      cards: [
        {
          id: "dev-1",
          label: "Primera etapa",
          title: "Primera etapa",
          image: "/fraccionamiento/primeraEtapa.jpg",
          active: true,
        },
        {
          id: "dev-2",
          label: "Segunda etapa",
          title: "Segunda etapa",
          image: "/fraccionamiento/segundaEtapa.jpg",
          active: true,
        },
        {
          id: "dev-3",
          label: "Recorrido virtual",
          title: "Recorrido virtual",
          image: "/fraccionamiento/recorridoVirtual.jpg",
          active: true,
        },
      ],
    },
  },
  {
    key: "servicios",
    name: "Servicios destacados",
    publicReference: "Sección pública: Servicios",
    description:
      "Selecciona servicios visibles y define el orden de aparición en Home.",
    status: "ACTIVE",
    icon: Sparkles,
    content: {
      services: [
        {
          id: "serv-1",
          name: "Desarrollo inmobiliario",
          description: "Planeación y ejecución de proyectos inmobiliarios.",
          order: 1,
          visible: true,
        },
        {
          id: "serv-2",
          name: "Compra, venta y renta",
          description: "Acompañamiento en operaciones con atención cercana.",
          order: 2,
          visible: true,
        },
        {
          id: "serv-3",
          name: "Arrendamiento de maquinaria",
          description: "Maquinaria para obras y proyectos de campo.",
          order: 3,
          visible: true,
        },
      ],
    },
  },
  {
    key: "nosotros",
    name: "Nosotros resumido",
    publicReference: "Sección pública: Nosotros",
    description:
      "Gestiona extracto institucional, texto y enlace al módulo de Nosotros.",
    status: "INACTIVE",
    icon: Megaphone,
    content: {
      title: "Nosotros",
      description: "Módulo listo para configurar.",
      link: "/nosotros",
    },
  },
  {
    key: "metricas",
    name: "Métricas o cifras",
    publicReference: "Sección pública: Métricas",
    description:
      "Configura cifras clave de marca: proyectos, alcance y crecimiento.",
    status: "INACTIVE",
    icon: BarChart3,
    content: {
      proyectos: "120+",
      ciudades: "8",
      crecimiento: "35%",
    },
  },
  {
    key: "podcast-home",
    name: "Podcast destacado en Home",
    publicReference: "Sección pública: Podcast en Home",
    description:
      "Define episodios destacados y contenido audiovisual prioritario.",
    status: "ACTIVE",
    icon: Headphones,
    content: {
      episodio: "Episodio 18",
      host: "Equipo ANRO",
      enlace: "/podcast/18",
    },
  },
  {
    key: "cta",
    name: "CTA final",
    publicReference: "Sección pública: Llamado final a la acción",
    description:
      "Edita llamada final, mensaje de cierre y botón de conversión.",
    status: "INACTIVE",
    icon: Flame,
    content: {
      title: "¿Listo para invertir con ANRO?",
      description:
        "Te acompañamos en cada paso para encontrar el espacio ideal.",
      buttonText: "Solicitar asesoría",
      link: "/contacto",
    },
  },
];

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

function isSlidesContent(content: ModuleContent): content is SlidesContent {
  return "slides" in content;
}

function isServicesContent(content: ModuleContent): content is ServicesContent {
  return "services" in content;
}

function isHeroContent(content: ModuleContent): content is HeroContent {
  return (
    "primaryButtonText" in content &&
    "primaryButtonLink" in content &&
    "backgroundImage" in content
  );
}

function isDesarrolloContent(content: ModuleContent): content is DesarrolloContent {
  return "points" in content && "cards" in content && Array.isArray(content.cards);
}

export default function AdminHomePage() {
  const [modules, setModules] = useState<HomeModule[]>(INITIAL_HOME_MODULES);
  const [editingModuleKey, setEditingModuleKey] = useState<ModuleKey | null>(null);
  const [previewModuleKey, setPreviewModuleKey] = useState<ModuleKey | null>(null);
  const [draftContent, setDraftContent] = useState<ModuleContent | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(
    new Date("2026-03-31T16:30:00")
  );

  const editingModule = useMemo(
    () => modules.find((module) => module.key === editingModuleKey) ?? null,
    [modules, editingModuleKey]
  );

  const previewModule = useMemo(
    () => modules.find((module) => module.key === previewModuleKey) ?? null,
    [modules, previewModuleKey]
  );

  const totalModules = modules.length;
  const activeModules = modules.filter((module) => module.status === "ACTIVE").length;
  const pendingModules = modules.filter((module) => module.status !== "ACTIVE").length;

  const openEdit = (module: HomeModule) => {
    setEditingModuleKey(module.key);
    setDraftContent(structuredClone(module.content));
  };

  const handleToggleModule = (moduleKey: ModuleKey) => {
    setModules((current) =>
      current.map((module) =>
        module.key === moduleKey
          ? {
              ...module,
              status: module.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
            }
          : module
      )
    );
    setLastUpdated(new Date());
  };

  const handleSaveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingModuleKey || !draftContent) return;

    setModules((current) =>
      current.map((module) =>
        module.key === editingModuleKey
          ? { ...module, content: structuredClone(draftContent) }
          : module
      )
    );

    setLastUpdated(new Date());
    setEditingModuleKey(null);
    setDraftContent(null);
  };

  const updateDraftField = (field: string, value: string) => {
    setDraftContent((current) => {
      if (
        !current ||
        isSlidesContent(current) ||
        isServicesContent(current) ||
        isDesarrolloContent(current)
      ) {
        return current;
      }
      return { ...current, [field]: value };
    });
  };

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
      hint: "Referencia local hasta integrar datos de backend.",
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
          Cada módulo corresponde 1 a 1 con una sección real del Home público.
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

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">
              Módulos editables
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-[#132035]">
              Panel de bloques del Home
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f0e4] px-4 py-1.5 text-xs font-semibold text-[#9f7822]">
            <Power className="h-3.5 w-3.5" />
            Interacciones funcionales con estado local
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            const statusMeta = STATUS_META[module.status];
            const StatusIcon = statusMeta.icon;
            const toggleLabel = module.status === "ACTIVE" ? "Desactivar" : "Activar";

            return (
              <article
                key={module.key}
                className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2e7ce] text-[#8f6717]">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusMeta.className}`}
                  >
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusMeta.label}
                  </span>
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#a37a22]">
                  {module.publicReference}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-[#132035]">
                  {module.name}
                </h3>

                <p className="mt-2 min-h-14 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>

                <div className="mt-5 grid gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(module)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
                  >
                    <FilePenLine className="h-4 w-4" />
                    Editar
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewModuleKey(module.key)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                      Vista previa
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleModule(module.key)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
                    >
                      <Power className="h-4 w-4" />
                      {toggleLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {editingModule && draftContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1424]/60 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">
                  Editar módulo
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-[#132035]">
                  {editingModule.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {editingModule.publicReference}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingModuleKey(null);
                  setDraftContent(null);
                }}
                className="rounded-full border border-[#e4dbcf] p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-6">
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  {renderModuleEditor(
                    editingModule.key,
                    draftContent,
                    setDraftContent,
                    updateDraftField
                  )}
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
                      Vista previa de la sección
                    </p>
                    <div className="mt-4">
                      <PreviewModule
                        content={draftContent}
                        moduleKey={editingModule.key}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingModuleKey(null);
                    setDraftContent(null);
                  }}
                  className="rounded-xl border border-[#ddd1bc] bg-white px-4 py-2 text-sm font-semibold text-[#3a465a]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewModule && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0c1424]/55 px-4 py-8">
          <div className="w-full max-w-4xl rounded-3xl border border-[#e4dbcf] bg-[#fffdf9] p-6 shadow-2xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-[#132035]">
                  Vista previa: {previewModule.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {previewModule.publicReference}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewModuleKey(null)}
                className="rounded-full border border-[#e4dbcf] p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl border border-[#ebe0ce] bg-white p-4">
              <PreviewModule
                content={previewModule.content}
                moduleKey={previewModule.key}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#dfd2be] bg-white px-3 py-2 text-sm text-[#1d2c43] outline-none transition focus:border-[#d4a62a]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="rounded-xl border border-[#dfd2be] bg-white px-3 py-2 text-sm text-[#1d2c43] outline-none transition focus:border-[#d4a62a]"
      />
    </label>
  );
}

function renderModuleEditor(
  moduleKey: ModuleKey,
  content: ModuleContent,
  setDraftContent: Dispatch<SetStateAction<ModuleContent | null>>,
  updateDraftField: (field: string, value: string) => void
) {
  if (moduleKey === "hero" && isHeroContent(content)) {
    return (
      <div className="space-y-5">
        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Encabezado principal
          </p>

          <div className="mt-4 grid gap-4">
            <Field
              label="Badge"
              value={content.badge}
              onChange={(value) => updateDraftField("badge", value)}
            />
            <Field
              label="Título principal"
              value={content.title}
              onChange={(value) => updateDraftField("title", value)}
            />
            <Field
              label="Subtítulo"
              value={content.subtitle}
              onChange={(value) => updateDraftField("subtitle", value)}
            />
            <TextAreaField
              label="Descripción"
              value={content.description}
              onChange={(value) => updateDraftField("description", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Botones
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field
              label="Texto botón principal"
              value={content.primaryButtonText}
              onChange={(value) => updateDraftField("primaryButtonText", value)}
            />
            <Field
              label="Enlace botón principal"
              value={content.primaryButtonLink}
              onChange={(value) => updateDraftField("primaryButtonLink", value)}
            />
            <Field
              label="Texto botón secundario"
              value={content.secondaryButtonText}
              onChange={(value) => updateDraftField("secondaryButtonText", value)}
            />
            <Field
              label="Enlace botón secundario"
              value={content.secondaryButtonLink}
              onChange={(value) => updateDraftField("secondaryButtonLink", value)}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Imagen principal
          </p>

          <div className="mt-4 grid gap-4">
            <Field
              label="Ruta de imagen"
              value={content.backgroundImage}
              onChange={(value) => updateDraftField("backgroundImage", value)}
            />

            <div className="overflow-hidden rounded-2xl border border-[#e7dcc9] bg-[#f8f4ed] p-3">
              <img
                src={content.backgroundImage}
                alt="Vista previa Hero"
                className="h-48 w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (moduleKey === "desarrollo" && isDesarrolloContent(content)) {
    return (
      <div className="space-y-5">
        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Encabezado de la sección
          </p>

          <div className="mt-4 grid gap-4">
            <Field
              label="Badge"
              value={content.badge}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isDesarrolloContent(current)
                    ? { ...current, badge: value }
                    : current
                )
              }
            />
            <Field
              label="Título"
              value={content.title}
              onChange={(value) =>
                setDraftContent((current) =>
                  current && isDesarrolloContent(current)
                    ? { ...current, title: value }
                    : current
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
          </div>
        </section>

        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Lista lateral
          </p>

          <div className="mt-4 grid gap-3">
            {content.points.map((point, index) => (
              <Field
                key={index}
                label={`Punto ${index + 1}`}
                value={point}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isDesarrolloContent(current)) return current;
                    const nextPoints = [...current.points];
                    nextPoints[index] = value;
                    return { ...current, points: nextPoints };
                  })
                }
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Botón de sección
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
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
        </section>

        <section className="rounded-2xl border border-[#ece3d6] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
            Tarjetas visuales
          </p>

          <div className="mt-4 space-y-4">
            {content.cards.map((card, index) => (
              <div
                key={card.id}
                className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Etiqueta"
                    value={card.label}
                    onChange={(value) =>
                      setDraftContent((current) => {
                        if (!current || !isDesarrolloContent(current)) return current;
                        const nextCards = [...current.cards];
                        nextCards[index] = { ...nextCards[index], label: value };
                        return { ...current, cards: nextCards };
                      })
                    }
                  />

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

                  <div className="md:col-span-2">
                    <Field
                      label="Ruta de imagen"
                      value={card.image}
                      onChange={(value) =>
                        setDraftContent((current) => {
                          if (!current || !isDesarrolloContent(current)) return current;
                          const nextCards = [...current.cards];
                          nextCards[index] = { ...nextCards[index], image: value };
                          return { ...current, cards: nextCards };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-[#eadfcd] bg-[#faf7f1] p-2">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                </div>

                <label className="mt-4 inline-flex items-center gap-2 text-sm text-[#2d3b52]">
                  <input
                    type="checkbox"
                    checked={card.active}
                    onChange={(event) =>
                      setDraftContent((current) => {
                        if (!current || !isDesarrolloContent(current)) return current;
                        const nextCards = [...current.cards];
                        nextCards[index] = {
                          ...nextCards[index],
                          active: event.target.checked,
                        };
                        return { ...current, cards: nextCards };
                      })
                    }
                  />
                  Tarjeta activa
                </label>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (moduleKey === "slides" && isSlidesContent(content)) {
    return (
      <div className="space-y-4">
        {content.slides.map((slide, index) => (
          <div key={slide.id} className="rounded-2xl border border-[#ece3d6] p-4">
            <p className="mb-3 text-sm font-semibold text-[#132035]">
              Slide {index + 1}
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Título"
                value={slide.title}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isSlidesContent(current)) return current;
                    const next = [...current.slides];
                    next[index] = { ...next[index], title: value };
                    return { slides: next };
                  })
                }
              />

              <Field
                label="Imagen"
                value={slide.image}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isSlidesContent(current)) return current;
                    const next = [...current.slides];
                    next[index] = { ...next[index], image: value };
                    return { slides: next };
                  })
                }
              />

              <Field
                label="Descripción"
                value={slide.description}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isSlidesContent(current)) return current;
                    const next = [...current.slides];
                    next[index] = { ...next[index], description: value };
                    return { slides: next };
                  })
                }
              />

              <Field
                label="Orden"
                value={String(slide.order)}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isSlidesContent(current)) return current;
                    const next = [...current.slides];
                    next[index] = {
                      ...next[index],
                      order: Number(value) || next[index].order,
                    };
                    return { slides: next };
                  })
                }
              />
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-sm text-[#2d3b52]">
              <input
                type="checkbox"
                checked={slide.active}
                onChange={(event) =>
                  setDraftContent((current) => {
                    if (!current || !isSlidesContent(current)) return current;
                    const next = [...current.slides];
                    next[index] = { ...next[index], active: event.target.checked };
                    return { slides: next };
                  })
                }
              />
              Activo
            </label>
          </div>
        ))}
      </div>
    );
  }

  if (moduleKey === "servicios" && isServicesContent(content)) {
    return (
      <div className="space-y-4">
        {content.services.map((service, index) => (
          <div key={service.id} className="rounded-2xl border border-[#ece3d6] p-4">
            <p className="mb-3 text-sm font-semibold text-[#132035]">
              Servicio {index + 1}
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <Field
                label="Nombre"
                value={service.name}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isServicesContent(current)) return current;
                    const next = [...current.services];
                    next[index] = { ...next[index], name: value };
                    return { services: next };
                  })
                }
              />

              <Field
                label="Orden"
                value={String(service.order)}
                onChange={(value) =>
                  setDraftContent((current) => {
                    if (!current || !isServicesContent(current)) return current;
                    const next = [...current.services];
                    next[index] = {
                      ...next[index],
                      order: Number(value) || next[index].order,
                    };
                    return { services: next };
                  })
                }
              />

              <div className="md:col-span-2">
                <TextAreaField
                  label="Descripción"
                  value={service.description}
                  onChange={(value) =>
                    setDraftContent((current) => {
                      if (!current || !isServicesContent(current)) return current;
                      const next = [...current.services];
                      next[index] = { ...next[index], description: value };
                      return { services: next };
                    })
                  }
                />
              </div>
            </div>

            <label className="mt-3 inline-flex items-center gap-2 text-sm text-[#2d3b52]">
              <input
                type="checkbox"
                checked={service.visible}
                onChange={(event) =>
                  setDraftContent((current) => {
                    if (!current || !isServicesContent(current)) return current;
                    const next = [...current.services];
                    next[index] = { ...next[index], visible: event.target.checked };
                    return { services: next };
                  })
                }
              />
              Visible
            </label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-[#ddd1bc] p-4 text-sm text-slate-500">
      Este módulo todavía no tiene un editor visual personalizado.
    </div>
  );
}

function PreviewModule({
  content,
  moduleKey,
}: {
  content: ModuleContent;
  moduleKey: ModuleKey;
}) {
  if (moduleKey === "hero" && isHeroContent(content)) {
    return (
      <div className="overflow-hidden rounded-[28px] border border-[#e7dcc9] bg-[#f8f4ed]">
        <div className="relative h-[340px] w-full">
          <img
            src={content.backgroundImage}
            alt={content.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,16,30,0.18),rgba(9,16,30,0.72))]" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
              {content.badge}
            </span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight">
              {content.title}
            </h3>
            <p className="mt-2 text-sm text-slate-100">{content.subtitle}</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">
              {content.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#132035]">
                {content.primaryButtonText}
              </span>
              <span className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold">
                {content.secondaryButtonText}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (moduleKey === "desarrollo" && isDesarrolloContent(content)) {
    return (
      <div className="space-y-4">
        <div className="rounded-[28px] border border-[#e7dcc9] bg-[#f8f4ed] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-lg">
              <span className="inline-flex rounded-full border border-[#e0d0af] bg-[#fff7e6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9f7822]">
                {content.badge}
              </span>
              <h3 className="mt-4 text-3xl font-semibold text-[#132035]">
                {content.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {content.subtitle}
              </p>
            </div>

            <div className="min-w-[220px] rounded-2xl bg-white/80 p-4">
              <ul className="space-y-2 text-sm text-[#22324b]">
                {content.points.map((point, index) => (
                  <li key={index}>• {point}</li>
                ))}
              </ul>

              <div className="mt-4">
                <span className="inline-flex rounded-full bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#132035]">
                  {content.buttonText}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.cards
              .filter((card) => card.active)
              .map((card) => (
                <article
                  key={card.id}
                  className="overflow-hidden rounded-2xl border border-[#e8ddca] bg-white"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm font-semibold text-[#132035]">{card.title}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#9f7822]">
                      {card.label}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (isSlidesContent(content)) {
    return (
      <div className="space-y-3">
        {content.slides.map((slide) => (
          <div key={slide.id} className="rounded-xl border border-[#ece3d6] p-3">
            <p className="font-semibold text-[#132035]">
              {slide.order}. {slide.title}
            </p>
            <p className="text-sm text-slate-600">{slide.description}</p>
            <p className="mt-1 text-xs text-slate-500">
              {slide.active ? "Activo" : "Inactivo"}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (isServicesContent(content)) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {content.services.map((service) => (
          <div key={service.id} className="rounded-xl border border-[#ece3d6] p-4">
            <p className="font-semibold text-[#132035]">{service.name}</p>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            <p className="mt-2 text-xs text-slate-500">
              {service.visible ? "Visible" : "Oculto"}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      {Object.entries(content).map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-[130px_1fr] gap-3 rounded-lg bg-[#fcf8f1] px-3 py-2"
        >
          <span className="font-semibold capitalize text-[#22324b]">{key}</span>
          <span className="text-slate-600">{String(value)}</span>
        </div>
      ))}
    </div>
  );
}