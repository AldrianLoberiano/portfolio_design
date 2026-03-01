export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "1",
    title: "Product Design",
    description:
      "End-to-end product design from research to pixel-perfect interfaces. I create experiences that users love and businesses rely on.",
    icon: "Layers",
    features: [
      "User Research & Strategy",
      "Wireframing & Prototyping",
      "UI Design & Design Systems",
      "Usability Testing",
    ],
  },
  {
    id: "2",
    title: "Brand Identity",
    description:
      "Strategic brand development that captures essence and creates lasting impressions across every touchpoint.",
    icon: "Palette",
    features: [
      "Brand Strategy",
      "Visual Identity Systems",
      "Typography & Color",
      "Brand Guidelines",
    ],
  },
  {
    id: "3",
    title: "Web Development",
    description:
      "Performance-first frontend development with modern frameworks. I bridge the gap between design and engineering.",
    icon: "Code",
    features: [
      "React & Next.js",
      "Animation & Interaction",
      "Performance Optimization",
      "Responsive Implementation",
    ],
  },
  {
    id: "4",
    title: "Creative Direction",
    description:
      "High-level creative strategy and art direction for campaigns, products, and digital experiences.",
    icon: "Compass",
    features: [
      "Campaign Concepting",
      "Art Direction",
      "Motion Design",
      "Content Strategy",
    ],
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO",
    company: "Nexus Labs",
    quote:
      "Working with this team transformed our product. The design system alone saved us hundreds of engineering hours, and our users consistently praise the experience.",
    avatar: "SC",
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "Head of Product",
    company: "Meridian Health",
    quote:
      "They didn't just design an app — they understood our users deeply. The attention to emotional design and wellness UX was unlike anything we'd seen.",
    avatar: "MR",
  },
  {
    id: "3",
    name: "Elena Vasquez",
    role: "Founder",
    company: "Atelier Studio",
    quote:
      "Our rebrand has been transformative. Every detail was considered, from the subtle geometry in our mark to how our brand feels across digital and print.",
    avatar: "EV",
  },
];

export interface Skill {
  name: string;
  category: string;
}

export const skills: Skill[] = [
  { name: "Figma", category: "Design" },
  { name: "Sketch", category: "Design" },
  { name: "Adobe Creative Suite", category: "Design" },
  { name: "Principle", category: "Design" },
  { name: "Framer", category: "Design" },
  { name: "React", category: "Development" },
  { name: "TypeScript", category: "Development" },
  { name: "Next.js", category: "Development" },
  { name: "Tailwind CSS", category: "Development" },
  { name: "Motion", category: "Development" },
  { name: "Node.js", category: "Development" },
  { name: "GraphQL", category: "Development" },
  { name: "User Research", category: "Strategy" },
  { name: "Design Systems", category: "Strategy" },
  { name: "Design Thinking", category: "Strategy" },
  { name: "Agile/Scrum", category: "Strategy" },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current: boolean;
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Principal Designer",
    company: "Independent Studio",
    period: "2023 — Present",
    description:
      "Leading design and creative direction for select clients across tech, fashion, and architecture. Focused on premium digital experiences.",
    current: true,
  },
  {
    id: "2",
    role: "Senior Design Engineer",
    company: "Vercel",
    period: "2021 — 2023",
    description:
      "Designed and built design systems, marketing sites, and developer tools. Shipped Next.js docs redesign and Vercel dashboard v2.",
    current: false,
  },
  {
    id: "3",
    role: "Lead Product Designer",
    company: "Stripe",
    period: "2019 — 2021",
    description:
      "Led the design of Stripe Dashboard and Stripe Checkout. Contributed to the Stripe design system and mentored junior designers.",
    current: false,
  },
  {
    id: "4",
    role: "Product Designer",
    company: "Airbnb",
    period: "2017 — 2019",
    description:
      "Designed core booking flows and host management tools. Part of the team that shipped Airbnb Luxe and Airbnb Experiences redesign.",
    current: false,
  },
];
