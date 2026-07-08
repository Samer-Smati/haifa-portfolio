import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://haifa-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Hayfa Talili — Product Owner / Product Manager",
  description:
    "Product Owner with 3+ years managing digital products end-to-end — Agile/Scrum, backlog management, roadmaps, and KPI-driven delivery.",
  keywords: [
    "Hayfa Talili",
    "Product Owner Tunisia",
    "Product Manager",
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
    title: "Hayfa Talili — Product Owner / Product Manager",
    description:
      "3+ years product ownership. Agile, Scrum, roadmaps, user stories, and stakeholder alignment.",
    url: siteUrl,
    siteName: "Hayfa Talili Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/haifa-profile.png", width: 500, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayfa Talili — Product Owner / Product Manager",
    description:
      "Product Owner with Agile/Scrum expertise — discovery to production delivery.",
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
        className="min-h-full bg-[#0f0a12] antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
