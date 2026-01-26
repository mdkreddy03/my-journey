/**
 * INDEX PAGE - Main Portfolio Page
 * =================================
 * This is the entry point that combines all sections.
 * 
 * Key concept:
 * - Component composition: Building a page from smaller components
 * - Each component is responsible for its own section
 * - Easy to reorder, add, or remove sections
 */

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import HobbiesSection from "@/components/HobbiesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    // Main wrapper - smooth scrolling enabled
    <main className="min-h-screen bg-background">
      {/* Navigation - sticky at top */}
      <Navigation />
      
      {/* Page sections in order */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <HobbiesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
