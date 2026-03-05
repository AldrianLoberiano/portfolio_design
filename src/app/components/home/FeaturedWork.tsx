import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "../shared/SectionHeader";
import { ProjectCard } from "../shared/ProjectCard";
import { getFeaturedProjects } from "../../data/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <SectionHeader
            label="Selected Work"
            title="Projects that define my craft"
            description="A curated selection of recent projects spanning product design, branding, and frontend engineering."
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
            >
              View all projects
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {isLoading && !data?.projects?.length
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
            : featured.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  variant={index === 0 ? "large" : "default"}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
