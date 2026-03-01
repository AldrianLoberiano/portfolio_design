import * as kv from "./kv_store.tsx";

export async function seedData() {
  // ─── Projects ───
  const projects = [
    {
      id: "proj-1",
      slug: "nexus-platform",
      title: "Nexus Platform",
      subtitle: "A next-generation SaaS platform for creative teams",
      category: "Web Design",
      tags: ["React", "TypeScript", "Design System"],
      year: "2025",
      client: "Nexus Labs",
      role: "Lead Designer & Frontend Architect",
      duration: "4 months",
      thumbnail:
        "https://images.unsplash.com/photo-1763437153598-78b5579ddefa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MTE4MjE5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1763437153598-78b5579ddefa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MTE4MjE5OXww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1638741631188-a42a58d5499c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBkYXJrJTIwdGhlbWV8ZW58MXx8fHwxNzcxMTc0NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "Nexus Platform is a comprehensive SaaS solution designed for creative agencies to manage projects, collaborate in real-time, and track performance metrics — all within a beautifully crafted interface.",
      challenge:
        "Creative teams were drowning in fragmented tooling. They needed a unified platform that didn't sacrifice aesthetics for functionality. The existing solutions felt corporate and uninspiring.",
      solution:
        "I designed and architected a modular platform with a custom design system featuring over 120 components. The interface uses a dark-first approach with carefully calibrated contrast ratios and micro-interactions that make every action feel intentional.",
      results: [
        "40% increase in team productivity",
        "92% user satisfaction score",
        "50K+ active users in first quarter",
        "Featured in Awwwards SOTD",
      ],
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj-2",
      slug: "meridian-mobile",
      title: "Meridian",
      subtitle: "Fitness tracking reimagined for mindful movement",
      category: "Mobile",
      tags: ["React Native", "iOS", "Health Tech"],
      year: "2025",
      client: "Meridian Health",
      role: "Product Designer",
      duration: "6 months",
      thumbnail:
        "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxMTYxMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxMTYxMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "Meridian is a wellness-focused fitness app that prioritizes mindful movement over metrics obsession.",
      challenge:
        "Most fitness apps create anxiety through gamification and social comparison. Meridian needed to encourage healthy movement while maintaining a peaceful, pressure-free experience.",
      solution:
        "I crafted a serene visual language with soft gradients, organic shapes, and thoughtful typography. The UX removes competitive elements and replaces them with personal reflection and gentle progress tracking.",
      results: [
        "4.8 App Store rating",
        "200K downloads in 3 months",
        "68% daily active user retention",
        "Apple Design Award nominee",
      ],
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj-3",
      slug: "atelier-brand",
      title: "Atelier Studio",
      subtitle: "Complete brand identity for a luxury design studio",
      category: "Branding",
      tags: ["Brand Strategy", "Visual Identity", "Print"],
      year: "2024",
      client: "Atelier Studio",
      role: "Brand Designer",
      duration: "3 months",
      thumbnail:
        "https://images.unsplash.com/photo-1727755868077-22f0d2ff8353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbWluaW1hbHxlbnwxfHx8fDE3NzEyMTg1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1727755868077-22f0d2ff8353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbWluaW1hbHxlbnwxfHx8fDE3NzEyMTg1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "A comprehensive brand identity system for Atelier Studio, a high-end interior design firm known for their minimalist approach to luxury spaces.",
      challenge:
        "The studio's old branding didn't reflect the sophistication of their work. They needed an identity system that felt premium without being pretentious.",
      solution:
        "I developed a restrained but expressive visual system built on precise geometry, a refined color palette, and custom typography treatments.",
      results: [
        "300% increase in brand recognition",
        "Featured in Brand New",
        "New client inquiries up 180%",
        "Won Red Dot Design Award",
      ],
      featured: true,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj-4",
      slug: "flux-commerce",
      title: "Flux Commerce",
      subtitle: "High-converting e-commerce experience for DTC brands",
      category: "E-Commerce",
      tags: ["Shopify", "Conversion Optimization", "UX"],
      year: "2024",
      client: "Flux Collective",
      role: "UX/UI Designer",
      duration: "5 months",
      thumbnail:
        "https://images.unsplash.com/photo-1691096674749-29069acd529c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxMTY1NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1691096674749-29069acd529c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzcxMTY1NTQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "Flux Commerce is a premium e-commerce platform designed for direct-to-consumer brands that want to stand out in a crowded market.",
      challenge:
        "DTC brands struggle to differentiate online. Template-based stores all look the same.",
      solution:
        "I created a modular e-commerce framework with drag-and-drop sections, advanced product showcasing with 3D views, and a checkout flow optimized through A/B testing across 50+ iterations.",
      results: [
        "35% improvement in conversion rate",
        "28% reduction in cart abandonment",
        "$2.4M in first-month revenue",
        "Shopify Partner Award finalist",
      ],
      featured: false,
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj-5",
      slug: "pulse-dashboard",
      title: "Pulse Analytics",
      subtitle: "Real-time analytics dashboard for growth teams",
      category: "Dashboard",
      tags: ["Data Visualization", "React", "Real-time"],
      year: "2024",
      client: "Pulse Data",
      role: "Design Engineer",
      duration: "3 months",
      thumbnail:
        "https://images.unsplash.com/photo-1638741631188-a42a58d5499c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBkYXJrJTIwdGhlbWV8ZW58MXx8fHwxNzcxMTc0NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1638741631188-a42a58d5499c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBkYXJrJTIwdGhlbWV8ZW58MXx8fHwxNzcxMTc0NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "Pulse is a real-time analytics dashboard that transforms complex data into actionable insights through elegant visualization and intelligent alerting.",
      challenge:
        "Growth teams were spending hours in spreadsheets instead of making decisions.",
      solution:
        "I designed a dashboard system with smart defaults, customizable widgets, and an AI-powered insights engine that proactively highlights anomalies and opportunities.",
      results: [
        "60% faster decision-making",
        "85% reduction in report generation time",
        "Used by 30+ enterprise teams",
        "NPS score of 78",
      ],
      featured: false,
      order: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "proj-6",
      slug: "terra-spaces",
      title: "Terra Spaces",
      subtitle: "Architectural visualization and virtual staging platform",
      category: "Web Design",
      tags: ["3D", "WebGL", "Architecture"],
      year: "2024",
      client: "Terra Architecture",
      role: "Creative Director",
      duration: "7 months",
      thumbnail:
        "https://images.unsplash.com/photo-1552835376-89b8cdfacb4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMG1pbmltYWx8ZW58MXx8fHwxNzcxMTQwMjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      images: [
        "https://images.unsplash.com/photo-1552835376-89b8cdfacb4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZyUyMG1pbmltYWx8ZW58MXx8fHwxNzcxMTQwMjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1705909772639-69d68969ab00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmlvciUyMGRlc2lnbiUyMHNwYWNlfGVufDF8fHx8MTc3MTIxODU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description:
        "Terra Spaces combines architectural visualization with virtual staging, allowing real estate developers and architects to showcase unbuilt spaces in photorealistic detail.",
      challenge:
        "Traditional architectural renders are expensive, time-consuming, and static.",
      solution:
        "I led the design of an interactive 3D viewing platform with real-time material swapping, lighting controls, and virtual staging capabilities.",
      results: [
        "70% faster client approvals",
        "Reduced rendering costs by 45%",
        "Used by 200+ architecture firms",
        "Featured in ArchDaily",
      ],
      featured: true,
      order: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const projectKeys = projects.map((p) => `project:${p.slug}`);
  await kv.mset(projectKeys, projects);

  // ─── Testimonials ───
  const testimonials = [
    {
      id: "test-1",
      name: "Sarah Chen",
      role: "CEO",
      company: "Nexus Labs",
      quote:
        "Working with this team transformed our product. The design system alone saved us hundreds of engineering hours, and our users consistently praise the experience.",
      avatar: "SC",
      order: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: "test-2",
      name: "Marcus Rivera",
      role: "Head of Product",
      company: "Meridian Health",
      quote:
        "They didn't just design an app — they understood our users deeply. The attention to emotional design and wellness UX was unlike anything we'd seen.",
      avatar: "MR",
      order: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: "test-3",
      name: "Elena Vasquez",
      role: "Founder",
      company: "Atelier Studio",
      quote:
        "Our rebrand has been transformative. Every detail was considered, from the subtle geometry in our mark to how our brand feels across digital and print.",
      avatar: "EV",
      order: 3,
      createdAt: new Date().toISOString(),
    },
  ];

  const testimonialKeys = testimonials.map((t) => `testimonial:${t.id}`);
  await kv.mset(testimonialKeys, testimonials);

  // ─── Site Settings ───
  await kv.set("settings:site", {
    name: "JD Studio",
    tagline: "Design engineer crafting digital experiences",
    email: "hello@jdstudio.design",
    location: "San Francisco, CA",
    available: true,
    availableDate: "March 2026",
    social: {
      twitter: "#",
      linkedin: "#",
      dribbble: "#",
      github: "#",
    },
    updatedAt: new Date().toISOString(),
  });

  console.log("Seed data created: 6 projects, 3 testimonials, site settings");
}
