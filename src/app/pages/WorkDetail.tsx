import { useParams, Link, Navigate } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Clock, User, Wrench } from "lucide-react";
import { getProjectBySlug, projects as staticProjects } from "../data/projects";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProjectDetailSkeleton } from "../components/shared/LoadingSkeleton";
import { useApi } from "../hooks/useApi";
import { getProject, trackProjectView } from "../lib/api";

export function WorkDetail() {
  const { slug } = useParams();

  // Static fallback
  const staticProject = slug ? getProjectBySlug(slug) : undefined;
  const staticIndex = slug ? staticProjects.findIndex((p) => p.slug === slug) : -1;
  const staticNext = staticIndex >= 0 ? staticProjects[(staticIndex + 1) % staticProjects.length] : null;

  // API fetch — skip when static data covers everything already
  const { data, isLoading, error } = useApi(
    () => getProject(slug!),
    [slug],
    {
      enabled: !!slug && !staticProject,
      fallback: staticProject
        ? {
            project: staticProject,
            nextProject: staticNext
              ? { slug: staticNext.slug, title: staticNext.title, subtitle: staticNext.subtitle }
              : null,
            prevProject: null,
          }
        : undefined,
    }
  );

  // When staticProject exists, API is disabled — use static directly to avoid stale data
  // from previous navigation bleeding through the data state.
  const project = staticProject
    ? staticProject
    : data?.project
      ? {
          ...data.project,
          thumbnailGradient: staticProject?.thumbnailGradient,
          designer: staticProject?.designer,
          tools: staticProject?.tools,
          thumbnail: data.project.thumbnail || staticProject?.thumbnail || "",
          images: staticProject?.images ?? data.project.images,
        }
      : null;
  const nextProject = data?.nextProject || (staticNext ? { slug: staticNext.slug, title: staticNext.title, subtitle: staticNext.subtitle } : null);

  // Track view on mount
  useEffect(() => {
    if (slug) {
      trackProjectView(slug).catch(() => {
        // Silent fail for analytics
      });
    }
  }, [slug]);

  if (!isLoading && !project) {
    return <Navigate to="/work" replace />;
  }

  if (isLoading && !project) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) return null;

  return (
    <div className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 group"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            Back to Work
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full border border-white/10 text-white/50"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              {project.category}
            </span>
            <span
              className="text-white/30"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              {project.year}
            </span>
          </div>
          <h1
            className="text-white tracking-[-0.03em]"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>
          <p
            className="mt-4 text-white/40 max-w-2xl"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            {project.subtitle}
          </p>
        </motion.div>

        {/* Project Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-8"
        >
          <div className="flex items-center gap-3 text-white/40">
            <Clock size={16} />
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }} className="text-white/30">
                Duration
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }} className="text-white/60">
                {project.duration}
              </p>
            </div>
          </div>
          {project.designer && (
            <div className="flex items-center gap-3 text-white/40">
              <User size={16} />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }} className="text-white/30">
                  Designer
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }} className="text-white/60">
                  {project.designer}
                </p>
              </div>
            </div>
          )}
          {project.tools && project.tools.length > 0 && (
            <div className="flex items-center gap-3 text-white/40">
              <Wrench size={16} />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }} className="text-white/30">
                  Tools
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }} className="text-white/60">
                  {project.tools.join(" · ")}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`mt-12 rounded-2xl bg-white/5 overflow-hidden ${
            project.category === "Mobile"
              ? "flex items-center justify-center py-16"
              : ""
          }`}
        >
          {project.category === "Mobile" ? (
            <div className="relative bg-[#0d0d0d] rounded-[3rem] border-[3px] border-white/15 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)]" style={{ height: "520px", aspectRatio: "9/19.5" }}>
              {/* Dynamic Island */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-[28%] h-[15px] bg-black rounded-full z-10" />
              {/* Side buttons */}
              <div className="absolute -right-[4px] top-[22%] w-[4px] h-10 bg-white/10 rounded-l-sm" />
              <div className="absolute -left-[4px] top-[18%] w-[4px] h-7 bg-white/10 rounded-r-sm" />
              <div className="absolute -left-[4px] top-[27%] w-[4px] h-12 bg-white/10 rounded-r-sm" />
              <div className="absolute -left-[4px] top-[40%] w-[4px] h-12 bg-white/10 rounded-r-sm" />
              {/* Screen */}
              <ImageWithFallback
                src={project.images[0]}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : project.thumbnailGradient ? (
            <div className="w-full h-full" style={{ background: project.thumbnailGradient }} />
          ) : (
            <ImageWithFallback
              src={project.images[0]}
              alt={project.title}
              className="w-full h-auto"
            />
          )}
        </motion.div>

        {/* Content Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p
              className="text-white/30 uppercase tracking-[0.15em] mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
            >
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-white/50"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="lg:col-span-9 space-y-16">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Overview
              </h3>
              <p
                className="text-white/70"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                {project.description}
              </p>
            </motion.div>

            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                The Challenge
              </h3>
              <p
                className="text-white/70"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-4"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                The Solution
              </h3>
              <p
                className="text-white/70"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                {project.solution}
              </p>
            </motion.div>

            {/* Additional Images */}
            {project.images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {project.images.slice(1).map((image, i) =>
                  project.category === "Mobile" ? (
                    <div key={i} className="rounded-2xl bg-white/5 flex items-center justify-center py-12">
                      <div className="relative bg-[#0d0d0d] rounded-[2.5rem] border-[3px] border-white/15 overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.7)]" style={{ height: "420px", aspectRatio: "9/19.5" }}>
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[28%] h-[13px] bg-black rounded-full z-10" />
                        <ImageWithFallback
                          src={image}
                          alt={`${project.title} detail ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden aspect-[4/3] bg-white/5"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} detail ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </motion.div>
            )}

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-white/30 uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
              >
                Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.results.map((result, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-white/5 bg-white/[0.02]"
                  >
                    <p
                      className="text-white/70"
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                    >
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mt-32 pt-16 border-t border-white/5"
          >
            <p
              className="text-white/30 uppercase tracking-[0.15em] mb-6"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
            >
              Next Project
            </p>
            <Link
              to={`/work/${nextProject.slug}`}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div>
                <h3
                  className="text-white group-hover:text-white/70 transition-colors duration-300"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                    fontWeight: 600,
                  }}
                >
                  {nextProject.title}
                </h3>
                <p
                  className="mt-1 text-white/40"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem" }}
                >
                  {nextProject.subtitle}
                </p>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 flex-shrink-0">
                <ArrowUpRight
                  size={20}
                  className="text-white group-hover:text-[#0a0a0a] transition-colors duration-500"
                />
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
