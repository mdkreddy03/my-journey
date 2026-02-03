/**
 * SKILLS SECTION - Apple-Inspired 5-Tile Grid
 * ========================================================
 * Clean, boxed design with all tools integrated into tiles.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Database, 
  BarChart3, 
  Workflow, 
  Cloud, 
  Code2, 
  GitBranch,
  Layers,
  Cpu,
  LineChart,
  Table2,
  Boxes,
  Zap,
  Terminal,
  Server,
  ShieldCheck,
  Search
} from "lucide-react";

const skillCategories = [
  {
    title: "Data Engineering",
    description: "Robust pipelines and architecture",
    icon: Workflow,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "SQL", icon: Database },
      { name: "Apache Spark", icon: Zap },
      { name: "Airflow", icon: Workflow },
      { name: "Kafka", icon: Zap },
      { name: "ETL/ELT", icon: Layers },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Cloud & Infra",
    description: "Modern platform deployment",
    icon: Cloud,
    skills: [
      { name: "AWS (S3, Redshift)", icon: Cloud },
      { name: "GCP", icon: Boxes },
      { name: "Snowflake", icon: Layers },
      { name: "Databricks", icon: Cpu },
      { name: "Docker", icon: Boxes },
      { name: "Terraform", icon: Server },
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Analytics & BI",
    description: "Turning data into decisions",
    icon: BarChart3,
    skills: [
      { name: "Tableau", icon: BarChart3 },
      { name: "Power BI", icon: LineChart },
      { name: "dbt", icon: GitBranch },
      { name: "Pandas", icon: Table2 },
      { name: "Looker", icon: Search },
      { name: "Excel/Sheets", icon: Table2 },
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Data Science",
    description: "Advanced modeling & math",
    icon: Cpu,
    skills: [
      { name: "Machine Learning", icon: Cpu },
      { name: "Data Modeling", icon: Database },
      { name: "Scikit-Learn", icon: Code2 },
      { name: "Statistical Analysis", icon: LineChart },
      { name: "NumPy", icon: Table2 },
      { name: "Jupyter", icon: Terminal },
    ],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "Backend & Ops",
    description: "System reliability & security",
    icon: Server,
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "APIs", icon: Code2 },
      { name: "Redis", icon: Zap },
      { name: "Git/GitHub", icon: GitBranch },
      { name: "Bash/Terminal", icon: Terminal },
      { name: "Data Security", icon: ShieldCheck },
    ],
    gradient: "from-red-500/20 to-rose-500/20",
  },
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block font-body text-sm text-primary uppercase tracking-widest mb-4"
          >
            Technical Expertise
          </motion.span>
          <h2 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-6">
            Skills & Tools
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            A comprehensive overview of my technical stack and data capabilities.
          </p>
        </motion.div>

        {/* Skills cards grid - Responsive 1 to 5 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="group"
            >
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full glass rounded-3xl p-6 glow-border flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>

                {/* Title & description */}
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List (Boxed items) */}
                <div className="space-y-2 mt-auto">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/5 group/skill cursor-default"
                    >
                      <skill.icon className="w-3.5 h-3.5 text-muted-foreground group-hover/skill:text-primary transition-colors" />
                      <span className="font-body text-xs text-foreground/80">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
