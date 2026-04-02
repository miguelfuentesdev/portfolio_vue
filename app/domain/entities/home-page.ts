import type { About } from "./about";
import type { Education } from "./education";
import type { Experience } from "./experience";
import type { Project } from "./project";
import type { Skill } from "./skill";

export interface HomePage {
  about: About;
  skills: SkillsSection;
  experience: ExperienceSection;
  projects: ProjectsSection;
  education: EducationSection;
  contact: ContactSection;
}

export interface SkillsSection {
  title: string
  sectionId: string
  items: Skill[]
}

export interface ExperienceSection {
  title: string
  sectionId: string
  items: Experience[]
}

export interface ProjectsSection {
  title: string
  sectionId: string
  items: Project[]
}

export interface EducationSection {
  title: string
  sectionId: string
  items: Education[]
}

export interface ContactSection {
  title: string;
  description: string | null;
}