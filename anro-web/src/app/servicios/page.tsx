"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ServiciosContent = any;

export default function ServiciosPage() {
  const [content, setContent] = useState<ServiciosContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/servicios", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Servicios.");
        setContent(await response.json());
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
        <Image src={content.hero.backgroundImage} alt={content.hero.titleWhite} fill className="object-cover" />
        <div className="relative z-10 min-h-[500px] bg-black/45 p-8 text-white md:p-12">
          <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">{content.hero.badge}</p>
          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">{content.hero.titleWhite}<span className="block text-[#d4a62a]">{content.hero.titleGold}</span></h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">{content.hero.description}</p>
        </div>
      </section>

      <section className="space-y-4">
        {content.servicesDetailed.items.map((service: any) => (
          <article key={service.id} className="grid overflow-hidden rounded-3xl border bg-white lg:grid-cols-2">
            <div className="relative min-h-[280px]"><Image src={service.image} alt={service.title} fill className="object-cover" /></div>
            <div className="p-6">
              <h2 className="text-3xl font-bold">{service.title}</h2>
              <p className="mt-3 text-slate-600">{service.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[30px] bg-[#1f1a17] p-8 text-white">
        <h2 className="text-3xl font-bold">{content.finalCta.titleWhite}<span className="block text-[#d4a62a]">{content.finalCta.titleGold}</span></h2>
        <p className="mt-3 text-white/80">{content.finalCta.description}</p>
        <Link href="/contacto" className="mt-6 inline-flex rounded-2xl bg-[#d4a62a] px-5 py-3 font-semibold text-black">{content.finalCta.submitText}</Link>
      </section>
    </main>
  );
}
