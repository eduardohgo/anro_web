"use client";

import { podcastAdminApi } from "@/lib/api";
import Link from "next/link";
import { ArrowUpRight, Headphones, LoaderCircle, Mic2, Radio } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PodcastEpisode } from "@/lib/types";

export default function AdminDashboardClient() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    podcastAdminApi
      .list()
      .then((items) => {
        if (!mounted) return;
        setEpisodes(items);
      })
      .catch(() => {
        if (!mounted) return;
        setEpisodes([]);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const published = episodes.filter((episode) => episode.status === "PUBLISHED").length;
    const drafts = episodes.filter((episode) => episode.status === "DRAFT").length;

    return {
      total: episodes.length,
      published,
      drafts,
    };
  }, [episodes]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.15),transparent_32%),linear-gradient(135deg,#0e1c36_0%,#16305a_65%,#1f3f70_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.16)] md:px-9 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f3d79a]">ANRO Admin</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Bienvenido al panel administrativo</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Desde aquí puedes administrar únicamente el módulo Podcast: crear, editar, publicar y destacar episodios.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard title="Episodios" value={summary.total} hint="Total registrados en el módulo" icon={<Mic2 className="h-4 w-4" />} isLoading={isLoading} />
        <InfoCard title="Publicados" value={summary.published} hint="Visibles en /podcast" icon={<Radio className="h-4 w-4" />} isLoading={isLoading} />
        <InfoCard title="Borradores" value={summary.drafts} hint="Pendientes de publicación" icon={<Headphones className="h-4 w-4" />} isLoading={isLoading} />
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Acceso rápido</p>
        <h2 className="mt-3 text-2xl font-semibold text-[#132035]">Ir al módulo Podcast</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Gestiona episodios, estado de publicación y destacados desde un único módulo.
        </p>

        <Link
          href="/admin/podcast"
          className="group mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-[#101a2e] transition hover:bg-[#c19420]"
        >
          Abrir Podcast
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>
    </div>
  );
}

function InfoCard({
  title,
  value,
  hint,
  icon,
  isLoading,
}: {
  title: string;
  value: number;
  hint: string;
  icon: import("react").ReactNode;
  isLoading: boolean;
}) {
  return (
    <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">{title}</p>
        <span className="text-[#aa7f28]">{icon}</span>
      </div>

      <p className="mt-3 flex min-h-9 items-center text-3xl font-semibold text-[#142033]">
        {isLoading ? <LoaderCircle className="h-6 w-6 animate-spin text-[#aa7f28]" /> : value}
      </p>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </article>
  );
}
