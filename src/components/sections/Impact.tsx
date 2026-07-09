"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Impact() {
  const { content } = useLocale();
  const { sections, impactMetrics } = content;

  return (
    <section id="impact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.impact.label}
          title={sections.impact.title}
          description={sections.impact.description}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactMetrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-colors hover:border-sky-500/30">
                <p className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-4xl font-bold text-transparent">
                  {metric.value}
                </p>
                <p className="mt-2 font-semibold text-white">{metric.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {metric.detail}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
