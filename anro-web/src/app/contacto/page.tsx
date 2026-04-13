"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type ContactoContent, resolveContactoContent } from "@/lib/public-page-content";

export default function ContactoPage() {
  const [content, setContent] = useState<ContactoContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/public/contacto", { cache: "no-store" });
        if (!response.ok) throw new Error("No fue posible cargar Contacto.");
        setContent(resolveContactoContent(await response.json()));
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
      <section className="rounded-[32px] bg-white p-8"><p>{content.hero.badge}</p><h1 className="text-5xl font-bold">{content.hero.titleWhite} <span className="text-[#B78B4E]">{content.hero.titleGold}</span></h1><p>{content.hero.description}</p></section>

      <section className="rounded-3xl bg-white p-8"><h2 className="text-3xl font-bold">{content.welcome.titleWhite} <span className="text-[#B78B4E]">{content.welcome.titleGold}</span></h2><p>{content.welcome.description}</p></section>

      <section className="rounded-3xl bg-white p-8"><h2 className="text-3xl font-bold">{content.channels.titleWhite} <span className="text-[#B78B4E]">{content.channels.titleGold}</span></h2><p>{content.channels.description}</p><div className="grid gap-3 md:grid-cols-2 mt-3">{content.channels.channels?.map((channel) => <article key={channel.id} className="rounded-2xl border p-4"><p>{channel.badge}</p><h3>{channel.title}</h3><p>{channel.description}</p><p>{channel.value}</p></article>)}</div></section>

      <section className="rounded-3xl bg-white p-8"><h2 className="text-3xl font-bold">{content.form.titleWhite} <span className="text-[#B78B4E]">{content.form.titleGold}</span></h2><p>{content.form.description}</p><p className="mt-2">{content.form.formHeaderTitle}</p><p>{content.form.formHeaderDescription}</p></section>

      <section className="rounded-3xl bg-white p-8"><h2 className="text-3xl font-bold">{content.trust.titleWhite} <span className="text-[#B78B4E]">{content.trust.titleGold}</span></h2><p>{content.trust.description}</p></section>

      <section className="rounded-3xl bg-white p-8"><h2 className="text-3xl font-bold">{content.location.titleWhite} <span className="text-[#B78B4E]">{content.location.titleGold}</span></h2><p>{content.location.description}</p><div className="mt-4 flex gap-3"><Link href={content.location.primaryButtonLink || "#"} className="rounded-full bg-[#B78B4E] px-6 py-3 text-white">{content.location.primaryButtonText}</Link><Link href={content.location.secondaryButtonLink || "#"} className="rounded-full border px-6 py-3">{content.location.secondaryButtonText}</Link></div></section>

      <section className="rounded-[30px] bg-[#1F1916] p-8 text-white"><p>{content.cta.badge}</p><h2 className="text-3xl font-bold">{content.cta.titleWhite} <span className="text-[#D0A52F]">{content.cta.titleGold}</span></h2><p>{content.cta.description}</p></section>
    </main>
  );
}
