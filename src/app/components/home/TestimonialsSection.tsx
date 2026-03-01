import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials as staticTestimonials } from "../../data/services";
import { SectionHeader } from "../shared/SectionHeader";
import { TestimonialSkeleton } from "../shared/LoadingSkeleton";
import { useApi } from "../../hooks/useApi";
import { getTestimonials } from "../../lib/api";

export function TestimonialsSection() {
  const { data, isLoading } = useApi(
    () => getTestimonials(),
    [],
    { fallback: { testimonials: staticTestimonials } }
  );

  const testimonials = data?.testimonials?.length ? data.testimonials : staticTestimonials;

  return (
    <section id="testimonials" className="py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          label="Testimonials"
          title="Words from collaborators"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading && !testimonials.length
            ? Array.from({ length: 3 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))
            : testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="p-7 rounded-2xl border border-white/5 bg-white/[0.02] relative"
                >
                  <Quote size={20} className="text-white/10 mb-4" />
                  <p
                    className="text-white/60"
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9375rem", lineHeight: 1.8 }}
                  >
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <span
                        className="text-white/60"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-white"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className="text-white/30"
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8125rem" }}
                      >
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
