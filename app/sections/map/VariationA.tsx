"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { POIS } from "./data";
import styles from "./VariationA.module.css";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

function StarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.06 15.2L4.36 9.58L0 5.8L5.76 5.3L8 0L10.24 5.3L16 5.8L11.64 9.58L12.94 15.2L8 12.22L3.06 15.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function MapSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = POIS.find((p) => p.id === selectedId) ?? null;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>What&apos;s around town</h2>

      <div className={styles.columns}>
        {/* Map */}
        <div className={styles.mapWrapper}>
          <MapView selectedId={selectedId} onSelect={setSelectedId} />

          {/* Detail popup card */}
          {selected && (
            <div className={styles.detailCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt={selected.name}
                className={styles.detailImage}
              />
              <div className={styles.detailBody}>
                <div className={styles.detailInfo}>
                  <span className={styles.detailName}>{selected.name}</span>
                  <span className={styles.detailWalk}>{selected.walkTime}</span>
                  <span className={styles.detailRating}>
                    <StarIcon />
                    {selected.rating}
                  </span>
                </div>
                <p className={styles.detailDescription}>
                  {selected.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hot spots panel */}
        <div className={styles.panel}>
          <span className={styles.panelTitle}>Hot spots</span>
          <div className={styles.panelDivider} />
          <div className={styles.poiList}>
            {POIS.map((poi) => (
              <button
                key={poi.id}
                className={`${styles.poiItem} ${poi.id === selectedId ? styles.poiItemSelected : ""}`}
                onClick={() =>
                  setSelectedId(poi.id === selectedId ? null : poi.id)
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poi.image}
                  alt={poi.name}
                  className={styles.poiThumb}
                />
                <div className={styles.poiInfo}>
                  <span className={styles.poiName}>{poi.name}</span>
                  <span className={styles.poiWalk}>{poi.walkTime}</span>
                  <span className={styles.poiRating}>
                    <StarIcon />
                    {poi.rating}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
