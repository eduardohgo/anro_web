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
  TimerReset,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

type ModuleStatus = "ACTIVE" | "COMING_SOON" | "UNCONFIGURED";

interface HomeModule {
  key: string;
  name: string;
  description: string;
  status: ModuleStatus;
  icon: ComponentType<{ className?: string }>;
  actions: {
    editLabel: string;
    previewLabel: string;
    toggleLabel: string;
  };
}

const HOME_MODULES: HomeModule[] = [
  {
    key: "hero",
    name: "Hero principal",
    description: "Controla titular, subtítulo, imagen/fondo y CTA principal de apertura.",
    status: "ACTIVE",
    icon: Rocket,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Desactivar" },
  },
  {
    key: "slides",
    name: "Slides destacados",
    description: "Administra orden, copies e imágenes del carrusel destacado del inicio.",
    status: "ACTIVE",
    icon: Images,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Desactivar" },
  },
  {
    key: "desarrollo",
    name: "Desarrollo principal",
    description: "Edita bloque de desarrollo, descripción breve y enlace a detalle completo.",
    status: "UNCONFIGURED",
    icon: Wrench,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Activar" },
  },
  {
    key: "servicios",
    name: "Servicios destacados",
    description: "Selecciona servicios visibles y define el orden de aparición en Home.",
    status: "ACTIVE",
    icon: Sparkles,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Desactivar" },
  },
  {
    key: "nosotros",
    name: "Nosotros resumido",
    description: "Gestiona extracto institucional, imagen y enlace al módulo de Nosotros.",
    status: "COMING_SOON",
    icon: Megaphone,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Activar" },
  },
  {
    key: "metricas",
    name: "Métricas o cifras",
    description: "Configura cifras clave de marca: proyectos, alcance y crecimiento.",
    status: "UNCONFIGURED",
    icon: BarChart3,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Activar" },
  },
  {
    key: "podcast-home",
    name: "Podcast destacado en Home",
    description: "Define episodios destacados y contenido audiovisual prioritario.",
    status: "ACTIVE",
    icon: Headphones,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Desactivar" },
  },
  {
    key: "cta-final",
    name: "CTA final",
    description: "Edita llamada final, mensaje de cierre y botones de conversión.",
    status: "COMING_SOON",
    icon: Flame,
    actions: { editLabel: "Editar", previewLabel: "Vista previa", toggleLabel: "Activar" },
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

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(value);
}

export default function AdminHomePage() {
  const totalModules = HOME_MODULES.length;
  const activeModules = HOME_MODULES.filter((module) => module.status === "ACTIVE").length;
  const pendingModules = HOME_MODULES.filter((module) => module.status !== "ACTIVE").length;

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
      value: formatDate(new Date("2026-03-31T16:30:00Z")),
      hint: "Referencia estática hasta integrar datos de backend.",
    },
  ];

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
            Estructura lista para conexión CRUD
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {HOME_MODULES.map((module) => {
            const Icon = module.icon;
            const statusMeta = STATUS_META[module.status];
            const StatusIcon = statusMeta.icon;

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
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
                  >
                    <FilePenLine className="h-4 w-4" />
                    {module.actions.editLabel}
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                      {module.actions.previewLabel}
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] bg-white px-3 py-2.5 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
                    >
                      <Power className="h-4 w-4" />
                      {module.actions.toggleLabel}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
