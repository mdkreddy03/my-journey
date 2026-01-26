/**
 * HOBBIES SECTION
 * ===============
 * Showcase your personal interests and hobbies.
 * 
 * Key concepts:
 * - Grid layout: Masonry-style responsive grid
 * - Scale animations: Cards grow slightly on hover
 * - Icon usage: Lucide React icons
 */

import { motion } from "framer-motion";
import { Camera, Mountain, BookOpen, Music, Coffee, Palette } from "lucide-react";

// Your hobbies - customize these!
const hobbies = [
  {
    id: 1,
    name: "Photography",
    icon: Camera,
    description:
      "Capturing moments and landscapes. I love street photography and nature shots during golden hour.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: 2,
    name: "Hiking",
    icon: Mountain,
    description:
      "Exploring trails and mountains. Nothing beats the feeling of reaching a summit and taking in the view.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 3,
    name: "Reading",
    icon: BookOpen,
    description:
      "Getting lost in books. From sci-fi novels to biographies, I'm always reading something new.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 4,
    name: "Music",
    icon: Music,
    description:
      "Playing guitar and discovering new artists. Music is my go-to for relaxation and creativity.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: 5,
    name: "Coffee",
    icon: Coffee,
    description:
      "Brewing the perfect cup. I've become quite the home barista and love trying new beans.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: 6,
    name: "Art",
    icon: Palette,
    description:
      "Sketching and painting. I find it therapeutic to express ideas visually on canvas.",
    color: "bg-pink-500/10 text-pink-600",
  },
];

const HobbiesSection = () => {
  return (
    <section id="hobbies" className="section-padding bg-card">
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
            Beyond Work
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Personal Interests
          </h2>
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-background p-6 rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 cursor-pointer group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${hobby.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <hobby.icon className="w-7 h-7" />
              </div>

              {/* Name */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {hobby.name}
              </h3>

              {/* Description */}
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
