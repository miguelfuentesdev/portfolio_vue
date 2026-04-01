/// Strapi rich text block raw response
export interface StrapiRichTextBlockDto {
  type: string;
  children: StrapiRichTextBlockChildDto[];
}

export interface StrapiRichTextBlockChildDto {
  text: string;
  type: string;
}