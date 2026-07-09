"use client";

import { useLocale } from "@/context/LocaleProvider";

export function Footer() {
  const { content, personal } = useLocale();
  const { ui, personalInfo } = content;
  const year = new Date().getFullYear();
  const phoneHref = `tel:${personal.phone.replace(/\s/g, "")}`;

  return (
    <footer className="border-t border-white/10 bg-[var(--surface-elevated)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-bold text-white">{personal.name}</p>
            <p className="text-sm text-zinc-500">
              {personalInfo.title} · Agile & Scrum
            </p>
            <p className="mt-1 text-xs text-zinc-600">{personal.portfolioUrl}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <a
              href={phoneHref}
              className="text-sm font-semibold text-blue-400 transition-colors hover:text-white"
            >
              {personal.phone}
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {personal.email}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-zinc-600">
            © {year} {personal.name}. {ui.builtWith}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {ui.linkedin}
            </a>
            <a
              href={personal.cvUrl}
              download
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {ui.cvPdf}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
