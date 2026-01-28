import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Building2, RotateCcw, CheckCircle2 } from "lucide-react";

// Expanded industry terms for automatic gradient highlighting
const DE_KEYWORDS = [
  "Azure Data Factory", "Databricks", "PySpark", "Snowflake", "SQL", "Airflow", "Power BI", "Python", 
  "dbt", "Azure Synapse", "BigQuery", "Docker", "PostgreSQL", "Apache Spark", "Looker", "GitHub Actions",
  "ETL", "ELT", "Lakehouse", "Real-time", "Streaming", "HIPAA", "Row-Level Security", "RLS", 
  "Partitioning", "Star-schema", "CI/CD", "Forecasting", "Telemetry", "Data Pipeline", "Cloud"
];

const HighlightTools = ({ text }: { text: string }) => {
  let parts = [text];
  DE_KEYWORDS.forEach((keyword) => {
    const newParts: any[] = [];
    parts.forEach((part) => {
      if (typeof part === "string") {
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
        const split = part.split(regex);
        split.forEach((s, i) => {
          if (s.toLowerCase() === keyword.toLowerCase()) {
            newParts.push(<span key={i} className="gradient-text font-bold">{s}</span>);
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

const ExperienceCard = ({ exp }: { exp: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full mb-8 group" style={{ perspective: "1500px" }}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* FRONT SIDE */}
        <div
          className="w-full bg-[#0a0f1a]/95 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
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
                className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] rounded-lg border border-white/10 cursor-default transition-all duration-200"
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <button 
            onClick={() => setIsFlipped(true)}
            className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-primary font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors"
          >
            <span>View Strategic Outcomes</span>
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-[#0a0f1a] border border-primary/30 rounded-2xl p-6 md:p-8 shadow-glow flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
            <div>
              <h3 className="text-sm font-bold text-primary tracking-widest uppercase">Strategic Impact & Deliverables</h3>
              <p className="text-[9px] text-muted-foreground font-mono mt-1">CORE CONTRIBUTIONS & BUSINESS VALUE</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>

          <div className="overflow-y-auto flex-grow custom-scrollbar pr-2">
            <ul className="space-y-3.5">
              {exp.responsibilities.map((point: string, i: number) => (
                <li key={i} className="text-[12px] text-gray-300 flex gap-3 leading-snug">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(94,234,212,0.6)]" />
                  <span><HighlightTools text={point} /></span>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setIsFlipped(false)}
            className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-[10px] font-mono uppercase tracking-widest"
          >
            Return to Overview
          </button>
        </div>
      </motion.div>
    </div>
  );
};
