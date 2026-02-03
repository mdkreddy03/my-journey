import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2, Cpu } from "lucide-react";

const DE_KEYWORDS = [
  "Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", 
  "dbt", "Azure Synapse", "BigQuery", "Docker", "PostgreSQL", "Apache Spark", "Looker", "GitHub Actions",
  "ETL", "ELT", "Lakehouse", "Real-time", "Streaming", "HIPAA", "Row-Level Security", "RLS", 
  "Partitioning", "Star-schema", "CI/CD", "Forecasting", "Telemetry", "Data Pipeline", "Cloud", "Great Expectations"
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

const ExperienceCard = ({ exp }: { exp: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full cursor-pointer group" 
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="grid grid-cols-1 grid-rows-1"
      >
        {/* FRONT SIDE */}
        <div
          className={`col-start-1 row-start-1 w-full bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col transition-all duration-300 ${isFlipped ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-tighter">
              <Calendar className="w-3 h-3" /> {exp.period}
            </div>
            {exp.type === 'current' && (
              <span className="text-[9px] font-bold text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded-full bg-cyan-400/10">CURRENT ROLE</span>
            )}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{exp.role}</h3>
          <div className="flex items-center gap-2 text-cyan-400/80 font-medium mb-4 text-sm">
            <Building2 className="w-4 h-4" /> {exp.company}
          </div>
          
          <p className="text-gray-400 text-xs italic border-l-2 border-cyan-400/40 pl-4 mb-6 leading-relaxed">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <span 
                key={skill}
                className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] rounded-lg border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-cyan-400 font-mono text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">
            <span>Click for Impact & Outcomes</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`col-start-1 row-start-1 w-full bg-[#0a0f1a] border border-cyan-400/30 rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(34,211,238,0.1)] flex flex-col transition-all duration-300 ${isFlipped ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
            <div>
              <h3 className="text-sm font-bold text-cyan-400 tracking-widest uppercase">RESPONSIBILITIES</h3>
              <p className="text-[9px] text-gray-500 font-mono mt-1 uppercase">Core Contributions & Business Outcomes</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          </div>

          <ul className="space-y-4 mb-8">
            {exp.responsibilities.map((point: string, i: number) => (
              <li key={i} className="text-[12px] text-gray-300 flex gap-3 leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span><HighlightTools text={point} /></span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-gray-500 group-hover:text-cyan-400 transition-colors text-[10px] font-mono uppercase tracking-widest">
            Return to Overview
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pathHeight = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const pointerPos = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="py-20 bg-[#020617] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Professional <span className="italic">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">
            Data Engineer ⫸ 4.5+ Yrs Experience | Optimizing Data Infra for Accuracy & Cost-Efficiency | Spark, Airflow, AWS
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-white/10">
            <motion.div style={{ height: pathHeight }} className="absolute top-0 w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] origin-top" />
            <motion.div style={{ top: pointerPos }} className="absolute -left-[11px] w-6 h-6 rounded-full bg-cyan-400 border-4 border-[#020617] shadow-[0_0_15px_rgba(34,211,238,0.5)] z-20 flex items-center justify-center" />
          </div>

          <div className="space-y-12">
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
