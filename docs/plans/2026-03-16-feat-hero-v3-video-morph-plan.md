---
title: "feat: Hero V3 — Video Background + Custom Morph End State"
type: feat
date: 2026-03-16
---

# Hero V3 — Video Background + Custom Morph End State

## Overview

A new hero variant (`hero-c`) that:
1. **Starts** as a full-bleed video background with property info bottom-left (Figma `5875-9532`)
2. **Morphs on scroll** into a specific content+photo collage layout (Figma `5707-128597`)
3. **Stops the video** looping once the scroll animation reaches its end state

This is a fully custom scroll morph — the end state layout is entirely different from V2's gallery.

**Figma sources:**
- Hero state: node `5875-9532`
- End state: node `5707-128597`
- Video: `/Users/tonybalbin/Downloads/Video Generation with Warm Light.mp4` → `public/hero-v3-bg.mp4`

---

## What's New vs V1 and V2

| | Hero V1 (A) | Hero V2 (B) | Hero V3 (C) |
|---|---|---|---|
| Background | Static image, split panel | Static image, full-bleed | **Video, full-bleed** |
| Nav style | Dark navy, white text | Dark transparent, white text | **Frosted white `rgba(255,255,255,0.7)`, dark `#191919` text** |
| Content position | Bottom split | Bottom-center title + section nav | **Bottom-left: badge + name + rating/address + CTAs** |
| Gradient direction | None | Top-dark fade | **Bottom-dark fade** (`transparent 53% → #333 64%`) |
| End state | None | Photo gallery (photos + desc text) | **Content + photo collage (Figma 5707-128597)** |
| Video behavior | — | — | **Loops until scroll animation completes, then stops** |

---

## Design Spec — Hero State (Figma `5875-9532`)

### Frame
- **Dimensions:** 1512 × 982px
- **Background layers:** full-bleed video + `linear-gradient(180deg, rgba(0,0,0,0) 53%, rgba(51,51,51,1) 64%)`

### Nav (absolute overlay, top of frame)
- Full width, `padding: 16px 24px`
- **Background:** `rgba(255, 255, 255, 0.70)` — frosted white
- **Link color:** `#191919` — dark (contrast with V1/V2 white links)
- Links: TWK Lausanne 600, 18px, `letter-spacing: +3%`
- Links: Locations, Offers & Benefits, Business Travel, My Trips, Globe icon, Sign up
- Globe SVG fill: `#191919` (not white)

### Left content column — `position: absolute; bottom: 64px; left: 156px; width: 738px`
Stacked column with `gap: 32px`:

**1. Badge**
- `border-radius: 999px; background: #FFF0E9; padding: 5px 8px; height: 36px; width: fit-content`
- Text: "New property" — TWK Lausanne 600, 16px, `color: #B24612`

**2. Property name `<h1>`**
- "Numa Berlin Torstraße"
- TWK Lausanne 600, **96px**, `line-height: 1em`, `letter-spacing: -0.03125em`
- `color: var(--pink)` (`#FFC9D2`)

**3. Rating + Address row** — `display: flex; align-items: center; gap: 48px`
- Rating group: star SVG (24×24) + "4.63" (600, 20px, Numa Pink) + "1033 reviews" (300, 20px, Numa Pink), `gap: 12px`
- Address group: location pin SVG (24×24, Numa Pink fill) + "Alte Schönhauser Str. 2" (600, 20px, Numa Pink), `gap: 8px`

**4. CTA buttons row** — `display: flex; gap: 32px`
- **Primary:** `background: #fff; color: #191919; border-radius: 8px; height: 56px; padding: 16px 24px; font: 600 18px TWK Lausanne`
- **Secondary:** `border: 2px solid #fff; background: transparent; color: #fff`, same size

---

## Design Spec — End State (Figma `5707-128597`)

### Frame
- **Dimensions:** 1512 × 897px (the scroll-pinned section height)
- **Background:** `#FFFFFF`

### Absolute element positions (all px, origin top-left of frame):

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| **Main video card** (Rect 21972) | 666 | 157 | 340 | 295 | Hero video shrinks to this — same imageRef as hero bg |
| **Photo B** (Rect 21973) | 744 | 481 | 311 | 315 | New photo, slides up |
| **Photo C** (Rect 21974) | 1034 | 238 | 312 | 214 | New photo, slides in from right |
| **Photo D** (Rect 21975) | 1083 | 481 | 208 | 174 | New photo, slides in from right staggered |
| **Headline text** | 164 | 157 | 381 | 306 | Fades in from below |
| **Quick Info panel** | 163 | 481 | 382 | hug | Fades in from below |

