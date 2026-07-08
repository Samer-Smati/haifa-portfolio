"use client";

import { featuredProjects } from "@/data/projects";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechChip } from "@/components/ui/TechChip";
import { motion } from "framer-motion";

const typeStyles: Record<string, string> = {
  Professional: "bg-teal-500/15 text-teal-300",
  "Open Source": "bg-teal-500/15 text-teal-300",
  "Live Demo": "bg-fuchsia-500/15 text-fuchsia-300",
};

export function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Selected Work"
          description="Enterprise ERP/CRM, chatbot solutions, health platforms, and backend services — built with Java, Angular, and modern full-stack tools."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={index * 0.05}
              className={`h-full ${project.featured ? "md:col-span-1" : ""}`}
            >
              <motion.article
                className={`group flex h-full flex-col rounded-2xl border p-6 transition-all md:p-8 ${
                  project.featured
                    ? "border-fuchsia-500/20 bg-fuchsia-500/[0.04] hover:border-fuchsia-500/40"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
                whileHover={{ y: -4 }}
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-medium ${typeStyles[project.type] ?? "bg-white/5 text-zinc-400"}`}
                  >
                    {project.type}
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-0.5 text-xs text-zinc-500">
                    {project.category}
                  </span>
                  {project.period ? (
                    <span className="text-xs text-zinc-600">{project.period}</span>
                  ) : null}
                </div>

                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-fuchsia-300">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-medium text-teal-300"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <ul className="mb-5 space-y-1.5">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-xs text-zinc-500 md:text-sm"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fuchsia-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <TechChip key={tech} label={tech} index={techIndex} />
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.url + link.label}
                      href={link.url}
                      target={
                        link.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm font-semibold text-fuchsia-400 transition-colors hover:text-teal-400"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
