"use client";

import { useLocale } from "@/context/LocaleProvider";
import { LangSwitch } from "@/components/layout/LangSwitch";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Header() {
  const { content, personal } = useLocale();
  const { ui, navLinks } = content;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[var(--background)]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white transition-colors hover:text-blue-300"
        >
          HT<span className="text-blue-400">.</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <LangSwitch />
          <a
            href={personal.cvUrl}
            download
            className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white md:inline-block"
          >
            {ui.cv}
          </a>
          <a
            href={`tel:${personal.phone.replace(/\s/g, "")}`}
            className="rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            {ui.callMe}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={ui.toggleMenu}
          >
            <span className="text-xl">{mobileOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[var(--background)]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${personal.phone.replace(/\s/g, "")}`}
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                {ui.callMe}
              </a>
              <a
                href={personal.cvUrl}
                download
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-blue-400"
              >
                {ui.downloadCv}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
