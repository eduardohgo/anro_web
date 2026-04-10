import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
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
    titulo: "Visión estratégica",
    descripcion:
      "Planeamos cada proyecto con una perspectiva clara de crecimiento, funcionalidad y proyección patrimonial.",
  },
  {
    icon: Hammer,
    numero: "02",
    titulo: "Ejecución responsable",
    descripcion:
      "Trabajamos con orden, seguimiento y compromiso para que cada etapa avance con seriedad y respaldo.",
  },
  {
    icon: HeartHandshake,
    numero: "03",
    titulo: "Atención cercana",
    descripcion:
      "Creemos en una relación directa y confiable con cada cliente, escuchando sus necesidades desde el inicio.",
  },
  {
    icon: ShieldCheck,
    numero: "04",
    titulo: "Respaldo profesional",
    descripcion:
      "Integramos experiencia, criterio técnico y acompañamiento para brindar seguridad en cada decisión.",
  },
];

const valores = [
  {
    numero: "01",
    titulo: "Confianza",
    texto:
      "Construimos relaciones basadas en claridad, seriedad y seguimiento real.",
  },
  {
    numero: "02",
    titulo: "Compromiso",
    texto:
      "Nos involucramos en cada proyecto con responsabilidad y visión de largo plazo.",
  },
  {
    numero: "03",
    titulo: "Calidad",
    texto:
      "Buscamos resultados sólidos, funcionales y alineados a las necesidades del cliente.",
  },
  {
    numero: "04",
    titulo: "Cercanía",
    texto:
      "Queremos que cada experiencia con ANRO se sienta humana, clara y bien acompañada.",
  },
];

const fortalezas = [
  "Desarrollo inmobiliario con visión patrimonial",
  "Construcción y ejecución con enfoque funcional",
  "Compra, venta y renta con atención cercana",
  "Arrendamiento de maquinaria como respaldo operativo",
];

