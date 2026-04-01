"use client";

import {
  CheckCircle2,
  Eye,
  FilePenLine,
  Images,
  LayoutTemplate,
  Plus,
  Power,
  Save,
  Trash2,
  Wrench,
  X,
} from "lucide-react";
import type { ComponentType, FormEvent } from "react";
import { useMemo, useState } from "react";
import {
  DEFAULT_HOME_CONTENT,
  HOME_CONTENT_STORAGE_KEY,
  HomeContentConfig,
  HomeServiceCard,
  HomeVisualCard,
  parseStoredHomeContent,
} from "@/lib/home-content";

type ModuleKey = "hero" | "desarrollo" | "servicios" | "cta";
type ModuleStatus = "ACTIVE" | "INACTIVE";

interface AdminModule {
  key: ModuleKey;
  name: string;
  publicReference: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  status: ModuleStatus;
}

const MODULES: AdminModule[] = [
  {
    key: "hero",
    name: "Hero principal",
    publicReference: "Sección pública: Hero superior",
    description: "Edita badge, título, descripción, botones, lista de puntos, datos rápidos y slides.",
    icon: LayoutTemplate,
    status: "ACTIVE",
  },
  {
    key: "desarrollo",
    name: "Nuestro Desarrollo Principal",
    publicReference: "Sección pública: bloque de desarrollo con lista lateral y tarjetas",
    description: "Edita encabezado, subtítulo, lista lateral, botón de ubicación y tarjetas visuales.",
    icon: Wrench,
    status: "ACTIVE",
  },
  {
    key: "servicios",
    name: "Servicios",
    publicReference: "Sección pública: Servicios destacados",
    description: "Edita badge, título, descripción general, botón y cards de servicio.",
    icon: Images,
    status: "ACTIVE",
  },
  {
    key: "cta",
    name: "CTA final",
    publicReference: "Sección pública: llamado final a la acción",
    description: "Edita título, botones y pie de sección.",
    icon: CheckCircle2,
    status: "ACTIVE",
  },
];

function cloneConfig(config: HomeContentConfig): HomeContentConfig {
  return structuredClone(config);
}

function loadInitialConfig() {
  if (typeof window === "undefined") return DEFAULT_HOME_CONTENT;
  return parseStoredHomeContent(window.localStorage.getItem(HOME_CONTENT_STORAGE_KEY));
}

