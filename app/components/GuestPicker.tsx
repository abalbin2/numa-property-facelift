"use client";

import styles from "./GuestPicker.module.css";

interface GuestPickerProps {
  adults: number;
  children: number;
  infants: number;
  onChange: (adults: number, children: number, infants: number) => void;
  onClose: () => void;
  onClear: () => void;
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7H11" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 3V11M3 7H11" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const GUEST_ROWS = [
  { key: "adults" as const, label: "Adults", desc: "Ages 13 or above", min: 1, max: 16 },
  { key: "children" as const, label: "Children", desc: "Ages 2–12", min: 0, max: 6 },
  { key: "infants" as const, label: "Infants", desc: "Under 2", min: 0, max: 5 },
];

export default function GuestPicker({
  adults,
  children,
  infants,
  onChange,
  onClose,
  onClear,
}: GuestPickerProps) {
  const values = { adults, children, infants };

  const handleChange = (key: "adults" | "children" | "infants", delta: number) => {
    const next = { ...values, [key]: values[key] + delta };
    onChange(next.adults, next.children, next.infants);
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      {/* Mobile header — close + title */}
      <div className={styles.mobileHeader}>
        <button
          className={styles.mobileCloseBtn}
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 3L3 11M3 3L11 11" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <span className={styles.mobileTitle}>Guests</span>
      </div>
      {GUEST_ROWS.map((row) => {
        const val = values[row.key];
        const atMin = val <= row.min;
        const atMax = val >= row.max;

        return (
          <div key={row.key} className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>{row.label}</span>
              <span className={styles.rowDesc}>{row.desc}</span>
            </div>
            <div className={styles.controls}>
              <button
                className={`${styles.countBtn} ${atMin ? styles.countBtnDisabled : ""}`}
                onClick={() => handleChange(row.key, -1)}
                disabled={atMin}
                type="button"
                aria-label={`Decrease ${row.label}`}
              >
                <MinusIcon />
              </button>
              <span className={styles.count}>{val}</span>
              <button
                className={`${styles.countBtn} ${atMax ? styles.countBtnDisabled : ""}`}
                onClick={() => handleChange(row.key, 1)}
                disabled={atMax}
                type="button"
                aria-label={`Increase ${row.label}`}
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        );
      })}
      <div className={styles.footer}>
        <button className={styles.footerBtn} onClick={onClear} type="button">
          Clear
        </button>
        <button className={styles.footerBtn} onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
}
