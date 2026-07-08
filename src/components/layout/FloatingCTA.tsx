"use client";

import { personalInfo } from "@/data/cv";
import { motion } from "framer-motion";

export function FloatingCTA() {
  const phoneHref = `tel:${personalInfo.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <motion.a
        href={phoneHref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="rounded-full bg-gradient-to-r from-fuchsia-500 to-teal-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/40 transition-transform hover:scale-105"
      >
        Call Me
      </motion.a>
      <motion.a
        href={personalInfo.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="rounded-full border border-teal-500/30 bg-teal-500/15 px-5 py-3 text-sm font-semibold text-teal-300 backdrop-blur-sm transition-transform hover:scale-105"
      >
        WhatsApp
      </motion.a>
    </div>
  );
}
