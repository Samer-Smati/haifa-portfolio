import { personalInfo } from "@/data/cv";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    url: personalInfo.portfolioUrl,
    image: `${personalInfo.portfolioUrl}/images/haifa-profile.png`,
    sameAs: [personalInfo.linkedin],
    knowsLanguage: ["Arabic", "French", "English"],
    knowsAbout: [
      "Product Management",
      "Agile",
      "Scrum",
      "Product Backlog",
      "Roadmap Planning",
      "Jira",
      "User Stories",
      "KPI Tracking",
    ],
    workLocation: {
      "@type": "Place",
      name: personalInfo.location,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
