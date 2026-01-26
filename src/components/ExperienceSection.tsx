/**
 * EXPERIENCE SECTION
 * ==================
 * Professional timeline showing your work history.
 * 
 * Key concepts:
 * - Array mapping: Transform data into JSX elements
 * - Timeline design: Visual line connecting experiences
 * - Hover effects: Interactive cards with smooth transitions
 */

import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";

// Your experience data - easy to update!
const experiences = [
  {
    id: 1,
    role: "Senior Software Engineer",
    company: "Tech Company",
    period: "2022 - Present",
    description:
      "Leading development of scalable web applications using React and Node.js. Mentoring junior developers and driving technical decisions.",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Startup Inc",
    period: "2020 - 2022",
    description:
      "Built and maintained multiple client-facing applications. Implemented CI/CD pipelines and improved deployment efficiency by 40%.",
    skills: ["Vue.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description:
      "Developed responsive websites and web applications for various clients. Collaborated closely with designers to bring creative visions to life.",
    skills: ["JavaScript", "CSS", "HTML", "WordPress"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4">
            My Journey
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Professional Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line - only visible on larger screens */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-border" />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-12"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-0 top-2 w-3 h-3 bg-primary rounded-full -translate-x-1" />

                {/* Card */}
                <div className="bg-card p-6 md:p-8 rounded-2xl shadow-soft hover:shadow-elevated transition-shadow duration-300 group">
                  {/* Period badge */}
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-body text-sm">{exp.period}</span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="font-body text-primary font-medium mb-4">
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-secondary text-secondary-foreground font-body text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
