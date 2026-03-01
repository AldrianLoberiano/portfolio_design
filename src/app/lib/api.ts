import { projectId, publicAnonKey } from "/utils/supabase/info";

// ─────────────────────────────────────────────────────────────
// API CLIENT — Centralized fetch with caching, retry, errors
// ─────────────────────────────────────────────────────────────

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-fcdd5d30`;

// ── In-memory cache with TTL ──
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry<any>>();

const DEFAULT_TTL = 60_000; // 1 minute
const LONG_TTL = 300_000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache<T>(key: string, data: T, ttl = DEFAULT_TTL): void {
  cache.set(key, { data, timestamp: Date.now(), ttl });
}

export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

// ── Retry with exponential backoff ──
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 2,
  delay = 500
): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
      });

      // Don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Retry server errors (5xx)
      if (!response.ok && attempt < retries) {
        await new Promise((r) => setTimeout(r, delay * Math.pow(2, attempt)));
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((r) => setTimeout(r, delay * Math.pow(2, attempt)));
    }
  }
  throw new Error("Max retries reached");
}

// ── Generic request helpers ──
async function apiGet<T>(path: string, useCache = true, ttl = DEFAULT_TTL): Promise<T> {
  const cacheKey = `GET:${path}`;

  if (useCache) {
    const cached = getCached<T>(cacheKey);
    if (cached) return cached;
  }

  const response = await fetchWithRetry(`${BASE_URL}${path}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new ApiError(
      errorBody.error || `Request failed: ${response.status}`,
      response.status,
      errorBody
    );
  }

  const data = await response.json();
  if (useCache) setCache(cacheKey, data, ttl);
  return data;
}

async function apiPost<T>(path: string, body: any): Promise<T> {
  const response = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data.error || `Request failed: ${response.status}`, response.status, data);
  }
  return data;
}

async function apiPut<T>(path: string, body: any): Promise<T> {
  const response = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data.error || `Request failed: ${response.status}`, response.status, data);
  }
  return data;
}

async function apiDelete<T>(path: string): Promise<T> {
  const response = await fetchWithRetry(`${BASE_URL}${path}`, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new ApiError(data.error || `Request failed: ${response.status}`, response.status, data);
  }
  return data;
}

// ── Custom error class ──
export class ApiError extends Error {
  status: number;
  body: any;

  constructor(message: string, status: number, body?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

// ─────────────────────────────────────────────────────────────
// PUBLIC API — Typed methods for each endpoint
// ─────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  year: string;
  client: string;
  role: string;
  duration: string;
  thumbnail: string;
  images: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  featured: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  order?: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  email: string;
  location: string;
  available: boolean;
  availableDate: string;
  social: {
    twitter: string;
    linkedin: string;
    dribbble: string;
    github: string;
  };
}

export interface SearchResult {
  type: "project" | "testimonial";
  id: string;
  title: string;
  subtitle: string;
  category: string;
  url: string;
  thumbnail?: string;
}

// ── Seed ──
export const seedDatabase = () =>
  apiPost<{ message: string; seeded: boolean }>("/admin/seed", {});

// ── Projects ──
export const getProjects = (params?: {
  category?: string;
  q?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.category && params.category !== "All") searchParams.set("category", params.category);
  if (params?.q) searchParams.set("q", params.q);
  if (params?.featured) searchParams.set("featured", "true");
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());
  const qs = searchParams.toString();
  return apiGet<{
    projects: Project[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
    categories: string[];
  }>(`/projects${qs ? `?${qs}` : ""}`, true, DEFAULT_TTL);
};

export const getProject = (slug: string) =>
  apiGet<{
    project: Project;
    nextProject: { slug: string; title: string; subtitle: string } | null;
    prevProject: { slug: string; title: string; subtitle: string } | null;
  }>(`/projects/${slug}`, true, LONG_TTL);

export const createProject = (project: Partial<Project>) => {
  invalidateCache("projects");
  return apiPost<{ project: Project }>("/projects", project);
};

export const updateProject = (slug: string, updates: Partial<Project>) => {
  invalidateCache("projects");
  invalidateCache(slug);
  return apiPut<{ project: Project }>(`/projects/${slug}`, updates);
};

export const deleteProject = (slug: string) => {
  invalidateCache("projects");
  invalidateCache(slug);
  return apiDelete<{ message: string }>(`/projects/${slug}`);
};

export const trackProjectView = (slug: string) =>
  apiPost<{ views: number }>(`/projects/${slug}/view`, {});

// ── Contact ──
export const submitContact = (data: {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  service?: string;
  message: string;
}) => apiPost<{ message: string; id: string }>("/contact", data);

export const getContactSubmissions = (status?: string) =>
  apiGet<{
    submissions: ContactSubmission[];
    total: number;
    statusCounts: Record<string, number>;
  }>(`/contact/submissions${status ? `?status=${status}` : ""}`, false);

export const updateContactStatus = (id: string, status: string) =>
  apiPut<{ message: string }>(`/contact/${id}/status`, { status });

// ── Testimonials ──
export const getTestimonials = () =>
  apiGet<{ testimonials: Testimonial[] }>("/testimonials", true, LONG_TTL);

export const createTestimonial = (data: Partial<Testimonial>) => {
  invalidateCache("testimonials");
  return apiPost<{ testimonial: Testimonial }>("/testimonials", data);
};

export const deleteTestimonial = (id: string) => {
  invalidateCache("testimonials");
  return apiDelete<{ message: string }>(`/testimonials/${id}`);
};

// ── Settings ──
export const getSettings = () =>
  apiGet<{ settings: SiteSettings | null }>("/settings", true, LONG_TTL);

export const updateSettings = (data: Partial<SiteSettings>) => {
  invalidateCache("settings");
  return apiPut<{ settings: SiteSettings }>("/settings", data);
};

// ── Search ──
export const searchContent = (query: string) =>
  apiGet<{ results: SearchResult[]; query: string; total: number }>(
    `/search?q=${encodeURIComponent(query)}`,
    true,
    30_000 // 30 second cache for search
  );

// ── Analytics ──
export const getAnalytics = () =>
  apiGet<{
    totalProjects: number;
    totalViews: number;
    totalSubmissions: number;
    viewsByProject: any[];
  }>("/admin/analytics", false);
