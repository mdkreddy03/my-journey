import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2 } from "lucide-react";

const DE_KEYWORDS = [
  "Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", 
  "dbt", "Azure Synapse", "BigQuery", "Docker", "PostgreSQL", "Apache Spark", "Looker", "GitHub Actions",
  "ETL", "ELT", "Lakehouse", "Real-time", "Streaming", "HIPAA", "Row-Level Security", "RLS", 
  "Partitioning", "Star-schema", "CI/CD", "Forecasting", "Telemetry", "Data Pipeline", "Cloud"
];

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
            newParts.push(<span key={`${partIndex}-${i}`} className="gradient-text font-bold">{s}</span>);
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

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  type: string;
  responsibilities: string[];
}

const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full group" style={{ perspective: "1500px" }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* FRONT SIDE */}
        <div
          className="w-full bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-tighter">
              <Calendar className="w-3 h-3" /> {exp.period}
            </div>
            {exp.type === 'current' && (
              <span className="text-[9px] font-bold text-primary border border-primary/30 px-2 py-0.5 rounded-full bg-primary/10">CURRENT</span>
            )}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{exp.role}</h3>
          <div className="flex items-center gap-2 text-primary/80 font-medium mb-4 text-sm">
            <Building2 className="w-4 h-4" /> {exp.company}
          </div>
          
          <p className="text-muted-foreground text-xs italic border-l-2 border-primary/40 pl-4 mb-6 leading-relaxed">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <motion.span 
                key={skill}
                whileHover={{ y: -4, scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(94, 234, 212, 0.5)" }}
                className="px-3 py-1 bg-secondary/30 text-secondary-foreground text-[10px] rounded-lg border border-border cursor-default transition-all duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <button 
            onClick={() => setIsFlipped(true)}
            className="w-full pt-4 border-t border-border flex items-center justify-between text-primary font-mono text-[10px] uppercase tracking-widest hover:text-foreground transition-colors"
          >
            <span>View Strategic Outcomes</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-card border border-primary/30 rounded-2xl p-6 md:p-8 shadow-glow flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex justify-between items-center border-b border-border pb-4 mb-5">
            <div>
              <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Strategic Impact & Deliverables</h3>
              <p className="text-[9px] text-muted-foreground font-mono mt-1">CORE CONTRIBUTIONS & BUSINESS VALUE</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar pr-2">
            <ul className="space-y-3.5">
              {exp.responsibilities.map((point: string, i: number) => (
                <li key={i} className="text-[12px] text-muted-foreground flex gap-3 leading-snug">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(94,234,212,0.6)]" />
                  <span><HighlightTools text={point} /></span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setIsFlipped(false)}
            className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] font-mono uppercase tracking-widest"
          >
            Return to Overview
          </button>
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
    <section id="experience" ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tighter">
            Professional <span className="text-primary italic">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto italic">
            4.5+ years of data engineering expertise focused on infrastructure ROI and clinical data accuracy.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Track */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-border">
            <motion.div style={{ height: pathHeight }} className="absolute top-0 w-full bg-primary shadow-glow origin-top" />
            <motion.div 
              style={{ top: pointerPos }} 
              className="absolute -left-[11px] w-6 h-6 rounded-full bg-primary border-4 border-background shadow-glow z-20 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
            </motion.div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                className="relative pl-10 md:pl-24"
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
