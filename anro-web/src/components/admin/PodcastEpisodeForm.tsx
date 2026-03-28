"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  PodcastEpisode,
  PodcastEpisodePayload,
  PodcastPlatform,
  PodcastStatus,
} from "@/lib/types";
import {
  AlertCircle,
  CalendarDays,
  ImageIcon,
  Info,
  Link2,
  LoaderCircle,
  Save,
  Sparkles,
  Star,
  Youtube,
} from "lucide-react";

type Mode = "create" | "edit";

type Props = {
  mode: Mode;
  initialValues: PodcastEpisode | null;
  onSubmit: (values: PodcastEpisodePayload) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

type FormErrors = Partial<Record<keyof PodcastEpisodePayload, string>>;

const defaultValues: PodcastEpisodePayload = {
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

const contentTypeOptions = [
  { label: "Episodio", value: "EPISODE" },
  { label: "Clip", value: "CLIP" },
  { label: "Entrevista", value: "INTERVIEW" },
  { label: "Corto", value: "SHORT" },
] as const;

const platformOptions: Array<{ label: string; value: PodcastPlatform }> = [
  { label: "YouTube", value: "YOUTUBE" },
  { label: "TikTok", value: "TIKTOK" },
  { label: "Otra", value: "OTHER" },
];

const statusOptions: Array<{ label: string; value: PodcastStatus }> = [
  { label: "Borrador", value: "DRAFT" },
  { label: "Publicado", value: "PUBLISHED" },
  { label: "Archivado", value: "ARCHIVED" },
];

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function toInputDateTime(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

function extractYouTubeId(value: string | null | undefined) {
  if (!value) return "";

  const raw = value.trim();
  if (!raw) return "";

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const parsed = new URL(raw);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").trim();
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.includes("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split(/[?&/]/)[0] ?? "";
      }

      return parsed.searchParams.get("v") ?? "";
    }

    if (parsed.hostname.includes("img.youtube.com")) {
      const parts = parsed.pathname.split("/");
      const viIndex = parts.findIndex((part) => part === "vi");
      if (viIndex !== -1 && parts[viIndex + 1]) {
        return parts[viIndex + 1];
      }
    }

    return "";
  } catch {
    return "";
  }
}

function buildYouTubeWatchUrl(id: string) {
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}

function buildYouTubeEmbedUrl(id: string) {
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function buildYouTubeThumbnailUrl(id: string) {
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function extractTikTokVideoId(value: string | null | undefined) {
  if (!value) return "";

  const raw = value.trim();
  if (!raw) return "";

  if (/^\d{8,25}$/.test(raw)) return raw;

  try {
    const parsed = new URL(raw);
    const match = parsed.pathname.match(/\/video\/(\d+)/);
    if (match?.[1]) return match[1];
    return "";
  } catch {
    return "";
  }
}

function buildTikTokEmbedUrl(id: string) {
  return id ? `https://www.tiktok.com/embed/v2/${id}` : "";
}

function fromEpisodeToFormValues(episode: PodcastEpisode): PodcastEpisodePayload {
  const unifiedDescription =
    episode.fullDescription ?? episode.shortDescription ?? "";

  return {
    title: episode.title ?? "",
    shortDescription: unifiedDescription,
    fullDescription: unifiedDescription,
    contentType: episode.contentType ?? "EPISODE",
    platform: episode.platform ?? "YOUTUBE",
    externalUrl: episode.externalUrl ?? "",
    embedUrl: episode.embedUrl ?? "",
    thumbnailUrl: episode.thumbnailUrl ?? "",
    episodeNumber: episode.episodeNumber?.toString() ?? "",
    seasonNumber: episode.seasonNumber?.toString() ?? "",
    duration: episode.duration ?? "",
    guests: episode.guests ?? "",
    publishedAt: toInputDateTime(episode.publishedAt),
    status: episode.status ?? "DRAFT",
    isFeatured: Boolean(episode.isFeatured),
    displayOrder: episode.displayOrder?.toString() ?? "0",
  };
}

function getInitialFormValues(
  mode: Mode,
  initialValues: PodcastEpisode | null
): PodcastEpisodePayload {
  if (mode === "edit" && initialValues) {
    return fromEpisodeToFormValues(initialValues);
  }
  return defaultValues;
}

export default function PodcastEpisodeForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: Props) {
  const initialFormValues = useMemo(
    () => getInitialFormValues(mode, initialValues),
    [mode, initialValues]
  );

  const [values, setValues] = useState<PodcastEpisodePayload>(() => initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const initialPlatformVideoValue = useMemo(() => {
    if (initialFormValues.platform === "YOUTUBE") {
      return (
        extractYouTubeId(initialFormValues.externalUrl) ||
        extractYouTubeId(initialFormValues.embedUrl) ||
        extractYouTubeId(initialFormValues.thumbnailUrl)
      );
    }

    if (initialFormValues.platform === "TIKTOK") {
      return (
        extractTikTokVideoId(initialFormValues.externalUrl) ||
        extractTikTokVideoId(initialFormValues.embedUrl)
      );
    }

    return "";
  }, [initialFormValues]);

  const [platformVideoValue, setPlatformVideoValue] = useState<string>(
    () => initialPlatformVideoValue
  );

  const formTitle = useMemo(
    () => (mode === "edit" ? "Editar episodio" : "Nuevo episodio"),
    [mode]
  );

  const generatedPlatformUrls = useMemo(() => {
    const raw = platformVideoValue.trim();

    if (values.platform === "YOUTUBE" && raw) {
      return {
        externalUrl: buildYouTubeWatchUrl(raw),
        embedUrl: buildYouTubeEmbedUrl(raw),
        thumbnailUrl: buildYouTubeThumbnailUrl(raw),
      };
    }

    if (values.platform === "TIKTOK" && raw) {
      const maybeId = extractTikTokVideoId(raw);

      if (maybeId) {
        return {
          externalUrl: raw.startsWith("http") ? raw : values.externalUrl,
          embedUrl: buildTikTokEmbedUrl(maybeId),
          thumbnailUrl: values.thumbnailUrl,
        };
      }
    }

    return {
      externalUrl: values.externalUrl,
      embedUrl: values.embedUrl,
      thumbnailUrl: values.thumbnailUrl,
    };
  }, [
    platformVideoValue,
    values.platform,
    values.externalUrl,
    values.embedUrl,
    values.thumbnailUrl,
  ]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    const finalExternalUrl =
      values.platform === "YOUTUBE" || values.platform === "TIKTOK"
        ? generatedPlatformUrls.externalUrl
        : values.externalUrl;

    const finalEmbedUrl =
      values.platform === "YOUTUBE" || values.platform === "TIKTOK"
        ? generatedPlatformUrls.embedUrl
        : values.embedUrl;

    const finalThumbnailUrl =
      values.platform === "YOUTUBE" || values.platform === "TIKTOK"
        ? generatedPlatformUrls.thumbnailUrl
        : values.thumbnailUrl;

    if (!values.title.trim()) {
      nextErrors.title = "El título es obligatorio.";
    }

    if (finalExternalUrl && !isValidUrl(finalExternalUrl)) {
      nextErrors.externalUrl = "Ingresa una URL externa válida.";
    }

    if (finalEmbedUrl && !isValidUrl(finalEmbedUrl)) {
      nextErrors.embedUrl = "Ingresa una URL embed válida.";
    }

    if (finalThumbnailUrl && !isValidUrl(finalThumbnailUrl)) {
      nextErrors.thumbnailUrl = "Ingresa una URL de miniatura válida.";
    }

    if (values.episodeNumber && Number.isNaN(Number(values.episodeNumber))) {
      nextErrors.episodeNumber = "Debe ser numérico.";
    }

    if (values.seasonNumber && Number.isNaN(Number(values.seasonNumber))) {
      nextErrors.seasonNumber = "Debe ser numérico.";
    }

    if (values.displayOrder && Number.isNaN(Number(values.displayOrder))) {
      nextErrors.displayOrder = "Debe ser numérico.";
    }

    if (values.publishedAt && Number.isNaN(new Date(values.publishedAt).getTime())) {
      nextErrors.publishedAt = "Ingresa una fecha válida.";
    }

    if (values.platform === "YOUTUBE" && !platformVideoValue.trim()) {
      nextErrors.embedUrl = "Para YouTube, captura el ID del video.";
    }

    if (values.platform === "TIKTOK" && !platformVideoValue.trim()) {
      nextErrors.embedUrl =
        "Para TikTok, captura el ID del video o la URL completa del video.";
    }

    return nextErrors;
  };

  const handleChange = <K extends keyof PodcastEpisodePayload>(
    field: K,
    value: PodcastEpisodePayload[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleReset = () => {
    setValues(initialFormValues);
    setPlatformVideoValue(initialPlatformVideoValue);
    setErrors({});
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const unifiedDescription = values.fullDescription.trim();

    const finalValues: PodcastEpisodePayload =
      values.platform === "YOUTUBE" || values.platform === "TIKTOK"
        ? {
            ...values,
            shortDescription: unifiedDescription,
            fullDescription: unifiedDescription,
            externalUrl: generatedPlatformUrls.externalUrl,
            embedUrl: generatedPlatformUrls.embedUrl,
            thumbnailUrl: generatedPlatformUrls.thumbnailUrl,
          }
        : {
            ...values,
            shortDescription: unifiedDescription,
            fullDescription: unifiedDescription,
          };

    await onSubmit(finalValues);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="rounded-[24px] border border-[#eee5d8] bg-[linear-gradient(180deg,#fcfaf6_0%,#f8f4ec_100%)] p-5">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4ead7] text-[#b78b32]">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#b78b32]">
              {mode === "edit" ? "Modo edición" : "Formulario"}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#142033]">{formTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Completa la información principal, la publicación y los metadatos del episodio.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionCard
            icon={<Info className="h-4 w-4" />}
            title="Información principal"
            subtitle="Define la base del episodio."
          >
            <div className="grid gap-4">
              <Field label="Título *" error={errors.title}>
                <input
                  className={inputClassName(errors.title)}
                  value={values.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ej. Episodio 1 - Inversión inmobiliaria"
                />
              </Field>

              <Field label="Descripción" error={errors.fullDescription}>
                <textarea
                  className={textareaClassName(errors.fullDescription)}
                  value={values.fullDescription}
                  onChange={(e) => {
                    handleChange("fullDescription", e.target.value);
                    handleChange("shortDescription", e.target.value);
                  }}
                  placeholder="Describe brevemente de qué trata este episodio..."
                  rows={6}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            icon={<Link2 className="h-4 w-4" />}
            title="Enlaces y miniatura"
            subtitle="Conecta el contenido publicado."
          >
            <div className="grid gap-4">
              {values.platform === "YOUTUBE" ? (
                <>
                  <div className="rounded-[20px] border border-[#E6D9C2] bg-[#FBF7EF] p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4EAD7] text-[#B78B32]">
                        <Youtube className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#142033]">
                          Captura solo el ID final del video de YouTube
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Ejemplo: si tu URL es
                          <span className="font-medium text-[#142033]">
                            {" "}
                            https://youtu.be/qjzMNcG11YY
                          </span>
                          , entonces solo debes escribir:
                          <span className="font-semibold text-[#B78B32]"> qjzMNcG11YY</span>
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          El sistema generará automáticamente:
                          <strong> URL externa</strong>, <strong>ruta embebida</strong> y
                          <strong> thumbnail</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Field label="ID del video de YouTube *" error={errors.embedUrl}>
                    <input
                      className={inputClassName(errors.embedUrl)}
                      value={platformVideoValue}
                      onChange={(e) => {
                        setPlatformVideoValue(e.target.value.trim());
                        setErrors((prev) => ({
                          ...prev,
                          embedUrl: undefined,
                          externalUrl: undefined,
                          thumbnailUrl: undefined,
                        }));
                      }}
                      placeholder="Ej. qjzMNcG11YY"
                    />
                  </Field>

                  <Field label="URL externa generada" error={errors.externalUrl}>
                    <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700">
                      {generatedPlatformUrls.externalUrl || "Se generará automáticamente"}
                    </div>
                  </Field>

                  <Field label="Ruta embebida generada" error={errors.embedUrl}>
                    <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700">
                      {generatedPlatformUrls.embedUrl || "Se generará automáticamente"}
                    </div>
                  </Field>

                  <Field label="Thumbnail URL generada" error={errors.thumbnailUrl}>
                    <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700">
                      {generatedPlatformUrls.thumbnailUrl || "Se generará automáticamente"}
                    </div>
                  </Field>
                </>
              ) : values.platform === "TIKTOK" ? (
                <>
                  <div className="rounded-[20px] border border-[#E6D9C2] bg-[#FBF7EF] p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4EAD7] text-[#B78B32]">
                        <Link2 className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#142033]">
                          Captura el ID del video o la URL completa de TikTok
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Lo ideal es usar la URL completa real del video, por ejemplo:
                          <span className="font-medium text-[#142033]">
                            {" "}
                            https://www.tiktok.com/@usuario/video/7491234567890123456
                          </span>
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          También puedes pegar solo el ID numérico del video si ya lo tienes.
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Nota: los enlaces cortos como
                          <span className="font-medium text-[#142033]"> vt.tiktok.com/...</span>
                          pueden redirigir, así que no siempre sirven para generar todo automáticamente.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Field label="ID o URL del video de TikTok *" error={errors.embedUrl}>
                    <input
                      className={inputClassName(errors.embedUrl)}
                      value={platformVideoValue}
                      onChange={(e) => {
                        setPlatformVideoValue(e.target.value.trim());
                        setErrors((prev) => ({
                          ...prev,
                          embedUrl: undefined,
                          externalUrl: undefined,
                        }));
                      }}
                      placeholder="Ej. 7491234567890123456 o https://www.tiktok.com/@usuario/video/..."
                    />
                  </Field>

                  <Field label="URL externa" error={errors.externalUrl}>
                    <input
                      className={inputClassName(errors.externalUrl)}
                      value={values.externalUrl}
                      onChange={(e) => handleChange("externalUrl", e.target.value)}
                      placeholder="Pega aquí la URL real del video si la tienes"
                    />
                  </Field>

                  <Field label="Ruta embebida generada" error={errors.embedUrl}>
                    <div className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700">
                      {generatedPlatformUrls.embedUrl || "Se generará automáticamente"}
                    </div>
                  </Field>

                  <Field label="Thumbnail URL (opcional)" error={errors.thumbnailUrl}>
                    <input
                      className={inputClassName(errors.thumbnailUrl)}
                      value={values.thumbnailUrl}
                      onChange={(e) => handleChange("thumbnailUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field label="URL externa" error={errors.externalUrl}>
                    <input
                      className={inputClassName(errors.externalUrl)}
                      value={values.externalUrl}
                      onChange={(e) => handleChange("externalUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </Field>

                  <Field label="URL embed" error={errors.embedUrl}>
                    <input
                      className={inputClassName(errors.embedUrl)}
                      value={values.embedUrl}
                      onChange={(e) => handleChange("embedUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </Field>

                  <Field label="Thumbnail URL" error={errors.thumbnailUrl}>
                    <input
                      className={inputClassName(errors.thumbnailUrl)}
                      value={values.thumbnailUrl}
                      onChange={(e) => handleChange("thumbnailUrl", e.target.value)}
                      placeholder="https://..."
                    />
                  </Field>
                </>
              )}

              <div className="flex items-start gap-3 rounded-[18px] border border-dashed border-[#e6d9c2] bg-[#fbf7ef] px-4 py-4 text-sm text-slate-600">
                <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#b78b32]" />
                <p>
                  Para YouTube solo necesitas pegar el ID final del video. Para TikTok puedes usar
                  el ID numérico o la URL real del video. Para otras plataformas puedes seguir
                  usando URLs completas de forma manual.
                </p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            icon={<CalendarDays className="h-4 w-4" />}
            title="Publicación"
            subtitle="Estado, plataforma y visibilidad."
          >
            <div className="grid gap-4">
              <Field label="Tipo de contenido" error={errors.contentType}>
                <select
                  className={inputClassName(errors.contentType)}
                  value={values.contentType}
                  onChange={(e) =>
                    handleChange(
                      "contentType",
                      e.target.value as PodcastEpisodePayload["contentType"]
                    )
                  }
                >
                  {contentTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Plataforma" error={errors.platform}>
                <select
                  className={inputClassName(errors.platform)}
                  value={values.platform}
                  onChange={(e) => handleChange("platform", e.target.value as PodcastPlatform)}
                >
                  {platformOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Estado" error={errors.status}>
                <select
                  className={inputClassName(errors.status)}
                  value={values.status}
                  onChange={(e) => handleChange("status", e.target.value as PodcastStatus)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Fecha de publicación" error={errors.publishedAt}>
                <input
                  type="datetime-local"
                  className={inputClassName(errors.publishedAt)}
                  value={values.publishedAt}
                  onChange={(e) => handleChange("publishedAt", e.target.value)}
                />
              </Field>
            </div>
          </SectionCard>

          <SectionCard
            icon={<Star className="h-4 w-4" />}
            title="Destacado y prioridad"
            subtitle="Controla cuáles episodios saldrán primero en la parte pública."
          >
            <div className="grid gap-4">
              <label className="flex items-center gap-3 rounded-[18px] border border-[#e7dfd2] bg-[#fffdfa] px-4 py-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={values.isFeatured}
                  onChange={(e) => handleChange("isFeatured", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#c79a2c] focus:ring-[#c79a2c]"
                />
                Marcar como episodio destacado
              </label>

              <div className="rounded-[18px] border border-dashed border-[#e6d9c2] bg-[#fbf7ef] px-4 py-4 text-sm text-slate-600">
                En la parte pública solo se mostrarán <strong>máximo 2 destacados</strong>. El
                sistema elegirá los que tengan <strong>menor número de prioridad</strong>. Ejemplo:
                prioridad 1 sale antes que prioridad 2.
              </div>

              <Field label="Prioridad del destacado" error={errors.displayOrder}>
                <input
                  className={inputClassName(errors.displayOrder)}
                  value={values.displayOrder}
                  onChange={(e) => handleChange("displayOrder", e.target.value)}
                  placeholder="Ej. 1"
                />
              </Field>

              <p className="text-xs leading-6 text-slate-500">
                Consejo: usa <strong>1</strong> para el destacado principal y <strong>2</strong>{" "}
                para el segundo destacado visible.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            icon={<AlertCircle className="h-4 w-4" />}
            title="Metadatos"
            subtitle="Información auxiliar del episodio."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Duración" error={errors.duration}>
                <input
                  className={inputClassName(errors.duration)}
                  value={values.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="Ej. 45 min"
                />
              </Field>

              <Field label="Invitados" error={errors.guests}>
                <input
                  className={inputClassName(errors.guests)}
                  value={values.guests}
                  onChange={(e) => handleChange("guests", e.target.value)}
                  placeholder="Ej. Invitado 1, Invitado 2"
                />
              </Field>

              <Field label="Número de episodio" error={errors.episodeNumber}>
                <input
                  className={inputClassName(errors.episodeNumber)}
                  value={values.episodeNumber}
                  onChange={(e) => handleChange("episodeNumber", e.target.value)}
                  placeholder="1"
                />
              </Field>

              <Field label="Número de temporada" error={errors.seasonNumber}>
                <input
                  className={inputClassName(errors.seasonNumber)}
                  value={values.seasonNumber}
                  onChange={(e) => handleChange("seasonNumber", e.target.value)}
                  placeholder="1"
                />
              </Field>
            </div>
          </SectionCard>

          <div className="rounded-[24px] border border-[#eee5d8] bg-[#fcfaf6] p-4">
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#bf931d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {mode === "edit" ? "Guardar cambios" : "Crear episodio"}
              </button>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Limpiar formulario
                </button>

                {mode === "edit" && onCancel ? (
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-[#f8f7f3] px-5 py-3.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    Cancelar edición
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-[#eee5d8] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f5ede0] text-[#b78b32]">
          {icon}
        </div>

        <div>
          <h4 className="text-base font-semibold text-[#142033]">{title}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>}
    </label>
  );
}

function inputClassName(error?: string) {
  return `w-full rounded-[18px] border px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
    error
      ? "border-rose-300 bg-rose-50 focus:border-rose-400"
      : "border-slate-200 bg-white focus:border-[#c79a2c] focus:ring-4 focus:ring-[rgba(199,154,44,0.10)]"
  }`;
}

function textareaClassName(error?: string) {
  return `w-full rounded-[18px] border px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 resize-none ${
    error
      ? "border-rose-300 bg-rose-50 focus:border-rose-400"
      : "border-slate-200 bg-white focus:border-[#c79a2c] focus:ring-4 focus:ring-[rgba(199,154,44,0.10)]"
  }`;
}