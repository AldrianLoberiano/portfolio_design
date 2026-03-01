import { motion } from "motion/react";
import { ArrowUpRight, MapPin, Mail } from "lucide-react";
import { skills, experiences } from "../data/services";
import { SectionHeader } from "../components/shared/SectionHeader";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CTASection } from "../components/home/CTASection";

const skillCategories = ["Design", "Development", "Strategy"];

const tools = [
  { name: "Figma", category: "Design" },
  { name: "VS Code", category: "Development" },
  { name: "Linear", category: "Management" },
  { name: "Notion", category: "Knowledge" },
  { name: "Arc", category: "Browser" },
  { name: "Raycast", category: "Productivity" },
  { name: "Warp", category: "Terminal" },
  { name: "Spotify", category: "Music" },
];

export function About() {
  return (
    <div className="pt-32 pb-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <p
              className="text-white/40 uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
            >
              About
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
              I design and build
              <br />
              <span className="text-white/30">things for the web</span>
            </h1>
            <div className="mt-8 space-y-5">
              <p
                className="text-white/60"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                I'm a design engineer based in San Francisco with 8+ years of
                experience crafting digital products for companies like Vercel,
                Stripe, and Airbnb. I sit at the intersection of design and
                engineering — equally comfortable in Figma as I am in a code
                editor.
              </p>
              <p
                className="text-white/60"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                My approach is rooted in restraint. I believe the best designs
                are invisible — they get out of the way and let the content
                shine. Every pixel, every interaction, every micro-decision
                should serve the user's goal.
              </p>
              <p
                className="text-white/60"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "1.0625rem", lineHeight: 1.8 }}
              >
                When I'm not designing, you'll find me exploring architecture,
                reading about cognitive science, or experimenting with
                generative art.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={16} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}>
                  San Francisco, CA
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <Mail size={16} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}>
                  hello@jdstudio.design
                </span>
              </div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-white/5">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1668262738576-642a950e8a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGNyZWF0aXZlJTIwZGlyZWN0b3J8ZW58MXx8fHwxNzcxMTc5NjA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Experience Section */}
        <section className="mt-32">
          <SectionHeader
            label="Experience"
            title="Where I've worked"
          />

          <div className="mt-12 space-y-0">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="py-8 border-b border-white/5 first:border-t grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
              >
                <div className="md:col-span-3">
                  <p
                    className="text-white/30"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
                  >
                    {exp.period}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <div className="flex items-center gap-3">
                    <h3
                      className="text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.125rem", fontWeight: 600 }}
                    >
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p
                    className="text-white/50 mt-1"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem" }}
                  >
                    {exp.company}
                  </p>
                  <p
                    className="text-white/40 mt-3"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", lineHeight: 1.7 }}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-32">
          <SectionHeader
            label="Skills"
            title="My toolkit"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <h4
                  className="text-white/30 uppercase tracking-[0.15em] mb-4"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.6875rem", fontWeight: 500 }}
                >
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 rounded-full border border-white/10 text-white/50 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="mt-32">
          <SectionHeader
            label="Daily Tools"
            title="What powers my workflow"
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              >
                <p
                  className="text-white"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  {tool.name}
                </p>
                <p
                  className="text-white/30 mt-1"
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                >
                  {tool.category}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="mt-32">
          <SectionHeader
            label="Connect"
            title="Find me online"
          />
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { name: "Twitter / X", url: "#" },
              { name: "LinkedIn", url: "#" },
              { name: "Dribbble", url: "#" },
              { name: "GitHub", url: "#" },
              { name: "Read.cv", url: "#" },
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all duration-300 group"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}
              >
                {social.name}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.a>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-20">
        <CTASection />
      </div>
    </div>
  );
}
