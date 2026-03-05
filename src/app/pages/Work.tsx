import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { projects as staticProjects, categories as staticCategories } from "../data/projects";
import { ProjectCard } from "../components/shared/ProjectCard";
import { ProjectCardSkeleton } from "../components/shared/LoadingSkeleton";
import { useApi } from "../hooks/useApi";
import { getProjects } from "../lib/api";

export function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => setDebouncedSearch(value), 300);
    setDebounceTimer(timer);
  };

  // Fetch from API with static data as fallback
  const { data, isLoading, error } = useApi(
    () =>
      getProjects({
        category: activeCategory !== "All" ? activeCategory : undefined,
        q: debouncedSearch || undefined,
      }),
    [activeCategory, debouncedSearch],
    {
      fallback: {
        projects: staticProjects,
        pagination: { page: 1, limit: 50, total: staticProjects.length, totalPages: 1 },
        categories: [...staticCategories],
      },
    }
  );

  const categories = data?.categories?.length ? data.categories : [...staticCategories];

  // Always use static data as the source of truth for project content.
  // The API may have stale data (old slugs/titles), so we apply client-side filtering
  // over staticProjects to ensure the displayed content is always up to date.
  const filteredProjects = staticProjects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      !debouncedSearch ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-white/40 uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
          >
            Portfolio
          </p>
          <h1
            className="text-white tracking-[-0.03em]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Selected Work
          </h1>
          <p
            className="mt-4 text-white/40 max-w-xl"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}
          >
            A collection of projects spanning product design, brand identity,
            web development, and creative direction.
          </p>
        </motion.div>

        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 space-y-4"
        >
          {/* Search Input */}
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearch("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white text-[#0a0a0a] border-white"
                    : "bg-transparent text-white/50 border-white/10 hover:border-white/20 hover:text-white/70"
                }`}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 400 }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        {(debouncedSearch || activeCategory !== "All") && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-white/30"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
          >
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
            {debouncedSearch && (
              <span>
                {" "}for "{debouncedSearch}"
              </span>
            )}
          </motion.p>
        )}

        {/* Projects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {isLoading && !filteredProjects.length
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
            : filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
        </div>

        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center"
          >
            <p
              className="text-white/30"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem" }}
            >
              No projects found
              {debouncedSearch ? ` matching "${debouncedSearch}"` : " in this category"}.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setDebouncedSearch("");
              }}
              className="mt-4 text-white/50 hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Error notice (non-blocking since we have fallback) */}
        {error && (
          <p
            className="mt-4 text-amber-400/60 text-center"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}
          >
            Using cached data — live connection unavailable
          </p>
        )}
      </div>
    </div>
  );
}
