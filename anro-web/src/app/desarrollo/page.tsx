import Image from "next/image";
import Link from "next/link";

export default function DesarrolloPage() {
  return (
    <main className="bg-[#f7f4f2]">
      {/* 1. HERO INTERNO DEL DESARROLLO */}
      <section className="mx-auto w-full max-w-[1850px] px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28 lg:pt-32">
  <div className="relative overflow-hidden rounded-[36px] border border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
    {/* Imagen de fondo */}
    <div className="absolute inset-0">
      <Image
        src="/fraccionamiento/heroDesarrollo.jpg"
        alt="Fraccionamiento Daniel Andrade Fayad"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/12 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
    </div>

    {/* Contenido encima */}
    <div className="relative z-10 flex min-h-[720px] items-end lg:min-h-[780px]">
      <div className="w-full px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <span className="inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                Desarrollo residencial
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              Fraccionamiento
              <br />
              Daniel Andrade Fayad
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg lg:text-[20px]">
              Un desarrollo pensado para ofrecer seguridad, orden, crecimiento y
              plusvalía, con infraestructura y servicios que fortalecen tu patrimonio.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-2xl bg-[#1f1a17] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#120f0d] md:text-base"
              >
                Solicitar información
              </Link>

              <Link
                href="/contacto"
                className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#be931f] md:text-base"
              >
                Agendar cita
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[30px] border border-white/10 bg-white/10 p-5 shadow-sm backdrop-blur-md md:p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[22px] border border-white/10 bg-white/92 p-5 shadow-sm">
                  <div className="text-4xl font-extrabold text-[#1f1a17] md:text-5xl">
                    120
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1f1a17]">
                    Lotes disponibles
                  </div>
                  <p className="mt-1 text-sm text-[#7a7069]">10x20 m (200 m²)</p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/92 p-5 shadow-sm">
                  <div className="text-4xl font-extrabold text-[#1f1a17] md:text-5xl">
                    Alta
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[#1f1a17]">
                    Plusvalía
                  </div>
                  <p className="mt-1 text-sm text-[#7a7069]">Inversión patrimonial</p>
                </div>

                <div className="col-span-2 rounded-[22px] border border-white/10 bg-white/92 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
                    <div>
                      <p className="text-lg font-semibold text-[#1f1a17]">
                        Promociones disponibles
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6c625b]">
                        Consulta contado y facilidades de pago.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 rounded-[22px] border border-white/10 bg-white/92 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d4a62a]" />
                    <div>
                      <p className="text-lg font-semibold text-[#1f1a17]">
                        Atención personalizada
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6c625b]">
                        Seguimiento cercano y acompañamiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* 2. SOBRE EL DESARROLLO */}
      <section className="relative mx-auto max-w-[1850px] overflow-hidden rounded-[40px] bg-gradient-to-br from-[#f3ede5] via-[#f7f3ee] to-[#ece3d7] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#d4a62a]/12 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#cdb38b]/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#e7c978]/10 blur-3xl" />
          <div className="relative mb-10 h-[2px] w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-[#d4a62a]/60 to-transparent" />
        </div>

        <div className="relative grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/85 px-8 py-3 text-2xl font-bold text-[#9c7418] shadow-sm backdrop-blur md:px-10 md:py-4 md:text-3xl lg:text-4xl">
              Sobre el desarrollo
            </span>

            <h2 className="mt-6 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-[#1f1a17] md:text-3xl lg:text-4xl">
              Un proyecto residencial pensado para crecer con orden, seguridad y valor patrimonial
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#2f2824] md:text-xl">
              Fraccionamiento Daniel Andrade Fayad es un desarrollo concebido para
              quienes buscan invertir con visión y construir en un entorno confiable.
              Su ubicación estratégica en Huejutla permite conectar con servicios,
              vialidades y zonas clave, manteniendo al mismo tiempo una atmósfera
              residencial, ordenada y tranquila.
            </p>

            <div className="group relative mt-8 w-full overflow-hidden rounded-[32px] border border-white/50 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            <div className="relative h-[340px] w-full md:h-[460px]">
              <Image
                src="/fraccionamiento/sobre_desarrollo.jpg"
                alt="Vista del desarrollo"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white/92 px-5 py-4 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9c7418]">
                Desarrollo ANRO
              </p>
              <p className="mt-1 text-sm font-bold text-[#1f1a17] md:text-base">
                Patrimonio con visión a futuro
              </p>
            </div>
          </div>

            <p className="mt-6 max-w-[95%] text-lg leading-relaxed text-[#2f2824] md:text-xl">
              Cada lote ha sido planeado para ofrecer funcionalidad, comodidad y
              proyección a futuro, respaldado por infraestructura, acompañamiento
              profesional y una propuesta inmobiliaria enfocada en el crecimiento
              patrimonial de las familias e inversionistas.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                <div className="inline-flex rounded-full bg-[#f5e7bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                  Medidas
                </div>
                <div className="mt-4 text-4xl font-extrabold text-[#c99a1a]">
                  10x20
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">
                  Lotes de 200 m²
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b615b] md:text-base">
                  Espacios ideales para desarrollar una vivienda cómoda, funcional y con excelente proyección.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                <div className="inline-flex rounded-full bg-[#f5e7bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                  Inversión
                </div>
                <div className="mt-4 text-4xl font-extrabold text-[#c99a1a]">
                  +15%
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">
                  Proyección de plusvalía
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b615b] md:text-base">
                  Una oportunidad patrimonial con enfoque de crecimiento y valor a mediano y largo plazo.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                <div className="inline-flex rounded-full bg-[#f5e7bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                  Concepto
                </div>
                <div className="mt-4 text-4xl font-extrabold text-[#c99a1a]">
                  Residencial
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">
                  Entorno familiar
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b615b] md:text-base">
                  Un concepto pensado para brindar tranquilidad, orden y un estilo de vida más seguro.
                </p>
              </div>

              <div className="rounded-[30px] border border-white/60 bg-white/90 p-6 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                <div className="inline-flex rounded-full bg-[#f5e7bf] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#9c7418]">
                  Infraestructura
                </div>
                <div className="mt-4 text-4xl font-extrabold text-[#c99a1a]">
                  Moderno
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#1f1a17]">
                  Infraestructura planeada
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b615b] md:text-base">
                  Servicios e instalaciones proyectadas para ofrecer funcionalidad, imagen urbana y respaldo real.
                </p>
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-[34px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] shadow-[0_24px_60px_rgba(20,15,10,0.18)]">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#d4a62a]/14 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

              <div className="relative p-7 md:p-8 lg:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#e7c978] md:text-sm">
                  Valor agregado
                </p>

                <h3 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight text-white md:text-3xl">
                  Razones para elegir este desarrollo
                </h3>

                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#f1e7db] md:text-base">
                  Un proyecto pensado para ofrecer orden, conectividad, crecimiento urbano
                  y una oportunidad patrimonial sólida para familias e inversionistas.
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a62a]/15 text-[#e7c978]">
                      <span className="text-lg font-bold">01</span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-white">
                      Ubicación estratégica
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#f1e7db]">
                      Cercanía a vialidades, servicios y puntos clave para una vida práctica y una inversión inteligente.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a62a]/15 text-[#e7c978]">
                      <span className="text-lg font-bold">02</span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-white">
                      Entorno funcional
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#f1e7db]">
                      Un espacio residencial pensado para brindar tranquilidad, orden urbano y mejor calidad de vida.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/12">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a62a]/15 text-[#e7c978]">
                      <span className="text-lg font-bold">03</span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-white">
                      Inversión con plusvalía
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#f1e7db]">
                      Una oportunidad patrimonial respaldada por crecimiento, infraestructura y proyección de valor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFICIOS Y SERVICIOS */}
      <section
        id="beneficios-servicios"
        className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12"
      >
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2b2521] via-[#352d28] to-[#433730] shadow-[0_24px_70px_rgba(20,15,10,0.16)]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#d4a62a]/14 blur-3xl" />
            <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-[#d8c3a5]/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-12">
            {/* Lado izquierdo */}
            <div className="lg:col-span-6">
              <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-8 py-3 text-2xl font-bold tracking-[0.08em] text-[#e7c978] shadow-sm backdrop-blur md:px-10 md:py-4 md:text-3xl lg:text-4xl">
                Beneficios y servicios
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Todo lo que necesitas para vivir e invertir con tranquilidad
              </h2>

              <h2 className="mt-5 max-w-3xl text-xl font-extrabold leading-tight text-white md:text-2xl lg:text-3xl">
                Un desarrollo respaldado por hechos, avance visible y atención real
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Agua potable",
                  "Drenaje sanitario",
                  "Energía subterránea",
                  "Caseta de vigilancia",
                  "Acceso controlado",
                  "Circuito cerrado",
                  "Calles pavimentadas",
                  "Alumbrado público",
                  "Drenaje pluvial",
                  "Zona comercial",
                  "Área social",
                ].map((beneficio, index) => (
                  <div
                    key={beneficio}
                    className="group flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a62a]/30 hover:bg-[#4a3d34]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a62a]/15 text-sm font-bold text-[#e7c978] transition-all duration-300 group-hover:bg-[#d4a62a] group-hover:text-black">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <span className="text-sm font-medium text-white md:text-base">
                      {beneficio}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado derecho */}
            <div className="lg:col-span-6">
              <div className="space-y-5">
                {/* Card solo imagen */}
                <div className="overflow-hidden rounded-[30px] border border-white/12 bg-white/8 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
                  <div className="relative h-[280px] w-full md:h-[340px] lg:h-[390px]">
                    <Image
                      src="/fraccionamiento/beneficios.jpg"
                      alt="Infraestructura y beneficios del fraccionamiento"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  </div>
                </div>

                {/* Card abajo */}
                <div className="rounded-[28px] border border-[#dcc7a1]/35 bg-[#f7efe2] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.10)] md:p-7">
                  <div className="inline-flex rounded-full border border-[#d8b36a]/45 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a56a10] shadow-sm backdrop-blur">
                    Infraestructura ANRO
                  </div>

                  <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[#1f1a17] md:text-3xl">
                    Servicios que elevan la calidad de vida y el valor patrimonial
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#5f5650] md:text-base">
                    Cada elemento del desarrollo está planeado para brindar seguridad,
                    orden urbano, funcionalidad y una mejor experiencia residencial.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="rounded-full border border-[#d8b36a]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f2824]">
                      Seguridad
                    </span>
                    <span className="rounded-full border border-[#d8b36a]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f2824]">
                      Infraestructura
                    </span>
                    <span className="rounded-full border border-[#d8b36a]/30 bg-white/80 px-4 py-2 text-sm font-semibold text-[#2f2824]">
                      Valor patrimonial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ETAPAS DEL DESARROLLO */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="relative overflow-hidden rounded-[38px] bg-gradient-to-br from-[#f3ede5] via-[#f8f5ef] to-[#ece2d5] px-6 py-10 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#d4a62a]/15 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#cdb38b]/10 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/80 px-8 py-3 text-2xl font-bold text-[#9c7418] shadow-sm backdrop-blur md:px-10 md:py-4 md:text-3xl lg:text-4xl">
              Etapas del desarrollo
            </span>

            <h2 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight text-[#1f1a17] md:text-4xl lg:text-5xl">
              Conoce el avance y las oportunidades de cada etapa del proyecto
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5650] md:text-lg">
              Cada fase del desarrollo ha sido planeada para ofrecer crecimiento,
              orden urbano y oportunidades patrimoniales en distintos momentos del proyecto.
            </p>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="group overflow-hidden rounded-[32px] border border-black/5 bg-[#fffdf9] shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)]">
                <div className="relative h-[260px] w-full overflow-hidden md:h-[300px]">
                  <Image
                    src="/fraccionamiento/primera_Etapa .jpg"
                    alt="Primera etapa"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#f4e4b8]/95 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-[#9c7418] shadow-sm backdrop-blur">
                    Etapa 01
                  </div>

                  <div className="absolute bottom-5 left-5 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    Entrega inmediata
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="text-2xl font-extrabold text-[#1f1a17] md:text-3xl">
                    Primera etapa
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#5f5650] md:text-lg">
                    Consolidada, con lotes listos para construir, servicios al 100% y
                    plusvalía en aumento. Una opción ideal para quienes buscan certeza,
                    avance real y disponibilidad inmediata.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Servicios al 100%
                    </span>
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Lotes disponibles
                    </span>
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Plusvalía activa
                    </span>
                  </div>

                  <Link
                    href="/desarrollo/etapa-1"
                    className="mt-6 inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#be931f] md:text-base"
                  >
                    Ver más
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>

              <div className="group overflow-hidden rounded-[32px] border border-black/5 bg-[#fffdf9] shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)]">
                <div className="relative h-[260px] w-full overflow-hidden md:h-[300px]">
                  <Image
                    src="/fraccionamiento/segundaEtapa.jpg"
                    alt="Segunda etapa y ampliación"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#f4e4b8]/95 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-[#9c7418] shadow-sm backdrop-blur">
                    Etapa 02
                  </div>

                  <div className="absolute bottom-5 left-5 rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    Nueva oportunidad
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="text-2xl font-extrabold text-[#1f1a17] md:text-3xl">
                    Segunda etapa y ampliación
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#5f5650] md:text-lg">
                    Expansión del desarrollo con nuevos lotes disponibles, vistas
                    privilegiadas y una gran oportunidad de inversión para quienes
                    buscan crecer junto con el proyecto.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Expansión del proyecto
                    </span>
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Nuevos lotes
                    </span>
                    <span className="rounded-full bg-[#eee7df] px-4 py-2 text-sm font-semibold text-[#5a514b]">
                      Inversión estratégica
                    </span>
                  </div>

                  <Link
                    href="/desarrollo/etapa-2"
                    className="mt-6 inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#be931f] md:text-base"
                  >
                    Ver más
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPROMISO Y RESULTADOS */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] px-6 py-10 shadow-[0_30px_80px_rgba(20,15,10,0.18)] md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-[#d4a62a]/14 blur-3xl" />
            <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-[#d8c3a5]/8 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="inline-flex rounded-full border border-[#d4a62a]/40 bg-[#d4a62a]/10 px-8 py-3 text-2xl font-bold text-[#e7c978] shadow-sm backdrop-blur md:px-10 md:py-4 md:text-3xl lg:text-4xl">
                Compromiso y resultados
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
                Un desarrollo respaldado por hechos, avance visible y atención real
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f1e7db] md:text-lg">
                En ANRO trabajamos con responsabilidad, atención personalizada y
                seguimiento constante para brindar confianza en cada etapa del proyecto.
                Nuestro compromiso se refleja en infraestructura visible, avance real
                y una relación cercana con cada cliente.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/avances"
                  className="inline-flex items-center rounded-2xl border border-[#d4a62a]/35 bg-transparent px-6 py-3 text-sm font-bold text-[#e7c978] transition-all duration-300 hover:bg-[#d4a62a] hover:text-black hover:border-[#d4a62a] md:text-base"
                >
                  Ver avances
                </Link>

                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-2xl border border-[#d4a62a]/35 bg-transparent px-6 py-3 text-sm font-bold text-[#e7c978] transition-all duration-300 hover:bg-[#d4a62a] hover:text-black hover:border-[#d4a62a] md:text-base"
                >
                  Agendar cita
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 shadow-sm backdrop-blur">
                  <p className="text-3xl font-extrabold text-white md:text-4xl">100%</p>
                  <p className="mt-2 text-sm font-semibold text-[#f1e7db]">
                    Compromiso en seguimiento
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 shadow-sm backdrop-blur">
                  <p className="text-3xl font-extrabold text-white md:text-4xl">Real</p>
                  <p className="mt-2 text-sm font-semibold text-[#f1e7db]">
                    Avance comprobable
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 shadow-sm backdrop-blur">
                  <p className="text-3xl font-extrabold text-white md:text-4xl">Cercana</p>
                  <p className="mt-2 text-sm font-semibold text-[#f1e7db]">
                    Atención personalizada
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 overflow-hidden rounded-[28px] border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:h-56">
                  <Image src="/fraccionamiento/acceso.jpg" alt="Acceso" fill className="object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                <div className="relative h-48 overflow-hidden rounded-[28px] border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:h-56">
                  <Image src="/fraccionamiento/calles.jpg" alt="Calles" fill className="object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                <div className="relative h-48 overflow-hidden rounded-[28px] border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:h-56">
                  <Image src="/fraccionamiento/obra.jpg" alt="Obra" fill className="object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>

                <div className="relative h-48 overflow-hidden rounded-[28px] border border-white/12 shadow-[0_18px_40px_rgba(0,0,0,0.16)] md:h-56">
                  <Image src="/fraccionamiento/atencion.jpg" alt="Atención" fill className="object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-[#dcc7a1]/45 bg-gradient-to-br from-[#f8f1e4]/92 via-[#fbf6ee]/90 to-[#efe2cc]/88 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-7">
                <div className="inline-flex rounded-full border border-[#d8b36a]/55 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a56a10] shadow-sm backdrop-blur">
                  Respaldo ANRO
                </div>

                <h3 className="mt-4 text-2xl font-extrabold leading-tight text-[#1f1a17] md:text-3xl">
                  Compromiso que se refleja en cada avance del desarrollo
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5f5650] md:text-base">
                  Nuestro trabajo se traduce en infraestructura visible, seguimiento
                  constante y una atención enfocada en brindar confianza real a cada cliente.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#d8b36a]/35 bg-white/65 px-4 py-2 text-sm font-semibold text-[#2f2824] backdrop-blur">
                    Seguimiento constante
                  </span>
                  <span className="rounded-full border border-[#d8b36a]/35 bg-white/65 px-4 py-2 text-sm font-semibold text-[#2f2824] backdrop-blur">
                    Atención cercana
                  </span>
                  <span className="rounded-full border border-[#d8b36a]/35 bg-white/65 px-4 py-2 text-sm font-semibold text-[#2f2824] backdrop-blur">
                    Avance visible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMOCIONES Y PLUSVALÍA */}
      <section className="mx-auto w-full max-w-[1850px] px-4 py-12 md:px-6 md:py-16">
        <div className="overflow-hidden rounded-[32px] border border-black/10 bg-[#fffdf9] shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
              <span className="inline-flex rounded-full border border-[#c99a1a]/35 bg-[#f3e2b1] px-7 py-3 text-xl font-bold uppercase tracking-[0.18em] text-[#8d6a1c] shadow-sm md:px-9 md:py-4 md:text-2xl lg:text-3xl">
                Inversión inteligente
              </span>

              <h2 className="mt-5 max-w-[700px] text-3xl font-semibold leading-tight text-[#1f1a17] md:text-4xl xl:text-[52px]">
                Promociones exclusivas y una plusvalía que impulsa tu patrimonio
              </h2>

              <p className="mt-5 max-w-[680px] text-sm leading-7 text-[#5f5650] md:text-[15px]">
                En ANRO desarrollamos oportunidades que combinan ubicación estratégica,
                beneficios comerciales y visión de crecimiento. Esta etapa está pensada
                para brindarte facilidades de adquisición y un alto potencial de valorización
                a mediano y largo plazo.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Promoción 01
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1a17]">
                    Precios de lanzamiento
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#605853]">
                    Accede a valores preferenciales durante la etapa inicial del desarrollo,
                    obteniendo mejores condiciones de compra y mayor ventaja de inversión.
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Promoción 02
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1a17]">
                    Facilidades de pago
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#605853]">
                    Diseñamos esquemas flexibles para que el proceso de adquisición sea
                    más accesible, ordenado y alineado con tus objetivos.
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Promoción 03
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1a17]">
                    Beneficios por etapa
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#605853]">
                    Aprovecha incentivos especiales según el avance del proyecto y el
                    momento de apartar tu inversión dentro del desarrollo.
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Promoción 04
                  </div>
                  <h3 className="text-lg font-semibold text-[#1f1a17]">
                    Inversión con visión futura
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#605853]">
                    Una oportunidad ideal para quienes buscan resguardar capital en un
                    proyecto con proyección de crecimiento urbano y alta demanda.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative bg-[linear-gradient(180deg,#2b2521_0%,#3a3029_100%)] px-6 py-10 text-white md:px-10 md:py-14 lg:px-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 top-10 h-56 w-56 rounded-full bg-[#d4a62a] blur-3xl" />
                <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-[#b98a1f] blur-3xl" />
              </div>

              <div className="relative z-10">
               <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-7 py-3 text-xl font-bold uppercase tracking-[0.18em] text-[#f3dfb7] shadow-sm backdrop-blur md:px-9 md:py-4 md:text-2xl lg:text-3xl">
                Plusvalía
              </span>

                <h3 className="mt-5 max-w-[500px] text-2xl font-semibold leading-tight md:text-3xl xl:text-[38px]">
                  Un desarrollo diseñado para aumentar su valor con el tiempo
                </h3>

                <p className="mt-5 max-w-[520px] text-sm leading-7 text-white/80 md:text-[15px]">
                  La plusvalía de un proyecto depende de su ubicación, planeación,
                  conectividad y proyección comercial. En ANRO reunimos estos factores
                  para crear espacios con mayor capacidad de crecimiento y retorno.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[22px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                    <h4 className="text-base font-semibold text-white">
                      Ubicación estratégica
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Un punto clave para fortalecer la demanda y el valor del desarrollo
                      en el futuro.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                    <h4 className="text-base font-semibold text-white">
                      Crecimiento sostenido
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      La evolución del entorno y la consolidación del proyecto favorecen
                      la valorización del patrimonio.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                    <h4 className="text-base font-semibold text-white">
                      Mayor proyección patrimonial
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Invertir desde etapas tempranas puede representar una ventaja
                      importante para maximizar el valor de tu inversión.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-[#d4a62a]/25 bg-[#d4a62a]/10 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f1ddb5]">
                    Valor agregado
                  </p>
                  <p className="mt-3 text-lg font-medium leading-8 text-white">
                    Más que adquirir un espacio, inviertes en una oportunidad con visión,
                    respaldo y proyección de crecimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GALERÍA DEL DESARROLLO */}
      <section className="mx-auto max-w-[1850px] px-4 py-10 md:px-6 md:py-12 lg:px-8 lg:py-16">
        <div className="mb-8 md:mb-10 lg:mb-12">
          <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-8 py-3 text-2xl font-bold text-[#a87810] shadow-sm backdrop-blur md:px-10 md:py-4 md:text-3xl lg:text-4xl">
            Galería
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#1f1a17] md:text-4xl lg:text-5xl">
            Galería del desarrollo
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5650] md:text-lg">
            Explora visualmente los espacios, avances y detalles del desarrollo a través
            de una selección de imágenes que reflejan su identidad, infraestructura y proyección.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:col-span-2 lg:col-span-5 lg:row-span-2">
            <div className="relative h-[260px] min-h-[620px] w-full sm:h-[320px] lg:h-full">
              <Image
                src="/fraccionamiento/galeria1.jpg"
                alt="Galería 1"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-[0_12px_30px_rgba(0,0,0,0.06)] lg:col-span-3">
            <div className="relative h-[240px] md:h-[280px]">
              <Image
                src="/fraccionamiento/galeria2.jpg"
                alt="Galería 2"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-[0_12px_30px_rgba(0,0,0,0.06)] lg:col-span-4">
            <div className="relative h-[240px] md:h-[280px]">
              <Image
                src="/fraccionamiento/galeria3.jpg"
                alt="Galería 3"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-[0_12px_30px_rgba(0,0,0,0.06)] lg:col-span-4">
            <div className="relative h-[240px] md:h-[280px]">
              <Image
                src="/fraccionamiento/galeria4.jpg"
                alt="Galería 4"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-[#ece6df] shadow-[0_12px_30px_rgba(0,0,0,0.06)] lg:col-span-3">
            <div className="relative h-[240px] md:h-[280px]">
              <Image
                src="/fraccionamiento/galeria5.jpg"
                alt="Galería 5"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      

      {/* 9. CTA FINAL */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="rounded-[32px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] p-8 text-center text-white shadow-[0_24px_60px_rgba(20,15,10,0.18)] md:p-12 lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Agenda tu cita y conoce más sobre el desarrollo
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://wa.me/5217711974658"
              target="_blank"
              className="inline-flex items-center rounded-2xl bg-green-600 px-6 py-3 text-base font-bold text-white transition hover:bg-green-700"
            >
              WhatsApp
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}