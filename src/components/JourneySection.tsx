/**
 * JOURNEY SECTION - Personal Journey Tiles (Refactored)
 */

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChefHat, Plane, Lock, BarChart3 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import PrivateBlogModal from "./journey/PrivateBlogModal";
import InsightsLabModal from "./journey/InsightsLabModal";
import FolderModal from "./journey/FolderModal";

const PASSCODE = "1436";

const journeyItems = [
  { id: 1, title: "Culinary Adventures", subtitle: "Kitchen Experiments", icon: ChefHat, description: "Exploring flavors and creating dishes I love.", highlights: ["Biryani", "Pasta", "Desserts"], type: "folder", storageKey: "culinary_folders" },
  { id: 2, title: "Travel", subtitle: "Places Explored", icon: Plane, description: "Documenting journeys and unforgettable landscapes.", highlights: ["Mountains", "Beaches", "Cities"], type: "folder", storageKey: "travel_folders" },
  { id: 3, title: "Private Blog", subtitle: "Personal Notes", icon: Lock, description: "My private thoughts, reflections, and stories.", highlights: ["Notes", "Ideas", "Stories"], type: "blog", protected: true },
  { id: 4, title: "Portfolio Analytics", subtitle: "Full-Site Insights", icon: BarChart3, description: "Track visitor engagement across the entire portfolio.", highlights: ["Views", "Clicks", "Trends"], type: "analytics", protected: true },
];

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => { trackEvent("section_view", "Journey"); }, []);

  const handleClick = (item: any) => {
    trackEvent("click", item.title);
    if (item.protected) {
      const entered = prompt("Enter Passcode");
      if (entered !== PASSCODE) return alert("Incorrect Passcode");
      sessionStorage.setItem("journey_admin", "true");
    }
    setActiveModal(item.title);
  };

  return (
    <section ref={containerRef} id="journey" className="section-padding relative overflow-hidden bg-black/40">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] -z-10" />
      <div className="container mx-auto">
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-20">
          <span className="text-sm text-accent uppercase tracking-widest mb-4 block">Beyond The Code</span>
          <h2 className="text-5xl font-semibold mb-6">My Journey</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Experiences and passions that shape who I am outside engineering.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }} viewport={{ once: true }} onClick={() => handleClick(item)}
              className="glass rounded-[2.5rem] p-10 glow-border cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition">
                <item.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <span className="text-xs uppercase text-muted-foreground tracking-wider">{item.subtitle}</span>
              <h3 className="text-2xl font-semibold mt-1 mb-4 group-hover:text-primary transition">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{item.description}</p>
              <div className="flex flex-wrap gap-2">{item.highlights.map(h => (<span key={h} className="px-3 py-1 bg-background/40 rounded-lg text-xs">{h}</span>))}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal === "Private Blog" && <PrivateBlogModal onClose={() => setActiveModal(null)} />}
        {activeModal === "Portfolio Analytics" && <InsightsLabModal onClose={() => setActiveModal(null)} />}
        {activeModal === "Culinary Adventures" && <FolderModal title="Culinary Adventures" storageKey="culinary_folders" onClose={() => setActiveModal(null)} />}
        {activeModal === "Travel" && <FolderModal title="Travel" storageKey="travel_folders" onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default JourneySection;
