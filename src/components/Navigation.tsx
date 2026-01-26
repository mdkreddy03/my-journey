/**
 * NAVIGATION COMPONENT
 * ====================
 * This is a sticky navigation bar that stays at the top of the page.
 * 
 * Key concepts:
 * - useState: React hook to track if we've scrolled (for styling)
 * - useEffect: React hook to add scroll event listener
 * - Framer Motion: For smooth animations
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navigation = () => {
  // Track if user has scrolled - changes nav background
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // This function runs every time user scrolls
    const handleScroll = () => {
      // If scrolled more than 50px, set hasScrolled to true
      setHasScrolled(window.scrollY > 50);
    };

    // Add the listener when component mounts
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array = run once on mount

  // Navigation links - easy to modify!
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Hobbies", href: "#hobbies" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      // Initial animation when page loads
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      // Dynamic classes based on scroll state
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-background/90 backdrop-blur-md shadow-soft py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo/Name */}
        <a
          href="#"
          className="font-heading text-xl font-semibold text-foreground hover:text-primary transition-colors"
        >
          Portfolio
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              // Stagger the animation of each link
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground link-underline transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button - simplified */}
        <button className="md:hidden text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
