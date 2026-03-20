/**
 * HERO SECTION - Apple-Inspired Scroll Animations
 * With AI-powered dynamic taglines
 */

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

// AI-powered context-aware taglines
const getSmartTagline = () => {
  const day = new Date().getDay();
  const taglines = [
    "Building elegant data pipelines by day, exploring life's adventures by night.",
    "Engineering data solutions that drive real business impact.",
    "Where clean architecture meets scalable data infrastructure.",
    "Turning complex data challenges into streamlined solutions.",
  ];
  return taglines[day % taglines.length];
};

// Typing animation hook
const useTypingEffect = (text: string, speed = 40) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const smartTagline = getSmartTagline();
  const { displayed: typedTagline, done: typingDone } = useTypingEffect(smartTagline, 35);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  const titleY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const subtitleY = useTransform(smoothProgress, [0, 1], [0, 100]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const blurAmount = useTransform(smoothProgress, [0, 0.5], [0, 10]);
  const orb1Y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(smoothProgress, [0, 1], [0, -150]);
  const orb1Scale = useTransform(smoothProgress, [0, 0.5], [1, 1.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={containerRef} id="hero"
      className="min-h-[120vh] flex items-start justify-center relative overflow-hidden pt-32 md:pt-40"
    >
      <div className="fixed inset-0 -z-20" style={{ background: "var(--gradient-hero)" }} />

      <motion.div style={{ y: orb1Y, scale: orb1Scale }}
        className="fixed top-[20%] right-[15%] w-[500px] h-[500px] rounded-full -z-10 animate-pulse-glow"
      >
        <div className="w-full h-full bg-primary/20 rounded-full blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: orb2Y }}
        className="fixed top-[40%] left-[10%] w-[400px] h-[400px] rounded-full -z-10 animate-pulse-glow"
      >
        <div className="w-full h-full bg-accent/15 rounded-full blur-[100px]" />
      </motion.div>

      <div className="fixed inset-0 -z-10 dot-grid opacity-30" />

      <motion.div
        style={{ y: titleY, opacity, scale, filter: blurAmount.get() > 0 ? `blur(${blurAmount.get()}px)` : 'none' }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-muted-foreground">Data Engineer & Analyst</span>
          </motion.div>

          <motion.h1 variants={itemVariants} style={{ y: subtitleY }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-semibold text-foreground mb-8 tracking-tight"
          >
            Dharani Kishore Reddy Majji
          </motion.h1>

          <motion.p variants={itemVariants} className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 font-light">
            Transforming raw data into{" "}
            <span className="text-gradient-blue font-medium">actionable insights</span>
          </motion.p>

          <motion.p variants={itemVariants} className="font-body text-base md:text-lg text-muted-foreground/60 max-w-lg mx-auto mb-14">
            {typedTagline}
            {!typingDone && <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a href="#skills" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full transition-all duration-300 hover:shadow-glow flex items-center gap-3"
            >
              Explore My Work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </motion.a>
            <motion.a href="#journey" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="px-8 py-4 glass text-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-muted/20"
            >
              My Journey
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity }} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-body text-xs text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
