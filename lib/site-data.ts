import type { CarouselSlide, FaqItem, Material, PortfolioItem, Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "rapid-prototyping",
    title: "Rapid Prototyping",
    description:
      "Get production-like prototypes in days for product validation and investor demos.",
    features: ["FDM and resin options", "48-72h turnaround", "Design feedback included"],
  },
  {
    id: "small-batch",
    title: "Small Batch Manufacturing",
    description:
      "Reliable print runs for functional parts, jigs, fixtures, and custom products.",
    features: ["Consistent quality checks", "Flexible quantities", "Volume discounts"],
  },
  {
    id: "custom-design",
    title: "Custom 3D Design",
    description:
      "From idea to printable model with CAD support, print optimization, and DFM guidance.",
    features: ["Model repair", "Printability optimization", "NDA-friendly workflow"],
  },
];

export const materials: Material[] = [
  { name: "PLA", bestFor: "Visual prototypes", finish: "Matte smooth", priceTier: "economy" },
  { name: "PETG", bestFor: "Durable utility parts", finish: "Semi-gloss", priceTier: "standard" },
  { name: "ABS", bestFor: "Heat resistant parts", finish: "Industrial", priceTier: "standard" },
  { name: "TPU", bestFor: "Flexible components", finish: "Soft touch", priceTier: "premium" },
  { name: "Resin", bestFor: "High detail miniatures", finish: "Ultra-fine", priceTier: "premium" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    name: "Drone camera mount",
    category: "Functional prototype",
    leadTime: "2 days",
    summary: "Lightweight bracket with vibration damping geometry for field testing.",
  },
  {
    name: "Custom keyboard case",
    category: "Consumer product",
    leadTime: "4 days",
    summary: "Low-profile enclosure with tight tolerance fit and textured finish.",
  },
  {
    name: "Packaging line spacer jig",
    category: "Manufacturing aid",
    leadTime: "3 days",
    summary: "Operator-friendly jig that reduced line setup time by 35%.",
  },
  {
    name: "Miniature terrain set",
    category: "Creative print",
    leadTime: "5 days",
    summary: "Multi-piece resin terrain printed with high-detail surface texture.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What file formats do you accept?",
    answer: "STL, 3MF, STEP, and OBJ. If you only have sketches, we can help convert them.",
  },
  {
    question: "How fast can I get my order?",
    answer: "Most standard jobs are delivered within 2-5 business days depending on size and quantity.",
  },
  {
    question: "Do you ship nationwide?",
    answer: "Yes. We offer local pickup and courier shipping with protective packaging.",
  },
  {
    question: "Can you sign an NDA?",
    answer: "Yes, we regularly work with confidential hardware and product development teams.",
  },
];

export const projectTypes = [
  "Prototype",
  "Replacement part",
  "Small-batch product",
  "Art/collectible",
  "Educational model",
] as const;

export const homeCarouselSlides: CarouselSlide[] = [
  {
    src: "/carousel/drone-mount.svg",
    alt: "3D printed drone camera mount with lightweight frame",
    title: "Drone Camera Mount",
    caption: "Functional prototype tuned for real-world flight tests.",
  },
  {
    src: "/carousel/keyboard-case.svg",
    alt: "Custom 3D printed keyboard enclosure with precise fit",
    title: "Custom Keyboard Case",
    caption: "Premium enclosure with accurate tolerances and clean finish.",
  },
  {
    src: "/carousel/manufacturing-jig.svg",
    alt: "Industrial 3D printed manufacturing jig used on packaging line",
    title: "Manufacturing Jig",
    caption: "Production-ready tooling built to speed up setup time.",
  },
  {
    src: "/carousel/miniature-terrain.svg",
    alt: "Highly detailed resin-printed miniature terrain pieces",
    title: "Miniature Terrain Set",
    caption: "High-detail resin prints for collectors and creators.",
  },
];
