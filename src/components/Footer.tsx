/**
 * FOOTER - Apple-Inspired Minimal
 * ================================
 * Clean, simple, elegant footer.
 */

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <span className="font-heading text-lg font-semibold text-foreground">
            Dharani Majji
          </span>

          {/* Copyright */}
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </p>

          {/* Built with */}
          <p className="font-body text-sm text-muted-foreground/60">
            Crafted with precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
