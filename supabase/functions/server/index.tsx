import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { seedData } from "./seed.tsx";

const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  })
);

// ─────────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────────
app.get("/make-server-fcdd5d30/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─────────────────────────────────────────────────────────────
// SEED DATA — Idempotent initial data population
// ─────────────────────────────────────────────────────────────
app.post("/make-server-fcdd5d30/admin/seed", async (c) => {
  try {
    const existing = await kv.get("meta:seeded");
    if (existing) {
      return c.json({ message: "Data already seeded", seeded: true });
    }
    await seedData();
    await kv.set("meta:seeded", { seededAt: new Date().toISOString() });
    return c.json({ message: "Seed data created successfully", seeded: true });
  } catch (error) {
    console.log(`Error seeding data: ${error}`);
    return c.json(
      { error: `Failed to seed data: ${error}` },
      500
    );
  }
});

// ─────────────────────────────────────────────────────────────
// PROJECTS — Full CRUD with filtering, search, pagination
// ─────────────────────────────────────────────────────────────

// GET /projects — List projects with optional filters
app.get("/make-server-fcdd5d30/projects", async (c) => {
  try {
    const category = c.req.query("category");
    const search = c.req.query("q");
    const featured = c.req.query("featured");
    const page = parseInt(c.req.query("page") || "1");
    const limit = parseInt(c.req.query("limit") || "50");

    const allProjects: any[] = await kv.getByPrefix("project:");

    let filtered = allProjects
      .filter((p) => p && p.slug) // guard against nulls
      .sort((a, b) => {
        // Sort by year descending, then by order
        if (b.year !== a.year) return b.year.localeCompare(a.year);
        return (a.order || 0) - (b.order || 0);
      });

    // Category filter
    if (category && category !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Featured filter
    if (featured === "true") {
      filtered = filtered.filter((p) => p.featured === true);
    }

    // Full-text search across title, subtitle, description, tags, category
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    // Extract dynamic categories from data
    const categories = [
      "All",
      ...Array.from(new Set(allProjects.map((p) => p.category))),
    ];

    return c.json({
      projects: paginated,
      pagination: { page, limit, total, totalPages },
      categories,
    });
  } catch (error) {
    console.log(`Error fetching projects: ${error}`);
    return c.json({ error: `Failed to fetch projects: ${error}` }, 500);
  }
});

// GET /projects/:slug — Single project
app.get("/make-server-fcdd5d30/projects/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const project = await kv.get(`project:${slug}`);

    if (!project) {
      return c.json({ error: `Project not found: ${slug}` }, 404);
    }

    // Get all projects for next/prev navigation
    const allProjects: any[] = await kv.getByPrefix("project:");
    const sorted = allProjects
      .filter((p) => p && p.slug)
      .sort((a, b) => {
        if (b.year !== a.year) return b.year.localeCompare(a.year);
        return (a.order || 0) - (b.order || 0);
      });

    const currentIndex = sorted.findIndex((p) => p.slug === slug);
    const nextProject =
      currentIndex >= 0
        ? sorted[(currentIndex + 1) % sorted.length]
        : null;
    const prevProject =
      currentIndex > 0
        ? sorted[currentIndex - 1]
        : sorted[sorted.length - 1];

    return c.json({
      project,
      nextProject: nextProject
        ? { slug: nextProject.slug, title: nextProject.title, subtitle: nextProject.subtitle }
        : null,
      prevProject: prevProject
        ? { slug: prevProject.slug, title: prevProject.title, subtitle: prevProject.subtitle }
        : null,
    });
  } catch (error) {
    console.log(`Error fetching project ${c.req.param("slug")}: ${error}`);
    return c.json({ error: `Failed to fetch project: ${error}` }, 500);
  }
});

