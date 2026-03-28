import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";

interface AdminModulePlaceholderProps {
  title: string;
  description: string;
}

export default function AdminModulePlaceholder({ title, description }: AdminModulePlaceholderProps) {
  return (
    <section className="rounded-3xl border border-[#e0d8cb] bg-white p-8 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#f4eee2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a741e]">
        <Clock3 className="h-3.5 w-3.5" />
        Próximamente
      </div>

      <h1 className="mt-5 text-3xl font-semibold text-[#142033]">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-8 rounded-2xl border border-dashed border-[#d7ccb7] bg-[#fbf8f3] p-5">
        <p className="text-sm text-slate-700">
          Este módulo está preparado dentro del nuevo panel administrativo y listo para conectar
          acciones CRUD cuando lo definas.
        </p>
      </div>

      <Link
        href="/admin"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#d4a62a] px-5 py-3 text-sm font-semibold text-[#132035] transition hover:bg-[#bf931d]"
      >
        Volver al dashboard
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
