"use client";

import {
  personalInfo,
  professionalHighlights,
  professionalSummary,
  trustSignals,
} from "@/data/cv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

export function HireCTA() {
  const phoneHref = `tel:${personalInfo.phone.replace(/\s/g, "")}`;
  const encodedName = encodeURIComponent(personalInfo.name);

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-fuchsia-600/20 via-[#0f0a12] to-teal-600/10 p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />

            <div className="relative mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Focus", value: professionalSummary.focus },
                { label: "Experience", value: professionalSummary.experience },
                { label: "Stack", value: professionalSummary.stack },
                { label: "Languages", value: professionalSummary.languages },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                  Work With Me
                </p>
                <h2 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white md:text-4xl">
                  Let&apos;s ship impactful products
                </h2>
                <p className="mb-6 text-base leading-relaxed text-zinc-400 md:text-lg">
                  {personalInfo.recruiterPitch}
                </p>
                <ul className="mb-6 space-y-2">
                  {professionalHighlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-zinc-300 md:text-base"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {trustSignals.map((signal) => (
                    <span
                      key={signal}
                      className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs text-teal-300"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <motion.a
                  href={phoneHref}
                  className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-teal-500 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-fuchsia-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Call {personalInfo.phone}
                </motion.a>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-2xl border border-teal-500/30 bg-teal-500/10 px-8 py-4 text-base font-semibold text-teal-300 transition-colors hover:bg-teal-500/20"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${personalInfo.email}?subject=Project%20Inquiry%20-%20${encodedName}`}
                  className="flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Email Me
                </a>
                <a
                  href={personalInfo.cvUrl}
                  download
                  className="flex items-center justify-center rounded-2xl border border-white/10 px-8 py-4 text-base font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Download CV (PDF)
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
