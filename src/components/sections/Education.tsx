"use client";

import { education, languages, softSkills } from "@/data/cv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Education"
          title="Academic Background"
          description="Formal training in computer systems development with a focus on software engineering fundamentals."
        />

        <div className="mb-16 grid gap-6">
          {education.map((item, index) => (
            <ScrollReveal key={item.institution} delay={index * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-teal-500/30 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white md:text-xl">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-teal-400">{item.institution}</p>
                    {item.focus ? (
                      <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                        {item.focus}
                      </p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-sm text-zinc-500">
                    <p className="font-medium text-zinc-400">{item.period}</p>
                    <p>{item.location}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Soft Skills</h3>
              <div className="space-y-5">
                {softSkills.map((skill) => (
                  <div
                    key={skill.title}
                    className="border-b border-white/5 pb-5 last:border-0 last:pb-0"
                  >
                    <p className="font-semibold text-fuchsia-300">{skill.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="mb-6 text-xl font-bold text-white">Languages</h3>
              <div className="space-y-5">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-white">{lang.name}</p>
                      <p className="text-xs text-zinc-500">{lang.level}</p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-teal-500"
                        style={{ width: `${lang.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
