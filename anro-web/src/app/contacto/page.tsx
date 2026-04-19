"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

type ContactFormData = {
  nombre: string;
  telefono: string;
  correo: string;
  motivo: string;
  mensaje: string;
  aceptaContacto: boolean;
};

const INITIAL_FORM_DATA: ContactFormData = {
  nombre: "",
  telefono: "",
  correo: "",
  motivo: "",
  mensaje: "",
  aceptaContacto: false,
};

export default function ContactoPage() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result: { ok: boolean; message: string } = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "No se pudo enviar la solicitud.");
      }

      setFeedback({
        type: "success",
        message: result.message || "Solicitud enviada correctamente.",
      });
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocurrió un error al enviar tu solicitud. Inténtalo nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#F2F1EC]">
      {/* =========================================================
         SECCIÓN 1: HERO INTERNO DE CONTACTO
      ========================================================= */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 md:px-6 md:pt-20 md:pb-16">
        {/* Fondo decorativo suave */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#F2F1EC_0%,#EEECE6_55%,#F2F1EC_100%)]" />
          <div className="absolute left-[-80px] top-10 h-80 w-80 rounded-full bg-[#D9D3C7]/18 blur-3xl" />
          <div className="absolute right-[-60px] bottom-0 h-80 w-80 rounded-full bg-[#E4DED3]/30 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1680px]">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:gap-10">
            {/* Columna izquierda */}
            <div className="max-w-[640px] pt-2 md:pt-4 lg:pt-2">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#FAF8F4] px-5 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B78B4E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A45]">
                  Contacto ANRO
                </span>
              </div>

              <h1 className="max-w-[620px] font-serif text-4xl leading-[0.98] text-[#4B392D] sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[78px]">
                Conversemos sobre tu
                <span className="mt-2 block text-[#B78B4E]">
                  próximo proyecto
                </span>
              </h1>

              <div className="mt-7 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

              <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#67584B] md:text-[17px]">
                Estamos listos para atenderte, resolver tus dudas y brindarte una
                atención cercana, clara y profesional para ayudarte a dar el
                siguiente paso con confianza.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#formulario-contacto"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B78B4E] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(183,139,78,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#A67A3E]"
                >
                  Solicitar información
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="#ubicacion"
                  className="inline-flex items-center justify-center rounded-full border border-[#D3CCC0] bg-[#FAF8F4] px-8 py-3.5 text-sm font-semibold text-[#6E5C4C] transition duration-300 hover:bg-white"
                >
                  Ver ubicación
                </Link>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="relative">
              <div className="rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.08)] md:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#8B6A45]">
                  Atención personalizada
                </p>

                <h2 className="mt-3 text-2xl font-semibold text-[#4B392D] md:text-[34px]">
                  Estamos cerca de ti
                </h2>

                <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#67584B]">
                  Un espacio pensado para que tu primer contacto con ANRO se sienta
                  claro, confiable y bien guiado desde el inicio.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[26px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEE6DA] text-[#B78B4E]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-none text-[#4B392D] md:text-[38px]">
                      Directo
                    </h3>
                    <p className="mt-3 text-lg font-semibold text-[#564235]">
                      Contacto cercano
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#67584B]">
                      Resolvemos tus dudas con atención clara y seguimiento
                      personalizado.
                    </p>
                  </div>

                  <div className="rounded-[26px] border border-[#E3DDD2] bg-[#F7F4EE] p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEE6DA] text-[#B78B4E]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-none text-[#4B392D] md:text-[38px]">
                      Clara
                    </h3>
                    <p className="mt-3 text-lg font-semibold text-[#564235]">
                      Información útil
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#67584B]">
                      Te orientamos sobre desarrollos, servicios, ubicación y
                      proceso.
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-[26px] border border-[#E3DDD2] bg-[linear-gradient(180deg,#FAF8F4_0%,#F3EEE7_100%)] px-5 py-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-2 h-3 w-3 rounded-full bg-[#B78B4E]" />
                    <div>
                      <h4 className="text-xl font-semibold text-[#4B392D]">
                        Atención personalizada
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-[#67584B]">
                        Queremos que tu experiencia con ANRO se sienta profesional,
                        cercana y confiable desde el primer momento.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] border border-[#D8D2C6] bg-[#F1ECE4] px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#9A7647]">
                    ANRO Grupo Desarrollador y Constructor
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#67584B]">
                    Un espacio pensado para brindar confianza, cercanía y una
                    comunicación clara en cada paso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         SECCIÓN 2: MENSAJE DE BIENVENIDA / BLOQUE OSCURO
      ========================================================= */}
      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)]">
            {/* Fondo decorativo */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(208,165,47,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
              <div className="absolute left-1/2 top-0 hidden h-full w-px bg-white/8 lg:block" />
            </div>

            <div className="relative grid gap-8 px-8 py-10 md:px-10 md:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:px-14">
              {/* Lado izquierdo */}
              <div className="max-w-[760px]">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                    Bienvenida
                  </span>
                </div>

                <h2 className="font-serif text-3xl leading-[1.06] text-[#F7F3EC] md:text-4xl lg:text-[56px] xl:text-[62px]">
                  Un primer contacto que refleja
                  <span className="block text-[#D0A52F]">
                    confianza, claridad y visión
                  </span>
                </h2>

                <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

                <p className="mt-7 max-w-[700px] text-[15px] leading-8 text-[rgba(247,243,236,0.78)] md:text-[17px]">
                  En ANRO entendemos que una buena atención comienza mucho antes de
                  tomar una decisión. Por eso buscamos que este primer acercamiento
                  transmita respaldo, orientación profesional y una visión clara
                  para acompañarte desde el inicio.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#D0A52F]">
                      01
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-[#F7F3EC]">
                      Cercanía
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      Escuchamos tus necesidades con atención real.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#D0A52F]">
                      02
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-[#F7F3EC]">
                      Claridad
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      Información útil para avanzar con seguridad.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#D0A52F]">
                      03
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-[#F7F3EC]">
                      Respaldo
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      Compromiso profesional en cada paso del proceso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lado derecho */}
              <div className="flex items-center">
                <div className="w-full rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm md:p-8">
                  <div className="rounded-[24px] bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4A3525]">
                      Mensaje ANRO
                    </p>

                    <h3 className="mt-4 text-2xl font-semibold leading-snug text-[#221B18] md:text-[34px]">
                      Construimos confianza desde el primer contacto
                    </h3>

                    <p className="mt-4 text-sm leading-8 text-[#4E3B2E] md:text-[15px]">
                      Más que brindar información, buscamos ofrecer una experiencia
                      de atención que haga sentir seguridad, acompañamiento y
                      claridad.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-[22px] border border-white/10 bg-black/10 px-5 py-4">
                      <p className="text-base font-semibold text-[#F7F3EC]">
                        Atención profesional
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Un trato claro y bien estructurado desde el inicio.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-black/10 px-5 py-4">
                      <p className="text-base font-semibold text-[#F7F3EC]">
                        Orientación confiable
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Información precisa sobre desarrollos, servicios y proceso.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/10 bg-black/10 px-5 py-4">
                      <p className="text-base font-semibold text-[#F7F3EC]">
                        Visión de largo plazo
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Acompañamiento pensado para proyectos con valor y proyección.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         SECCIÓN 3: CANALES DE CONTACTO
      ========================================================= */}
      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative overflow-hidden rounded-[36px] border border-[#D8CFC2] bg-[#F3F0EA]">
            {/* Fondo decorativo */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)]" />
              <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#D0A52F]/10 blur-3xl" />
            </div>

            <div className="relative grid gap-8 px-8 py-10 md:px-10 md:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start xl:px-14">
              {/* Lado izquierdo */}
              <div className="max-w-[700px]">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
                    Canales de contacto
                  </span>
                </div>

                <h2 className="font-serif text-3xl leading-[1.06] text-[#221B18] md:text-4xl lg:text-[54px] xl:text-[60px]">
                  Elige el medio más práctico para
                  <span className="block text-[#B88A44]">hablar con ANRO</span>
                </h2>

                <div className="mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

                <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[#5F5146] md:text-[17px]">
                  Ponte en contacto con nosotros para resolver dudas, solicitar
                  información, conocer nuestros desarrollos o recibir una atención
                  más cercana y personalizada.
                </p>

                <div className="mt-8 rounded-[30px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-[#F7F3EC]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
                    Atención ANRO
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    Una comunicación clara también construye confianza
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-[rgba(247,243,236,0.78)]">
                    Nuestro equipo busca darte orientación útil, seguimiento y una
                    atención profesional desde el primer contacto.
                  </p>
                </div>
              </div>

              {/* Lado derecho */}
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* WhatsApp */}
                  <div className="rounded-[30px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE5D6] text-[#B88A44]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.5A8.5 8.5 0 1 1 21 11.5Z" />
                        <path d="M9.8 8.9c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .6.5.2.6.8 1.9.9 2 .1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.1-.3.3-.4.4-.1.1-.2.3-.1.5.1.2.7 1.1 1.5 1.8 1 .9 1.9 1.2 2.1 1.3.2.1.4.1.6-.1.2-.2.7-.8.9-1 .2-.2.4-.2.6-.1.3.1 1.6.8 1.9 1 .3.1.5.2.5.4 0 .2 0 1-.5 1.5-.5.5-1.2.8-2 .8s-1.8-.3-3.1-.9c-1.3-.6-2.8-1.8-3.9-3.4-1.1-1.6-1.4-3.1-1.4-4 0-.9.3-1.6.7-2Z" />
                      </svg>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                      Canal 01
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#221B18]">
                      WhatsApp
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                      Ideal para una atención rápida, resolver dudas iniciales y
                      dar seguimiento directo.
                    </p>
                    <div className="mt-5 rounded-[20px] border border-[#E3D9CD] bg-white/70 px-4 py-3">
                      <p className="text-sm font-semibold text-[#221B18]">
                        +52 000 000 0000
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#6A5C50]">
                        Respuesta ágil y cercana.
                      </p>
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="rounded-[30px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE5D6] text-[#B88A44]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                      Canal 02
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#221B18]">
                      Correo electrónico
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                      Perfecto para solicitar información más detallada o recibir
                      atención más estructurada.
                    </p>
                    <div className="mt-5 rounded-[20px] border border-[#E3D9CD] bg-white/70 px-4 py-3">
                      <p className="text-sm font-semibold text-[#221B18]">
                        contacto@anro.com.mx
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#6A5C50]">
                        Seguimiento profesional.
                      </p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="rounded-[30px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE5D6] text-[#B88A44]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6.2 6.2l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.7.7A2 2 0 0 1 22 16.9Z" />
                      </svg>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                      Canal 03
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#221B18]">
                      Llamada telefónica
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                      Recomendada para una atención más directa y para resolver dudas
                      con mayor inmediatez.
                    </p>
                    <div className="mt-5 rounded-[20px] border border-[#E3D9CD] bg-white/70 px-4 py-3">
                      <p className="text-sm font-semibold text-[#221B18]">
                        +52 000 000 0000
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#6A5C50]">
                        Comunicación clara y puntual.
                      </p>
                    </div>
                  </div>

                  {/* Oficina */}
                  <div className="rounded-[30px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE5D6] text-[#B88A44]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                      Canal 04
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#221B18]">
                      Oficina / ubicación
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                      Para quienes desean ubicar fácilmente el punto de atención o
                      visitarnos de forma presencial.
                    </p>
                    <div className="mt-5 rounded-[20px] border border-[#E3D9CD] bg-white/70 px-4 py-3">
                      <p className="text-sm font-semibold text-[#221B18]">
                        Dirección de oficina ANRO
                      </p>
                      <p className="mt-1 text-xs leading-6 text-[#6A5C50]">
                        Atención presencial y referencia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         SECCIÓN 4: FORMULARIO DE CONTACTO
      ========================================================= */}
      <section className="px-4 pb-16 md:px-6 md:pb-24" id="formulario-contacto">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)]">
            {/* Fondo decorativo */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(208,165,47,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
              <div className="absolute left-1/2 top-0 hidden h-full w-px bg-white/8 lg:block" />
            </div>

            <div className="relative grid gap-8 px-8 py-10 md:px-10 md:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start xl:px-14">
              {/* Lado izquierdo */}
              <div className="max-w-[700px]">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                    Formulario de contacto
                  </span>
                </div>

                <h2 className="font-serif text-3xl leading-[1.06] text-[#F7F3EC] md:text-4xl lg:text-[54px] xl:text-[60px]">
                  Cuéntanos sobre tu interés y
                  <span className="block text-[#D0A52F]">
                    nos pondremos en contacto
                  </span>
                </h2>

                <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

                <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[rgba(247,243,236,0.78)] md:text-[17px]">
                  Completa el formulario para recibir atención personalizada,
                  resolver tus dudas o solicitar información sobre desarrollos,
                  servicios y opciones disponibles.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4 backdrop-blur-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                      Atención personalizada
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      Tu mensaje será atendido con seguimiento profesional y una
                      respuesta alineada a tus necesidades.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] px-5 py-5 text-[#221B18]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A3525]">
                        Tiempo estimado
                      </p>
                      <p className="mt-3 text-xl font-semibold">Respuesta ágil</p>
                      <p className="mt-2 text-sm leading-7 text-[#4E3B2E]">
                        Priorizamos solicitudes enviadas por formulario y contacto
                        directo.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                        Información útil
                      </p>
                      <p className="mt-3 text-xl font-semibold text-[#F7F3EC]">
                        Atención clara
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Comparte tu interés y te orientaremos según el tipo de
                        proyecto o servicio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lado derecho */}
              <div className="rounded-[34px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm md:p-8">
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
                    Solicitud ANRO
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#F7F3EC] md:text-[34px]">
                    Envíanos tu mensaje
                  </h3>
                  <p className="mt-3 max-w-[620px] text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                    Déjanos tus datos y el motivo de tu consulta para brindarte una
                    atención más precisa y cercana.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#F7F3EC]">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        required
                        className="w-full rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-white/45 outline-none transition focus:border-[#D0A52F] focus:ring-2 focus:ring-[#D0A52F]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#F7F3EC]">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+52 000 000 0000"
                        className="w-full rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-white/45 outline-none transition focus:border-[#D0A52F] focus:ring-2 focus:ring-[#D0A52F]/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#F7F3EC]">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        placeholder="tucorreo@ejemplo.com"
                        required
                        className="w-full rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-white/45 outline-none transition focus:border-[#D0A52F] focus:ring-2 focus:ring-[#D0A52F]/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#F7F3EC]">
                        Motivo de contacto
                      </label>
                      <select
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC] outline-none transition focus:border-[#D0A52F] focus:ring-2 focus:ring-[#D0A52F]/20"
                      >
                        <option value="" className="text-[#221B18]">Selecciona una opción</option>
                        <option value="Información sobre desarrollos" className="text-[#221B18]">Información sobre desarrollos</option>
                        <option value="Consulta sobre servicios" className="text-[#221B18]">Consulta sobre servicios</option>
                        <option value="Agendar atención" className="text-[#221B18]">Agendar atención</option>
                        <option value="Otro" className="text-[#221B18]">Otro</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#F7F3EC]">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      required
                      className="w-full rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC] placeholder:text-white/45 outline-none transition focus:border-[#D0A52F] focus:ring-2 focus:ring-[#D0A52F]/20"
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                    <label className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-black/10 px-4 py-4 text-sm text-[rgba(247,243,236,0.75)]">
                      <input
                        type="checkbox"
                        name="aceptaContacto"
                        checked={formData.aceptaContacto}
                        onChange={handleInputChange}
                        required
                        className="mt-1 h-4 w-4 rounded border-white/20 text-[#D0A52F] focus:ring-[#D0A52F]/20"
                      />
                      <span>
                        Acepto ser contactado por ANRO para dar seguimiento a mi
                        solicitud y recibir información relacionada con mi consulta.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C79A2B]"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                    </button>
                  </div>

                  {feedback && (
                    <p
                      className={`rounded-[16px] border px-4 py-3 text-sm ${
                        feedback.type === "success"
                          ? "border-green-300/60 bg-green-100/15 text-green-200"
                          : "border-red-300/60 bg-red-100/15 text-red-200"
                      }`}
                    >
                      {feedback.message}
                    </p>
                  )}
                </form>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-black/10 px-5 py-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                        Privacidad
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Tu información será utilizada únicamente para atender tu
                        solicitud.
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                        Seguimiento
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                        Recibirás una respuesta orientada a tu consulta y al canal más
                        adecuado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
         SECCIÓN 5: BLOQUE DE CONFIANZA
         PENDIENTE
      ========================================================= */}
        {/* =========================================================
   SECCIÓN 5: BLOQUE DE CONFIANZA
========================================================= */}
      <section className="px-4 pb-16 md:px-6 md:pb-24">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative overflow-hidden rounded-[36px] border border-[#D8CFC2] bg-[#F3F0EA]">
            {/* Fondo decorativo */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)]" />
              <div className="absolute -left-12 top-10 h-56 w-56 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#D0A52F]/10 blur-3xl" />
            </div>

            <div className="relative grid gap-8 px-8 py-10 md:px-10 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:px-14">
              {/* Lado izquierdo */}
              <div className="max-w-[700px]">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
                    Confianza ANRO
                  </span>
                </div>

                <h2 className="font-serif text-3xl leading-[1.06] text-[#221B18] md:text-4xl lg:text-[54px] xl:text-[60px]">
                  Una atención respaldada por
                  <span className="block text-[#B88A44]">seriedad, cercanía y visión</span>
                </h2>

                <div className="mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

                <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[#5F5146] md:text-[17px]">
                  En ANRO buscamos que cada persona que se acerca a nosotros perciba
                  orden, confianza y una atención profesional. Nuestro compromiso es
                  acompañarte con claridad, seguimiento y una visión sólida en cada
                  etapa.
                </p>

                <div className="mt-8 rounded-[28px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-[#F7F3EC]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
                    Respaldo ANRO
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    La confianza se construye con atención clara y seguimiento real
                  </h3>
                  <p className="mt-4 text-sm leading-8 text-[rgba(247,243,236,0.78)]">
                    Nuestro objetivo es que cada contacto, consulta o solicitud se
                    sienta atendida con responsabilidad, orden y cercanía.
                  </p>
                </div>
              </div>

              {/* Lado derecho */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-[28px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
                    01
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#221B18]">
                    Atención cercana
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                    Escuchamos cada consulta con interés real para orientar con mayor
                    precisión y claridad.
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
                    02
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#221B18]">
                    Respuesta profesional
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                    Brindamos información útil, estructurada y alineada al tipo de
                    proyecto o servicio que buscas.
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
                    03
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#221B18]">
                    Seguimiento real
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                    Cada solicitud busca tener continuidad para ofrecer una experiencia
                    más confiable y ordenada.
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#D8CFC2] bg-[#FAF7F2] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
                    04
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold text-[#221B18]">
                    Visión de largo plazo
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                    Buscamos que la confianza no sea solo del primer contacto, sino de
                    toda la experiencia con ANRO.
                  </p>
                </div>
              </div>
            </div>

            {/* Franja inferior */}
            <div className="relative border-t border-[#D8CFC2] bg-[#ECE6DC] px-8 py-6 md:px-10 xl:px-14">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                    Compromiso institucional
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-[#221B18]">
                    Queremos que cada interacción se sienta clara, seria y confiable
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[22px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-4">
                    <p className="text-sm font-semibold text-[#221B18]">Cercanía</p>
                    <p className="mt-2 text-sm leading-7 text-[#5F5146]">
                      Trato humano y directo.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-4">
                    <p className="text-sm font-semibold text-[#221B18]">Claridad</p>
                    <p className="mt-2 text-sm leading-7 text-[#5F5146]">
                      Información útil y puntual.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-4">
                    <p className="text-sm font-semibold text-[#221B18]">Respaldo</p>
                    <p className="mt-2 text-sm leading-7 text-[#5F5146]">
                      Seguimiento con visión profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================================================
         SECCIÓN 6: UBICACIÓN / CÓMO LLEGAR
         PENDIENTE
      ========================================================= */}
        <section className="px-4 pb-16 md:px-6 md:pb-24" id="ubicacion">
  <div className="mx-auto max-w-[1680px]">
    <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(208,165,47,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_28%)]" />
        <div className="absolute left-1/2 top-0 hidden h-full w-px bg-white/8 lg:block" />
      </div>

      <div className="relative grid gap-8 px-8 py-10 md:px-10 md:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start xl:px-14">
        {/* Lado izquierdo */}
        <div className="max-w-[700px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
              Ubicación ANRO
            </span>
          </div>

          <h2 className="font-serif text-3xl leading-[1.06] text-[#F7F3EC] md:text-4xl lg:text-[54px] xl:text-[60px]">
            Ubicación estratégica en
            <span className="block text-[#D0A52F]">
              Huejutla de Reyes, Hidalgo
            </span>
          </h2>

          <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

          <p className="mt-6 max-w-[620px] text-[15px] leading-8 text-[rgba(247,243,236,0.78)] md:text-[17px]">
            ANRO Grupo Desarrollador y Constructor S.A. de C.V. se encuentra en
            una zona estratégica de Huejutla de Reyes, con conectividad, acceso
            cómodo y cercanía a puntos importantes de la ciudad.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                Empresa
              </p>
              <p className="mt-3 text-lg font-semibold text-[#F7F3EC]">
                ANRO Grupo Desarrollador y Constructor S.A. de C.V.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/10 px-5 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                Dirección
              </p>
              <p className="mt-3 text-base font-semibold text-[#F7F3EC]">
                Galación Gómez, Colonia Paso las Chacas Río, 43000, Huejutla de
                Reyes, Hgo.
              </p>
              <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                Punto de referencia para atención presencial y ubicación rápida.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                  Coordenadas
                </p>
                <p className="mt-3 text-xl font-semibold text-[#F7F3EC]">
                  21.1254807, -98.4197644
                </p>
                <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                  Referencia precisa para llegar con facilidad.
                </p>
              </div>

              <div className="rounded-[24px] bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] px-5 py-5 text-[#221B18]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4A3525]">
                  Cómo llegar
                </p>
                <p className="mt-3 text-xl font-semibold">
                  Ruta directa
                </p>
                <p className="mt-2 text-sm leading-7 text-[#4E3B2E]">
                  Accede rápidamente a nuestra ubicación desde Google Maps.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://maps.app.goo.gl/8guVC1MK6sct1nTd7"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C79A2B]"
              >
                Cómo llegar
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="#formulario-contacto"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-8 py-3.5 text-sm font-semibold text-[#F7F3EC] transition duration-300 hover:bg-white/10"
              >
                Solicitar información
              </Link>
            </div>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="space-y-5">
          {/* Mapa real */}
          <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/6 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
            <div className="h-[420px] w-full md:h-[560px] lg:h-[680px]">
              <iframe
                title="Ubicación ANRO Grupo Desarrollador y Constructor"
                src="https://www.google.com/maps?q=ANRO%20Grupo%20Desarrollador%20y%20Constructor%20S.A.%20de%20C.V.,%20Huejutla%20de%20Reyes,%20Hidalgo&z=18&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Tarjetas inferiores */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                Punto de atención
              </p>
              <p className="mt-3 text-xl font-semibold text-[#F7F3EC]">
                Ubicación clara
              </p>
              <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                Diseñada para que clientes, visitantes e interesados nos
                encuentren con facilidad.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/6 px-5 py-5 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                Atención presencial
              </p>
              <p className="mt-3 text-xl font-semibold text-[#F7F3EC]">
                Visítanos
              </p>
              <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                Un espacio pensado para brindarte orientación y atención de forma
                cercana y profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* =========================================================
         SECCIÓN 7: CTA FINAL
         PENDIENTE
      ========================================================= */}

        <section className="px-4 pb-20 md:px-6 md:pb-28">
  <div className="mx-auto max-w-[1680px]">
    <div className="relative overflow-hidden rounded-[38px] border border-[#D8CFC2] bg-[#F3F0EA]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)]" />
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-white/35 blur-3xl" />
        <div className="absolute right-[-30px] bottom-[-30px] h-72 w-72 rounded-full bg-[#D0A52F]/12 blur-3xl" />
      </div>

      <div className="relative px-8 py-12 md:px-10 md:py-16 xl:px-14">
        <div className="mx-auto max-w-[1050px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
              Contacto ANRO
            </span>
          </div>

          <h2 className="mt-6 font-serif text-3xl leading-[1.06] text-[#221B18] md:text-4xl lg:text-[58px] xl:text-[64px]">
            Estamos listos para
            <span className="block text-[#B88A44]">
              escucharte y orientarte
            </span>
          </h2>

          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

          <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-8 text-[#5F5146] md:text-[17px]">
            Ya sea que busques información sobre nuestros desarrollos, desees
            resolver dudas o recibir atención personalizada, en ANRO estamos
            preparados para acompañarte con claridad, cercanía y visión
            profesional.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#formulario-contacto"
              className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18] transition duration-300 hover:-translate-y-0.5 hover:bg-[#C79A2B]"
            >
              Enviar solicitud
              <span className="ml-2">→</span>
            </Link>

            <Link
              href="/contacto#ubicacion"
              className="inline-flex items-center justify-center rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-8 py-3.5 text-sm font-semibold text-[#221B18] transition duration-300 hover:bg-white"
            >
              Ver ubicación
            </Link>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
              Cercanía
            </p>
            <p className="mt-3 text-lg font-semibold text-[#221B18]">
              Atención humana
            </p>
            <p className="mt-2 text-sm leading-7 text-[#5F5146]">
              Un trato claro, directo y profesional en cada consulta.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
              Claridad
            </p>
            <p className="mt-3 text-lg font-semibold text-[#221B18]">
              Información útil
            </p>
            <p className="mt-2 text-sm leading-7 text-[#5F5146]">
              Orientación puntual sobre proyectos, servicios y proceso.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
              Respaldo
            </p>
            <p className="mt-3 text-lg font-semibold text-[#221B18]">
              Visión profesional
            </p>
            <p className="mt-2 text-sm leading-7 text-[#5F5146]">
              Una experiencia pensada para generar confianza desde el inicio.
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