### Headline text
- "Where the skyline meets the city's creative streak, Numa Rotterdam Coolsingel gives you front-row access to its iconic boulevard."
- TWK Lausanne 600, 36px, `line-height: 1.222em`, `letter-spacing: -1.111%`, `color: #191919`
- Dimensions: 381×306px

### Quick Info panel — column, `gap: 20px`, `padding-top: 57px`
- **Label:** "Quick info" — TWK Lausanne 600, 18px, `line-height: 1.333em`, `letter-spacing: -1.111%`, `color: #191919`
- **Info list** — column, `gap: 20px`, `padding-top: 5px`
  - Row 1: transit icon + "4 min walk from Römergasse bus stop"
  - Divider: `#DEDDDB` 1px horizontal line
  - Row 2: landmark icon + "23 min walk from Mozart's Birthplace"
  - Divider
  - Row 3: museum icon + "23 min walk from Luxe Museum"
  - Row typography: TWK Lausanne 300, 16px, `line-height: 1.5em`, `letter-spacing: -1.25%`, `color: #191919`
  - Icon + text rows: `display: flex; align-items: center; gap: 10px`

---

## GSAP Scroll Animation

### Strategy
Single GSAP timeline pinned with ScrollTrigger. The component holds the entire end state within the same `<section>` — gallery elements start hidden and animate to their final absolute positions. The hero overlay fades out. The video card shrinks to its final size/position.

### Refs needed
```
sectionRef      → <section> (pin target)
mainVideoRef    → <div> wrapping <video> (GSAP animates: top, left, width, height)
heroOverlayRef  → hero content overlay (fades out)
sectionBgRef    → white bg div (fades in)
headlineRef     → headline text block (fades in from below)
quickInfoRef    → Quick Info panel (fades in from below)
photoBRef       → Rect 21973 (slides up from below)
photoCRef       → Rect 21974 (slides in from right)
photoDRef       → Rect 21975 (slides in from right, staggered)
videoElRef      → <video> element directly (to call .pause() and disable loop)
```

### Initial states (gsap.set)
```
mainVideoRef  → top:0, left:0, width:vw, height:vh
sectionBgRef  → opacity:0
heroOverlayRef → opacity:1 (already visible)
headlineRef   → y:60, opacity:0
quickInfoRef  → y:60, opacity:0
photoBRef     → y:120, opacity:0
photoCRef     → x:200, opacity:0
photoDRef     → x:200, opacity:0
```

### Timeline (scrub: 1.2, end: "+=170%")
```
0.00  heroOverlay fades out (duration 0.35)
0.05  sectionBg fades in    (duration 0.35)
0.00  mainVideo shrinks to final card:
        top:157, left:666, width:340, height:295
        (duration 0.72, ease: power2.inOut)
0.22  photoB slides up: y→0, opacity→1 (duration 0.55, ease: power2.out)
0.20  photoC slides right: x→0, opacity→1 (duration 0.55, ease: power2.out)
0.27  photoD slides right: x→0, opacity→1 (duration 0.55, ease: power2.out)
0.28  headline fades up: y→0, opacity→1 (duration 0.5, ease: power2.out)
0.32  quickInfo fades up: y→0, opacity→1 (duration 0.5, ease: power2.out)
```

### Video stop on completion
Use ScrollTrigger's `onLeave` callback — fires once when scroll passes the end of the pinned trigger zone:
```ts
scrollTrigger: {
  ...
  onLeave: () => {
    const video = videoElRef.current;
    if (video) {
      video.loop = false;
      video.pause();
    }
  },
  onEnterBack: () => {
    const video = videoElRef.current;
    if (video) {
      video.loop = true;
      video.play();
    }
  },
}
```
This stops the video when the animation fully completes. `onEnterBack` restores it if the user scrolls back up into the hero.

---

## Photo Assets

The Figma end state uses 4 imageRefs. Three are new (`Rect 21973/21974/21975`) — we don't have those source files. Use existing project photos as placeholders:

