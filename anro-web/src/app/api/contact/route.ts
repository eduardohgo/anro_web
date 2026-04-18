import { NextResponse } from "next/server";

type ContactPayload = {
  nombre?: string;
  telefono?: string;
  correo?: string;
  motivo?: string;
  mensaje?: string;
  aceptaContacto?: boolean;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const validatePayload = (payload: ContactPayload) => {
  if (!payload.nombre?.trim()) return "El nombre es obligatorio.";
  if (!payload.correo?.trim()) return "El correo electrónico es obligatorio.";
  if (!emailRegex.test(payload.correo.trim())) {
    return "El correo electrónico no es válido.";
  }
  if (!payload.motivo?.trim()) return "El motivo de contacto es obligatorio.";
  if (!payload.mensaje?.trim()) return "El mensaje es obligatorio.";
  if (!payload.aceptaContacto) {
    return "Debes aceptar el contacto para enviar la solicitud.";
  }
  return null;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const error = validatePayload(body);

    if (error) {
      return NextResponse.json({ ok: false, message: error }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const fromName = process.env.CONTACT_FROM_NAME;

    if (!apiKey || !toEmail || !fromEmail || !fromName) {
      return NextResponse.json(
        {
          ok: false,
          message: "La configuración de correo no está completa en el servidor.",
        },
        { status: 500 }
      );
    }

    const nombre = body.nombre!.trim();
    const correo = body.correo!.trim();
    const telefono = body.telefono?.trim() || "No proporcionado";
    const motivo = body.motivo!.trim();
    const mensaje = body.mensaje!.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #221b18;">
        <h2 style="margin: 0 0 16px;">Nueva solicitud desde la web de ANRO</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; width: 180px;">Nombre</td>
              <td style="padding: 8px 0;">${escapeHtml(nombre)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Correo</td>
              <td style="padding: 8px 0;">${escapeHtml(correo)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Teléfono</td>
              <td style="padding: 8px 0;">${escapeHtml(telefono)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Motivo</td>
              <td style="padding: 8px 0;">${escapeHtml(motivo)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700;">Aceptó contacto</td>
              <td style="padding: 8px 0;">Sí</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Mensaje</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(mensaje)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: fromEmail,
          name: fromName,
        },
        to: [{ email: toEmail }],
        subject: "Nueva solicitud desde la web de ANRO",
        htmlContent,
        replyTo: {
          email: correo,
          name: nombre,
        },
      }),
    });

    if (!brevoResponse.ok) {
      const brevoError = await brevoResponse.text();
      console.error("Brevo error:", brevoError);
      return NextResponse.json(
        {
          ok: false,
          message: "No fue posible enviar tu solicitud en este momento.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Solicitud enviada correctamente. Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Ocurrió un error inesperado al procesar tu solicitud.",
      },
      { status: 500 }
    );
  }
}
