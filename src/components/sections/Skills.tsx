"use client";

import { skills } from "@/data/cv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";

const skillGroups = [
  {
    title: "Product Management",
    description: "Agile delivery, backlog, roadmaps, and stakeholder alignment",
    items: skills.product,
    accent: "fuchsia",
  },
  {
    title: "Analytics & Data",
    description: "BI tools, analytics, SQL, and KPI-driven product decisions",
    items: skills.data,
    accent: "teal",
  },
  {
    title: "Technical Foundation",
    description: "Development background for effective tech collaboration",
    items: skills.technical,
    accent: "rose",
  },
  {
    title: "Tools & Platforms",
    description: "Design, modeling, and collaboration tooling",
    items: skills.tools,
    accent: "teal",
  },
];

const accentBorder: Record<string, string> = {
  fuchsia: "hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5",
  teal: "hover:border-teal-500/30 hover:bg-teal-500/5",
  rose: "hover:border-rose-500/30 hover:bg-rose-500/5",
};

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Product & Technical Toolkit"
          description="Agile product management, analytics, Jira, Figma, and data-informed delivery."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <ScrollReveal key={group.title} delay={groupIndex * 0.08} className="h-full">
              <div
                className={`h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors ${accentBorder[group.accent]}`}
              >
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {group.title}
                </h3>
                <p className="mb-4 text-sm text-zinc-500">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, index) => (
                    <TechChip key={item} label={item} index={index} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
