import styles from "./page.module.css";
import HeroV1 from "./sections/hero/HeroV1";
import HeroV2 from "./sections/hero/HeroV2";
import HeroV3 from "./sections/hero/HeroV3";
import CursorTrailSection from "./cursor-trail";
import SocialStories from "./sections/social/VariationStories";
import AmenitiesSkiper from "./sections/amenities/VariationSkiper";
import AmenitiesVariationB from "./sections/amenities/VariationB";
import RoomsVariationA from "./sections/rooms/VariationA";
import RoomsVariationB from "./sections/rooms/VariationB";
import SpotlightVariationA from "./sections/spotlight/VariationA";
import SpotlightVariationB from "./sections/spotlight/VariationB";
import NeighborhoodScrollSection from "./sections/neighborhood/VariationB";
import NeighborhoodCarouselSection from "./sections/neighborhood/VariationC";
import MapVariationA from "./sections/map/VariationA";
import ReviewsVariationA from "./sections/reviews/VariationA";
import AdditionalInfoVariationA from "./sections/additional-info/VariationA";
import FooterVariationA from "./sections/footer/VariationA";
import { SECTION_CONFIG } from "./sections/config";
import StickyHeader from "./components/StickyHeader";
import MobileStickyBar from "./components/MobileStickyBar";
import type { ComponentType } from "react";

const COMPONENTS: Record<string, ComponentType> = {
  "hero-a": HeroV1,
  "hero-b": HeroV2,
  "hero-c": HeroV3,
  "social-a": SocialStories,
  "amenities-a": AmenitiesSkiper,
  "amenities-b": AmenitiesVariationB,
  "rooms-a": RoomsVariationA,
  "rooms-b": RoomsVariationB,
  "spotlight-a": SpotlightVariationA,
  "spotlight-b": SpotlightVariationB,
  "neighborhood-a": CursorTrailSection,
  "neighborhood-b": NeighborhoodScrollSection,
  "neighborhood-c": NeighborhoodCarouselSection,
  "map-a": MapVariationA,
  "reviews-a": ReviewsVariationA,
  "additional-info-a": AdditionalInfoVariationA,
  "footer-a": FooterVariationA,
};

export default async function PropertyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <>
      <StickyHeader />
      <MobileStickyBar />
      {SECTION_CONFIG.map((section) => {
        const selected =
          typeof params[section.id] === "string"
            ? (params[section.id] as string)
            : undefined;

        if (selected) {
          const Component = COMPONENTS[`${section.id}-${selected}`];
          if (!Component) return null;
          return (
            <div key={section.id} id={section.id}>
              <Component />
            </div>
          );
        }

        // Team mode: all variants stacked with labels
        return section.variants.map((variant, i) => {
          const Component = COMPONENTS[`${section.id}-${variant.id}`];
          if (!Component) return null;
          const showLabel = section.variants.length > 1;
          return (
            <div key={`${section.id}-${variant.id}`} {...(i === 0 ? { id: section.id } : {})}>
              {showLabel && (
                <div className={styles.variantLabel}>
                  <span>{section.label}</span>
                  <span className={styles.variantLabelDivider}>·</span>
                  <span>{variant.label}</span>
                </div>
              )}
              <Component />
            </div>
          );
        });
      })}
    </>
  );
}
