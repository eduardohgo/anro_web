"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import HeroCarousel from "@/components/Home/HeroCarousel";
import {
  DEFAULT_HOME_CONTENT,
  resolveHomeContent,
} from "@/lib/home-content";

export default function HomePage() {
  const [homeContent, setHomeContent] = useState(DEFAULT_HOME_CONTENT);

  useEffect(() => {
    let mounted = true;

    const fetchHomeContent = async () => {
      try {
        const response = await fetch("/api/public/home", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("No fue posible cargar Home desde la API pública.");
        }

        const payload = (await response.json()) as unknown;
        if (!mounted) return;
        setHomeContent(resolveHomeContent(payload));
      } catch (error) {
        console.error("No fue posible cargar Home desde Neon.", error);
      }
    };

    void fetchHomeContent();

    return () => {
      mounted = false;
    };
  }, []);

  const developmentCards = useMemo(
    () =>
      [...homeContent.developmentSection.cards]
        .filter((card) => card.active)
        .sort((a, b) => a.order - b.order),
    [homeContent.developmentSection.cards]
  );

  const serviceCards = useMemo(
    () =>
      [...homeContent.servicesSection.cards]
        .filter((card) => card.active)
        .sort((a, b) => a.order - b.order),
    [homeContent.servicesSection.cards]
  );

  const commitment = homeContent.commitmentSection;
  const cta = homeContent.ctaSection;

  return (
    <main className="bg-[#fcfaf7]">
      <HeroCarousel />

      <div className="mx-auto flex w-full max-w-[1850px] flex-col gap-10 px-4 py-10 md:px-6 xl:px-10">
        <section className="relative overflow-hidden rounded-[32px] border border-black/8 bg-[#f5f1eb] p-6 md:p-8">
          <div className="absolute inset-0">
            <Image
              src={homeContent.developmentSection.backgroundImage}
              alt={homeContent.developmentSection.title}
              fill
              className="object-cover opacity-20"
            />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[1fr_0.42fr] xl:items-start">
            <div>
              <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
                {homeContent.developmentSection.badge}
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f1a17]">
                {homeContent.developmentSection.title}
              </h2>

              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#5f5650]">
                {homeContent.developmentSection.subtitle}
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {developmentCards.map((card) => (
                  <article
                    key={card.id}
                    className="overflow-hidden rounded-[28px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative h-[240px] w-full">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a87810]">
                        {card.tag}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-[#1f1a17]">
                        {card.title}
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[28px] bg-white/80 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] backdrop-blur">
              <h3 className="text-xl font-bold text-[#1f1a17]">Información rápida</h3>

              <ul className="mt-5 space-y-4">
                {homeContent.developmentSection.sideList.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="rounded-2xl bg-[#f3ede5] px-4 py-3 text-base text-[#5f5650]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={homeContent.developmentSection.buttonLink}
                className="mt-6 inline-flex items-center rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#be931f]"
              >
                {homeContent.developmentSection.buttonText}
              </Link>
            </aside>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.05)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
                {homeContent.servicesSection.badge}
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f1a17]">
                {homeContent.servicesSection.title}
              </h2>

              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#5f5650]">
                {homeContent.servicesSection.description}
              </p>
            </div>

            <Link
              href={homeContent.servicesSection.buttonLink}
              className="inline-flex items-center rounded-2xl bg-[#1f1a17] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#120f0d]"
            >
              {homeContent.servicesSection.buttonText}
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((card) => (
              <article
                key={card.id}
                className="overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9] shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
              >
                <div className="relative h-[220px] w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-bold text-[#1f1a17]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#5f5650]">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1850px] overflow-hidden rounded-[30px] border border-black/8 bg-[#fffdf9] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.06)] md:p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
                {commitment.badge}
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f1a17]">
                {commitment.title}
              </h2>

              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#5f5650]">
                {commitment.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={commitment.primaryButtonLink}
                  className="inline-flex items-center rounded-2xl bg-[#1f1a17] px-6 py-3 text-base font-bold text-white transition hover:bg-[#120f0d]"
                >
                  {commitment.primaryButtonText}
                </Link>

                <Link
                  href={commitment.secondaryButtonLink}
                  className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
                >
                  {commitment.secondaryButtonText}
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {commitment.featureBlocks.map((block, index) => (
                  <div
                    key={`${block.title}-${index}`}
                    className="rounded-2xl bg-[#f3ede5] p-4 ring-1 ring-black/5"
                  >
                    <div className="text-lg font-bold text-[#1f1a17]">
                      {block.title}
                    </div>
                    <div className="mt-1 text-sm text-[#7a7069]">
                      {block.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/10 md:row-span-2">
                  <div className="relative h-[420px] w-full overflow-hidden">
                    <Image
                      src={commitment.mainImage.image}
                      alt={commitment.mainImage.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <h3 className="text-xl font-bold text-white">
                      {commitment.mainImage.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/80">
                      {commitment.mainImage.subtitle}
                    </p>
                  </div>
                </div>

                {commitment.sideImages.map((image, index) => (
                  <div
                    key={`${image.title}-${index}`}
                    className="group relative overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/10"
                  >
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src={image.image}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-bold text-white">
                        {image.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/80">
                        {image.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[32px] bg-[#111827] px-6 py-8 text-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] md:px-8 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d4a62a]">
                Cierre del Home
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
                {cta.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                {cta.footerText}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={cta.primaryButtonLink}
                className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#be931f]"
              >
                {cta.primaryButtonText}
              </Link>

              <Link
                href={cta.secondaryButtonLink}
                className="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                {cta.secondaryButtonText}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
