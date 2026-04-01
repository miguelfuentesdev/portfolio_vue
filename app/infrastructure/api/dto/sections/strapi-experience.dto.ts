import type { StrapiRichTextBlockDto } from "../shared/strapi-rich-text-block.dto";

export interface StrapiExperienceSectionDto {
  title: string;
  section_id: string;
  experiences: StrapiExperienceDto[];
}

export interface StrapiExperienceDto {
  job_title: string;
  company: string;
  company_url?: string | null;
  location: string;
  start_date: string;
  end_date?: string | null;
  job_type: string;
  description: StrapiRichTextBlockDto[];
}