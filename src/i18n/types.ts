export type Locale = "en" | "fr";

export type ProjectType = "Professional" | "Open Source" | "Live Demo";

export type SiteContent = {
  ui: {
    callMe: string;
    emailMe: string;
    downloadCv: string;
    downloadCvPdf: string;
    viewProjects: string;
    toggleMenu: string;
    cv: string;
    whatsapp: string;
    linkedin: string;
    portfolioUrl: string;
    builtWith: string;
    cvPdf: string;
    directContact: string;
    basedIn: string;
    currentFocus: string;
    profiles: string;
    sendMessageAbout: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sendMessage: string;
    messageSent: string;
    keyContributions: string;
    industriesTitle: string;
    softSkills: string;
    languagesTitle: string;
    workWithMe: string;
    hireTitle: string;
    focus: string;
    experience: string;
    stack: string;
    languagesLabel: string;
    linkedinProfile: string;
    callPhone: string;
  };
  sections: {
    about: { label: string; title: string; description: string };
    impact: { label: string; title: string; description: string };
    projects: { label: string; title: string; description: string };
    experience: { label: string; title: string; description: string };
    expertise: { label: string; title: string; description: string };
    skills: { label: string; title: string; description: string };
    linkedin: { label: string; title: string; description: string };
    education: { label: string; title: string; description: string };
    contact: { label: string; title: string; description: string };
  };
  personalInfo: {
    title: string;
    availability: string;
    recruiterPitch: string;
    linkedinHeadline: string;
    subtitles: string[];
    heroTagline: string;
    heroBadges: string[];
    currentFocus: string;
  };
  professionalSummary: {
    focus: string;
    experience: string;
    stack: string;
    languages: string;
  };
  summary: { intro: string; body: string; closing: string };
  navLinks: { href: string; label: string }[];
  impactMetrics: { value: string; label: string; detail: string }[];
  professionalHighlights: string[];
  trustSignals: string[];
  keyStrengths: { title: string; description: string }[];
  industries: string[];
  expertise: { title: string; description: string; icon: string }[];
  stats: { value: string; label: string }[];
  skills: {
    product: string[];
    data: string[];
    technical: string[];
    tools: string[];
  };
  skillGroups: {
    title: string;
    description: string;
    accent: "blue" | "sky" | "indigo" | "slate";
    itemsKey: "product" | "data" | "technical" | "tools";
  }[];
  experiences: {
    company: string;
    role: string;
    period: string;
    location: string;
    industry: string;
    employmentType: string;
    description: string;
    metrics: string[];
    highlights: string[];
    technologies: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    location: string;
    focus?: string;
  }[];
  softSkills: { title: string; description: string }[];
  languages: { name: string; level: string; proficiency: number }[];
  linkedInHighlights: {
    title: string;
    description: string;
    url: string;
    label: string;
  }[];
  codeProfiles: {
    platform: string;
    username: string;
    url: string;
    stats: string;
    description: string;
    primary?: boolean;
  }[];
  featuredProjects: {
    title: string;
    type: ProjectType;
    typeLabel: string;
    category: string;
    period?: string;
    description: string;
    metrics: string[];
    highlights: string[];
    technologies: string[];
    links: { label: string; url: string }[];
    featured?: boolean;
  }[];
};
