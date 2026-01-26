/**
 * HERO SECTION - Data Engineer Focus
 * ===================================
 * Modern, tech-inspired hero with animated elements.
 */

import { motion } from "framer-motion";
import { ArrowDown, Database, BarChart3, Workflow, Sparkles } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  // Floating icons for tech vibe
  const floatingIcons = [
    { Icon: Database, delay: 0, x: "10%", y: "20%" },
    { Icon: BarChart3, delay: 0.5, x: "85%", y: "15%" },
    { Icon: Workflow, delay: 1, x: "75%", y: "70%" },
    { Icon: Sparkles, delay: 1.5, x: "15%", y: "75%" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient and grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 -z-10 tech-grid opacity-30" />

      {/* Glowing orbs */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/30 rounded-full blur-[100px]"
      />

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className="absolute hidden md:block"
          style={{ left: x, top: y }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: delay }}
          >
            <Icon className="w-8 h-8 text-primary/50" />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
        >
          <Database className="w-4 h-4 text-primary" />
          <span className="font-body text-sm text-primary">Data Engineer & Analyst</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
        >
          Your Name
        </motion.h1>

        {/* Tagline with gradient */}
        <motion.p
          variants={itemVariants}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
        >
          Transforming raw data into{" "}
          <span className="gradient-text font-semibold">actionable insights</span>
        </motion.p>
        
        <motion.p
          variants={itemVariants}
          className="font-body text-base text-muted-foreground/70 max-w-xl mx-auto mb-10"
        >
          Building data pipelines by day, exploring life's adventures by night.
          This is my journey through code, data, and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#skills"
            className="group px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <BarChart3 className="w-5 h-5" />
            View My Skills
          </a>
          <a
            href="#journey"
            className="px-8 py-4 border border-primary/30 text-foreground font-body font-medium rounded-full hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            Explore My Journey
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
            <ArrowDown className="w-6 h-6 text-primary/60" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
