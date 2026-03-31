"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import {
  DEFAULT_HOME_CONTENT,
  HOME_CONTENT_STORAGE_KEY,
  HomeHeroSlide,
  parseStoredHomeContent,
} from "@/lib/home-content";

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HomeHeroSlide[]>(DEFAULT_HOME_CONTENT.heroSlides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const applyContent = () => {
      const config = parseStoredHomeContent(window.localStorage.getItem(HOME_CONTENT_STORAGE_KEY));
      setSlides(config.heroSlides);
      setIndex((current) => (current >= config.heroSlides.length ? 0 : current));
    };

    applyContent();
    window.addEventListener("storage", applyContent);
    return () => window.removeEventListener("storage", applyContent);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={slides[index].src}
          alt={slides[index].alt}
          fill
          priority
          className="object-cover"
        />

        {/* Overlay ANRO */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,26,23,0.78)_0%,rgba(44,38,34,0.62)_38%,rgba(44,38,34,0.35)_68%,rgba(31,26,23,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      {/* Logo marca de agua */}
     <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block">
  <Image
    src="/fraccionamiento/anro-icon.png"
    alt="Logo ANRO"
    width={280}
    height={280}
    className="absolute bottom-[105px] left-[48%] -translate-x-1/2 opacity-[1] blur-0 lg:bottom-[95px] lg:left-[46%] lg:w-[300px] xl:left-[47%] xl:w-[320px]"
  />
</div>

      {/* Contenido del Hero */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
            {/* LADO IZQUIERDO */}
            <div className="text-white">
              <span className="inline-flex rounded-full border border-[#e7c978]/25 bg-[#d4a62a]/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#f3dfb7] backdrop-blur">
                Desarrollo residencial
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
                Fraccionamiento <br />
                <span className="text-[#d4a62a]">Daniel Andrade Fayad</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#f1e7db] md:text-xl">
                Un desarrollo pensado para brindar seguridad, accesibilidad y
                plusvalía, con espacios planificados para tu patrimonio.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/desarrollo"
                  className="rounded-2xl bg-[#d4a62a] px-6 py-3 font-bold text-black transition hover:bg-[#be931f]"
                >
                  Ver Desarrollo
                </Link>

                <Link
                  href="/contacto"
                  className="rounded-2xl border border-white/35 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Agendar Cita
                </Link>
              </div>

              {/* Lista de características */}
              <div className="mt-8 flex flex-col gap-3 text-white sm:flex-row sm:flex-wrap sm:gap-6">
                <span className="flex items-center gap-2">
                  <span className="text-xl text-[#d4a62a]">✓</span>
                  <span className="text-[#f1e7db]">Escrituras públicas</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-xl text-[#d4a62a]">✓</span>
                  <span className="text-[#f1e7db]">Promociones al contado</span>
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-xl text-[#d4a62a]">✓</span>
                  <span className="text-[#f1e7db]">Atención personalizada</span>
                </span>
              </div>
            </div>

            {/* LADO DERECHO */}
            <div className="flex items-start justify-end">
              <div className="w-full max-w-md rounded-[28px] border border-white/12 bg-[rgba(31,26,23,0.48)] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.22)] backdrop-blur-md">
                <h2 className="text-2xl font-bold text-white">Datos rápidos</h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/12 pb-3">
                    <span className="font-medium text-[#f1e7db]">Lotes</span>
                    <span className="font-bold text-white">10x20 (200 m²)</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/12 pb-3">
                    <span className="font-medium text-[#f1e7db]">Ubicación</span>
                    <span className="font-bold text-white">Huejutla de Reyes, Hgo.</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/12 pb-3">
                    <span className="font-medium text-[#f1e7db]">Escrituración</span>
                    <span className="font-bold text-white">Entrega de escrituras públicas</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#f1e7db]">Promos</span>
                    <span className="font-bold text-[#d4a62a]">Consulta promociones</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/12 pt-4">
                  <Link
                    href="/contacto#ubicacion"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#e7c978] transition hover:text-[#d4a62a]"
                  >
                    <MapPinIcon className="h-5 w-5" />
                    Ver ubicación
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del Carrusel */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-[rgba(31,26,23,0.45)] p-3 text-white backdrop-blur-sm transition hover:bg-[rgba(31,26,23,0.65)]"
        aria-label="Anterior"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/15 bg-[rgba(31,26,23,0.45)] p-3 text-white backdrop-blur-sm transition hover:bg-[rgba(31,26,23,0.65)]"
        aria-label="Siguiente"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots indicadores */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-[#d4a62a]" : "w-2 bg-white/70"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}