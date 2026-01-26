/**
 * CONTACT SECTION
 * ===============
 * Simple contact section with social links and email.
 * 
 * Key concepts:
 * - Social links: Easy to update with your profiles
 * - Hover effects: Interactive icons
 * - Accessibility: Proper link labels
 */

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, ArrowUpRight } from "lucide-react";

// Your social links - update these!
const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section header */}
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Let's Connect
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            I'm always open to discussing new opportunities, creative ideas, or
            just having a chat. Feel free to reach out!
          </p>

          {/* Email button */}
          <motion.a
            href="mailto:hello@example.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body font-medium rounded-full hover:shadow-elevated transition-all duration-300 mb-12"
          >
            <Mail className="w-5 h-5" />
            hello@example.com
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-card rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-soft transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
