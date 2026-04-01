import type { Experience } from "~/domain/entities/experience";
import type { StrapiRichTextBlockDto } from "../api/dto/shared/strapi-rich-text-block.dto";
import type { StrapiMediaDto } from "../api/dto/shared/strapi-media.dto";
import type { ImageAsset } from "~/domain/entities/image-asset";
import type { EducationSection, ExperienceSection, HomePage, ProjectsSection, SkillsSection } from "~/domain/entities/home-page";
import type { StrapiEducationDto, StrapiEducationSectionDto } from "../api/dto/sections/strapi-education.dto";
import type { Education } from "~/domain/entities/education";
import type { StrapiProjectDto, StrapiProjectsSectionDto } from "../api/dto/sections/strapi-projects.dto";
import type { Project } from "~/domain/entities/project";
import type { StrapiExperienceDto, StrapiExperienceSectionDto } from "../api/dto/sections/strapi-experience.dto";
import type { StrapiSkillDto } from "../api/dto/shared/strapi-skill.dto";
import type { Skill } from "~/domain/entities/skill";
import type { StrapiSkillsSectionDto } from "../api/dto/sections/strapi-skills.dto";
import type { StrapiAboutDto, StrapiSocialDto } from "../api/dto/sections/strapi-about.dto";
import type { SocialLink } from "~/domain/entities/social-link";
import type { About } from "~/domain/entities/about";
import type { StrapiHomePageDto, StrapiHomePageResponseDto } from "../api/dto/strapi-home-page.dto";
import type { SkillColor } from "~/types/SkillColor";
import type { WorkModality } from "~/types/WorkModality";

export function mapHomePageResponse(response: StrapiHomePageResponseDto): HomePage {
  return mapHomePage(response.data);
}

/// Strapi home page model mapper
export function mapHomePage(dto: StrapiHomePageDto): HomePage {
  return {
    about: mapAbout(dto.about),
    skills: mapSkillsSection(dto.skills),
    experience: mapExperienceSection(dto.experience),
    projects: mapProjectsSection(dto.projects),
    education: mapEducationSection(dto.education),
  };
}

/// Strapi about section model mapper
function mapAbout(dto: StrapiAboutDto): About {
  return {
    greeting: dto.upper_title,
    title: dto.title,
    paragraphs: mapRichTextToParagraphs(dto.description),
    profileImage: mapImageAsset(dto.pfp),
    socialLinks: dto.socials.map(mapSocialLink),
  };
}

/// Strapi social link model mapper
function mapSocialLink(dto: StrapiSocialDto): SocialLink {
  return {
    name: dto.name,
    url: dto.url,
    icon: mapImageAsset(dto.image),
  };
}

/// Strapi skills section model mapper
function mapSkillsSection(dto: StrapiSkillsSectionDto): SkillsSection {
  return {
    title: dto.title,
    sectionId: dto.section_id,
    items: dto.skills.map(mapSkill)
  }
}

/// Strapi skill model mapper
function mapSkill(dto: StrapiSkillDto): Skill {
  return {
    name: dto.name,
    color: normalizeSkillColor(dto.color),
    icon: mapImageAsset(dto.icon),
  }
}

/// Strapi experience section model
function mapExperienceSection(dto: StrapiExperienceSectionDto): ExperienceSection {
  return {
    title: dto.title,
    sectionId: dto.section_id,
    items: dto.experiences.map(mapExperience)
  }
}

/// Strapi experience model mapper
function mapExperience(dto: StrapiExperienceDto): Experience {
  return {
    role: dto.job_title,
    company: dto.company,
    companyUrl: dto.company_url ?? undefined,
    location: dto.location,
    startDate: dto.start_date,
    endDate: dto.end_date ?? null,
    isCurrent: dto.end_date == null,
    modality: normalizeWorkModality(dto.job_type),
    paragraphs: mapRichTextToParagraphs(dto.description),
  }
}

/// Strapi projects section model mapper
function mapProjectsSection(dto: StrapiProjectsSectionDto): ProjectsSection {
  return {
    title: dto.title,
    sectionId: dto.section_id,
    items: dto.projects.map(mapProject)
  }
}

/// Strapi project model mapper
function mapProject(dto: StrapiProjectDto) : Project {
  return {
    title: dto.title,
    description: mapRichTextToParagraphs(dto.description),
    liveUrl: dto.url ?? undefined,
    repoUrl: dto.repo_url ?? undefined,
    thumbnail: mapImageAsset(dto.thumbnail),
    techStack: dto.tech.map(mapSkill)
  }
}

/// Strapi education section model mapper
function mapEducationSection(dto: StrapiEducationSectionDto): EducationSection {
  return {
    title: dto.title,
    sectionId: dto.section_id,
    items: dto.educations.map(mapEducation)
  }
}

/// Strapi education model mapper
function mapEducation(dto: StrapiEducationDto): Education {
  return {
    degree: dto.education_title,
    institution: dto.university,
    startDate: dto.start_date,
    endDate: dto.end_date ?? null,
    paragraphs: mapRichTextToParagraphs(dto.description)
  }
}

/// Strapi image mapper
function mapImageAsset(dto: StrapiMediaDto): ImageAsset {
  return {
    url: dto.url,
    alt: dto.alternativeText ?? '',
    width: dto.width,
    height: dto.height
  };
}

/// Strapi rich text blocks mapper
function mapRichTextToParagraphs(blocks: StrapiRichTextBlockDto[]): string[] {
  return blocks
    .map((b) => b.children.map((c) => c.text).join('').trim())
    .filter(Boolean);
}

/// Skill color normalizer. If the value does not match the expected ones, 
/// it defaults to "blue".
function normalizeSkillColor(value: string): SkillColor {
  const validColors: SkillColor[] = [
    "blue",
    "purple",
    "cyan",
    "orange",
    "yellow",
    "green",
    "red",
    "black",
    "pink",
  ];

  return validColors.includes(value as SkillColor)
    ? (value as SkillColor)
    : "blue"; 
}


/// Work modality normalizer. If the value does not match the expected ones, 
/// it defaults to "remote".
function normalizeWorkModality(value: string): WorkModality {
  if (value === "remote" || value === "in-person" || value === "hybrid") {
    return value;
  }

  return "remote";
}