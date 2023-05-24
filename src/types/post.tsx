import type { Document } from "datocms-structured-text-utils";

interface Image {
  id:string
  url: string;
  width: number;
  height: number;
  title: string;
}

export interface PostInterface {
  id: string;
  title: string;
  description: Document;
  image: Image;
  tag: string[];
  textLinkDetails: string;
  show: boolean;
}
