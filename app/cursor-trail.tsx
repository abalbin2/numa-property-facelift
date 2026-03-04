"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./cursor-trail.module.css";

const IMAGES = [
  "/cursor-trail/01.png",
  "/cursor-trail/02.png",
  "/cursor-trail/03.png",
  "/cursor-trail/04.png",
  "/cursor-trail/05.png",
  "/cursor-trail/06.png",
  "/cursor-trail/07.png",
  "/cursor-trail/08.png",
  "/cursor-trail/09.png",
];

export default function CursorTrailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgsRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const imgs = imgsRef.current;
    if (!section || !imgs.length) return;

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cacheMousePos = { x: 0, y: 0 };
    let imgPosition = 0;
    let zIndexVal = 1;
    const threshold = 80;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const distance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.hypot(x2 - x1, y2 - y1);

    // Coordinates relative to the section
    const onMouseMove = (ev: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mousePos = {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      };
    };
    section.addEventListener("mousemove", onMouseMove);

    const showNextImage = () => {
      const img = imgs[imgPosition];
      gsap.killTweensOf(img);

      gsap.timeline()
        .set(img, {
          opacity: 1,
          scale: 1,
          zIndex: zIndexVal,
          x: cacheMousePos.x - img.offsetWidth / 2,
          y: cacheMousePos.y - img.offsetHeight / 2,
        })
        .to(img, {
          duration: 0.9,
          ease: "expo.out",
          x: mousePos.x - img.offsetWidth / 2,
          y: mousePos.y - img.offsetHeight / 2,
        }, 0)
        .to(img, {
          duration: 1,
          ease: "power1.out",
          opacity: 0,
        }, 0.4)
        .to(img, {
          duration: 1,
          ease: "power4.out",
          scale: 0.2,
        }, 0.4);
    };

    let rafId: number;
    const render = () => {
      const dist = distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
      cacheMousePos.x = lerp(cacheMousePos.x, mousePos.x, 0.1);
      cacheMousePos.y = lerp(cacheMousePos.y, mousePos.y, 0.1);

      if (dist > threshold) {
        showNextImage();
        zIndexVal++;
        imgPosition = imgPosition < imgs.length - 1 ? imgPosition + 1 : 0;
        lastMousePos = { ...mousePos };
      }

      const isIdle = imgs.every(
        (img) => !gsap.isTweening(img) && img.style.opacity === "0"
      );
      if (isIdle && zIndexVal !== 1) zIndexVal = 1;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Trail images — behind the text */}
      {IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(el) => { if (el) imgsRef.current[i] = el; }}
          src={src}
          alt=""
          className={styles.trailImg}
        />
      ))}

      {/* Text — above the images */}
      <p className={styles.text}>
        At Numa Berlin Torstraße, you&apos;re dialed into Mitte&apos;s blend of
        galleries, street eats, and late-night hangouts.
      </p>
    </section>
  );
}