| Slot | Figma imageRef | Placeholder |
|---|---|---|
| Main video card (Rect 21972) | `2dc214...` (same as hero bg) | → the `<video>` element itself |
| Photo B (Rect 21973) | `2d5177...` | `/social/collage-1.jpg` |
| Photo C (Rect 21974) | `166145...` | `/hero-v2-photo-1.png` |
| Photo D (Rect 21975) | `b6f0df...` | `/social/collage-3.jpg` |

---

## Files

### New files
```
app/sections/hero/HeroV3.tsx
app/sections/hero/hero-v3.module.css
public/hero-v3-bg.mp4
```

### Modified files
```
app/sections/config.ts   → add { id: "c", label: "C — Video Morph" }
app/page.tsx             → import HeroV3, add "hero-c": HeroV3
```

---

## Implementation Plan

### Step 1 — Copy video
```bash
cp "/Users/tonybalbin/Downloads/Video Generation with Warm Light.mp4" \
   public/hero-v3-bg.mp4
```

### Step 2 — `hero-v3.module.css`

Start from scratch (not a copy of V2 — the class names and layout are different enough).

Key classes:
```css
.hero              position:relative; width:100%; height:100vh; overflow:hidden; min-height:700px
.sectionBg         position:absolute; inset:0; background:#fff; z-index:1
.mainVideo         position:absolute; overflow:hidden; z-index:5  /* GSAP owns top/left/w/h */
.videoGradient     position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0) 53%, rgba(51,51,51,1) 64%)
.endPhoto          position:absolute; overflow:hidden; z-index:4  /* all 3 static end-state photos */
.photoB            left:744px; top:481px; width:311px; height:315px
.photoC            left:1034px; top:238px; width:312px; height:214px
.photoD            left:1083px; top:481px; width:208px; height:174px
.endContent        position:absolute; z-index:6
.headline          left:164px; top:157px; width:381px
.headlineText      font:600 36px TWK Lausanne; line-height:1.222em; letter-spacing:-1.111%; color:#191919
.quickInfo         left:163px; top:481px; width:382px; display:flex; flex-direction:column; gap:20px; padding-top:57px
.quickInfoLabel    font:600 18px TWK Lausanne; line-height:1.333em; letter-spacing:-1.111%; color:#191919
.infoList          display:flex; flex-direction:column; gap:20px; padding-top:5px
.infoRow           display:flex; align-items:center; gap:10px
.infoText          font:300 16px TWK Lausanne; line-height:1.5em; letter-spacing:-1.25%; color:#191919
.infoDivider       width:100%; height:1px; background:#DEDDDB; border:none
.heroOverlay       position:absolute; inset:0; z-index:10; pointer-events:none
.heroGradient      position:absolute; inset:0  /* no, this is inside mainVideo — see videoGradient */
.nav               position:absolute; top:0; left:0; width:100%; display:flex; justify-content:space-between;
                   align-items:center; padding:16px 24px; background:rgba(255,255,255,0.70); pointer-events:auto
.navLink           font:600 18px TWK Lausanne; letter-spacing:0.03em; color:#191919; text-decoration:none
.navIconBtn        same as V2 but SVG fill #191919
.heroContent       position:absolute; bottom:64px; left:156px; width:738px;
                   display:flex; flex-direction:column; gap:32px; pointer-events:auto
.badge             border-radius:999px; background:#FFF0E9; color:#B24612; padding:5px 8px;
                   height:36px; font:600 16px TWK Lausanne; width:fit-content; display:flex; align-items:center
.heroName          font:600 96px TWK Lausanne; line-height:1em; letter-spacing:-0.03125em; color:var(--pink)
.metaRow           display:flex; align-items:center; gap:48px
.ratingGroup       display:flex; align-items:center; gap:12px
.addressGroup      display:flex; align-items:center; gap:8px
.metaText          font-size:20px; color:var(--pink); font-family:var(--font)
.metaTextLight     font-weight:300
.metaTextBold      font-weight:600
.ctaRow            display:flex; gap:32px
.btnPrimary        background:#fff; color:#191919; border:none; border-radius:8px; height:56px;
                   padding:16px 24px; font:600 18px TWK Lausanne; cursor:pointer
.btnSecondary      background:transparent; color:#fff; border:2px solid #fff; border-radius:8px;
                   height:56px; padding:16px 24px; font:600 18px TWK Lausanne; cursor:pointer
```

