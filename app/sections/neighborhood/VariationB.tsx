"use client";

import { useEffect, useRef } from "react";
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

export default function NeighborhoodScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Set initial column positions (all below viewport)
      colRefs.current.forEach((col, i) => {
        if (col) gsap.set(col, { y: COLUMNS[i].startY });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Text fades from 1 → 0.05
      tl.to(textRef.current, { opacity: 0.05, ease: "none" }, 0);

      // Each column travels a different distance = parallax depth effect
      colRefs.current.forEach((col, i) => {
        if (!col) return;
        tl.to(col, { y: COLUMNS[i].endY, ease: "none" }, 0);
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.sticky}>
        {/* Headline — fades as images rise */}
        <p ref={textRef} className={styles.headline}>
          At Numa Berlin Torstraße, you&apos;re dialed into Mitte&apos;s blend of
          galleries, street eats, and late-night hangouts.
        </p>

        {/* Image columns */}
        <div className={styles.columnsContainer}>
          <div className={styles.columnsInner}>
            {COLUMNS.map((col, ci) => (
              <div
                key={ci}
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
