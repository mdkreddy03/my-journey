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
  Terminal, // Added for new tile
  Server // Added for new tile
} from "lucide-react";

const skillCategories = [
  {
    title: "Data Engineering",
    description: "Building robust pipelines that scale",
    icon: Workflow,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "SQL", icon: Database },
      { name: "Apache Spark", icon: Zap },
      { name: "Airflow", icon: Workflow },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Cloud & Infrastructure",
    description: "Deploying on modern platforms",
    icon: Cloud,
    skills: [
      { name: "AWS", icon: Cloud },
      { name: "GCP", icon: Boxes },
      { name: "Snowflake", icon: Layers },
      { name: "Databricks", icon: Cpu },
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
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  // --- NEW FOURTH TILE ---
  {
    title: "Databases & Tools",
    description: "Storage and operational excellence",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: Server },
      { name: "Docker", icon: Boxes },
      { name: "Kafka", icon: Zap },
      { name: "Terminal", icon: Terminal },
    ],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

const additionalSkills = [
  "ETL Pipelines", "Data Modeling", "Machine Learning", 
  "APIs", "Redis"
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
            The technologies I use to build data solutions
          </p>
        </motion.div>

        {/* --- CHANGED: grid-cols-4 for large screens --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="group"
            >
              <motion.div 
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full glass rounded-3xl p-8 glow-border"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6`}>
                  <category.icon className="w-7 h-7 text-foreground" />
                </div>

                {/* Title & description */}
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-8">
                  {category.description}
                </p>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1 + skillIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 p-3 bg-background/30 rounded-xl group/skill cursor-default"
                    >
                      <skill.icon className="w-4 h-4 text-muted-foreground group-hover/skill:text-primary transition-colors" />
                      <span className="font-body text-sm text-foreground/80">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {additionalSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="px-5 py-2.5 glass rounded-full font-body text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
