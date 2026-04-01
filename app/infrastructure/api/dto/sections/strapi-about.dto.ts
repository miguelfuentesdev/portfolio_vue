import type { StrapiMediaDto } from "../shared/strapi-media.dto";
import type { StrapiRichTextBlockDto } from "../shared/strapi-rich-text-block.dto";

export interface StrapiAboutDto {
  upper_title: string;
  title: string;
  description: StrapiRichTextBlockDto[];
  pfp: StrapiMediaDto;
  socials: StrapiSocialDto[];
}

export interface StrapiSocialDto {
  name: string;
  url: string;
  image: StrapiMediaDto;
}