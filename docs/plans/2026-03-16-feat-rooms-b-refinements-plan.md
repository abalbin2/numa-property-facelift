---
title: "feat: Rooms B — Refine Room Cards to Match Updated Figma"
type: feat
date: 2026-03-16
---

# Rooms B — Refine Room Cards to Match Updated Figma

## Overview

Update the existing Rooms Variation B (Room Cards) section to match the updated Figma design at node `5677-6110`. The current implementation is close but needs several refinements: a new search bar/filter header, a restructured card layout with a featured bottom card, updated typography, carousel dots on card images, and a "360 View" button.

**Figma source:** node `5677-6110` (Property Page Facelift)

---

## Current vs Figma — What Changes

| Area | Current | Figma |
|---|---|---|
| **Section title** | "Rooms" (left-aligned) | **"Our Rooms"** (center-aligned) |
| **Header** | Title only | **Title + search bar pill + Filter chip** |
| **Section padding** | `56px 0` | **`80px 0`** |
| **Grid gap** | `48px 30px` | **`40px 32px`** (row/col) |
| **Card image aspect** | 1:1 (square) | **~1:1** (378.67px height, cards are ~380px wide = nearly square) |
| **Card image overlays** | Heart button only (top-right) | **Heart (top-right) + hidden badge (top-left, opacity 0) + carousel dots (bottom-center) + 360 View button (bottom-right)** |
| **Card info typography** | roomName: 18px bold, description as single line | **roomName: 14px light `#000`, details as separate spans with dot separators in gray** |
| **Price display** | `€ 104` (light weight) | **`€69 nightly`** (bold 16px `#191919`) + "Starting member price" badge |
| **Bottom row** | 3rd row of same cards | **1 large featured card spanning full width (image left + info right)** |
| **Room data** | 7 rooms, all same card format | **3 small cards + 1 featured card** |
| **Search bar** | None | **Pill with When/Who columns + search icon button** |
| **Filter chip** | None | **Absolute-positioned "Filter" chip with icon** |

---

## Detailed Figma Spec

### Section Header

**Title row:**
- "Our Rooms" — TWK Lausanne 600, 52px, `line-height: 1.23em`, `letter-spacing: -2.88%`, `color: #000`, **center-aligned**

**Search bar + filter row** — `width: 1200px`, centered, row layout, `gap: 8px`, `align-items: flex-end`

**Search pill** — `width: 598px`, row layout, `gap: 24px`, `padding: 0 20px 0 32px`
- `border: 1px solid #DEDDDB`, `border-radius: 999px`
- `box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1)`
- Two columns inside ("When" / "Who"), each with:
  - Label: TWK Lausanne 600, 16px, `#191919`
  - Placeholder: "Add dates" — TWK Lausanne 300, 16px, `#6D706F`
  - Padding: `16px 8px`
- Vertical divider between columns: `1px solid #DEDDDB`
- Search button (right): 56×56px, `border-radius: 40px`, `background: #212322`, white search icon

**Filter chip** — absolute position at `right: 0` relative to row
- `height: 48px`, `border-radius: 999px`, `border: 2px solid #DEDDDB`
- Padding: `5px 6px`, inner text container: `padding: 0 6px`, `gap: 4px`
- Filter icon (24×24 SVG) + "Filter" text (TWK Lausanne 600, 16px, `#191919`)

---

### Small Room Cards (top row — 3 cards)

**Card wrapper:** column, `gap: 16px`, width: fill (1/3 of container)

**Card image area:** `height: 378.67px`, `border-radius: 16px`, overflow hidden, position relative

**Image overlays (absolute positioned):**
1. **Top bar** — row, `justify-content: space-between`, `padding: 16px`, full width
   - Left: Badge (opacity 0, hidden) — pill, `#F4F4F4` bg, `border-radius: 999px`, 36px height
   - Right: Heart button — 32×32px, `border-radius: 16px`, `background: rgba(255,255,255,0.9)`
2. **360 View button** — bottom-right area (`x: 249, y: 305`), `border-radius: 8px`
   - Background: image with `rgba(0,0,0,0.3)` overlay, `border: 1px solid #fff`
   - Text: "360 View" — TWK Lausanne 600, 16px, `#FFFFFF`
   - Size: `width: 114px`, padding: `8px`
