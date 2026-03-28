"use client";

import type { ReactNode } from "react";
import AdminRoute from "@/components/admin/AdminRoute";
import PodcastEpisodeForm from "@/components/admin/PodcastEpisodeForm";
import { podcastAdminApi } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import {
  PodcastEpisode,
  PodcastEpisodePayload,
  PodcastPlatform,
  PodcastStatus,
} from "@/lib/types";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  Filter,
  LoaderCircle,
  LogOut,
  PencilLine,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  Trash2,
  Trophy,
  X,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const STATUS_FILTERS: Array<{ label: string; value: "ALL" | PodcastStatus }> = [
  { label: "Todos", value: "ALL" },
  { label: "Borrador", value: "DRAFT" },
  { label: "Publicado", value: "PUBLISHED" },
  { label: "Archivado", value: "ARCHIVED" },
];

const PLATFORM_FILTERS: Array<{ label: string; value: "ALL" | PodcastPlatform }> = [
  { label: "Todas", value: "ALL" },
  { label: "YouTube", value: "YOUTUBE" },
  { label: "TikTok", value: "TIKTOK" },
  { label: "Spotify", value: "SPOTIFY" },
  { label: "Otra", value: "OTHER" },
];

const SORT_OPTIONS = [
  { label: "Más recientes", value: "newest" },
  { label: "Más antiguos", value: "oldest" },
  { label: "Orden manual", value: "displayOrder" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];
type AdminAction = "create" | "update" | "delete" | "status" | "featured" | "refresh";
type FormMode = "create" | "edit";

function normalizePayload(values: PodcastEpisodePayload): PodcastEpisodePayload {
  return {
    ...values,
    title: values.title.trim(),
    shortDescription: values.shortDescription.trim(),
    fullDescription: values.fullDescription.trim(),
    externalUrl: values.externalUrl.trim(),
    embedUrl: values.embedUrl.trim(),
    thumbnailUrl: values.thumbnailUrl.trim(),
    duration: values.duration.trim(),
    guests: values.guests.trim(),
  };
}

function formatDate(date: string | null) {
  if (!date) return "Sin fecha";
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function nextStatus(current: PodcastStatus): PodcastStatus {
  if (current === "DRAFT") return "PUBLISHED";
  if (current === "PUBLISHED") return "ARCHIVED";
  return "DRAFT";
}

function getStatusLabel(status: PodcastStatus) {
  switch (status) {
    case "DRAFT":
      return "Borrador";
    case "PUBLISHED":
      return "Publicado";
    case "ARCHIVED":
      return "Archivado";
    default:
      return status;
  }
}

function extractYouTubeId(value: string | null | undefined) {
  if (!value) return null;

  const raw = value.trim();
  if (!raw) return null;

  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  try {
    const parsed = new URL(raw);

    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.includes("/embed/")) {
        const parts = parsed.pathname.split("/embed/");
        const id = parts[1]?.split(/[?&/]/)[0];
        return id || null;
      }

      const id = parsed.searchParams.get("v");
      return id || null;
    }

    if (parsed.hostname.includes("img.youtube.com")) {
      const parts = parsed.pathname.split("/");
      const viIndex = parts.findIndex((part) => part === "vi");
      if (viIndex !== -1 && parts[viIndex + 1]) {
        return parts[viIndex + 1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

function buildEpisodeThumbnail(episode: PodcastEpisode) {
  if (episode.thumbnailUrl?.trim()) return episode.thumbnailUrl.trim();

  if (episode.platform === "YOUTUBE") {
    const id =
      extractYouTubeId(episode.embedUrl) ||
      extractYouTubeId(episode.externalUrl) ||
      extractYouTubeId(episode.thumbnailUrl);

    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  return null;
}

export default function PodcastAdminClient() {
  return (
    <AdminRoute>
      {(session) => <PodcastAdminView adminName={session.admin.name} />}
    </AdminRoute>
  );
}

function PodcastAdminView({ adminName }: { adminName: string }) {
  const router = useRouter();

  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PodcastStatus>("ALL");
  const [platformFilter, setPlatformFilter] = useState<"ALL" | PodcastPlatform>("ALL");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [activeAction, setActiveAction] = useState<{ type: AdminAction; id?: string } | null>(
    null
  );

  const stats = useMemo(
    () => ({
      published: episodes.filter((episode) => episode.status === "PUBLISHED").length,
      drafts: episodes.filter((episode) => episode.status === "DRAFT").length,
      featured: episodes.filter((episode) => episode.isFeatured).length,
      total: episodes.length,
    }),
    [episodes]
  );

  const featuredVisibleOnPublic = useMemo(() => {
    return [...episodes]
      .filter((episode) => episode.status === "PUBLISHED" && episode.isFeatured)
      .sort((a, b) => {
        const orderDiff = Number(a.displayOrder ?? 9999) - Number(b.displayOrder ?? 9999);
        if (orderDiff !== 0) return orderDiff;

        const aDate = new Date(a.publishedAt || a.createdAt).getTime();
        const bDate = new Date(b.publishedAt || b.createdAt).getTime();
        return bDate - aDate;
      })
      .slice(0, 2);
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const nextEpisodes = episodes.filter((episode) => {
      const matchesSearch =
        !normalizedSearch ||
        episode.title.toLowerCase().includes(normalizedSearch) ||
        (episode.shortDescription || "").toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === "ALL" || episode.status === statusFilter;
      const matchesPlatform = platformFilter === "ALL" || episode.platform === platformFilter;
      const matchesFeatured = !featuredOnly || episode.isFeatured;

      return matchesSearch && matchesStatus && matchesPlatform && matchesFeatured;
    });

    return nextEpisodes.sort((a, b) => {
      if (sortBy === "displayOrder") {
        return (
          Number(a.displayOrder ?? 9999) - Number(b.displayOrder ?? 9999) ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      const firstDate = new Date(a.publishedAt || a.createdAt).getTime();
      const secondDate = new Date(b.publishedAt || b.createdAt).getTime();

      return sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
    });
  }, [episodes, featuredOnly, platformFilter, searchTerm, sortBy, statusFilter]);

  const filtersApplied =
    searchTerm.trim() !== "" ||
    statusFilter !== "ALL" ||
    platformFilter !== "ALL" ||
    featuredOnly ||
    sortBy !== "newest";

  const loadEpisodes = useCallback(async (action: AdminAction = "refresh") => {
    try {
      setActiveAction({ type: action });
      const response = await podcastAdminApi.list();
      setEpisodes(response);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible cargar episodios.";
      setFeedback({ tone: "error", text: message });
      return false;
    } finally {
      setActiveAction(null);
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEpisodes();
  }, [loadEpisodes]);

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const openCreate = () => {
    setFormMode("create");
    setSelectedEpisode(null);
    setIsFormOpen(true);
  };

  const openEdit = (episode: PodcastEpisode) => {
    setFormMode("edit");
    setSelectedEpisode(episode);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedEpisode(null);
    setFormMode("create");
  };

  const handleSave = async (values: PodcastEpisodePayload) => {
    const payload = normalizePayload(values);
    const currentAction = formMode === "create" ? "create" : "update";

    try {
      setIsSaving(true);
      setFeedback(null);

      if (formMode === "create") {
        await podcastAdminApi.create(payload);
        setFeedback({ tone: "success", text: "Episodio creado correctamente." });
      } else if (selectedEpisode) {
        await podcastAdminApi.update(selectedEpisode.id, payload);
        setFeedback({ tone: "success", text: "Episodio actualizado correctamente." });
      }

      closeForm();
      await loadEpisodes(currentAction);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible guardar el episodio.";
      setFeedback({ tone: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (episode: PodcastEpisode) => {
    const confirmed = window.confirm(
      `¿Eliminar definitivamente "${episode.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    try {
      setActiveAction({ type: "delete", id: episode.id });
      await podcastAdminApi.remove(episode.id);
      setFeedback({ tone: "success", text: "Episodio eliminado correctamente." });

      if (selectedEpisode?.id === episode.id) {
        closeForm();
      }

      await loadEpisodes("delete");
    } catch (err) {
      setActiveAction(null);
      setFeedback({
        tone: "error",
        text: err instanceof Error ? err.message : "No fue posible eliminar el episodio.",
      });
    }
  };

  const handleStatusChange = async (episode: PodcastEpisode) => {
    const status = nextStatus(episode.status);

    try {
      setActiveAction({ type: "status", id: episode.id });
      await podcastAdminApi.updateStatus(episode.id, status);
      setFeedback({
        tone: "success",
        text: `Estado actualizado a ${getStatusLabel(status).toLowerCase()}.`,
      });
      await loadEpisodes("status");
    } catch (err) {
      setActiveAction(null);
      setFeedback({
        tone: "error",
        text: err instanceof Error ? err.message : "No fue posible cambiar el estado.",
      });
    }
  };

  const handleFeatureToggle = async (episode: PodcastEpisode) => {
    try {
      setActiveAction({ type: "featured", id: episode.id });
      await podcastAdminApi.toggleFeatured(episode.id, !episode.isFeatured);
      setFeedback({
        tone: "success",
        text: episode.isFeatured
          ? "El episodio ya no está destacado."
          : "Episodio marcado como destacado. Ajusta su prioridad al editarlo si quieres que aparezca entre los 2 visibles.",
      });
      await loadEpisodes("featured");
    } catch (err) {
      setActiveAction(null);
      setFeedback({
        tone: "error",
        text: err instanceof Error ? err.message : "No fue posible actualizar el destacado.",
      });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setPlatformFilter("ALL");
    setFeaturedOnly(false);
    setSortBy("newest");
  };

  const handleLogout = () => {
    authStorage.clear();
    router.replace("/login");
  };

  const isRefreshing = activeAction?.type === "refresh";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f4ee_0%,#f2eee7_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[30px] border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(222,180,73,0.14),transparent_26%),linear-gradient(135deg,#091224_0%,#102344_58%,#1d3354_100%)] shadow-[0_28px_90px_rgba(10,20,40,0.16)]">
          <div className="px-6 py-7 md:px-8 lg:px-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#e8c980]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Podcast Admin / ANRO
                  </div>

                  <h1 className="mt-5 text-3xl font-semibold leading-[1.02] text-white md:text-5xl">
                    Gestiona episodios, destacados y publicaciones
                    <span className="mt-2 block text-[#e7c87c]">
                      desde un panel más limpio y profesional.
                    </span>
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    Centraliza la operación del podcast, organiza la biblioteca y mantén una
                    experiencia administrativa clara.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-300">
                      Sesión activa
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">{adminName}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Publicados" value={stats.published} hint="Visibles en la web" />
                <StatCard label="Borradores" value={stats.drafts} hint="Pendientes de publicar" />
                <StatCard label="Destacados" value={stats.featured} hint="Marcados como destacados" />
                <StatCard label="Total" value={stats.total} hint="Registros del módulo" />
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#E7C87C]">
                      Visibles en la parte pública
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">
                      La página pública muestra máximo <strong>2 episodios destacados</strong>,
                      ordenados por prioridad.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featuredVisibleOnPublic.length > 0 ? (
                      featuredVisibleOnPublic.map((episode, index) => (
                        <span
                          key={episode.id}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white"
                        >
                          <Trophy className="h-3.5 w-3.5 text-[#E7C87C]" />
                          #{index + 1} {episode.title}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200">
                        Aún no hay destacados visibles
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {feedback && (
          <div className="mt-6">
            <Notice tone={feedback.tone}>{feedback.text}</Notice>
          </div>
        )}

        <section className="mt-7 overflow-hidden rounded-[28px] border border-[#e7dfd2] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)]">
          <div className="border-b border-[#efe7db] px-6 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b78b32]">
                  Biblioteca
                </p>
                <h2 className="mt-3 text-[28px] font-semibold leading-tight text-[#142033]">
                  Catálogo de episodios
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Busca, filtra y administra el contenido desde una vista mucho más clara.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openCreate}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#bf931d]"
                >
                  <Plus className="h-4 w-4" />
                  Crear episodio
                </button>

                <button
                  onClick={() => void loadEpisodes("refresh")}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  {isRefreshing ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  Recargar
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-[#efe7db] px-6 py-5">
            <div className="rounded-[22px] border border-[#ece4d8] bg-[#faf8f3] p-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ToolbarField label="Buscar">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="input-base pl-11"
                      placeholder="Título o resumen..."
                    />
                  </div>
                </ToolbarField>

                <ToolbarField label="Estado">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as "ALL" | PodcastStatus)}
                    className="input-base"
                  >
                    {STATUS_FILTERS.map((filter) => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </ToolbarField>

                <ToolbarField label="Plataforma">
                  <select
                    value={platformFilter}
                    onChange={(event) =>
                      setPlatformFilter(event.target.value as "ALL" | PodcastPlatform)
                    }
                    className="input-base"
                  >
                    {PLATFORM_FILTERS.map((filter) => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </ToolbarField>

                <ToolbarField label="Orden">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="input-base"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </ToolbarField>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(event) => setFeaturedOnly(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#d4a62a] focus:ring-[#d4a62a]"
                  />
                  Ver solo destacados
                </label>

                <div className="flex items-center gap-3">
                  {filtersApplied && (
                    <button
                      onClick={handleClearFilters}
                      className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                      Limpiar filtros
                    </button>
                  )}

                  <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
                    {filteredEpisodes.length} resultado{filteredEpisodes.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            {isInitialLoading ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-[24px] border border-[#e6ddd0] bg-[#fcfbf8] text-center">
                <LoaderCircle className="h-8 w-8 animate-spin text-[#b78b32]" />
                <div>
                  <p className="font-medium text-slate-900">Cargando catálogo...</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Estamos trayendo los episodios desde el backend.
                  </p>
                </div>
              </div>
            ) : filteredEpisodes.length === 0 ? (
              <EmptyState
                hasEpisodes={episodes.length > 0}
                hasFilters={filtersApplied}
                onCreate={openCreate}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                {filteredEpisodes.map((episode) => (
                  <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    visibleOnPublicTop2={featuredVisibleOnPublic.some(
                      (featuredEpisode) => featuredEpisode.id === episode.id
                    )}
                    onEdit={() => openEdit(episode)}
                    onDelete={() => void handleDelete(episode)}
                    onStatus={() => void handleStatusChange(episode)}
                    onFeature={() => void handleFeatureToggle(episode)}
                    statusLoading={activeAction?.type === "status" && activeAction.id === episode.id}
                    featureLoading={
                      activeAction?.type === "featured" && activeAction.id === episode.id
                    }
                    deleteLoading={activeAction?.type === "delete" && activeAction.id === episode.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <FormModal
        open={isFormOpen}
        title={formMode === "edit" ? "Editar episodio" : "Crear episodio"}
        subtitle={
          formMode === "edit"
            ? "Actualiza la información del episodio seleccionado."
            : "Agrega un nuevo episodio al catálogo del podcast."
        }
        onClose={closeForm}
      >
        <PodcastEpisodeForm
          key={formMode === "edit" && selectedEpisode ? selectedEpisode.id : "create"}
          mode={formMode}
          initialValues={formMode === "edit" ? selectedEpisode : null}
          onSubmit={handleSave}
          onCancel={closeForm}
          isSubmitting={isSaving}
        />
      </FormModal>

      <style jsx global>{`
        .input-base {
          width: 100%;
          border-radius: 18px;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.9rem 1rem;
          font-size: 0.95rem;
          color: rgb(15 23 42);
          outline: none;
          transition: all 0.2s ease;
        }

        .input-base:focus {
          border-color: #c79a2c;
          box-shadow: 0 0 0 3px rgba(199, 154, 44, 0.12);
        }
      `}</style>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/8 p-5 backdrop-blur">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e7c87c]">
        {label}
      </p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{hint}</p>
    </div>
  );
}

function EpisodeCard({
  episode,
  visibleOnPublicTop2,
  onEdit,
  onDelete,
  onStatus,
  onFeature,
  statusLoading,
  featureLoading,
  deleteLoading,
}: {
  episode: PodcastEpisode;
  visibleOnPublicTop2: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onStatus: () => void;
  onFeature: () => void;
  statusLoading: boolean;
  featureLoading: boolean;
  deleteLoading: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-[#e8e0d4] bg-[#fffdfa] shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
      <EpisodeCover episode={episode} />

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={episode.status} />

          {episode.isFeatured && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">
              Destacado
            </span>
          )}

          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {episode.platform === "OTHER" ? "OTRA" : episode.platform}
          </span>

          {visibleOnPublicTop2 && (
            <span className="rounded-full bg-[#16233A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E7C87C]">
              Visible en home público
            </span>
          )}
        </div>

        <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#142033]">
          {episode.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-500">
          {episode.shortDescription || "Sin descripción corta disponible."}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <MetaPill
            icon={<CalendarDays className="h-4 w-4" />}
            label={formatDate(episode.publishedAt || episode.createdAt)}
          />
          <MetaPill label={`Prioridad ${episode.displayOrder ?? 0}`} />
          <MetaPill label={episode.guests || "Sin invitados"} />
          <MetaPill label={episode.duration || "Duración por definir"} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <ActionButton
            label="Editar"
            icon={<PencilLine className="h-4 w-4" />}
            onClick={onEdit}
          />
          <ActionButton
            label={
              episode.status === "PUBLISHED"
                ? "Archivar"
                : episode.status === "ARCHIVED"
                  ? "Pasar a borrador"
                  : "Publicar"
            }
            onClick={onStatus}
            loading={statusLoading}
          />
          <ActionButton
            label={episode.isFeatured ? "Quitar destacado" : "Destacar"}
            icon={<Star className="h-4 w-4" />}
            onClick={onFeature}
            loading={featureLoading}
          />
          <ActionButton
            label="Eliminar"
            icon={<Trash2 className="h-4 w-4" />}
            tone="danger"
            onClick={onDelete}
            loading={deleteLoading}
          />
        </div>
      </div>
    </article>
  );
}

function EpisodeCover({ episode }: { episode: PodcastEpisode }) {
  const [hasImageError, setHasImageError] = useState(false);

  const imageSrc = buildEpisodeThumbnail(episode) ?? undefined;
  const shouldShowImage = !!imageSrc && !hasImageError;

  return (
    <div className="relative h-[220px] overflow-hidden border-b border-[#efe7db] bg-[linear-gradient(135deg,#10203a_0%,#1e3354_100%)]">
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={episode.title}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="relative flex h-full flex-col justify-between p-5 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,200,124,0.22),transparent_30%)]" />
          <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#e7c87c]">
            <Eye className="h-5 w-5" />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-300">
              {episode.platform === "OTHER" ? "OTRA" : episode.platform}
            </p>
            <p className="mt-3 max-w-[80%] text-2xl font-semibold leading-tight">
              {episode.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function FormModal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#091224]/55 p-4 backdrop-blur-[3px] md:p-6">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#efe7db] bg-[#fcfaf6] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b78b32]">
              Podcast ANRO
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[#142033]">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-106px)] overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

function MetaPill({
  label,
  icon,
}: {
  label: string;
  icon?: ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: PodcastStatus }) {
  const tone =
    status === "PUBLISHED"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : status === "ARCHIVED"
        ? "border-slate-200 bg-slate-100 text-slate-700"
        : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${tone}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
  tone = "default",
  loading = false,
}: {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  tone?: "default" | "danger";
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-semibold transition ${
        tone === "danger"
          ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : icon}
      {label}
    </button>
  );
}

function Notice({ children, tone }: { children: ReactNode; tone: "success" | "error" }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-[22px] border px-5 py-4 text-sm shadow-sm ${
        tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
    >
      {tone === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{children}</span>
    </div>
  );
}

function ToolbarField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function EmptyState({
  hasEpisodes,
  hasFilters,
  onCreate,
  onClearFilters,
}: {
  hasEpisodes: boolean;
  hasFilters: boolean;
  onCreate: () => void;
  onClearFilters: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-[#e6ddd0] bg-[#fcfbf8] px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f0df] text-[#b78b32]">
        <Filter className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-slate-900">
        {hasEpisodes ? "No hay coincidencias con los filtros actuales" : "Todavía no hay episodios"}
      </h3>

      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
        {hasEpisodes
          ? "Ajusta tu búsqueda o limpia los filtros para volver a ver el catálogo completo."
          : "Crea tu primer episodio para comenzar a poblar el módulo Podcast y reflejarlo luego en la parte pública."}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
          >
            Limpiar filtros
          </button>
        )}

        {!hasEpisodes && (
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#bf931d]"
          >
            <Plus className="h-4 w-4" />
            Crear episodio
          </button>
        )}
      </div>
    </div>
  );
}