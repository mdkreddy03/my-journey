/**
 * ABOUT SECTION - Apple-Inspired Scroll Reveal
 * =============================================
 * Smooth text reveals, parallax elements, minimal design.jsg
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Briefcase, Database, Zap } from "lucide-react";

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { value: "4.5+", label: "Years Experience", icon: Briefcase },
    { value: "10+", label: "Projects Delivered", icon: Zap },
    { value: "10+", label: "Tools Mastered", icon: Database },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="section-padding relative overflow-hidden"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Large statement text */}
        <motion.div
          style={{ y, opacity }}
          className="text-center mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight tracking-tight"
          >
            I'm a <span className="text-gradient-blue">Data Engineer</span> who 
            transforms complex datasets into{" "}
            <span className="text-muted-foreground/70">elegant solutions</span> that 
            drive real business value.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image placeholder with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 md:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
            <div className="relative aspect-[4/5] glass rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Database className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-body text-sm text-muted-foreground/50">Your Photo</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8">
              About Me
            </h2>
            
            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p className="text-lg">
                I specialize in building scalable data pipelines and turning complex 
                datasets into actionable insights. My journey started with a 
                curiosity about how businesses make decisions from numbers.
              </p>
              <p>
                When I'm not wrangling data, you'll find me exploring new places, 
                experimenting in the kitchen, or capturing moments through my camera.
              </p>
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mt-8 text-muted-foreground"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-body text-sm">Denton, Texas</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
