import HeroCarousel from "@/components/Home/HeroCarousel";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* HERO - Full width con card de datos rápidos incluida */}
      <HeroCarousel />

      {/* Contenido principal con contenedor centrado */}
      <div className="space-y-16 bg-[#f7f4f2] px-4 py-16 md:space-y-24 md:py-20">
        
       {/* PREVIEW DESARROLLO */}
<section className="mx-auto w-full max-w-[1850px] overflow-hidden rounded-[32px] border border-black/8 bg-[#fffdf9] shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
  <div className="relative">
    {/* Fondo visual */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-85"
      style={{ backgroundImage: "url('/fraccionamiento/carrusel3.jpg')" }}
    />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,249,0.28)_0%,rgba(255,253,249,0.18)_100%)]" />

    <div className="relative grid gap-8 px-6 py-10 md:grid-cols-12 md:px-10 lg:px-14">
      {/* Lado izquierdo */}
      <div className="md:col-span-8">
        <div className="inline-block rounded-[26px] border border-white/40 bg-white/55 px-6 py-5 shadow-sm backdrop-blur-md">
          <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
            Desarrollo principal
          </span>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f1a17] md:text-5xl">
            Nuestro Desarrollo Principal
          </h2>
          <p className="mt-2 text-lg font-medium text-[#5f5650]">
            Etapas, avances, beneficios y recorrido virtual.
          </p>
        </div>

       {/* Galería mini */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Card 1 */}
          <div className="group relative z-10 overflow-hidden rounded-[24px] border border-black/8 bg-[#fffdf9]/95 shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:z-20 hover:scale-[1.14] hover:shadow-xl">
            <div className="relative h-[240px] w-full overflow-hidden md:h-[270px]">
              <Image
                src="/fraccionamiento/primeraEtapa.jpg"
                alt="Primera etapa"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
                <h3 className="text-[15px] font-bold text-[#1f1a17] md:text-[18px]">
                  Primera etapa
                </h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative z-10 overflow-hidden rounded-[24px] border border-black/8 bg-[#fffdf9]/95 shadow-[0_12px_28px_rgba(0,0,0,0.08)] transition duration-300 hover:z-20 hover:scale-[1.14] hover:shadow-xl">
            <div className="relative h-[240px] w-full overflow-hidden md:h-[270px]">
              <Image
                src="/fraccionamiento/carrusel2.jpg"
                alt="Segunda etapa"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
                <h3 className="text-[15px] font-bold text-[#1f1a17] md:text-[18px]">
                  Segunda etapa
                </h3>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative z-0 overflow-hidden rounded-[30px] border border-black/8 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.10)] transition-all duration-500 hover:z-30 hover:scale-[1.14] hover:shadow-[0_35px_90px_rgba(15,23,42,0.28)]">
            <div className="relative h-[240px] w-full overflow-hidden md:h-[270px]">
              <video
                src="/fraccionamiento/recorrido-virtual.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
                <p className="text-[15px] font-bold text-[#1f1a17] md:text-[18px]">
                  Recorrido virtual
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="flex items-start justify-end md:col-span-4">
        <div className="w-full max-w-[420px] rounded-[24px] border border-white/35 bg-white/55 p-6 shadow-[0_14px_35px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <ul className="space-y-4 text-xl font-medium text-[#2f2824]">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
              Primera etapa
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
              Segunda etapa / ampliación
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
              Avances y beneficios
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
              Recorrido virtual
            </li>
          </ul>

          <div className="mt-6 flex justify-end">
            <a
              href="/contacto#ubicacion"
              className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#be931f]"
            >
              Ver ubicación
              <span className="ml-2">›</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* SERVICIOS */}
        <section className="mx-auto w-full max-w-[1850px]">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
                Soluciones ANRO
              </span>

              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#1f1a17]">
                Servicios
              </h2>

              <p className="mt-2 max-w-2xl text-lg text-[#5f5650]">
                Soluciones inmobiliarias y de construcción a tu medida, con atención
                profesional y acompañamiento en cada etapa.
              </p>
            </div>

            <Link
              href="/desarrollo#beneficios-servicios"
              className="inline-flex items-center justify-between rounded-2xl bg-[#1f1a17] px-6 py-4 font-bold text-white transition hover:bg-[#120f0d]"
            >
              <span>Ver todos los servicios</span>
              <span className="ml-4">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Card 1 */}
            <div className="group overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9] shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/fraccionamiento/desarrolloInmobilario.png"
                  alt="Desarrollo inmobiliario"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold leading-tight text-[#1f1a17]">
                  Desarrollo Inmobiliario
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#5f5650]">
                  Planeación y ejecución de proyectos inmobiliarios con visión de crecimiento,
                  orden y plusvalía.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9] shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/fraccionamiento/carrusel1.jpg"
                  alt="Compra, venta y renta"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold leading-tight text-[#1f1a17]">
                  Compra, Venta y Renta
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#5f5650]">
                  Acompañamiento en operaciones de bienes raíces, con atención clara y
                  enfoque en las necesidades del cliente.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9] shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/fraccionamiento/arrendamientoMaquinaria.jpg"
                  alt="Arrendamiento de maquinaria"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold leading-tight text-[#1f1a17]">
                  Arrendamiento de Maquinaria
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#5f5650]">
                  Maquinaria ligera y pesada para obras y proyectos, orientada a facilitar
                  el trabajo en campo y construcción.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf9] shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/fraccionamiento/construccionObras.jpg"
                  alt="Construcción de obras"
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold leading-tight text-[#1f1a17]">
                  Construcción de Obras
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#5f5650]">
                  Desarrollo de obras públicas y privadas con enfoque en calidad,
                  cumplimiento y funcionalidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPROMISO Y RESULTADOS */}
        <section className="mx-auto w-full max-w-[1850px] overflow-hidden rounded-[30px] border border-black/8 bg-[#fffdf9] p-8 shadow-[0_18px_45px_rgba(0,0,0,0.06)] md:p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            {/* Lado izquierdo */}
            <div className="md:col-span-5">
              <span className="inline-flex rounded-full border border-[#d4a62a]/30 bg-[#d4a62a]/10 px-4 py-1 text-sm font-semibold text-[#a87810]">
                Confianza ANRO
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1f1a17]">
                Compromiso y resultados
              </h2>

              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#5f5650]">
                En ANRO trabajamos con responsabilidad, atención personalizada y
                seguimiento constante para brindar confianza en cada etapa del proyecto.
                Nuestro compromiso se demuestra con hechos, avance y presencia real.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/desarrollo"
                  className="inline-flex items-center rounded-2xl bg-[#1f1a17] px-6 py-3 text-base font-bold text-white transition hover:bg-[#120f0d]"
                >
                  Ver avances
                </Link>

                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
                >
                  Agendar cita
                </Link>
              </div>

              {/* Mini valores */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f3ede5] p-4 ring-1 ring-black/5">
                  <div className="text-lg font-bold text-[#1f1a17]">Atención cercana</div>
                  <div className="mt-1 text-sm text-[#7a7069]">
                    Seguimiento claro y acompañamiento en el proceso.
                  </div>
                </div>

                <div className="rounded-2xl bg-[#f3ede5] p-4 ring-1 ring-black/5">
                  <div className="text-lg font-bold text-[#1f1a17]">Trabajo constante</div>
                  <div className="mt-1 text-sm text-[#7a7069]">
                    Evidencia real del desarrollo y compromiso con cada etapa.
                  </div>
                </div>
              </div>
            </div>

            {/* Lado derecho */}
            <div className="md:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Imagen principal */}
                <div className="group relative overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/10 md:row-span-2">
                  <div className="relative h-[420px] w-full overflow-hidden">
                    <Image
                      src="/fraccionamiento/carrusel1.jpg"
                      alt="Compromiso y resultados"
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                    <h3 className="text-xl font-bold text-white">Presencia y avance real</h3>
                    <p className="mt-1 text-sm text-white/80">
                      Seguimiento constante del desarrollo.
                    </p>
                  </div>
                </div>

                {/* Imagen secundaria 1 */}
                <div className="group relative overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/10">
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src="/fraccionamiento/carrusel2.jpg"
                      alt="Atención y seguimiento"
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-bold text-white">Seguimiento constante</h3>
                  </div>
                </div>

                {/* Imagen secundaria 2 */}
                <div className="group relative overflow-hidden rounded-[28px] shadow-sm ring-1 ring-black/10">
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image
                      src="/fraccionamiento/carrusel3.jpg"
                      alt="Desarrollo en marcha"
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-bold text-white">Desarrollo en marcha</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-[32px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] p-8 text-white shadow-[0_24px_60px_rgba(20,15,10,0.18)] md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Agenda tu cita y conoce <br />tu próximo patrimonio
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/52771974658"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700"
              >
                WhatsApp
              </a>
              <a
                href="/contacto"
                className="rounded-2xl bg-[#d4a62a] px-8 py-4 font-bold text-black transition hover:bg-[#be931f]"
              >
                Llamar
              </a>
            </div>

            <p className="mt-6 text-sm text-[#d9cec0]">ANRO · Privada</p>
          </div>
        </section>
      </div>
    </>
  );
}