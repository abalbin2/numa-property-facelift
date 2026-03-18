"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./VariationB.module.css";
import DatePicker from "../../components/DatePicker";
import GuestPicker from "../../components/GuestPicker";
import PriceBreakdown from "../../components/PriceBreakdown";

const ROOMS = [
  {
    id: 0,
    name: "Medium Studio with Kitchenette",
    photo: "/rooms/room-919.jpg",
    guests: "Max 2",
    size: "23 m²",
    bed: "Queen bed",
    nightlyPrice: 69,
  },
  {
    id: 1,
    name: "Medium Studio with Kitchenette - Accessible",
    photo: "/rooms/room-521.jpg",
    guests: "Max 2",
    size: "27 m²",
    bed: "Queen bed",
    nightlyPrice: 69,
  },
  {
    id: 2,
    name: "Extra Large Studio with Kitchenette and Sofa Bed",
    photo: "/rooms/room-912.jpg",
    guests: "Max 4",
    size: "32 m²",
    bed: "King bed · Sofa bed",
    nightlyPrice: 76,
  },
];

const FEATURED_ROOM = {
  id: 3,
  name: "Extra Large Studio with Kitchenette and Sofa Bed – Accessible",
  photo: "/rooms/room-522.jpg",
  guests: "Max 4",
  size: "37 m²",
  bed: "King bed · Sofa bed",
  nightlyPrice: 137,
};

function formatPrice(nightlyPrice: number, searchedNights: number | null) {
  if (searchedNights) {
    const total = Math.round(nightlyPrice * searchedNights * 0.85);
    return `€${total} total`;
  }
  return `€${nightlyPrice} nightly`;
}

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
      <button className={styles.viewBtn} type="button">
        <span>360˚ View</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="white"/>
        </svg>
      </button>

      {/* Carousel dots — bottom-center */}
      <div className={styles.carouselDots}>
        <span className={styles.dotActive} />
        <span className={styles.dotInactive} />
        <span className={styles.dotInactive} />
      </div>
    </>
  );
}

function formatDateRange(checkIn: Date | null, checkOut: Date | null) {
  if (!checkIn) return null;
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (!checkOut) return fmt(checkIn) + " – ...";
  return fmt(checkIn) + " – " + fmt(checkOut);
}

function formatGuests(adults: number, children: number, infants: number) {
  if (adults === 1 && children === 0 && infants === 0) return null;
  const parts: string[] = [];
  if (adults > 0) parts.push(`${adults} adult${adults !== 1 ? "s" : ""}`);
  if (children > 0) parts.push(`${children} child${children !== 1 ? "ren" : ""}`);
  if (infants > 0) parts.push(`${infants} infant${infants !== 1 ? "s" : ""}`);
  return parts.join(", ");
}

