"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StickyHeader.module.css";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: "Overview", target: "hero" },
  { label: "Rooms", target: "rooms" },
  { label: "Amenities", target: "amenities" },
  { label: "Location", target: "neighborhood" },
  { label: "Reviews", target: "reviews" },
  { label: "FAQ", target: "additional-info" },
];

export default function StickyHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Find the hero section by data attribute
    const heroSection = document.querySelector('[data-section="hero"]');
    if (!heroSection) return;

    // The hero is pinned by GSAP (end: "+=170%"). We want to show the
    // header once the hero's pin animation is complete. We listen for
    // ScrollTrigger's "refresh" event so we get the correct end position
    // after all pin spacers are calculated.
    let st: ScrollTrigger | null = null;

    const setup = () => {
      // Kill previous instance if refreshing
      if (st) st.kill();

      const heroST = ScrollTrigger.getAll().find(
        (trigger) => trigger.trigger === heroSection
      );

      const triggerScroll = heroST ? heroST.end : window.innerHeight * 2.7;

      st = ScrollTrigger.create({
        start: triggerScroll,
        end: 99999999,
        onToggle: ({ isActive }) => {
          if (isActive) {
            gsap.to(header, { y: 0, duration: 0.4, ease: "power2.out" });
          } else {
            gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.in" });
          }
        },
      });
    };

    // Run setup after hero's ScrollTrigger has initialized
    const rafId = requestAnimationFrame(setup);

    // Re-sync on window resize / ScrollTrigger refresh
    ScrollTrigger.addEventListener("refresh", setup);

    // Active section tracking via scroll listener.
    // Find whichever section's top is closest to (but still at or above)
    // the bottom of the sticky header. Iterate in order so the last one
    // that qualifies wins (i.e. the deepest section in view).
    const HEADER_HEIGHT = 96;

    const getActiveSection = () => {
      let current = NAV_ITEMS[0].target;
      for (const { target } of NAV_ITEMS) {
        const el = document.getElementById(target);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= HEADER_HEIGHT + 10) {
          current = target;
        }
      }
      return current;
    };

    // Match header bg to the neighborhood section's animated background
    const syncHeaderBg = () => {
      if (!header) return;
      const neighborhoodEl = document.getElementById("neighborhood");
      if (!neighborhoodEl) return;

      const rect = neighborhoodEl.getBoundingClientRect();
      // Check if the neighborhood section is behind the header
      if (rect.top <= HEADER_HEIGHT && rect.bottom > HEADER_HEIGHT) {
        // Read the sticky inner div's computed bg (GSAP animates it)
        const stickyDiv = neighborhoodEl.querySelector("[class*='sticky']");
        if (stickyDiv) {
          header.style.backgroundColor = getComputedStyle(stickyDiv).backgroundColor;
          return;
        }
      }
      header.style.backgroundColor = "#ffffff";
    };

    const onScroll = () => {
      setActiveSection(getActiveSection());
      syncHeaderBg();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Set initial active state
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.removeEventListener("refresh", setup);
      if (st) st.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleCheckAvailability = () => {
    const roomsEl = document.getElementById("rooms");
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      // Dispatch event after scroll settles so the rooms section is visible
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-date-picker"));
      }, 500);
    }
  };

  const handleNavClick = (target: string) => {
    if (target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.target}
              className={`${styles.navLink} ${item.target === activeSection ? styles.navLinkActive : ""}`}
              onClick={() => handleNavClick(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className={styles.checkBtn} onClick={handleCheckAvailability}>Check availability</button>
      </div>
    </header>
  );
}
