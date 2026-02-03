/**
 * ADVANCED EXPERIENCE SECTION - Apple-Inspired Timeline
 * =====================================================
 * Features: 3D Flip, Mouse-Following Gradient Spotlight, 
 * Moving Ambient Auras, and Smooth Height Expansion.
 */

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2, Zap } from "lucide-react";

// Tool highlighting logic remains consistent with your previous setup
const DE_KEYWORDS = [
  "Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", 
  "dbt", "Azure Synapse", "BigQuery", "Docker", "PostgreSQL", "Apache Spark", "Looker", "GitHub Actions",
  "ETL", "ELT", "Lakehouse", "Real-time", "Streaming", "HIPAA", "Row-Level Security", "RLS", 
  "Partitioning", "Star-schema", "CI/CD", "Forecasting", "Telemetry", "Data Pipeline", "Cloud"
];

const experiences = [
  {
    id: 1,
    role: "Data Engineer",
    company: "HCA Healthcare",
    period: "Aug 2023 - Present",
    domain: "Healthcare",
    description: "Developed a real-time clinical telemetry streaming pipeline that synchronizes data from 100+ diagnostic devices into a centralized cloud lakehouse.",
    skills: ["Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", "dbt", "Azure Synapse"],
    responsibilities: [
      "Developed a PySpark-based streaming layer, reducing time-to-insight from 15 minutes to sub-30 seconds for critical care units.",
      "Optimized Spark clusters and Snowflake auto-scaling, achieving 35% reduction in cloud expenditure for the department.",
      "Unified clinical data silos across the healthcare network, standardizing 200+ KPIs across diverse hospital units.",
      "Managed automated ETL workflows in Airflow, achieving 100% HIPAA compliance reporting accuracy for audit requirements.",
      "Implemented Row-Level Security and dynamic masking protocols, protecting 50M+ annual clinical patient records.",
      "Resolved partitioning bottlenecks in the primary data lakehouse, improving dashboard load times by 40%.",
      "Maintained 99.99% uptime during the migration of 500TB legacy data from on-premise systems to Snowflake.",
      "Integrated real-time telemetry into forecasting models to assist in staffing optimization and resource allocation."
    ]
  },
  // ... Other experiences follow the same structure
];

// Moving Background Auras for an "Advanced" feel
const BackgroundAura = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      animate={{ 
        x: [0, 100, 0], 
        y: [0, 50, 0],
        scale: [1, 1.2, 1] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full"
    />
    <motion.div 
      animate={{ 
        x: [0, -80, 0], 
        y: [0, 100, 0],
        scale: [1, 1.3, 1] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full"
    />
  </div>
);

const ExperienceCard = ({ exp }: { exp: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight Effect Calculation
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      className="group relative w-full cursor-pointer"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        layout
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          height: isFlipped ? "680px" : "500px" 
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* SpotLight Glow - Advanced Gradient Motion */}
        <motion.div
          className="absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
          style={{
            background: useMotionValue(`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(var(--primary-rgb), 0.15), transparent 80%)`),
          }}
        />

        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-2xl border border-white/5"
          style={{ backfaceVisibility: "hidden", zIndex: isFlipped ? 0 : 1 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              {exp.period}
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              {exp.domain}
            </span>
          </div>
          
          <h3 className="font-heading text-3xl font-bold text-white mb-1 tracking-tight">{exp.role}</h3>
          <p className="text-primary font-body font-semibold mb-6">{exp.company}</p>
          
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1.5 bg-white/5 text-muted-foreground text-[10px] rounded-lg border border-white/10 uppercase tracking-widest font-bold">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-primary font-body text-xs font-black uppercase tracking-[0.3em]">
            <div className="flex items-center gap-3">
               <div className="relative">
                 <Zap className="w-4 h-4 fill-primary animate-pulse" />
                 <div className="absolute inset-0 blur-md bg-primary/50 animate-pulse" />
               </div>
               <span>Impact Analysis</span>
            </div>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 border border-primary/40 bg-black/90 shadow-2xl flex flex-col"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)", 
            zIndex: isFlipped ? 1 : 0 
          }}
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-heading text-xl font-bold text-[#2997ff] tracking-tight">STRATEGIC CONTRIBUTIONS</h3>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-[#86868b] font-medium">Metric-Driven Results</p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={isFlipped ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 h-[1px] w-full bg-gradient-to-r from-primary/60 via-primary/10 to-transparent origin-left" 
            />
            
            <p className="mt-4 font-body text-[10px] uppercase tracking-[0.4em] text-primary/70 font-black">
              Work & Business Outcomes
            </p>
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar pr-4">
            <ul className="space-y-6">
              {exp.responsibilities.map((point: string, i: number) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -30 }}
                  animate={isFlipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + (i * 0.08) }}
                  className="font-body text-[13px] text-muted-foreground flex gap-4 leading-relaxed group/item"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_12px_rgba(var(--primary-rgb),1)]" />
                  <span className="group-hover/item:text-white transition-colors duration-300">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 text-center border-t border-white/5">
             <span className="text-primary/40 font-bold text-[9px] uppercase tracking-[0.5em] hover:text-primary transition-colors duration-300">
               Return to Overview
             </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pathHeight = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-32 relative overflow-hidden bg-black">
      <BackgroundAura />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-28"
        >
          <span className="text-primary text-[11px] font-black uppercase tracking-[0.6em] mb-4 block">
            Professional Odyssey
          </span>
          <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8">Experience</h2>
          
          <div className="inline-block relative">
            <p className="text-muted-foreground font-body text-sm md:text-lg tracking-wide max-w-3xl mx-auto px-6 py-3 border border-white/10 rounded-full glass">
              Data Engineer <span className="text-primary mx-3">⫸</span> 4.5+ Yrs Experience | Optimizing Data Infra for Accuracy & Cost-Efficiency | Spark, Airflow, AWS
            </p>
            {/* Pulsing light behind tagline */}
            <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full -z-10 animate-pulse" />
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line with Glowing Pulse */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
            <motion.div 
              style={{ height: pathHeight }} 
              className="absolute top-0 w-full bg-gradient-to-b from-primary via-blue-400 to-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.8)]" 
            />
          </div>

          <div className="space-y-24 md:pl-32 pl-0">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
