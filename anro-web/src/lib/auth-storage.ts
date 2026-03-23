import { AdminUser } from "@/lib/types";

const AUTH_STORAGE_KEY = "anro_admin_session";

export interface StoredSession {
  token: string;
  admin: AdminUser;
}

export const authStorage = {
  get(): StoredSession | null {
    if (typeof window === "undefined") return null;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StoredSession;
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  },
  set(session: StoredSession) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};