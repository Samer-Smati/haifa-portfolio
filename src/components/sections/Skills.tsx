"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";

const accentBorder: Record<string, string> = {
  blue: "hover:border-blue-500/30 hover:bg-blue-500/5",
  sky: "hover:border-sky-500/30 hover:bg-sky-500/5",
  indigo: "hover:border-indigo-500/30 hover:bg-indigo-500/5",
  cyan: "hover:border-cyan-500/30 hover:bg-cyan-500/5",
  violet: "hover:border-violet-500/30 hover:bg-violet-500/5",
  emerald: "hover:border-emerald-500/30 hover:bg-emerald-500/5",
  slate: "hover:border-slate-500/30 hover:bg-slate-500/5",
};

export function Skills() {
  const { content } = useLocale();
  const { sections, skillGroups, skills } = content;

  return (
    <section id="skills" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.skills.label}
          title={sections.skills.title}
          description={sections.skills.description}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <ScrollReveal
              key={group.title}
              delay={groupIndex * 0.08}
              className={`h-full ${
                groupIndex === 0
                  ? "md:col-span-2"
                  : groupIndex === skillGroups.length - 1
                    ? "lg:col-span-2"
                    : ""
              }`}
            >
              <div
                className={`h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors ${accentBorder[group.accent]}`}
              >
                <h3 className="mb-1 text-lg font-semibold text-white">
                  {group.title}
                </h3>
                <p className="mb-4 text-sm text-zinc-500">{group.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skills[group.itemsKey].map((item, index) => (
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
