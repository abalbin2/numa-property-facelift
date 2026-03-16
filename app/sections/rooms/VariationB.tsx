"use client";

import styles from "./VariationB.module.css";

const ROOMS = [
  {
    id: 0,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/room-919.jpg",
    guests: "Max 2",
    size: "23 m²",
    bed: "Queen bed",
    price: "€69 nightly",
  },
  {
    id: 1,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/room-521.jpg",
    guests: "Max 2",
    size: "27 m²",
    bed: "Queen bed",
    price: "€69 nightly",
  },
  {
    id: 2,
    name: "Extra Large Studio with Kitchenette and Sofa Bed",
    photo: "/rooms/room-912.jpg",
    guests: "Max 4",
    size: "32 m²",
    bed: "King bed · Sofa bed",
    price: "€76 nightly",
  },
];

const FEATURED_ROOM = {
  id: 3,
  name: "Extra Large Studio with Kitchenette and Sofa Bed – Accessible",
  photo: "/rooms/room-522.jpg",
  guests: "Max 4",
  size: "37 m²",
  bed: "King bed · Sofa bed",
  price: "€137 nightly",
};

function CardOverlays() {
  return (
    <>
      {/* Top bar: hidden badge (left) + heart button (right) */}
      <div className={styles.cardTopBar}>
        <div className={styles.cardBadge} aria-hidden="true" />
        <button className={styles.heartBtn} type="button" aria-label="Save room">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.125 7.875H2.625V6.125H6.125V2.625H7.875V6.125H11.375V7.875H7.875V11.375H6.125V7.875Z" fill="#1C1B1F"/>
          </svg>
        </button>
      </div>

      {/* 360 View button — bottom-right */}
      <button className={styles.viewBtn} type="button">360 View</button>

      {/* Carousel dots — bottom-center */}
      <div className={styles.carouselDots}>
        <span className={styles.dotActive} />
        <span className={styles.dotInactive} />
        <span className={styles.dotInactive} />
      </div>
    </>
  );
}

export default function RoomsVariationB() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Our Rooms</h2>

          <div className={styles.searchRow}>
            {/* Search pill */}
            <div className={styles.searchPill}>
              <div className={styles.searchCol}>
                <span className={styles.searchLabel}>When</span>
                <span className={styles.searchPlaceholder}>Add dates</span>
              </div>
              <div className={styles.searchDivider} />
              <div className={styles.searchCol}>
                <span className={styles.searchLabel}>Who</span>
                <span className={styles.searchPlaceholder}>Add guests</span>
              </div>
              <button className={styles.searchBtn} type="button" aria-label="Search">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Filter chip */}
            <button className={styles.filterChip} type="button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21M6 12H18M10 18H14" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className={styles.filterLabel}>Filter</span>
            </button>
          </div>
        </div>

        {/* ── Cards area ── */}
        <div className={styles.cardsArea}>
          <div className={styles.grid}>
            {/* Top row — 3 small cards */}
            {ROOMS.map((room) => (
              <div key={room.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${room.photo})` }}
                  />
                  <CardOverlays />
                </div>

                <div className={styles.info}>
                  <div className={styles.cardTitleBlock}>
                    <p className={styles.roomName}>{room.name}</p>
                    <div className={styles.detailsRow}>
                      <span className={styles.detail}>{room.guests}</span>
                      <span className={styles.dot}>·</span>
                      <span className={styles.detail}>{room.size}</span>
                      <span className={styles.dot}>·</span>
                      <span className={styles.detail}>{room.bed}</span>
                    </div>
                  </div>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>{room.price}</span>
                    <span className={styles.priceBadge}>Starting member price</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Second row — 1 featured card, same layout, 2/3 cols empty */}
            <div className={styles.card}>
              <div className={styles.imageWrap}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${FEATURED_ROOM.photo})` }}
                />
                <CardOverlays />
              </div>

              <div className={styles.info}>
                <div className={styles.cardTitleBlock}>
                  <p className={styles.roomName}>{FEATURED_ROOM.name}</p>
                  <div className={styles.detailsRow}>
                    <span className={styles.detail}>{FEATURED_ROOM.guests}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.detail}>{FEATURED_ROOM.size}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.detail}>{FEATURED_ROOM.bed}</span>
                  </div>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{FEATURED_ROOM.price}</span>
                  <span className={styles.priceBadge}>Starting member price</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
