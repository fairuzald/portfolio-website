import type { Document } from "datocms-structured-text-utils";
export interface ImageProps {
  id: number;
  url: string;
  title: string;
  width: number;
  height: number;
}
export interface BubbleExperienceProps {
  id: string;
  experienceTitle: string;
  durationTitle: string;
  durationBubble: string;
}
export interface HomePageProps {
  portfolioDescription: Document;
  portfolioTitleSection: string;
  postDescription: Document;
  postTitleSection: string;
  recentPortfolioSubtitle: string;
  recentPostSubtitle: string;
  resumeTitleSection: string;
  whatsappUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  githubUrl: string;
  emailUrl: string;
  cvUrl: string;
  introductionDescription: Document;
  introductionSubtitle: string;
  contactSubtitle: string;
  contactDescription: Document;
  buttonTextPostMore: string;
  buttonTextPortfolioMore: string;
  buttonTextCv: string;
  aboutTitle: string;
  descriptionResume: Document;
  githubTitle: string;
  emailTitle: string;
  instagramTitle: string;
  greetingText: string;
  heroButtonText: string;
  linkedinTitle: string;
  typeWriterText: string[];
  whatsappTitle: string;
  profilPicture: ImageProps[];
}
