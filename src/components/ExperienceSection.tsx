import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, Building2, RotateCcw, PenTool, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Data Engineer",
    company: "HCA Healthcare",
    period: "Aug 2023 - Present",
    description: "Engineered a real-time clinical telemetry streaming pipeline that synchronizes data from 100+ diagnostic devices into a centralized cloud lakehouse, resolving a critical 15-minute data lag.",
    skills: ["Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", "dbt", "Azure Synapse"],
    type: "current",
    responsibilities: [
      "Resolved data latency pain points by architecting a PySpark-based streaming layer, reducing time-to-insight from 15 minutes to sub-30 seconds.",
      "Optimized compute-heavy Spark clusters and Snowflake auto-scaling, resulting in a documented 35% reduction in monthly cloud expenditure.",
      "Eliminated manual auditing bottlenecks by architecting automated ETL workflows in Airflow, achieving 100% HIPAA compliance reporting accuracy.",
      "Mitigated data security risks through Row-Level Security (RLS) and dynamic masking, protecting sensitive clinical data for 50M+ annual records.",
      "Optimized query performance for emergency department reporting by resolving complex partitioning bottlenecks, improving dashboard load times by 40%.",
      "Unified fragmented clinical data silos into a single verified source of truth, standardizing 200+ KPIs across diverse hospital units.",
      "Engineered high-availability data architectures that maintained 99.99% uptime during the migration of 500TB of legacy on-premise data.",
      "Resolved data-driven staffing shortages by integrating real-time telemetry into high-fidelity forecasting models for hospital leadership."
    ]
  },
  {
    id: 2,
    role: "Associate Data Analyst / Data Engineer",
    company: "Accenture",
    period: "June 2019 - July 2021",
    description: "Developed a multi-source ELT framework to consolidate data from fragmented payment APIs into BigQuery, successfully resolving $2M+ in monthly transaction reconciliation discrepancies.",
    skills: ["Python", "dbt", "BigQuery", "Docker", "SQL", "Looker", "Apache Spark", "GitHub", "Power BI", "PostgreSQL"],
    type: "past",
    responsibilities: [
      "Resolved the pain point of financial data drift by developing a dbt-based transformation layer, ensuring 99.8% reconciliation accuracy.",
      "Optimized BigQuery slot utilization and partitioned table structures, achieving a 60% reduction in query execution times for the analytics team.",
      "Minimized production downtime by containerizing data workflows with Docker, reducing environment-related deployment errors by 25%.",
      "Eliminated data quality blind spots by implementing automated validation checks via Great Expectations, catching 95% of upstream schema drifts.",
      "Optimized executive decision-making speed by architecting star-schema models, increasing dashboard refresh rates by 3x.",
      "Resolved the manual reporting burden by automating 15+ weekly data extraction tasks via Python, saving the engineering team 60 hours per month.",
      "Streamlined high-volume ingestion from 10+ third-party APIs into a centralized warehouse for unified customer behavior profiling.",
      "Collaborated with product teams to translate complex user engagement metrics into actionable data points for a base of 1M+ active users."
    ]
  }
];

// Helper to highlight tools with the specific "motion color" from your screenshot
const HighlightTools = ({ text, tools }: { text: string; tools: string[] }) => {
  let parts = [text];
  tools.forEach((tool) => {
    const newParts: any[] = [];
    parts.forEach((part) => {
      if (typeof part === "string") {
        const regex = new RegExp(`(${tool})`, "gi");
        const split = part.split(regex);
        split.forEach((s, i) => {
          if (s.toLowerCase() === tool.toLowerCase()) {
            newParts.push(
              <span key={i} className="text-[#60a5fa] font-bold drop-shadow-[0_0_3px_rgba(96,165,250,0.5)]">
                {s}
              </span>
            );
          } else {
            newParts.push(s);
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });
  return <>{parts}</>;
};

const ExperienceCard = ({ exp }: { exp: typeof experiences[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      animate={{ 
        height: isFlipped ? 650 : 400,
        width: "100%"
      }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 22 }}
      className="relative cursor-pointer mb-12"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE (Compact Mode) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col shadow-2xl"
          style={{ backfaceVisibility: "hidden", zIndex: isFlipped ? 0 : 2 }}
        >
          {exp.type === 'current' && (
            <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-3 border border-primary/30">
              Current Role
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground mb-1 font-mono text-[10px]">
            <Calendar className="w-3 h-3 text-primary" /> {exp.period}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
          <div className="flex items-center gap-2 text-primary font-medium mb-4 text-sm">
            <Building2 className="w-4 h-4" /> {exp.company}
          </div>
          
          <p className="text-gray-400 text-xs italic border-l-2 border-primary/30 pl-4 mb-4 line-clamp-3">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {exp.skills.slice(0, 6).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-white/5 text-gray-300 text-[9px] rounded-md border border-white/10">
                {skill}
              </span>
            ))}
            {exp.skills.length > 6 && <span className="text-[9px] text-primary/60 font-mono">+{exp.skills.length - 6} more</span>}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-primary font-mono text-[9px] uppercase tracking-widest">
            <span>Click to expand Impact</span>
            <RotateCcw className="w-3 h-3 animate-pulse" />
          </div>
        </div>

        {/* BACK SIDE (Expanded Mode) */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border border-primary/40 rounded-2xl p-6 md:p-8 flex flex-col shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 10 : 0 
          }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-primary tracking-widest uppercase">Responsibilities</h3>
              <p className="text-[10px] text-muted-foreground font-mono">DATA & OUTCOMES</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-grow overflow-y-auto pr-3 custom-scrollbar">
            <ul className="space-y-5">
              {exp.responsibilities.map((point, i) => (
                <li key={i} className="text-[13px] text-gray-300 flex gap-4 leading-relaxed group">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_#60a5fa]" />
                  <span>
                    <HighlightTools text={point} tools={exp.skills} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-colors">
            <PenTool className="w-4 h-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest">Click to return to overview</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pathHeight = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const pointerPos = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-20 bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
            Professional <span className="text-[#60a5fa] italic">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic text-sm">
            4.5+ years of data engineering expertise focused on infrastructure ROI and clinical accuracy.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* TRACK LINE */}
          <div className="absolute left-0 md:left-0 top-0 bottom-0 w-[1px] bg-white/10">
            <motion.div style={{ height: pathHeight }} className="absolute top-0 w-full bg-[#60a5fa] shadow-[0_0_15px_#60a5fa] origin-top" />
            <motion.div style={{ top: pointerPos }} className="absolute -left-[5px] w-3 h-3 rounded-full bg-[#60a5fa] border-2 border-[#020617] z-20" />
          </div>

          <div className="pl-8 md:pl-16">
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
