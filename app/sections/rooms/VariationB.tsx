"use client";

import styles from "./VariationB.module.css";

const ROOMS = [
  {
    id: 0,
    name: "Standard Room with Balcony",
    photo: "/rooms/standard-room-with-balcony.avif",
    description: "Sleeps two · 16 sq m · Queen Bed",
    price: "€ 104",
    originalPrice: "€ 160",
    duration: "for 3 nights",
  },
  {
    id: 1,
    name: "Medium Room",
    photo: "/rooms/medium-room.avif",
    description: "Sleeps two · 22 sq m · King Bed",
    price: "€ 103",
    originalPrice: "€ 158",
    duration: "for 3 nights",
  },
  {
    id: 2,
    name: "Large Room with Balcony — Accessible",
    photo: "/rooms/large-room-with-balcony-accessible.avif",
    description: "Sleeps two · 26 sq m · Queen Bed",
    price: "€ 109",
    originalPrice: "€ 168",
    duration: "for 3 nights",
  },
  {
    id: 3,
    name: "Large Room with Extra Bed",
    photo: "/rooms/large-room-with-extra-bed.avif",
    description: "Sleeps three · 26 sq m · Queen Bed and Single Bed",
    price: "€ 114",
    originalPrice: "€ 174",
    duration: "for 3 nights",
  },
  {
    id: 4,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/medium-studio-with-kitchenette.avif",
    description: "Sleeps two · 23 sq m · Queen Bed",
    price: "€ 100",
    originalPrice: "€ 168",
    duration: "for 3 nights",
  },
  {
    id: 5,
    name: "Large Studio with Kitchenette and Extra Bed",
    photo: "/rooms/large-studio-with-kitchenette-and-extra-bed.avif",
    description: "Sleeps three · 26 sq m · Queen Bed and Single Bed",
    price: "€ 117",
    originalPrice: "€ 180",
    duration: "for 3 nights",
  },
  {
    id: 6,
    name: "1 Bedroom Apartment with Balcony and Sofa Bed",
    photo: "/rooms/1-bedroom-apartment-with-balcony-and-sofa-bed.avif",
    description: "Sleeps four · 52 sq m · King Bed",
    price: "€ 279",
    originalPrice: "€ 350",
    duration: "for 3 nights",
  },
];

export default function RoomsVariationB() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Rooms</h2>

        <div className={styles.grid}>
          {ROOMS.map((room) => (
            <div key={room.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${room.photo})` }}
                />
                <div className={styles.imageOverlay}>
                  <button className={styles.heartBtn} type="button" aria-label="Save room">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.125 7.875H2.625V6.125H6.125V2.625H7.875V6.125H11.375V7.875H7.875V11.375H6.125V7.875Z" fill="#1C1B1F"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.info}>
                <p className={styles.roomName}>{room.name}</p>
                <p className={styles.description}>{room.description}</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{room.price}</span>
                  <span className={styles.originalPrice}>{room.originalPrice}</span>
                  <span className={styles.duration}>{room.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
