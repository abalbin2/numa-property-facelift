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
    id: "social",
    label: "Social Media",
    variants: [
      { id: "a", label: "A — Stories" },
    ],
  },
];