3. **Carousel dots** — bottom-center (`x: 164, y: 354`), row, `gap: 8px`
   - Active dot: `#FFFFFF`, inactive: `rgba(222, 221, 219, 0.5)`

**Card info area:** column, `gap: 4px`

**Title + details block:** column, `gap: 2px`
- Room name: TWK Lausanne **300** (light), **14px**, `line-height: 1.43em`, `letter-spacing: -1.43%`, `color: #000`
- Details row: row, `gap: 4px`, items are individual spans:
  - "Max 2" / "23 m²" / "Queen bed" — TWK Lausanne 300, 14px, `color: #6D706F`
  - Dot separators: "·" — TWK Lausanne 300, 16px, `color: #6D706F`

**Price row:** row, `gap: 8px`
- Price: **"€69 nightly"** — TWK Lausanne **600** (bold), 16px, `color: #191919`
- "Starting member price" badge: TWK Lausanne 600, **12px**, `color: #6D706F`, `background: #F4F4F4`, `border: #DEDDDB`, `border-radius: 999px`, `height: 20px`, `padding: 5px 2px`

---

### Featured Card (bottom row — 1 card)

**Layout:** row, `gap: 32px`, full width, `align-items: center`

**Left: Image** — `width: fill (50%)`, `height: 378.67px`, `border-radius: 16px`, same overlays as small cards

**Right: Info** — column, `gap: 1px`, width: fill (50%)
- Room name: TWK Lausanne 600, **18px**, `line-height: 1.33em`, `letter-spacing: -1.11%`, `color: #000`
- Description: "Sleeps three · 26 sq m · Queen Bed and Single Bed" — TWK Lausanne 300, 16px, `color: #6D706F`
- Price row: "€117" (300, 16px, `#191919`) + "€180" (300, 16px, `#6D706F`, strikethrough) + "for 3 nights" (300, 16px, `#6D706F`)

---

## Room Data Changes

Reduce from 7 rooms to 4 (3 small + 1 featured):

```ts
const ROOMS = [
  {
    id: 0,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/medium-studio-with-kitchenette.avif",
    guests: "Max 2",
    size: "23 m²",
    bed: "Queen bed",
    price: "€69 nightly",
  },
  {
    id: 1,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/medium-room.avif",
    guests: "Max 2",
    size: "27 m²",
    bed: "Queen bed",
    price: "€69 nightly",
  },
  {
    id: 2,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/standard-room-with-balcony.avif",
    guests: "Max 2",
    size: "23 m²",
    bed: "Queen bed",
    price: "€69 nightly",
  },
];

const FEATURED_ROOM = {
  id: 3,
  name: "Large Studio with Kitchenette and Extra Bed",
  photo: "/rooms/large-studio-with-kitchenette-and-extra-bed.avif",
  description: "Sleeps three · 26 sq m · Queen Bed and Single Bed",
  price: "€117",
  originalPrice: "€180",
  duration: "for 3 nights",
};
```

---

## Files

### Modified files
```
app/sections/rooms/VariationB.tsx         — restructure component
app/sections/rooms/VariationB.module.css  — update styles
```

No new files needed.

---

## Implementation Plan

### Step 1 — Update CSS module

Key changes to `VariationB.module.css`:

