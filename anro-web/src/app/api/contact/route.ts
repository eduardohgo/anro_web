import { NextResponse } from "next/server";

type ContactRequestBody = {
  nombre?: string;
  telefono?: string;
  correo?: string;
  motivo?: string;
  mensaje?: string;
  aceptaContacto?: boolean;
};

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;

    const nombre = body.nombre?.trim() || "";
    const telefono = body.telefono?.trim() || "";
    const correo = body.correo?.trim() || "";
    const motivo = body.motivo?.trim() || "";
    const mensaje = body.mensaje?.trim() || "";
    const aceptaContacto = Boolean(body.aceptaContacto);

    if (!nombre) {
      return NextResponse.json(
        { ok: false, message: "El nombre es obligatorio." },
        { status: 400 },
      );
    }

    if (!correo || !isValidEmail(correo)) {
      return NextResponse.json(
        { ok: false, message: "El correo es obligatorio y debe ser válido." },
        { status: 400 },
      );
    }

    if (!motivo) {
      return NextResponse.json(
        { ok: false, message: "El motivo de contacto es obligatorio." },
        { status: 400 },
      );
    }

    if (!mensaje) {
      return NextResponse.json(
        { ok: false, message: "El mensaje es obligatorio." },
        { status: 400 },
      );
    }

    if (!aceptaContacto) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Debes aceptar el contacto para poder enviar tu solicitud.",
        },
        { status: 400 },
      );
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
    const contactFromName = process.env.CONTACT_FROM_NAME;

    if (
      !brevoApiKey ||
      !contactToEmail ||
      !contactFromEmail ||
      !contactFromName
    ) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Configuración de correo incompleta. Revisa las variables de entorno.",
        },
        { status: 500 },
      );
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
        <h2 style="margin: 0 0 16px; color: #111827;">Nueva solicitud desde la web de ANRO</h2>
        <p style="margin: 0 0 8px;"><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p style="margin: 0 0 8px;"><strong>Correo:</strong> ${escapeHtml(correo)}</p>
        <p style="margin: 0 0 8px;"><strong>Teléfono:</strong> ${escapeHtml(telefono || "No proporcionado")}</p>
        <p style="margin: 0 0 8px;"><strong>Motivo:</strong> ${escapeHtml(motivo)}</p>
        <p style="margin: 16px 0 8px;"><strong>Mensaje:</strong></p>
        <p style="margin: 0 0 12px; white-space: pre-line;">${escapeHtml(mensaje)}</p>
        <p style="margin: 0;"><strong>Aceptó contacto:</strong> ${aceptaContacto ? "Sí" : "No"}</p>
      </div>
    `;

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          email: contactFromEmail,
          name: contactFromName,
        },
        to: [{ email: contactToEmail }],
        replyTo: {
          email: correo,
          name: nombre,
        },
        subject: "Nueva solicitud desde la web de ANRO",
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();

      return NextResponse.json(
        {
          ok: false,
          message: "No fue posible enviar el correo. Inténtalo nuevamente.",
          error: brevoError,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Tu solicitud fue enviada con éxito. Te responderemos pronto.",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Solicitud inválida. Verifica los datos e inténtalo nuevamente.",
      },
      { status: 400 },
    );
  }
}
