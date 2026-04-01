import type { WorkModality } from "~/types/WorkModality";

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  modality: WorkModality;
  paragraphs: string[];
}