```
.section        padding: 56px 0 → 80px 0
.heading        text-align: left → center; letter-spacing: -1.5px → -2.88%
.grid           gap: 48px 30px → 40px 32px

NEW: .header       column layout, gap: 16px, center-aligned, padding-bottom: 32px
NEW: .searchRow    row layout, width: 1200px, gap: 8px, align-items: flex-end, position: relative
NEW: .searchPill   width: 598px, border: 1px solid #DEDDDB, border-radius: 999px,
                   box-shadow: 0px 10px 40px rgba(0,0,0,0.1), padding: 0 20px 0 32px,
                   display: flex, align-items: center, gap: 24px
NEW: .searchCol    flex: 1, column, padding: 16px 8px
NEW: .searchLabel  600 16px #191919
NEW: .searchPlaceholder  300 16px #6D706F
NEW: .searchDivider  width: 1px, align-self: stretch, background: #DEDDDB
NEW: .searchBtn    56×56, border-radius: 40px, background: #212322, white search SVG
NEW: .filterChip   height: 48px, border: 2px solid #DEDDDB, border-radius: 999px,
                   row layout, gap: 4px, padding: 5px 12px

.roomName       font-size: 18px → 14px; font-weight: 600 → 300
NEW: .detailsRow   row, gap: 4px, items: 14px 300 #6D706F
NEW: .dot          16px 300 #6D706F (separator)

.priceRow       keep row gap: 8px
.price          font-weight: 300 → 600; include "nightly" in text
NEW: .priceBadge   12px 600 #6D706F, bg: #F4F4F4, border: #DEDDDB, radius: 999px, h: 20px

NEW: .carouselDots   absolute bottom of image, row, gap: 8px, centered
NEW: .dotActive      6×6 circle, #FFFFFF
NEW: .dotInactive    6×6 circle, rgba(222,221,219,0.5)

NEW: .viewBtn      absolute bottom-right of image, 114px wide, border-radius: 8px,
                   bg: rgba(0,0,0,0.3) + image, border: 1px solid #fff,
                   text: 16px 600 #fff

NEW: .featuredRow   row, gap: 32px, align-items: center, full width
NEW: .featuredImage   flex: 1, height: 378.67px, border-radius: 16px, position: relative
NEW: .featuredInfo    flex: 1, column, gap: 1px
NEW: .featuredName    18px 600 #000
NEW: .featuredDesc    16px 300 #6D706F
```

### Step 2 — Update TSX structure

Replace the current flat grid with:
1. **Header block** — "Our Rooms" + search bar + filter chip
2. **Top row** — 3 small room cards (from `ROOMS` array)
3. **Bottom row** — 1 featured card (from `FEATURED_ROOM`)

Each small card gets:
- Image with heart button (keep), carousel dots (new), 360 View button (new)
- Restructured info: name (14px light) + details row (guests · size · bed) + price row (bold price + "Starting member price" badge)

Featured card gets:
- Horizontal layout: image (left) + info (right)
- Info: name (18px bold) + description line + price row with strikethrough

### Step 3 — Verify
- `npm run dev`
- Visit `http://localhost:3000?rooms=b` to isolate
- Confirm: "Our Rooms" centered, search bar + filter chip visible
- Confirm: 3 small cards in top row with updated typography and details
- Confirm: 1 featured card spanning full width at bottom
- Confirm: carousel dots and 360 View button on card images
- `npm run build` passes

---

## Acceptance Criteria

- [ ] Section title: "Our Rooms", centered, 52px, `letter-spacing: -2.88%`
- [ ] Section padding: `80px 0`
- [ ] Search bar pill: 598px wide, `#DEDDDB` border, rounded, shadow, When/Who columns
- [ ] Search button: 56px circle, `#212322` bg, white search icon
- [ ] Filter chip: "Filter" + icon, `#DEDDDB` 2px border, 999px radius
- [ ] Top row: 3 small cards, `gap: 32px`
- [ ] Card images: ~378px height, 16px radius, heart button top-right
- [ ] Carousel dots on each card image (decorative, 3 dots)
- [ ] "360 View" button bottom-right of card images
- [ ] Card name: 14px, weight 300, `#000`
- [ ] Card details: "Max 2 · 23 m² · Queen bed" as separate spans with dot separators, 14px 300 `#6D706F`
- [ ] Card price: "€69 nightly" bold 16px `#191919` + "Starting member price" mini badge
- [ ] Bottom row: featured card — image left (50%) + info right (50%), `gap: 32px`
- [ ] Featured name: 18px 600 `#000`
- [ ] Featured price: strikethrough original + duration
- [ ] `npm run build` passes (no TS errors)

---

## Notes

- The search bar and filter chip are **decorative/static** for the prototype — no actual search functionality needed.
- The "360 View" button is decorative — no 360 viewer to wire up.
- Carousel dots are decorative (3 dots, first active) — no image carousel interaction.
- The badge on top-left of cards has `opacity: 0` in Figma — include it in DOM but keep hidden (CSS `opacity: 0`) for future use.
- The card image height of `378.67px` on ~380px wide cards keeps the near-square aspect ratio. We can keep `aspect-ratio: 1/1` from the current code.
