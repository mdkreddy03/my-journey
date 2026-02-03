/**
 * CONTACT SECTION - Apple-Inspired Minimal
 * =========================================
 * Clean, focused, elegant contact section.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:mdkreddy03@gmail.com" },
];

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto max-w-3xl">
        <motion.div
          style={{ y, opacity }}
          className="text-center"
        >
          {/* Large heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8 leading-tight"
          >
            Let's build something{" "}
            <span className="text-gradient-blue">together</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            Have a project in mind or want to chat about data? 
            I'm always open to new opportunities.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            href="mailto:mdkreddy03@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full hover:shadow-glow transition-all duration-300 mb-16 group"
          >
            <Mail className="w-5 h-5" />
            mdkreddy03@gmail.com
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-muted-foreground/60"
          >
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">Based in Denton, Texas</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
