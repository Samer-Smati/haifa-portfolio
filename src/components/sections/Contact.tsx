"use client";

import { useLocale } from "@/context/LocaleProvider";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Contact() {
  const { content, personal } = useLocale();
  const { sections, codeProfiles, personalInfo, ui } = content;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const encodedName = encodeURIComponent(personal.name);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={sections.contact.label}
          title={sections.contact.title}
          description={sections.contact.description}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
                  {ui.directContact}
                </p>
                <a
                  href={`tel:${personal.phone.replace(/\s/g, "")}`}
                  className="block text-2xl font-bold text-white transition-colors hover:text-blue-300"
                >
                  {personal.phone}
                </a>
                <a
                  href={personal.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-base text-sky-400 transition-colors hover:text-sky-300"
                >
                  {ui.whatsapp} →
                </a>
                <a
                  href={`mailto:${personal.email}?subject=Hello%20-%20${encodedName}`}
                  className="mt-1 block text-base text-zinc-400 transition-colors hover:text-white"
                >
                  {personal.email}
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">{ui.basedIn}</p>
                  <p className="mt-1 font-semibold text-white">
                    {personal.location}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">{ui.currentFocus}</p>
                  <p className="mt-1 font-semibold text-white">
                    {personalInfo.currentFocus}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-sky-500/50"
                >
                  {ui.linkedin}
                </a>
                <a
                  href={personal.cvUrl}
                  download
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  {ui.downloadCv}
                </a>
                <a
                  href={personal.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  {ui.portfolioUrl}
                </a>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  {ui.profiles}
                </p>
                {codeProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl border p-4 transition-colors ${
                      profile.primary
                        ? "border-blue-500/25 bg-blue-500/5 hover:border-blue-500/40"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{profile.platform}</p>
                      <p className="text-xs text-zinc-500">{profile.stats}</p>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">{profile.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <p className="mb-6 text-sm text-zinc-500">{ui.sendMessageAbout}</p>
              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-400">
                  {ui.name}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500/50"
                  placeholder={ui.namePlaceholder}
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">
                  {ui.email}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500/50"
                  placeholder={ui.emailPlaceholder}
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                ) : null}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-400">
                  {ui.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-blue-500/50"
                  placeholder={ui.messagePlaceholder}
                />
                {errors.message ? (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                ) : null}
              </div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              >
                {status === "loading" ? ui.sending : ui.sendMessage}
              </motion.button>
              {status === "success" ? (
                <p className="mt-4 text-center text-sm text-sky-400">
                  {ui.messageSent}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="mt-4 text-center text-sm text-red-400">{errorMessage}</p>
              ) : null}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