### Step 3 — `HeroV3.tsx` skeleton

```tsx
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./hero-v3.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroV3() {
  const sectionRef    = useRef<HTMLElement>(null);
  const mainVideoRef  = useRef<HTMLDivElement>(null);
  const videoElRef    = useRef<HTMLVideoElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const sectionBgRef  = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLDivElement>(null);
  const quickInfoRef  = useRef<HTMLDivElement>(null);
  const photoBRef     = useRef<HTMLDivElement>(null);
  const photoCRef     = useRef<HTMLDivElement>(null);
  const photoDRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* refs guard */
    const section    = sectionRef.current;
    const mainVideo  = mainVideoRef.current;
    const heroOverlay = heroOverlayRef.current;
    const sectionBg  = sectionBgRef.current;
    if (!section || !mainVideo || !heroOverlay || !sectionBg) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    /* initial states */
    gsap.set(mainVideo,   { top: 0, left: 0, width: vw, height: vh });
    gsap.set(sectionBg,   { opacity: 0 });
    gsap.set(headlineRef.current,  { y: 60, opacity: 0 });
    gsap.set(quickInfoRef.current, { y: 60, opacity: 0 });
    gsap.set(photoBRef.current,    { y: 120, opacity: 0 });
    gsap.set(photoCRef.current,    { x: 200, opacity: 0 });
    gsap.set(photoDRef.current,    { x: 200, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=170%",
        pin: true,
        scrub: 1.2,
        onLeave: () => {
          const v = videoElRef.current;
          if (v) { v.loop = false; v.pause(); }
        },
        onEnterBack: () => {
          const v = videoElRef.current;
          if (v) { v.loop = true; v.play(); }
        },
      },
    });

    /* hero overlay fades out */
    tl.to(heroOverlay, { opacity: 0, duration: 0.35 }, 0);
    /* white bg fades in */
    tl.to(sectionBg,   { opacity: 1, duration: 0.35 }, 0.05);
    /* video shrinks to Rect 21972 final position */
    tl.to(mainVideo,   { top: 157, left: 666, width: 340, height: 295,
                         duration: 0.72, ease: "power2.inOut" }, 0);
    /* photos slide in */
    tl.to(photoBRef.current, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.22);
    tl.to(photoCRef.current, { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.20);
    tl.to(photoDRef.current, { x: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 0.27);
    /* text fades up */
    tl.to(headlineRef.current,  { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.28);
    tl.to(quickInfoRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 0.32);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* White section background */}
      <div ref={sectionBgRef} className={styles.sectionBg} />

      {/* End state: static photos */}
      <div ref={photoBRef} className={`${styles.endPhoto} ${styles.photoB}`}>
        <Image src="/social/collage-1.jpg" alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div ref={photoCRef} className={`${styles.endPhoto} ${styles.photoC}`}>
        <Image src="/hero-v2-photo-1.png" alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div ref={photoDRef} className={`${styles.endPhoto} ${styles.photoD}`}>
        <Image src="/social/collage-3.jpg" alt="" fill style={{ objectFit: "cover" }} />
      </div>

      {/* End state: headline */}
      <div ref={headlineRef} className={`${styles.endContent} ${styles.headline}`}>
        <p className={styles.headlineText}>
          Where the skyline meets the city&apos;s creative streak, Numa Berlin Torstraße
          gives you front-row access to its iconic boulevard.
        </p>
      </div>

      {/* End state: Quick Info */}
      <div ref={quickInfoRef} className={`${styles.endContent} ${styles.quickInfo}`}>
        <span className={styles.quickInfoLabel}>Quick info</span>
        <div className={styles.infoList}>
          <div className={styles.infoRow}>
            {/* transit icon SVG */}
            <span className={styles.infoText}>4 min walk from Römergasse bus stop</span>
          </div>
          <hr className={styles.infoDivider} />
          <div className={styles.infoRow}>
            {/* landmark icon SVG */}
            <span className={styles.infoText}>23 min walk from Mozart&apos;s Birthplace</span>
          </div>
          <hr className={styles.infoDivider} />
          <div className={styles.infoRow}>
            {/* museum icon SVG */}
            <span className={styles.infoText}>23 min walk from Luxe Museum</span>
          </div>
        </div>
      </div>

      {/* Main video — GSAP shrinks this to Rect 21972 position */}
      <div ref={mainVideoRef} className={styles.mainVideo}>
        <video
          ref={videoElRef}
          src="/hero-v3-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className={styles.videoGradient} />
      </div>

      {/* Hero overlay (fades out on scroll) */}
      <div ref={heroOverlayRef} className={styles.heroOverlay}>
        <nav className={styles.nav}>
          {/* Numa logo SVG — same as V1/V2 */}
          {/* Nav links with color #191919 */}
        </nav>
        <div className={styles.heroContent}>
          <div className={styles.badge}>New property</div>
          <h1 className={styles.heroName}>Numa Berlin Torstraße</h1>
          <div className={styles.metaRow}>
            <div className={styles.ratingGroup}>
              {/* star SVG */}
              <span className={`${styles.metaText} ${styles.metaTextBold}`}>4.63</span>
              <span className={`${styles.metaText} ${styles.metaTextLight}`}>1033 reviews</span>
            </div>
            <div className={styles.addressGroup}>
              {/* location pin SVG — Numa Pink fill */}
              <span className={`${styles.metaText} ${styles.metaTextBold}`}>Alte Schönhauser Str. 2</span>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <button className={styles.btnPrimary}>Check availability</button>
            <button className={styles.btnSecondary}>View images</button>
          </div>
        </div>
      </div>

    </section>
  );
}
```

