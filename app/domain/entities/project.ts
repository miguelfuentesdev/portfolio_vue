import type { ImageAsset } from "./image-asset";
import type { Skill } from "./skill";

export interface Project {
  title: string;
  description: string[];
  liveUrl?: string;
  repoUrl?: string | null;
  thumbnail: ImageAsset;
  techStack: Skill[];
}