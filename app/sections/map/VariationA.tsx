"use client";

import { useState, useRef, useCallback } from "react";
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
  const [selectedId, setSelectedId] = useState<string | null>(POIS[0]?.id ?? null);
  const selected = POIS.find((p) => p.id === selectedId) ?? null;

  // Click-and-drag scrolling for swim lane
  const swimLaneRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false, isMouse: false });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return; // let touch scroll natively
    const el = swimLaneRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.clientX, scrollLeft: el.scrollLeft, moved: false, isMouse: true };
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.isDown || !dragState.current.isMouse) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    swimLaneRef.current!.scrollLeft = dragState.current.scrollLeft - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragState.current.isMouse) return;
    dragState.current.isDown = false;
    dragState.current.isMouse = false;
    const el = swimLaneRef.current;
    if (el) {
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
    }
  }, []);

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

          {/* Mobile swim lane — horizontally scrollable POI cards */}
          <div
            className={styles.swimLane}
            ref={swimLaneRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {POIS.map((poi) => (
              <button
                key={poi.id}
                className={`${styles.swimCard} ${poi.id === selectedId ? styles.swimCardSelected : ""}`}
                onClick={() => {
                  if (dragState.current.moved) return;
                  setSelectedId(poi.id === selectedId ? null : poi.id);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poi.image}
                  alt={poi.name}
                  className={styles.swimCardImage}
                />
                <div className={styles.swimCardBody}>
                  <span className={styles.swimCardName}>{poi.name}</span>
                  <span className={styles.swimCardWalk}>{poi.walkTime}</span>
                  <span className={styles.swimCardRating}>
                    <StarIcon />
                    {poi.rating}
                  </span>
                </div>
              </button>
            ))}
          </div>
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
