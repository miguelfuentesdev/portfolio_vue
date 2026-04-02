import type { StrapiAboutDto } from "./sections/strapi-about.dto";
import type { StrapiContactDto } from "./sections/strapi-contact.dto";
import type { StrapiEducationSectionDto } from "./sections/strapi-education.dto";
import type { StrapiExperienceSectionDto } from "./sections/strapi-experience.dto";
import type { StrapiProjectsSectionDto } from "./sections/strapi-projects.dto";
import type { StrapiSkillsSectionDto } from "./sections/strapi-skills.dto";

export interface StrapiHomePageResponseDto {
  data: StrapiHomePageDto;
  meta: Record<string, never>;
}

export interface StrapiHomePageDto {
  about: StrapiAboutDto;
  skills: StrapiSkillsSectionDto;
  experience: StrapiExperienceSectionDto;
  projects: StrapiProjectsSectionDto;
  education: StrapiEducationSectionDto;
  contact: StrapiContactDto;
}
