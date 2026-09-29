import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haifa-portfolio-seven.vercel.app";

export const metadata: Metadata = {
  title: "Hayfa Talili — Product Owner · Product Manager · Business Analyst",
  description:
    "Product Owner with 3+ years managing digital products from discovery to production — functional specifications, backlog prioritization, Agile/Scrum delivery, and UAT.",
  keywords: [
    "Hayfa Talili",
    "Product Owner Tunisia",
    "Product Manager",
    "Business Analyst",
    "Functional Analysis",
    "UAT",
    "Agile Scrum",
    "Jira",
    "Product Backlog",
    "Roadmap Planning",
    "Digital Products",
    "Figma",
    "Power BI",
  ],
  authors: [{ name: "Hayfa Talili" }],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Hayfa Talili — Product Owner · Product Manager · Business Analyst",
    description:
      "3+ years of product ownership — discovery, functional specs, user stories, Agile/Scrum delivery, and UAT.",
    url: siteUrl,
    siteName: "Hayfa Talili Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/haifa-profile.png", width: 500, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayfa Talili — Product Owner · Product Manager · Business Analyst",
    description:
      "Product Owner & Business Analyst — Agile/Scrum delivery from discovery to production.",
    images: ["/images/haifa-profile.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body
        className="min-h-full bg-[var(--background)] antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
