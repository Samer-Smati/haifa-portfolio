"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";
import type { SiteContent } from "@/i18n";
import { motion } from "framer-motion";
import { useState } from "react";

const VISIBLE_HIGHLIGHTS = 6;

export function Experience() {
  const { content } = useLocale();
  const { sections, experiences, ui } = content;

  return (
    <section id="experience" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.experience.label}
          title={sections.experience.title}
          description={sections.experience.description}
        />

        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-blue-500/50 via-sky-500/30 to-transparent md:left-8 md:block" />

          <div className="space-y-8">
            {experiences.map((job, index) => (
              <ScrollReveal
                key={`${job.company}-${job.period}`}
                delay={index * 0.05}
              >
                <ExperienceCard job={job} isCurrent={index === 0} ui={ui} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ExperienceCardProps = {
  job: SiteContent["experiences"][number];
  isCurrent: boolean;
  ui: SiteContent["ui"];
};

function ExperienceCard({ job, isCurrent, ui }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(job.highlights.length - VISIBLE_HIGHLIGHTS, 0);
  const visibleHighlights = expanded
    ? job.highlights
    : job.highlights.slice(0, VISIBLE_HIGHLIGHTS);

  return (
    <motion.article
      className={`group relative rounded-2xl border p-6 transition-all md:ml-16 md:p-8 ${
        isCurrent
          ? "border-sky-500/20 bg-sky-500/[0.03] hover:border-sky-500/40"
          : "border-white/10 bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.04]"
      }`}
      whileHover={{ x: 4 }}
    >
      <div className="absolute -left-12 top-8 hidden h-4 w-4 rounded-full border-2 border-blue-400 bg-[var(--background)] md:block" />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-500/15 px-3 py-0.5 text-xs font-medium text-blue-300">
              {job.industry}
            </span>
            <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs font-medium text-zinc-500">
              {job.employmentType}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white md:text-2xl">
            {job.role}
          </h3>
          <p className="mt-1 text-lg text-blue-400">
            {job.company}
          </p>
        </div>
        <div className="shrink-0 text-left md:text-right">
          <p className="text-sm font-semibold text-zinc-300">
            {job.period}
          </p>
          <p className="text-sm text-zinc-600">{job.location}</p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-zinc-500 md:text-base">
        {job.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {job.metrics.map((metric) => (
          <span
            key={metric}
            className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300"
          >
            {metric}
          </span>
        ))}
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
        {ui.keyContributions}
      </p>
      <ul className="mb-6 space-y-2.5">
        {visibleHighlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-3 text-sm leading-relaxed text-zinc-400 md:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
            {highlight}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          className="-mt-3 mb-6 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
        >
          {expanded ? ui.showLess : `${ui.showMore} (+${hiddenCount})`}
        </button>
      )}

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
        {ui.environment}
      </p>
      <div className="flex flex-wrap gap-2">
        {job.technologies.map((tech, techIndex) => (
          <TechChip key={tech} label={tech} index={techIndex} />
        ))}
      </div>
    </motion.article>
  );
}
