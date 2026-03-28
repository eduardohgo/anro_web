"use client";

import AdminRoute from "@/components/admin/AdminRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { ReactNode } from "react";

interface AdminLayoutShellProps {
  children: ReactNode;
}

export default function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  return (
    <AdminRoute>
      {(session) => (
        <div className="min-h-screen bg-[linear-gradient(180deg,#faf6ef_0%,#f4efe6_100%)]">
          <div className="mx-auto grid min-h-screen max-w-[1680px] grid-cols-1 lg:grid-cols-[280px_1fr]">
            <AdminSidebar adminName={session.admin.name} />
            <main className="px-4 py-6 md:px-6 lg:px-8">{children}</main>
          </div>
        </div>
      )}
    </AdminRoute>
  );
}
