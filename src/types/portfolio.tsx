export interface PortfolioImages {
  id: number;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface PortfolioPageProps {
  id: string;
  title: string;
  description: string;
  image: PortfolioImages[];
  app: string[];
}
