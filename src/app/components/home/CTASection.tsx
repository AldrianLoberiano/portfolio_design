import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-12 lg:p-20 text-center"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] -translate-y-1/2" />

          <div className="relative">
            <h2
              className="text-white tracking-[-0.03em]"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Have a project
              <br />
              in mind?
            </h2>
            <p
              className="mt-6 text-white/40 max-w-md mx-auto"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.7 }}
            >
              I'm currently taking on new projects. Let's create something
              extraordinary together.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0a0a0a] rounded-full transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] group"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
              >
                Start a Conversation
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <a
                href="mailto:loberianorian@gmail.com"
                className="text-white/40 hover:text-white transition-colors duration-300"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
              >
                loberianorian@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
