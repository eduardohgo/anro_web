"use client";

import {
  CheckCircle2,
  FilePenLine,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type TextItem = {
  id: string;
  text: string;
};

type InfoCard = {
  id: string;
  title: string;
  description: string;
};

type NumberCard = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type HeroFeatureCard = {
  id: string;
  icon: "phone" | "mail";
  keyword: string;
  title: string;
  description: string;
};

type HeroContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  sideBadge: string;
  sideTitle: string;
  sideDescription: string;
  featureCards: HeroFeatureCard[];
  attentionTitle: string;
  attentionText: string;
  companyLabel: string;
  companyText: string;
};

type WelcomeContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftCards: NumberCard[];
  messageBadge: string;
  messageTitle: string;
  messageDescription: string;
  rightCards: InfoCard[];
};

type ChannelCard = {
  id: string;
  badge: string;
  title: string;
  description: string;
  value: string;
  footnote: string;
  icon: "chat" | "mail" | "phone" | "map";
};

type ChannelsContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftBadge: string;
  leftTitle: string;
  leftDescription: string;
  channels: ChannelCard[];
};

type FormCard = {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlighted?: boolean;
};

type FooterInfoCard = {
  id: string;
  title: string;
  description: string;
};

type FormContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  leftCards: FormCard[];
  formHeaderBadge: string;
  formHeaderTitle: string;
  formHeaderDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  reasonLabel: string;
  reasonOptions: TextItem[];
  messageLabel: string;
  messagePlaceholder: string;
  consentText: string;
  submitText: string;
  footerCards: FooterInfoCard[];
};

type TrustContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  sideBadge: string;
  sideTitle: string;
  sideDescription: string;
  cards: NumberCard[];
  bottomBadge: string;
  bottomTitle: string;
  bottomCards: InfoCard[];
};

type LocationInfoCard = {
  id: string;
  title: string;
  value: string;
  description: string;
};

type LocationContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  companyCard: LocationInfoCard;
  addressCard: LocationInfoCard;
  coordinatesCard: LocationInfoCard;
  routeCard: LocationInfoCard;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  mapEmbedUrl: string;
  rightCards: InfoCard[];
};

type CtaBottomCard = {
  id: string;
  label: string;
  title: string;
  description: string;
};

type CtaContent = {
  badge: string;
  titleWhite: string;
  titleGold: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  bottomCards: CtaBottomCard[];
};

type ContactContentConfig = {
  hero: HeroContent;
  welcome: WelcomeContent;
  channels: ChannelsContent;
  form: FormContent;
  trust: TrustContent;
  location: LocationContent;
  cta: CtaContent;
  updatedAt: string;
};


