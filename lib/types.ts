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
  docId?: string;
  id: string;
  createdAt: string;
  name?: string;
  email?: string;
  phone?: string;
  fileUrl?: string;
  projectType?: string;
  quantity?: number;
  material?: string;
  targetDate?: string;
  notes?: string;
  transactionPeriod?: string;
  serviceDescription?: string;
  weight?: number;
  pricePerGram?: number;
  totalPayment?: number;
};

export type CarouselSlide = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

export type FilamentPrice = {
  id: string;
  name: string;
  pricePerGram: number;
  pricePerMeter?: number;
  color: string;
  material: string;
  description?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  date_created: Date;
};