export default function NosotrosPage() {
  return (
    <main className="bg-[#f7f4f0]">
      {/* HERO */}
      <section className="mx-auto w-full max-w-[1850px] px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28 lg:pt-32">
        <div className="relative overflow-hidden rounded-[38px] border border-black/10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <div className="absolute inset-0">
            <Image
              src="/fraccionamiento/carrusel1.jpg"
              alt="ANRO Grupo Desarrollador y Constructor"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 grid min-h-[720px] items-end gap-10 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-12 lg:px-12 lg:py-12">
            <div className="lg:col-span-7">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                Nosotros ANRO
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
                Conoce la esencia
                <br />
                que impulsa cada proyecto
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg lg:text-[20px]">
                En ANRO desarrollamos, construimos y acompañamos proyectos con
                visión, compromiso y sentido estratégico, buscando que cada
                espacio se convierta en una oportunidad sólida de valor,
                crecimiento y confianza.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center rounded-2xl bg-[#1f1a17] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#120f0d] md:text-base"
                >
                  Hablar con ANRO
                </Link>

                <Link
                  href="/desarrollo"
                  className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#be931f] md:text-base"
                >
                  Conocer desarrollos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[22px] bg-white/95 p-5 shadow-sm">
                    <p className="text-4xl font-extrabold text-[#1f1a17] md:text-5xl">
                      ANRO
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#1f1a17]">
                      Desarrollo y construcción
                    </p>
                    <p className="mt-1 text-sm text-[#7a7069]">
                      Visión integral del proyecto
                    </p>
                  </div>

                  <div className="rounded-[22px] bg-white/95 p-5 shadow-sm">
                    <p className="text-4xl font-extrabold text-[#1f1a17] md:text-5xl">
                      Real
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[#1f1a17]">
                      Compromiso
                    </p>
                    <p className="mt-1 text-sm text-[#7a7069]">
                      Seguimiento cercano y profesional
                    </p>
                  </div>

                  <div className="col-span-2 rounded-[22px] bg-white/95 p-5 shadow-sm">
                    <p className="text-lg font-semibold text-[#1f1a17]">
                      Proyectos con visión
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#6c625b]">
                      Planeamos cada proyecto con criterio estratégico,
                      funcionalidad y una mirada de largo plazo.
                    </p>
                  </div>

                  <div className="col-span-2 rounded-[22px] bg-white/95 p-5 shadow-sm">
                    <p className="text-lg font-semibold text-[#1f1a17]">
                      Atención personalizada
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#6c625b]">
                      Queremos que cada cliente se sienta acompañado con
                      claridad, orden y confianza durante todo el proceso.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* QUIÉNES SOMOS */}
<section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
  <div className="grid gap-6 lg:grid-cols-12">
    <div className="lg:col-span-6">
      <div className="rounded-[34px] border border-[#d8cfc2] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_55%,#ece2d5_100%)] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-9">
        <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-[0.16em] text-[#9c7418]">
          Sobre ANRO
        </span>

        <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#1f1a17] md:text-5xl lg:text-6xl">
          Una empresa enfocada en desarrollar, construir y acompañar con visión estratégica
        </h2>

        <p className="mt-6 text-lg leading-9 text-[#5f5650] md:text-[21px]">
          En ANRO entendemos que cada proyecto requiere mucho más que ejecución:
          requiere análisis, criterio, orden y una visión clara del valor que
          puede construir con el tiempo. Por eso trabajamos cada etapa con una
          perspectiva integral que combina planeación, funcionalidad y
          acompañamiento cercano.
        </p>

        <p className="mt-5 text-lg leading-9 text-[#5f5650] md:text-[21px]">
          Nuestro propósito es que cada cliente encuentre en ANRO una empresa
          capaz de orientar, respaldar y desarrollar proyectos con una base
          sólida, una atención profesional y una proyección real de crecimiento,
          tanto en lo constructivo como en lo patrimonial.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[26px] border border-black/8 bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9c7418]">
              Dirección
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Estrategia y orden
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Cada proyecto se estudia y estructura con visión, orden y propósito.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-[#6a615b] md:text-base">
              <li>• Planeación con sentido funcional y patrimonial.</li>
              <li>• Organización clara de etapas y prioridades.</li>
              <li>• Decisiones orientadas al crecimiento sostenible.</li>
            </ul>
          </div>

          <div className="rounded-[26px] border border-black/8 bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9c7418]">
              Ejecución
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Responsabilidad real
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Cuidamos cada etapa del proceso con seguimiento y compromiso verdadero.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-[#6a615b] md:text-base">
              <li>• Atención al detalle durante la ejecución.</li>
              <li>• Mayor claridad en procesos y resultados.</li>
              <li>• Trabajo serio enfocado en solidez y cumplimiento.</li>
            </ul>
          </div>

          <div className="rounded-[26px] border border-black/8 bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9c7418]">
              Relación
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Atención personalizada
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Escuchamos, orientamos y acompañamos con claridad desde el inicio.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-[#6a615b] md:text-base">
              <li>• Seguimiento cercano en cada etapa.</li>
              <li>• Comunicación clara para tomar mejores decisiones.</li>
              <li>• Trato profesional con enfoque humano.</li>
            </ul>
          </div>

          <div className="rounded-[26px] border border-black/8 bg-white/85 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9c7418]">
              Proyección
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Valor patrimonial
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Buscamos proyectos con potencial real de crecimiento y consolidación.
            </p>
            <ul className="mt-4 space-y-2 text-[15px] leading-7 text-[#6a615b] md:text-base">
              <li>• Enfoque en plusvalía y valor a futuro.</li>
              <li>• Proyectos con base sólida para crecer.</li>
              <li>• Visión de largo plazo en cada decisión.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-[30px] bg-[linear-gradient(135deg,#2c2622,#362e29,#443831)] p-7 text-white shadow-[0_20px_55px_rgba(20,15,10,0.16)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e7c978] md:text-sm">
            Lo que distingue a ANRO
          </p>
          <h3 className="mt-4 text-2xl font-bold md:text-3xl">
            Nuestra esencia está en unir desarrollo, construcción y atención cercana
          </h3>
          <p className="mt-4 text-base leading-8 text-[#f1e7db] md:text-lg">
            Esta combinación nos permite generar proyectos mejor pensados,
            funcionales, bien guiados y con mayor proyección, ofreciendo al
            cliente una experiencia más clara, confiable y respaldada desde el
            primer acercamiento hasta la ejecución final.
          </p>
        </div>
      </div>
    </div>

    <div className="lg:col-span-6">
      <div className="flex flex-col gap-6">
        <div className="relative min-h-[360px] overflow-hidden rounded-[32px] border border-black/8 shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
          <Image
            src="/fraccionamiento/carrusel2.jpg"
            alt="Identidad ANRO"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-sm">
              Identidad ANRO
            </span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Una forma de trabajar basada en orden, visión y cercanía
            </h3>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div className="rounded-[28px] border border-[#d8cfc2] bg-[#f7f1ea] p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f1dfb6] text-[#9c7418]">
              <Building2 className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7647]">
              Enfoque ANRO
            </p>

            <p className="mt-3 text-3xl font-bold text-[#221b18]">
              Visión clara
            </p>

            <p className="mt-4 text-base leading-8 text-[#5f5146] md:text-lg">
              Planeamos cada proyecto con criterio estratégico, funcionalidad y una
              base sólida para crecer.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#6d645d] md:text-base">
              Nuestro enfoque parte de entender bien el proyecto antes de
              ejecutarlo, buscando que cada decisión contribuya a resultados más
              ordenados, útiles y con mejor proyección.
            </p>

            <div className="mt-5 space-y-2">
              <div className="rounded-[16px] border border-[#d8cfc2] bg-white/70 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#4f4640]">
                  Planeación clara desde el inicio.
                </p>
              </div>
              <div className="rounded-[16px] border border-[#d8cfc2] bg-white/70 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#4f4640]">
                  Organización estratégica de cada etapa.
                </p>
              </div>
              <div className="rounded-[16px] border border-[#d8cfc2] bg-white/70 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#4f4640]">
                  Proyectos pensados para crecer con valor real.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#d8cfc2] bg-[linear-gradient(135deg,#2c2622,#362e29,#443831)] p-6 shadow-[0_18px_40px_rgba(20,15,10,0.16)]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#e7c978]">
              <Sparkles className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e7c978]">
              Esencia ANRO
            </p>

            <p className="mt-3 text-3xl font-bold text-white">
              Trabajo serio
            </p>

            <p className="mt-4 text-base leading-8 text-[#f1e7db] md:text-lg">
              Ejecutamos con orden, seguimiento y compromiso profesional en cada etapa.
            </p>

            <p className="mt-4 text-[15px] leading-7 text-[#f1e7db]/85 md:text-base">
              Para ANRO, trabajar con seriedad significa cuidar el proceso,
              mantener claridad en la ejecución y responder con responsabilidad a
              las necesidades reales de cada proyecto.
            </p>

            <div className="mt-5 space-y-2">
              <div className="rounded-[16px] border border-white/10 bg-white/8 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#f5ede3]">
                  Seguimiento constante durante la ejecución.
                </p>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-white/8 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#f5ede3]">
                  Mayor claridad en procesos y resultados.
                </p>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-white/8 px-4 py-3">
                <p className="text-sm font-medium leading-6 text-[#f5ede3]">
                  Compromiso real con calidad, orden y cumplimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* MISIÓN Y VISIÓN */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[34px] border border-black/10 bg-[#fffdf9] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e2b1] text-[#8d6a1c]">
              <Target className="h-7 w-7" />
            </div>

            <span className="inline-flex rounded-full border border-[#c99a1a]/35 bg-[#f3e2b1] px-5 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#8d6a1c]">
              Misión
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f1a17] md:text-4xl">
              Diseñar e ilustrar proyectos que transforman los sueños en realidad
            </h2>

            <p className="mt-5 text-base leading-8 text-[#5f5650] md:text-lg">
              Diseñar e ilustrar proyectos que transforman los sueños a realidad,
              creando espacios funcionales, innovadores y sostenibles que
              respondan a las necesidades de los usuarios finales.
            </p>

            <div className="mt-8 rounded-[24px] border border-black/8 bg-[#f7f1ea] p-5">
              <p className="text-sm leading-7 text-[#605853]">
                Esta misión refleja nuestro compromiso por convertir ideas en
                proyectos concretos, útiles y con verdadero valor para quienes
                los habitan, utilizan o desarrollan.
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
              Ser una empresa destacada por su liderazgo, innovación e impacto
            </h2>

            <p className="mt-5 text-base leading-8 text-white/80 md:text-lg">
              Ser una empresa a nivel mundial destacando como líder en el
              desarrollo, construcción e inmobiliaria de proyectos de alto
              impacto, llevando a un punto innovador económico, social y amigable
              con el medio ambiente para ser autosustentable.
            </p>

            <div className="mt-8 rounded-[24px] border border-white/12 bg-white/8 p-5">
              <p className="text-sm leading-7 text-white/75">
                Nuestra visión proyecta el crecimiento de ANRO como una empresa
                sólida, innovadora y comprometida con generar valor económico,
                social y ambiental en cada proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#2b2521,#352d28,#433730)] px-6 py-10 shadow-[0_24px_70px_rgba(20,15,10,0.16)] md:px-10 md:py-12">
          <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-[#d4a62a]/10 px-6 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#e7c978]">
            Nuestros pilares
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            Principios que fortalecen nuestra manera de trabajar
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-[#f1e7db] md:text-lg">
            Estos pilares reflejan la forma en que entendemos cada proyecto:
            con visión, estructura, cercanía y una responsabilidad real por el resultado.
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

                  <h3 className="mt-3 text-xl font-bold text-white">
                    {item.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#f1e7db]">
                    {item.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALORES Y FORTALEZAS */}
<section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10">
  <div className="rounded-[36px] border border-[#d8cfc2] bg-[linear-gradient(135deg,#f3ede5_0%,#f8f5ef_55%,#ece2d5_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:px-8 md:py-10">
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <span className="inline-flex rounded-full border border-[#d4a62a]/60 bg-white/80 px-6 py-2 text-sm font-bold uppercase tracking-[0.14em] text-[#9c7418]">
          Valores y fortalezas
        </span>

        <h2 className="mt-5 text-4xl font-extrabold leading-tight text-[#1f1a17] md:text-5xl lg:text-6xl">
          Lo que sostiene cada relación y cada proyecto
        </h2>

        <p className="mt-5 text-lg leading-9 text-[#5f5650] md:text-[21px]">
          Los valores de ANRO nos permiten trabajar con mayor claridad,
          responsabilidad y una relación más sólida con cada cliente.
        </p>

        <p className="mt-4 text-lg leading-9 text-[#5f5650] md:text-[21px]">
          No se trata solo de construir o desarrollar, sino de hacerlo con una
          base ética, una atención seria y una visión profesional que fortalezca
          la confianza en cada etapa del proceso.
        </p>

        <div className="mt-6 relative overflow-hidden rounded-[30px] border border-black/8 shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
          <div className="relative min-h-[320px] md:min-h-[420px]">
            <Image
              src="/fraccionamiento/carrusel4.jpg"
              alt="Valores y fortalezas ANRO"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-sm">
                Valores ANRO
              </span>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
                Confianza, compromiso y visión profesional
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] border border-black/8 bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              Valor 01
            </div>
            <h3 className="text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Confianza
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Construimos relaciones basadas en claridad, seriedad y seguimiento real.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6a615b] md:text-base">
              La confianza es fundamental para que cada cliente se sienta
              respaldado, informado y seguro en las decisiones que toma junto a nosotros.
            </p>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              Valor 02
            </div>
            <h3 className="text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Compromiso
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Nos involucramos en cada proyecto con responsabilidad y visión de largo plazo.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6a615b] md:text-base">
              Para ANRO, comprometerse significa trabajar con constancia,
              responder con seriedad y mantener el enfoque en resultados sólidos.
            </p>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              Valor 03
            </div>
            <h3 className="text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Calidad
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Buscamos resultados sólidos, funcionales y alineados a las necesidades del cliente.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6a615b] md:text-base">
              La calidad en ANRO se refleja en la forma de planear, ejecutar y
              cuidar que cada proyecto tenga sentido práctico y valor real.
            </p>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-white/85 p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 inline-flex rounded-full bg-[#1f1a17] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              Valor 04
            </div>
            <h3 className="text-2xl font-bold text-[#1f1a17] md:text-3xl">
              Cercanía
            </h3>
            <p className="mt-3 text-base leading-8 text-[#605853] md:text-lg">
              Queremos que cada experiencia con ANRO se sienta humana, clara y bien acompañada.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#6a615b] md:text-base">
              La cercanía fortalece la relación con cada cliente y ayuda a que
              la comunicación sea más clara, útil y confiable.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-[#d4a62a]/25 bg-[#d4a62a]/10 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d6a1c]">
            Fortalezas de ANRO
          </p>

          <div className="mt-4 grid gap-3">
            <div className="rounded-[18px] border border-[#d4a62a]/15 bg-white/55 px-5 py-4">
              <p className="text-base font-medium leading-8 text-[#2f2824] md:text-lg">
                Desarrollo inmobiliario con visión patrimonial
              </p>
            </div>

            <div className="rounded-[18px] border border-[#d4a62a]/15 bg-white/55 px-5 py-4">
              <p className="text-base font-medium leading-8 text-[#2f2824] md:text-lg">
                Construcción y ejecución con enfoque funcional
              </p>
            </div>

            <div className="rounded-[18px] border border-[#d4a62a]/15 bg-white/55 px-5 py-4">
              <p className="text-base font-medium leading-8 text-[#2f2824] md:text-lg">
                Compra, venta y renta con atención cercana
              </p>
            </div>

            <div className="rounded-[18px] border border-[#d4a62a]/15 bg-white/55 px-5 py-4">
              <p className="text-base font-medium leading-8 text-[#2f2824] md:text-lg">
                Arrendamiento de maquinaria como respaldo operativo
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[26px] border border-[#d4a62a]/25 bg-[#f7efe2] p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8d6a1c]">
            Compromiso institucional
          </p>
          <p className="mt-3 text-lg font-medium leading-9 text-[#2f2824] md:text-[21px]">
            Queremos que cada interacción con ANRO transmita seguridad,
            profesionalismo y una visión clara del valor que puede construir un
            proyecto bien desarrollado.
          </p>
          <p className="mt-4 text-[15px] leading-7 text-[#5f5650] md:text-base">
            Este compromiso se refleja en la manera en que atendemos, orientamos
            y desarrollamos cada proyecto, buscando siempre generar confianza y
            una experiencia mejor acompañada.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
        <div className="rounded-[32px] bg-gradient-to-br from-[#2c2622] via-[#362e29] to-[#443831] p-8 text-center text-white shadow-[0_24px_60px_rgba(20,15,10,0.18)] md:p-12 lg:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Queremos seguir construyendo proyectos con visión y confianza
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#f1e7db] md:text-lg">
            Si quieres conocer más sobre ANRO, nuestros desarrollos, servicios o
            la forma en que trabajamos, estaremos listos para atenderte y
            acompañarte con claridad y respaldo profesional.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-2xl bg-[#d4a62a] px-6 py-3 text-base font-bold text-black transition hover:bg-[#be931f]"
            >
              Contactar a ANRO
            </Link>

            <Link
              href="/servicios"
              className="inline-flex items-center rounded-2xl bg-white/10 px-6 py-3 text-base font-bold text-white transition hover:bg-white/15"
            >
              Ver servicios
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm text-white/85">
              <Sparkles className="h-4 w-4 text-[#d4a62a]" />
              Desarrollo, construcción y visión de futuro
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}