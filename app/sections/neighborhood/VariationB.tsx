"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VariationB.module.css";

// Column data derived from Figma frame 5553-1285
// Each column: left position, images with heights, startY (below viewport), endY (final state from Figma)
const COLUMNS = [
  {
    left: 33,
    startY: 1100,
    endY: -33,   // from Figma: first image top at y=-33
    images: [
      { src: "/cursor-trail/09.png", height: 347 },
      { src: "/cursor-trail/08.png", height: 444 },
    ],
  },
  {
    left: 403,
    startY: 1200,
    endY: -292,  // from Figma: first image top at y=-292
    images: [
      { src: "/cursor-trail/07.png", height: 444 },
      { src: "/cursor-trail/01.png", height: 444 },
      { src: "/cursor-trail/04.png", height: 444 },
    ],
  },
  {
    left: 770,
    startY: 1200,
    endY: -338,  // from Figma: first image top at y=-338 (fastest column)
    images: [
      { src: "/cursor-trail/05.png", height: 444 },
      { src: "/cursor-trail/06.png", height: 444 },
      { src: "/cursor-trail/02.png", height: 444 },
    ],
  },
  {
    left: 1140,
    startY: 1100,
    endY: 37,    // from Figma: first image top at y=37
    images: [
      { src: "/cursor-trail/03.png", height: 337 },
      { src: "/cursor-trail/09.png", height: 454 },
    ],
  },
];

const MOBILE_COLUMNS = [
  {
    left: 0,
    startY: 580,
    endY: -100,
    images: [
      { src: "/cursor-trail/09.png", height: 166 },
      { src: "/cursor-trail/08.png", height: 213 },
      { src: "/cursor-trail/07.png", height: 212 },
    ],
  },
  {
    left: 188,
    startY: 650,
    endY: -150,
    images: [
      { src: "/cursor-trail/01.png", height: 211 },
      { src: "/cursor-trail/05.png", height: 216 },
      { src: "/cursor-trail/04.png", height: 211 },
    ],
  },
];

export default function NeighborhoodScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const columns = isMobile ? MOBILE_COLUMNS : COLUMNS;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial column positions (all below viewport)
      colRefs.current.forEach((col, i) => {
        if (col) gsap.set(col, { y: columns[i].startY });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: isMobile ? "top bottom" : "top top",
          end: isMobile ? "bottom top" : "bottom bottom",
          scrub: 1.5,
        },
      });

      // On mobile, nothing happens until the section is centered in viewport (~0.45)
      // On desktop, animations start immediately (sticky pinning holds the section)
      const phaseStart = isMobile ? 0.45 : 0;

      // Background fades from white → pink
      tl.to(stickyRef.current, { backgroundColor: "#FFC9D2", duration: 0.05, ease: "none" }, phaseStart);

      // Text fades out
      tl.to(textRef.current, { opacity: 0, duration: isMobile ? 0.2 : 0.4, ease: "none" }, phaseStart);

      // Each column travels a different distance = parallax depth effect
      // Images start rising at the same moment text starts fading
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        tl.to(col, { y: columns[i].endY, ease: "none" }, phaseStart);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [isMobile, columns]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>
        {/* Headline — fades as images rise */}
        <p ref={textRef} className={styles.headline}>
          Where the skyline meets the city&apos;s creative streak, Numa Rotterdam
          Coolsingel gives you front-row access to its iconic boulevard.
        </p>

        {/* Image columns */}
        <div className={styles.columnsContainer}>
          <div className={styles.columnsInner}>
            {columns.map((col, ci) => (
              <div
                key={`${isMobile}-${ci}`}
                ref={(el) => { colRefs.current[ci] = el; }}
                className={styles.column}
                style={{ left: col.left }}
              >
                {col.images.map((img, ii) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={ii}
                    src={img.src}
                    alt=""
                    className={styles.img}
                    style={{ height: img.height }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
