import { motion } from "motion/react";

const words = [
  "Product Design",
  "Brand Identity",
  "Web Development",
  "Creative Direction",
  "Design Systems",
  "UI/UX",
  "Motion Design",
  "Strategy",
];

export function MarqueeText() {
  const repeated = [...words, ...words];

  return (
    <section className="py-12 border-t border-white/5 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-8 whitespace-nowrap"
      >
        {repeated.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-8"
          >
            <span
              className="text-white/10"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                fontWeight: 600,
              }}
            >
              {word}
            </span>
            <span className="w-2 h-2 rounded-full bg-white/10 flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
