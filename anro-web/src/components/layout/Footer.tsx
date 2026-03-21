import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08152b] text-white">
  {/* Fondo decorativo sutil */}
  <div className="absolute inset-0">
    <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#d4a62a]/8 blur-3xl" />
    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_100%)]" />
  </div>

  {/* Línea superior elegante */}
  <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4a62a]/60 to-transparent" />

  <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-8 lg:px-10 lg:py-16">
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* Marca */}
      <div className="lg:col-span-5">
        <div className="flex items-start gap-5">
          <div className="rounded-[24px] border border-white/10 bg-white/95 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <Image
              src="/fraccionamiento/anro-icon.png"
              alt="Logo ANRO"
              width={96}
              height={96}
              className="h-auto w-[96px] object-contain"
            />
          </div>

          <div className="pt-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b458]">
              ANRO Grupo Desarrollador
            </p>

            <h3 className="mt-2 max-w-md text-2xl font-bold leading-tight text-white md:text-[30px]">
              Desarrollo, construcción y visión patrimonial con identidad sólida.
            </h3>
          </div>
        </div>

        <p className="mt-6 max-w-xl text-sm leading-7 text-white/68 md:text-[15px]">
          Creamos proyectos con enfoque en plusvalía, infraestructura y atención
          personalizada, acompañando cada etapa con compromiso real y una visión
          de crecimiento a largo plazo.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#be931f]"
          >
            Solicitar información
          </Link>

          <Link
            href="/desarrollo"
            className="inline-flex items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            Ver desarrollo
          </Link>
        </div>
      </div>

      {/* Enlaces */}
      <div className="lg:col-span-2 lg:pl-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
          Navegación
        </h4>

        <ul className="mt-5 space-y-3 text-sm text-white/70">
          <li>
            <Link href="/" className="transition hover:text-[#d4a62a]">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/desarrollo" className="transition hover:text-[#d4a62a]">
              Desarrollo
            </Link>
          </li>
          <li>
            <Link href="/servicios" className="transition hover:text-[#d4a62a]">
              Servicios
            </Link>
          </li>
          <li>
            <Link href="/podcast" className="transition hover:text-[#d4a62a]">
              Podcast
            </Link>
          </li>
          <li>
            <Link href="/nosotros" className="transition hover:text-[#d4a62a]">
              Nosotros
            </Link>
          </li>
          <li>
            <Link href="/contacto" className="transition hover:text-[#d4a62a]">
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      {/* Contacto */}
      <div className="lg:col-span-2">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
          Contacto
        </h4>

        <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
          <li>
            <span className="block text-white/45">Ubicación</span>
            Huejutla de Reyes, Hgo.
          </li>

          <li>
            <span className="block text-white/45">Teléfono</span>
            <a
              href="tel:+52771794658"
              className="transition hover:text-[#d4a62a]"
            >
              +52 771 974 658
            </a>
          </li>

          <li>
            <span className="block text-white/45">Correo</span>
            <a
              href="mailto:info@anro.mx"
              className="transition hover:text-[#d4a62a]"
            >
              info@anro.mx
            </a>
          </li>
        </ul>
      </div>

      {/* Redes */}
      <div className="lg:col-span-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
          Presencia digital
        </h4>

        <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
          Síguenos para conocer novedades del desarrollo, avances de obra y
          contenido relacionado con nuestros proyectos.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition hover:border-[#d4a62a]/40 hover:bg-[#d4a62a]/10 hover:text-[#f3dfb7]"
          >
            Facebook
          </a>

          <a
            href="#"
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition hover:border-[#d4a62a]/40 hover:bg-[#d4a62a]/10 hover:text-[#f3dfb7]"
          >
            Instagram
          </a>

          <a
            href="#"
            className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 backdrop-blur-sm transition hover:border-[#d4a62a]/40 hover:bg-[#d4a62a]/10 hover:text-[#f3dfb7]"
          >
            YouTube
          </a>
        </div>
      </div>
    </div>

    {/* Parte inferior */}
    <div className="mt-12 border-t border-white/10 pt-6">
      <div className="flex flex-col gap-3 text-center text-sm text-white/45 md:flex-row md:items-center md:justify-between md:text-left">
        <p>© 2026 ANRO Grupo Desarrollador y Constructor.</p>
        <p>Todos los derechos reservados.</p>
      </div>
    </div>
  </div>
</footer>


  );
}