export default function AdminHomePage() {
  const [config, setConfig] = useState<HomeContentConfig>(loadInitialConfig);
  const [modules, setModules] = useState(MODULES);
  const [editingKey, setEditingKey] = useState<ModuleKey | null>(null);
  const [previewKey, setPreviewKey] = useState<ModuleKey | null>(null);
  const [draftConfig, setDraftConfig] = useState<HomeContentConfig | null>(null);

  const editingModule = useMemo(() => modules.find((item) => item.key === editingKey) ?? null, [modules, editingKey]);
  const previewModule = useMemo(() => modules.find((item) => item.key === previewKey) ?? null, [modules, previewKey]);

  const activeModules = modules.filter((item) => item.status === "ACTIVE").length;

  const openEdit = (key: ModuleKey) => {
    setEditingKey(key);
    setDraftConfig(cloneConfig(config));
  };

  const saveConfig = (nextConfig: HomeContentConfig) => {
    const updated = { ...nextConfig, updatedAt: new Date().toISOString() };
    setConfig(updated);
    window.localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleToggle = (key: ModuleKey) => {
    setModules((current) =>
      current.map((item) =>
        item.key === key
          ? { ...item, status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : item,
      ),
    );
  };

  const handleSaveEditing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draftConfig) return;
    saveConfig(draftConfig);
    setEditingKey(null);
    setDraftConfig(null);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          Panel alineado con Home público
        </span>
        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">Administración de Home</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Cada módulo corresponde 1 a 1 con una sección real del Home público.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">Módulos</p>
          <p className="mt-3 text-2xl font-semibold text-[#142033]">{modules.length}</p>
        </article>
        <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">Activos</p>
          <p className="mt-3 text-2xl font-semibold text-[#142033]">{activeModules}</p>
        </article>
        <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">Última actualización</p>
          <p className="mt-3 text-lg font-semibold text-[#142033]">{new Date(config.updatedAt).toLocaleString("es-MX")}</p>
        </article>
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 md:p-7">
        <div className="mt-2 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.key} className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5">
                <div className="flex items-start justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2e7ce] text-[#8f6717]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${module.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}>
                    {module.status === "ACTIVE" ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#132035]">{module.name}</h3>
                <p className="mt-1 text-xs font-medium text-[#a07829]">{module.publicReference}</p>
                <p className="mt-2 text-sm text-slate-600">{module.description}</p>

                <div className="mt-4 grid gap-2">
                  <button type="button" onClick={() => openEdit(module.key)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31]">
                    <FilePenLine className="h-4 w-4" /> Editar
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setPreviewKey(module.key)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] px-3 py-2 text-sm font-semibold text-[#3a465a]">
                      <Eye className="h-4 w-4" /> Vista previa
                    </button>
                    <button type="button" onClick={() => handleToggle(module.key)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#ddd1bc] px-3 py-2 text-sm font-semibold text-[#3a465a]">
                      <Power className="h-4 w-4" /> {module.status === "ACTIVE" ? "Desactivar" : "Activar"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {editingModule && draftConfig ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1424]/60 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a07829]">Edición de sección pública</p>
                <h3 className="text-2xl font-semibold text-[#132035]">{editingModule.name}</h3>
              </div>
              <button type="button" onClick={() => setEditingKey(null)} className="rounded-full border border-[#ddd1bc] p-2"><X className="h-4 w-4" /></button>
            </div>

            <form onSubmit={handleSaveEditing} className="space-y-6">
              <ModuleEditor moduleKey={editingModule.key} draftConfig={draftConfig} setDraftConfig={setDraftConfig} />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setEditingKey(null)} className="rounded-xl border border-[#ddd1bc] px-4 py-2 text-sm font-semibold">Cancelar</button>
                <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#111d31]"><Save className="h-4 w-4" /> Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {previewModule ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0c1424]/55 px-4 py-8">
          <div className="w-full max-w-3xl rounded-3xl border border-[#e4dbcf] bg-[#fffdf9] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-[#132035]">Vista previa: {previewModule.name}</h3>
              <button type="button" onClick={() => setPreviewKey(null)} className="rounded-full border border-[#ddd1bc] p-2"><X className="h-4 w-4" /></button>
            </div>
            <PreviewSection moduleKey={previewModule.key} config={config} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-[#dfd2be] px-3 py-2" />
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-4"><h4 className="mb-3 text-base font-semibold text-[#132035]">{title}</h4>{children}</div>;
}

async function fileToDataUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ModuleEditor({ moduleKey, draftConfig, setDraftConfig }: { moduleKey: ModuleKey; draftConfig: HomeContentConfig; setDraftConfig: (config: HomeContentConfig) => void }) {
  const set = (next: HomeContentConfig) => setDraftConfig(next);

  if (moduleKey === "hero") {
    return (
      <div className="space-y-4">
        <SectionCard title="Encabezado de la sección">
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="Badge" value={draftConfig.heroSection.badge} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, badge: value } })} />
            <InputField label="Título (línea 1)" value={draftConfig.heroSection.titleLineOne} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, titleLineOne: value } })} />
            <InputField label="Título destacado" value={draftConfig.heroSection.titleHighlight} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, titleHighlight: value } })} />
            <InputField label="Descripción" value={draftConfig.heroSection.description} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, description: value } })} />
          </div>
        </SectionCard>
        <SectionCard title="Botones y enlaces">
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="Texto botón principal" value={draftConfig.heroSection.primaryButtonText} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, primaryButtonText: value } })} />
            <InputField label="Enlace botón principal" value={draftConfig.heroSection.primaryButtonLink} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, primaryButtonLink: value } })} />
            <InputField label="Texto botón secundario" value={draftConfig.heroSection.secondaryButtonText} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, secondaryButtonText: value } })} />
            <InputField label="Enlace botón secundario" value={draftConfig.heroSection.secondaryButtonLink} onChange={(value) => set({ ...draftConfig, heroSection: { ...draftConfig.heroSection, secondaryButtonLink: value } })} />
          </div>
        </SectionCard>
      </div>
    );
  }

  if (moduleKey === "desarrollo") {
    return (
      <div className="space-y-4">
        <SectionCard title="Encabezado de la sección">
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="Badge" value={draftConfig.developmentSection.badge} onChange={(value) => set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, badge: value } })} />
            <InputField label="Título principal" value={draftConfig.developmentSection.title} onChange={(value) => set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, title: value } })} />
            <InputField label="Subtítulo" value={draftConfig.developmentSection.subtitle} onChange={(value) => set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, subtitle: value } })} />
            <InputField label="Imagen de fondo" value={draftConfig.developmentSection.backgroundImage} onChange={(value) => set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, backgroundImage: value } })} />
          </div>
        </SectionCard>
        <SectionCard title="Lista lateral de puntos">
          {draftConfig.developmentSection.sideList.map((item, index) => (
            <InputField key={index} label={`Punto ${index + 1}`} value={item} onChange={(value) => {
              const next = [...draftConfig.developmentSection.sideList];
              next[index] = value;
              set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, sideList: next } });
            }} />
          ))}
        </SectionCard>
        <VisualCardsEditor cards={draftConfig.developmentSection.cards} onChange={(cards) => set({ ...draftConfig, developmentSection: { ...draftConfig.developmentSection, cards } })} />
      </div>
    );
  }

  if (moduleKey === "servicios") {
    return (
      <div className="space-y-4">
        <SectionCard title="Encabezado de Servicios">
          <div className="grid gap-3 md:grid-cols-2">
            <InputField label="Badge" value={draftConfig.servicesSection.badge} onChange={(value) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, badge: value } })} />
            <InputField label="Título" value={draftConfig.servicesSection.title} onChange={(value) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, title: value } })} />
            <InputField label="Descripción general" value={draftConfig.servicesSection.description} onChange={(value) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, description: value } })} />
            <InputField label="Texto botón" value={draftConfig.servicesSection.buttonText} onChange={(value) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, buttonText: value } })} />
            <InputField label="Enlace botón" value={draftConfig.servicesSection.buttonLink} onChange={(value) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, buttonLink: value } })} />
          </div>
        </SectionCard>
        <ServicesCardsEditor cards={draftConfig.servicesSection.cards} onChange={(cards) => set({ ...draftConfig, servicesSection: { ...draftConfig.servicesSection, cards } })} />
      </div>
    );
  }

  return (
    <SectionCard title="CTA Final">
      <div className="grid gap-3 md:grid-cols-2">
        <InputField label="Título" value={draftConfig.ctaSection.title} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, title: value } })} />
        <InputField label="Texto botón principal" value={draftConfig.ctaSection.primaryButtonText} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, primaryButtonText: value } })} />
        <InputField label="Enlace botón principal" value={draftConfig.ctaSection.primaryButtonLink} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, primaryButtonLink: value } })} />
        <InputField label="Texto botón secundario" value={draftConfig.ctaSection.secondaryButtonText} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, secondaryButtonText: value } })} />
        <InputField label="Enlace botón secundario" value={draftConfig.ctaSection.secondaryButtonLink} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, secondaryButtonLink: value } })} />
        <InputField label="Texto inferior" value={draftConfig.ctaSection.footerText} onChange={(value) => set({ ...draftConfig, ctaSection: { ...draftConfig.ctaSection, footerText: value } })} />
      </div>
    </SectionCard>
  );
}

