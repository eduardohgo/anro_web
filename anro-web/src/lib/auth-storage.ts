import { AdminUser } from "@/lib/types";

const AUTH_STORAGE_KEY = "anro_admin_session";

export interface StoredSession {
  token: string;
  admin: AdminUser;
}

function isValidSession(value: unknown): value is StoredSession {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<StoredSession>;

  return (
    typeof session.token === "string" &&
    session.token.trim().length > 0 &&
    !!session.admin &&
    typeof session.admin === "object" &&
    typeof session.admin.id === "string" &&
    typeof session.admin.role === "string"
  );
}

export const authStorage = {
  get(): StoredSession | null {
    if (typeof window === "undefined") return null;

    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);
      if (!isValidSession(parsed)) {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
      }

      return parsed;
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
