import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span
            className="text-white/60"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
          >
            Available for new projects
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white tracking-[-0.04em]"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Design engineer
          <br />
          <span className="text-white/30">crafting digital</span>
          <br />
          experiences
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 text-white/40 max-w-lg mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          I design and build premium digital products for startups and
          established brands. Focused on aesthetics, performance, and user
          delight.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/work"
            className="px-8 py-3.5 bg-white text-[#0a0a0a] rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
          >
            View Selected Work
          </Link>
          <Link
            to="/about"
            className="px-8 py-3.5 border border-white/15 text-white rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/25"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 400 }}
          >
            About Me
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
