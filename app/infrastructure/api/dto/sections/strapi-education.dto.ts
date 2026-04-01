import type { StrapiRichTextBlockDto } from "../shared/strapi-rich-text-block.dto";

export interface StrapiEducationSectionDto {
  title: string;
  section_id: string;
  educations: StrapiEducationDto[];
}

export interface StrapiEducationDto {
  education_title: string;
  university: string;
  start_date: string;
  end_date?: string | null;
  description: StrapiRichTextBlockDto[];
}