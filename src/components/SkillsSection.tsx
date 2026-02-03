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
      { name: "AP
