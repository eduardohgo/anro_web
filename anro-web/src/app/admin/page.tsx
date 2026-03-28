import { Activity, ArrowUpRight, BriefcaseBusiness, Building2, Headphones, Home, Mail, Users } from "lucide-react";
import Link from "next/link";

const MODULE_CARDS = [
  {
    title: "Podcast",
    description: "Administra episodios, destacados y estado de publicación.",
    href: "/admin/podcast",
    icon: Headphones,
    ready: true,
  },
  {
    title: "Home",
    description: "Configura contenido principal y bloques del inicio.",
    href: "/admin/home",
    icon: Home,
    ready: false,
  },
  {
    title: "Desarrollo",
    description: "Gestiona información y assets del desarrollo inmobiliario.",
    href: "/admin/desarrollo",
    icon: Building2,
    ready: false,
  },
  {
    title: "Servicios",
    description: "Edita secciones de servicios y contenidos de apoyo.",
    href: "/admin/servicios",
    icon: BriefcaseBusiness,
    ready: false,
  },
  {
    title: "Nosotros",
    description: "Controla historia, valores y equipo de ANRO.",
    href: "/admin/nosotros",
    icon: Users,
    ready: false,
  },
  {
    title: "Contacto",
    description: "Configura canales de contacto y mensajes institucionales.",
    href: "/admin/contacto",
    icon: Mail,
    ready: false,
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-[#24324a] bg-[radial-gradient(circle_at_top_left,rgba(212,166,42,0.15),transparent_32%),linear-gradient(135deg,#0e1c36_0%,#16305a_65%,#1f3f70_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(10,20,40,0.16)] md:px-9 md:py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f3d79a]">ANRO Admin</p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">Bienvenido al panel administrativo</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
          Este dashboard centraliza la gestión de todos los módulos. Usa el menú lateral para
          navegar sin perder el layout persistente.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard title="Módulos" value="6" hint="Preparados en el panel" />
        <InfoCard title="Activo" value="Podcast" hint="Módulo listo para operar" />
        <InfoCard title="Estado" value="Operativo" hint="Sesión admin validada" />
      </section>

      <section className="rounded-3xl border border-[#e0d8cb] bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.08)] md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b28425]">Acceso rápido</p>
            <h2 className="mt-3 text-2xl font-semibold text-[#132035]">Módulos del panel</h2>
          </div>
          <span className="hidden items-center gap-2 rounded-full bg-[#f5f0e4] px-4 py-1.5 text-xs font-semibold text-[#9f7822] md:inline-flex">
            <Activity className="h-3.5 w-3.5" />
            Vista general
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODULE_CARDS.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.href}
                href={module.href}
                className="group rounded-2xl border border-[#ece3d6] bg-[#fffdfa] p-5 transition hover:-translate-y-0.5 hover:border-[#d5c2a0] hover:shadow-[0_16px_35px_rgba(15,23,42,0.09)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2e7ce] text-[#8f6717]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
                      module.ready
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600",
                    ].join(" ")}
                  >
                    {module.ready ? "Listo" : "En preparación"}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-[#132035]">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9d7520]">
                  Abrir módulo
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-[#e4dbcf] bg-[#fffdf9] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#aa7f28]">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-[#142033]">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{hint}</p>
    </article>
  );
}
