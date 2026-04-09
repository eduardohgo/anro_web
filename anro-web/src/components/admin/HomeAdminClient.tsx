"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { DEFAULT_HOME_CONTENT, HomeContentConfig, resolveHomeContent } from "@/lib/home-content";

export default function HomeAdminClient() {
  const [config, setConfig] = useState<HomeContentConfig>(DEFAULT_HOME_CONTENT);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/home", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as unknown;
        if (!mounted) return;
        setConfig(resolveHomeContent(payload));
      } catch (error) {
        console.error("No fue posible cargar Home desde la API.", error);
      }
    };

    void loadContent();

    return () => {
      mounted = false;
    };
  }, []);

  const saveChanges = async () => {
    const next = { ...config, updatedAt: new Date().toISOString() };

    try {
      const response = await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });

      if (!response.ok) {
        throw new Error("No fue posible guardar Home desde este editor rápido.");
      }

      const payload = (await response.json()) as unknown;
      setConfig(resolveHomeContent(payload));
    } catch (error) {
      console.error("No fue posible guardar Home en Neon.", error);
    }
  };

  return (
    <div className="space-y-4 rounded-2xl border border-[#e4dbcf] bg-white p-6">
      <h2 className="text-2xl font-semibold text-[#132035]">Editor rápido Home</h2>
      <p className="text-sm text-slate-600">Este componente se mantiene por compatibilidad. El editor principal está en /admin/home.</p>
      <label className="grid gap-1 text-sm">
        <span>Título de CTA final</span>
        <input
          value={config.ctaSection.title}
          onChange={(event) => setConfig({ ...config, ctaSection: { ...config.ctaSection, title: event.target.value } })}
          className="rounded-xl border border-[#ddd1bc] px-3 py-2"
        />
      </label>
      <button type="button" onClick={saveChanges} className="inline-flex items-center gap-2 rounded-xl bg-[#d4a62a] px-4 py-2 text-sm font-semibold text-[#111d31]">
        <Save className="h-4 w-4" /> Guardar cambios
      </button>
    </div>
  );
}
