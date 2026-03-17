"use client";

import { useState } from "react";
import styles from "./VariationA.module.css";

const FEATURES = [
  {
    name: "Free Gym",
    image: "/spotlight/gym.jpg",
    title: "Free Holmes Place Gym",
    description:
      "Award-winning spaces and regenerative amenities designed to drive your performance forward.",
  },
  {
    name: "Co-working space",
    image: "/spotlight/coworking.jpg",
    title: "Co-working Space",
    description:
      "A dedicated workspace designed for productivity, complete with high-speed Wi-Fi and comfortable seating.",
  },
];

export default function SpotlightVariationA() {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
      <div className={styles.left}>
        <h2 className={styles.headline}>Spotlight</h2>
        <ul className={styles.list}>
          {FEATURES.map((f, i) => (
            <li
              key={f.name}
              className={`${styles.listItem} ${i === active ? styles.listItemActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.listItemTitle}>{f.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.right}>
        <div
          className={styles.rightBg}
          style={{ backgroundImage: `url(${feature.image})` }}
        >
          <div className={styles.overlay} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
          <button className={styles.learnMore}>Learn more</button>
        </div>
      </div>
      </div>
    </section>
  );
}
