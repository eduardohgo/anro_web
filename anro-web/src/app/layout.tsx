import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "ANRO | Grupo Desarrollador y Constructor",
  description:
    "Desarrollo inmobiliario y construcción en Huejutla de Reyes, Hidalgo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <body className="antialiased bg-white text-gray-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