const DEFAULT_CONTACT_CONTENT: ContactContentConfig = {
  hero: {
    badge: "Contacto ANRO",
    titleWhite: "Conversemos sobre tu",
    titleGold: "próximo proyecto",
    description:
      "Estamos listos para atenderte, resolver tus dudas y brindarte una atención cercana, clara y profesional para ayudarte a dar el siguiente paso con confianza.",
    primaryButtonText: "Solicitar información",
    primaryButtonLink: "#formulario-contacto",
    secondaryButtonText: "Ver ubicación",
    secondaryButtonLink: "#ubicacion",
    sideBadge: "Atención personalizada",
    sideTitle: "Estamos cerca de ti",
    sideDescription:
      "Un espacio pensado para que tu primer contacto con ANRO se sienta claro, confiable y bien guiado desde el inicio.",
    featureCards: [
      {
        id: "hero-feature-1",
        icon: "phone",
        keyword: "Directo",
        title: "Contacto cercano",
        description:
          "Resolvemos tus dudas con atención clara y seguimiento personalizado.",
      },
      {
        id: "hero-feature-2",
        icon: "mail",
        keyword: "Clara",
        title: "Información útil",
        description:
          "Te orientamos sobre desarrollos, servicios, ubicación y proceso.",
      },
    ],
    attentionTitle: "Atención personalizada",
    attentionText:
      "Queremos que tu experiencia con ANRO se sienta profesional, cercana y confiable desde el primer momento.",
    companyLabel: "ANRO Grupo Desarrollador y Constructor",
    companyText:
      "Un espacio pensado para brindar confianza, cercanía y una comunicación clara en cada paso.",
  },
  welcome: {
    badge: "Bienvenida",
    titleWhite: "Un primer contacto que refleja",
    titleGold: "confianza, claridad y visión",
    description:
      "En ANRO entendemos que una buena atención comienza mucho antes de tomar una decisión. Por eso buscamos que este primer acercamiento transmita respaldo, orientación profesional y una visión clara para acompañarte desde el inicio.",
    leftCards: [
      {
        id: "welcome-left-1",
        number: "01",
        title: "Cercanía",
        description: "Escuchamos tus necesidades con atención real.",
      },
      {
        id: "welcome-left-2",
        number: "02",
        title: "Claridad",
        description: "Información útil para avanzar con seguridad.",
      },
      {
        id: "welcome-left-3",
        number: "03",
        title: "Respaldo",
        description: "Compromiso profesional en cada paso del proceso.",
      },
    ],
    messageBadge: "Mensaje ANRO",
    messageTitle: "Construimos confianza desde el primer contacto",
    messageDescription:
      "Más que brindar información, buscamos ofrecer una experiencia de atención que haga sentir seguridad, acompañamiento y claridad.",
    rightCards: [
      {
        id: "welcome-right-1",
        title: "Atención profesional",
        description: "Un trato claro y bien estructurado desde el inicio.",
      },
      {
        id: "welcome-right-2",
        title: "Orientación confiable",
        description:
          "Información precisa sobre desarrollos, servicios y proceso.",
      },
      {
        id: "welcome-right-3",
        title: "Visión de largo plazo",
        description:
          "Acompañamiento pensado para proyectos con valor y proyección.",
      },
    ],
  },
  channels: {
    badge: "Canales de contacto",
    titleWhite: "Elige el medio más práctico para",
    titleGold: "hablar con ANRO",
    description:
      "Ponte en contacto con nosotros para resolver dudas, solicitar información, conocer nuestros desarrollos o recibir una atención más cercana y personalizada.",
    leftBadge: "Atención ANRO",
    leftTitle: "Una comunicación clara también construye confianza",
    leftDescription:
      "Nuestro equipo busca darte orientación útil, seguimiento y una atención profesional desde el primer contacto.",
    channels: [
      {
        id: "channel-1",
        badge: "Canal 01",
        title: "WhatsApp",
        description:
          "Ideal para una atención rápida, resolver dudas iniciales y dar seguimiento directo.",
        value: "+52 000 000 0000",
        footnote: "Respuesta ágil y cercana.",
        icon: "chat",
      },
      {
        id: "channel-2",
        badge: "Canal 02",
        title: "Correo electrónico",
        description:
          "Perfecto para solicitar información más detallada o recibir atención más estructurada.",
        value: "contacto@anro.com.mx",
        footnote: "Seguimiento profesional.",
        icon: "mail",
      },
      {
        id: "channel-3",
        badge: "Canal 03",
        title: "Llamada telefónica",
        description:
          "Recomendada para una atención más directa y para resolver dudas con mayor inmediatez.",
        value: "+52 000 000 0000",
        footnote: "Comunicación clara y puntual.",
        icon: "phone",
      },
      {
        id: "channel-4",
        badge: "Canal 04",
        title: "Oficina / ubicación",
        description:
          "Para quienes desean ubicar fácilmente el punto de atención o visitarnos de forma presencial.",
        value: "Dirección de oficina ANRO",
        footnote: "Atención presencial y referencia.",
        icon: "map",
      },
    ],
  },
  form: {
    badge: "Formulario de contacto",
    titleWhite: "Cuéntanos sobre tu interés y",
    titleGold: "nos pondremos en contacto",
    description:
      "Completa el formulario para recibir atención personalizada, resolver tus dudas o solicitar información sobre desarrollos, servicios y opciones disponibles.",
    leftCards: [
      {
        id: "form-left-1",
        badge: "Atención personalizada",
        title: "Seguimiento profesional",
        description:
          "Tu mensaje será atendido con seguimiento profesional y una respuesta alineada a tus necesidades.",
      },
      {
        id: "form-left-2",
        badge: "Tiempo estimado",
        title: "Respuesta ágil",
        description:
          "Priorizamos solicitudes enviadas por formulario y contacto directo.",
        highlighted: true,
      },
      {
        id: "form-left-3",
        badge: "Información útil",
        title: "Atención clara",
        description:
          "Comparte tu interés y te orientaremos según el tipo de proyecto o servicio.",
      },
    ],
    formHeaderBadge: "Solicitud ANRO",
    formHeaderTitle: "Envíanos tu mensaje",
    formHeaderDescription:
      "Déjanos tus datos y el motivo de tu consulta para brindarte una atención más precisa y cercana.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Tu nombre",
    phoneLabel: "Teléfono",
    phonePlaceholder: "+52 000 000 0000",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tucorreo@ejemplo.com",
    reasonLabel: "Motivo de contacto",
    reasonOptions: [
      { id: "reason-1", text: "Selecciona una opción" },
      { id: "reason-2", text: "Información sobre desarrollos" },
      { id: "reason-3", text: "Consulta sobre servicios" },
      { id: "reason-4", text: "Agendar atención" },
      { id: "reason-5", text: "Otro" },
    ],
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos cómo podemos ayudarte...",
    consentText:
      "Acepto ser contactado por ANRO para dar seguimiento a mi solicitud y recibir información relacionada con mi consulta.",
    submitText: "Enviar solicitud",
    footerCards: [
      {
        id: "form-footer-1",
        title: "Privacidad",
        description:
          "Tu información será utilizada únicamente para atender tu solicitud.",
      },
      {
        id: "form-footer-2",
        title: "Seguimiento",
        description:
          "Recibirás una respuesta orientada a tu consulta y al canal más adecuado.",
      },
    ],
  },
  trust: {
    badge: "Confianza ANRO",
    titleWhite: "Una atención respaldada por",
    titleGold: "seriedad, cercanía y visión",
    description:
      "En ANRO buscamos que cada persona que se acerca a nosotros perciba orden, confianza y una atención profesional. Nuestro compromiso es acompañarte con claridad, seguimiento y una visión sólida en cada etapa.",
    sideBadge: "Respaldo ANRO",
    sideTitle:
      "La confianza se construye con atención clara y seguimiento real",
    sideDescription:
      "Nuestro objetivo es que cada contacto, consulta o solicitud se sienta atendida con responsabilidad, orden y cercanía.",
    cards: [
      {
        id: "trust-card-1",
        number: "01",
        title: "Atención cercana",
        description:
          "Escuchamos cada consulta con interés real para orientar con mayor precisión y claridad.",
      },
      {
        id: "trust-card-2",
        number: "02",
        title: "Respuesta profesional",
        description:
          "Brindamos información útil, estructurada y alineada al tipo de proyecto o servicio que buscas.",
      },
      {
        id: "trust-card-3",
        number: "03",
        title: "Seguimiento real",
        description:
          "Cada solicitud busca tener continuidad para ofrecer una experiencia más confiable y ordenada.",
      },
      {
        id: "trust-card-4",
        number: "04",
        title: "Visión de largo plazo",
        description:
          "Buscamos que la confianza no sea solo del primer contacto, sino de toda la experiencia con ANRO.",
      },
    ],
    bottomBadge: "Compromiso institucional",
    bottomTitle:
      "Queremos que cada interacción se sienta clara, seria y confiable",
    bottomCards: [
      {
        id: "trust-bottom-1",
        title: "Cercanía",
        description: "Trato humano y directo.",
      },
      {
        id: "trust-bottom-2",
        title: "Claridad",
        description: "Información útil y puntual.",
      },
      {
        id: "trust-bottom-3",
        title: "Respaldo",
        description: "Seguimiento con visión profesional.",
      },
    ],
  },
  location: {
    badge: "Ubicación ANRO",
    titleWhite: "Ubicación estratégica en",
    titleGold: "Huejutla de Reyes, Hidalgo",
    description:
      "ANRO Grupo Desarrollador y Constructor S.A. de C.V. se encuentra en una zona estratégica de Huejutla de Reyes, con conectividad, acceso cómodo y cercanía a puntos importantes de la ciudad.",
    companyCard: {
      id: "location-company",
      title: "Empresa",
      value: "ANRO Grupo Desarrollador y Constructor S.A. de C.V.",
      description: "",
    },
    addressCard: {
      id: "location-address",
      title: "Dirección",
      value:
        "Galación Gómez, Colonia Paso las Chacas Río, 43000, Huejutla de Reyes, Hgo.",
      description:
        "Punto de referencia para atención presencial y ubicación rápida.",
    },
    coordinatesCard: {
      id: "location-coordinates",
      title: "Coordenadas",
      value: "21.1254807, -98.4197644",
      description: "Referencia precisa para llegar con facilidad.",
    },
    routeCard: {
      id: "location-route",
      title: "Cómo llegar",
      value: "Ruta directa",
      description:
        "Accede rápidamente a nuestra ubicación desde Google Maps.",
    },
    primaryButtonText: "Cómo llegar",
    primaryButtonLink: "https://maps.app.goo.gl/8guVC1MK6sct1nTd7",
    secondaryButtonText: "Solicitar información",
    secondaryButtonLink: "#formulario-contacto",
    mapEmbedUrl:
      "https://www.google.com/maps?q=ANRO%20Grupo%20Desarrollador%20y%20Constructor%20S.A.%20de%20C.V.,%20Huejutla%20de%20Reyes,%20Hidalgo&z=18&output=embed",
    rightCards: [
      {
        id: "location-right-1",
        title: "Punto de atención",
        description:
          "Diseñada para que clientes, visitantes e interesados nos encuentren con facilidad.",
      },
      {
        id: "location-right-2",
        title: "Atención presencial",
        description:
          "Un espacio pensado para brindarte orientación y atención de forma cercana y profesional.",
      },
    ],
  },
  cta: {
    badge: "Contacto ANRO",
    titleWhite: "Estamos listos para",
    titleGold: "escucharte y orientarte",
    description:
      "Ya sea que busques información sobre nuestros desarrollos, desees resolver dudas o recibir atención personalizada, en ANRO estamos preparados para acompañarte con claridad, cercanía y visión profesional.",
    primaryButtonText: "Enviar solicitud",
    primaryButtonLink: "#formulario-contacto",
    secondaryButtonText: "Ver ubicación",
    secondaryButtonLink: "/contacto#ubicacion",
    bottomCards: [
      {
        id: "cta-bottom-1",
        label: "Cercanía",
        title: "Atención humana",
        description: "Un trato claro, directo y profesional en cada consulta.",
      },
      {
        id: "cta-bottom-2",
        label: "Claridad",
        title: "Información útil",
        description:
          "Orientación puntual sobre proyectos, servicios y proceso.",
      },
      {
        id: "cta-bottom-3",
        label: "Respaldo",
        title: "Visión profesional",
        description:
          "Una experiencia pensada para generar confianza desde el inicio.",
      },
    ],
  },
  updatedAt: new Date().toISOString(),
};

