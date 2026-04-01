import type { StrapiMediaDto } from "../shared/strapi-media.dto";
import type { StrapiRichTextBlockDto } from "../shared/strapi-rich-text-block.dto";
import type { StrapiSkillDto } from "../shared/strapi-skill.dto";

export interface StrapiProjectsSectionDto {
  title: string;
  section_id: string;
  projects: StrapiProjectDto[];
}

export interface StrapiProjectDto {
  title: string;
  description: StrapiRichTextBlockDto[];
  repo_url?: string | null;
  url?: string | null;
  thumbnail: StrapiMediaDto;
  tech: StrapiSkillDto[];
}