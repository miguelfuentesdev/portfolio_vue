import type { StrapiSkillDto } from "../shared/strapi-skill.dto";

export interface StrapiSkillsSectionDto {
  title: string;
  section_id: string;
  skills: StrapiSkillDto[];
}