export default function RoomsVariationB() {
  const [openPicker, setOpenPicker] = useState<"dates" | "guests" | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [searchedNights, setSearchedNights] = useState<number | null>(null);
  const [breakdownRoom, setBreakdownRoom] = useState<number | null>(null);

  const searchRowRef = useRef<HTMLDivElement>(null);

  // Listen for custom event from sticky header
  useEffect(() => {
    const handler = () => setOpenPicker("dates");
    window.addEventListener("open-date-picker", handler);
    return () => window.removeEventListener("open-date-picker", handler);
  }, []);

  // Click-outside to close pickers
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        openPicker &&
        searchRowRef.current &&
        !searchRowRef.current.contains(e.target as Node)
      ) {
        setOpenPicker(null);
      }
    },
    [openPicker],
  );

  useEffect(() => {
    if (openPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openPicker, handleClickOutside]);

  const dateLabel = formatDateRange(checkIn, checkOut);
  const guestLabel = formatGuests(adults, children, infants);

  return (
    <section className={styles.section}>
      <div className={styles.sectionDivider} aria-hidden="true" />
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Our Rooms</h2>

          <div className={styles.searchRow} ref={searchRowRef}>
            {/* Search pill */}
            <div className={`${styles.searchPill} ${openPicker ? styles.searchPillOpen : ""}`}>
              <button
                className={`${styles.searchCol} ${styles.searchColBtn} ${openPicker === "dates" ? styles.searchColActive : ""}`}
                type="button"
                onClick={() => setOpenPicker(openPicker === "dates" ? null : "dates")}
              >
                <span className={styles.searchLabel}>When</span>
                <span className={dateLabel ? styles.searchValue : styles.searchPlaceholder}>
                  {dateLabel || "Add dates"}
                </span>
              </button>
              <div className={`${styles.searchDivider} ${openPicker ? styles.searchDividerHidden : ""}`} />
              <div
                className={`${styles.searchWhoGroup} ${openPicker === "guests" ? styles.searchWhoGroupActive : ""}`}
                onClick={() => setOpenPicker(openPicker === "guests" ? null : "guests")}
              >
                <div className={`${styles.searchCol} ${styles.searchColBtn}`}>
                  <span className={styles.searchLabel}>Who</span>
                  <span className={guestLabel ? styles.searchValue : styles.searchPlaceholder}>
                    {guestLabel || "Add guests"}
                  </span>
                </div>
                <button
                  className={styles.searchBtn}
                  type="button"
                  aria-label="Search"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (checkIn && checkOut) {
                      const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000);
                      setSearchedNights(nights);
                    }
                    setOpenPicker(null);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Dropdowns */}
            {openPicker === "dates" && (
              <DatePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onSelect={(ci, co) => {
                  setCheckIn(ci);
                  setCheckOut(co);
                }}
                onClose={() => setOpenPicker(null)}
                onClear={() => {
                  setCheckIn(null);
                  setCheckOut(null);
                  setSearchedNights(null);
                }}
              />
            )}
            {openPicker === "guests" && (
              <GuestPicker
                adults={adults}
                children={children}
                infants={infants}
                onChange={(a, c, i) => {
                  setAdults(a);
                  setChildren(c);
                  setInfants(i);
                }}
                onClose={() => setOpenPicker(null)}
                onClear={() => {
                  setAdults(1);
                  setChildren(0);
                  setInfants(0);
                }}
              />
            )}

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
                  <div className={`${styles.priceRow} ${searchedNights ? styles.priceRowRelative : ""}`}>
                    {searchedNights ? (
                      <button
                        className={`${styles.price} ${styles.priceClickable}`}
                        type="button"
                        onClick={() => setBreakdownRoom(breakdownRoom === room.id ? null : room.id)}
                      >
                        {formatPrice(room.nightlyPrice, searchedNights)}
                      </button>
                    ) : (
                      <span className={styles.price}>{formatPrice(room.nightlyPrice, searchedNights)}</span>
                    )}
                    <span className={styles.priceBadge}>Starting member price</span>
                    {breakdownRoom === room.id && searchedNights && (
                      <PriceBreakdown
                        nightlyPrice={room.nightlyPrice}
                        nights={searchedNights}
                        onClose={() => setBreakdownRoom(null)}
                      />
                    )}
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
                <div className={`${styles.priceRow} ${searchedNights ? styles.priceRowRelative : ""}`}>
                  {searchedNights ? (
                    <button
                      className={`${styles.price} ${styles.priceClickable}`}
                      type="button"
                      onClick={() => setBreakdownRoom(breakdownRoom === FEATURED_ROOM.id ? null : FEATURED_ROOM.id)}
                    >
                      {formatPrice(FEATURED_ROOM.nightlyPrice, searchedNights)}
                    </button>
                  ) : (
                    <span className={styles.price}>{formatPrice(FEATURED_ROOM.nightlyPrice, searchedNights)}</span>
                  )}
                  <span className={styles.priceBadge}>Starting member price</span>
                  {breakdownRoom === FEATURED_ROOM.id && searchedNights && (
                    <PriceBreakdown
                      nightlyPrice={FEATURED_ROOM.nightlyPrice}
                      nights={searchedNights}
                      onClose={() => setBreakdownRoom(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sectionDividerBottom} aria-hidden="true" />
    </section>
  );
}
