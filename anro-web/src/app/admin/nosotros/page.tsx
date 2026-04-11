"use client";

import { CheckCircle2, FilePenLine, Save, Sparkles, Wrench, X } from "lucide-react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import type { NosotrosContent } from "@/lib/nosotros-content";
import { DEFAULT_NOSOTROS_CONTENT, resolveNosotrosContent } from "@/lib/nosotros-content";

type SectionKey = "hero" | "about" | "mission" | "vision" | "pillars" | "values" | "cta";

const SECTION_META: Record<
  SectionKey,
  { badge: string; title: string; description: string; editLabel: string; idleMessage: string }
> = {
  hero: {
    badge: "Hero interno",
    title: "Portada institucional de Nosotros",
    description:
      "Define el badge, la narrativa principal, imagen de portada y botones de acción que abren la sección pública de Nosotros.",
    editLabel: "Editar hero",
    idleMessage: "La edición del hero está preparada para actualizar textos clave, imagen y CTAs en un solo flujo.",
  },
  about: {
    badge: "Quiénes somos",
    title: "Bloque Sobre ANRO",
    description:
      "Administra el contenido narrativo principal de la empresa, imagen de soporte y tarjetas de contexto institucional.",
    editLabel: "Editar quiénes somos",
    idleMessage: "La edición del bloque sobre ANRO está lista para ajustar propuesta de valor y mensajes de respaldo.",
  },
  mission: {
    badge: "Misión",
    title: "Propósito corporativo",
    description: "Mantén actualizada la declaración de misión y su mensaje central para toda la comunicación institucional.",
    editLabel: "Editar misión",
    idleMessage: "La edición de misión está preparada para ajustar enfoque y redacción estratégica.",
  },
  vision: {
    badge: "Visión",
    title: "Proyección empresarial",
    description: "Configura la visión de largo plazo con una redacción sólida y coherente con la narrativa de marca.",
    editLabel: "Editar visión",
    idleMessage: "La edición de visión está preparada para actualizar dirección estratégica y posicionamiento.",
  },
  pillars: {
    badge: "Esencia de trabajo",
    title: "Pilares operativos",
    description: "Gestiona el encabezado y la composición visual de los pilares que explican cómo trabaja ANRO.",
    editLabel: "Editar pilares",
    idleMessage: "La edición de pilares está preparada para alinear claridad operativa y narrativa institucional.",
  },
  values: {
    badge: "Valores y fortalezas",
    title: "Cultura y ventajas de ANRO",
    description:
      "Consolida los valores principales y fortalezas operativas dentro de un bloque visual de alta jerarquía.",
    editLabel: "Editar valores",
    idleMessage: "La edición de valores y fortalezas está lista para mantener consistencia entre cultura y ejecución.",
  },
  cta: {
    badge: "CTA final",
    title: "Cierre de conversión",
    description: "Controla el llamado final a la acción con botones y copy orientado a contacto o siguiente paso comercial.",
    editLabel: "Editar CTA final",
    idleMessage: "La edición de CTA final está preparada para optimizar intención de contacto y conversión.",
  },
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
      setMessage("Cambios guardados correctamente");
    } catch {
      setMessage("No fue posible guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setDraft(content);
    setEditing(null);
  };

  if (loading) {
    return (
      <div className="rounded-3xl border border-[#e4dbcf] bg-white p-10 text-center text-slate-600">
        Cargando módulo de Nosotros...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.15),transparent_35%),linear-gradient(135deg,#0e1c36_0%,#16305a_65%,#1f3f70_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.16)] md:px-9 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f3d79a]">Módulo institucional</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Administración de Nosotros</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Rediseñado con el mismo patrón visual del panel de Desarrollo: jerarquía por bloques, preview amplia,
          edición inline y guardado vía API + Prisma en Neon.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {summary.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{item.value}</p>
          </article>
        ))}
      </section>

      {message ? (
        <div className="rounded-2xl border border-[#dcccae] bg-[#fff8eb] px-4 py-3 text-sm font-medium text-[#7d5c1f]">
          {message}
        </div>
      ) : null}

      {(Object.keys(SECTION_META) as SectionKey[]).map((sectionKey) => {
        const meta = SECTION_META[sectionKey];
        const isEditing = editing === sectionKey;

        return (
          <InlineEditorShell
            key={sectionKey}
            badge={meta.badge}
            title={meta.title}
            description={meta.description}
            editLabel={meta.editLabel}
            idleMessage={meta.idleMessage}
            isEditing={isEditing}
            onEdit={() => setEditing(sectionKey)}
            onCancel={cancelEdit}
            onSave={onSave}
            preview={<SectionPreview section={sectionKey} content={draft} />}
          >
            <SectionEditor section={sectionKey} content={draft} setContent={setDraft} saving={saving} />
          </InlineEditorShell>
        );
      })}

      <div className="flex items-center gap-2 rounded-2xl border border-[#d8e4d6] bg-[#f3faf1] px-4 py-3 text-sm text-[#234128]">
        <CheckCircle2 className="h-4 w-4" />
        Fuente de verdad del módulo: Prisma + Neon (sin localStorage).
      </div>
    </div>
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

            <h2 className="mt-4 text-2xl font-semibold text-[#132035] md:text-3xl">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{description}</p>
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
        <div className="overflow-hidden rounded-[28px] border border-[#e8dcc8] bg-[#fcf8f1] p-3 md:p-4">{preview}</div>

        {isEditing ? (
          <div className="mt-6 border-t border-[#ece3d6] pt-6">
            {children}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#ece3d6] pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-[#ddd1bc] bg-white px-5 py-3 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
              >
                <X className="mr-2 inline h-4 w-4" />
                Cancelar
              </button>

              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
              >
                <Save className="h-4 w-4" />
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

function SectionShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] border border-[#ece3d6] bg-white/80 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">{title}</p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function TextArea({
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
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function SectionPreview({ section, content }: { section: SectionKey; content: NosotrosContent }) {
  if (section === "hero") {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-3xl border border-[#e5d7bf] bg-[linear-gradient(135deg,#102446_0%,#1a3360_100%)] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1d38f]">{content.hero.badge}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight md:text-3xl">
            {content.hero.titleWhite} <span className="text-[#f4cc70]">{content.hero.titleGold}</span>
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-200">{content.hero.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-xl bg-[#d4a62a] px-4 py-2 text-xs font-semibold text-[#1b160f]">{content.hero.primaryButtonText}</span>
            <span className="rounded-xl border border-white/35 px-4 py-2 text-xs font-semibold">{content.hero.secondaryButtonText}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#e5d7bf] bg-white">
          <img src={content.hero.image} alt="Hero Nosotros" className="h-64 w-full object-cover" />
          <div className="border-t border-[#ece3d6] p-4 text-xs text-slate-600">Imagen principal del hero.</div>
        </div>
      </div>
    );
  }

  if (section === "about") {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-[#e5d7bf] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">{content.about.badge}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#132035]">{content.about.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{content.about.paragraph1}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{content.about.paragraph2}</p>
          </article>
          <img src={content.about.image} alt="Sobre ANRO" className="h-full min-h-[280px] w-full rounded-3xl border border-[#e5d7bf] object-cover" />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {content.about.cards.map((card) => (
            <article key={card.id} className="rounded-2xl border border-[#e5d7bf] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">{card.label}</p>
              <h4 className="mt-2 text-lg font-semibold text-[#132035]">{card.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (section === "mission" || section === "vision") {
    const module = section === "mission" ? content.mission : content.vision;
    return (
      <div className="rounded-3xl border border-[#e5d7bf] bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">{module.badge}</p>
        <h3 className="mt-3 text-2xl font-semibold text-[#132035]">{module.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{module.description}</p>
      </div>
    );
  }

  if (section === "pillars") {
    return (
      <div className="space-y-4">
        <article className="rounded-3xl border border-[#e5d7bf] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">{content.pillars.badge}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#132035]">{content.pillars.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{content.pillars.description}</p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          {content.pillars.items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#e5d7bf] bg-white p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#a0741e]">{item.number}</p>
              <h4 className="mt-2 text-base font-semibold text-[#132035]">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (section === "values") {
    return (
      <div className="space-y-4">
        <article className="rounded-3xl border border-[#e5d7bf] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">{content.values.badge}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#132035]">{content.values.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{content.values.description}</p>
        </article>
        <div className="grid gap-3 md:grid-cols-2">
          {content.values.items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#e5d7bf] bg-white p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#a0741e]">{item.number}</p>
              <h4 className="mt-2 text-base font-semibold text-[#132035]">{item.title}</h4>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
        <article className="rounded-3xl border border-[#e5d7bf] bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">Fortalezas</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {content.values.strengths.map((strength) => (
              <div key={strength.id} className="rounded-2xl border border-[#f0e6d6] bg-[#fffdf8] p-4">
                <p className="font-semibold text-[#132035]">{strength.title}</p>
                <p className="mt-2 text-sm text-slate-600">{strength.text}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#e5d7bf] bg-[linear-gradient(135deg,#0f2444_0%,#1b3967_100%)] p-6 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4d78e]">{content.cta.badge}</p>
      <h3 className="mt-3 text-2xl font-semibold">{content.cta.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-200">{content.cta.description}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-xl bg-[#d4a62a] px-4 py-2 text-xs font-semibold text-[#1b160f]">{content.cta.primaryButtonText}</span>
        <span className="rounded-xl border border-white/35 px-4 py-2 text-xs font-semibold">{content.cta.secondaryButtonText}</span>
      </div>
    </div>
  );
}

function SectionEditor({
  section,
  content,
  setContent,
  saving,
}: {
  section: SectionKey;
  content: NosotrosContent;
  setContent: Dispatch<SetStateAction<NosotrosContent>>;
  saving: boolean;
}) {
  if (section === "hero") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Encabezado y contenido">
          <Field label="Badge" value={content.hero.badge} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, badge: value } }))} />
          <Field label="Título blanco" value={content.hero.titleWhite} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titleWhite: value } }))} />
          <Field label="Título dorado" value={content.hero.titleGold} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, titleGold: value } }))} />
          <TextArea label="Descripción" value={content.hero.description} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, description: value } }))} />
          <Field label="Imagen" value={content.hero.image} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, image: value } }))} />
        </SectionShell>

        <SectionShell title="Botones">
          <Field label="Texto botón primario" value={content.hero.primaryButtonText} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, primaryButtonText: value } }))} />
          <Field label="Link botón primario" value={content.hero.primaryButtonLink} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, primaryButtonLink: value } }))} />
          <Field label="Texto botón secundario" value={content.hero.secondaryButtonText} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, secondaryButtonText: value } }))} />
          <Field label="Link botón secundario" value={content.hero.secondaryButtonLink} onChange={(value) => setContent((prev) => ({ ...prev, hero: { ...prev.hero, secondaryButtonLink: value } }))} />
          <p className="inline-flex items-center gap-2 rounded-2xl border border-[#ebdfcb] bg-[#fffaf1] px-4 py-3 text-sm text-[#6c5531]"><Sparkles className="h-4 w-4" />{saving ? "Guardando cambios..." : "Listo para guardar cambios del hero."}</p>
        </SectionShell>
      </div>
    );
  }

  if (section === "about") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Contenido principal">
          <Field label="Badge" value={content.about.badge} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, badge: value } }))} />
          <Field label="Título" value={content.about.title} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, title: value } }))} />
          <TextArea label="Párrafo 1" value={content.about.paragraph1} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, paragraph1: value } }))} />
          <TextArea label="Párrafo 2" value={content.about.paragraph2} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, paragraph2: value } }))} />
          <Field label="Imagen" value={content.about.image} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, image: value } }))} />
        </SectionShell>

        <SectionShell title="Tarjetas informativas">
          {content.about.cards.map((card, index) => (
            <div key={card.id} className="space-y-3 rounded-2xl border border-[#efe4d2] bg-[#fffdfa] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">Tarjeta {index + 1}</p>
              <Field label="Etiqueta" value={card.label} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, cards: prev.about.cards.map((current) => (current.id === card.id ? { ...current, label: value } : current)) } }))} />
              <Field label="Título" value={card.title} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, cards: prev.about.cards.map((current) => (current.id === card.id ? { ...current, title: value } : current)) } }))} />
              <TextArea label="Texto" value={card.text} onChange={(value) => setContent((prev) => ({ ...prev, about: { ...prev.about, cards: prev.about.cards.map((current) => (current.id === card.id ? { ...current, text: value } : current)) } }))} rows={3} />
            </div>
          ))}
        </SectionShell>
      </div>
    );
  }

  if (section === "mission" || section === "vision") {
    const key = section;
    const model = key === "mission" ? content.mission : content.vision;

    return (
      <SectionShell title="Encabezado y descripción">
        <Field label="Badge" value={model.badge} onChange={(value) => setContent((prev) => ({ ...prev, [key]: { ...prev[key], badge: value } }))} />
        <Field label="Título" value={model.title} onChange={(value) => setContent((prev) => ({ ...prev, [key]: { ...prev[key], title: value } }))} />
        <TextArea label="Descripción" value={model.description} onChange={(value) => setContent((prev) => ({ ...prev, [key]: { ...prev[key], description: value } }))} rows={5} />
      </SectionShell>
    );
  }

  if (section === "pillars") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Encabezado de sección">
          <Field label="Badge" value={content.pillars.badge} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, badge: value } }))} />
          <Field label="Título" value={content.pillars.title} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, title: value } }))} />
          <TextArea label="Descripción" value={content.pillars.description} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, description: value } }))} />
        </SectionShell>

        <SectionShell title="Listado de pilares">
          {content.pillars.items.map((item, index) => (
            <div key={item.id} className="space-y-3 rounded-2xl border border-[#efe4d2] bg-[#fffdfa] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">Pilar {index + 1}</p>
              <Field label="Número" value={item.number} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, items: prev.pillars.items.map((current) => (current.id === item.id ? { ...current, number: value } : current)) } }))} />
              <Field label="Título" value={item.title} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, items: prev.pillars.items.map((current) => (current.id === item.id ? { ...current, title: value } : current)) } }))} />
              <TextArea label="Descripción" value={item.description} onChange={(value) => setContent((prev) => ({ ...prev, pillars: { ...prev.pillars, items: prev.pillars.items.map((current) => (current.id === item.id ? { ...current, description: value } : current)) } }))} rows={3} />
            </div>
          ))}
        </SectionShell>
      </div>
    );
  }

  if (section === "values") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionShell title="Encabezado de valores">
          <Field label="Badge" value={content.values.badge} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, badge: value } }))} />
          <Field label="Título" value={content.values.title} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, title: value } }))} />
          <TextArea label="Descripción" value={content.values.description} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, description: value } }))} />
        </SectionShell>

        <SectionShell title="Valores y fortalezas">
          {content.values.items.map((item, index) => (
            <div key={item.id} className="space-y-3 rounded-2xl border border-[#efe4d2] bg-[#fffdfa] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">Valor {index + 1}</p>
              <Field label="Número" value={item.number} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, items: prev.values.items.map((current) => (current.id === item.id ? { ...current, number: value } : current)) } }))} />
              <Field label="Título" value={item.title} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, items: prev.values.items.map((current) => (current.id === item.id ? { ...current, title: value } : current)) } }))} />
              <TextArea label="Texto" value={item.text} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, items: prev.values.items.map((current) => (current.id === item.id ? { ...current, text: value } : current)) } }))} rows={3} />
            </div>
          ))}

          {content.values.strengths.map((strength, index) => (
            <div key={strength.id} className="space-y-3 rounded-2xl border border-[#efe4d2] bg-[#fffdfa] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a0741e]">Fortaleza {index + 1}</p>
              <Field label="Título" value={strength.title} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, strengths: prev.values.strengths.map((current) => (current.id === strength.id ? { ...current, title: value } : current)) } }))} />
              <TextArea label="Texto" value={strength.text} onChange={(value) => setContent((prev) => ({ ...prev, values: { ...prev.values, strengths: prev.values.strengths.map((current) => (current.id === strength.id ? { ...current, text: value } : current)) } }))} rows={3} />
            </div>
          ))}
        </SectionShell>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <SectionShell title="Encabezado CTA">
        <Field label="Badge" value={content.cta.badge} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, badge: value } }))} />
        <Field label="Título" value={content.cta.title} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, title: value } }))} />
        <TextArea label="Descripción" value={content.cta.description} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, description: value } }))} />
      </SectionShell>

      <SectionShell title="Botones CTA">
        <Field label="Texto botón primario" value={content.cta.primaryButtonText} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, primaryButtonText: value } }))} />
        <Field label="Link botón primario" value={content.cta.primaryButtonLink} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, primaryButtonLink: value } }))} />
        <Field label="Texto botón secundario" value={content.cta.secondaryButtonText} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, secondaryButtonText: value } }))} />
        <Field label="Link botón secundario" value={content.cta.secondaryButtonLink} onChange={(value) => setContent((prev) => ({ ...prev, cta: { ...prev.cta, secondaryButtonLink: value } }))} />
      </SectionShell>
    </div>
  );
}
