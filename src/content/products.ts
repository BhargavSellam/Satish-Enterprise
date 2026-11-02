/**
 * PRODUCT CATALOGUE — DEMO DATA
 * Every product below is a clearly labelled sample (`demo: true`). Replace with confirmed
 * inventory before launch. See CONTENT.md for how to add products and swap images.
 * Only fill in specs the manufacturer has verified — leave a field undefined otherwise.
 */
import granite from "@/assets/cat-granite.jpg";
import tiles from "@/assets/cat-tiles.jpg";
import quartz from "@/assets/cat-quartz.jpg";
import sanitary from "@/assets/cat-sanitary.jpg";
import wall from "@/assets/app-wall.jpg";
import commercial from "@/assets/app-commercial.jpg";
import hero from "@/assets/hero.jpg";

export type CategorySlug = "granites" | "tiles" | "quartz" | "sanitaryware";

export const CATEGORIES: {
  slug: CategorySlug;
  name: string;
  intro: string;
  image: string;
}[] = [
  { slug: "granites", name: "Granites", intro: "Natural granite slabs and surfaces, presented with clear slab and close-up photographs.", image: granite },
  { slug: "tiles", name: "Tiles", intro: "Floor, wall, kitchen, bathroom and outdoor tiles, organised by where they are used.", image: tiles },
  { slug: "quartz", name: "Quartz", intro: "Quartz colours and patterns, with application details taken from product specifications.", image: quartz },
  { slug: "sanitaryware", name: "Sanitaryware", intro: "Wash basins, toilets and related bathroom products.", image: sanitary },
];

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: CategorySlug;
  demo: boolean;
  images: string[];
  colour?: string;
  finish?: string;
  size?: string;
  thickness?: string;
  variants?: string[];
  applications?: string[];
  mounting?: string;
  care?: string;
  description: string;
  unit: "sq ft" | "slab" | "box" | "piece";
};

export const PRODUCTS: Product[] = [
  { slug: "demo-black-galaxy-granite", code: "DEMO-GR-01", name: "Black Galaxy (Sample)", category: "granites", demo: true, images: [granite, commercial], colour: "Black", finish: "Polished", applications: ["Kitchen surfaces", "Flooring"], variants: ["Polished"], description: "Sample listing showing how a granite slab will be presented. Replace with a confirmed slab, its real photographs and verified dimensions.", unit: "slab" },
  { slug: "demo-grey-granite", code: "DEMO-GR-02", name: "Silver Grey (Sample)", category: "granites", demo: true, images: [commercial, granite], colour: "Grey", finish: "Polished", applications: ["Flooring", "Commercial spaces"], description: "Sample granite listing. Specifications to be supplied by the business.", unit: "slab" },
  { slug: "demo-marble-look-floor-tile", code: "DEMO-TL-01", name: "Ivory Marble-Look Floor Tile (Sample)", category: "tiles", demo: true, images: [hero, tiles], colour: "Ivory", finish: "Glossy", applications: ["Flooring"], variants: ["Glossy", "Matt"], description: "Sample floor tile listing. Sizes and technical ratings to be confirmed from the manufacturer's sheet.", unit: "box" },
  { slug: "demo-wood-look-tile", code: "DEMO-TL-02", name: "Oak Wood-Look Tile (Sample)", category: "tiles", demo: true, images: [tiles], colour: "Brown", finish: "Matt", applications: ["Flooring"], description: "Sample wood-look tile listing.", unit: "box" },
  { slug: "demo-stone-wall-tile", code: "DEMO-TL-03", name: "Stone Feature Wall Tile (Sample)", category: "tiles", demo: true, images: [wall], colour: "Beige", finish: "Matt", applications: ["Wall features"], description: "Sample wall tile listing.", unit: "box" },
  { slug: "demo-calacatta-quartz", code: "DEMO-QZ-01", name: "White Veined Quartz (Sample)", category: "quartz", demo: true, images: [quartz, hero], colour: "White", finish: "Polished", applications: ["Kitchen surfaces"], description: "Sample quartz listing. Thickness, slab size and care guidance to be supplied from the manufacturer.", unit: "slab" },
  { slug: "demo-countertop-basin", code: "DEMO-SW-01", name: "Countertop Wash Basin (Sample)", category: "sanitaryware", demo: true, images: [sanitary], colour: "White", mounting: "Countertop", applications: ["Bathroom finishes"], description: "Sample wash basin listing. Dimensions and technical specifications to be added when supplied.", unit: "piece" },
  { slug: "demo-wall-hung-toilet", code: "DEMO-SW-02", name: "Wall-Hung Toilet (Sample)", category: "sanitaryware", demo: true, images: [sanitary], colour: "White", mounting: "Wall-hung", applications: ["Bathroom finishes"], description: "Sample toilet listing. Specifications to be supplied by the business.", unit: "piece" },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