function VisualCardsEditor({ cards, onChange }: { cards: HomeVisualCard[]; onChange: (cards: HomeVisualCard[]) => void }) {
  return (
    <SectionCard title="Tarjetas visuales (imagen, título, etiqueta, orden, activo)">
      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="rounded-xl border border-[#ece3d6] p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <InputField label="Título" value={card.title} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, title: value } : item))} />
              <InputField label="Etiqueta" value={card.tag} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, tag: value } : item))} />
              <InputField label="Imagen (URL)" value={card.image} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, image: value } : item))} />
              <InputField label="Orden" value={String(card.order)} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, order: Number(value) || item.order } : item))} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={card.active} onChange={(event) => onChange(cards.map((item) => item.id === card.id ? { ...item, active: event.target.checked } : item))} /> Activo</label>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#ddd1bc] px-3 py-1.5 text-xs font-semibold"><input type="file" className="hidden" accept="image/*" onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const image = await fileToDataUrl(file);
                onChange(cards.map((item) => item.id === card.id ? { ...item, image } : item));
              }} />Subir imagen</label>
              <button type="button" onClick={() => onChange(cards.filter((item) => item.id !== card.id))} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3 w-3" /> Eliminar</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...cards, { id: crypto.randomUUID(), title: "Nueva tarjeta", tag: "", image: "/fraccionamiento/carrusel1.jpg", order: cards.length + 1, active: true }])} className="inline-flex items-center gap-2 rounded-xl border border-[#ddd1bc] px-4 py-2 text-sm font-semibold"><Plus className="h-4 w-4" /> Agregar tarjeta</button>
      </div>
    </SectionCard>
  );
}

