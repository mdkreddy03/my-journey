/**
 * CONTACT SECTION - Get in Touch
 * ===============================
 * Professional contact section with tech styling.
 */

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, Send, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-400" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-red-400" },
  { icon: Mail, label: "Email", href: "mailto:mdkreddy03@gmail.com", color: "hover:text-primary" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 tech-grid opacity-10" />
      
      {/* Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10"
      />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Send className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-primary">Let's Connect</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          
          <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Have a project in mind or just want to chat about data? 
            I'm always open to new opportunities and conversations.
          </p>

          {/* Email CTA */}
          <motion.a
            href="mailto:mdkreddy03@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:shadow-glow transition-all duration-300 mb-12"
          >
            <Mail className="w-5 h-5" />
            mdkreddy03@gmail.com
          </motion.a>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={`w-12 h-12 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:border-primary/30`}
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
            className="flex items-center justify-center gap-2 mt-12 text-muted-foreground"
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
