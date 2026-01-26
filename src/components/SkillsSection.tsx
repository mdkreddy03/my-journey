/**
 * SKILLS SECTION - Technical Expertise
 * =====================================
 * Showcase data engineering and analytics skills with icons.
 */

import { motion } from "framer-motion";
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
  Zap
} from "lucide-react";

const skillCategories = [
  {
    title: "Data Engineering",
    icon: Workflow,
    skills: [
      { name: "Python", icon: Code2 },
      { name: "SQL", icon: Database },
      { name: "Apache Spark", icon: Zap },
      { name: "Airflow", icon: Workflow },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "AWS", icon: Cloud },
      { name: "GCP", icon: Boxes },
      { name: "Snowflake", icon: Layers },
      { name: "Databricks", icon: Cpu },
    ],
  },
  {
    title: "Analytics & Visualization",
    icon: BarChart3,
    skills: [
      { name: "Tableau", icon: BarChart3 },
      { name: "Power BI", icon: LineChart },
      { name: "dbt", icon: GitBranch },
      { name: "Pandas", icon: Table2 },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 tech-grid opacity-20" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-10"
      />

      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-primary">Technical Arsenal</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to transform data into stories
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 glow-border">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-background/50 rounded-xl hover:bg-primary/5 transition-colors group/skill"
                    >
                      <skill.icon className="w-5 h-5 text-muted-foreground group-hover/skill:text-primary transition-colors" />
                      <span className="font-body text-sm text-foreground">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {["ETL Pipelines", "Data Modeling", "Machine Learning", "APIs", "Docker", "Kafka", "Redis", "PostgreSQL"].map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-secondary/50 border border-border rounded-full font-body text-sm text-secondary-foreground hover:border-primary/30 hover:text-primary transition-all cursor-default"
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