function ServicesCardsEditor({ cards, onChange }: { cards: HomeServiceCard[]; onChange: (cards: HomeServiceCard[]) => void }) {
  return (
    <SectionCard title="Cards de servicio (imagen, nombre, descripción, orden, activo)">
      <div className="space-y-3">
        {cards.map((card) => (
          <div key={card.id} className="rounded-xl border border-[#ece3d6] p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <InputField label="Nombre" value={card.title} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, title: value } : item))} />
              <InputField label="Imagen (URL)" value={card.image} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, image: value } : item))} />
              <InputField label="Descripción" value={card.description} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, description: value } : item))} />
              <InputField label="Orden" value={String(card.order)} onChange={(value) => onChange(cards.map((item) => item.id === card.id ? { ...item, order: Number(value) || item.order } : item))} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={card.active} onChange={(event) => onChange(cards.map((item) => item.id === card.id ? { ...item, active: event.target.checked } : item))} /> Activo</label>
              <button type="button" onClick={() => onChange(cards.filter((item) => item.id !== card.id))} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3 w-3" /> Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function PreviewSection({ moduleKey, config }: { moduleKey: ModuleKey; config: HomeContentConfig }) {
  if (moduleKey === "desarrollo") {
    return (
      <div className="rounded-2xl border border-[#ece3d6] bg-white p-4">
        <p className="text-xs font-semibold uppercase text-[#a07829]">{config.developmentSection.badge}</p>
        <h4 className="mt-1 text-2xl font-bold">{config.developmentSection.title}</h4>
        <p className="text-sm text-slate-600">{config.developmentSection.subtitle}</p>
      </div>
    );
  }
  if (moduleKey === "servicios") {
    return (
      <div>
        <p className="text-xs font-semibold uppercase text-[#a07829]">{config.servicesSection.badge}</p>
        <h4 className="mt-1 text-2xl font-bold">{config.servicesSection.title}</h4>
        <p className="text-sm text-slate-600">{config.servicesSection.description}</p>
      </div>
    );
  }
  if (moduleKey === "hero") {
    return (
      <div>
        <p className="text-xs font-semibold uppercase text-[#a07829]">{config.heroSection.badge}</p>
        <h4 className="mt-1 text-2xl font-bold">{config.heroSection.titleLineOne} <span className="text-[#a07829]">{config.heroSection.titleHighlight}</span></h4>
        <p className="text-sm text-slate-600">{config.heroSection.description}</p>
      </div>
    );
  }
  return (
    <div>
      <h4 className="text-2xl font-bold">{config.ctaSection.title}</h4>
      <p className="mt-2 text-sm text-slate-600">{config.ctaSection.footerText}</p>
    </div>
  );
}
