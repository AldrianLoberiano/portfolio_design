import { motion } from "motion/react";
import { Layers, Palette, Code, Compass } from "lucide-react";
import { services } from "../../data/services";
import { SectionHeader } from "../shared/SectionHeader";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={24} />,
  Palette: <Palette size={24} />,
  Code: <Code size={24} />,
  Compass: <Compass size={24} />,
};

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="Services"
          title="What I bring to the table"
          description="End-to-end capabilities from strategic thinking to pixel-perfect execution."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                {iconMap[service.icon]}
              </div>
              <h3
                className="mt-5 text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.125rem", fontWeight: 600 }}
              >
                {service.title}
              </h3>
              <p
                className="mt-3 text-white/40"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.7 }}
              >
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-white/30"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