// POST /projects — Create project
app.post("/make-server-fcdd5d30/projects", async (c) => {
  try {
    const body = await c.req.json();
    const { title, slug, subtitle, category, tags, year, client, role, duration, thumbnail, images, description, challenge, solution, results, featured } = body;

    if (!title || !slug) {
      return c.json({ error: "Title and slug are required" }, 400);
    }

    // Check for duplicate slug
    const existing = await kv.get(`project:${slug}`);
    if (existing) {
      return c.json({ error: `Project with slug "${slug}" already exists` }, 409);
    }

    const project = {
      id: crypto.randomUUID(),
      slug,
      title,
      subtitle: subtitle || "",
      category: category || "Web Design",
      tags: tags || [],
      year: year || new Date().getFullYear().toString(),
      client: client || "",
      role: role || "",
      duration: duration || "",
      thumbnail: thumbnail || "",
      images: images || [],
      description: description || "",
      challenge: challenge || "",
      solution: solution || "",
      results: results || [],
      featured: featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${slug}`, project);

    return c.json({ project }, 201);
  } catch (error) {
    console.log(`Error creating project: ${error}`);
    return c.json({ error: `Failed to create project: ${error}` }, 500);
  }
});

// PUT /projects/:slug — Update project
app.put("/make-server-fcdd5d30/projects/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const existing = await kv.get(`project:${slug}`);

    if (!existing) {
      return c.json({ error: `Project not found: ${slug}` }, 404);
    }

    const updates = await c.req.json();
    const updated = {
      ...existing,
      ...updates,
      slug, // prevent slug changes
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`project:${slug}`, updated);

    return c.json({ project: updated });
  } catch (error) {
    console.log(`Error updating project ${c.req.param("slug")}: ${error}`);
    return c.json({ error: `Failed to update project: ${error}` }, 500);
  }
});

// DELETE /projects/:slug — Delete project
app.delete("/make-server-fcdd5d30/projects/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const existing = await kv.get(`project:${slug}`);

    if (!existing) {
      return c.json({ error: `Project not found: ${slug}` }, 404);
    }

    await kv.del(`project:${slug}`);
    await kv.del(`views:${slug}`);

    return c.json({ message: `Project "${slug}" deleted` });
  } catch (error) {
    console.log(`Error deleting project ${c.req.param("slug")}: ${error}`);
    return c.json({ error: `Failed to delete project: ${error}` }, 500);
  }
});

// POST /projects/:slug/view — Track project view
app.post("/make-server-fcdd5d30/projects/:slug/view", async (c) => {
  try {
    const slug = c.req.param("slug");
    const current = (await kv.get(`views:${slug}`)) || { count: 0 };
    await kv.set(`views:${slug}`, {
      count: current.count + 1,
      lastViewed: new Date().toISOString(),
    });
    return c.json({ views: current.count + 1 });
  } catch (error) {
    console.log(`Error tracking view for ${c.req.param("slug")}: ${error}`);
    return c.json({ error: `Failed to track view: ${error}` }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// CONTACT SUBMISSIONS
// ─────────────────────────────────────────────────────────────

// POST /contact — Submit contact form
app.post("/make-server-fcdd5d30/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, budget, service, message } = body;

    // Validation
    const errors: string[] = [];
    if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
    if (!message || message.trim().length < 10) errors.push("Message must be at least 10 characters");

    if (errors.length > 0) {
      return c.json({ error: "Validation failed", errors }, 400);
    }

    const id = crypto.randomUUID();
    const submission = {
      id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || "",
      budget: budget || "",
      service: service || "",
      message: message.trim(),
      status: "new", // new | read | replied | archived
      createdAt: new Date().toISOString(),
    };

    await kv.set(`contact:${id}`, submission);

    // Update submissions count
    const countData = (await kv.get("meta:contact_count")) || { count: 0 };
    await kv.set("meta:contact_count", { count: countData.count + 1 });

    return c.json({
      message: "Contact form submitted successfully",
      id,
    }, 201);
  } catch (error) {
    console.log(`Error submitting contact form: ${error}`);
    return c.json({ error: `Failed to submit contact form: ${error}` }, 500);
  }
});

// GET /contact/submissions — List contact submissions (admin)
app.get("/make-server-fcdd5d30/contact/submissions", async (c) => {
  try {
    const status = c.req.query("status");
    const allSubmissions: any[] = await kv.getByPrefix("contact:");

    let filtered = allSubmissions
      .filter((s) => s && s.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (status) {
      filtered = filtered.filter((s) => s.status === status);
    }

    return c.json({
      submissions: filtered,
      total: filtered.length,
      statusCounts: {
        new: filtered.filter((s) => s.status === "new").length,
        read: filtered.filter((s) => s.status === "read").length,
        replied: filtered.filter((s) => s.status === "replied").length,
        archived: filtered.filter((s) => s.status === "archived").length,
      },
    });
  } catch (error) {
    console.log(`Error fetching contact submissions: ${error}`);
    return c.json({ error: `Failed to fetch submissions: ${error}` }, 500);
  }
});

// PUT /contact/:id/status — Update submission status
app.put("/make-server-fcdd5d30/contact/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const { status } = await c.req.json();

    if (!["new", "read", "replied", "archived"].includes(status)) {
      return c.json({ error: "Invalid status. Must be: new, read, replied, archived" }, 400);
    }

    const submission = await kv.get(`contact:${id}`);
    if (!submission) {
      return c.json({ error: `Submission not found: ${id}` }, 404);
    }

    await kv.set(`contact:${id}`, { ...submission, status, updatedAt: new Date().toISOString() });

    return c.json({ message: "Status updated", status });
  } catch (error) {
    console.log(`Error updating contact status: ${error}`);
    return c.json({ error: `Failed to update status: ${error}` }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────

// GET /testimonials — List all testimonials
app.get("/make-server-fcdd5d30/testimonials", async (c) => {
  try {
    const allTestimonials: any[] = await kv.getByPrefix("testimonial:");
    const sorted = allTestimonials
      .filter((t) => t && t.id)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return c.json({ testimonials: sorted });
  } catch (error) {
    console.log(`Error fetching testimonials: ${error}`);
    return c.json({ error: `Failed to fetch testimonials: ${error}` }, 500);
  }
});

// POST /testimonials — Create testimonial
app.post("/make-server-fcdd5d30/testimonials", async (c) => {
  try {
    const body = await c.req.json();
    const { name, role, company, quote } = body;

    if (!name || !quote) {
      return c.json({ error: "Name and quote are required" }, 400);
    }

    const id = crypto.randomUUID();
    const testimonial = {
      id,
      name,
      role: role || "",
      company: company || "",
      quote,
      avatar: name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
      order: Date.now(),
      createdAt: new Date().toISOString(),
    };

    await kv.set(`testimonial:${id}`, testimonial);

    return c.json({ testimonial }, 201);
  } catch (error) {
    console.log(`Error creating testimonial: ${error}`);
    return c.json({ error: `Failed to create testimonial: ${error}` }, 500);
  }
});

// DELETE /testimonials/:id — Delete testimonial
app.delete("/make-server-fcdd5d30/testimonials/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`testimonial:${id}`);
    return c.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.log(`Error deleting testimonial: ${error}`);
    return c.json({ error: `Failed to delete testimonial: ${error}` }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────────────────────

// GET /settings — Get site settings
app.get("/make-server-fcdd5d30/settings", async (c) => {
  try {
    const settings = await kv.get("settings:site");
    return c.json({ settings: settings || null });
  } catch (error) {
    console.log(`Error fetching settings: ${error}`);
    return c.json({ error: `Failed to fetch settings: ${error}` }, 500);
  }
});

// PUT /settings — Update site settings
app.put("/make-server-fcdd5d30/settings", async (c) => {
  try {
    const body = await c.req.json();
    const current = (await kv.get("settings:site")) || {};
    const updated = { ...current, ...body, updatedAt: new Date().toISOString() };
    await kv.set("settings:site", updated);
    return c.json({ settings: updated });
  } catch (error) {
    console.log(`Error updating settings: ${error}`);
    return c.json({ error: `Failed to update settings: ${error}` }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// SEARCH — Global search across all content
// ─────────────────────────────────────────────────────────────

app.get("/make-server-fcdd5d30/search", async (c) => {
  try {
    const query = c.req.query("q");
    if (!query || query.trim().length < 2) {
      return c.json({ results: [], query: query || "" });
    }

    const q = query.toLowerCase().trim();
    const results: any[] = [];

    // Search projects
    const projects: any[] = await kv.getByPrefix("project:");
    for (const p of projects) {
      if (!p || !p.slug) continue;
      const searchable = [p.title, p.subtitle, p.description, p.category, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();

      if (searchable.includes(q)) {
        results.push({
          type: "project",
          id: p.slug,
          title: p.title,
          subtitle: p.subtitle,
          category: p.category,
          url: `/work/${p.slug}`,
          thumbnail: p.thumbnail,
          relevance: searchable.indexOf(q), // lower = more relevant
        });
      }
    }

    // Search testimonials
    const testimonials: any[] = await kv.getByPrefix("testimonial:");
    for (const t of testimonials) {
      if (!t || !t.id) continue;
      const searchable = [t.name, t.company, t.quote].join(" ").toLowerCase();

      if (searchable.includes(q)) {
        results.push({
          type: "testimonial",
          id: t.id,
          title: t.name,
          subtitle: `${t.role}, ${t.company}`,
          category: "Testimonial",
          url: "/#testimonials",
          relevance: searchable.indexOf(q),
        });
      }
    }

    // Sort by relevance (lower index = more relevant)
    results.sort((a, b) => a.relevance - b.relevance);

    return c.json({ results, query, total: results.length });
  } catch (error) {
    console.log(`Error searching: ${error}`);
    return c.json({ error: `Search failed: ${error}` }, 500);
  }
});

// ─────────────────────────────────────────────────────────────
// ANALYTICS — View counts and stats
// ─────────────────────────────────────────────────────────────

app.get("/make-server-fcdd5d30/admin/analytics", async (c) => {
  try {
    const views: any[] = await kv.getByPrefix("views:");
    const contactCount = (await kv.get("meta:contact_count")) || { count: 0 };
    const projects: any[] = await kv.getByPrefix("project:");

    const totalViews = views.reduce((sum, v) => sum + (v?.count || 0), 0);

    return c.json({
      totalProjects: projects.filter((p) => p && p.slug).length,
      totalViews,
      totalSubmissions: contactCount.count,
      viewsByProject: views,
    });
  } catch (error) {
    console.log(`Error fetching analytics: ${error}`);
    return c.json({ error: `Failed to fetch analytics: ${error}` }, 500);
  }
});

Deno.serve(app.fetch);
