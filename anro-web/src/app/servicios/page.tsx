import Image from "next/image";
import Link from "next/link";

export default function ServiciosPage() {
  return (
    <main className="bg-[#f7f4f2]">



      {/* 1. HERO INTERNO DE SERVICIOS */}
      <section className="mx-auto w-full max-w-[1850px] px-4 pb-8 pt-24 md:px-6 md:pb-10 md:pt-28 lg:pt-32">
        <div className="relative overflow-hidden rounded-[36px] border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
          {/* Imagen de fondo */}
          <div className="relative min-h-[620px] w-full md:min-h-[700px] lg:min-h-[760px]">
            <Image
              src="/fraccionamiento/carrusel4.jpg"
              alt="Servicios ANRO"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Overlay principal */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,15,13,0.78)_0%,rgba(18,15,13,0.58)_38%,rgba(18,15,13,0.18)_68%,rgba(18,15,13,0.10)_100%)]" />

            {/* Capa suave de color */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

            {/* Contenido principal */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-6 md:px-10 lg:px-14">
                <div className="max-w-[760px]">
                  <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] backdrop-blur-md md:px-8 md:py-4 md:text-base">
                    Servicios ANRO
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-7xl">
                    Soluciones integrales para
                    <span className="block text-[#d4a62a]">
                      desarrollar, construir y crecer
                    </span>
                  </h1>

                  <p className="mt-6 max-w-[620px] text-base leading-relaxed text-white/85 md:text-lg lg:text-[20px]">
                    En ANRO desarrollamos proyectos con visión, solidez y
                    atención al detalle, ofreciendo servicios inmobiliarios y de
                    construcción que generan confianza, valor y proyección.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center justify-center rounded-full bg-[#d4a62a] px-7 py-3.5 text-sm font-bold text-[#1f1a17] transition hover:bg-[#be931f] md:text-base"
                    >
                      Solicitar información
                    </Link>

                    <Link
                      href="/desarrollo"
                      className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 md:text-base"
                    >
                      Conocer desarrollos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta flotante */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-auto md:right-8 md:w-[380px]">
              <div className="rounded-[28px] border border-white/15 bg-white/12 p-5 backdrop-blur-xl md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f0d48a]">
                  Respaldo ANRO
                </p>

                <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                  Planeación, ejecución y acompañamiento profesional
                </h3>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      Desarrollo inmobiliario
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      Proyectos pensados para generar valor y crecimiento.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      Construcción y supervisión
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      Ejecución responsable con enfoque en calidad y cumplimiento.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      Atención personalizada
                    </p>
                    <p className="mt-1 text-sm text-white/75">
                      Soluciones adaptadas a cada cliente y cada proyecto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* 2. NUESTROS SERVICIOS DETALLADOS */}
        <section className="mx-auto w-full max-w-[1850px] px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="rounded-[38px] border border-black/10 bg-[#fffdf9] px-6 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:px-10 md:py-14 lg:px-14 lg:py-16">
            {/* Encabezado */}
            <div className="mx-auto max-w-[1000px] text-center">
              <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#a87911] shadow-sm">
                Nuestros servicios
              </span>

              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-[#1f1a17] md:text-5xl lg:text-6xl">
                Cuatro áreas de servicio que impulsan cada etapa de tu proyecto
              </h2>

              <p className="mx-auto mt-5 max-w-[860px] text-base leading-8 text-[#665d57] md:text-lg lg:text-[19px]">
                En ANRO concentramos nuestra experiencia en cuatro líneas principales
                de servicio: desarrollo inmobiliario, compra, venta y renta,
                arrendamiento de maquinaria y construcción de obras. Cada una responde
                a necesidades específicas del sector, integrando visión, respaldo
                profesional, capacidad operativa y compromiso con resultados sólidos.
              </p>
            </div>

            <div className="mt-14 space-y-10 lg:space-y-12">
              {/* Servicio 1 */}
              <article className="overflow-hidden rounded-[34px] border border-black/10 bg-[#f8f4ee] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
                <div className="grid items-stretch lg:grid-cols-2">
                  <div className="relative min-h-[320px] md:min-h-[430px]">
                    <Image
                      src="/fraccionamiento/carrusel1.jpg"
                      alt="Desarrollo inmobiliario"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#1f1a17]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Servicio 01
                    </div>
                  </div>

                  <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a87911]">
                      Planeación estratégica, proyección y plusvalía
                    </p>

                    <h3 className="mt-3 text-3xl font-bold leading-tight text-[#1f1a17] md:text-4xl">
                      Desarrollo inmobiliario
                    </h3>

                    <p className="mt-4 text-lg font-medium leading-7 text-[#3e372f]">
                      Diseñamos desarrollos con visión de crecimiento, orden y valor a
                      futuro.
                    </p>

                    <p className="mt-5 text-base leading-8 text-[#675f59] md:text-lg">
                      En ANRO concebimos el desarrollo inmobiliario como una etapa clave
                      para transformar un espacio en una oportunidad real de inversión y
                      crecimiento. Nuestro enfoque considera la organización del
                      proyecto, su proyección comercial, su funcionalidad y el valor que
                      puede generar con el tiempo.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Qué hacemos
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Planeación de desarrollos inmobiliarios.</li>
                          <li>Organización estratégica del espacio y terreno.</li>
                          <li>Proyección de crecimiento y valor patrimonial.</li>
                          <li>Enfoque en desarrollos funcionales y atractivos.</li>
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Beneficios
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Mayor orden desde la base del proyecto.</li>
                          <li>Mejor proyección de plusvalía a futuro.</li>
                          <li>Desarrollos con visión patrimonial.</li>
                          <li>Planeación más clara y bien orientada.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#d4a62a]/20 bg-[#fffaf0] px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                        Ideal para
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#5f5650]">
                        Clientes e inversionistas que buscan desarrollar terrenos o
                        espacios con una visión sólida de crecimiento, orden y valor
                        patrimonial.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Servicio 2 */}
              <article className="overflow-hidden rounded-[34px] border border-black/10 bg-[#f8f4ee] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
                <div className="grid items-stretch lg:grid-cols-2">
                  <div className="order-2 flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:order-1 lg:px-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a87911]">
                      Asesoría inmobiliaria con cercanía y claridad
                    </p>

                    <h3 className="mt-3 text-3xl font-bold leading-tight text-[#1f1a17] md:text-4xl">
                      Compra, venta y renta
                    </h3>

                    <p className="mt-4 text-lg font-medium leading-7 text-[#3e372f]">
                      Acompañamos decisiones importantes con atención clara y respaldo
                      profesional.
                    </p>

                    <p className="mt-5 text-base leading-8 text-[#675f59] md:text-lg">
                      Brindamos acompañamiento en operaciones de compra, venta y renta
                      de inmuebles, ofreciendo orientación cercana y seguimiento durante
                      el proceso. Nuestro objetivo es que cada cliente pueda avanzar con
                      mayor confianza, entendiendo mejor cada etapa y sintiéndose
                      respaldado en una decisión importante.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Qué hacemos
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Asesoría para compra de propiedades.</li>
                          <li>Acompañamiento en procesos de venta.</li>
                          <li>Orientación para renta de inmuebles.</li>
                          <li>Seguimiento personalizado durante la operación.</li>
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Beneficios
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Mayor claridad en el proceso inmobiliario.</li>
                          <li>Atención más cercana y confiable.</li>
                          <li>Mejor orientación para tomar decisiones.</li>
                          <li>Operaciones más ordenadas y comprensibles.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#d4a62a]/20 bg-[#fffaf0] px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                        Ideal para
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#5f5650]">
                        Personas o empresas que buscan comprar, vender o rentar con
                        mayor seguridad, respaldo y acompañamiento profesional.
                      </p>
                    </div>
                  </div>

                  <div className="relative order-1 min-h-[320px] md:min-h-[430px] lg:order-2">
                    <Image
                      src="/fraccionamiento/carrusel2.jpg"
                      alt="Compra, venta y renta"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#1f1a17]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Servicio 02
                    </div>
                  </div>
                </div>
              </article>

              {/* Servicio 3 */}
              <article className="overflow-hidden rounded-[34px] border border-black/10 bg-[#f8f4ee] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
                <div className="grid items-stretch lg:grid-cols-2">
                  <div className="relative min-h-[320px] md:min-h-[430px]">
                    <Image
                      src="/fraccionamiento/carrusel3.jpg"
                      alt="Arrendamiento de maquinaria"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#1f1a17]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Servicio 03
                    </div>
                  </div>

                  <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a87911]">
                      Capacidad operativa para obra, campo y ejecución
                    </p>

                    <h3 className="mt-3 text-3xl font-bold leading-tight text-[#1f1a17] md:text-4xl">
                      Arrendamiento de maquinaria
                    </h3>

                    <p className="mt-4 text-lg font-medium leading-7 text-[#3e372f]">
                      Fortalecemos los proyectos con respaldo operativo y apoyo en
                      campo.
                    </p>

                    <p className="mt-5 text-base leading-8 text-[#675f59] md:text-lg">
                      Ofrecemos arrendamiento de maquinaria para respaldar distintas
                      etapas de obra y trabajo en campo. Este servicio aporta capacidad
                      operativa, eficiencia y soporte práctico en procesos que requieren
                      movimiento de tierra, fuerza de trabajo especializada o recursos
                      adicionales para avanzar de forma más ordenada.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Qué hacemos
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Apoyo con maquinaria para obra y campo.</li>
                          <li>Respaldo en movimiento de tierra.</li>
                          <li>Soporte para procesos de ejecución operativa.</li>
                          <li>Capacidad adicional para trabajos en sitio.</li>
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Beneficios
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Mayor eficiencia en tareas operativas.</li>
                          <li>Mejor capacidad de respuesta en campo.</li>
                          <li>Apoyo práctico en procesos de obra.</li>
                          <li>Fortalecimiento de proyectos en ejecución.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#d4a62a]/20 bg-[#fffaf0] px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                        Ideal para
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#5f5650]">
                        Proyectos que requieren maquinaria y soporte operativo para
                        ejecutar trabajos en campo con mayor capacidad y eficiencia.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Servicio 4 */}
              <article className="overflow-hidden rounded-[34px] border border-black/10 bg-[#f8f4ee] shadow-[0_18px_45px_rgba(0,0,0,0.05)]">
                <div className="grid items-stretch lg:grid-cols-2">
                  <div className="order-2 flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:order-1 lg:px-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a87911]">
                      Calidad constructiva, funcionalidad y cumplimiento
                    </p>

                    <h3 className="mt-3 text-3xl font-bold leading-tight text-[#1f1a17] md:text-4xl">
                      Construcción de obras
                    </h3>

                    <p className="mt-4 text-lg font-medium leading-7 text-[#3e372f]">
                      Ejecutamos obras con responsabilidad, orden y atención al detalle.
                    </p>

                    <p className="mt-5 text-base leading-8 text-[#675f59] md:text-lg">
                      Desarrollamos obras con un enfoque centrado en la calidad, la
                      funcionalidad y el cumplimiento. En ANRO entendemos la
                      construcción como una etapa decisiva, por eso trabajamos cuidando
                      cada fase del proceso para lograr resultados sólidos, bien
                      respaldados y alineados a las necesidades reales del proyecto.
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Qué hacemos
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Ejecución de obras públicas y privadas.</li>
                          <li>Seguimiento de procesos constructivos.</li>
                          <li>Atención a funcionalidad y calidad de obra.</li>
                          <li>Desarrollo responsable de cada etapa del proyecto.</li>
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1f1a17]">
                          Beneficios
                        </p>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#645b55]">
                          <li>Mayor confianza durante la ejecución.</li>
                          <li>Resultados más sólidos y funcionales.</li>
                          <li>Compromiso con calidad y cumplimiento.</li>
                          <li>Atención seria al detalle constructivo.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 rounded-[24px] border border-[#d4a62a]/20 bg-[#fffaf0] px-5 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
                        Ideal para
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[#5f5650]">
                        Clientes que buscan desarrollar obras con respaldo profesional,
                        enfoque funcional y compromiso con la calidad del resultado
                        final.
                      </p>
                    </div>
                  </div>

                  <div className="relative order-1 min-h-[320px] md:min-h-[430px] lg:order-2">
                    <Image
                      src="/fraccionamiento/carrusel4.jpg"
                      alt="Construcción de obras"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-5 top-5 inline-flex rounded-full bg-[#1f1a17]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                      Servicio 04
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

                      {/* 3. CÓMO TRABAJAMOS */}
          <section className="mx-auto w-full max-w-[1850px] px-4 py-12 md:px-6 md:py-16 lg:py-20">
            <div className="overflow-hidden rounded-[38px] border border-black/10 bg-[#1f1a17] shadow-[0_24px_70px_rgba(0,0,0,0.10)]">
              <div className="grid gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-16">
                {/* Lado izquierdo */}
                <div className="lg:col-span-5">
                  <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-md">
                    Cómo trabajamos
                  </span>

                  <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                    Un proceso claro para desarrollar cada proyecto con orden y visión
                  </h2>

                  <p className="mt-6 max-w-[620px] text-base leading-8 text-white/75 md:text-lg">
                    En ANRO entendemos que cada proyecto requiere atención, seguimiento y
                    decisiones bien estructuradas. Por eso trabajamos bajo un proceso que
                    nos permite analizar, planear, ejecutar y acompañar cada etapa con
                    compromiso profesional.
                  </p>

                  <div className="mt-8 rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0d48a]">
                      Nuestro enfoque
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/80 md:text-base">
                      Más que ofrecer un servicio, buscamos construir confianza desde el
                      primer acercamiento hasta la ejecución final, cuidando cada detalle
                      del proceso para lograr resultados sólidos, funcionales y bien
                      respaldados.
                    </p>
                  </div>
                </div>

                {/* Lado derecho */}
                <div className="lg:col-span-7">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Paso 1 */}
                    <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                        01
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">
                        Escuchamos y analizamos
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
                        Conocemos las necesidades, objetivos y contexto del proyecto para
                        entender con claridad qué se busca lograr y cuál es el mejor punto
                        de partida.
                      </p>
                    </article>

                    {/* Paso 2 */}
                    <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                        02
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">
                        Planeamos con visión
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
                        Estructuramos cada etapa considerando funcionalidad, viabilidad,
                        orden y proyección, buscando que el proyecto tenga una base sólida
                        desde su planeación.
                      </p>
                    </article>

                    {/* Paso 3 */}
                    <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                        03
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">
                        Ejecutamos con compromiso
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
                        Llevamos a cabo los procesos con responsabilidad, atención al
                        detalle y enfoque en resultados, cuidando que cada fase avance con
                        orden y respaldo profesional.
                      </p>
                    </article>

                    {/* Paso 4 */}
                    <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                        04
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">
                        Damos seguimiento cercano
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
                        Mantenemos acompañamiento durante el desarrollo del servicio para
                        dar mayor claridad, confianza y continuidad en la toma de
                        decisiones.
                      </p>
                    </article>

                    {/* Paso 5 */}
                    <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:col-span-2 md:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
                        05
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">
                        Entregamos resultados con valor
                      </h3>
                      <p className="mt-3 max-w-[900px] text-sm leading-7 text-white/75 md:text-base">
                        Nuestro objetivo final es que cada proyecto o servicio deje un
                        resultado funcional, sólido y bien orientado, aportando valor real
                        al cliente y fortaleciendo su confianza en cada etapa del proceso.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>

         {/* 4. ESPECIALIDADES / SERVICIOS DESTACADOS */}
<section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
  <div className="rounded-[38px] border border-black/10 bg-[#fffdf9] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:px-8 md:py-8 lg:px-10 lg:py-10">
    <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Columna izquierda: encabezado + tarjeta principal */}
      <div className="lg:col-span-5">
        <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#a87911] shadow-sm md:text-sm">
          Especialidades ANRO
        </span>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1f1a17] md:text-5xl lg:text-[52px]">
          Áreas donde ANRO aporta mayor valor
        </h2>

        <p className="mt-4 max-w-[560px] text-base leading-7 text-[#665d57] md:text-lg">
          Nuestro trabajo integra planeación, construcción, respaldo operativo
          y acompañamiento inmobiliario para fortalecer proyectos con una visión
          más clara, funcional y orientada a resultados sólidos.
        </p>

        <article className="relative mt-6 overflow-hidden rounded-[32px] border border-black/10 bg-[#1f1a17] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:p-7">
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#d4a62a]/15 blur-3xl" />

          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a]">
            Especialidad principal
          </span>

          <h3 className="mt-5 max-w-[520px] text-3xl font-bold leading-tight text-white md:text-4xl">
            Desarrollo de proyectos con visión patrimonial y de crecimiento
          </h3>

          <p className="mt-4 text-base leading-7 text-white/75 md:text-lg">
            En ANRO damos especial importancia a los proyectos que requieren
            planeación sólida, organización estratégica y proyección de valor,
            buscando que cada desarrollo tenga sentido funcional, comercial y
            patrimonial desde su origen.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
              <p className="text-sm font-semibold text-white">Planeación clara</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Estructuración ordenada desde las primeras etapas del proyecto.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
              <p className="text-sm font-semibold text-white">
                Visión de plusvalía
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Enfoque en valor real, crecimiento y proyección a futuro.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f0d48a]">
              Lo que distingue esta especialidad
            </p>
            <p className="mt-2 text-sm leading-7 text-white/75">
              Combinamos análisis, orden y visión patrimonial para desarrollar
              proyectos con mejor estructura, mayor sentido estratégico y una
              base más sólida para crecer.
            </p>
          </div>
        </article>
      </div>

      {/* Columna derecha: tarjetas compactas */}
      <div className="grid h-full gap-4 lg:col-span-7 lg:auto-rows-fr">
        <article className="h-full rounded-[28px] border border-black/10 bg-[#f8f4ee] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
              01
            </div>

            <div className="flex h-full flex-1 flex-col">
              <h3 className="text-2xl font-bold text-[#1f1a17]">
                Ejecución de obra con enfoque funcional
              </h3>
              <p className="mt-3 text-base leading-7 text-[#675f59]">
                Desarrollamos obras con atención a la calidad constructiva, la
                funcionalidad del resultado y el cumplimiento responsable en
                cada etapa del proceso.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">
                    Fortaleza
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Orden y seguimiento durante la ejecución.
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">Valor</p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Resultados más sólidos y funcionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="h-full rounded-[28px] border border-black/10 bg-[#f8f4ee] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1f1a17] text-lg font-bold text-white">
              02
            </div>

            <div className="flex h-full flex-1 flex-col">
              <h3 className="text-2xl font-bold text-[#1f1a17]">
                Respaldo operativo en campo
              </h3>
              <p className="mt-3 text-base leading-7 text-[#675f59]">
                Aportamos capacidad de respuesta para proyectos que requieren
                apoyo operativo, maquinaria y recursos para avanzar con mayor
                eficiencia.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">
                    Fortaleza
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Apoyo práctico para obra y trabajo en sitio.
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">Valor</p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Mayor capacidad operativa y mejor respuesta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="h-full rounded-[28px] border border-black/10 bg-[#f8f4ee] p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
              03
            </div>

            <div className="flex h-full flex-1 flex-col">
              <h3 className="text-2xl font-bold text-[#1f1a17]">
                Atención cercana en operaciones inmobiliarias
              </h3>
              <p className="mt-3 text-base leading-7 text-[#675f59]">
                Acompañamos procesos de compra, venta y renta con claridad,
                seguimiento y una atención orientada a generar confianza.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">
                    Fortaleza
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Trato cercano y seguimiento profesional.
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-[#1f1a17]">Valor</p>
                  <p className="mt-1 text-sm leading-6 text-[#675f59]">
                    Mayor claridad y confianza para decidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

{/* 5. RESPALDO VISUAL / PROYECTOS REALES */}
<section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
  <div className="overflow-hidden rounded-[38px] border border-black/10 bg-[#fffdf9] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] md:px-8 md:py-8 lg:px-10 lg:py-10">
    {/* Encabezado */}
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <span className="inline-flex rounded-full border border-[#d8b766]/40 bg-[#f8f1df] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#a87911] shadow-sm md:text-sm">
          Respaldo visual
        </span>

        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#1f1a17] md:text-5xl lg:text-[54px]">
          Proyectos, espacios y procesos que respaldan nuestro trabajo
        </h2>
      </div>

      <div className="lg:col-span-5">
        <p className="text-base leading-7 text-[#665d57] md:text-lg">
          En ANRO creemos que cada proyecto también debe hablar por sí mismo.
          Estas imágenes reflejan parte del trabajo, la ejecución y el entorno
          real en el que desarrollamos nuestras soluciones.
        </p>
      </div>
    </div>

    {/* Galería */}
    <div className="mt-8 grid gap-4 lg:grid-cols-12">
      {/* Imagen principal */}
      <article className="group relative overflow-hidden rounded-[30px] lg:col-span-7 lg:row-span-2">
        <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-full">
          <Image
            src="/fraccionamiento/carrusel1.jpg"
            alt="Vista general de desarrollo inmobiliario ANRO"
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-sm">
              Desarrollo inmobiliario
            </span>

            <h3 className="mt-4 max-w-[620px] text-2xl font-bold leading-tight text-white md:text-4xl">
              Espacios proyectados con orden, visión y potencial de crecimiento
            </h3>

            <p className="mt-3 max-w-[620px] text-sm leading-7 text-white/80 md:text-base">
              Proyectos concebidos con una estructura clara, una mejor
              proyección de valor y una visión orientada al desarrollo.
            </p>
          </div>
        </div>
      </article>

      {/* Tarjeta 1 */}
      <article className="group relative overflow-hidden rounded-[28px] lg:col-span-5">
        <div className="relative min-h-[220px] md:min-h-[250px]">
          <Image
            src="/fraccionamiento/carrusel2.jpg"
            alt="Acceso principal y entorno de proyecto inmobiliario"
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              Atención inmobiliaria cercana
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Procesos respaldados con seguimiento y orientación profesional.
            </p>
          </div>
        </div>
      </article>

      {/* Tarjeta 2 */}
      <article className="group relative overflow-hidden rounded-[28px] lg:col-span-3">
        <div className="relative min-h-[220px] md:min-h-[250px]">
          <Image
            src="/fraccionamiento/carrusel3.jpg"
            alt="Maquinaria y apoyo operativo en campo"
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
              Respaldo operativo
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Maquinaria y apoyo para ejecución en campo.
            </p>
          </div>
        </div>
      </article>

      {/* Tarjeta 3 */}
      <article className="group relative overflow-hidden rounded-[28px] lg:col-span-2">
        <div className="relative min-h-[220px] md:min-h-[250px]">
          <Image
            src="/fraccionamiento/carrusel4.jpg"
            alt="Construcción y desarrollo de obra"
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
            <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
              Ejecución de obra
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Procesos constructivos con enfoque funcional.
            </p>
          </div>
        </div>
      </article>
    </div>

    {/* Franja inferior */}
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <div className="rounded-[24px] border border-black/10 bg-[#f8f4ee] px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
          Evidencia real
        </p>
        <p className="mt-2 text-sm leading-7 text-[#665d57]">
          Mostramos entornos, procesos y espacios que reflejan el trabajo real
          detrás de cada servicio.
        </p>
      </div>

      <div className="rounded-[24px] border border-black/10 bg-[#f8f4ee] px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
          Trabajo en campo
        </p>
        <p className="mt-2 text-sm leading-7 text-[#665d57]">
          Desde el desarrollo inmobiliario hasta la operación y construcción,
          cada etapa cuenta con respaldo visual.
        </p>
      </div>

      <div className="rounded-[24px] border border-black/10 bg-[#f8f4ee] px-5 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#a87911]">
          Confianza y presencia
        </p>
        <p className="mt-2 text-sm leading-7 text-[#665d57]">
          Esta sección ayuda a transmitir experiencia, actividad y capacidad de
          ejecución de una forma más tangible.
        </p>
      </div>
    </div>
  </div>
</section>

{/* 6. BENEFICIOS DE TRABAJAR CON ANRO */}
<section className="mx-auto w-full max-w-[1850px] px-4 py-8 md:px-6 md:py-10 lg:py-12">
  <div className="overflow-hidden rounded-[38px] border border-black/10 bg-[#1f1a17] px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.10)] md:px-8 md:py-8 lg:px-10 lg:py-10">
    <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Lado izquierdo */}
      <div className="flex flex-col justify-between lg:col-span-5">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#f0d48a] backdrop-blur-sm md:text-sm">
            Beneficios ANRO
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-[54px]">
            Razones para confiar en ANRO en cada etapa de tu proyecto
          </h2>

          <p className="mt-4 max-w-[560px] text-base leading-7 text-white/75 md:text-lg">
            Nuestro trabajo busca ofrecer más que un servicio: buscamos aportar
            claridad, respaldo y una ejecución confiable que permita a cada
            cliente avanzar con mayor seguridad, orden y visión.
          </p>
        </div>

        <div className="mt-6 rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm md:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f0d48a]">
            Lo que buscamos en cada proyecto
          </p>
          <p className="mt-3 text-sm leading-7 text-white/80 md:text-base">
            Combinar experiencia, atención cercana y compromiso profesional para
            ofrecer resultados funcionales, sólidos y alineados a las
            necesidades reales de cada cliente.
          </p>
        </div>
      </div>

      {/* Lado derecho */}
      <div className="grid gap-4 lg:col-span-7 md:grid-cols-2">
        <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
            01
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Atención personalizada
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            Cada proyecto recibe seguimiento cercano para comprender mejor sus
            necesidades y responder con mayor claridad y confianza.
          </p>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
            02
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Visión estratégica
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            Trabajamos con una perspectiva que considera funcionalidad,
            crecimiento, orden y valor a futuro en cada decisión.
          </p>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
            03
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Respaldo profesional
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            Integramos experiencia, capacidad operativa y acompañamiento para
            que cada etapa del proyecto tenga una base sólida.
          </p>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/10 md:p-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4a62a] text-lg font-bold text-[#1f1a17]">
            04
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Compromiso con resultados
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            Nuestro enfoque está en entregar soluciones funcionales, bien
            orientadas y alineadas a los objetivos de cada cliente.
          </p>
        </article>
      </div>
    </div>
  </div>
</section>


{/* CTA FINAL — DISEÑO PREMIUM RENOVADO */}
<section className="relative mx-auto w-full max-w-[2000px] px-4 py-16 md:py-20 lg:py-24">
  {/* Fondo con textura sutil */}
  <div className="absolute inset-0 bg-[#faf7f2]">
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-multiply"></div>
    <div className="absolute left-0 top-0 h-[800px] w-[800px] rounded-full bg-[#d4a62a]/5 blur-[120px]"></div>
    <div className="absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-[#1f1a17]/5 blur-[120px]"></div>
  </div>

  <div className="relative mx-auto max-w-[1600px]">
    {/* Badge flotante superior */}
    <div className="mb-8 flex justify-center lg:mb-12">
      <span className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-[#7b5d2e] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-[#d4a62a]"></span>
        EXPERIENCIA PREMIUM EN DESARROLLO INMOBILIARIO
        <span className="h-2 w-2 rounded-full bg-[#d4a62a]"></span>
      </span>
    </div>

    {/* Título principal con diseño deconstructivo */}
    <div className="text-center">
      <h2 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-[#2d241f] md:text-6xl lg:text-7xl xl:text-8xl">
        DONDE LAS IDEAS
        <br />
        <span className="relative inline-block mt-2">
          <span className="relative z-10 bg-gradient-to-r from-[#d4a62a] to-[#b58b41] bg-clip-text text-transparent">
            CONSTRUYEN REALIDAD
          </span>
          <span className="absolute -bottom-2 left-0 h-1 w-full bg-[#d4a62a]/30"></span>
        </span>
      </h2>
      
      <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#6b5849] md:text-xl lg:text-2xl">
        En ANRO convertimos tu visión en proyectos sólidos, funcionales y con respaldo profesional. 
        Una conversación puede ser el inicio de algo extraordinario.
      </p>
    </div>

    {/* Grid de características premium */}
    <div className="mt-16 grid gap-8 md:grid-cols-3 lg:mt-24">
      {[
        {
          number: "01",
          title: "Arquitectura de Autor",
          desc: "Diseños exclusivos que fusionan estética, funcionalidad y sostenibilidad para crear espacios únicos.",
          icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        },
        {
          number: "02",
          title: "Construcción de Alta Gama",
          desc: "Materiales premium y acabados excepcionales que garantizan durabilidad y distinción en cada detalle.",
          icon: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
        },
        {
          number: "03",
          title: "Asesoría Integral",
          desc: "Acompañamiento personalizado desde la conceptualización hasta la entrega final de tu proyecto.",
          icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        }
      ].map((item, index) => (
        <div
          key={index}
          className="group relative rounded-3xl bg-white p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]"
        >
          <span className="absolute right-6 top-6 font-serif text-6xl font-bold text-[#d4a62a]/10">
            {item.number}
          </span>
          
          <div className="relative">
            <svg
              className="mb-6 h-10 w-10 text-[#d4a62a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={item.icon}
              />
            </svg>
            
            <h3 className="font-serif text-2xl font-bold text-[#2d241f]">
              {item.title}
            </h3>
            
            <p className="mt-4 text-[#6b5849] leading-relaxed">
              {item.desc}
            </p>
            
            <div className="mt-6 h-0.5 w-12 bg-[#d4a62a] transition-all duration-300 group-hover:w-20"></div>
          </div>
        </div>
      ))}
    </div>

    {/* Sección de contacto con imagen y formulario */}
    <div className="mt-16 lg:mt-24">
      <div className="grid overflow-hidden rounded-[48px] bg-[#2d241f] shadow-2xl lg:grid-cols-2">
        {/* Lado izquierdo - Imagen y texto inspirador */}
        <div className="relative min-h-[400px] lg:min-h-full">
          <Image
            src="/fraccionamiento/carrusel2.jpg"
            alt="Proyecto ANRO"
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2d241f] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16">
            <div className="max-w-md">
              <span className="inline-block rounded-full bg-[#d4a62a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#2d241f]">
                Inicia tu proyecto
              </span>
              
              <h3 className="mt-6 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                HABLEMOS DE TU PRÓXIMA OBRA MAESTRA
              </h3>
              
              <p className="mt-4 text-white/80 leading-relaxed">
                Cada gran proyecto comienza con una conversación. Descubre cómo podemos hacer realidad tu visión.
              </p>
            </div>
          </div>
        </div>

        {/* Lado derecho - Formulario de contacto premium */}
        <div className="p-8 md:p-12 lg:p-16">
          <div className="max-w-md">
            <h4 className="text-lg font-medium uppercase tracking-[0.2em] text-[#d4a62a]">
              Contacto Exclusivo
            </h4>
            
            <p className="mt-2 text-2xl font-bold text-white">
              Solicita una asesoría personalizada
            </p>
            
            <form className="mt-8 space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full border-b border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-[#d4a62a] focus:outline-none"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full border-b border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-[#d4a62a] focus:outline-none"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full border-b border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:border-[#d4a62a] focus:outline-none"
                />
              </div>
              
              <div>
                <select className="w-full border-b border-white/20 bg-transparent px-4 py-3 text-white/50 focus:border-[#d4a62a] focus:outline-none">
                  <option value="" disabled selected className="bg-[#2d241f]">Tipo de proyecto</option>
                  <option value="residencial" className="bg-[#2d241f]">Residencial</option>
                  <option value="comercial" className="bg-[#2d241f]">Comercial</option>
                  <option value="corporativo" className="bg-[#2d241f]">Corporativo</option>
                  <option value="inversion" className="bg-[#2d241f]">Inversión</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-full bg-[#d4a62a] px-8 py-4 font-bold text-[#2d241f] transition-all duration-300 hover:bg-[#b58b41]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enviar solicitud
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </button>
              
              <p className="text-center text-xs text-white/50">
                *Tu privacidad es importante. No compartiremos tus datos.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    {/* Elementos decorativos */}
    <div className="absolute left-10 top-20 h-40 w-40 rounded-full border border-[#d4a62a]/20"></div>
    <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full border border-[#d4a62a]/20"></div>
  </div>
</section>






                          
    </main>
  );
}