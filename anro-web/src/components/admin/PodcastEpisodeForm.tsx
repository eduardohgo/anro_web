"use client";

import { PodcastContentType, PodcastEpisode, PodcastEpisodePayload, PodcastPlatform, PodcastStatus } from "@/lib/types";
import { FormEvent, useMemo, useState } from "react";

const STATUS_OPTIONS: PodcastStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];
const PLATFORM_OPTIONS: PodcastPlatform[] = ["YOUTUBE", "TIKTOK", "SPOTIFY", "OTHER"];
const CONTENT_TYPE_OPTIONS: PodcastContentType[] = ["EPISODE", "CLIP", "INTERVIEW", "SHORT"];

export const emptyEpisodeForm: PodcastEpisodePayload = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  contentType: "EPISODE",
  platform: "YOUTUBE",
  externalUrl: "",
  embedUrl: "",
  thumbnailUrl: "",
  episodeNumber: "",
  seasonNumber: "",
  duration: "",
  guests: "",
  publishedAt: "",
  status: "DRAFT",
  isFeatured: false,
  displayOrder: "0",
};

interface PodcastEpisodeFormProps {
  mode: "create" | "edit";
  initialValues?: PodcastEpisode | null;
  onSubmit: (values: PodcastEpisodePayload) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

function formatDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

function buildFormValues(initialValues?: PodcastEpisode | null): PodcastEpisodePayload {
  if (!initialValues) {
    return emptyEpisodeForm;
  }

  return {
    title: initialValues.title,
    shortDescription: initialValues.shortDescription || "",
    fullDescription: initialValues.fullDescription || "",
    contentType: initialValues.contentType,
    platform: initialValues.platform,
    externalUrl: initialValues.externalUrl || "",
    embedUrl: initialValues.embedUrl || "",
    thumbnailUrl: initialValues.thumbnailUrl || "",
    episodeNumber: initialValues.episodeNumber?.toString() || "",
    seasonNumber: initialValues.seasonNumber?.toString() || "",
    duration: initialValues.duration || "",
    guests: initialValues.guests || "",
    publishedAt: formatDateTimeLocal(initialValues.publishedAt),
    status: initialValues.status,
    isFeatured: initialValues.isFeatured,
    displayOrder: initialValues.displayOrder.toString(),
  };
}

export default function PodcastEpisodeForm({ mode, initialValues, onSubmit, onCancel, isSubmitting }: PodcastEpisodeFormProps) {
  const [formValues, setFormValues] = useState<PodcastEpisodePayload>(() => buildFormValues(initialValues));

  const title = useMemo(
    () => (mode === "create" ? "Crear episodio" : `Editar: ${initialValues?.title || "episodio"}`),
    [initialValues?.title, mode]
  );

  const handleChange = (field: keyof PodcastEpisodePayload, value: string | boolean) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formValues);
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a87810]">Formulario</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
        </div>
        <button type="button" onClick={onCancel} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">Cancelar</button>
      </div>

      <form className="mt-8 space-y-6" onSubmit={submit}>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Título *">
            <input value={formValues.title} onChange={(e) => handleChange("title", e.target.value)} className="input-base" required />
          </Field>
          <Field label="Tipo de contenido">
            <select value={formValues.contentType} onChange={(e) => handleChange("contentType", e.target.value as PodcastContentType)} className="input-base">
              {CONTENT_TYPE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Plataforma">
            <select value={formValues.platform} onChange={(e) => handleChange("platform", e.target.value as PodcastPlatform)} className="input-base">
              {PLATFORM_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={formValues.status} onChange={(e) => handleChange("status", e.target.value as PodcastStatus)} className="input-base">
              {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="URL externa">
            <input value={formValues.externalUrl} onChange={(e) => handleChange("externalUrl", e.target.value)} className="input-base" placeholder="https://..." />
          </Field>
          <Field label="URL embed">
            <input value={formValues.embedUrl} onChange={(e) => handleChange("embedUrl", e.target.value)} className="input-base" placeholder="https://..." />
          </Field>
          <Field label="Thumbnail URL">
            <input value={formValues.thumbnailUrl} onChange={(e) => handleChange("thumbnailUrl", e.target.value)} className="input-base" placeholder="https://..." />
          </Field>
          <Field label="Duración">
            <input value={formValues.duration} onChange={(e) => handleChange("duration", e.target.value)} className="input-base" placeholder="45 min" />
          </Field>
          <Field label="Número de episodio">
            <input type="number" value={formValues.episodeNumber} onChange={(e) => handleChange("episodeNumber", e.target.value)} className="input-base" min="0" />
          </Field>
          <Field label="Número de temporada">
            <input type="number" value={formValues.seasonNumber} onChange={(e) => handleChange("seasonNumber", e.target.value)} className="input-base" min="0" />
          </Field>
          <Field label="Orden de despliegue">
            <input type="number" value={formValues.displayOrder} onChange={(e) => handleChange("displayOrder", e.target.value)} className="input-base" min="0" />
          </Field>
          <Field label="Fecha de publicación">
            <input type="datetime-local" value={formValues.publishedAt} onChange={(e) => handleChange("publishedAt", e.target.value)} className="input-base" />
          </Field>
        </div>

        <Field label="Invitados">
          <input value={formValues.guests} onChange={(e) => handleChange("guests", e.target.value)} className="input-base" placeholder="Nombre 1, Nombre 2" />
        </Field>

        <Field label="Descripción corta">
          <textarea value={formValues.shortDescription} onChange={(e) => handleChange("shortDescription", e.target.value)} className="input-base min-h-28" />
        </Field>

        <Field label="Descripción completa">
          <textarea value={formValues.fullDescription} onChange={(e) => handleChange("fullDescription", e.target.value)} className="input-base min-h-40" />
        </Field>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          <input type="checkbox" checked={formValues.isFeatured} onChange={(e) => handleChange("isFeatured", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#d4a62a] focus:ring-[#d4a62a]" />
          Marcar este episodio como destacado en el frontend público.
        </label>

        <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#be931f] disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? "Guardando..." : mode === "create" ? "Crear episodio" : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}