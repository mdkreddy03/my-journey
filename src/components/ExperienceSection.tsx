/**
 * EXPERIENCE SECTION - Professional Timeline
 * ===========================================
 * Work history with a modern tech-focused design.
 */

import { motion } from "framer-motion";
import { Calendar, Building2, ArrowRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Senior Data Engineer",
    company: "Tech Company",
    period: "2022 - Present",
    description:
      "Building and maintaining scalable data pipelines processing millions of events daily. Leading data architecture decisions and mentoring team members.",
    skills: ["Python", "Apache Spark", "Airflow", "AWS", "Snowflake"],
    type: "current",
  },
  {
    id: 2,
    role: "Data Engineer",
    company: "Analytics Startup",
    period: "2020 - 2022",
    description:
      "Developed ETL pipelines and data models for business intelligence. Reduced query times by 60% through optimization.",
    skills: ["Python", "dbt", "BigQuery", "Tableau", "Docker"],
    type: "past",
  },
  {
    id: 3,
    role: "Data Analyst",
    company: "Consulting Firm",
    period: "2018 - 2020",
    description:
      "Started my data journey analyzing business metrics and creating dashboards. Discovered my passion for data engineering.",
    skills: ["SQL", "Excel", "Power BI", "Python", "Pandas"],
    type: "past",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 tech-grid opacity-20" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10"
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
            <Building2 className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-primary">Career Path</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            My journey through the world of data engineering and analytics
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-0 top-6 w-16 items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${exp.type === 'current' ? 'bg-primary shadow-glow' : 'bg-muted border-2 border-border'}`} />
                </div>

                {/* Card */}
                <div className={`group bg-card border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-elevated ${exp.type === 'current' ? 'border-primary/30 shadow-glow' : 'border-border hover:border-primary/20'}`}>
                  {/* Current badge */}
                  {exp.type === 'current' && (
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                      Current Role
                    </span>
                  )}

                  {/* Period */}
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm">{exp.period}</span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="font-body text-primary font-medium mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground font-body text-xs rounded-lg border border-border/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey continues indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-12 text-muted-foreground"
          >
            <span className="font-body text-sm">The journey continues</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
