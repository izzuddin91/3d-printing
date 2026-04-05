export type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
};

export type Material = {
  name: string;
  bestFor: string;
  finish: string;
  priceTier: "economy" | "standard" | "premium";
};

export type PortfolioItem = {
  name: string;
  category: string;
  leadTime: string;
  summary: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type QuoteRequest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  quantity: number;
  material: string;
  targetDate: string;
  notes: string;
};

export type CarouselSlide = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};
