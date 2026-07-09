"use client";

import { useLocale } from "@/context/LocaleProvider";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const { content, personal } = useLocale();
  const { ui, personalInfo } = content;
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const phoneHref = `tel:${personal.phone.replace(/\s/g, "")}`;
  const nameParts = personal.name.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");
  const encodedName = encodeURIComponent(personal.name);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex(
        (current) => (current + 1) % personalInfo.subtitles.length,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [personalInfo.subtitles.length]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <GradientBlob />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-300 backdrop-blur-sm"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
          {personalInfo.availability}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-blue-500/30 shadow-xl shadow-blue-900/20 md:h-44 md:w-44">
            <Image
              src="/images/haifa-profile.png"
              width={176}
              height={176}
              alt={personal.name}
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>
        </motion.div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
          {personalInfo.title}
        </p>

        <h1 className="mb-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
          <AnimatedText text={firstName} />
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            <AnimatedText text={lastName} />
          </span>
        </h1>

        <motion.div
          className="mb-5 h-8 overflow-hidden md:mx-auto md:max-w-2xl md:h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            key={subtitleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-lg font-medium text-zinc-400 md:text-xl"
          >
            {personalInfo.subtitles[subtitleIndex]}
          </motion.p>
        </motion.div>

        <motion.p
          className="mb-6 mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {personalInfo.heroTagline}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href={phoneHref}
            className="rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/25 transition-transform hover:scale-105"
          >
            {ui.callMe}
          </a>
          <a
            href={`mailto:${personal.email}?subject=Interview%20Request%20-%20${encodedName}`}
            className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
          >
            {ui.emailMe}
          </a>
          <a
            href={personal.cvUrl}
            download
            className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            {ui.downloadCv}
          </a>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {personalInfo.heroBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            {ui.linkedin}
          </a>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            {ui.whatsapp}
          </a>
          <a
            href="#projects"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            {ui.viewProjects}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-white/50" />
        </div>
      </motion.div>
    </section>
  );
}
