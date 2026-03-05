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
    name: "Viena",
    role: "Client",
    company: "",
    quote: "Ang galing po kuya, malinis at mabilis po ang pagkagawa",
    avatar: "V",
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
    role: "UI/UX Freelancer",
    company: "Figma",
    period: "2025 — Present",
    description:
      "Creating user interfaces and experiences for clients as a freelancer, using Figma to design clean, functional, and visually compelling digital products.",
    current: true,
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "Freelance",
    period: "2024",
    description:
      "Built responsive and performant web interfaces using modern frontend technologies including React and Tailwind CSS.",
    current: false,
  },
];
