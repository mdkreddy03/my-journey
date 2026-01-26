/**
 * HERO SECTION
 * ============
 * The first thing visitors see - makes the first impression!
 * 
 * Key concepts:
 * - Framer Motion variants: Define animation states
 * - Staggered children: Each element animates one after another
 * - Responsive design: Different layouts for mobile/desktop
 */

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  // Container animation - controls when children animate
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // Stagger each child element by 0.2 seconds
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  // Individual item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient using CSS variable */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-warm)" }}
      />

      {/* Decorative circle - adds visual interest */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center"
      >
        {/* Greeting text */}
        <motion.p
          variants={itemVariants}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          Welcome to my world
        </motion.p>

        {/* Main heading - your name goes here */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
        >
          Your Name
        </motion.h1>

        {/* Tagline/description */}
        <motion.p
          variants={itemVariants}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          A passionate{" "}
          <span className="text-primary font-medium">software developer</span>{" "}
          crafting digital experiences by day, and an adventurous soul exploring
          the world's wonders by night.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#experience"
            className="px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-foreground/20 text-foreground font-body font-medium rounded-full hover:bg-foreground/5 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
