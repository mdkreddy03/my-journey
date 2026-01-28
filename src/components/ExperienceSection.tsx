/**
 * EXPERIENCE SECTION - Professional Portfolio
 * ===========================================
 * Fixes: 
 * 1. Forced Visibility: Uses z-index toggling to ensure responsibilities appear.
 * 2. Dynamic Timeline: Syncs the vertical line growth with the scroll pointer.
 * 3. Unified Borders: Applies consistent 2px borders across all roles.
 */

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

const ExperienceCard = ({ exp }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative min-h-[600px] w-full cursor-pointer group"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border-2 border-primary/40 rounded-3xl p-8 flex flex-col shadow-2xl"
          style={{ backfaceVisibility: "hidden", zIndex: isFlipped ? 0 : 10 }}
        >
          {exp.type === 'current' && (
            <div className="bg-primary/20 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-4 border border-primary/30">
              Current Role
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground mb-2 font-mono text-xs">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            {exp.period}
          </div>

          <h3 className="text-3xl font-bold text-white mb-1">{exp.role}</h3>
          
          <div className="flex items-center gap-2 text-primary/90 font-medium mb-6">
            <Building2 className="w-4 h-4" />
            {exp.company}
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <h4 className="text-[10px] font-mono text-primary uppercase tracking-wider mb-2">Description:</h4>
              <p className="text-gray-300 leading-relaxed text-sm italic border-l-2 border-primary/20 pl-4">
                {exp.description}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-primary uppercase tracking-wider mb-3">Tools Used:</h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-secondary/30 text-secondary-foreground text-[10px] rounded-xl border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-primary font-mono text-[10px] uppercase tracking-widest">
            <span>Click to view impact & results</span>
            <RotateCcw className="w-4 h-4" />
          </div>
        </div>

        {/* BACK SIDE - FORCED VISIBILITY FIX */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border-2 border-primary/60 rounded-3xl p-8 flex flex-col shadow-glow"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 20 : 0 // HIGHER Z-INDEX WHEN FLIPPED
          }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-primary tracking-widest uppercase">Responsibilities</h3>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-grow overflow-hidden relative">
            {/* The list of 8 points specifically for the back of the card */}
            <ul className="space-y-5 overflow-y-auto h-full pr-4 custom-scrollbar">
              {exp.responsibilities.map((point, i) => (
                <li key={i} className="text-[14px] text-gray-200 flex gap-4 leading-relaxed group/item">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0 shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                  <span className="group-hover:text-white transition-colors">{point}</span>
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
    </div>
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
    <section id="experience" ref={containerRef} className="py-20 relative bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
            Professional <span className="text-primary italic">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic">
            4.5+ years of data engineering excellence focused on architectural scalability and clinical data integrity.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* THE SYNCED TIMELINE TRACK */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[2px] bg-white/10">
            {/* GROWING LINE: Follows scroll */}
            <motion.div 
              style={{ height: pathHeight }}
              className="absolute top-0 w-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)] origin-top"
            />
            {/* SYNCED POINTER: Follows scroll */}
            <motion.div 
              style={{ top: pointerPos }}
              className="absolute -left-[11px] w-6 h-6 rounded-full bg-primary border-4 border-[#020617] shadow-glow z-20 flex items-center justify-center"
            >
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </motion.div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-12 md:pl-32"
              >
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
