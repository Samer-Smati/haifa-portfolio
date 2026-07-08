import { personalInfo } from "@/data/cv";

export function Footer() {
  const year = new Date().getFullYear();
  const phoneHref = `tel:${personalInfo.phone.replace(/\s/g, "")}`;

  return (
    <footer className="border-t border-white/10 bg-[#080c10] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-lg font-bold text-white">{personalInfo.name}</p>
            <p className="text-sm text-zinc-500">
              {personalInfo.title} · Agile & Scrum
            </p>
            <p className="mt-1 text-xs text-zinc-600">{personalInfo.portfolioUrl}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <a
              href={phoneHref}
              className="text-sm font-semibold text-fuchsia-400 transition-colors hover:text-white"
            >
              {personalInfo.phone}
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-zinc-600">
            © {year} {personalInfo.name}. Built with Next.js · Vercel.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.cvUrl}
              download
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
