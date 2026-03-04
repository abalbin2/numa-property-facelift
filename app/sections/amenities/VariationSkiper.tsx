"use client";

import { useState } from "react";
import styles from "./VariationSkiper.module.css";

const AMENITIES = [
  { id: 0, name: "Free Gym",           image: "/amenities/gym.jpg" },
  { id: 1, name: "Free sleep app",     image: "/amenities/free-sleep-app.png" },
  { id: 2, name: "Pets allowed",       image: "/amenities/pets-allowed.jpg" },
  { id: 3, name: "Luggage storage",    image: "/amenities/luggage-storage.jpg" },
  { id: 4, name: "Weekly cleaning",    image: "/amenities/weekly-cleaning.jpg" },
  { id: 5, name: "Essentials closet",  image: "/amenities/essentials-closet.jpg" },
  { id: 6, name: "Breakfast box",      image: "/amenities/breakfast-box.jpg" },
];

export default function AmenitiesSkiper() {
  const [active, setActive] = useState(0);

  return (
    <section className={styles.section}>
      {AMENITIES.map((amenity) => {
        const isActive = active === amenity.id;
        return (
          <div
            key={amenity.id}
            className={`${styles.strip} ${isActive ? styles.active : ""}`}
            onMouseEnter={() => setActive(amenity.id)}
          >
            {/* Label column — always present, always vertical, always bottom-aligned */}
            <div className={styles.labelCol}>
              <span className={`${styles.label} ${isActive ? styles.labelActive : ""}`}>
                {amenity.name}
              </span>
            </div>

            {/* Image — only shown for active strip */}
            <div className={styles.imageCol}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${amenity.image})` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
