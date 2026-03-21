import Link from "next/link";
import { ArrowRight, Play, Mic2 } from "lucide-react";

export default function PodcastPage() {
  return (
    <main className="bg-[#F2F1EC]">
      {/* =========================================================
         SECCIÓN 1: HERO INTERNO DE PODCAST
      ========================================================= */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 md:px-6 md:pt-20 md:pb-16">
        {/* Fondo decorativo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#F2F1EC_0%,#EEECE6_55%,#F2F1EC_100%)]" />
          <div className="absolute left-[-80px] top-10 h-80 w-80 rounded-full bg-[#D9D3C7]/18 blur-3xl" />
          <div className="absolute right-[-60px] bottom-0 h-80 w-80 rounded-full bg-[#E4DED3]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1680px]">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center xl:gap-10">
            {/* Columna izquierda */}
            <div className="max-w-[700px] pt-2 md:pt-4">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#FAF8F4] px-5 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B78B4E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A45]">
                  Podcast ANRO
                </span>
              </div>

              <h1 className="max-w-[650px] font-serif text-4xl leading-[0.98] text-[#4B392D] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px]">
                Ideas, visión y conversaciones que
                <span className="mt-2 block text-[#B78B4E]">
                  construyen valor
                </span>
              </h1>

              <div className="mt-7 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

              <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#67584B] md:text-[17px]">
                Un espacio de ANRO para compartir perspectivas, experiencias,
                entrevistas y temas clave sobre desarrollo, construcción,
                inversión y visión empresarial.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#episodios"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B78B4E] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(183,139,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#A67A3E]"
                >
                  Ver episodios
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#destacado"
                  className="inline-flex items-center justify-center rounded-full border border-[#D3CCC0] bg-[#FAF8F4] px-8 py-3.5 text-sm font-semibold text-[#6E5C4C] transition duration-300 hover:bg-white"
                >
                  Escuchar destacado
                </Link>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="relative">
              <div className="rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.08)] md:p-7">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#8B6A45]">
                      Episodio destacado
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-[#4B392D] md:text-[34px]">
                      Conversaciones que inspiran visión
                    </h2>
                  </div>

                  <div className="hidden h-14 w-14 items-center justify-center rounded-full bg-[#F1ECE4] text-[#B78B4E] md:flex">
                    <Mic2 className="h-6 w-6" />
                  </div>
                </div>

                <p className="max-w-[560px] text-sm leading-7 text-[#67584B]">
                  Este espacio destacará el episodio más reciente o más importante,
                  con una breve descripción, duración y acceso rápido para escucharlo.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  {/* Portada / visual */}
                  <div className="overflow-hidden rounded-[26px] border border-[#E3DDD2] bg-[linear-gradient(135deg,#E6D8C5_0%,#D9C2A0_100%)] p-5">
                    <div className="flex h-full min-h-[220px] flex-col justify-between rounded-[22px] border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_100%)] p-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#221B18]/10 text-[#4A3525]">
                        <Play className="ml-0.5 h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A3525]">
                          Podcast / Video
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold leading-snug text-[#221B18]">
                          Portada del episodio
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Info destacada */}
                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">
                        Título
                      </p>
                      <p className="mt-3 text-xl font-semibold text-[#221B18]">
                        Nombre del episodio destacado
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">
                        Resumen
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[#67584B]">
                        Aquí podrás mostrar una descripción breve del episodio,
                        el tema principal, invitado y el valor que aporta al usuario.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-[#E3DDD2] bg-[#F7F4EE] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">
                          Duración
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#221B18]">
                          35 min
                        </p>
                      </div>

                      <div className="rounded-[22px] border border-[#E3DDD2] bg-[#F7F4EE] p-4">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#9A7647]">
                          Publicación
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#221B18]">
                          Reciente
                        </p>
                      </div>
                    </div>

                    <Link
                      href="#destacado"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#221B18] px-7 py-3 text-sm font-semibold text-[#F7F3EC] transition duration-300 hover:bg-[#2E2520]"
                    >
                      Reproducir episodio
                      <Play className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-[#D8D2C6] bg-[#F1ECE4] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#9A7647]">
                    Pensado para panel administrativo
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#67584B]">
                    Este bloque puede alimentarse después desde el panel para
                    cambiar el episodio destacado, portada, duración, resumen y
                    enlaces sin modificar el diseño.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}