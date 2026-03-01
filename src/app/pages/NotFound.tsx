import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <p
          className="text-white/10"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "clamp(6rem, 15vw, 12rem)",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          404
        </p>
        <h1
          className="text-white mt-4"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          Page not found
        </h1>
        <p
          className="mt-3 text-white/40 max-w-md mx-auto"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-white text-[#0a0a0a] rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] group"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
