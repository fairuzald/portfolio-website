import type { Document } from "datocms-structured-text-utils";
export interface PortfolioImages {
  id: number;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface PortfolioProps {
  id: string;
  title: string;
  description: Document;
  image: PortfolioImages[];
  app: string[];
}
