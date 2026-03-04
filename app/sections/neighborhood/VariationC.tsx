"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./VariationC.module.css";

const SLIDES = [
  {
    bg: "/museum_island.jpg",
    walk: "7 min walk",
    title: "Museum Island",
    body: "A UNESCO World Heritage Site right on your doorstep. Five world-class museums — from ancient Egypt to the 19th century — set on a dramatic Spree island. Perfect for a morning of culture before lunch back in Mitte.",
  },
  {
    bg: "/brandenburg_gate.jpg",
    walk: "12 min walk",
    title: "Brandenburg Gate",
    body: "Berlin's most iconic symbol, right in the heart of Mitte. Stroll the grand Unter den Linden boulevard, linger on Pariser Platz, and watch the neoclassical gate glow gold at sunset — a genuinely unmissable moment.",
  },
  {
    bg: "/hackescher_markt.webp",
    walk: "3 min walk",
    title: "Hackescher Markt",
    body: "Berlin's most vibrant square, alive from morning coffee to late-night cocktails. Wind through the art nouveau Hackesche Höfe courtyards, find independent boutiques, and pick a terrace to watch the neighbourhood buzz by.",
  },
];

export default function NeighborhoodCarouselSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const go = useCallback((idx: number) => {
    clearTimeout(timerRef.current);
    setCurrent(((idx % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance every 6 s; resets whenever current changes
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  return (
    <section className={styles.section}>
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === current ? styles.active : ""}`}
          style={{ backgroundImage: `url(${slide.bg})` }}
          aria-hidden={i !== current}
        >
          <div className={styles.overlay} />

          <div className={styles.content}>
            {/* Navigation arrows — above text per Figma layout */}
            <div className={styles.arrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => go(current - 1)}
                aria-label="Previous slide"
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="21.5" stroke="white" strokeOpacity="0.5" />
                  <path d="M24 15L17 22L24 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                className={styles.arrowBtn}
                onClick={() => go(current + 1)}
                aria-label="Next slide"
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="21.5" stroke="white" strokeOpacity="0.5" />
                  <path d="M20 15L27 22L20 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <span className={styles.badge}>{slide.walk}</span>

            <div className={styles.textBlock}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.body}>{slide.body}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className={styles.dots} role="tablist" aria-label="Slides">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
            onClick={() => go(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={slide.title}
          />
        ))}
      </div>
    </section>
  );
}
