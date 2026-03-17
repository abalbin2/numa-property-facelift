"use client";

import { useRef, useState } from "react";
import styles from "./VariationA.module.css";

const REVIEWS = [
  {
    name: "Natalie",
    source: "From Airbnb",
    date: "Mar 05, 2026",
    text: "Great stay overall. The apartment was spotless, the bed was very comfortable, and the digital check-in was super easy. Location was perfect for exploring the city.",
  },
  {
    name: "Laura",
    source: "From Google Review",
    date: "Feb 02, 2026",
    text: "Really impressed with how smooth everything was. Clear instructions before arrival, fast support when we had a question, and the room had everything we needed for a few nights.",
  },
  {
    name: "Marcus",
    source: "From Booking.com",
    date: "Jan 11, 2026",
    text: "Stylish, modern place and very quiet at night. The self check-in worked flawlessly and the Wi-Fi was fast enough for remote work. Would definitely stay again.",
  },
  {
    name: "Elena",
    source: "From Airbnb",
    date: "Jan 02, 2026",
    text: "Perfect for a short city trip. Clean, well designed and very comfortable. We especially liked the kitchen setup and how close it was to public transport.",
  },
  {
    name: "Thomas",
    source: "From Booking.com",
    date: "Dec 18, 2025",
    text: "Everything was exactly as described. The apartment felt brand new, towels and linens were fresh, and the neighborhood had great restaurants within walking distance.",
  },
  {
    name: "Sofia",
    source: "From Google Review",
    date: "Nov 29, 2025",
    text: "Loved the minimalist design and how well-equipped the kitchen was. Check-out was just as easy as check-in. Already recommending this place to friends visiting Rotterdam.",
  },
];

const CARD_WIDTH = 315;
const GAP = 56;
const STEP = CARD_WIDTH + GAP;

function StarIcon() {
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
      <path
        d="M3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
        fill="#191919"
      />
    </svg>
  );
}

function StarsRow() {
  return (
    <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
      {[0, 24, 48, 72, 96].map((x) => (
        <path
          key={x}
          d={`M${x + 5.825} 21L${x + 7.45} 13.975L${x + 2} 9.25L${x + 9.2} 8.625L${x + 12} 2L${x + 14.8} 8.625L${x + 22} 9.25L${x + 16.55} 13.975L${x + 18.175} 21L${x + 12} 17.275L${x + 5.825} 21Z`}
          fill="#191919"
        />
      ))}
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.705 7.41L14.295 6L8.295 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z"
        fill="#191919"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.705 6L8.295 7.41L12.875 12L8.295 16.59L9.705 18L15.705 12L9.705 6Z"
        fill="#191919"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const maxOffset = (REVIEWS.length - 1) * STEP;

  const scrollLeft = () => setOffset((prev) => Math.max(0, prev - STEP));
  const scrollRight = () => setOffset((prev) => Math.min(maxOffset, prev + STEP));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.divider} />

        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h2 className={styles.title}>Reviews</h2>
              <div className={styles.ratingRow}>
                <div className={styles.ratingScore}>
                  <StarIcon />
                  <span className={styles.ratingNumber}>4.63</span>
                </div>
                <span className={styles.reviewCount}>1033 reviews</span>
              </div>
            </div>

            <div className={styles.navArrows}>
              <button
                className={styles.navArrow}
                aria-label="Previous reviews"
                onClick={scrollLeft}
              >
                <ChevronLeft />
              </button>
              <button
                className={styles.navArrow}
                aria-label="Next reviews"
                onClick={scrollRight}
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Review cards — bleeds right, scrolls via transform */}
          <div className={styles.cardsViewport}>
            <div
              ref={trackRef}
              className={styles.cardsTrack}
              style={{ transform: `translateX(-${offset}px)` }}
            >
              {REVIEWS.map((review) => (
                <div key={review.name} className={styles.card}>
                  <StarsRow />
                  <p className={styles.cardText}>{review.text}</p>
                  <div className={styles.cardAuthor}>
                    <span className={styles.authorName}>{review.name}</span>
                    <span className={styles.authorSource}>
                      {review.source} &bull; {review.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className={styles.cta}>Show all reviews</button>
        </div>
      </div>
    </section>
  );
}
