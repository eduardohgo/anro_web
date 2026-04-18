"use client";

import { authStorage } from "@/lib/auth-storage";
import { Headphones, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Inicio", icon: LayoutDashboard },
  { href: "/admin/podcast", label: "Podcast", icon: Headphones },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

interface AdminSidebarProps {
  adminName: string;
}

export default function AdminSidebar({ adminName }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authStorage.clear();
    router.replace("/login");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-full flex-col border-r border-[#d8ceb8] bg-[linear-gradient(180deg,#0d1b34_0%,#14284b_100%)] text-white shadow-[10px_0_40px_rgba(9,20,44,0.22)]">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e0bf77]">ANRO</p>
        <h1 className="mt-2 text-xl font-semibold">Panel Administrativo</h1>
        <p className="mt-3 text-xs text-slate-300">Sesión activa: {adminName}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                isActive
                  ? "bg-[#d4a62a] text-[#101a2e]"
                  : "text-slate-200 hover:bg-white/10 hover:text-white",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-white/15 px-3 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
