"use client";

import { CheckCircle2, FilePenLine, Save, Sparkles, Wrench, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NosotrosContent } from "@/lib/nosotros-content";
import { DEFAULT_NOSOTROS_CONTENT, resolveNosotrosContent } from "@/lib/nosotros-content";

type SectionKey = "hero" | "about" | "mission" | "vision" | "pillars" | "values" | "cta";

const SECTION_TITLES: Record<SectionKey, string> = {
  hero: "Hero interno",
  about: "Quiénes somos / Sobre ANRO",
  mission: "Misión",
  vision: "Visión",
  pillars: "Pilares de trabajo",
  values: "Valores y fortalezas",
  cta: "CTA final",
};

export default function AdminNosotrosPage() {
  const [content, setContent] = useState<NosotrosContent>(DEFAULT_NOSOTROS_CONTENT);
  const [draft, setDraft] = useState<NosotrosContent>(DEFAULT_NOSOTROS_CONTENT);
  const [editing, setEditing] = useState<SectionKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/admin/nosotros", { cache: "no-store" });
        const payload = await response.json();
        const normalized = resolveNosotrosContent(payload);
        setContent(normalized);
        setDraft(normalized);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const summary = useMemo(
    () => [
      { label: "Secciones editables", value: "7" },
      { label: "Pilares", value: String(draft.pillars.items.length) },
      { label: "Valores", value: String(draft.values.items.length) },
      { label: "Fortalezas", value: String(draft.values.strengths.length) },
    ],
    [draft]
  );

  const onSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload: NosotrosContent = { ...draft, updatedAt: new Date().toISOString() };
      const response = await fetch("/api/admin/nosotros", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("No se pudo guardar");

      const saved = resolveNosotrosContent(await response.json());
      setContent(saved);
      setDraft(saved);
      setEditing(null);
      setMessage("Cambios guardados correctamente en Neon.");
    } catch {
      setMessage("Error al guardar. Revisa conexión y vuelve a intentar.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setDraft(content);
    setEditing(null);
  };

  if (loading) {
    return <div className="rounded-3xl border border-[#e4dbcf] bg-white p-10 text-center text-slate-600">Cargando módulo de Nosotros...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.15),transparent_35%),linear-gradient(135deg,#0e1c36_0%,#16305a_65%,#1f3f70_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.16)] md:px-9 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f3d79a]">Módulo institucional</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Administración de Nosotros</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Edita la ventana pública de Nosotros con el mismo flujo del panel: preview por bloque, edición inline y persistencia en Neon.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {summary.map((item) => (
          <article key={item.label} className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{item.value}</p>
          </article>
        ))}
      </section>

      {message && (
        <div className="rounded-2xl border border-[#dcccae] bg-[#fff8eb] px-4 py-3 text-sm font-medium text-[#7d5c1f]">{message}</div>
      )}

      {(Object.keys(SECTION_TITLES) as SectionKey[]).map((key) => {
        const isEditing = editing === key;
        return (
          <section key={key} className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Sección</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#132035]">{SECTION_TITLES[key]}</h2>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <button onClick={() => setEditing(key)} className="inline-flex items-center gap-2 rounded-xl bg-[#14284b] px-4 py-2 text-sm font-semibold text-white">
                    <FilePenLine className="h-4 w-4" /> Editar
                  </button>
                ) : (
                  <>
                    <button onClick={cancelEdit} className="inline-flex items-center gap-2 rounded-xl border border-[#dcccae] bg-white px-4 py-2 text-sm font-semibold text-[#7c5a1b]"><X className="h-4 w-4" /> Cancelar</button>
                    <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#1f1a17]"><Save className="h-4 w-4" /> {saving ? "Guardando..." : "Guardar"}</button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5">
                <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f7822]"><Sparkles className="h-4 w-4" /> Preview</p>
                <SectionPreview section={key} content={draft} />
              </div>
              {isEditing && (
                <div className="rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5">
                  <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f7822]"><Wrench className="h-4 w-4" /> Editor</p>
                  <SectionEditor section={key} content={draft} setContent={setDraft} />
                </div>
              )}
            </div>
          </section>
        );
      })}

      <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Fuente de verdad del módulo: Prisma + Neon (sin localStorage).</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-[#dbcfbf] bg-white px-3 py-2 text-sm outline-none ring-[#d4a62a] focus:ring" />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} className="w-full rounded-xl border border-[#dbcfbf] bg-white px-3 py-2 text-sm outline-none ring-[#d4a62a] focus:ring" />
    </label>
  );
}

