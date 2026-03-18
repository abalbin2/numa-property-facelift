"use client";

import styles from "./PriceBreakdown.module.css";

interface PriceBreakdownProps {
  nightlyPrice: number;
  nights: number;
  onClose: () => void;
}

export default function PriceBreakdown({
  nightlyPrice,
  nights,
  onClose,
}: PriceBreakdownProps) {
  const subtotal = nightlyPrice * nights;
  const discount = Math.round(subtotal * 0.15);
  const total = subtotal - discount;

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <span className={styles.title}>Price details</span>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Close price details"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className={styles.lines}>
        <div className={styles.line}>
          <span className={styles.lineLabel}>
            {nights} night{nights !== 1 ? "s" : ""} × €{nightlyPrice}
          </span>
          <span className={styles.lineValue}>€{subtotal}</span>
        </div>
        <div className={styles.line}>
          <span className={`${styles.lineLabel} ${styles.lineDiscount}`}>
            Member discount (15%)
          </span>
          <span className={`${styles.lineValue} ${styles.lineDiscount}`}>
            -€{discount}
          </span>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.line}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalValue}>€{total}</span>
      </div>
    </div>
  );
}
