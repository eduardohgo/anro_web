import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Hammer,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const pilares = [
  {
    icon: Target,
    numero: "01",
    titulo: "Visión clara de proyecto",
    descripcion:
      "Iniciamos con diagnóstico técnico, financiero y urbano para tomar decisiones con rumbo, minimizar riesgos y sostener una proyección patrimonial real.",
  },
  {
    icon: Hammer,
    numero: "02",
    titulo: "Trabajo serio en ejecución",
    descripcion:
      "Convertimos planes en resultados con procesos ordenados, supervisión constante y criterios de calidad que cuidan tiempos, presupuesto y funcionalidad.",
  },
  {
    icon: HeartHandshake,
    numero: "03",
    titulo: "Atención cercana y profesional",
    descripcion:
      "Escuchamos cada contexto para orientar con claridad en compra, venta, renta y construcción, manteniendo acompañamiento continuo durante todo el proceso.",
  },
  {
    icon: ShieldCheck,
    numero: "04",
    titulo: "Respaldo integral ANRO",
    descripcion:
      "Articulamos desarrollo inmobiliario, construcción y arrendamiento de maquinaria para dar soluciones completas y mayor certidumbre operativa.",
  },
];

const valores = [
  {
    numero: "01",
    titulo: "Confianza",
    texto:
      "Trabajamos con transparencia, seguimiento y comunicación clara para que cada decisión se tome con seguridad y fundamento.",
  },
  {
    numero: "02",
    titulo: "Compromiso",
    texto:
      "Asumimos cada proyecto como propio, con responsabilidad en la planeación, cumplimiento en la ejecución y constancia en el acompañamiento.",
  },
  {
    numero: "03",
    titulo: "Calidad funcional",
    texto:
      "Priorizamos soluciones que funcionen en la realidad: bien diseñadas, bien construidas y alineadas a los objetivos patrimoniales de cada cliente.",
  },
  {
    numero: "04",
    titulo: "Cercanía",
    texto:
      "Mantenemos una relación directa y humana, entendiendo necesidades reales para construir experiencias más simples, ordenadas y confiables.",
  },
];

const fortalezas = [
  {
    titulo: "Desarrollo inmobiliario estratégico",
    texto:
      "Planeamos y estructuramos proyectos con enfoque de plusvalía, orden urbano y proyección de largo plazo.",
  },
  {
    titulo: "Construcción con control técnico",
    texto:
      "Ejecución supervisada con procesos definidos, criterios de calidad y avances medibles en cada etapa.",
  },
  {
    titulo: "Compra, venta y renta con asesoría",
    texto:
      "Orientación profesional para tomar decisiones patrimoniales claras, rentables y sostenibles.",
  },
  {
    titulo: "Arrendamiento de maquinaria",
    texto:
      "Soporte operativo para obras y desarrollos que requieren continuidad, eficiencia y respuesta oportuna.",
  },
];

