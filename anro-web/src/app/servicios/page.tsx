"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { type ServiciosContent, resolveServiciosContent } from "@/lib/public-page-content";

export default function ServiciosPage() {
  const [content, setContent] = useState<ServiciosContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/servicios", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Servicios.");
        setContent(resolveServiciosContent(await response.json()));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    void load();
  }, []);

  if (error) return <main className="p-10 text-center">{error}</main>;
  if (!content) return <main className="p-10 text-center">Cargando Servicios...</main>;

  return (
    <main className="mx-auto max-w-[1850px] space-y-8 bg-[#f7f4f2] px-4 py-10 md:px-6">
      <section className="relative overflow-hidden rounded-[32px]">
        {content.hero.backgroundImage && <Image src={content.hero.backgroundImage} alt={content.hero.titleWhite} fill className="object-cover" />}
        <div className="relative z-10 min-h-[500px] bg-black/50 p-8 text-white"><p>{content.hero.badge}</p><h1 className="text-5xl font-bold">{content.hero.titleWhite} <span className="text-[#d4a62a]">{content.hero.titleGold}</span></h1><p>{content.hero.description}</p></div>
      </section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.detailedServices.title}</h2><p>{content.detailedServices.description}</p><div className="space-y-3 mt-3">{content.detailedServices.services?.map((s) => <article key={s.id} className="rounded-2xl border p-4"><h3 className="text-xl font-bold">{s.title}</h3><p>{s.summary}</p><p>{s.description}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.workProcess.title}</h2><p>{content.workProcess.description}</p><div className="grid gap-3 md:grid-cols-2 mt-3">{content.workProcess.steps?.map((step) => <article key={step.id} className="rounded-2xl border p-4"><p>{step.number}</p><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.specialties.title}</h2><p>{content.specialties.description}</p><div className="grid gap-3 md:grid-cols-2 mt-3">{content.specialties.cards?.map((card) => <article key={card.id} className="rounded-2xl border p-4"><p>{card.number}</p><h3>{card.title}</h3><p>{card.description}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.visualSupport.title}</h2><p>{content.visualSupport.description}</p><div className="grid gap-3 md:grid-cols-3 mt-3">{content.visualSupport.images?.map((img) => <article key={img.id} className="rounded-2xl border p-4"><p>{img.title}</p><p>{img.description}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-6"><h2 className="text-3xl font-bold">{content.benefits.title}</h2><p>{content.benefits.description}</p><div className="grid gap-3 md:grid-cols-3 mt-3">{content.benefits.cards?.map((card) => <article key={card.id} className="rounded-2xl border p-4"><p>{card.number}</p><h3>{card.title}</h3><p>{card.description}</p></article>)}</div></section>

      <section className="rounded-[30px] bg-[#1f1a17] p-8 text-white"><h2 className="text-3xl font-bold">{content.finalCta.titleWhite} <span className="text-[#d4a62a]">{content.finalCta.titleGold}</span></h2><p>{content.finalCta.description}</p></section>
    </main>
  );
}
