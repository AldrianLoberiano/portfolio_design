import { motion } from "motion/react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""}`}>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className={`uppercase tracking-[0.2em] mb-4 ${
            light ? "text-[#0a0a0a]/40" : "text-white/40"
          }`}
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${
          light ? "text-[#0a0a0a]" : "text-white"
        } tracking-[-0.03em] ${
          align === "center" ? "max-w-2xl mx-auto" : ""
        }`}
        style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-4 ${
            light ? "text-[#0a0a0a]/60" : "text-white/50"
          } ${align === "center" ? "max-w-xl mx-auto" : "max-w-xl"}`}
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