export default function NosotrosPage() {
  return (
    <main className="bg-[#f7f4f2]">
      <section className="mx-auto w-full max-w-[1850px] px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28 lg:pt-32">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
          <div className="absolute inset-0">
            <Image
              src="/fraccionamiento/carrusel1.jpg"
              alt="Equipo y filosofía de trabajo ANRO"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,13,0.80)_0%,rgba(18,15,13,0.60)_36%,rgba(18,15,13,0.22)_72%,rgba(18,15,13,0.12)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>

          <div className="relative z-10 grid min-h-[700px] items-end gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:px-12 lg:py-12">
            <div className="lg:col-span-7">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                Nosotros ANRO
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                Una firma que integra visión,
                <span className="block text-[#d4a62a]">ejecución y valor patrimonial</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg lg:text-[20px]">
                En ANRO unimos desarrollo inmobiliario, construcción, compra, venta,
                renta y arrendamiento de maquinaria para ofrecer soluciones sólidas,
                bien estructuradas y alineadas al crecimiento de cada cliente.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center rounded-full bg-[#d4a62a] px-7 py-3.5 text-sm font-bold text-[#1f1a17] transition hover:bg-[#be931f] md:text-base"
                >
                  Hablar con ANRO
                </Link>

                <Link
                  href="/servicios"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 md:text-base"
                >
                  Ver servicios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[28px] border border-white/15 bg-white/12 p-5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0d48a]">
                  Perfil corporativo
                </p>
                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">Desarrollo y construcción</p>
                    <p className="mt-1 text-sm text-white/75">
                      Planeación y ejecución con enfoque integral y estratégico.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">Servicios inmobiliarios</p>
                    <p className="mt-1 text-sm text-white/75">
                      Compra, venta y renta con acompañamiento cercano y profesional.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">Visión patrimonial</p>
                    <p className="mt-1 text-sm text-white/75">
                      Decisiones orientadas a plusvalía, solidez y crecimiento sostenible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[38px] border border-[#d8cfc2] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_55%,#ece2d5_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-8 md:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/85 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#9c7418]">
                Quiénes somos
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f1a17] md:text-4xl lg:text-5xl">
                Sobre ANRO: estructura empresarial para proyectos bien resueltos
              </h2>

              <p className="mt-5 text-base leading-8 text-[#5f5650] md:text-lg">
                Somos una empresa enfocada en transformar oportunidades en proyectos
                concretos. Integramos capacidades de desarrollo inmobiliario,
                construcción y operación para atender necesidades patrimoniales con
                mayor solidez técnica y mejor toma de decisiones.
              </p>

              <p className="mt-4 text-base leading-8 text-[#5f5650] md:text-lg">
                Nuestro modelo de trabajo combina análisis, planeación y ejecución
                responsable. Esto nos permite acompañar a cada cliente con claridad,
                cuidar cada etapa del proceso y mantener una visión empresarial que
                prioriza funcionalidad, rendimiento y crecimiento sostenible.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[24px] border border-black/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9c7418]">
                    Visión clara
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">Decisiones con rumbo</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5650] md:text-base">
                    Evaluamos contexto, viabilidad y proyección para establecer
                    estrategias realistas que reduzcan incertidumbre y fortalezcan el
                    valor del proyecto.
                  </p>
                </div>

                <div className="rounded-[24px] border border-black/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9c7418]">
                    Trabajo serio
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-[#1f1a17]">Ejecución con control</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5f5650] md:text-base">
                    Operamos con procesos definidos, seguimiento permanente y una
                    cultura de cumplimiento que respalda tiempos, calidad y resultados.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative min-h-[640px] overflow-hidden rounded-[32px] border border-black/10 shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
                <Image
                  src="/fraccionamiento/carrusel2.jpg"
                  alt="Identidad y enfoque de trabajo ANRO"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 lg:p-8">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-sm">
                    Esencia ANRO
                  </span>

                  <h3 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
                    Cercanía profesional para construir confianza desde el primer contacto
                  </h3>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">Atención directa</p>
                      <p className="mt-1 text-sm text-white/80">
                        Relación cercana y respuestas claras durante cada etapa.
                      </p>
                    </div>
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">Visión patrimonial</p>
                      <p className="mt-1 text-sm text-white/80">
                        Enfoque de largo plazo para proteger y potenciar la inversión.
                      </p>
                    </div>
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">Acompañamiento real</p>
                      <p className="mt-1 text-sm text-white/80">
                        Seguimiento responsable en planeación, ejecución y operación.
                      </p>
                    </div>
                    <div className="rounded-[18px] border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-white">Base técnica</p>
                      <p className="mt-1 text-sm text-white/80">
                        Criterio profesional para decisiones más seguras y eficientes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[34px] border border-black/10 bg-[#fffdf9] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e2b1] text-[#8d6a1c]">
              <Target className="h-7 w-7" />
            </div>

            <span className="inline-flex rounded-full border border-[#c99a1a]/35 bg-[#f3e2b1] px-5 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#8d6a1c]">
              Misión
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f1a17] md:text-4xl">
              Desarrollar y ejecutar proyectos que generen valor funcional y patrimonial
            </h2>

            <p className="mt-5 text-base leading-8 text-[#5f5650] md:text-lg">
              Nuestra misión es diseñar, estructurar y materializar soluciones
              inmobiliarias y constructivas que respondan a necesidades reales,
              combinando planeación estratégica, calidad técnica y acompañamiento
              cercano para convertir cada proyecto en una inversión sólida.
            </p>

            <div className="mt-6 rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5">
              <p className="text-sm leading-7 text-[#605853] md:text-base">
                Lo logramos integrando desarrollo inmobiliario, construcción y
                servicios complementarios para brindar continuidad operativa,
                certidumbre y resultados medibles a nuestros clientes.
              </p>
            </div>
          </div>

          <div className="rounded-[34px] bg-[linear-gradient(180deg,#2b2521_0%,#3a3029_100%)] p-8 text-white shadow-[0_22px_60px_rgba(20,15,10,0.16)] md:p-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-[#f3dfb7]">
              <Eye className="h-7 w-7" />
            </div>

            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#f3dfb7]">
              Visión
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight md:text-4xl">
              Consolidarnos como referente en desarrollo, construcción e inversión inmobiliaria
            </h2>

            <p className="mt-5 text-base leading-8 text-white/80 md:text-lg">
              Visualizamos a ANRO como una empresa reconocida por su capacidad de
              liderar proyectos de alto impacto con innovación, disciplina
              operativa y responsabilidad social, creando oportunidades de
              crecimiento económico y bienestar para las comunidades donde participa.
            </p>

            <div className="mt-6 rounded-[24px] border border-white/12 bg-white/8 p-5">
              <p className="text-sm leading-7 text-white/75 md:text-base">
                Esta visión se sostiene en una cultura de mejora continua,
                sostenibilidad práctica y decisiones empresariales orientadas a
                construir patrimonio con perspectiva de largo plazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#2b2521,#352d28,#433730)] px-6 py-10 shadow-[0_24px_70px_rgba(20,15,10,0.16)] md:px-10 md:py-12">
          <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-6 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#e7c978]">
            Pilares de trabajo
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            Principios que sostienen cada decisión y cada resultado
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-[#f1e7db] md:text-lg">
            Nuestra esencia se traduce en procesos concretos: visión clara,
            trabajo serio, cercanía profesional y respaldo integral para resolver
            proyectos con mayor equilibrio técnico, operativo y patrimonial.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pilares.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.titulo}
                  className="rounded-[26px] border border-white/12 bg-white/8 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/12"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d4a62a]/15 text-[#e7c978]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d8bf86]">
                    {item.numero}
                  </p>

                  <h3 className="mt-3 text-xl font-bold text-white">{item.titulo}</h3>

                  <p className="mt-3 text-sm leading-7 text-[#f1e7db]">{item.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] border border-[#d8cfc2] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_55%,#ece2d5_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#9c7418]">
                Valores y fortalezas
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f1a17] md:text-4xl lg:text-5xl">
                Cultura corporativa que impulsa relaciones sólidas y proyectos consistentes
              </h2>

              <p className="mt-5 text-base leading-8 text-[#5f5650] md:text-lg">
                En ANRO los valores no son un discurso; son criterios de trabajo
                que orientan cómo atendemos, cómo ejecutamos y cómo defendemos el
                valor de cada proyecto.
              </p>

              <p className="mt-4 text-base leading-8 text-[#5f5650] md:text-lg">
                Esta base nos permite construir confianza real y mantener una
                operación profesional en desarrollo inmobiliario, construcción,
                servicios comerciales y soporte operativo.
              </p>

              <div className="mt-6 rounded-[28px] border border-black/10 bg-white/85 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9c7418]">
                  Fortalezas operativas ANRO
                </p>
                <div className="mt-4 space-y-3">
                  {fortalezas.map((fortaleza) => (
                    <div
                      key={fortaleza.titulo}
                      className="rounded-[16px] border border-[#d8cfc2] bg-[#f8f2e9] px-4 py-3"
                    >
                      <p className="text-base font-semibold text-[#2f2824]">{fortaleza.titulo}</p>
                      <p className="mt-1 text-sm leading-7 text-[#5f5650]">{fortaleza.texto}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                {valores.map((valor) => (
                  <div
                    key={valor.titulo}
                    className="rounded-[24px] border border-black/8 bg-white/90 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      Valor {valor.numero}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1f1a17] md:text-3xl">{valor.titulo}</h3>
                    <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">{valor.texto}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[26px] border border-[#d4a62a]/25 bg-[#f7efe2] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d6a1c]">
                  Compromiso institucional
                </p>
                <p className="mt-3 text-lg font-medium leading-9 text-[#2f2824] md:text-[21px]">
                  Cada proyecto se atiende con estructura, responsabilidad y una
                  visión de largo plazo para que el cliente avance con certeza.
                </p>
                <p className="mt-4 text-[15px] leading-7 text-[#5f5650] md:text-base">
                  Nuestra promesa es mantener claridad en la comunicación, orden en
                  la ejecución y acompañamiento profesional desde el análisis
                  inicial hasta la consolidación final del proyecto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="rounded-[32px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] p-8 text-center text-white shadow-[0_24px_60px_rgba(20,15,10,0.18)] md:p-12 lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Construyamos juntos un proyecto con respaldo profesional y visión patrimonial
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#f1e7db] md:text-lg">
            Si estás buscando desarrollar, construir, comprar, vender, rentar o
            fortalecer tu operación con arrendamiento de maquinaria, en ANRO
            encontrarás una empresa seria, cercana y preparada para acompañarte.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
            >
              Contactar a ANRO
            </Link>

            <Link
              href="/desarrollo"
              className="inline-flex items-center rounded-2xl bg-white/10 px-6 py-3 text-base font-bold text-white transition hover:bg-white/15"
            >
              Conocer desarrollo
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm text-white/85">
              <Sparkles className="h-4 w-4 text-[#d4a62a]" />
              Desarrollo inmobiliario, construcción y atención profesional cercana
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
