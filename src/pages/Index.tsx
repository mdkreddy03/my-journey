/**
 * INDEX PAGE - Data Engineer Portfolio
 */

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AIGuide from "@/components/AIGuide";
import { trackEvent } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    trackEvent("pageview", "Portfolio");

    // Track section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            trackEvent("section_view", entry.target.id || "hero");
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <JourneySection />
      <ContactSection />
      <Footer />
      <AIGuide />
    </main>
  );
};

export default Index;
