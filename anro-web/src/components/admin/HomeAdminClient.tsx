"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DEFAULT_HOME_CONTENT,
  HomeContentConfig,
  fetchHomeContentFromApi,
  saveHomeContentToApi,
  saveHomeContentToStorage,
} from "@/lib/home-content";

export default function HomeAdminClient() {
  const [config, setConfig] = useState<HomeContentConfig>(DEFAULT_HOME_CONTENT);

  useEffect(() => {
    let mounted = true;

    const loadConfig = async () => {
      try {
        const content = await fetchHomeContentFromApi("/api/admin/home");
        if (mounted) {
          setConfig(content);
        }
      } catch (error) {
        console.error("No fue posible cargar Home en Editor rápido.", error);
      }
    };

    void loadConfig();

    return () => {
      mounted = false;
    };
  }, []);

  const saveChanges = async () => {
    const next = { ...config, updatedAt: new Date().toISOString() };
    setConfig(next);

    try {
      const saved = await saveHomeContentToApi(next, "/api/admin/home");
      setConfig(saved);
    } catch (error) {
      console.error("Fallo de guardado remoto, fallback local.", error);
      saveHomeContentToStorage(next);
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
