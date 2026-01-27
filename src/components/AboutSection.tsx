/**
 * ABOUT SECTION - Personal Introduction
 * ======================================
 * Who I am - the data engineer with a life story.
 */

import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase, Code2, Database, LineChart } from "lucide-react";

const AboutSection = () => {
  const quickFacts = [
    { icon: Briefcase, label: "Role", value: "Data Engineer / Data Analyst" },
    { icon: MapPin, label: "Location", value: "Denton, Texas" },
    { icon: Database, label: "Specialty", value: "Data Pipelines" },
  ];

  const stats = [
    { value: "4.5+", label: "Years Experience" },
    { value: "10+", label: "Projects Delivered" },
    { value: "10+", label: "Tools Mastered" },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10 tech-grid opacity-20" />
      
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-primary">The Person Behind The Data</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            About Me
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column with decorative elements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative gradient background */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
            
            {/* Photo placeholder with tech decoration */}
            <div className="relative aspect-[4/5] bg-card border border-border rounded-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Database className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="font-body text-sm text-muted-foreground">Your Photo Here</p>
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-lg" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-accent/20 rounded-lg" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-elevated hidden md:block"
            >
              <div className="flex gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Turning Data Chaos into{" "}
              <span className="gradient-text">Clarity</span>
            </h3>
            
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed mb-8">
              <p>
                I'm a Data Engineer / Data Analyst who loves the challenge of building scalable data 
                pipelines and turning complex datasets into actionable insights. My 
                journey started with curiosity about how businesses make decisions 
                from numbers.
              </p>
              <p>
                When I'm not wrangling data, you'll find me exploring new places, 
                experimenting in the kitchen, or capturing moments through my camera 
                lens. I believe life is a continuous journey of learning and experiences.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
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

            {/* Mobile stats */}
            <div className="md:hidden grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-center p-3 bg-primary/5 rounded-xl"
                >
                  <p className="font-heading text-xl font-bold text-primary">{stat.value}</p>
                  <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
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