### Step 4 — Wire up routing

**`app/sections/config.ts`:**
```ts
{ id: "c", label: "C — Video Morph" }   // add to hero.variants
```

**`app/page.tsx`:**
```ts
import HeroV3 from "./sections/hero/HeroV3";
// ...
"hero-c": HeroV3,
```

### Step 5 — Verify
- `npm run dev`
- `http://localhost:3000?hero=c` — isolated V3 preview
- Confirm: video autoplays full-bleed with bottom gradient
- Confirm: frosted white nav with dark text
- Confirm: badge + 96px Numa Pink name + rating/address + CTAs
- Scroll: video shrinks to top-center card (x:666, y:157, 340×295)
- Scroll: photos B/C/D and headline/quickinfo animate in
- Scroll to end: video pauses and stops looping
- Scroll back up: video resumes + loops
- `http://localhost:3000` — all 3 hero variants stacked

---

## Acceptance Criteria

- [ ] Video autoplays full-bleed, muted, looped on load
- [ ] Bottom gradient: `transparent` at 53% → `rgba(51,51,51,1)` at 64%
- [ ] Frosted white nav (`rgba(255,255,255,0.7)`), all text/icons `#191919`
- [ ] "New property" badge: peach bg, burnt orange text, pill shape
- [ ] Property name: 96px, Numa Pink `#FFC9D2`, −3.125% letter-spacing
- [ ] Rating + address row in Numa Pink
- [ ] Two CTA buttons: white-fill primary + white-outline secondary
- [ ] Scroll → video shrinks to x:666, y:157, 340×295
- [ ] White bg fades in; hero overlay fades out
- [ ] Photos B, C, D animate in with staggered timing
- [ ] Headline text + Quick Info panel fade up into position
- [ ] Quick Info shows 3 rows with `#DEDDDB` 1px dividers
- [ ] Video stops looping when scroll animation completes
- [ ] Video resumes when scrolling back into hero
- [ ] `?hero=c` isolates V3; no params shows all 3 stacked with labels
- [ ] `npm run build` passes (no TS errors)

---

## Notes

- The `<video>` gradient sits **inside** `mainVideoRef` so it scales down with the card during the morph — the gradient is always clipped to the video bounds, which is the correct behaviour both in the hero state and as a card.
- The globe icon SVG in the nav needs its `fill` changed from `white`/`var(--white)` to `#191919` to match the frosted nav.
- The section height used for GSAP pin is `100vh` — the end state frame (897px) fits within this. The pin duration `+=170%` gives enough scroll travel for the full morph.
- Icon SVGs for Quick Info rows (transit, landmark, museum) can be simple generic SVGs or reuse the location pin SVG from V1. Exact icons are not specified in the Figma node.
- Video file size: if `hero-v3-bg.mp4` is large, consider running `ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 28 output.mp4` to compress before committing.
