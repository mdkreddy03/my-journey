/**
 * EXPERIENCE SECTION - Apple-Inspired Timeline
 * =============================================
 * Smooth scroll animations, 3D flip cards with full interaction.
 */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2, MapPin } from "lucide-react";

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
            newParts.push(<span key={`${partIndex}-${i}`} className="text-primary font-medium">{s}</span>);
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
  domain: string;
  description: string;
  skills: string[];
  type: string;
  responsibilities: string[];
}

const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full cursor-pointer group"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full min-h-[480px]"
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 shadow-xl"
          style={{ backfaceVisibility: "hidden", pointerEvents: isFlipped ? "none" : "auto" }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 text-muted-foreground font-body text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              {exp.period}
            </div>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-tighter">
              {exp.domain}
            </span>
          </div>
          
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {exp.role}
          </h3>
          <div className="flex items-center gap-2 text-primary/80 font-body mb-6">
            <Building2 className="w-4 h-4" />
            {exp.company}
          </div>
          
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1.5 bg-background/40 text-foreground/70 text-xs rounded-lg font-body border border-white/5">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-muted-foreground font-body text-sm group-hover:text-primary transition-colors">
            <span>Click card for Impact & Results</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full glass rounded-[2.5rem] p-8 md:p-10 border border-primary/20 bg-background/80"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)", 
            pointerEvents: isFlipped ? "auto" : "none" 
          }}
        >
          <div className="flex justify-between items-center border-b border-border/50 pb-4 mb-6">
            <div>
              <h3 className="font-heading text-lg font-semibold text-primary">Strategic Contributions</h3>
              <p className="font-body text-xs text-muted-foreground mt-1">Metric-Driven Results</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <div className="overflow-y-auto max-h-[280px] custom-scrollbar pr-4">
            <ul className="space-y-4">
              {exp.responsibilities.map((point: string, i: number) => (
                <li key={i} className="font-body text-xs md:text-sm text-muted-foreground flex gap-3 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span><HighlightTools text={point} /></span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 w-full border-t border-border/50 text-center text-muted-foreground hover:text-primary transition-colors font-body text-sm">
            Click to return to overview
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const pathHeight = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  const pointerPos = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);
  
  const headerY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <span className="inline-block font-body text-sm text-primary uppercase tracking-widest mb-4">
            Career Path
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-6">
            Professional Experience
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            4.5+ years building and optimizing data infrastructure within complex domains.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-border/50 hidden md:block">
            <motion.div 
              style={{ height: pathHeight }} 
              className="absolute top-0 w-full bg-primary origin-top" 
            />
            <motion.div 
              style={{ top: pointerPos }} 
              className="absolute -left-[7px] w-4 h-4 rounded-full bg-primary border-4 border-background shadow-glow z-20"
            />
          </div>

          <div className="space-y-12 md:pl-24 pl-0">
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
