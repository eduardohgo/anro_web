import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
