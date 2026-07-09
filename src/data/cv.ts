import { personalStatic } from "@/data/personal";
import { en } from "@/i18n/en";

export const personalInfo = {
  ...personalStatic,
  ...en.personalInfo,
};

export const summary = en.summary;
export const impactMetrics = en.impactMetrics;
export const professionalHighlights = en.professionalHighlights;
export const trustSignals = en.trustSignals;
export const keyStrengths = en.keyStrengths;
export const industries = en.industries;
export const expertise = en.expertise;
export const stats = en.stats;
export const skills = en.skills;
export const experiences = en.experiences;
export const education = en.education;
export const softSkills = en.softSkills;
export const languages = en.languages;
export const linkedInHighlights = en.linkedInHighlights;
export const navLinks = en.navLinks;
export const codeProfiles = en.codeProfiles;
export const professionalSummary = en.professionalSummary;

export type Experience = (typeof en.experiences)[number];
