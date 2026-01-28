import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2, Cpu } from "lucide-react";

const DE_KEYWORDS = [
  "Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", 
  "dbt", "Azure Synapse", "BigQuery", "Docker", "PostgreSQL", "Apache Spark", "Looker", "GitHub Actions",
  "ETL", "ELT", "Lakehouse", "Real-time", "Streaming", "HIPAA", "Row-Level Security", "RLS", 
  "Partitioning", "Star-schema", "CI/CD", "Forecasting", "Telemetry", "Data Pipeline", "Cloud", "Great Expectations"
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
          className="col-start-1 row-start-1 w-full bg-[#0a0f1a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-tighter">
              <Calendar className="w-3 h-3" /> {exp.period}
            </div>
            {exp.type === 'current' && (
              <span className="text-[9px] font-bold text-primary border border-primary/30 px-2 py-0.5 rounded-full bg-primary/10">CURRENT ROLE</span>
            )}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{exp.role}</h3>
          <div className="flex items-center gap-2 text-primary/80 font-medium mb-4 text-sm">
            <Building2 className="w-4 h-4" /> {exp.company}
          </div>
          
          <p className="text-gray-400 text-xs italic border-l-2 border-primary/40 pl-4 mb-6 leading-relaxed">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {exp.skills.map((skill: string) => (
              <motion.span 
                key={skill}
                whileHover={{ y: -4, scale: 1.1, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(94, 234, 212, 0.5)" }}
                className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] rounded-lg border border-white/10 transition-all duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-primary font-mono text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">
            <span>Click for Strategic Outcomes</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="col-start-1 row-start-1 w-full bg-[#0a0f1a] border border-primary/30 rounded-2xl p-6 md:p-8 shadow-glow flex flex-col"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)" 
          }}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
            <div>
              <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Strategic Impact & Deliverables</h3>
              <p className="text-[9px] text-muted-foreground font-mono mt-1 uppercase">Core Contributions & Business Value</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <ul className="space-y-4 mb-8">
            {exp.responsibilities.map((point: string, i: number) => (
              <li key={i} className="text-[12px] text-gray-300 flex gap-3 leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(94,234,212,0.6)]" />
                <span><HighlightTools text={point} /></span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors text-[10px] font-mono uppercase tracking-widest">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span>Professional Career</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Professional <span className="italic">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">
            4.5+ years of data engineering expertise focused on infrastructure ROI and high-scale data accuracy. [cite: 2026-01-12]
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[2px] bg-white/10">
            <motion.div style={{ height: pathHeight }} className="absolute top-0 w-full bg-primary shadow-glow origin-top" />
            <motion.div style={{ top: pointerPos }} className="absolute -left-[11px] w-6 h-6 rounded-full bg-primary border-4 border-[#020617] shadow-glow z-20 flex items-center justify-center" />
          </div>

          <div className="space-y-12">
            {/* You would map your experiences array here */}
            {/* Example: {experiences.map((exp) => ( ... ))} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
