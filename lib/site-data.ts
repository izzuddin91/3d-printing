import type {
	CarouselSlide,
	FaqItem,
	Material,
	PortfolioItem,
	Service,
} from "@/lib/types";

export const projectTypes = [
	"Prototype",
	"Replacement part",
	"Small-batch product",
	"Art/collectible",
	"Educational model",
] as const;

export const services: Service[] = [
	{
		id: "rapid-prototyping",
		title: "Rapid Prototyping",
		description:
			"Fast design-to-part iteration for product development and testing.",
		features: [
			"24-72 hour turnaround for most parts",
			"Design feedback before printing",
			"Functional and visual prototype options",
		],
	},
	{
		id: "custom-parts",
		title: "Custom Part Production",
		description:
			"Reliable custom parts for replacement, fit-checks, and one-off tooling.",
		features: [
			"Print-to-order single parts",
			"Dimension checks before delivery",
			"Material recommendations by use case",
		],
	},
	{
		id: "small-batch",
		title: "Small-Batch Manufacturing",
		description:
			"Consistent repeat production for short-run products and enclosures.",
		features: [
			"Batch quality consistency",
			"Post-processing on request",
			"Flexible pickup and delivery options",
		],
	},
];

export const materials: Material[] = [
	{
		name: "PLA",
		bestFor: "Concept models and display parts",
		finish: "Smooth matte",
		priceTier: "economy",
	},
	{
		name: "PETG",
		bestFor: "Durable utility parts",
		finish: "Satin",
		priceTier: "standard",
	},
	{
		name: "ABS",
		bestFor: "Heat-resistant mechanical parts",
		finish: "Semi-matte",
		priceTier: "standard",
	},
	{
		name: "TPU",
		bestFor: "Flexible and impact-resistant parts",
		finish: "Rubbery",
		priceTier: "premium",
	},
	{
		name: "Resin",
		bestFor: "High-detail miniatures and visual prototypes",
		finish: "Fine detail",
		priceTier: "premium",
	},
];

export const portfolioItems: PortfolioItem[] = [
	{
		name: "Drone Camera Mount",
		category: "Prototype",
		leadTime: "2 days",
		summary: "Lightweight PETG bracket redesigned for vibration resistance.",
	},
	{
		name: "Keyboard Case",
		category: "Consumer Product",
		leadTime: "4 days",
		summary: "Custom ABS case with threaded insert mounts and tight tolerances.",
	},
	{
		name: "Manufacturing Jig",
		category: "Industrial",
		leadTime: "3 days",
		summary: "Repeat-use fixture for alignment and drill guidance on the shop floor.",
	},
	{
		name: "Miniature Terrain Set",
		category: "Creative",
		leadTime: "5 days",
		summary: "High-detail resin prints with post-processed support cleanup.",
	},
];

export const faqItems: FaqItem[] = [
	{
		question: "What file formats do you accept?",
		answer:
			"STL, STEP, OBJ, and 3MF are accepted. If you only have sketches, we can still help estimate.",
	},
	{
		question: "How fast can I get my parts?",
		answer:
			"Most single-part jobs are ready within 1-3 working days depending on size and material.",
	},
	{
		question: "Do you offer design support?",
		answer:
			"Yes. We provide light DFM feedback and can suggest changes to improve printability and strength.",
	},
	{
		question: "Can you handle repeat batch orders?",
		answer:
			"Yes. We support repeat runs with consistent settings and documented print profiles.",
	},
];

export const carouselSlides: CarouselSlide[] = [
	{
		src: "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/competition_photo%2FScreenshot%202026-04-14%20at%202.34.14%20PM.png?alt=media&token=50657956-4acb-4398-b283-196e37871ee0",
		alt: "3D printed drone mount",
		title: "Drone Mount",
		caption: "PETG prototype for high-vibration testing",
	},
	{
		src: "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/competition_photo%2FScreenshot%202026-04-14%20at%202.34.28%20PM.png?alt=media&token=603bcfc3-db41-4e84-a108-906ad175f3a2",
		alt: "3D printed keyboard case",
		title: "Keyboard Case",
		caption: "Precision enclosure with custom fit",
	},
	{
		src: "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/competition_photo%2FScreenshot%202026-04-14%20at%202.34.44%20PM.png?alt=media&token=3c13b194-11f6-4e8a-a553-9b6f02be8333",
		alt: "3D printed manufacturing jig",
		title: "Manufacturing Jig",
		caption: "Shop-floor fixture built for repeatability",
	},
	{
		src: "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/competition_photo%2FScreenshot%202026-04-14%20at%202.34.56%20PM.png?alt=media&token=10909edf-71e6-488b-a2c4-4c4bc5726a75",
		alt: "3D printed miniature terrain",
		title: "Miniature Terrain",
		caption: "Detail-focused resin print set",
	},
];

