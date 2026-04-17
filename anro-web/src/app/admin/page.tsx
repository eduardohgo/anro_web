"use client";

import { authStorage } from "@/lib/auth-storage";
import { podcastAdminApi } from "@/lib/api";
import { PodcastEpisode } from "@/lib/types";
import { Activity, ArrowUpRight, Headphones, Layers3, Radio, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function AdminDashboardPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadEpisodes = async () => {
      try {
        const payload = await podcastAdminApi.list();
        if (!mounted) return;
        setEpisodes(payload);
      } catch {
        if (!mounted) return;
        setEpisodes([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    void loadEpisodes();

    return () => {
      mounted = false;
    };
  }, []);

  const sessionName = useMemo(() => {
    const session = authStorage.get();
    return session?.admin.name || "Administrador";
  }, []);

  const publishedCount = episodes.filter((episode) => episode.status === "PUBLISHED").length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.15),transparent_32%),linear-gradient(135deg,#0e1c36_0%,#16305a_65%,#1f3f70_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.16)] md:px-9 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f3d79a]">ANRO Admin</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Bienvenido al panel administrativo</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Este panel está enfocado en gestionar el módulo Podcast. Desde aquí puedes crear,
          publicar y mantener actualizados los episodios visibles en la sección pública.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Estado del panel"
          value="Operativo"
          hint="Estructura simplificada"
          icon={Activity}
        />
        <InfoCard
          title="Sesión activa"
          value={sessionName}
          hint="Acceso autenticado"
          icon={ShieldCheck}
        />
        <InfoCard
          title="Módulo activo"
          value="Podcast"
          hint="Único módulo administrable"
          icon={Layers3}
        />
        <InfoCard
          title="Episodios publicados"
          value={isLoading ? "Cargando..." : String(publishedCount)}
          hint="Visibles en la parte pública"
          icon={Radio}
        />
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Acceso rápido</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#132035]">Podcast</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Gestiona episodios, estados de publicación, destacados y edición de contenido desde un
              solo módulo.
            </p>
          </div>
        </div>

        <Link
          href="/admin/podcast"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#132035] transition hover:bg-[#bf931d]"
        >
          <Headphones className="h-4 w-4" />
          Administrar Podcast
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

function InfoCard({
  title,
  value,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string;
  hint: string;
  icon: typeof Activity;
}) {
  return (
    <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <p className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#f2e7ce] text-[#8f6717]">
        <Icon className="h-4 w-4" />
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">{title}</p>
      <p className="mt-2 text-xl font-semibold text-[#142033]">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </article>
  );
}
