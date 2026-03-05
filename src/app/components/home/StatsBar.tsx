import { AnimatedCounter } from "../shared/AnimatedCounter";

export function StatsBar() {
  const items = [
    { end: 8, suffix: "+", label: "Years of Experience" },
    { end: 50, suffix: "+", label: "Projects Delivered" },
    { end: 40, suffix: "+", label: "Clients Worldwide" },
    { end: 12, suffix: "", label: "Awards Won" },
  ];

  return (
    <section className="py-20 border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {items.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}