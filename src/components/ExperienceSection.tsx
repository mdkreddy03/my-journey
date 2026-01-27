/**
 * EXPERIENCE SECTION - Professional Timeline
 * ===========================================
 * Featuring Sticky Scroll Timeline, Hover-Animated Skills, and Unified Flip Cards.
 */

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Building2, ArrowRight, RotateCcw, PenTool } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Data Engineer",
    company: "HCA Healthcare",
    period: "Aug 2023 - Present",
    description: "Engineered a real-time clinical telemetry streaming pipeline that synchronizes data from 100+ diagnostic devices into a centralized cloud lakehouse, resolving a critical 15-minute data lag and enabling immediate bed-capacity forecasting.",
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
      className="relative min-h-[580px] w-full cursor-pointer group mb-12"
      style={{ perspective: "2000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className={`absolute inset-0 w-full h-full bg-card border rounded-3xl p-8 flex flex-col shadow-2xl transition-all duration-500 ${exp.type === 'current' ? 'border-primary/40 shadow-glow' : 'border-border'}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {exp.type === 'current' && (
            <div className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6 border border-primary/30">
              Current Role
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground mb-4 font-mono text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            {exp.period}
          </div>

          <h3 className="text-3xl font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
            {exp.role}
          </h3>
          
          <div className="flex items-center gap-2 text-primary/80 font-medium mb-8">
            <Building2 className="w-5 h-5" />
            {exp.company}
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-tighter mb-3">Description:</h4>
              <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4 text-sm">
                {exp.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono text-primary uppercase tracking-tighter mb-4">Tools Used:</h4>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <motion.span 
                    key={skill}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary-rgb), 0.15)", borderColor: "rgba(var(--primary-rgb), 0.4)" }}
                    className="px-3 py-1.5 bg-secondary/40 text-secondary-foreground text-[10px] font-medium rounded-xl border border-border transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-primary font-mono text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            <span>Click to view Responsibilities & Results</span>
            <RotateCcw className="w-4 h-4 animate-spin-slow" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full bg-card border border-primary/40 rounded-3xl p-8 flex flex-col overflow-hidden shadow-glow"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
            <h3 className="text-lg font-bold text-primary tracking-widest uppercase">Responsibilities</h3>
            <span className="text-[9px] font-mono text-muted-foreground uppercase">Data & Outcomes</span>
          </div>

          <ul className="space-y-4 overflow-y-auto pr-4 custom-scrollbar flex-grow">
            {exp.responsibilities.map((point, i) => (
              <li key={i} className="text-[12px] text-muted-foreground flex gap-4 leading-relaxed group/item">
                <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-glow" />
                <span className="group-hover/item:text-foreground transition-colors">{point}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-4 border-t border-border flex items-center justify-center gap-2">
            <PenTool className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Click to return to overview</span>
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
  const pointerY = useTransform(scrollSpring, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={containerRef} className="section-padding relative bg-background min-h-screen">
      <div className="absolute inset-0 -z-10 tech-grid opacity-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 text-primary">
            <Building2 className="w-4 h-4" />
            <span className="font-body text-xs uppercase tracking-widest">Professional Path</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tighter">
            Experience <span className="text-primary italic text-shadow-glow">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Synthesizing 4.5+ years of data engineering and analytics expertise to resolve complex infrastructure challenges.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* STICKY TIMELINE TRACKER */}
          <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[2px] bg-border/20">
            <motion.div 
              style={{ height: pointerY }}
              className="absolute top-0 w-full bg-primary shadow-glow origin-top"
            />
            {/* THE STICKY POINTER */}
            <motion.div 
              style={{ top: pointerY }}
              className="sticky top-1/2 -ml-[11px] w-6 h-6 rounded-full bg-primary border-4 border-background shadow-glow z-20 flex items-center justify-center"
            >
               <div className="w-1.5 h-1.5 bg-background rounded-full animate-pulse" />
            </motion.div>
          </div>

          <div className="space-y-24">
            {experiences.map((exp, index) => (
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
