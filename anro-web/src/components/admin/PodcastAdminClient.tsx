"use client";

import AdminRoute from "@/components/admin/AdminRoute";
import PodcastEpisodeForm from "@/components/admin/PodcastEpisodeForm";
import { podcastAdminApi } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { PodcastEpisode, PodcastEpisodePayload, PodcastPlatform, PodcastStatus } from "@/lib/types";
import {
  Calendar,
  CheckCircle2,
  Filter,
  LoaderCircle,
  LogOut,
  PencilLine,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const STATUS_FILTERS: Array<{ label: string; value: "ALL" | PodcastStatus }> = [
  { label: "Todos los status", value: "ALL" },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

const PLATFORM_FILTERS: Array<{ label: string; value: "ALL" | PodcastPlatform }> = [
  { label: "Todas las plataformas", value: "ALL" },
  { label: "YouTube", value: "YOUTUBE" },
  { label: "TikTok", value: "TIKTOK" },
  { label: "Spotify", value: "SPOTIFY" },
  { label: "Other", value: "OTHER" },
];

const SORT_OPTIONS = [
  { label: "Más recientes", value: "newest" },
  { label: "Más antiguos", value: "oldest" },
  { label: "Display order", value: "displayOrder" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

type AdminAction = "create" | "update" | "delete" | "status" | "featured" | "refresh";

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
  return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function nextStatus(current: PodcastStatus): PodcastStatus {
  if (current === "DRAFT") return "PUBLISHED";
  if (current === "PUBLISHED") return "ARCHIVED";
  return "DRAFT";
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
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | PodcastStatus>("ALL");
  const [platformFilter, setPlatformFilter] = useState<"ALL" | PodcastPlatform>("ALL");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [activeAction, setActiveAction] = useState<{ type: AdminAction; id?: string } | null>(null);

  const stats = useMemo(
    () => ({
      published: episodes.filter((episode) => episode.status === "PUBLISHED").length,
      drafts: episodes.filter((episode) => episode.status === "DRAFT").length,
      featured: episodes.filter((episode) => episode.isFeatured).length,
    }),
    [episodes]
  );

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
        return a.displayOrder - b.displayOrder || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      const firstDate = new Date(a.publishedAt || a.createdAt).getTime();
      const secondDate = new Date(b.publishedAt || b.createdAt).getTime();
      return sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
    });
  }, [episodes, featuredOnly, platformFilter, searchTerm, sortBy, statusFilter]);

  const filtersApplied =
    searchTerm.trim() !== "" || statusFilter !== "ALL" || platformFilter !== "ALL" || featuredOnly || sortBy !== "newest";

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

  const resetForm = () => {
    setMode("create");
    setSelectedEpisode(null);
  };

  const scrollToForm = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (values: PodcastEpisodePayload) => {
    const payload = normalizePayload(values);
    const currentAction = mode === "create" ? "create" : "update";

    try {
      setIsSaving(true);
      setFeedback(null);

      if (mode === "create") {
        await podcastAdminApi.create(payload);
        setFeedback({ tone: "success", text: "Episodio creado correctamente." });
      } else if (selectedEpisode) {
        await podcastAdminApi.update(selectedEpisode.id, payload);
        setFeedback({ tone: "success", text: "Episodio actualizado correctamente." });
      }

      resetForm();
      await loadEpisodes(currentAction);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible guardar el episodio.";
      setFeedback({ tone: "error", text: message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (episode: PodcastEpisode) => {
    const confirmed = window.confirm(`¿Eliminar definitivamente \"${episode.title}\"? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    try {
      setActiveAction({ type: "delete", id: episode.id });
      await podcastAdminApi.remove(episode.id);
      setFeedback({ tone: "success", text: "Episodio eliminado correctamente." });
      if (selectedEpisode?.id === episode.id) {
        resetForm();
      }
      await loadEpisodes("delete");
    } catch (err) {
      setActiveAction(null);
      setFeedback({ tone: "error", text: err instanceof Error ? err.message : "No fue posible eliminar el episodio." });
    }
  };

  const handleStatusChange = async (episode: PodcastEpisode) => {
    const status = nextStatus(episode.status);

    try {
      setActiveAction({ type: "status", id: episode.id });
      await podcastAdminApi.updateStatus(episode.id, status);
      setFeedback({ tone: "success", text: `Status actualizado a ${status}.` });
      await loadEpisodes("status");
    } catch (err) {
      setActiveAction(null);
      setFeedback({ tone: "error", text: err instanceof Error ? err.message : "No fue posible cambiar el status." });
    }
  };

  const handleFeatureToggle = async (episode: PodcastEpisode) => {
    try {
      setActiveAction({ type: "featured", id: episode.id });
      await podcastAdminApi.toggleFeatured(episode.id, !episode.isFeatured);
      setFeedback({
        tone: "success",
        text: episode.isFeatured ? "El episodio ya no está destacado." : "Episodio marcado como destacado.",
      });
      await loadEpisodes("featured");
    } catch (err) {
      setActiveAction(null);
      setFeedback({ tone: "error", text: err instanceof Error ? err.message : "No fue posible actualizar el destacado." });
    }
  };

  const handleEdit = (episode: PodcastEpisode) => {
    setMode("edit");
    setSelectedEpisode(episode);
    scrollToForm();
  };

  const handleCreateMode = () => {
    resetForm();
    scrollToForm();
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

  useEffect(() => {
    if (!feedback) return;
    const timeout = window.setTimeout(() => setFeedback(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const isRefreshing = activeAction?.type === "refresh";

  return (
    <div className="min-h-screen bg-[#f8f5f0] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)] px-6 py-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.25)] md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f3dfb7]">Panel administrativo de Podcast</p>
              <h1 className="mt-4 text-3xl font-bold md:text-5xl">Administra episodios, destacados y estados de publicación.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                El panel conserva la integración existente con JWT y ahora ofrece búsqueda, filtros, estados más claros y
                una base lista para reflejar el contenido publicado en la ventana pública.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur">
                <span className="block text-slate-300">Sesión activa</span>
                <span className="font-semibold text-white">{adminName}</span>
              </div>
              <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatCard label="Publicados" value={stats.published} icon={<ShieldCheck className="h-5 w-5" />} />
            <StatCard label="Borradores" value={stats.drafts} icon={<Calendar className="h-5 w-5" />} />
            <StatCard label="Destacados" value={stats.featured} icon={<Star className="h-5 w-5" />} />
          </div>
        </section>

        {feedback && <Notice tone={feedback.tone}>{feedback.text}</Notice>}

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <PodcastEpisodeForm
            key={mode === "edit" && selectedEpisode ? selectedEpisode.id : "create"}
            mode={mode}
            initialValues={mode === "edit" ? selectedEpisode : null}
            onSubmit={handleSave}
            onCancel={resetForm}
            isSubmitting={isSaving}
          />

          <div className="space-y-6">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a87810]">Catálogo</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Listado de episodios</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Busca y filtra episodios para editar más rápido el catálogo administrativo.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleCreateMode} className="inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#be931f]">
                    <Plus className="h-4 w-4" />
                    Crear episodio
                  </button>
                  <button onClick={() => void loadEpisodes("refresh")} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                    {isRefreshing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Recargar
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <FilterField label="Buscar por título">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="input-base pl-11" placeholder="Buscar episodio..." />
                  </div>
                </FilterField>
                <FilterField label="Status">
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "ALL" | PodcastStatus)} className="input-base">
                    {STATUS_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
                  </select>
                </FilterField>
                <FilterField label="Plataforma">
                  <select value={platformFilter} onChange={(event) => setPlatformFilter(event.target.value as "ALL" | PodcastPlatform)} className="input-base">
                    {PLATFORM_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
                  </select>
                </FilterField>
                <FilterField label="Orden">
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="input-base">
                    {SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </FilterField>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#d4a62a] focus:ring-[#d4a62a]" />
                  Ver solo destacados
                </label>
                {filtersApplied && (
                  <button onClick={handleClearFilters} className="text-sm font-medium text-slate-500 transition hover:text-slate-900">
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              {isInitialLoading ? (
                <div className="flex min-h-72 flex-col items-center justify-center gap-4 px-6 py-10 text-center text-slate-500">
                  <LoaderCircle className="h-8 w-8 animate-spin text-[#a87810]" />
                  <div>
                    <p className="font-medium text-slate-800">Cargando episodios...</p>
                    <p className="mt-2 text-sm">Estamos obteniendo la información del backend para preparar el panel.</p>
                  </div>
                </div>
              ) : filteredEpisodes.length === 0 ? (
                <EmptyState hasEpisodes={episodes.length > 0} hasFilters={filtersApplied} onCreate={handleCreateMode} onClearFilters={handleClearFilters} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                        <th className="px-5 py-4">Título</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Plataforma</th>
                        <th className="px-5 py-4">Destacado</th>
                        <th className="px-5 py-4">Fecha</th>
                        <th className="px-5 py-4">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEpisodes.map((episode) => (
                        <tr key={episode.id} className={`align-top ${selectedEpisode?.id === episode.id ? "bg-amber-50/50" : "bg-white"}`}>
                          <td className="px-5 py-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-slate-900">{episode.title}</p>
                                {selectedEpisode?.id === episode.id && (
                                  <span className="rounded-full bg-slate-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                                    Editando
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-slate-500">{episode.shortDescription || "Sin descripción corta"}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4"><StatusBadge status={episode.status} /></td>
                          <td className="px-5 py-4 text-sm text-slate-600">{episode.platform}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">{episode.isFeatured ? "Sí" : "No"}</td>
                          <td className="px-5 py-4 text-sm text-slate-600">{formatDate(episode.publishedAt || episode.createdAt)}</td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-2">
                              <ActionButton label="Editar" icon={<PencilLine className="h-4 w-4" />} onClick={() => handleEdit(episode)} />
                              <ActionButton
                                label={episode.status === "PUBLISHED" ? "Archivar" : episode.status === "ARCHIVED" ? "Pasar a draft" : "Publicar"}
                                onClick={() => void handleStatusChange(episode)}
                                loading={activeAction?.type === "status" && activeAction.id === episode.id}
                              />
                              <ActionButton
                                label={episode.isFeatured ? "Quitar destacado" : "Destacar"}
                                onClick={() => void handleFeatureToggle(episode)}
                                loading={activeAction?.type === "featured" && activeAction.id === episode.id}
                              />
                              <ActionButton
                                label="Eliminar"
                                icon={<Trash2 className="h-4 w-4" />}
                                tone="danger"
                                onClick={() => void handleDelete(episode)}
                                loading={activeAction?.type === "delete" && activeAction.id === episode.id}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/8 p-5 backdrop-blur">
      <div className="flex items-center justify-between text-[#f3dfb7]">
        <span className="text-sm uppercase tracking-[0.24em]">{label}</span>
        {icon}
      </div>
      <p className="mt-4 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: PodcastStatus }) {
  const tone =
    status === "PUBLISHED"
      ? "bg-emerald-50 text-emerald-700"
      : status === "ARCHIVED"
        ? "bg-slate-100 text-slate-700"
        : "bg-amber-50 text-amber-700";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

function ActionButton({
  label,
  icon,
  onClick,
  tone = "default",
  loading = false,
}: {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  tone?: "default" | "danger";
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${
        tone === "danger" ? "bg-rose-50 text-rose-700 hover:bg-rose-100" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      } disabled:cursor-not-allowed disabled:opacity-70`}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : icon}
      {label}
    </button>
  );
}

function Notice({ children, tone }: { children: React.ReactNode; tone: "success" | "error" }) {
  return (
    <div className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
      {tone === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
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
    <div className="flex min-h-72 flex-col items-center justify-center px-6 py-10 text-center">
      <div className="rounded-full bg-slate-100 p-4 text-[#a87810]">
        <Filter className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-900">
        {hasEpisodes ? "No hay resultados con los filtros actuales" : "Aún no hay episodios en el panel"}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        {hasEpisodes
          ? "Ajusta los filtros o limpia la búsqueda para volver a ver el catálogo completo."
          : "Crea el primer episodio para comenzar a poblar el módulo Podcast y reflejarlo luego en la ventana pública."}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {hasFilters && (
          <button onClick={onClearFilters} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
            Limpiar filtros
          </button>
        )}
        {!hasEpisodes && (
          <button onClick={onCreate} className="rounded-2xl bg-[#d4a62a] px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#be931f]">
            Crear episodio
          </button>
        )}
      </div>
    </div>
  );
}
