"use client";

import { LocaleProvider } from "@/context/LocaleProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
