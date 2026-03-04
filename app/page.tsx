import Image from "next/image";
import styles from "./page.module.css";
import CursorTrailSection from "./cursor-trail";
import AmenitiesSkiper from "./sections/amenities/VariationSkiper";
import RoomsVariationA from "./sections/rooms/VariationA";
import RoomsVariationB from "./sections/rooms/VariationB";
import NeighborhoodScrollSection from "./sections/neighborhood/VariationB";
import NeighborhoodCarouselSection from "./sections/neighborhood/VariationC";
import { SECTION_CONFIG } from "./sections/config";
import type { ComponentType } from "react";

const COMPONENTS: Record<string, ComponentType> = {
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
      <div className={styles.hero}>

        {/* ── Property photo ── */}
        <div className={styles.heroPhoto}>
          <Image
            src="/property-bg.png"
            alt="Numa Berlin Torstraße interior"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* ── Navigation ── */}
        <nav className={styles.nav}>
          <a href="#" className={styles.navLogo} aria-label="Numa home">
            <svg width="126" height="36" viewBox="0 0 138 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.4977 6.74252L26.2568 26.3247C27.798 29.3011 29.0791 31.8729 30.0712 33.8089C29.9749 31.0349 29.9267 28.1067 29.9267 24.8317V6.74252H36.4188V42.1408H27.692L17.7324 24.3405C15.9023 20.5743 14.1107 17.4535 13.0704 15.3152C13.1667 17.9929 13.1667 21.7591 13.1667 24.9859V42.1408H6.67464V6.74252H15.4977Z" fill="white"/>
              <path d="M41.2256 16.5096H47.5732V30.6399C47.5732 34.358 48.6135 37.2861 52.2352 37.2861C55.7027 37.2861 57.9856 34.2616 57.9856 28.02V16.5096H64.3813V42.1408H58.1397V37.7292C56.7527 40.7056 54.4217 42.8343 50.4532 42.8343C43.8648 42.8343 41.2352 38.4709 41.2352 32.1811V16.5096H41.2256Z" fill="white"/>
              <path d="M68.9185 16.5095H75.1602V20.7188C75.95 18.2915 78.3291 15.8064 82.0472 15.8064C85.5147 15.8064 87.8939 17.2898 89.1846 20.6129C90.6198 17.5402 92.604 15.8064 96.322 15.8064C102.766 15.8064 105.935 20.1698 105.935 26.4596V42.1215H99.6355V28.0104C99.6355 24.2923 98.6434 21.3642 95.4744 21.3642C92.4981 21.3642 90.5716 24.5331 90.5716 29.8886V42.1311H84.4263V28.0104C84.4263 24.2923 83.7809 21.3642 80.2652 21.3642C76.2967 21.3642 75.3046 25.6312 75.3046 30.6303V42.1311H68.9089V16.5095H68.9185Z" fill="white"/>
              <path d="M121.009 15.7197C129.042 15.7197 132.018 20.3335 132.018 26.6233V35.8895C132.018 37.8737 132.163 40.5033 132.509 42.1311H126.114C125.969 41.2931 125.911 40.3492 125.911 39.5015V38.2108H125.863C124.823 40.2432 122.694 42.8246 117.83 42.8246C112.224 42.8246 108.853 39.4534 108.853 35.1382C108.853 28.0971 117.281 27.4035 120.845 26.8641C124.168 26.3729 125.757 25.872 125.757 23.6952C125.757 21.6628 123.975 20.4684 121.047 20.4684C118.524 20.4684 116.636 21.9517 115.99 24.3309H109.989C110.75 20.1312 114.266 15.7197 121.009 15.7197ZM119.573 38.1241C122.848 38.1241 125.873 36.1881 125.873 30.245V28.0682C125.276 29.3107 123.937 30.4473 120.171 31.189C116.751 31.8825 115.21 32.9228 115.21 34.8588C115.21 36.6793 116.693 38.1241 119.573 38.1241Z" fill="white"/>
            </svg>
          </a>

          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Locations</a>
            <a href="#" className={styles.navLink}>Offers &amp; Benefits</a>
            <a href="#" className={styles.navLink}>Business Travel</a>
            <a href="#" className={styles.navLink}>My Trips</a>

            <button className={styles.navIconBtn} aria-label="Select language">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="globe-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#globe-mask)">
                  <path d="M12 22C10.6333 22 9.34167 21.7375 8.125 21.2125C6.90833 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.0917 2.7875 15.875C2.2625 14.6583 2 13.3667 2 12C2 10.6167 2.2625 9.32083 2.7875 8.1125C3.3125 6.90417 4.02917 5.84583 4.9375 4.9375C5.84583 4.02917 6.90833 3.3125 8.125 2.7875C9.34167 2.2625 10.6333 2 12 2C13.3833 2 14.6792 2.2625 15.8875 2.7875C17.0958 3.3125 18.1542 4.02917 19.0625 4.9375C19.9708 5.84583 20.6875 6.90417 21.2125 8.1125C21.7375 9.32083 22 10.6167 22 12C22 13.3667 21.7375 14.6583 21.2125 15.875C20.6875 17.0917 19.9708 18.1542 19.0625 19.0625C18.1542 19.9708 17.0958 20.6875 15.8875 21.2125C14.6792 21.7375 13.3833 22 12 22ZM12 19.95C12.4333 19.35 12.8083 18.725 13.125 18.075C13.4417 17.425 13.7 16.7333 13.9 16H10.1C10.3 16.7333 10.5583 17.425 10.875 18.075C11.1917 18.725 11.5667 19.35 12 19.95ZM9.4 19.55C9.1 19 8.8375 18.4292 8.6125 17.8375C8.3875 17.2458 8.2 16.6333 8.05 16H5.1C5.58333 16.8333 6.1875 17.5583 6.9125 18.175C7.6375 18.7917 8.46667 19.25 9.4 19.55ZM14.6 19.55C15.5333 19.25 16.3625 18.7917 17.0875 18.175C17.8125 17.5583 18.4167 16.8333 18.9 16H15.95C15.8 16.6333 15.6125 17.2458 15.3875 17.8375C15.1625 18.4292 14.9 19 14.6 19.55ZM4.25 14H7.65C7.6 13.6667 7.5625 13.3375 7.5375 13.0125C7.5125 12.6875 7.5 12.35 7.5 12C7.5 11.65 7.5125 11.3125 7.5375 10.9875C7.5625 10.6625 7.6 10.3333 7.65 10H4.25C4.16667 10.3333 4.10417 10.6625 4.0625 10.9875C4.02083 11.3125 4 11.65 4 12C4 12.35 4.02083 12.6875 4.0625 13.0125C4.10417 13.3375 4.16667 13.6667 4.25 14ZM9.65 14H14.35C14.4 13.6667 14.4375 13.3375 14.4625 13.0125C14.4875 12.6875 14.5 12.35 14.5 12C14.5 11.65 14.4875 11.3125 14.4625 10.9875C14.4375 10.6625 14.4 10.3333 14.35 10H9.65C9.6 10.3333 9.5625 10.6625 9.5375 10.9875C9.5125 11.3125 9.5 11.65 9.5 12C9.5 12.35 9.5125 12.6875 9.5375 13.0125C9.5625 13.3375 9.6 13.6667 9.65 14ZM16.35 14H19.75C19.8333 13.6667 19.8958 13.3375 19.9375 13.0125C19.9792 12.6875 20 12.35 20 12C20 11.65 19.9792 11.3125 19.9375 10.9875C19.8958 10.6625 19.8333 10.3333 19.75 10H16.35C16.4 10.3333 16.4375 10.6625 16.4625 10.9875C16.4875 11.3125 16.5 11.65 16.5 12C16.5 12.35 16.4875 12.6875 16.4625 13.0125C16.4375 13.3375 16.4 13.6667 16.35 14ZM15.95 8H18.9C18.4167 7.16667 17.8125 6.44167 17.0875 5.825C16.3625 5.20833 15.5333 4.75 14.6 4.45C14.9 5 15.1625 5.57083 15.3875 6.1625C15.6125 6.75417 15.8 7.36667 15.95 8ZM10.1 8H13.9C13.7 7.26667 13.4417 6.575 13.125 5.925C12.8083 5.275 12.4333 4.65 12 4.05C11.5667 4.65 11.1917 5.275 10.875 5.925C10.5583 6.575 10.3 7.26667 10.1 8ZM5.1 8H8.05C8.2 7.36667 8.3875 6.75417 8.6125 6.1625C8.8375 5.57083 9.1 5 9.4 4.45C8.46667 4.75 7.6375 5.20833 6.9125 5.825C6.1875 6.44167 5.58333 7.16667 5.1 8Z" fill="white"/>
                </g>
              </svg>
            </button>

            <a href="#" className={styles.navLink}>Sign up</a>
          </div>
        </nav>

        {/* ── Property info overlay (bottom of photo) ── */}
        <div className={styles.heroInfo}>
          <div className={styles.heroText}>
            <h1 className={styles.heroName}>Numa Berlin Torstraße</h1>
            <div className={styles.heroAddress}>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <mask id="loc-mask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-4" y="-2" width="24" height="24">
                  <rect x="-4" y="-2" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#loc-mask)">
                  <path d="M9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10C8.55 10 9.02083 9.80417 9.4125 9.4125ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill="#FFC9D2"/>
                </g>
              </svg>
              <span className={styles.heroAddressText}>Alte Schönhauser Str. 2</span>
            </div>
          </div>

          <button className={styles.btnImages} type="button">
            <span className={styles.btnImagesLabel}>View images</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15.96 10.29L13.21 13.83L11.25 11.47L8.5 15H19.5L15.96 10.29ZM3 5H1V21C1 22.1 1.9 23 3 23H19V21H3V5ZM21 1H7C5.9 1 5 1.9 5 3V17C5 18.1 5.9 19 7 19H21C22.1 19 23 18.1 23 17V3C23 1.9 22.1 1 21 1ZM21 17H7V3H21V17Z" fill="#FFC9D2"/>
            </svg>
          </button>
        </div>

        {/* ── Right panel description ── */}
        <div className={styles.heroDesc}>
          <p>At Numa Berlin Torstraße, you&apos;re dialed into Mitte&apos;s blend of galleries, street eats, and late-night hangouts.</p>
        </div>

      </div>

      {/* ── Sections (variation-aware) ── */}
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
