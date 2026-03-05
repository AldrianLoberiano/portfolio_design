import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Heart } from "lucide-react";
import type { Project } from "../../lib/api";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "large" | "default";
}

export function ProjectCard({
  project,
  index,
  variant = "default",
}: ProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="group block"
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-white/5 ${
            variant === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          {project.category === "Mobile" ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#1a1a2e]">
              <div className="relative h-[88%] aspect-[9/19.5] bg-[#0d0d0d] rounded-[2rem] border-2 border-white/15 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.7)] transition-transform duration-700 group-hover:scale-105">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[28%] h-[13px] bg-black rounded-full z-10" />
                {/* Side buttons */}
                <div className="absolute -right-[3px] top-[22%] w-[3px] h-8 bg-white/10 rounded-l-sm" />
                <div className="absolute -left-[3px] top-[18%] w-[3px] h-6 bg-white/10 rounded-r-sm" />
                <div className="absolute -left-[3px] top-[27%] w-[3px] h-10 bg-white/10 rounded-r-sm" />
                <div className="absolute -left-[3px] top-[40%] w-[3px] h-10 bg-white/10 rounded-r-sm" />
                {/* Screen */}
                <ImageWithFallback
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          ) : project.thumbnailGradient ? (
            <div
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{ background: project.thumbnailGradient }}
            />
          ) : (
            <ImageWithFallback
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Like button */}
          <button
            onClick={handleLike}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
              isLiked
                ? "bg-red-500/90 text-white scale-110"
                : "bg-black/40 backdrop-blur-sm text-white/70 opacity-0 group-hover:opacity-100 hover:bg-black/60"
            }`}
            aria-label="Like project"
          >
            <Heart size={14} className={isLiked ? "fill-current" : ""} />
          </button>

          {/* Removed likes count display — no server-side like tracking */}

          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight size={18} className="text-[#0a0a0a]" />
          </div>
        </div>

        {/* Info */}
        <div className="mt-5">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-white/30"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span
              className="text-white/30"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
            >
              {project.year}
            </span>
          </div>
          <h3
            className="text-white group-hover:text-white/80 transition-colors duration-300"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", fontWeight: 600 }}
          >
            {project.title}
          </h3>
          <p
            className="mt-1 text-white/40"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
          >
            {project.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}