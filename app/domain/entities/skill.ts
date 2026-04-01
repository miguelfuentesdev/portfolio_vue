import type { SkillColor } from "~/types/SkillColor";
import type { ImageAsset } from "./image-asset";

export interface Skill {
  name: string;
  color: SkillColor;
  icon: ImageAsset;
}