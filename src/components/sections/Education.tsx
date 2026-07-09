"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  const { content } = useLocale();
  const { sections, education, softSkills, languages, ui } = content;

  return (
    <section id="education" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.education.label}
          title={sections.education.title}
          description={sections.education.description}
        />

        <div className="mb-16 grid gap-6">
          {education.map((item, index) => (
            <ScrollReveal key={item.institution} delay={index * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-sky-500/30 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white md:text-xl">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sky-400">{item.institution}</p>
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
              <h3 className="mb-6 text-xl font-bold text-white">{ui.softSkills}</h3>
              <div className="space-y-5">
                {softSkills.map((skill) => (
                  <div
                    key={skill.title}
                    className="border-b border-white/5 pb-5 last:border-0 last:pb-0"
                  >
                    <p className="font-semibold text-blue-300">{skill.title}</p>
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
              <h3 className="mb-6 text-xl font-bold text-white">{ui.languagesTitle}</h3>
              <div className="space-y-5">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-white">{lang.name}</p>
                      <p className="text-xs text-zinc-500">{lang.level}</p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-500"
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
