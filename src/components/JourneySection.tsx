/**
 * JOURNEY SECTION - Personal Journey Tiles
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChefHat, Plane, Lock, BarChart3 } from "lucide-react";

const PASSCODE = "1436";

const journeyItems = [
  {
    id: 1,
    title: "Culinary Adventures",
    subtitle: "Kitchen Experiments",
    icon: ChefHat,
    description: "Exploring flavors and creating dishes I love.",
    highlights: ["Biryani", "Pasta", "Desserts"],
    protected: false,
  },
  {
    id: 2,
    title: "Travel",
    subtitle: "Places Explored",
    icon: Plane,
    description: "Documenting journeys and unforgettable landscapes.",
    highlights: ["Mountains", "Beaches", "Cities"],
    protected: false,
  },
  {
    id: 3,
    title: "Private Blog",
    subtitle: "Personal Notes",
    icon: Lock,
    description: "My private thoughts, reflections, and stories.",
    highlights: ["Notes", "Ideas", "Stories"],
    protected: true,
  },
  {
    id: 4,
    title: "Insights Lab",
    subtitle: "Personal Analytics",
    icon: BarChart3,
    description: "Track site interactions and engagement data.",
    highlights: ["Most Viewed", "Most Clicked", "Top Sections"],
    protected: true,
  },
];

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const handleClick = (item: any) => {
    if (item.protected) {
      const entered = prompt("Enter Passcode");

      if (entered === PASSCODE) {
        alert(`Access granted to ${item.title}`);
      } else {
        alert("Incorrect Passcode");
      }
    } else {
      alert(`Opening ${item.title}`);
    }
  };

  return (
    <section
      ref={containerRef}
      id="journey"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <span className="text-sm text-accent uppercase tracking-widest mb-4 block">
            Beyond The Code
          </span>

          <h2 className="text-5xl font-semibold mb-6">My Journey</h2>

          <p className="text-muted-foreground max-w-xl mx-auto">
            Experiences and passions that shape who I am outside engineering.
          </p>
        </motion.div>

        {/* Tiles */}
        <div className="grid md:grid-cols-2 gap-6">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              onClick={() => handleClick(item)}
              className="glass rounded-3xl p-10 glow-border cursor-pointer group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition">
                <item.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition" />
              </div>

              <span className="text-xs uppercase text-muted-foreground tracking-wider">
                {item.subtitle}
              </span>

              <h3 className="text-2xl font-semibold mt-1 mb-4 group-hover:text-primary transition">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-6">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1 bg-background/40 rounded-lg text-xs"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;