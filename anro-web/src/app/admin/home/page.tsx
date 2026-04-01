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
import type { ComponentType, FormEvent } from "react";
import { useMemo, useState } from "react";

type ModuleStatus = "ACTIVE" | "INACTIVE";

type HeroContent = {
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

type DesarrolloContent = {
  title: string;
  description: string;
  image: string;
  location: string;
  link: string;
};

type ServiceItem = {
  id: string;
  name: string;
  description: string;
  order: number;
  visible: boolean;
};

type CtaContent = {
  title: string;
  description: string;
  buttonText: string;
  link: string;
};

type GenericContent = Record<string, string>;

type ModuleContent = HeroContent | { slides: SlideItem[] } | DesarrolloContent | { services: ServiceItem[] } | CtaContent | GenericContent;

interface HomeModule {
  key: string;
  name: string;
  description: string;
  status: ModuleStatus;
  icon: ComponentType<{ className?: string }>;
  content: ModuleContent;
}

const INITIAL_HOME_MODULES: HomeModule[] = [
  {
    key: "hero",
    name: "Hero principal",
    description: "Controla titular, subtítulo, imagen/fondo y CTA principal de apertura.",
    status: "ACTIVE",
    icon: Rocket,
    content: {
      title: "Vive el futuro con ANRO",
      subtitle: "Espacios premium que conectan contigo",
      description: "Creamos experiencias inmobiliarias con diseño, ubicación y plusvalía para cada etapa.",
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
    description: "Administra orden, copies e imágenes del carrusel destacado del inicio.",
    status: "ACTIVE",
    icon: Images,
    content: {
      slides: [
        { id: "slide-1", title: "Residencial Premium", description: "Diseño y plusvalía en una sola vista.", image: "/fraccionamiento/carrusel1.jpg", order: 1, active: true },
        { id: "slide-2", title: "Ubicación estratégica", description: "Conectividad y servicios cerca de ti.", image: "/fraccionamiento/carrusel2.jpg", order: 2, active: true },
      ],
    },
  },
  {
    key: "desarrollo",
    name: "Desarrollo principal",
    description: "Edita bloque de desarrollo, descripción breve y enlace a detalle completo.",
    status: "INACTIVE",
    icon: Wrench,
    content: {
      title: "Desarrollo ANRO Norte",
      description: "Proyecto principal con etapas progresivas y espacios comerciales integrados.",
      image: "/fraccionamiento/primeraEtapa.jpg",
      location: "Monterrey, Nuevo León",
      link: "/desarrollo-principal",
    },
  },
  {
    key: "servicios",
    name: "Servicios destacados",
    description: "Selecciona servicios visibles y define el orden de aparición en Home.",
    status: "ACTIVE",
    icon: Sparkles,
    content: {
      services: [
        { id: "serv-1", name: "Desarrollo inmobiliario", description: "Planeación integral de proyectos.", order: 1, visible: true },
        { id: "serv-2", name: "Construcción", description: "Obra pública y privada con estándares altos.", order: 2, visible: true },
      ],
    },
  },
  {
    key: "nosotros",
    name: "Nosotros resumido",
    description: "Gestiona extracto institucional, imagen y enlace al módulo de Nosotros.",
    status: "INACTIVE",
    icon: Megaphone,
    content: { title: "Nosotros", description: "Módulo listo para configurar.", link: "/nosotros" },
  },
  {
    key: "metricas",
    name: "Métricas o cifras",
    description: "Configura cifras clave de marca: proyectos, alcance y crecimiento.",
    status: "INACTIVE",
    icon: BarChart3,
    content: { proyectos: "120+", ciudades: "8", crecimiento: "35%" },
  },
  {
    key: "podcast-home",
    name: "Podcast destacado en Home",
    description: "Define episodios destacados y contenido audiovisual prioritario.",
    status: "ACTIVE",
    icon: Headphones,
    content: { episodio: "Episodio 18", host: "Equipo ANRO", enlace: "/podcast/18" },
  },
  {
    key: "cta-final",
    name: "CTA final",
    description: "Edita llamada final, mensaje de cierre y botones de conversión.",
    status: "INACTIVE",
    icon: Flame,
    content: {
      title: "¿Listo para invertir con ANRO?",
      description: "Te acompañamos en cada paso para encontrar el espacio ideal.",
      buttonText: "Solicitar asesoría",
      link: "/contacto",
    },
  },
];

const STATUS_META: Record<ModuleStatus, { label: string; className: string; icon: ComponentType<{ className?: string }> }> = {
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

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(value);
}

function isSlidesContent(content: ModuleContent): content is { slides: SlideItem[] } {
  return "slides" in content;
}

function isServicesContent(content: ModuleContent): content is { services: ServiceItem[] } {
  return "services" in content;
}

export default function AdminHomePage() {
  const [modules, setModules] = useState<HomeModule[]>(INITIAL_HOME_MODULES);
  const [editingModuleKey, setEditingModuleKey] = useState<string | null>(null);
  const [previewModuleKey, setPreviewModuleKey] = useState<string | null>(null);
  const [draftContent, setDraftContent] = useState<ModuleContent | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date("2026-03-31T16:30:00Z"));

  const editingModule = useMemo(
    () => modules.find((module) => module.key === editingModuleKey) ?? null,
    [modules, editingModuleKey],
  );

  const previewModule = useMemo(
    () => modules.find((module) => module.key === previewModuleKey) ?? null,
    [modules, previewModuleKey],
  );

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
      hint: "Referencia local hasta integrar datos de backend.",
    },
  ];

  const openEdit = (module: HomeModule) => {
    setEditingModuleKey(module.key);
    setDraftContent(structuredClone(module.content));
  };

  const handleToggleModule = (moduleKey: string) => {
    setModules((current) =>
      current.map((module) =>
        module.key === moduleKey
          ? { ...module, status: module.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : module,
      ),
    );
    setLastUpdated(new Date());
  };

  const handleSaveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingModuleKey || !draftContent) return;

    setModules((current) =>
      current.map((module) =>
        module.key === editingModuleKey
          ? {
              ...module,
              content: structuredClone(draftContent),
            }
          : module,
      ),
    );

    setLastUpdated(new Date());
    setEditingModuleKey(null);
    setDraftContent(null);
  };

  const updateDraftField = (field: string, value: string) => {
    setDraftContent((current) => {
      if (!current || isSlidesContent(current) || isServicesContent(current)) return current;
      return { ...current, [field]: value };
    });
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
          Aquí controlas las secciones visibles del inicio público de ANRO para mantener una
          narrativa consistente, elegante y alineada con la marca.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{item.value}</p>
            <p className="mt-2 text-sm text-slate-600">{item.hint}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Módulos editables</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#132035]">Panel de bloques del Home</h2>
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
                className="group rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5 transition hover:-translate-y-0.5 hover:border-[#d5c2a0] hover:shadow-[0_16px_35px_rgba(15,23,42,0.09)]"
              >
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
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">Editar módulo</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#132035]">{editingModule.name}</h3>
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

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {renderEditFields(editingModule.key, draftContent, setDraftContent, updateDraftField)}
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
          <div className="w-full max-w-2xl rounded-3xl border border-[#e4dbcf] bg-[#fffdf9] p-6 shadow-2xl md:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-[#132035]">Vista previa: {previewModule.name}</h3>
              <button
                type="button"
                onClick={() => setPreviewModuleKey(null)}
                className="rounded-full border border-[#e4dbcf] p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-[#ebe0ce] bg-white p-4">
              <PreviewModule content={previewModule.content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
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

function renderEditFields(
  moduleKey: string,
  content: ModuleContent,
  setDraftContent: (updater: (current: ModuleContent | null) => ModuleContent | null) => void,
  updateDraftField: (field: string, value: string) => void,
) {
  if (moduleKey === "slides" && isSlidesContent(content)) {
    return content.slides.map((slide, index) => (
      <div key={slide.id} className="rounded-2xl border border-[#ece3d6] p-4">
        <p className="mb-3 text-sm font-semibold text-[#132035]">Slide {index + 1}</p>
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
                next[index] = { ...next[index], order: Number(value) || next[index].order };
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
    ));
  }

  if (moduleKey === "servicios" && isServicesContent(content)) {
    return content.services.map((service, index) => (
      <div key={service.id} className="rounded-2xl border border-[#ece3d6] p-4">
        <p className="mb-3 text-sm font-semibold text-[#132035]">Servicio {index + 1}</p>
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
                next[index] = { ...next[index], order: Number(value) || next[index].order };
                return { services: next };
              })
            }
          />
          <Field
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
    ));
  }

  if (content && typeof content === "object") {
    return Object.entries(content).map(([key, value]) => (
      <Field key={key} label={key} value={String(value)} onChange={(nextValue) => updateDraftField(key, nextValue)} />
    ));
  }

  return (
    <p className="rounded-xl border border-dashed border-[#ddd1bc] p-4 text-sm text-slate-500">
      Este módulo aún no tiene configuración editable.
    </p>
  );
}

