"use client";

import { linkedInHighlights, personalInfo } from "@/data/cv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LinkedInShowcase() {
  return (
    <section id="linkedin" className="px-6 py-24 md:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Professional"
          title="LinkedIn Profile"
          description="Product Owner experience, skills, and professional network."
        />
        <div className="mb-8">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent p-6 transition-colors hover:border-fuchsia-500/40 md:p-8"
          >
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-fuchsia-300">
              LinkedIn Profile
            </p>
            <p className="text-xl font-bold text-white group-hover:text-fuchsia-200 md:text-2xl">
              linkedin.com/in/hayfa-talili
            </p>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {linkedInHighlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.05} className="h-full">
              <a
                href={item.url}
                target={item.url.startsWith("#") ? undefined : "_blank"}
                rel={item.url.startsWith("#") ? undefined : "noopener noreferrer"}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-fuchsia-500/40 hover:bg-white/[0.04]"
              >
                <span className="mb-3 font-semibold text-fuchsia-300 group-hover:text-teal-300">
                  {item.title}
                </span>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
                <p className="text-xs font-medium text-zinc-500">{item.label} →</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
