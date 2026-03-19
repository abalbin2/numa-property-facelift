"use client";

import { useEffect, useState } from "react";
import { ROOMS } from "../sections/rooms/VariationB";
import styles from "./MobileStickyBar.module.css";

const lowestPrice = Math.min(...ROOMS.map((r) => r.nightlyPrice));

export default function MobileStickyBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero-video]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const roomsEl = document.getElementById("rooms");
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-date-picker"));
      }, 500);
    }
  };

  return (
    <div className={`${styles.bar} ${scrolled ? styles.barScrolled : ""}`}>
      <div className={styles.priceBlock}>
        <span className={styles.priceLabel}>From</span>
        <span className={styles.priceValue}>€{lowestPrice} nightly</span>
      </div>
      <button className={styles.ctaBtn} type="button" onClick={handleClick}>
        Check availability
      </button>
    </div>
  );
}
