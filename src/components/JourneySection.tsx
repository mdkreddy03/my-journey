/**
 * JOURNEY SECTION - Apple-Inspired Bento Grid
 * ============================================
 * Scroll-triggered reveals, floating animations, minimal design.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ChefHat, 
  Camera, 
  Music, 
  BookOpen,
  Plane,
  Coffee,
  Mountain,
  Gamepad2
} from "lucide-react";

const journeyItems = [
  {
    id: 1,
    title: "Culinary Adventures",
    subtitle: "Dishes I've Mastered",
    icon: ChefHat,
    description: "From experimenting with spices to perfecting family recipes.",
    highlights: ["Biryani", "Pasta", "Desserts"],
    size: "large",
  },
  {
    id: 2,
    title: "Wanderlust",
    subtitle: "Places Explored",
    icon: Plane,
    description: "Collecting memories across mountains and beaches.",
    highlights: ["Mountains", "Beaches", "Cities"],
    size: "medium",
  },
  {
    id: 3,
    title: "Photography",
    subtitle: "Through My Lens",
    icon: Camera,
    description: "Freezing moments in time.",
    highlights: ["Landscapes", "Portraits"],
    size: "medium",
  },
  {
    id: 4,
    title: "Reading",
    subtitle: "Books & Learning",
    icon: BookOpen,
    description: "Always curious, always learning.",
    highlights: ["Tech", "Fiction"],
    size: "small",
  },
];

const miniMoments = [
  { icon: Coffee, label: "Coffee Lover" },
  { icon: Music, label: "Music Always On" },
  { icon: Mountain, label: "Weekend Hiker" },
  { icon: Gamepad2, label: "Casual Gamer" },
];

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="journey" 
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block font-body text-sm text-accent uppercase tracking-widest mb-4"
          >
            Beyond The Code
          </motion.span>
          <h2 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-6">
            Life Journey
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            The moments that shape who I am
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`
                ${item.size === 'large' ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
                ${item.size === 'medium' ? '' : ''}
              `}
            >
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="h-full glass rounded-3xl p-8 glow-border group cursor-default"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                  <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-500" />
                </div>

                {/* Content */}
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  {item.subtitle}
                </span>
                <h3 className="font-heading text-2xl font-semibold text-foreground mt-1 mb-4 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1.5 bg-background/40 rounded-lg font-body text-xs text-foreground/70"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mini moments row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <p className="font-body text-sm text-muted-foreground text-center mb-8">
            Little things that bring joy
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {miniMoments.map((moment, index) => (
              <motion.div
                key={moment.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-3 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300">
                  <moment.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
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