function formatDate(date: Date) {
  return date.toLocaleString("es-MX", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

async function fetchContactContentFromApi(
  endpoint = "/api/admin/contacto"
): Promise<ContactContentConfig> {
  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("No fue posible cargar Contacto desde la API.");
  }

  return (await response.json()) as ContactContentConfig;
}

async function saveContactContentToApi(
  content: ContactContentConfig,
  endpoint = "/api/admin/contacto"
): Promise<ContactContentConfig> {
  const payload = {
    ...content,
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No fue posible guardar Contacto en la API.");
  }

  return (await response.json()) as ContactContentConfig;
}

async function persistContactContent(
  content: ContactContentConfig
): Promise<ContactContentConfig> {
  return saveContactContentToApi(content);
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-[#2d3b52]">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[120px] rounded-2xl border border-[#dfd2be] bg-white/90 px-4 py-3 text-sm text-[#1d2c43] shadow-[0_8px_20px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[#d4a62a] focus:bg-white focus:ring-4 focus:ring-[rgba(212,166,42,0.12)]"
      />
    </label>
  );
}

function SectionShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#ece3d6] bg-white/80 p-5 shadow-[0_16px_35px_rgba(15,23,42,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
        {title}
      </p>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function InlineEditorShell({
  badge,
  title,
  description,
  editLabel,
  idleMessage,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  preview,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  editLabel: string;
  idleMessage: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  preview: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[32px] border border-[#e0d8cb] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className="border-b border-[#ece3d6] px-6 py-6 md:px-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#ecd9aa] bg-[#fff7e6] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a3771d]">
              {badge}
            </span>

            <h2 className="mt-4 text-2xl font-semibold text-[#132035] md:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
              {description}
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2.5 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
            >
              <FilePenLine className="h-4 w-4" />
              {editLabel}
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-6 py-6 md:px-7 md:py-7">
        <div className="overflow-hidden rounded-[28px] border border-[#e8dcc8] bg-[#fcf8f1] p-3 md:p-4">
          {preview}
        </div>

        {isEditing ? (
          <div className="mt-6 border-t border-[#ece3d6] pt-6">
            {children}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-[#ece3d6] pt-6">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-[#ddd1bc] bg-white px-5 py-3 text-sm font-semibold text-[#3a465a] transition hover:bg-[#f8f4ed]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#111d31] transition hover:bg-[#bf931d]"
              >
                <CheckCircle2 className="h-4 w-4" />
                Guardar cambios
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] border border-[#ece3d6] bg-[#fffaf4] p-5">
            <p className="text-sm font-semibold text-[#132035]">Vista de edición preparada</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{idleMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function renderContactIcon(
  icon: "phone" | "mail" | "chat" | "map",
  className = "h-5 w-5"
) {
  switch (icon) {
    case "phone":
      return <Phone className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "chat":
      return <MessageCircle className={className} />;
    case "map":
      return <MapPin className={className} />;
    default:
      return <Phone className={className} />;
  }
}

function ContactPreview({
  section,
  content,
}: {
  section:
    | "hero"
    | "welcome"
    | "channels"
    | "form"
    | "trust"
    | "location"
    | "cta";
  content:
    | HeroContent
    | WelcomeContent
    | ChannelsContent
    | FormContent
    | TrustContent
    | LocationContent
    | CtaContent;
}) {
  if (section === "hero") {
    const hero = content as HeroContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(180deg,#F2F1EC_0%,#EEECE6_55%,#F2F1EC_100%)] p-6">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D8D2C6] bg-[#FAF8F4] px-5 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#B78B4E]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6A45]">
                {hero.badge}
              </span>
            </span>

            <h3 className="mt-6 text-4xl leading-[0.98] text-[#4B392D] md:text-5xl">
              {hero.titleWhite}
              <span className="mt-2 block text-[#B78B4E]">{hero.titleGold}</span>
            </h3>

            <div className="mt-7 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

            <p className="mt-7 max-w-[620px] text-[15px] leading-8 text-[#67584B]">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <span className="inline-flex items-center justify-center rounded-full bg-[#B78B4E] px-8 py-3.5 text-sm font-semibold text-white">
                {hero.primaryButtonText}
              </span>
              <span className="inline-flex items-center justify-center rounded-full border border-[#D3CCC0] bg-[#FAF8F4] px-8 py-3.5 text-sm font-semibold text-[#6E5C4C]">
                {hero.secondaryButtonText}
              </span>
            </div>
          </div>

          <div className="rounded-[34px] border border-[#D8D2C6] bg-[#FCFBF8] p-6 shadow-[0_24px_70px_rgba(75,57,45,0.08)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#8B6A45]">
              {hero.sideBadge}
            </p>

            <h4 className="mt-3 text-2xl font-semibold text-[#4B392D] md:text-[34px]">
              {hero.sideTitle}
            </h4>

            <p className="mt-3 text-sm leading-7 text-[#67584B]">
              {hero.sideDescription}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {hero.featureCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[26px] border border-[#E3DDD2] bg-[#F7F4EE] p-5"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEE6DA] text-[#B78B4E]">
                    {renderContactIcon(card.icon, "h-5 w-5")}
                  </div>
                  <h5 className="text-[30px] font-bold leading-none text-[#4B392D]">
                    {card.keyword}
                  </h5>
                  <p className="mt-3 text-lg font-semibold text-[#564235]">
                    {card.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#67584B]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[26px] border border-[#E3DDD2] bg-[linear-gradient(180deg,#FAF8F4_0%,#F3EEE7_100%)] px-5 py-5">
              <h5 className="text-xl font-semibold text-[#4B392D]">
                {hero.attentionTitle}
              </h5>
              <p className="mt-2 text-sm leading-7 text-[#67584B]">
                {hero.attentionText}
              </p>
            </div>

            <div className="mt-4 rounded-[24px] border border-[#D8D2C6] bg-[#F1ECE4] px-5 py-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9A7647]">
                {hero.companyLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#67584B]">{hero.companyText}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section === "welcome") {
    const welcome = content as WelcomeContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-white">
        <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                {welcome.badge}
              </span>
            </span>

            <h3 className="mt-5 text-4xl leading-[1.06] text-[#F7F3EC] md:text-5xl">
              {welcome.titleWhite}
              <span className="block text-[#D0A52F]">{welcome.titleGold}</span>
            </h3>

            <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

            <p className="mt-7 max-w-[700px] text-[15px] leading-8 text-[rgba(247,243,236,0.78)]">
              {welcome.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {welcome.leftCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#D0A52F]">
                    {card.number}
                  </p>
                  <h4 className="mt-3 text-lg font-semibold text-[#F7F3EC]">
                    {card.title}
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/6 p-6">
            <div className="rounded-[24px] bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] px-5 py-5 text-[#221B18]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4A3525]">
                {welcome.messageBadge}
              </p>
              <h4 className="mt-4 text-2xl font-semibold leading-snug">
                {welcome.messageTitle}
              </h4>
              <p className="mt-4 text-sm leading-8 text-[#4E3B2E]">
                {welcome.messageDescription}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {welcome.rightCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[22px] border border-white/10 bg-black/10 px-5 py-4"
                >
                  <p className="text-base font-semibold text-[#F7F3EC]">{card.title}</p>
                  <p className="mt-1 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section === "channels") {
    const channels = content as ChannelsContent;

    return (
      <section className="rounded-[32px] border border-[#D8CFC2] bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)] p-6">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
                {channels.badge}
              </span>
            </span>

            <h3 className="mt-5 text-4xl leading-[1.06] text-[#221B18] md:text-5xl">
              {channels.titleWhite}
              <span className="block text-[#B88A44]">{channels.titleGold}</span>
            </h3>

            <div className="mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

            <p className="mt-6 text-[15px] leading-8 text-[#5F5146]">
              {channels.description}
            </p>

            <div className="mt-8 rounded-[30px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-[#F7F3EC]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
                {channels.leftBadge}
              </p>
              <h4 className="mt-3 text-2xl font-semibold leading-snug">
                {channels.leftTitle}
              </h4>
              <p className="mt-4 text-sm leading-8 text-[rgba(247,243,236,0.78)]">
                {channels.leftDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {channels.channels.map((channel) => (
              <div
                key={channel.id}
                className="rounded-[30px] border border-[#D8CFC2] bg-[#FAF7F2] p-6"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EFE5D6] text-[#B88A44]">
                  {renderContactIcon(channel.icon, "h-6 w-6")}
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                  {channel.badge}
                </p>
                <h4 className="mt-3 text-2xl font-semibold text-[#221B18]">
                  {channel.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                  {channel.description}
                </p>
                <div className="mt-5 rounded-[20px] border border-[#E3D9CD] bg-white/70 px-4 py-3">
                  <p className="text-sm font-semibold text-[#221B18]">{channel.value}</p>
                  <p className="mt-1 text-xs leading-6 text-[#6A5C50]">{channel.footnote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section === "form") {
    const form = content as FormContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-white">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                {form.badge}
              </span>
            </span>

            <h3 className="mt-5 text-4xl leading-[1.06] text-[#F7F3EC] md:text-5xl">
              {form.titleWhite}
              <span className="block text-[#D0A52F]">{form.titleGold}</span>
            </h3>

            <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

            <p className="mt-6 text-[15px] leading-8 text-[rgba(247,243,236,0.78)]">
              {form.description}
            </p>

            <div className="mt-8 space-y-4">
              {form.leftCards.map((card) => (
                <div
                  key={card.id}
                  className={`rounded-[24px] px-5 py-5 ${
                    card.highlighted
                      ? "bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] text-[#221B18]"
                      : "border border-white/10 bg-white/6 text-[#F7F3EC]"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
                      card.highlighted ? "text-[#4A3525]" : "text-[#D0A52F]"
                    }`}
                  >
                    {card.badge}
                  </p>
                  <p className="mt-3 text-xl font-semibold">{card.title}</p>
                  <p
                    className={`mt-2 text-sm leading-7 ${
                      card.highlighted
                        ? "text-[#4E3B2E]"
                        : "text-[rgba(247,243,236,0.72)]"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/6 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
              {form.formHeaderBadge}
            </p>
            <h4 className="mt-3 text-2xl font-semibold text-[#F7F3EC] md:text-[34px]">
              {form.formHeaderTitle}
            </h4>
            <p className="mt-3 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
              {form.formHeaderDescription}
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC]">
                {form.namePlaceholder}
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC]">
                {form.phonePlaceholder}
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC]">
                {form.emailPlaceholder}
              </div>
              <div className="rounded-[18px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC]">
                {form.reasonOptions[0]?.text}
              </div>
            </div>

            <div className="mt-5 rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-sm text-[#F7F3EC]">
              {form.messagePlaceholder}
            </div>

            <div className="mt-5 rounded-[20px] border border-white/10 bg-black/10 px-4 py-4 text-sm text-[rgba(247,243,236,0.75)]">
              {form.consentText}
            </div>

            <div className="mt-5 flex justify-end">
              <span className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18]">
                {form.submitText}
              </span>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/10 px-5 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {form.footerCards.map((card) => (
                  <div key={card.id}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                      {card.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section === "trust") {
    const trust = content as TrustContent;

    return (
      <section className="rounded-[32px] border border-[#D8CFC2] bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)] p-6">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
                {trust.badge}
              </span>
            </span>

            <h3 className="mt-5 text-4xl leading-[1.06] text-[#221B18] md:text-5xl">
              {trust.titleWhite}
              <span className="block text-[#B88A44]">{trust.titleGold}</span>
            </h3>

            <div className="mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

            <p className="mt-6 text-[15px] leading-8 text-[#5F5146]">
              {trust.description}
            </p>

            <div className="mt-8 rounded-[28px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-[#F7F3EC]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D0A52F]">
                {trust.sideBadge}
              </p>
              <h4 className="mt-3 text-2xl font-semibold leading-snug">
                {trust.sideTitle}
              </h4>
              <p className="mt-4 text-sm leading-8 text-[rgba(247,243,236,0.78)]">
                {trust.sideDescription}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {trust.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-[28px] border border-[#D8CFC2] bg-[#FAF7F2] p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
                  {card.number}
                </p>
                <h4 className="mt-4 text-2xl font-semibold text-[#221B18]">
                  {card.title}
                </h4>
                <p className="mt-3 text-sm leading-7 text-[#5F5146]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[#D8CFC2] bg-[#ECE6DC] px-6 py-6">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9A7647]">
                {trust.bottomBadge}
              </p>
              <h4 className="mt-3 text-2xl font-semibold text-[#221B18]">
                {trust.bottomTitle}
              </h4>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {trust.bottomCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[22px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-4"
                >
                  <p className="text-sm font-semibold text-[#221B18]">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#5F5146]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (section === "location") {
    const location = content as LocationContent;

    return (
      <section className="rounded-[32px] bg-[linear-gradient(135deg,#1F1916_0%,#2A211D_100%)] p-6 text-white">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85">
                {location.badge}
              </span>
            </span>

            <h3 className="mt-5 text-4xl leading-[1.06] text-[#F7F3EC] md:text-5xl">
              {location.titleWhite}
              <span className="block text-[#D0A52F]">{location.titleGold}</span>
            </h3>

            <div className="mt-6 h-[2px] w-24 rounded-full bg-[#D0A52F]/70" />

            <p className="mt-6 text-[15px] leading-8 text-[rgba(247,243,236,0.78)]">
              {location.description}
            </p>

            <div className="mt-8 space-y-4">
              {[location.companyCard, location.addressCard].map((card) => (
                <div
                  key={card.id}
                  className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-5"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D0A52F]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-base font-semibold text-[#F7F3EC]">
                    {card.value}
                  </p>
                  {card.description ? (
                    <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              ))}

              <div className="grid gap-4 sm:grid-cols-2">
                {[location.coordinatesCard, location.routeCard].map((card, index) => (
                  <div
                    key={card.id}
                    className={`rounded-[24px] px-5 py-5 ${
                      index === 1
                        ? "bg-[linear-gradient(135deg,#E3C288_0%,#C99834_100%)] text-[#221B18]"
                        : "border border-white/10 bg-white/6 text-white"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
                        index === 1 ? "text-[#4A3525]" : "text-[#D0A52F]"
                      }`}
                    >
                      {card.title}
                    </p>
                    <p className="mt-3 text-xl font-semibold">{card.value}</p>
                    <p
                      className={`mt-2 text-sm leading-7 ${
                        index === 1
                          ? "text-[#4E3B2E]"
                          : "text-[rgba(247,243,236,0.72)]"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18]">
                  {location.primaryButtonText}
                </span>
                <span className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-8 py-3.5 text-sm font-semibold text-[#F7F3EC]">
                  {location.secondaryButtonText}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/6">
              <iframe
                title="Ubicación ANRO"
                src={location.mapEmbedUrl}
                width="100%"
                height="520"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {location.rightCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[28px] border border-white/10 bg-white/6 px-5 py-5"
                >
                  <p className="text-xl font-semibold text-[#F7F3EC]">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgba(247,243,236,0.72)]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const cta = content as CtaContent;

  return (
    <section className="rounded-[32px] border border-[#D8CFC2] bg-[linear-gradient(135deg,#F3F0EA_0%,#EEE8DE_45%,#F6F2EB_100%)] p-6">
      <div className="mx-auto max-w-[1050px] text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-[#D0A52F]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8A6A43]">
            {cta.badge}
          </span>
        </span>

        <h3 className="mt-6 text-4xl leading-[1.06] text-[#221B18] md:text-5xl">
          {cta.titleWhite}
          <span className="block text-[#B88A44]">{cta.titleGold}</span>
        </h3>

        <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-[#C7B08C]" />

        <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-8 text-[#5F5146]">
          {cta.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center justify-center rounded-full bg-[#D0A52F] px-8 py-3.5 text-sm font-semibold text-[#221B18]">
            {cta.primaryButtonText}
          </span>

          <span className="inline-flex items-center justify-center rounded-full border border-[#D8CFC2] bg-[#FAF7F2] px-8 py-3.5 text-sm font-semibold text-[#221B18]">
            {cta.secondaryButtonText}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cta.bottomCards.map((card) => (
          <div
            key={card.id}
            className="rounded-[24px] border border-[#D8CFC2] bg-[#FAF7F2] px-5 py-5 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7647]">
              {card.label}
            </p>
            <p className="mt-3 text-lg font-semibold text-[#221B18]">{card.title}</p>
            <p className="mt-2 text-sm leading-7 text-[#5F5146]">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function AdminContactoPage() {
  const [content, setContent] = useState<ContactContentConfig>(DEFAULT_CONTACT_CONTENT);
  const [lastUpdated, setLastUpdated] = useState<Date>(
    DEFAULT_CONTACT_CONTENT.updatedAt
      ? new Date(DEFAULT_CONTACT_CONTENT.updatedAt)
      : new Date()
  );

  const [isHeroEditing, setIsHeroEditing] = useState(false);
  const [heroDraft, setHeroDraft] = useState<HeroContent | null>(null);

  const [isWelcomeEditing, setIsWelcomeEditing] = useState(false);
  const [welcomeDraft, setWelcomeDraft] = useState<WelcomeContent | null>(null);

  const [isChannelsEditing, setIsChannelsEditing] = useState(false);
  const [channelsDraft, setChannelsDraft] = useState<ChannelsContent | null>(null);

  const [isFormEditing, setIsFormEditing] = useState(false);
  const [formDraft, setFormDraft] = useState<FormContent | null>(null);

  const [isTrustEditing, setIsTrustEditing] = useState(false);
  const [trustDraft, setTrustDraft] = useState<TrustContent | null>(null);

  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [locationDraft, setLocationDraft] = useState<LocationContent | null>(null);

  const [isCtaEditing, setIsCtaEditing] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [ctaDraft, setCtaDraft] = useState<CtaContent | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const apiContent = await fetchContactContentFromApi();
        if (!mounted) return;
        setContent(apiContent);
        setLastUpdated(new Date(apiContent.updatedAt));
      } catch (error) {
        console.error("No fue posible cargar Contacto desde API.", error);
      }
    };

    void loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  async function applyAndPersist(nextContent: ContactContentConfig) {
    setContent(nextContent);
    setSaveFeedback(null);

    try {
      const saved = await persistContactContent(nextContent);
      setContent(saved);
      setLastUpdated(new Date(saved.updatedAt));
      setSaveFeedback({ type: "success", text: "Cambios guardados correctamente" });
    } catch {
      setSaveFeedback({ type: "error", text: "No fue posible guardar los cambios" });
      throw new Error("No fue posible guardar los cambios");
    }
  }

  const overviewCards = [
    {
      label: "Secciones del panel",
      value: "7",
      hint: "Hero, bienvenida, canales, formulario, confianza, ubicación y CTA.",
    },
    {
      label: "Diseño alineado",
      value: "Sí",
      hint: "Mantiene la misma línea que Home, Desarrollo y Servicios.",
    },
    {
      label: "Guardado actual",
      value: "API (Neon)",
      hint: "Lectura y escritura exclusivas por API con persistencia en Neon.",
    },
    {
      label: "Última actualización",
      value: formatDate(lastUpdated),
      hint: "Fecha del último contenido guardado.",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#21314d] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.18),transparent_36%),linear-gradient(140deg,#0e1c36_0%,#142b4c_58%,#1d3d6b_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.18)] md:px-9 md:py-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f0d596]/40 bg-[#f0d596]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f7db9f]">
          Panel alineado con Contacto público
        </span>

        <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
          Administración de Contacto
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Aquí puedes administrar la ventana pública de Contacto con la misma
          estructura visual, experiencia de edición y orden que ya venimos
          trabajando en los demás paneles.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#aa7f28]">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-[#142033]">{card.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.hint}</p>
          </article>
        ))}
      </section>


      {saveFeedback ? (
        <div className={`rounded-2xl px-4 py-3 text-sm font-medium ${
          saveFeedback.type === "success"
            ? "border border-[#d8e4d6] bg-[#f3faf1] text-[#234128]"
            : "border border-[#f1d1d1] bg-[#fff5f5] text-[#7a1f1f]"
        }`}>
          {saveFeedback.text}
        </div>
      ) : null}
      <InlineEditorShell
        badge="Bloque superior"
        title="Hero interno de contacto"
        description="Edita el encabezado principal, botones y la tarjeta visual del lado derecho."
        editLabel="Editar Hero"
        idleMessage="Este bloque ya sigue la misma lógica visual del panel de Home."
        isEditing={isHeroEditing}
        onEdit={() => {
          setHeroDraft(structuredClone(content.hero));
          setIsHeroEditing(true);
        }}
        onCancel={() => {
          setHeroDraft(structuredClone(content.hero));
          setIsHeroEditing(false);
        }}
        onSave={async () => {
          if (!heroDraft) return;
          await applyAndPersist({
            ...content,
            hero: structuredClone(heroDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsHeroEditing(false);
        }}
        preview={<ContactPreview section="hero" content={heroDraft ?? content.hero} />}
      >
        {heroDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado principal">
              <Field
                label="Badge"
                value={heroDraft.badge}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={heroDraft.titleWhite}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, titleWhite: value } : c))}
              />
              <Field
                label="Título dorado"
                value={heroDraft.titleGold}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, titleGold: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={heroDraft.description}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Botones">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Texto botón principal"
                  value={heroDraft.primaryButtonText}
                  onChange={(value) =>
                    setHeroDraft((c) => (c ? { ...c, primaryButtonText: value } : c))
                  }
                />
                <Field
                  label="Enlace botón principal"
                  value={heroDraft.primaryButtonLink}
                  onChange={(value) =>
                    setHeroDraft((c) => (c ? { ...c, primaryButtonLink: value } : c))
                  }
                />
                <Field
                  label="Texto botón secundario"
                  value={heroDraft.secondaryButtonText}
                  onChange={(value) =>
                    setHeroDraft((c) => (c ? { ...c, secondaryButtonText: value } : c))
                  }
                />
                <Field
                  label="Enlace botón secundario"
                  value={heroDraft.secondaryButtonLink}
                  onChange={(value) =>
                    setHeroDraft((c) => (c ? { ...c, secondaryButtonLink: value } : c))
                  }
                />
              </div>
            </SectionShell>

            <SectionShell title="Bloque visual derecho">
              <Field
                label="Badge derecho"
                value={heroDraft.sideBadge}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, sideBadge: value } : c))}
              />
              <Field
                label="Título derecho"
                value={heroDraft.sideTitle}
                onChange={(value) => setHeroDraft((c) => (c ? { ...c, sideTitle: value } : c))}
              />
              <TextAreaField
                label="Descripción derecha"
                value={heroDraft.sideDescription}
                onChange={(value) =>
                  setHeroDraft((c) => (c ? { ...c, sideDescription: value } : c))
                }
              />
              <Field
                label="Título bloque atención"
                value={heroDraft.attentionTitle}
                onChange={(value) =>
                  setHeroDraft((c) => (c ? { ...c, attentionTitle: value } : c))
                }
              />
              <TextAreaField
                label="Texto bloque atención"
                value={heroDraft.attentionText}
                onChange={(value) =>
                  setHeroDraft((c) => (c ? { ...c, attentionText: value } : c))
                }
              />
              <Field
                label="Etiqueta empresa"
                value={heroDraft.companyLabel}
                onChange={(value) =>
                  setHeroDraft((c) => (c ? { ...c, companyLabel: value } : c))
                }
              />
              <TextAreaField
                label="Texto empresa"
                value={heroDraft.companyText}
                onChange={(value) =>
                  setHeroDraft((c) => (c ? { ...c, companyText: value } : c))
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Bienvenida"
        title="Bloque de bienvenida"
        description="Edita el mensaje inicial oscuro, tarjetas de confianza y bloque dorado."
        editLabel="Editar Bienvenida"
        idleMessage="Esta sección ya queda alineada con la misma experiencia de edición inline."
        isEditing={isWelcomeEditing}
        onEdit={() => {
          setWelcomeDraft(structuredClone(content.welcome));
          setIsWelcomeEditing(true);
        }}
        onCancel={() => {
          setWelcomeDraft(structuredClone(content.welcome));
          setIsWelcomeEditing(false);
        }}
        onSave={async () => {
          if (!welcomeDraft) return;
          await applyAndPersist({
            ...content,
            welcome: structuredClone(welcomeDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsWelcomeEditing(false);
        }}
        preview={<ContactPreview section="welcome" content={welcomeDraft ?? content.welcome} />}
      >
        {welcomeDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado izquierdo">
              <Field
                label="Badge"
                value={welcomeDraft.badge}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, badge: value } : c))
                }
              />
              <Field
                label="Título blanco"
                value={welcomeDraft.titleWhite}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, titleWhite: value } : c))
                }
              />
              <Field
                label="Título dorado"
                value={welcomeDraft.titleGold}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, titleGold: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={welcomeDraft.description}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, description: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Tarjetas del lado izquierdo">
              {welcomeDraft.leftCards.map((card, index) => (
                <div key={card.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Número"
                      value={card.number}
                      onChange={(value) =>
                        setWelcomeDraft((c) => {
                          if (!c) return c;
                          const next = [...c.leftCards];
                          next[index] = { ...next[index], number: value };
                          return { ...c, leftCards: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={card.title}
                      onChange={(value) =>
                        setWelcomeDraft((c) => {
                          if (!c) return c;
                          const next = [...c.leftCards];
                          next[index] = { ...next[index], title: value };
                          return { ...c, leftCards: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={card.description}
                      onChange={(value) =>
                        setWelcomeDraft((c) => {
                          if (!c) return c;
                          const next = [...c.leftCards];
                          next[index] = { ...next[index], description: value };
                          return { ...c, leftCards: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>

            <SectionShell title="Mensaje derecho">
              <Field
                label="Badge"
                value={welcomeDraft.messageBadge}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, messageBadge: value } : c))
                }
              />
              <Field
                label="Título"
                value={welcomeDraft.messageTitle}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, messageTitle: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={welcomeDraft.messageDescription}
                onChange={(value) =>
                  setWelcomeDraft((c) => (c ? { ...c, messageDescription: value } : c))
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Canales"
        title="Canales de contacto"
        description="Edita la sección de medios de contacto y cada canal disponible."
        editLabel="Editar Canales"
        idleMessage="Este bloque ya sigue la misma lógica de edición por secciones."
        isEditing={isChannelsEditing}
        onEdit={() => {
          setChannelsDraft(structuredClone(content.channels));
          setIsChannelsEditing(true);
        }}
        onCancel={() => {
          setChannelsDraft(structuredClone(content.channels));
          setIsChannelsEditing(false);
        }}
        onSave={async () => {
          if (!channelsDraft) return;
          await applyAndPersist({
            ...content,
            channels: structuredClone(channelsDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsChannelsEditing(false);
        }}
        preview={<ContactPreview section="channels" content={channelsDraft ?? content.channels} />}
      >
        {channelsDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={channelsDraft.badge}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, badge: value } : c))
                }
              />
              <Field
                label="Título blanco"
                value={channelsDraft.titleWhite}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, titleWhite: value } : c))
                }
              />
              <Field
                label="Título dorado"
                value={channelsDraft.titleGold}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, titleGold: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={channelsDraft.description}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, description: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Mensaje lateral">
              <Field
                label="Badge lateral"
                value={channelsDraft.leftBadge}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, leftBadge: value } : c))
                }
              />
              <Field
                label="Título lateral"
                value={channelsDraft.leftTitle}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, leftTitle: value } : c))
                }
              />
              <TextAreaField
                label="Descripción lateral"
                value={channelsDraft.leftDescription}
                onChange={(value) =>
                  setChannelsDraft((c) => (c ? { ...c, leftDescription: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Cards de canales">
              {channelsDraft.channels.map((channel, index) => (
                <div key={channel.id} className="rounded-2xl border border-[#e7dcc9] bg-[#fffdfa] p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Badge"
                      value={channel.badge}
                      onChange={(value) =>
                        setChannelsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.channels];
                          next[index] = { ...next[index], badge: value };
                          return { ...c, channels: next };
                        })
                      }
                    />
                    <Field
                      label="Título"
                      value={channel.title}
                      onChange={(value) =>
                        setChannelsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.channels];
                          next[index] = { ...next[index], title: value };
                          return { ...c, channels: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <TextAreaField
                      label="Descripción"
                      value={channel.description}
                      onChange={(value) =>
                        setChannelsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.channels];
                          next[index] = { ...next[index], description: value };
                          return { ...c, channels: next };
                        })
                      }
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <Field
                      label="Valor"
                      value={channel.value}
                      onChange={(value) =>
                        setChannelsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.channels];
                          next[index] = { ...next[index], value };
                          return { ...c, channels: next };
                        })
                      }
                    />
                    <Field
                      label="Texto auxiliar"
                      value={channel.footnote}
                      onChange={(value) =>
                        setChannelsDraft((c) => {
                          if (!c) return c;
                          const next = [...c.channels];
                          next[index] = { ...next[index], footnote: value };
                          return { ...c, channels: next };
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Formulario"
        title="Formulario de contacto"
        description="Edita el bloque del formulario, los textos de apoyo y los campos mostrados."
        editLabel="Editar Formulario"
        idleMessage="Esta parte ya queda alineada a la misma estructura visual del panel."
        isEditing={isFormEditing}
        onEdit={() => {
          setFormDraft(structuredClone(content.form));
          setIsFormEditing(true);
        }}
        onCancel={() => {
          setFormDraft(structuredClone(content.form));
          setIsFormEditing(false);
        }}
        onSave={async () => {
          if (!formDraft) return;
          await applyAndPersist({
            ...content,
            form: structuredClone(formDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsFormEditing(false);
        }}
        preview={<ContactPreview section="form" content={formDraft ?? content.form} />}
      >
        {formDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado izquierdo">
              <Field
                label="Badge"
                value={formDraft.badge}
                onChange={(value) => setFormDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={formDraft.titleWhite}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, titleWhite: value } : c))
                }
              />
              <Field
                label="Título dorado"
                value={formDraft.titleGold}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, titleGold: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={formDraft.description}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, description: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Bloque superior del formulario">
              <Field
                label="Badge"
                value={formDraft.formHeaderBadge}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, formHeaderBadge: value } : c))
                }
              />
              <Field
                label="Título"
                value={formDraft.formHeaderTitle}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, formHeaderTitle: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={formDraft.formHeaderDescription}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, formHeaderDescription: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Campos">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Label nombre"
                  value={formDraft.nameLabel}
                  onChange={(value) => setFormDraft((c) => (c ? { ...c, nameLabel: value } : c))}
                />
                <Field
                  label="Placeholder nombre"
                  value={formDraft.namePlaceholder}
                  onChange={(value) =>
                    setFormDraft((c) => (c ? { ...c, namePlaceholder: value } : c))
                  }
                />
                <Field
                  label="Label teléfono"
                  value={formDraft.phoneLabel}
                  onChange={(value) => setFormDraft((c) => (c ? { ...c, phoneLabel: value } : c))}
                />
                <Field
                  label="Placeholder teléfono"
                  value={formDraft.phonePlaceholder}
                  onChange={(value) =>
                    setFormDraft((c) => (c ? { ...c, phonePlaceholder: value } : c))
                  }
                />
                <Field
                  label="Label correo"
                  value={formDraft.emailLabel}
                  onChange={(value) => setFormDraft((c) => (c ? { ...c, emailLabel: value } : c))}
                />
                <Field
                  label="Placeholder correo"
                  value={formDraft.emailPlaceholder}
                  onChange={(value) =>
                    setFormDraft((c) => (c ? { ...c, emailPlaceholder: value } : c))
                  }
                />
                <Field
                  label="Label motivo"
                  value={formDraft.reasonLabel}
                  onChange={(value) => setFormDraft((c) => (c ? { ...c, reasonLabel: value } : c))}
                />
                <Field
                  label="Label mensaje"
                  value={formDraft.messageLabel}
                  onChange={(value) =>
                    setFormDraft((c) => (c ? { ...c, messageLabel: value } : c))
                  }
                />
              </div>

              <TextAreaField
                label="Placeholder mensaje"
                value={formDraft.messagePlaceholder}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, messagePlaceholder: value } : c))
                }
              />

              <TextAreaField
                label="Texto de consentimiento"
                value={formDraft.consentText}
                onChange={(value) =>
                  setFormDraft((c) => (c ? { ...c, consentText: value } : c))
                }
              />

              <Field
                label="Texto botón"
                value={formDraft.submitText}
                onChange={(value) => setFormDraft((c) => (c ? { ...c, submitText: value } : c))}
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Confianza"
        title="Bloque de confianza"
        description="Edita el mensaje institucional, las tarjetas principales y la franja inferior."
        editLabel="Editar Confianza"
        idleMessage="Este bloque ya queda con la misma organización visual y edición inline."
        isEditing={isTrustEditing}
        onEdit={() => {
          setTrustDraft(structuredClone(content.trust));
          setIsTrustEditing(true);
        }}
        onCancel={() => {
          setTrustDraft(structuredClone(content.trust));
          setIsTrustEditing(false);
        }}
        onSave={async () => {
          if (!trustDraft) return;
          await applyAndPersist({
            ...content,
            trust: structuredClone(trustDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsTrustEditing(false);
        }}
        preview={<ContactPreview section="trust" content={trustDraft ?? content.trust} />}
      >
        {trustDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={trustDraft.badge}
                onChange={(value) => setTrustDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={trustDraft.titleWhite}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, titleWhite: value } : c))
                }
              />
              <Field
                label="Título dorado"
                value={trustDraft.titleGold}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, titleGold: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={trustDraft.description}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, description: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Mensaje lateral">
              <Field
                label="Badge lateral"
                value={trustDraft.sideBadge}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, sideBadge: value } : c))
                }
              />
              <Field
                label="Título lateral"
                value={trustDraft.sideTitle}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, sideTitle: value } : c))
                }
              />
              <TextAreaField
                label="Texto lateral"
                value={trustDraft.sideDescription}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, sideDescription: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Franja inferior">
              <Field
                label="Badge inferior"
                value={trustDraft.bottomBadge}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, bottomBadge: value } : c))
                }
              />
              <Field
                label="Título inferior"
                value={trustDraft.bottomTitle}
                onChange={(value) =>
                  setTrustDraft((c) => (c ? { ...c, bottomTitle: value } : c))
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Ubicación"
        title="Ubicación / cómo llegar"
        description="Edita la dirección, datos de ubicación, links y el embed del mapa."
        editLabel="Editar Ubicación"
        idleMessage="Esta sección ya queda adaptada al mismo estilo del resto del panel."
        isEditing={isLocationEditing}
        onEdit={() => {
          setLocationDraft(structuredClone(content.location));
          setIsLocationEditing(true);
        }}
        onCancel={() => {
          setLocationDraft(structuredClone(content.location));
          setIsLocationEditing(false);
        }}
        onSave={async () => {
          if (!locationDraft) return;
          await applyAndPersist({
            ...content,
            location: structuredClone(locationDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsLocationEditing(false);
        }}
        preview={<ContactPreview section="location" content={locationDraft ?? content.location} />}
      >
        {locationDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={locationDraft.badge}
                onChange={(value) =>
                  setLocationDraft((c) => (c ? { ...c, badge: value } : c))
                }
              />
              <Field
                label="Título blanco"
                value={locationDraft.titleWhite}
                onChange={(value) =>
                  setLocationDraft((c) => (c ? { ...c, titleWhite: value } : c))
                }
              />
              <Field
                label="Título dorado"
                value={locationDraft.titleGold}
                onChange={(value) =>
                  setLocationDraft((c) => (c ? { ...c, titleGold: value } : c))
                }
              />
              <TextAreaField
                label="Descripción"
                value={locationDraft.description}
                onChange={(value) =>
                  setLocationDraft((c) => (c ? { ...c, description: value } : c))
                }
              />
            </SectionShell>

            <SectionShell title="Datos de ubicación">
              <Field
                label="Nombre empresa"
                value={locationDraft.companyCard.value}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c
                      ? {
                          ...c,
                          companyCard: { ...c.companyCard, value },
                        }
                      : c
                  )
                }
              />
              <TextAreaField
                label="Dirección"
                value={locationDraft.addressCard.value}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c
                      ? {
                          ...c,
                          addressCard: { ...c.addressCard, value },
                        }
                      : c
                  )
                }
              />
              <Field
                label="Coordenadas"
                value={locationDraft.coordinatesCard.value}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c
                      ? {
                          ...c,
                          coordinatesCard: { ...c.coordinatesCard, value },
                        }
                      : c
                  )
                }
              />
              <Field
                label="Ruta"
                value={locationDraft.routeCard.value}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c
                      ? {
                          ...c,
                          routeCard: { ...c.routeCard, value },
                        }
                      : c
                  )
                }
              />
              <Field
                label="Link principal"
                value={locationDraft.primaryButtonLink}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c ? { ...c, primaryButtonLink: value } : c
                  )
                }
              />
              <Field
                label="Texto botón principal"
                value={locationDraft.primaryButtonText}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c ? { ...c, primaryButtonText: value } : c
                  )
                }
              />
              <Field
                label="Texto botón secundario"
                value={locationDraft.secondaryButtonText}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c ? { ...c, secondaryButtonText: value } : c
                  )
                }
              />
              <Field
                label="Link botón secundario"
                value={locationDraft.secondaryButtonLink}
                onChange={(value) =>
                  setLocationDraft((c) =>
                    c ? { ...c, secondaryButtonLink: value } : c
                  )
                }
              />
              <TextAreaField
                label="URL embed del mapa"
                value={locationDraft.mapEmbedUrl}
                onChange={(value) =>
                  setLocationDraft((c) => (c ? { ...c, mapEmbedUrl: value } : c))
                }
              />
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <InlineEditorShell
        badge="Cierre final"
        title="CTA final"
        description="Edita el cierre de Contacto y las tarjetas finales de confianza."
        editLabel="Editar CTA"
        idleMessage="Este cierre ya queda unificado con el mismo patrón visual premium del resto del admin."
        isEditing={isCtaEditing}
        onEdit={() => {
          setCtaDraft(structuredClone(content.cta));
          setIsCtaEditing(true);
        }}
        onCancel={() => {
          setCtaDraft(structuredClone(content.cta));
          setIsCtaEditing(false);
        }}
        onSave={async () => {
          if (!ctaDraft) return;
          await applyAndPersist({
            ...content,
            cta: structuredClone(ctaDraft),
            updatedAt: new Date().toISOString(),
          });
          setIsCtaEditing(false);
        }}
        preview={<ContactPreview section="cta" content={ctaDraft ?? content.cta} />}
      >
        {ctaDraft ? (
          <div className="space-y-5">
            <SectionShell title="Encabezado">
              <Field
                label="Badge"
                value={ctaDraft.badge}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, badge: value } : c))}
              />
              <Field
                label="Título blanco"
                value={ctaDraft.titleWhite}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, titleWhite: value } : c))}
              />
              <Field
                label="Título dorado"
                value={ctaDraft.titleGold}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, titleGold: value } : c))}
              />
              <TextAreaField
                label="Descripción"
                value={ctaDraft.description}
                onChange={(value) => setCtaDraft((c) => (c ? { ...c, description: value } : c))}
              />
            </SectionShell>

            <SectionShell title="Botones">
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Texto botón principal"
                  value={ctaDraft.primaryButtonText}
                  onChange={(value) =>
                    setCtaDraft((c) => (c ? { ...c, primaryButtonText: value } : c))
                  }
                />
                <Field
                  label="Link botón principal"
                  value={ctaDraft.primaryButtonLink}
                  onChange={(value) =>
                    setCtaDraft((c) => (c ? { ...c, primaryButtonLink: value } : c))
                  }
                />
                <Field
                  label="Texto botón secundario"
                  value={ctaDraft.secondaryButtonText}
                  onChange={(value) =>
                    setCtaDraft((c) => (c ? { ...c, secondaryButtonText: value } : c))
                  }
                />
                <Field
                  label="Link botón secundario"
                  value={ctaDraft.secondaryButtonLink}
                  onChange={(value) =>
                    setCtaDraft((c) => (c ? { ...c, secondaryButtonLink: value } : c))
                  }
                />
              </div>
            </SectionShell>
          </div>
        ) : null}
      </InlineEditorShell>

      <section className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 text-sm leading-7 text-slate-600">
        <p className="font-semibold text-[#142033]">Estado actual del módulo</p>
        <p className="mt-2">
          Este panel de Contacto ya quedó con la misma base visual que Home,
          Desarrollo y Servicios: resumen superior, previews grandes, edición
          inline por sección y guardado exclusivo por API conectado a Neon
          local.
        </p>
      </section>
    </div>
  );
}