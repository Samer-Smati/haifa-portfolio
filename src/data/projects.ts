export type ProjectLink = {
  label: string;
  url: string;
};

export type FeaturedProject = {
  title: string;
  type: "Professional" | "Open Source" | "Live Demo";
  category: string;
  period?: string;
  description: string;
  metrics: string[];
  highlights: string[];
  technologies: string[];
  links: ProjectLink[];
  featured?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Inted Group — Product Vision & Delivery",
    type: "Professional",
    category: "Enterprise · Product Ownership",
    period: "2025 – Present",
    featured: true,
    description:
      "Leading product strategy at Inted Group — defining vision, managing backlog prioritization, planning roadmaps, and coordinating Agile releases with cross-functional teams.",
    metrics: [
      "Product vision & strategy",
      "Backlog prioritization",
      "Release management",
    ],
    highlights: [
      "Aligned product vision with business strategy and stakeholder expectations",
      "Prioritized user stories, epics, and features by measurable business value",
      "Facilitated Scrum ceremonies and sprint performance reporting",
      "Analyzed user feedback for continuous product improvement",
    ],
    technologies: ["Jira", "Agile/Scrum", "User Stories", "Figma", "KPIs"],
    links: [{ label: "Request details", url: "#contact" }],
  },
  {
    title: "Digital Hub — Digital Product Lifecycle",
    type: "Professional",
    category: "Digital Products",
    period: "2023 – 2024",
    featured: true,
    description:
      "End-to-end ownership of digital products from discovery through production — requirements, backlog, UX collaboration, and KPI tracking.",
    metrics: [
      "Discovery to production",
      "Stakeholder collaboration",
      "UX & KPI monitoring",
    ],
    highlights: [
      "Gathered and analyzed business needs into functional specs and user stories",
      "Prioritized backlog with business, tech, and leadership stakeholders",
      "Improved UX/UI in collaboration with design teams",
      "Tracked adoption, satisfaction, and performance KPIs",
    ],
    technologies: [
      "Jira",
      "Figma",
      "Google Analytics",
      "Power BI",
      "Agile/Scrum",
    ],
    links: [{ label: "Request details", url: "#contact" }],
  },
  {
    title: "Welyne — Body Measurement Web Service",
    type: "Professional",
    category: "Health Tech · Web Services",
    period: "2022 – 2023",
    description:
      "Web service for extracting and processing body measurements — technical architecture, testing, and performance optimization alongside product teams.",
    metrics: [
      "Measurement extraction API",
      "Architecture design",
      "Performance tuning",
    ],
    highlights: [
      "Developed dedicated web service for body measurement data processing",
      "Contributed to technical architecture and functional testing",
      "Optimized reliability and performance of production services",
      "Collaborated closely with technical and product stakeholders",
    ],
    technologies: ["Python", "Web Services", "SQL", "API Design"],
    links: [{ label: "Request details", url: "#contact" }],
  },
  {
    title: "ArabSoft — Commercial Management App",
    type: "Professional",
    category: "Commercial Software",
    period: "2019 – 2020",
    description:
      "Commercial management application — client needs analysis, functional specifications, development, and delivery support.",
    metrics: [
      "Commercial management system",
      "Functional specifications",
      "Client delivery support",
    ],
    highlights: [
      "Designed and developed a full commercial management application",
      "Analyzed client requirements and documented functional specs",
      "Supported delivery and functional support post-launch",
      "Collaborated with development and project management teams",
    ],
    technologies: ["PHP", "HTML", "SQL Server", "Business Analysis"],
    links: [{ label: "Request details", url: "#contact" }],
  },
  {
    title: "This Portfolio — Live on Vercel",
    type: "Live Demo",
    category: "Next.js · Personal Brand",
    period: "2026",
    description:
      "This site — Next.js 16, Framer Motion animations, Resend contact API, Zod validation, deployed on Vercel with SEO optimization.",
    metrics: ["Live deployed", "Contact API", "SEO ready"],
    highlights: [
      "Next.js App Router + TypeScript",
      "Framer Motion scroll animations",
      "Serverless contact form with Resend",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    links: [
      {
        label: "Live Site",
        url:
          process.env.NEXT_PUBLIC_SITE_URL ??
          "https://haifa-portfolio-seven.vercel.app",
      },
    ],
  },
];
