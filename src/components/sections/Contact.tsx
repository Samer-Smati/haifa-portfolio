"use client";

import { personalInfo, codeProfiles } from "@/data/cv";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const encodedName = encodeURIComponent(personalInfo.name);

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
          label="Contact"
          title="Let's Connect"
          description="Have a project or role in mind? Reach out — I typically respond within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-fuchsia-400">
                  Direct contact
                </p>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="block text-2xl font-bold text-white transition-colors hover:text-fuchsia-300"
                >
                  {personalInfo.phone}
                </a>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-base text-teal-400 transition-colors hover:text-teal-300"
                >
                  WhatsApp →
                </a>
                <a
                  href={`mailto:${personalInfo.email}?subject=Hello%20-%20${encodedName}`}
                  className="mt-1 block text-base text-zinc-400 transition-colors hover:text-white"
                >
                  {personalInfo.email}
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">Based in</p>
                  <p className="mt-1 font-semibold text-white">
                    {personalInfo.location}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500">Current focus</p>
                  <p className="mt-1 font-semibold text-white">
                    Product Owner · Agile/Scrum
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-teal-500/50"
                >
                  LinkedIn
                </a>
                <a
                  href={personalInfo.cvUrl}
                  download
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  Download CV
                </a>
                <a
                  href={personalInfo.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  Portfolio URL
                </a>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                  Profiles
                </p>
                {codeProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-xl border p-4 transition-colors ${
                      "primary" in profile && profile.primary
                        ? "border-fuchsia-500/25 bg-fuchsia-500/5 hover:border-fuchsia-500/40"
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
              <p className="mb-6 text-sm text-zinc-500">
                Send a message about a role, project, or collaboration.
              </p>
              <div className="mb-5">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-fuchsia-500/50"
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-fuchsia-500/50"
                  placeholder="you@company.com"
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                ) : null}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message")}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-fuchsia-500/50"
                  placeholder="Tell me about the opportunity..."
                />
                {errors.message ? (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                ) : null}
              </div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-teal-500 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </motion.button>
              {status === "success" ? (
                <p className="mt-4 text-center text-sm text-teal-400">
                  Message sent! I&apos;ll get back to you soon.
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
