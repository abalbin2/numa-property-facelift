export type VariantConfig = {
  id: string;
  label: string;
};

export type SectionConfig = {
  id: string;
  label: string;
  variants: VariantConfig[];
};

export const SECTION_CONFIG: SectionConfig[] = [
  {
    id: "hero",
    label: "Hero",
    variants: [
      { id: "a", label: "A — Split Panel" },
      { id: "b", label: "B — Full Bleed" },
      { id: "c", label: "C — Video Morph" },
    ],
  },
  {
    id: "rooms",
    label: "Rooms",
    variants: [
      { id: "a", label: "A — List + Detail" },
      { id: "b", label: "B — Room Cards" },
    ],
  },
  {
    id: "amenities",
    label: "Amenities",
    variants: [
      { id: "a", label: "A — Skiper" },
      { id: "b", label: "B — Icon Grid" },
    ],
  },
  {
    id: "spotlight",
    label: "Spotlight",
    variants: [
      { id: "a", label: "A — Split Feature" },
    ],
  },
  {
    id: "neighborhood",
    label: "Neighborhood Guide",
    variants: [
      { id: "a", label: "A — Cursor Trail" },
      { id: "b", label: "B — Parallax Scroll" },
      { id: "c", label: "C — Carousel" },
    ],
  },
  {
    id: "map",
    label: "Map",
    variants: [
      { id: "a", label: "A — Interactive Map" },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    variants: [
      { id: "a", label: "A — Stories" },
    ],
  },
  {
    id: "reviews",
    label: "Reviews",
    variants: [
      { id: "a", label: "A — Guest Reviews" },
    ],
  },
  {
    id: "additional-info",
    label: "Additional Info",
    variants: [
      { id: "a", label: "A — Accordion" },
    ],
  },
  {
    id: "footer",
    label: "Footer",
    variants: [
      { id: "a", label: "A — Full Footer" },
    ],
  },
];
