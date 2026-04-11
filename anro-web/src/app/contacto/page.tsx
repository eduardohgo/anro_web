"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type ContactoContent,
  resolveContactoContent,
} from "@/lib/public-page-content";

export default function ContactoPage() {
  const [content, setContent] = useState<ContactoContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/contacto", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Contacto.");
        const payload = (await response.json()) as unknown;
        setContent(resolveContactoContent(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };
    void load();
  }, []);

  if (error) return <main className="p-10 text-center">{error}</main>;
  if (!content) return <main className="p-10 text-center">Cargando Contacto...</main>;

  return (
    <main className="mx-auto max-w-[1680px] space-y-8 bg-[#F2F1EC] px-4 py-10 md:px-6">
      <section className="rounded-[32px] bg-white p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8B6A45]">{content.hero.badge}</p>
        <h1 className="mt-4 text-5xl font-bold text-[#4B392D]">{content.hero.titleWhite}<span className="block text-[#B78B4E]">{content.hero.titleGold}</span></h1>
        <p className="mt-4 max-w-3xl text-[#67584B]">{content.hero.description}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {content.channels.cards.map((card) => (
          <article key={card.id} className="rounded-2xl border bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9A7647]">{card.badge}</p>
            <h3 className="mt-2 text-xl font-bold text-[#4B392D]">{card.title}</h3>
            <p className="mt-2 text-sm text-[#67584B]">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[30px] bg-[#1F1916] p-8 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-[#D0A52F]">{content.cta.badge}</p>
        <h2 className="mt-3 text-3xl font-bold">{content.cta.titleWhite}<span className="block text-[#D0A52F]">{content.cta.titleGold}</span></h2>
        <p className="mt-3 text-white/80">{content.cta.description}</p>
        <div className="mt-5 flex gap-3">
          <Link href={content.cta.primaryButtonLink} className="rounded-full bg-[#B78B4E] px-6 py-3 font-semibold">{content.cta.primaryButtonText}</Link>
          <Link href={content.cta.secondaryButtonLink} className="rounded-full border border-white/20 px-6 py-3 font-semibold">{content.cta.secondaryButtonText}</Link>
        </div>
      </section>
    </main>
  );
}
