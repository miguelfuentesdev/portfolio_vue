import type { ImageAsset } from "./image-asset";
import type { SocialLink } from "./social-link";

export interface About {
  greeting: string;
  title: string;
  paragraphs: string[];
  profileImage: ImageAsset;
  socialLinks: SocialLink[];
}