function SectionPreview({ section, content }: { section: SectionKey; content: NosotrosContent }) {
  if (section === "hero") return <div><p className="text-sm text-slate-500">{content.hero.badge}</p><h3 className="text-2xl font-bold text-[#132035]">{content.hero.titleWhite} <span className="text-[#b4871f]">{content.hero.titleGold}</span></h3><p className="mt-2 text-sm text-slate-600">{content.hero.description}</p></div>;
  if (section === "about") return <div><h3 className="text-xl font-bold text-[#132035]">{content.about.title}</h3><p className="mt-2 text-sm text-slate-600">{content.about.paragraph1}</p><ul className="mt-3 space-y-2">{content.about.cards.map((card) => <li key={card.id} className="rounded-xl bg-[#f7f2e8] p-3 text-sm"><strong>{card.title}</strong><p>{card.text}</p></li>)}</ul></div>;
  if (section === "mission") return <SimplePreview title={content.mission.title} description={content.mission.description} />;
  if (section === "vision") return <SimplePreview title={content.vision.title} description={content.vision.description} />;
  if (section === "pillars") return <div><h3 className="text-xl font-bold text-[#132035]">{content.pillars.title}</h3><div className="mt-3 grid gap-2">{content.pillars.items.map((item) => <div key={item.id} className="rounded-xl border border-[#e8dcc8] p-3 text-sm"><p className="font-semibold">{item.number}. {item.title}</p><p className="text-slate-600">{item.description}</p></div>)}</div></div>;
  if (section === "values") return <div><h3 className="text-xl font-bold text-[#132035]">{content.values.title}</h3><p className="mt-2 text-sm text-slate-600">{content.values.description}</p><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#9f7822]">Fortalezas</p><ul className="mt-2 space-y-2">{content.values.strengths.map((strength) => <li key={strength.id} className="text-sm text-slate-700">• {strength.title}</li>)}</ul></div>;
  return <SimplePreview title={content.cta.title} description={content.cta.description} />;
}

function SimplePreview({ title, description }: { title: string; description: string }) {
  return <div><h3 className="text-xl font-bold text-[#132035]">{title}</h3><p className="mt-2 text-sm text-slate-600">{description}</p></div>;
}

function SectionEditor({ section, content, setContent }: { section: SectionKey; content: NosotrosContent; setContent: Dispatch<SetStateAction<NosotrosContent>> }) {
  if (section === "hero") {
    return <div className="space-y-3"><Field label="Badge" value={content.hero.badge} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, badge: value } }))} /><Field label="Título blanco" value={content.hero.titleWhite} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titleWhite: value } }))} /><Field label="Título dorado" value={content.hero.titleGold} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titleGold: value } }))} /><TextArea label="Descripción" value={content.hero.description} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, description: value } }))} /></div>;
  }
  if (section === "about") {
    return <div className="space-y-3"><Field label="Título" value={content.about.title} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, title: value } }))} /><TextArea label="Párrafo 1" value={content.about.paragraph1} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, paragraph1: value } }))} /><TextArea label="Párrafo 2" value={content.about.paragraph2} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, paragraph2: value } }))} /></div>;
  }
  if (section === "mission") return <div className="space-y-3"><Field label="Título" value={content.mission.title} onChange={(value) => setContent((prev) => ({ ...prev, mission: { ...prev.mission, title: value } }))} /><TextArea label="Descripción" value={content.mission.description} onChange={(value) => setContent((prev) => ({ ...prev, mission: { ...prev.mission, description: value } }))} /></div>;
  if (section === "vision") return <div className="space-y-3"><Field label="Título" value={content.vision.title} onChange={(value) => setContent((prev) => ({ ...prev, vision: { ...prev.vision, title: value } }))} /><TextArea label="Descripción" value={content.vision.description} onChange={(value) => setContent((prev) => ({ ...prev, vision: { ...prev.vision, description: value } }))} /></div>;
  if (section === "pillars") return <div className="space-y-3"><Field label="Título" value={content.pillars.title} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, title: value } }))} /><TextArea label="Descripción" value={content.pillars.description} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, description: value } }))} /></div>;
  if (section === "values") return <div className="space-y-3"><Field label="Título" value={content.values.title} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, title: value } }))} /><TextArea label="Descripción" value={content.values.description} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, description: value } }))} /></div>;
  return <div className="space-y-3"><Field label="Título" value={content.cta.title} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, title: value } }))} /><TextArea label="Descripción" value={content.cta.description} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, description: value } }))} /></div>;
}
