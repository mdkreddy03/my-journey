/**
 * EXPERIENCE SECTION - Apple-Inspired Timeline
 * =============================================
 * Features: 3D Flip, Smooth Height Expansion, 8-Point Metrics.
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2, Zap } from "lucide-react";

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
    type: "current",
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
  {
    id: 2,
    role: "Associate Data Analyst / Data Engineer",
    company: "Accenture",
    period: "June 2019 - July 2021",
    domain: "Technology",
    description: "Developed a multi-source ELT framework to consolidate data from fragmented payment APIs into BigQuery, resolving $2M+ in monthly reconciliation discrepancies.",
    skills: ["Python", "dbt", "BigQuery", "Docker", "SQL", "Looker", "Apache Spark", "GitHub", "Power BI", "PostgreSQL"],
    type: "past",
    responsibilities: [
      "Developed a dbt-based transformation layer, ensuring 99.8% reconciliation accuracy for financial reporting processes.",
      "Optimized BigQuery partitioned structures and materialized views, achieving 60% reduction in query execution times.",
      "Containerized data ingestion workflows with Docker, reducing deployment environment errors by 25%.",
      "Implemented automated validation via Great Expectations, catching 95% of schema drifts before reaching production.",
      "Structured star-schema models for business intelligence, increasing executive dashboard refresh rates by 3x.",
      "Automated 15+ weekly data extraction tasks using Python scripts, saving 60 hours of manual labor per month.",
      "Streamlined ingestion flows from 10+ third-party APIs into the centralized warehouse for real-time tracking.",
      "Translated engagement metrics into actionable data for 1M+ active users to improve retention and product strategy."
    ]
  }
];

const HighlightTools = ({ text }: { text: string }) => {
  let parts: (string | JSX.Element)[] = [text];
  DE_KEYWORDS.forEach((keyword) => {
    const newParts: (string | JSX.Element)[] = [];
    parts.forEach((part, partIndex) => {
      if (typeof part === "string") {
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
        const split = part.split(regex);
        split.forEach((s, i) => {
          if (s.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(<span key={`${partIndex}-${i}`} className="text-primary font-bold">{s}</span>);
          } else if (s) {
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

const ExperienceCard = ({ exp, index }: { exp: any; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.6, type: "spring", stiffness: 100 } }}
      className="relative w-full cursor-pointer"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        layout
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          height: isFlipped ? "650px" : "480px" 
        }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 flex flex-col shadow-2xl"
          style={{ backfaceVisibility: "hidden", zIndex: isFlipped ? 0 : 1 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              {exp.period}
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              {exp.domain}
            </span>
          </div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-1">{exp.role}</h3>
          <p className="text-primary font-body font-semibold mb-6">{exp.company}</p>
          
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-primary/30 pl-4 py-1">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1 bg-white/5 text-muted-foreground text-[10px] rounded-lg border border-white/10 uppercase tracking-wider">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-primary font-body text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <Zap className="w-4 h-4 animate-pulse" />
               <span>Impact & Results</span>
            </div>
            <RotateCcw className="w-4 h-4" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 border border-primary/30 bg-background/95 shadow-2xl flex flex-col"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)", 
            zIndex: isFlipped ? 1 : 0 
          }}
        >
          <div className="mb-6">
            <h3 className="font-heading text-xl font-bold text-primary tracking-tight">STRATEGIC CONTRIBUTIONS</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">Metric-Driven Outcomes</p>
            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-primary/40 via-border/50 to-transparent" />
            <p className="mt-4 font-body text-[10px] uppercase tracking-[0.2em] text-primary/60 font-bold">
              Work & Business Outcomes
            </p>
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar pr-4">
            <ul className="space-y-5">
              {exp.responsibilities.map((point: string, i: number) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={isFlipped ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="font-body text-xs md:text-sm text-muted-foreground flex gap-4 leading-relaxed"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
                  <span><HighlightTools text={point} /></span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6 text-center text-primary/40 font-bold text-[9px] uppercase tracking-[0.3em]">
            Click to return to overview
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pathHeight = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const pointerPos = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-20">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Professional Odyssey</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">Experience</h2>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block">
            <motion.div style={{ height: pathHeight }} className="absolute top-0 w-full bg-primary origin-top shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
            <motion.div style={{ top: pointerPos }} className="absolute -left-[10px] w-5 h-5 rounded-full bg-primary border-4 border-black shadow-[0_0_20px_rgba(var(--primary-rgb),1)] z-20" />
          </div>

          <div className="space-y-16 md:pl-32 pl-0">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
