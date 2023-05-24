import type { Document } from "datocms-structured-text-utils";

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
  descriptionResume:Document;
}
