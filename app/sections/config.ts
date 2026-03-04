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
    id: "amenities",
    label: "Amenities",
    variants: [
      { id: "a", label: "A — Skiper" },
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
    id: "neighborhood",
    label: "Neighborhood Guide",
    variants: [
      { id: "a", label: "A — Cursor Trail" },
      { id: "b", label: "B — Parallax Scroll" },
      { id: "c", label: "C — Carousel" },
    ],
  },
];
