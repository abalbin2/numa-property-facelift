"use client";

import { useState } from "react";
import styles from "./VariationA.module.css";

const ROOMS = [
  {
    id: 0,
    name: "Standard Room with Balcony",
    photo: "/rooms/standard-room-with-balcony.avif",
    sleeps: "Sleeps two",
    size: "16 sq m",
    bed: "Queen",
    price: "€ 104 night",
    originalPrice: "€ 160",
    guests: "1 guest, 3 nights",
  },
  {
    id: 1,
    name: "Medium Room",
    photo: "/rooms/medium-room.avif",
    sleeps: "Sleeps two",
    size: "22 sq m",
    bed: "King",
    price: "€ 129 night",
    originalPrice: "€ 185",
    guests: "1 guest, 3 nights",
  },
  {
    id: 2,
    name: "Large Room with Balcony — Accessible",
    photo: "/rooms/large-room-with-balcony-accessible.avif",
    sleeps: "Sleeps three",
    size: "34 sq m",
    bed: "King",
    price: "€ 179 night",
    originalPrice: "€ 240",
    guests: "1 guest, 3 nights",
  },
  {
    id: 3,
    name: "Large Room with Extra Bed",
    photo: "/rooms/large-room-with-extra-bed.avif",
    sleeps: "Sleeps three",
    size: "34 sq m",
    bed: "King",
    price: "€ 199 night",
    originalPrice: "€ 260",
    guests: "1 guest, 3 nights",
  },
  {
    id: 4,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/medium-studio-with-kitchenette.avif",
    sleeps: "Sleeps two",
    size: "28 sq m",
    bed: "Queen",
    price: "€ 149 night",
    originalPrice: "€ 210",
    guests: "1 guest, 3 nights",
  },
  {
    id: 5,
    name: "Large Studio with Kitchenette and Extra Bed",
    photo: "/rooms/large-studio-with-kitchenette-and-extra-bed.avif",
    sleeps: "Sleeps three",
    size: "40 sq m",
    bed: "King",
    price: "€ 219 night",
    originalPrice: "€ 285",
    guests: "1 guest, 3 nights",
  },
  {
    id: 6,
    name: "1 Bedroom Apartment with Balcony and Sofa Bed",
    photo: "/rooms/1-bedroom-apartment-with-balcony-and-sofa-bed.avif",
    sleeps: "Sleeps four",
    size: "52 sq m",
    bed: "King",
    price: "€ 279 night",
    originalPrice: "€ 350",
    guests: "1 guest, 3 nights",
  },
];

export default function RoomsVariationA() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Hover takes priority; on mouse-leave, fall back to selected
  const displayed = hovered ?? selected;
  const room = ROOMS[displayed];

  return (
    <section className={styles.section}>

      {/* ── Left: rooms list ── */}
      <div className={styles.left}>
        <p className={styles.heading}>Rooms</p>

        <ul className={styles.list}>
          {ROOMS.map((r) => (
            <li
              key={r.id}
              className={`${styles.item} ${selected === r.id ? styles.itemSelected : ""}`}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(r.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(r.id)}
              aria-pressed={selected === r.id}
            >
              {r.name}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Right: room detail ── */}
      <div className={styles.right}>
        {/* Crossfade background images */}
        {ROOMS.map((r) => (
          <div
            key={r.id}
            className={`${styles.bg} ${displayed === r.id ? styles.bgActive : ""}`}
            style={{ backgroundImage: `url(${r.photo})` }}
          />
        ))}

        {/* Gradient overlay */}
        <div className={styles.overlay} />

        {/* Detail content — pinned to bottom */}
        <div className={styles.detail}>
          {/* Top block: name + amenities */}
          <div className={styles.infoBlock}>
            <h2 className={styles.roomName}>{room.name}</h2>
            <div className={styles.amenities}>
              <span>{room.sleeps}</span>
              <span className={styles.pipe}>|</span>
              <span>{room.size}</span>
              <span className={styles.pipe}>|</span>
              <span>{room.bed}</span>
            </div>
          </div>

          {/* Bottom block: price + button */}
          <div className={styles.priceBlock}>
            <div className={styles.priceRow}>
              <span className={styles.priceMain}>{room.price}</span>
              <span className={styles.priceOrig}>{room.originalPrice}</span>
              <span className={styles.pipe}>|</span>
              <span className={styles.guests}>{room.guests}</span>
            </div>
            <button className={styles.bookBtn} type="button">
              Book now
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
