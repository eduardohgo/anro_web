"use client";

import { adminApi, ApiError } from "@/lib/api";
import { authStorage } from "@/lib/auth-storage";
import { AdminUser } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminRouteProps {
  children: (session: { token: string; admin: AdminUser }) => React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState(() => authStorage.get());
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const currentSession = authStorage.get();

    if (!currentSession?.token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    let isMounted = true;

    adminApi
      .me()
      .then((admin) => {
        if (!isMounted) return;
        const nextSession = { token: currentSession.token, admin };
        authStorage.set(nextSession);
        setSession(nextSession);
        setIsChecking(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          authStorage.clear();
          router.replace("/login?expired=1");
          return;
        }

        setIsChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (isChecking || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f172a] px-6 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#d4a62a]">ANRO Admin</p>
          <h1 className="mt-3 text-2xl font-semibold">Validando sesión...</h1>
          <p className="mt-3 text-sm text-slate-300">Estamos verificando tus credenciales de administrador.</p>
        </div>
      </div>
    );
  }

  return <>{children(session)}</>;
}