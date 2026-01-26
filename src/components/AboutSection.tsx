/**
 * ABOUT SECTION
 * =============
 * Personal introduction with an image and bio.
 * 
 * Key concepts:
 * - useInView: Framer Motion hook to detect when element is visible
 * - Grid layout: Responsive two-column layout
 * - whileInView: Animate only when element enters viewport
 */

import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase } from "lucide-react";

const AboutSection = () => {
  // Quick facts about yourself
  const quickFacts = [
    { icon: MapPin, label: "Based in", value: "San Francisco, CA" },
    { icon: Briefcase, label: "Experience", value: "5+ Years" },
    { icon: Mail, label: "Email", value: "hello@example.com" },
  ];

  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Get to know me
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            About Me
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl -rotate-3" />
            
            {/* Placeholder for your image */}
            <div className="relative aspect-[4/5] bg-secondary rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p className="font-body text-sm">Your Photo Here</p>
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Hello! I'm passionate about creating meaningful experiences.
            </h3>
            
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed mb-8">
              <p>
                I believe in the power of combining technical expertise with creative
                vision. Whether I'm building software or exploring new hiking trails,
                I approach everything with curiosity and dedication.
              </p>
              <p>
                When I'm not coding, you'll find me photography landscapes,
                experimenting in the kitchen, or getting lost in a good book. I believe
                that diverse interests make us better problem solvers and more
                empathetic collaborators.
              </p>
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-background rounded-xl"
                >
                  <fact.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-body text-xs text-muted-foreground mb-1">
                    {fact.label}
                  </p>
                  <p className="font-body text-sm font-medium text-foreground">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
