"use client";


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type DesarrolloContent,
  resolveDesarrolloContent,
} from "@/lib/public-page-content";

export default function DesarrolloPage() {
  const [content, setContent] = useState<DesarrolloContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/desarrollo", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Desarrollo.");
        const payload = (await response.json()) as unknown;
        setContent(resolveDesarrolloContent(payload));
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
        <Image src={content.hero.backgroundImage} alt={content.hero.title} fill className="object-cover" />
        <div className="relative z-10 min-h-[520px] bg-black/35 p-8 text-white md:p-12">
          <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">{content.hero.badge}</p>
          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">{content.hero.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">{content.hero.description}</p>
          <div className="mt-6 flex gap-3">
            <Link href={content.hero.primaryButtonLink} className="rounded-2xl bg-[#d4a62a] px-5 py-3 font-semibold text-black">{content.hero.primaryButtonText}</Link>
            <Link href={content.hero.secondaryButtonLink} className="rounded-2xl bg-white/15 px-5 py-3 font-semibold">{content.hero.secondaryButtonText}</Link>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] bg-white p-8">
        <h2 className="text-3xl font-bold">{content.about.title}</h2>
        <p className="mt-4 text-slate-700">{content.about.paragraph1}</p>
        <p className="mt-3 text-slate-700">{content.about.paragraph2}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {content.benefits.cards.map((card) => (
          <article key={card.id} className="rounded-2xl border bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a87911]">{card.badge}</p>
            <h3 className="mt-2 text-xl font-bold">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[30px] bg-[#1f1a17] p-8 text-white">
        <h2 className="text-3xl font-bold">{content.cta.title}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {content.cta.buttons.map((btn) => (
            <Link key={btn.id} href={btn.link} className="rounded-2xl bg-[#d4a62a] px-5 py-3 font-semibold text-black">{btn.text}</Link>
          ))}
        </div>
      </section>
    </main>
  );
}
