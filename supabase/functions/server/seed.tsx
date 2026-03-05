import * as kv from "./kv_store.tsx";

export async function seedData() {
  // ─── Projects ───
  const projects = [
    {
      id: "proj-1",
      slug: "schedulepro",
      title: "SchedulePro",
      subtitle: "Smart scheduling and calendar management for modern teams",
      category: "Web Design",
      tags: ["React", "TypeScript", "TailwindCSS", "Vite", "Radix UI"],
      year: "2026",
      client: "SchedulePro",
      role: "Lead Designer & Frontend Architect",
      duration: "4 months",
      thumbnail:
        "/saas.png",
      images: [
        "/saas.png",
      ],
      description:
        "SchedulePro is a modern scheduling and calendar management SaaS built for teams that value clarity and efficiency. It streamlines appointment booking, meeting coordination, and availability management through an intuitive, fast interface — powered by React, TypeScript, TailwindCSS, Vite, and Radix UI.",
      challenge:
        "Teams were wasting hours each week juggling disconnected calendar tools, manual booking links, and timezone confusion. Existing schedulers felt clunky, visually outdated, and lacked the flexibility modern distributed teams need.",
      solution:
        "I designed and built a clean, component-driven scheduling platform using React and Radix UI primitives for accessibility, styled with TailwindCSS for rapid iteration, and bundled with Vite for blazing-fast performance. The result is a polished dark-mode-first interface with drag-and-drop scheduling, smart conflict detection, and a type-safe TypeScript foundation that scales.",
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
      slug: "doctor-hunt",
      title: "DoctorHunt",
      subtitle: "A mobile app connecting patients with doctors instantly",
      category: "Mobile",
      tags: ["Flutter", "Dart", "Firebase", "REST API"],
      year: "2023",
      client: "DoctorHunt",
      role: "Mobile App Designer & Developer",
      duration: "6 months",
      thumbnail:
        "/doctor_hunt.png",
      images: [
        "/doctor_hunt.png",
      ],
      description:
        "DoctorHunt is a healthcare mobile app built with Flutter that bridges the gap between patients and medical professionals. It enables users to search for nearby doctors by specialty, book appointments in real time, view detailed doctor profiles, and receive push notifications for upcoming visits — all within a clean, accessible interface designed for users of all ages.",
      challenge:
        "Patients often struggle to find the right doctor quickly, especially in urgent situations. Existing healthcare apps are cluttered, slow, and require too many steps before a booking can be made. The challenge was to design a mobile experience that feels approachable and fast while handling complex data like doctor availability, specializations, and location-based filtering.",
      solution:
        "I designed and built the app end-to-end using Flutter and Dart for a smooth cross-platform experience on both Android and iOS. Firebase powers real-time appointment syncing and push notifications. The UI prioritizes clarity — a search-first home screen, card-based doctor profiles with ratings and availability chips, and a streamlined one-screen booking flow that reduces friction from discovery to confirmed appointment.",
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
    name: "AL Studio",
    tagline: "Design engineer crafting digital experiences",
    email: "loberianorian@gmail.com",
    location: "Calauan, Laguna, Philippines",
    available: true,
    availableDate: "March 2026",
    social: {
      facebook: "https://www.facebook.com/its.adinggg",
      linkedin: "https://www.linkedin.com/in/aldriancayoloberiano/",
      github: "https://github.com/AldrianLoberiano",
    },
    updatedAt: new Date().toISOString(),
  });

  console.log("Seed data created: 6 projects, 3 testimonials, site settings");
}
