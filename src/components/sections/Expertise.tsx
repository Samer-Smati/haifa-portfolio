"use client";

import { useLocale } from "@/context/LocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";

export function Expertise() {
  const { content } = useLocale();
  const { sections, expertise } = content;

  return (
    <section id="expertise" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.expertise.label}
          title={sections.expertise.title}
          description={sections.expertise.description}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08} className="h-full">
              <motion.div
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-sky-500/30 hover:bg-sky-500/5"
                whileHover={{ y: -4 }}
              >
                <span className="mb-4 inline-flex w-fit rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs font-bold text-sky-400">
                  {item.icon}
                </span>
                <h3 className="mb-2 text-lg font-bold text-white group-hover:text-sky-300">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
