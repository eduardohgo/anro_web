"use client";

import { adminApi } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => searchParams.get("next") || "/admin/podcast", [searchParams]);
  const expired = searchParams.get("expired") === "1";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await adminApi.login(email, password);
      authStorage.set(response);
      router.replace(nextPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No fue posible iniciar sesión.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-[radial-gradient(circle_at_top,#1f2937_0%,#0f172a_50%,#020617_100%)] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden px-10 py-16 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,166,42,0.16),transparent_45%,rgba(15,23,42,0.5))]" />
        <div className="relative max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f3dfb7]">ANRO Podcast Admin</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white">Gestiona episodios, estados y destacados desde un panel administrativo seguro.</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">Acceso exclusivo para administradores creados previamente en la base de datos. No existe registro público abierto.</p>
        </div>
        <div className="relative rounded-[32px] border border-white/10 bg-white/8 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-[#d4a62a]">Incluye</p>
          <ul className="mt-5 space-y-4 text-base text-slate-200">
            <li>• Control de episodios publicados, borradores y archivados.</li>
            <li>• Edición del contenido completo del episodio y enlaces externos.</li>
            <li>• Gestión de episodios destacados para el frontend público.</li>
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-14 sm:px-10">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white p-8 shadow-[0_30px_80px_rgba(2,6,23,0.35)] sm:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a87810]">Acceso administrativo</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Iniciar sesión</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Ingresa con tu cuenta de administrador para gestionar el módulo Podcast de ANRO.</p>
          </div>

          {expired && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Tu sesión venció o ya no es válida. Inicia sesión nuevamente.
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Correo administrador</span>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-[#d4a62a] focus-within:bg-white">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none"
                  placeholder="admin@anro.mx"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Contraseña</span>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-[#d4a62a] focus-within:bg-white">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-900 outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-slate-500 transition hover:text-slate-800"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#d4a62a] px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-[#be931f] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Ingresando..." : "Entrar al panel"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
            Acceso solo para administradores autorizados. El alta inicial debe mantenerse mediante seed o procesos internos del backend.
          </div>
        </div>
      </section>
    </div>
  );
}