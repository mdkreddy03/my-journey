/**
 * JOURNEY SECTION - Life's Adventures
 * ====================================
 * Personal life tiles showcasing cooking, travel, hobbies.
 * Designed as a continuing journey/timeline of life.
 */

import { motion } from "framer-motion";
import { 
  ChefHat, 
  MapPin, 
  Camera, 
  Music, 
  BookOpen, 
  Gamepad2,
  Plane,
  Heart,
  Utensils,
  Mountain,
  Coffee,
  Palette
} from "lucide-react";

const journeyItems = [
  {
    id: 1,
    category: "Culinary Adventures",
    title: "Dishes I've Mastered",
    icon: ChefHat,
    description: "From experimenting with spices to perfecting family recipes. Cooking is my creative outlet.",
    highlights: ["Biryani", "Pasta", "Desserts", "Street Food"],
    color: "from-orange-500/20 to-red-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: 2,
    category: "Wanderlust",
    title: "Places Explored",
    icon: Plane,
    description: "Every destination tells a story. Collecting memories across mountains, beaches, and cities.",
    highlights: ["Mountains", "Beaches", "Heritage Sites", "Local Markets"],
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    id: 3,
    category: "Captured Moments",
    title: "Through My Lens",
    icon: Camera,
    description: "Photography lets me freeze time. From sunsets to street portraits, every click has a memory.",
    highlights: ["Landscapes", "Portraits", "Street", "Night Sky"],
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: 4,
    category: "Mind & Soul",
    title: "Books & Learning",
    icon: BookOpen,
    description: "Always curious, always learning. Books take me to worlds I've never been.",
    highlights: ["Tech Books", "Fiction", "Biographies", "Self-help"],
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
];

const miniMoments = [
  { icon: Coffee, label: "Coffee Lover", color: "text-amber-400" },
  { icon: Music, label: "Music Always On", color: "text-pink-400" },
  { icon: Mountain, label: "Weekend Hiker", color: "text-green-400" },
  { icon: Gamepad2, label: "Casual Gamer", color: "text-violet-400" },
  { icon: Palette, label: "Art Appreciator", color: "text-rose-400" },
  { icon: Utensils, label: "Foodie", color: "text-orange-400" },
];

const JourneySection = () => {
  return (
    <section id="journey" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 tech-grid opacity-10" />
      
      {/* Glow effects */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] -z-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10"
      />

      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-accent" />
            <span className="font-body text-sm text-accent">Beyond The Code</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Life Journey
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Life isn't just about work. Here's a glimpse into the moments that make me who I am.
          </p>
        </motion.div>

        {/* Journey tiles - Bento grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 h-full hover:border-primary/20 transition-all duration-300">
                {/* Category badge */}
                <span className="inline-block px-3 py-1 bg-muted/50 rounded-full font-body text-xs text-muted-foreground mb-4">
                  {item.category}
                </span>

                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1.5 bg-background/50 border border-border/50 rounded-lg font-body text-xs text-foreground/80"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini moments row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6"
        >
          <p className="font-body text-sm text-muted-foreground text-center mb-6">
            Little things that make life beautiful ✨
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {miniMoments.map((moment, index) => (
              <motion.div
                key={moment.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors">
                  <moment.icon className={`w-5 h-5 ${moment.color}`} />
                </div>
                <span className="font-body text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {moment.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneySection;
