/**
 * EXPERIENCE SECTION - Professional Portfolio
 * ===========================================
 * Content: Extended 8-point responsibilities with pain-point resolution.
 */

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Building2, RotateCcw, PenTool, CheckCircle2 } from "lucide-react";

// The experience data with your requested 8 points for each role
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
      "Resolved data latency pain points by architecting a PySpark-based streaming layer, reducing time-to-insight from 15 minutes to sub-30 seconds. [cite: 2026-01-22]",
      "Optimized compute-heavy Spark clusters and Snowflake auto-scaling, resulting in a documented 35% reduction in monthly cloud expenditure. [cite: 2025-12-17]",
      "Eliminated manual auditing bottlenecks by architecting automated ETL workflows in Airflow, achieving 100% HIPAA compliance reporting accuracy. [cite: 2025-12-17]",
      "Mitigated data security risks through Row-Level Security (RLS) and dynamic masking, protecting sensitive clinical data for 50M+ annual records. [cite: 2025-12-17]",
      "Optimized query performance for emergency department reporting by resolving complex partitioning bottlenecks, improving dashboard load times by 40%. [cite: 2025-12-17]",
      "Unified fragmented clinical data silos into a single verified source of truth, standardizing 200+ KPIs across diverse hospital units. [cite: 2025-12-17]",
      "Engineered high-availability data architectures that maintained 99.99% uptime during the migration of 500TB of legacy on-premise data. [cite: 2025-12-17]",
      "Resolved data-driven staffing shortages by integrating real-time telemetry into high-fidelity forecasting models for hospital leadership. [cite: 2026-01-22]"
    ]
  },
  {
    id: 2,
    role: "Associate Data Analyst / Data Engineer",
    company: "Accenture",
    period: "June 2019 - July 2021",
    description: "Developed a multi-source ELT framework to consolidate data from fragmented payment APIs into BigQuery, resolving $2M+ in monthly transaction discrepancies.",
    skills: ["Python", "dbt", "BigQuery", "Docker", "SQL", "Looker", "Apache Spark", "GitHub", "Power BI", "PostgreSQL"],
    type: "past",
    responsibilities: [
      "Resolved the pain point of financial data drift by developing a dbt-based transformation layer, ensuring 99.8% reconciliation accuracy. [cite: 2025-12-17]",
      "Optimized BigQuery slot utilization and partitioned table structures, achieving a 60% reduction in query execution times for the analytics team. [cite: 2025-12-17]",
      "Minimized production downtime by containerizing data workflows with Docker, reducing environment-related deployment errors by 25%. [cite: 2025-12-17]",
      "Eliminated data quality blind spots by implementing automated validation checks via Great Expectations, catching 95% of upstream schema drifts. [cite: 2025-12-17]",
      "Optimized executive decision-making speed by architecting star-schema models, increasing dashboard refresh rates by 3x. [cite: 2025-12-17]",
      "Resolved the manual reporting burden by automating 15+ weekly data extraction tasks via Python, saving the engineering team 60 hours per month. [cite: 2025-12-17]",
      "Streamlined high-volume ingestion from 10+ third-party APIs into a centralized warehouse for unified customer behavior profiling. [cite: 2025-12-17]",
      "Collaborated with product teams to translate complex user engagement metrics into actionable data points for a base of 1M+ active users. [cite: 2025-12-17]"
    ]
  }
];

const ExperienceCard = ({ exp }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative min-h-[580px] w-full cursor-pointer group"
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
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border-2 border-primary/30 rounded-3xl p-8 flex flex-col shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* ... [Front Side Content - Summary, Tools, Period] ... */}
          <div className="flex items-center gap-2 text-primary/80 mb-2 font-mono text-xs">
            <Calendar className="w-4 h-4" /> {exp.period}
          </div>
          <h3 className="text-3xl font-bold mb-1">{exp.role}</h3>
          <p className="text-primary font-medium mb-6 flex items-center gap-2"><Building2 className="w-4 h-4"/> {exp.company}</p>
          
          <div className="flex-grow">
             <h4 className="text-[10px] uppercase tracking-widest text-primary mb-2">Impact Summary:</h4>
             <p className="text-sm text-muted-foreground italic mb-6 border-l-2 border-primary/20 pl-4">{exp.description}</p>
          </div>
          
          <div className="mt-auto flex items-center justify-between text-primary text-[10px] font-mono uppercase tracking-widest">
            <span>Click to view results & points</span>
            <RotateCcw className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* BACK SIDE - This is where your responsibilities points go */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border-2 border-primary/60 rounded-3xl p-8 flex flex-col shadow-glow"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
             <h3 className="text-sm font-bold text-primary uppercase tracking-tighter">Core Responsibilities & Outcomes</h3>
             <CheckCircle2 className="w-4 h-4 text-primary" />
          </div>

          {/* This list pulls specifically from the 8 points provided */}
          <ul className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {exp.responsibilities.map((point, i) => (
              <li key={i} className="text-[12px] text-muted-foreground flex gap-3 leading-relaxed">
                <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0 shadow-glow" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-2 opacity-50">
            <RotateCcw className="w-3 h-3" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-center">Click to flip back</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
