"use client";

import AdminRoute from "@/components/admin/AdminRoute";
import PodcastEpisodeForm from "@/components/admin/PodcastEpisodeForm";
import { podcastAdminApi } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { PodcastEpisode, PodcastEpisodePayload, PodcastStatus } from "@/lib/types";
import { Calendar, LogOut, Plus, RefreshCw, ShieldCheck, Star, Trash2, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => ({
    published: episodes.filter((episode) => episode.status === "PUBLISHED").length,
    drafts: episodes.filter((episode) => episode.status === "DRAFT").length,
    featured: episodes.filter((episode) => episode.isFeatured).length,
  }), [episodes]);

  const loadEpisodes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await podcastAdminApi.list();
      setEpisodes(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible cargar episodios.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadEpisodes();
  }, []);

  const resetForm = () => {
    setMode("create");
    setSelectedEpisode(null);
  };

  const handleSave = async (values: PodcastEpisodePayload) => {
    try {
      setIsSaving(true);
      setError(null);
      const payload = normalizePayload(values);

      if (mode === "create") {
        await podcastAdminApi.create(payload);
        setActionMessage("Episodio creado correctamente.");
      } else if (selectedEpisode) {
        await podcastAdminApi.update(selectedEpisode.id, payload);
        setActionMessage("Episodio actualizado correctamente.");
      }

      resetForm();
      await loadEpisodes();
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible guardar el episodio.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (episode: PodcastEpisode) => {
    const confirmed = window.confirm(`¿Eliminar definitivamente \"${episode.title}\"?`);
    if (!confirmed) return;

    try {
      await podcastAdminApi.remove(episode.id);
      setActionMessage("Episodio eliminado correctamente.");
      if (selectedEpisode?.id === episode.id) {
        resetForm();
      }
      await loadEpisodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible eliminar el episodio.");
    }
  };

  const handleStatusChange = async (episode: PodcastEpisode) => {
    try {
      const status = nextStatus(episode.status);
      await podcastAdminApi.updateStatus(episode.id, status);
      setActionMessage(`Status actualizado a ${status}.`);
      await loadEpisodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible cambiar el status.");
    }
  };

  const handleFeatureToggle = async (episode: PodcastEpisode) => {
    try {
      await podcastAdminApi.toggleFeatured(episode.id, !episode.isFeatured);
      setActionMessage(episode.isFeatured ? "El episodio ya no está destacado." : "Episodio marcado como destacado.");
      await loadEpisodes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible actualizar el destacado.");
    }
  };

  const handleEdit = (episode: PodcastEpisode) => {
    setMode("edit");
    setSelectedEpisode(episode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    authStorage.clear();
    router.replace("/login");
  };

  useEffect(() => {
    if (!actionMessage) return;
    const timeout = window.setTimeout(() => setActionMessage(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [actionMessage]);

  return (
    <div className="min-h-screen bg-[#f8f5f0] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_55%,#334155_100%)] px-6 py-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.25)] md:px-8 md:py-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#f3dfb7]">Panel administrativo de Podcast</p>
              <h1 className="mt-4 text-3xl font-bold md:text-5xl">Administra episodios, destacados y estados de publicación.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">Conecta el frontend con el backend existente mediante JWT y administra el catálogo completo de episodios sin exponer registro público para administradores.</p>
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

        {actionMessage && <Notice tone="success">{actionMessage}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a87810]">Catálogo</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Listado de episodios</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { resetForm(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#be931f]">
                  <Plus className="h-4 w-4" />
                  Crear episodio
                </button>
                <button onClick={() => void loadEpisodes()} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
                  <RefreshCw className="h-4 w-4" />
                  Recargar
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
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
                    {isLoading ? (
                      <tr>
                        <td className="px-5 py-8 text-sm text-slate-500" colSpan={6}>Cargando episodios...</td>
                      </tr>
                    ) : episodes.length === 0 ? (
                      <tr>
                        <td className="px-5 py-8 text-sm text-slate-500" colSpan={6}>Aún no hay episodios. Usa el formulario para crear el primero.</td>
                      </tr>
                    ) : (
                      episodes.map((episode) => (
                        <tr key={episode.id} className="align-top">
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-semibold text-slate-900">{episode.title}</p>
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
                              <ActionButton label={episode.status === "PUBLISHED" ? "Archivar" : episode.status === "ARCHIVED" ? "Pasar a draft" : "Publicar"} onClick={() => void handleStatusChange(episode)} />
                              <ActionButton label={episode.isFeatured ? "Quitar destacado" : "Destacar"} onClick={() => void handleFeatureToggle(episode)} />
                              <ActionButton label="Eliminar" icon={<Trash2 className="h-4 w-4" />} tone="danger" onClick={() => void handleDelete(episode)} />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <PodcastEpisodeForm
            key={mode === "edit" && selectedEpisode ? selectedEpisode.id : "create"}
            mode={mode}
            initialValues={mode === "edit" ? selectedEpisode : null}
            onSubmit={handleSave}
            onCancel={resetForm}
            isSubmitting={isSaving}
          />
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
  const tone = status === "PUBLISHED" ? "bg-emerald-50 text-emerald-700" : status === "ARCHIVED" ? "bg-slate-100 text-slate-700" : "bg-amber-50 text-amber-700";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}

function ActionButton({ label, icon, onClick, tone = "default" }: { label: string; icon?: React.ReactNode; onClick: () => void; tone?: "default" | "danger" }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${tone === "danger" ? "bg-rose-50 text-rose-700 hover:bg-rose-100" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
      {icon}
      {label}
    </button>
  );
}

function Notice({ children, tone }: { children: React.ReactNode; tone: "success" | "error" }) {
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{children}</div>;
}
