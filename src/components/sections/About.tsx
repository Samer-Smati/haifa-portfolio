"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const { content } = useLocale();
  const {
    sections,
    summary,
    stats,
    industries,
    keyStrengths,
    ui,
  } = content;

  return (
    <section id="about" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.about.label}
          title={sections.about.title}
          description={sections.about.description}
        />

        <ScrollReveal>
          <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 md:p-12">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="relative space-y-5">
              <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
                {summary.intro}
              </p>
              <p className="text-base leading-relaxed text-zinc-400 md:text-lg">
                {summary.body}
              </p>
              <p className="text-base leading-relaxed text-zinc-500 md:text-lg">
                {summary.closing}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mb-10 grid grid-cols-2 items-stretch gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              delay={index * 0.05}
              className="h-full"
            >
              <div className="flex h-full min-h-[7.5rem] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center md:min-h-[8rem] md:p-6">
                <p className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 min-h-[2.5rem] text-xs leading-snug text-zinc-500 md:text-sm">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mb-10">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {ui.industriesTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-5 sm:grid-cols-2">
          {keyStrengths.map((strength, index) => (
            <ScrollReveal
              key={strength.title}
              delay={index * 0.08}
              className="h-full"
            >
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-500/20">
                <h3 className="mb-2 text-base font-bold text-white md:text-lg">
                  {strength.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {strength.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
