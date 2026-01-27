/**
 * EXPERIENCE SECTION - Professional Timeline
 * ===========================================
 * Work history with flip-card design, solving domain pain points.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Building2, ArrowRight, RotateCcw, Target, PenTool } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Data Engineer",
    company: "HCA Healthcare",
    period: "Aug 2023 - Present",
    description: "Description: Engineered a real-time clinical telemetry streaming pipeline that synchronizes data from 100+ diagnostic devices into a centralized cloud lakehouse, resolving a critical 15-minute data lag and enabling immediate bed-capacity forecasting.",
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
    description: "Description: Developed a multi-source ELT framework to consolidate data from fragmented payment APIs into BigQuery, successfully resolving $2M+ in monthly transaction reconciliation discrepancies.",
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
  },
];

const ExperienceCard = ({ exp }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative min-h-[500px] w-full cursor-pointer group"
      style={{ perspective: "1500px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div 
          className={`absolute inset-0 w-full h-full bg-card border rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-300 ${exp.type === 'current' ? 'border-primary/40 shadow-glow' : 'border-border hover:border-primary/20'}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {exp.type === 'current' && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 w-fit">
              Current Role
            </span>
          )}
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span className="font-body text-sm">{exp.period}</span>
          </div>
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {exp.role}
          </h3>
          <p className="font-body text-primary font-medium mb-4 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {exp.company}
          </p>
          <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
            {exp.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {exp.skills.slice(0, 5).map((skill) => (
                <span key={skill} className="px-3 py-1 bg-secondary/50 text-secondary-foreground font-body text-[10px] rounded-lg border border-border/50">
                  {skill}
                </span>
              ))}
              <span className="text-xs text-muted-foreground pt-1">+{exp.skills.length - 5} more</span>
            </div>
            <div className="text-xs font-mono text-primary flex items-center gap-2">
              <RotateCcw className="w-3 h-3" /> Click to view impact & results
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full bg-card border border-primary/40 rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden shadow-2xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-heading text-sm font-bold text-primary mb-4 uppercase tracking-widest">Actionable Outcomes</h3>
          <ul className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-grow mb-6">
            {exp.responsibilities.map((point, i) => (
              <li key={i} className="text-[11px] text-muted-foreground flex gap-2 leading-relaxed">
                <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          
          <div className="pt-4 border-t border-border">
            <h4 className="flex items-center gap-2 text-[10px] font-mono text-primary mb-2 uppercase tracking-wider">
              <PenTool className="w-3 h-3" /> Top 10 Tools
            </h4>
            <div className="flex flex-wrap gap-1">
              {exp.skills.slice(0, 10).map((skill) => (
                <span key={skill} className="px-2 py-0.5 bg-primary/5 text-[9px] text-primary rounded border border-primary/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[9px] font-mono text-muted-foreground text-center">Click to return</p>
        </div>
      </motion.div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 tech-grid opacity-10" />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6 text-primary">
            <Building2 className="w-4 h-4" />
            <span className="font-body text-xs uppercase tracking-widest">Professional Path</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience Portfolio
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Synthesizing 4.5+ years of data engineering and analytics expertise to resolve complex infrastructure and intelligence challenges.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-20"
              >
                <div className="hidden md:flex absolute left-0 top-10 w-16 items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${exp.type === 'current' ? 'bg-primary shadow-glow ring-4 ring-primary/20' : 'bg-muted border-2 border-border'}`} />
                </div>
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-2 mt-20 text-muted-foreground"
          >
            <span className="font-body text-sm font-mono tracking-tighter uppercase opacity-50">Providing a verified source of truth</span>
            <ArrowRight className="w-4 h-4 animate-bounce text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
