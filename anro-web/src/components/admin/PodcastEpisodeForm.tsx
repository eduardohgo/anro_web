"use client";

import {
  PodcastContentType,
  PodcastEpisode,
  PodcastEpisodeErrors,
  PodcastEpisodeField,
  PodcastEpisodePayload,
  PodcastPlatform,
  PodcastStatus,
} from "@/lib/types";
import { AlertCircle, ImagePlus } from "lucide-react";
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

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateEpisodeForm(values: PodcastEpisodePayload): PodcastEpisodeErrors {
  const errors: PodcastEpisodeErrors = {};

  if (!values.title.trim()) {
    errors.title = "El título es obligatorio.";
  }

  const urlFields: Array<keyof Pick<PodcastEpisodePayload, "externalUrl" | "embedUrl" | "thumbnailUrl">> = [
    "externalUrl",
    "embedUrl",
    "thumbnailUrl",
  ];

  for (const field of urlFields) {
    const value = values[field].trim();
    if (value && !isValidUrl(value)) {
      errors[field] = "Ingresa una URL válida con http:// o https://.";
    }
  }

  const numericFieldErrors: Array<[keyof Pick<PodcastEpisodePayload, "episodeNumber" | "seasonNumber" | "displayOrder">, string]> = [
    ["episodeNumber", "El número de episodio debe ser numérico."],
    ["seasonNumber", "El número de temporada debe ser numérico."],
    ["displayOrder", "El orden de despliegue debe ser numérico."],
  ];

  for (const [field, message] of numericFieldErrors) {
    const value = values[field].trim();
    if (value && Number.isNaN(Number(value))) {
      errors[field] = message;
    }
  }

  if (values.publishedAt.trim()) {
    const parsedDate = new Date(values.publishedAt);
    if (Number.isNaN(parsedDate.getTime())) {
      errors.publishedAt = "La fecha de publicación no tiene un formato válido.";
    }
  }

  return errors;
}

export default function PodcastEpisodeForm({ mode, initialValues, onSubmit, onCancel, isSubmitting }: PodcastEpisodeFormProps) {
  const [formValues, setFormValues] = useState<PodcastEpisodePayload>(() => buildFormValues(initialValues));
  const [errors, setErrors] = useState<PodcastEpisodeErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const title = useMemo(
    () => (mode === "create" ? "Crear episodio" : `Editar: ${initialValues?.title || "episodio"}`),
    [initialValues?.title, mode]
  );

  const isEditing = mode === "edit";

  const handleChange = (field: PodcastEpisodeField, value: string | boolean) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateEpisodeForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError("Revisa los campos marcados antes de continuar.");
      return;
    }

    setErrors({});
    setFormError(null);
    await onSubmit(formValues);
  };

  return (
    <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a87810]">
            {isEditing ? "Modo edición" : "Nuevo episodio"}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isEditing
              ? "Actualiza el contenido y guarda cambios sin perder el contexto del episodio seleccionado."
              : "Completa los campos para agregar un nuevo episodio al catálogo administrativo."}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          {isEditing ? "Salir de edición" : "Limpiar"}
        </button>
      </div>

      {formError && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={submit} noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Título *" error={errors.title}>
            <input value={formValues.title} onChange={(e) => handleChange("title", e.target.value)} className={inputClassName(errors.title)} required />
          </Field>
          <Field label="Tipo de contenido">
            <select value={formValues.contentType} onChange={(e) => handleChange("contentType", e.target.value as PodcastContentType)} className={inputClassName()}>
              {CONTENT_TYPE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Plataforma">
            <select value={formValues.platform} onChange={(e) => handleChange("platform", e.target.value as PodcastPlatform)} className={inputClassName()}>
              {PLATFORM_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={formValues.status} onChange={(e) => handleChange("status", e.target.value as PodcastStatus)} className={inputClassName()}>
              {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="URL externa" error={errors.externalUrl}>
            <input value={formValues.externalUrl} onChange={(e) => handleChange("externalUrl", e.target.value)} className={inputClassName(errors.externalUrl)} placeholder="https://..." />
          </Field>
          <Field label="URL embed" error={errors.embedUrl}>
            <input value={formValues.embedUrl} onChange={(e) => handleChange("embedUrl", e.target.value)} className={inputClassName(errors.embedUrl)} placeholder="https://..." />
          </Field>
          <Field label="Thumbnail URL" error={errors.thumbnailUrl}>
            <input value={formValues.thumbnailUrl} onChange={(e) => handleChange("thumbnailUrl", e.target.value)} className={inputClassName(errors.thumbnailUrl)} placeholder="https://..." />
          </Field>
          <Field label="Duración">
            <input value={formValues.duration} onChange={(e) => handleChange("duration", e.target.value)} className={inputClassName()} placeholder="45 min" />
          </Field>
          <Field label="Número de episodio" error={errors.episodeNumber}>
            <input type="number" value={formValues.episodeNumber} onChange={(e) => handleChange("episodeNumber", e.target.value)} className={inputClassName(errors.episodeNumber)} min="0" />
          </Field>
          <Field label="Número de temporada" error={errors.seasonNumber}>
            <input type="number" value={formValues.seasonNumber} onChange={(e) => handleChange("seasonNumber", e.target.value)} className={inputClassName(errors.seasonNumber)} min="0" />
          </Field>
          <Field label="Orden de despliegue" error={errors.displayOrder}>
            <input type="number" value={formValues.displayOrder} onChange={(e) => handleChange("displayOrder", e.target.value)} className={inputClassName(errors.displayOrder)} min="0" />
          </Field>
          <Field label="Fecha de publicación" error={errors.publishedAt}>
            <input type="datetime-local" value={formValues.publishedAt} onChange={(e) => handleChange("publishedAt", e.target.value)} className={inputClassName(errors.publishedAt)} />
          </Field>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <ImagePlus className="mt-0.5 h-4 w-4 shrink-0 text-[#a87810]" />
            <div>
              <p className="font-medium text-slate-800">Miniatura preparada para evolución</p>
              <p className="mt-1 leading-6">
                Actualmente puedes trabajar con <code>thumbnailUrl</code> como texto. El backend ya cuenta con la base
                para un futuro upload admin en <code>/api/admin/uploads/podcast-image</code> sin romper este flujo.
              </p>
            </div>
          </div>
        </div>

        <Field label="Invitados">
          <input value={formValues.guests} onChange={(e) => handleChange("guests", e.target.value)} className={inputClassName()} placeholder="Nombre 1, Nombre 2" />
        </Field>

        <Field label="Descripción corta">
          <textarea value={formValues.shortDescription} onChange={(e) => handleChange("shortDescription", e.target.value)} className={`${inputClassName()} min-h-28`} />
        </Field>

        <Field label="Descripción completa">
          <textarea value={formValues.fullDescription} onChange={(e) => handleChange("fullDescription", e.target.value)} className={`${inputClassName()} min-h-40`} />
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

function inputClassName(error?: string) {
  return error ? "input-base input-error" : "input-base";
}

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <span className="mt-2 block text-sm text-rose-600">{error}</span>}
    </label>
  );
}

export { validateEpisodeForm };
