import styles from "./page.module.css";
import HeroV1 from "./sections/hero/HeroV1";
import HeroV2 from "./sections/hero/HeroV2";
import CursorTrailSection from "./cursor-trail";
import SocialStories from "./sections/social/VariationStories";
import AmenitiesSkiper from "./sections/amenities/VariationSkiper";
import RoomsVariationA from "./sections/rooms/VariationA";
import RoomsVariationB from "./sections/rooms/VariationB";
import NeighborhoodScrollSection from "./sections/neighborhood/VariationB";
import NeighborhoodCarouselSection from "./sections/neighborhood/VariationC";
import { SECTION_CONFIG } from "./sections/config";
import type { ComponentType } from "react";

const COMPONENTS: Record<string, ComponentType> = {
  "hero-a": HeroV1,
  "hero-b": HeroV2,
  "social-a": SocialStories,
  "amenities-a": AmenitiesSkiper,
  "rooms-a": RoomsVariationA,
  "rooms-b": RoomsVariationB,
  "neighborhood-a": CursorTrailSection,
  "neighborhood-b": NeighborhoodScrollSection,
  "neighborhood-c": NeighborhoodCarouselSection,
};

export default async function PropertyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <>
      {SECTION_CONFIG.map((section) => {
        const selected =
          typeof params[section.id] === "string"
            ? (params[section.id] as string)
            : undefined;

        if (selected) {
          const Component = COMPONENTS[`${section.id}-${selected}`];
          if (!Component) return null;
          return <Component key={section.id} />;
        }

        // Team mode: all variants stacked with labels
        return section.variants.map((variant) => {
          const Component = COMPONENTS[`${section.id}-${variant.id}`];
          if (!Component) return null;
          return (
            <div key={`${section.id}-${variant.id}`}>
              <div className={styles.variantLabel}>
                <span>{section.label}</span>
                <span className={styles.variantLabelDivider}>·</span>
                <span>{variant.label}</span>
              </div>
              <Component />
            </div>
          );
        });
      })}
    </>
  );
}
