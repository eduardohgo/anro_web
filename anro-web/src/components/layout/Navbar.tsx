"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Desarrollo", href: "/desarrollo" },
  { label: "Servicios", href: "/servicios" },
  { label: "Podcast", href: "/podcast" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#e7c978]/10 bg-[rgba(31,26,23,0.88)] shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          : "bg-[rgba(31,26,23,0.48)] backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center">
          <div className="rounded-[22px] border border-white/15 bg-[#fffdf9]/95 px-2 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-all duration-300">
            <div className="relative h-16 w-24 md:h-20 md:w-28">
              <Image
                src="/fraccionamiento/anro-icon.png"
                alt="ANRO Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {/* Menú Desktop */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-5 py-2.5 text-base font-semibold transition-all duration-300",
                  active
                    ? "bg-[#d4a62a] text-black shadow-[0_8px_20px_rgba(212,166,42,0.22)]"
                    : "text-white hover:bg-white/10 hover:text-[#f3dfb7]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Botones Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://wa.me/52771974658"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/14 hover:text-[#f3dfb7]"
          >
            WhatsApp
          </a>

          <a
            href="/contacto"
            className="inline-flex items-center rounded-full bg-[#d4a62a] px-5 py-2.5 text-base font-bold text-black transition hover:bg-[#be931f]"
          >
            Agendar cita
          </a>
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 p-2 text-white backdrop-blur-sm transition hover:bg-white/14 md:hidden"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M3.75 9h16.5m-16.5 6.75h16.5"}
            />
          </svg>
        </button>
      </div>

      {/* Menú Móvil */}
      {open && (
        <div className="border-t border-white/10 bg-[rgba(31,26,23,0.94)] backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 pb-5 pt-3">
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={[
                      "rounded-xl px-4 py-3 text-base font-medium transition-all duration-300",
                      active
                        ? "bg-[#d4a62a] text-black"
                        : "bg-white/8 text-white hover:bg-white/14 hover:text-[#f3dfb7]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 grid gap-2">
              <a
                href="https://wa.me/52771974658"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/14 hover:text-[#f3dfb7]"
              >
                WhatsApp
              </a>

              <a
                href="/contacto"
                onClick={closeMenu}
                className="inline-flex items-center justify-center rounded-xl bg-[#d4a62a] px-5 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
              >
                Agendar cita
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}