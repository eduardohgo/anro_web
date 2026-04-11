"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Hammer,
  HeartHandshake,
  ShieldCheck,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NosotrosContent, NosotrosPillar, NosotrosStrength, NosotrosValue, NosotrosAboutCard } from "@/lib/nosotros-content";
import { resolveNosotrosContent } from "@/lib/nosotros-content";

const pillarIcons = [Target, Hammer, HeartHandshake, ShieldCheck];

export default function NosotrosPage() {
  const [content, setContent] = useState<NosotrosContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/public/nosotros", { cache: "no-store" });
      if (!response.ok) throw new Error("No fue posible cargar Nosotros.");
      const payload = await response.json();
      setContent(resolveNosotrosContent(payload));
    };

    void load().catch((error) =>
      setLoadError(error instanceof Error ? error.message : "Error desconocido")
    );
  }, []);

  if (loadError) {
    return <main className="p-10 text-center">{loadError}</main>;
  }

  if (!content) {
    return <main className="p-10 text-center">Cargando Nosotros...</main>;
  }

  const pillars = useMemo(
    () =>
      (content?.pillars.items ?? []).map((item: NosotrosPillar, index: number) => ({
        ...item,
        Icon: pillarIcons[index % pillarIcons.length],
      })),
    [content?.pillars.items]
  );

  if (loadError) {
    return <main className="p-10 text-center">{loadError}</main>;
  }

  if (!content) {
    return <main className="p-10 text-center">Cargando Nosotros...</main>;
  }

  return (
    <main className="space-y-10 bg-[#f7f4f2] pb-14 md:space-y-12">
      <section className="mx-auto w-full max-w-[1850px] px-4 pt-24 md:px-6 lg:pt-32">
        <div className="grid gap-4 rounded-[36px] border border-[#2c3f62] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.2),transparent_35%),linear-gradient(135deg,#0f1f3d_0%,#17335f_62%,#234a7f_100%)] p-5 text-white shadow-[0_24px_80px_rgba(8,16,35,0.22)] md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch lg:p-10">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8">
            <span className="inline-flex rounded-full border border-[#f0d38f]/70 bg-[#f0d38f]/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f8dfab]">
              {content.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              {content.hero.titleWhite}
              <span className="block text-[#d4a62a]">{content.hero.titleGold}</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-100 md:text-lg">
              {content.hero.description}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={content.hero.primaryButtonLink}
                className="inline-flex items-center gap-2 rounded-full bg-[#d4a62a] px-7 py-3 font-bold text-[#1f1a17] transition hover:bg-[#be911e]"
              >
                {content.hero.primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.hero.secondaryButtonLink}
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3 font-bold transition hover:bg-white/15"
              >
                {content.hero.secondaryButtonText}
              </Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-[28px] border border-[#d6c29a]/60 bg-[#111a2b]">
            <div className="relative h-full min-h-[320px] w-full">
              <Image src={content.hero.image} alt="Hero de Nosotros ANRO" fill className="object-cover" />
            </div>
            <div className="border-t border-white/10 bg-[#0f1a2c] px-5 py-3 text-sm text-slate-200">
              Vista institucional de ANRO
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-[36px] border border-[#dccfb9] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_100%)] p-6 md:p-8 lg:p-10">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="rounded-[28px] border border-[#e7d9c4] bg-white/85 p-6 md:p-8">
              <span className="inline-flex rounded-full border border-[#d4a62a]/50 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9c7418]">
                {content.about.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold text-[#1f1a17] md:text-5xl">{content.about.title}</h2>
              <p className="mt-4 text-[#5f5650] md:text-lg">{content.about.paragraph1}</p>
              <p className="mt-4 text-[#5f5650] md:text-lg">{content.about.paragraph2}</p>
            </article>

            <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-[28px] border border-[#e7d9c4]">
              <Image src={content.about.image} alt="Equipo y operaciones ANRO" fill className="object-cover" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.about.cards.map((card: NosotrosAboutCard) => (
              <article
                key={card.id}
                className="rounded-2xl border border-[#e7d9c4] bg-white p-5 shadow-[0_12px_30px_rgba(45,32,15,0.06)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9c7418]">{card.label}</p>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5650]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1850px] gap-4 px-4 md:grid-cols-2 md:px-6">
        <article className="rounded-3xl border border-[#e8ddca] bg-white p-7 shadow-[0_14px_35px_rgba(18,24,37,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7418]">{content.mission.badge}</p>
          <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">{content.mission.title}</h3>
          <p className="mt-3 leading-7 text-[#5f5650]">{content.mission.description}</p>
        </article>
        <article className="rounded-3xl border border-[#e8ddca] bg-white p-7 shadow-[0_14px_35px_rgba(18,24,37,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7418]">{content.vision.badge}</p>
          <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">{content.vision.title}</h3>
          <p className="mt-3 leading-7 text-[#5f5650]">{content.vision.description}</p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-[#e1d4bf] bg-white p-8 shadow-[0_16px_40px_rgba(25,32,45,0.07)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7418]">{content.pillars.badge}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1f1a17] md:text-4xl">{content.pillars.title}</h2>
          <p className="mt-3 max-w-4xl text-[#5f5650] md:text-lg">{content.pillars.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pillars.map(({ Icon, ...pillar }) => (
              <article key={pillar.id} className="rounded-2xl border border-[#eadfcf] bg-[#fffdfa] p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7edd9] text-[#9c7418]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.2em] text-[#9c7418]">{pillar.number}</p>
                </div>
                <h3 className="mt-3 text-lg font-bold text-[#1f1a17]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5650]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-black/10 bg-[#1f1a17] p-8 text-white shadow-[0_18px_48px_rgba(17,12,8,0.25)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c06a]">{content.values.badge}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{content.values.title}</h2>
          <p className="mt-2 text-base text-white/80 md:text-lg">{content.values.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.values.items.map((value: NosotrosValue) => (
              <article key={value.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-[#e5c06a]">{value.number}</p>
                <h3 className="mt-2 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{value.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Fortalezas ANRO</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {content.values.strengths.map((strength: NosotrosStrength) => (
                <li key={strength.id} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#f0d38f]">
                    <CheckCircle2 className="h-4 w-4" />
                    {strength.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/80">{strength.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-[#d4a62a]/40 bg-[linear-gradient(135deg,#f6ebd2_0%,#fff7e8_100%)] p-8 shadow-[0_18px_44px_rgba(50,35,12,0.09)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c7418]">{content.cta.badge}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1f1a17] md:text-4xl">{content.cta.title}</h2>
          <p className="mt-3 max-w-3xl text-[#5f5650] md:text-lg">{content.cta.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={content.cta.primaryButtonLink}
              className="inline-flex items-center gap-2 rounded-full bg-[#1f1a17] px-7 py-3 font-semibold text-white transition hover:bg-[#312824]"
            >
              {content.cta.primaryButtonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={content.cta.secondaryButtonLink}
              className="rounded-full border border-[#1f1a17]/25 px-7 py-3 font-semibold text-[#1f1a17] transition hover:bg-[#1f1a17]/5"
            >
              {content.cta.secondaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
