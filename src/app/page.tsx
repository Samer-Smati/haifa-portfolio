import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { LinkedInShowcase } from "@/components/sections/LinkedInShowcase";
import { Hero } from "@/components/sections/Hero";
import { HireCTA } from "@/components/sections/HireCTA";
import { Impact } from "@/components/sections/Impact";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main>
        <Hero />
        <About />
        <Impact />
        <Projects />
        <Experience />
        <Expertise />
        <Skills />
        <LinkedInShowcase />
        <Education />
        <HireCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
