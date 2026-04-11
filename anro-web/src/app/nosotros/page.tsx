"use client";

import Link from "next/link";
import { ShieldCheck, Target, Hammer, HeartHandshake } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NosotrosContent } from "@/lib/nosotros-content";
import { DEFAULT_NOSOTROS_CONTENT, resolveNosotrosContent } from "@/lib/nosotros-content";

const pillarIcons = [Target, Hammer, HeartHandshake, ShieldCheck];

export default function NosotrosPage() {
  const [content, setContent] = useState<NosotrosContent>(DEFAULT_NOSOTROS_CONTENT);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/public/nosotros", { cache: "no-store" });
      const payload = await response.json();
      setContent(resolveNosotrosContent(payload));
    };

    void load();
  }, []);

  const pillars = useMemo(
    () =>
      content.pillars.items.map((item, index) => ({
        ...item,
        Icon: pillarIcons[index % pillarIcons.length],
      })),
    [content.pillars.items]
  );

  return (
    <main className="bg-[#f7f4f2] space-y-10 pb-12">
      <section className="mx-auto w-full max-w-[1850px] px-4 pb-4 pt-24 md:px-6 lg:pt-32">
        <div className="rounded-[36px] border border-black/10 bg-[#1e1815] px-6 py-10 text-white shadow-[0_20px_70px_rgba(0,0,0,0.08)] md:px-10 lg:px-12">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em]">{content.hero.badge}</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">{content.hero.titleWhite}<span className="block text-[#d4a62a]">{content.hero.titleGold}</span></h1>
          <p className="mt-5 max-w-3xl text-white/85 md:text-lg">{content.hero.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={content.hero.primaryButtonLink} className="rounded-full bg-[#d4a62a] px-7 py-3 font-bold text-[#1f1a17]">{content.hero.primaryButtonText}</Link>
            <Link href={content.hero.secondaryButtonLink} className="rounded-full border border-white/20 bg-white/10 px-7 py-3 font-bold">{content.hero.secondaryButtonText}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-[36px] border border-[#dccfb9] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_100%)] p-8 md:p-10">
          <span className="inline-flex rounded-full border border-[#d4a62a]/50 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9c7418]">{content.about.badge}</span>
          <h2 className="mt-5 text-3xl font-bold text-[#1f1a17] md:text-5xl">{content.about.title}</h2>
          <p className="mt-4 text-[#5f5650] md:text-lg">{content.about.paragraph1}</p>
          <p className="mt-4 text-[#5f5650] md:text-lg">{content.about.paragraph2}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.about.cards.map((card) => (
              <article key={card.id} className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9c7418]">{card.label}</p>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">{card.title}</h3>
                <p className="mt-2 text-sm text-[#5f5650]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1850px] gap-4 px-4 md:grid-cols-2 md:px-6">
        <article className="rounded-3xl border border-black/10 bg-white p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9c7418]">{content.mission.badge}</p>
          <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">{content.mission.title}</h3>
          <p className="mt-3 text-[#5f5650]">{content.mission.description}</p>
        </article>
        <article className="rounded-3xl border border-black/10 bg-white p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9c7418]">{content.vision.badge}</p>
          <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">{content.vision.title}</h3>
          <p className="mt-3 text-[#5f5650]">{content.vision.description}</p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-black/10 bg-white p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9c7418]">{content.pillars.badge}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1f1a17]">{content.pillars.title}</h2>
          <p className="mt-2 text-[#5f5650]">{content.pillars.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {pillars.map(({ Icon, ...pillar }) => (
              <article key={pillar.id} className="rounded-2xl border border-[#eadfcf] bg-[#fffdfa] p-5">
                <div className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#9c7418]" /><p className="text-xs font-semibold text-[#9c7418]">{pillar.number}</p></div>
                <h3 className="mt-2 text-lg font-bold text-[#1f1a17]">{pillar.title}</h3>
                <p className="mt-2 text-sm text-[#5f5650]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-black/10 bg-[#1f1a17] p-8 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-[#e5c06a]">{content.values.badge}</p>
          <h2 className="mt-3 text-3xl font-bold">{content.values.title}</h2>
          <p className="mt-2 text-white/80">{content.values.description}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {content.values.items.map((value) => (
              <article key={value.id} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs text-[#e5c06a]">{value.number}</p><h3 className="font-semibold">{value.title}</h3><p className="text-sm text-white/80">{value.text}</p></article>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Fortalezas ANRO</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {content.values.strengths.map((strength) => <li key={strength.id}>• {strength.title}: {strength.text}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 md:px-6">
        <div className="rounded-3xl border border-[#d4a62a]/40 bg-[linear-gradient(135deg,#f6ebd2_0%,#fff7e8_100%)] p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#9c7418]">{content.cta.badge}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#1f1a17]">{content.cta.title}</h2>
          <p className="mt-2 text-[#5f5650]">{content.cta.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={content.cta.primaryButtonLink} className="rounded-full bg-[#1f1a17] px-7 py-3 font-semibold text-white">{content.cta.primaryButtonText}</Link>
            <Link href={content.cta.secondaryButtonLink} className="rounded-full border border-[#1f1a17]/20 px-7 py-3 font-semibold text-[#1f1a17]">{content.cta.secondaryButtonText}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
