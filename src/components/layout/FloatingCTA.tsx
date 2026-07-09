"use client";

import { useLocale } from "@/context/LocaleProvider";
import { motion } from "framer-motion";

export function FloatingCTA() {
  const { content, personal } = useLocale();
  const { ui } = content;
  const phoneHref = `tel:${personal.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        href={phoneHref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/40 transition-transform hover:scale-105"
      >
        {ui.callMe}
      </motion.a>
      <motion.a
        href={personal.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="rounded-full border border-sky-500/30 bg-sky-500/15 px-5 py-3 text-sm font-semibold text-sky-300 backdrop-blur-sm transition-transform hover:scale-105"
      >
        {ui.whatsapp}
      </motion.a>
    </div>
  );
}
