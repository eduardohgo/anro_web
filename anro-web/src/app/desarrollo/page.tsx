"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type DesarrolloContent, resolveDesarrolloContent } from "@/lib/public-page-content";

export default function DesarrolloPage() {
  const [content, setContent] = useState<DesarrolloContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/desarrollo", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Desarrollo.");
        setContent(resolveDesarrolloContent(await response.json()));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    void load();
  }, []);

  if (error) return <main className="p-10 text-center">{error}</main>;
  if (!content) return <main className="p-10 text-center">Cargando Desarrollo...</main>;

  return (
    <main className="mx-auto max-w-[1850px] space-y-8 bg-[#f7f4f2] px-4 py-10 md:px-6">
      <section className="relative overflow-hidden rounded-[32px]">
        {content.hero.backgroundImage && <Image src={content.hero.backgroundImage} alt={content.hero.title} fill className="object-cover" />}
        <div className="relative z-10 min-h-[520px] bg-black/45 p-8 text-white md:p-12">
          <p>{content.hero.badge}</p><h1 className="text-5xl font-bold">{content.hero.title}</h1><p>{content.hero.description}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {content.hero.stats?.map((stat) => <article key={stat.id} className="rounded-2xl bg-white/15 p-4"><p className="text-2xl font-bold">{stat.value}</p><p>{stat.title}</p><p className="text-sm">{stat.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.sobre.title}</h2><p>{content.sobre.paragraph1}</p><p>{content.sobre.paragraph2}</p></section>
      <section className="grid gap-4 md:grid-cols-2">{content.sobre.facts?.map((fact) => <article key={fact.id} className="rounded-2xl bg-white p-4"><p>{fact.badge}</p><h3>{fact.title}</h3><p>{fact.description}</p></article>)}</section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.beneficios.title}</h2><p>{content.beneficios.subtitle}</p><ul className="list-disc pl-5">{content.beneficios.items?.map((item) => <li key={item.id}>{item.text}</li>)}</ul></section>

      <section className="space-y-3 rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.etapas.title}</h2><p>{content.etapas.description}</p>{content.etapas.stages?.map((stage) => <article key={stage.id} className="rounded-2xl border p-4"><p>{stage.stageLabel} · {stage.status}</p><h3>{stage.title}</h3><p>{stage.description}</p></article>)}</section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.compromiso.title}</h2><p>{content.compromiso.description}</p><div className="grid gap-3 md:grid-cols-3">{content.compromiso.stats?.map((s) => <article key={s.id} className="rounded-2xl bg-slate-50 p-4"><p className="text-2xl font-bold">{s.value}</p><p>{s.label}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.promociones.title}</h2><p>{content.promociones.description}</p><div className="grid gap-3 md:grid-cols-2">{content.promociones.promotions?.map((p) => <article key={p.id} className="rounded-2xl border p-4"><p>{p.label}</p><h3>{p.title}</h3><p>{p.description}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.galeria.title}</h2><div className="grid gap-3 md:grid-cols-3">{content.galeria.images?.map((img) => <article key={img.id} className="rounded-2xl border p-4"><p>{img.title}</p><p className="text-xs">{img.image}</p></article>)}</div></section>

      <section className="rounded-[30px] bg-[#1f1a17] p-8 text-white"><h2 className="text-3xl font-bold">{content.cta.title}</h2><div className="mt-5 flex flex-wrap gap-3">{content.cta.buttons?.map((btn) => <Link key={btn.id} href={btn.link} className="rounded-2xl bg-[#d4a62a] px-5 py-3 font-semibold text-black">{btn.text}</Link>)}</div></section>
    </main>
  );
}