function PreviewModule({ content }: { content: ModuleContent }) {
  if (isSlidesContent(content)) {
    return (
      <div className="space-y-3">
        {content.slides.map((slide) => (
          <div key={slide.id} className="rounded-xl border border-[#ece3d6] p-3">
            <p className="font-semibold text-[#132035]">{slide.order}. {slide.title}</p>
            <p className="text-sm text-slate-600">{slide.description}</p>
            <p className="mt-1 text-xs text-slate-500">{slide.active ? "Activo" : "Inactivo"}</p>
          </div>
        ))}
      </div>
    );
  }

  if (isServicesContent(content)) {
    return (
      <div className="space-y-3">
        {content.services.map((service) => (
          <div key={service.id} className="rounded-xl border border-[#ece3d6] p-3">
            <p className="font-semibold text-[#132035]">{service.order}. {service.name}</p>
            <p className="text-sm text-slate-600">{service.description}</p>
            <p className="mt-1 text-xs text-slate-500">{service.visible ? "Visible" : "Oculto"}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="grid grid-cols-[130px_1fr] gap-3 rounded-lg bg-[#fcf8f1] px-3 py-2">
          <span className="font-semibold capitalize text-[#22324b]">{key}</span>
          <span className="text-slate-600">{String(value)}</span>
        </div>
      ))}
    </div>
  );
}
