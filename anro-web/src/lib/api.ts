import { authStorage } from "@/lib/auth-storage";
import { AuthResponse, PodcastEpisode, PodcastEpisodePayload, PodcastStatus } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (options.auth) {
    const session = authStorage.get();
    if (session?.token) {
      headers.set("Authorization", `Bearer ${session.token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || "No fue posible completar la solicitud.";
    throw new ApiError(message, response.status);
  }

  return data as T;
}

export const adminApi = {
  login(email: string, password: string) {
    return request<AuthResponse>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  me() {
    return request<AuthResponse["admin"]>("/admin/auth/me", {
      auth: true,
    });
  },
};

export const podcastAdminApi = {
  list() {
    return request<PodcastEpisode[]>("/admin/podcast", { auth: true });
  },
  create(payload: PodcastEpisodePayload) {
    return request<PodcastEpisode>("/admin/podcast", {
      method: "POST",
      auth: true,
      body: JSON.stringify(payload),
    });
  },
  update(id: string, payload: PodcastEpisodePayload) {
    return request<PodcastEpisode>(`/admin/podcast/${id}`, {
      method: "PUT",
      auth: true,
      body: JSON.stringify(payload),
    });
  },
  remove(id: string) {
    return request<{ message: string }>(`/admin/podcast/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
  updateStatus(id: string, status: PodcastStatus) {
    return request<PodcastEpisode>(`/admin/podcast/${id}/status`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify({ status }),
    });
  },
  toggleFeatured(id: string, isFeatured: boolean) {
    return request<PodcastEpisode>(`/admin/podcast/${id}/feature`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify({ isFeatured }),
    });
  },
};

export { API_URL, ApiError };
