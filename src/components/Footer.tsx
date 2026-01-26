/**
 * FOOTER - Simple and Clean
 * ==========================
 */

import { motion } from "framer-motion";
import { Database, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border bg-card/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <span className="font-heading text-lg font-semibold text-foreground">
              Your Name
            </span>
          </div>

          {/* Copyright */}
          <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-primary" /> and lots of data
          </p>

          {/* Year */}
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
