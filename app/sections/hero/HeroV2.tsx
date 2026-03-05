"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero-v2.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainPhotoRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const galleryBgRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  // center column (slide from below)
  const photoC1Ref = useRef<HTMLDivElement>(null);
  // right column (slide from right)
  const photoR1Ref = useRef<HTMLDivElement>(null);
  const photoR3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mainPhoto = mainPhotoRef.current;
    const heroOverlay = heroOverlayRef.current;
    const galleryBg = galleryBgRef.current;
    const desc = descRef.current;
    const photoC1 = photoC1Ref.current;
    const photosRight = [photoR1Ref.current, photoR3Ref.current];

    if (!section || !mainPhoto || !heroOverlay || !galleryBg) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Final position of main photo (large bedroom, bottom-center column)
    const finalW = 415;
    const finalH = 360;
    const finalLeft = 610;
    const finalTop = Math.min(400, vh - finalH - 60); // clamp if viewport is short

    // Set initial states
    gsap.set(mainPhoto, { top: 0, left: 0, width: vw, height: vh, borderRadius: 0 });
    gsap.set(galleryBg, { opacity: 0 });
    if (photoC1) gsap.set(photoC1, { y: 180, opacity: 0 });
    photosRight.forEach(el => { if (el) gsap.set(el, { x: 360, opacity: 0 }); });
    if (desc) gsap.set(desc, { x: -50, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: 1.2,
      },
    });

    // Fade hero overlay out, white bg in
    tl.to(heroOverlay, { opacity: 0, duration: 0.35 }, 0);
    tl.to(galleryBg, { opacity: 1, duration: 0.35 }, 0.05);

    // Main photo shrinks to bottom-center card
    tl.to(mainPhoto, {
      top: finalTop,
      left: finalLeft,
      width: finalW,
      height: finalH,
      borderRadius: 0,
      duration: 0.72,
      ease: "power2.inOut",
    }, 0);

    // Top-center photo slides up from below
    if (photoC1) tl.to(photoC1, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.22);

    // Right column photos slide in from right (staggered)
    photosRight.forEach((el, i) => {
      if (el) tl.to(el, { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.2 + i * 0.07);
    });

    // Description fades in from left
    if (desc) tl.to(desc, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.28);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* White gallery background */}
      <div ref={galleryBgRef} className={styles.galleryBg} />

      {/* Top-left description */}
      <div ref={descRef} className={styles.galleryDesc}>
        <p>At Numa Berlin Torstraße, you&apos;re dialed into Mitte&apos;s blend of galleries, street eats, and late-night hangouts.</p>
      </div>

      {/* Center column — top: lifestyle photo (slides up) */}
      <div ref={photoC1Ref} className={`${styles.galleryPhoto} ${styles.photoC1}`}>
        <Image src="/social/collage-1.jpg" alt="Berlin lifestyle" fill style={{ objectFit: "cover" }} />
      </div>

      {/* Right column — top: bedroom with art (slides right) */}
      <div ref={photoR1Ref} className={`${styles.galleryPhoto} ${styles.photoR1}`}>
        <Image src="/hero-v2-photo-1.png" alt="Numa Berlin room" fill style={{ objectFit: "cover" }} />
      </div>

      {/* Right column — bottom: friends (slides right) */}
      <div ref={photoR3Ref} className={`${styles.galleryPhoto} ${styles.photoR3}`}>
        <Image src="/social/collage-3.jpg" alt="Numa Berlin guests" fill style={{ objectFit: "cover" }} />
      </div>

      {/* Main photo — starts full-bleed, shrinks to bottom-center card */}
      <div ref={mainPhotoRef} className={styles.mainPhoto}>
        <Image
          src="/hero-v2-bg.png"
          alt="Numa Berlin Torstraße interior"
          fill
          priority
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      </div>

      {/* Hero overlay — fades out on scroll */}
      <div ref={heroOverlayRef} className={styles.heroOverlay}>

        <div className={styles.heroGradient} />

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
                <mask id="globe-mask-v2" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#globe-mask-v2)">
                  <path d="M12 22C10.6333 22 9.34167 21.7375 8.125 21.2125C6.90833 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.0917 2.7875 15.875C2.2625 14.6583 2 13.3667 2 12C2 10.6167 2.2625 9.32083 2.7875 8.1125C3.3125 6.90417 4.02917 5.84583 4.9375 4.9375C5.84583 4.02917 6.90833 3.3125 8.125 2.7875C9.34167 2.2625 10.6333 2 12 2C13.3833 2 14.6792 2.2625 15.8875 2.7875C17.0958 3.3125 18.1542 4.02917 19.0625 4.9375C19.9708 5.84583 20.6875 6.90417 21.2125 8.1125C21.7375 9.32083 22 10.6167 22 12C22 13.3667 21.7375 14.6583 21.2125 15.875C20.6875 17.0917 19.9708 18.1542 19.0625 19.0625C18.1542 19.9708 17.0958 20.6875 15.8875 21.2125C14.6792 21.7375 13.3833 22 12 22Z" fill="white"/>
                </g>
              </svg>
            </button>
            <a href="#" className={styles.navLink}>Sign up</a>
          </div>
        </nav>

        <div className={styles.heroTitle}>
          <h1 className={styles.heroName}>Numa Berlin Torstraße</h1>
          <div className={styles.sectionNav}>
            <a href="#photos" className={styles.sectionNavLink}>Photos</a>
            <a href="#rooms" className={styles.sectionNavLink}>Rooms</a>
            <a href="#location" className={styles.sectionNavLink}>Location</a>
            <a href="#reviews" className={styles.sectionNavLink}>Reviews</a>
            <a href="#faq" className={styles.sectionNavLink}>FAQ</a>
            <button className={styles.btnAvailability}>Check availability</button>
          </div>
        </div>

        <div className={styles.photoStrip}>
          <div className={styles.photoThumb}>
            <Image src="/hero-v2-photo-1.png" alt="Property photo 1" fill style={{ objectFit: "cover", borderRadius: "8px" }} />
          </div>
          <div className={styles.photoThumb}>
            <Image src="/hero-v2-photo-2.png" alt="Property photo 2" fill style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }} />
          </div>
          <div className={styles.photoThumbMain}>
            <Image src="/hero-v2-photo-3.png" alt="Property photo 3" fill style={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }} />
            <div className={styles.photosOverlay}>
              <button className={styles.photosBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.96 10.29L13.21 13.83L11.25 11.47L8.5 15H19.5L15.96 10.29ZM3 5H1V21C1 22.1 1.9 23 3 23H19V21H3V5ZM21 1H7C5.9 1 5 1.9 5 3V17C5 18.1 5.9 19 7 19H21C22.1 19 23 18.1 23 17V3C23 1.9 22.1 1 21 1ZM21 17H7V3H21V17Z" fill="#191919"/>
                </svg>
                <span>27 photos</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
