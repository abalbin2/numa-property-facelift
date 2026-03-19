"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./VariationB.module.css";

const FEATURES = [
  {
    name: "Fitness center",
    image: "/spotlight/fitness-center.png",
    description:
      "Take a quiet break above the city and cool off whenever you need a reset, with a rooftop pool that gives you space to unwind at your own pace.",
  },
  {
    name: "Co-working space",
    image: "/spotlight/coworking-space.png",
    description:
      "Take a quiet break above the city and cool off whenever you need a reset, with a rooftop pool that gives you space to unwind at your own pace.",
  },
  {
    name: "Rooftop pool",
    image: "/spotlight/rooftop-pool.png",
    description:
      "Take a quiet break above the city and cool off whenever you need a reset, with a rooftop pool that gives you space to unwind at your own pace.",
  },
];

// Stacking offsets derived from Figma:
// Active (depth 0): 435×579, bottom-aligned, full width
// Depth 1: 411×547, centered, peeks 51px above active (579-547+19=51)
// Depth 2: 379×504, centered, peeks 109px above active (579-504+34=109)
const STACK_BASE_WIDTH = 435;
const STACK_BASE_HEIGHT = 579;

// Each depth: width, height, bottom offset (how far above the container bottom)
// left is calculated to center the card: (435 - width) / 2
function getStackProps(depth: number) {
  if (depth === 0) return { width: 435, height: 579, bottom: 0, left: 0 };
  if (depth === 1) return { width: 411, height: 547, bottom: 51, left: 12 };
  return { width: 379, height: 504, bottom: 109, left: 28 };
}

export default function SpotlightVariationB() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRender = useRef(true);
  const prevActiveRef = useRef(0);

  // Animate cards on active change
  useEffect(() => {
    const prev = prevActiveRef.current;
    const goingForward = active > prev;
    const isFirst = isFirstRender.current;

    FEATURES.forEach((_, i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      if (i === active) {
        if (isFirst) {
          // First render: show immediately, no animation
          gsap.set(card, {
            autoAlpha: 1,
            width: STACK_BASE_WIDTH,
            height: STACK_BASE_HEIGHT,
            left: 0,
            bottom: 0,
            y: 0,
            zIndex: FEATURES.length,
          });
        } else if (goingForward) {
          // Slide up from viewport bottom
          const rect = card.getBoundingClientRect();
          const slideDistance = window.innerHeight - rect.top;
          gsap.set(card, {
            autoAlpha: 1,
            width: STACK_BASE_WIDTH,
            height: STACK_BASE_HEIGHT,
            left: 0,
            bottom: 0,
            y: slideDistance,
            zIndex: FEATURES.length,
          });
          gsap.to(card, {
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          });
        } else {
          // Going backward: card was visible in stack, animate to full size
          gsap.to(card, {
            autoAlpha: 1,
            width: STACK_BASE_WIDTH,
            height: STACK_BASE_HEIGHT,
            left: 0,
            bottom: 0,
            y: 0,
            zIndex: FEATURES.length,
            duration: 0.65,
            ease: "power2.out",
          });
        }
      } else if (i < active) {
        // Cards behind active — stacked above, smaller, peeking out
        const depth = active - i;
        const props = getStackProps(depth);
        gsap.to(card, {
          autoAlpha: 1,
          width: props.width,
          height: props.height,
          left: props.left,
          bottom: props.bottom,
          y: 0,
          zIndex: FEATURES.length - depth,
          duration: isFirst ? 0 : 0.6,
          ease: "power2.inOut",
        });
      } else if (i === prev && !isFirst && !goingForward) {
        // Going backward: departing card slides down out of viewport
        const rect = card.getBoundingClientRect();
        const slideDistance = window.innerHeight - rect.top;
        gsap.to(card, {
          y: slideDistance,
          duration: 0.65,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(card, { autoAlpha: 0, y: 0, zIndex: 0 });
          },
        });
      } else {
        // Cards after active — hidden
        gsap.set(card, { autoAlpha: 0, zIndex: 0 });
      }
    });

    // Animate description heights
    FEATURES.forEach((_, i) => {
      const wrap = descRefs.current[i];
      if (!wrap) return;
      if (i === active) {
        wrap.style.height = "auto";
        const h = wrap.scrollHeight;
        wrap.style.height = isFirst ? `${h}px` : "0px";
        if (!isFirst) {
          gsap.to(wrap, { height: h, duration: 0.4, ease: "power2.out" });
        }
      } else {
        gsap.to(wrap, {
          height: 0,
          duration: isFirst ? 0 : 0.3,
          ease: "power2.in",
        });
      }
    });

    prevActiveRef.current = active;
    isFirstRender.current = false;
  }, [active]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionDivider} aria-hidden="true" />
      <div className={styles.inner}>
        {/* Left: stacked images */}
        <div className={styles.imageColumn}>
          <div className={styles.imageStack}>
            {FEATURES.map((f, i) => (
              <div
                key={f.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={styles.card}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.image} alt={f.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: text list (desktop) */}
        <div className={styles.textColumn}>
          {FEATURES.map((f, i) => (
            <div
              key={f.name}
              className={`${styles.featureItem} ${i === active ? styles.featureItemActive : ""}`}
              onClick={() => setActive(i)}
            >
              <p className={styles.featureName}>{f.name}</p>
              <div
                ref={(el) => { descRefs.current[i] = el; }}
                className={styles.descriptionWrap}
              >
                <p className={styles.description}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single feature text (hidden on desktop) */}
        <div className={styles.mobileText}>
          <p className={styles.featureName} style={{ color: '#191919' }}>{FEATURES[active].name}</p>
          <p className={styles.description}>{FEATURES[active].description}</p>
        </div>

        {/* Mobile chevron navigation */}
        <div className={styles.mobileNav}>
          <button
            className={styles.navBtn}
            onClick={() => setActive((active - 1 + FEATURES.length) % FEATURES.length)}
            aria-label="Previous feature"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={styles.navBtn}
            onClick={() => setActive((active + 1) % FEATURES.length)}
            aria-label="Next feature"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.sectionDivider} aria-hidden="true" />
    </section>
  );
}
