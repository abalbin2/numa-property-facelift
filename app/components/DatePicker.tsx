"use client";

import { useState } from "react";
import styles from "./DatePicker.module.css";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** Monday-based day of week (0=Mon, 6=Sun) */
function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBefore(a: Date, b: Date) {
  return a.getTime() < b.getTime();
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return day.getTime() > start.getTime() && day.getTime() < end.getTime();
}

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (checkIn: Date | null, checkOut: Date | null) => void;
  onClose: () => void;
  onClear: () => void;
}

export default function DatePicker({
  checkIn,
  checkOut,
  onSelect,
  onClose,
  onClear,
}: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [baseMonth, setBaseMonth] = useState(today.getMonth());
  const [baseYear, setBaseYear] = useState(today.getFullYear());

  const handlePrev = () => {
    // Don't go before current month
    if (baseYear === today.getFullYear() && baseMonth === today.getMonth()) return;
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(baseYear - 1);
    } else {
      setBaseMonth(baseMonth - 1);
    }
  };

  const handleNext = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(baseYear + 1);
    } else {
      setBaseMonth(baseMonth + 1);
    }
  };

  const handleDayClick = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      // Start fresh selection
      onSelect(date, null);
    } else {
      // Have check-in, setting check-out
      if (isBefore(date, checkIn)) {
        // Clicked before check-in: reset with this as new check-in
        onSelect(date, null);
      } else if (isSameDay(date, checkIn)) {
        // Same day: ignore
        return;
      } else {
        onSelect(checkIn, date);
      }
    }
  };

  const canGoPrev =
    baseYear > today.getFullYear() ||
    (baseYear === today.getFullYear() && baseMonth > today.getMonth());

  // Render a single month grid
  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const cells: React.ReactNode[] = [];

    // Empty cells for padding
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className={styles.dayEmpty} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      date.setHours(0, 0, 0, 0);
      const isPast = isBefore(date, today);
      const isCheckIn = checkIn ? isSameDay(date, checkIn) : false;
      const isCheckOut = checkOut ? isSameDay(date, checkOut) : false;
      const isSelected = isCheckIn || isCheckOut;
      const inRange = isInRange(date, checkIn, checkOut);

      let cellClass = styles.dayCell;
      if (isCheckIn && checkOut) cellClass += ` ${styles.dayRangeStart}`;
      if (isCheckOut) cellClass += ` ${styles.dayRangeEnd}`;
      if (inRange) cellClass += ` ${styles.dayInRange}`;

      let btnClass = styles.dayBtn;
      if (isPast) btnClass += ` ${styles.dayBtnDisabled}`;
      if (isSelected) btnClass += ` ${styles.dayBtnSelected}`;

      cells.push(
        <div key={d} className={cellClass}>
          <button
            className={btnClass}
            onClick={() => !isPast && handleDayClick(date)}
            disabled={isPast}
            type="button"
          >
            {d}
          </button>
        </div>,
      );
    }

    return (
      <div className={styles.month}>
        <div className={styles.monthHeader}>
          <span className={styles.monthLabel}>
            {MONTH_NAMES[month]} {year}
          </span>
        </div>
        <div className={styles.dayNames}>
          {DAY_NAMES.map((name) => (
            <span key={name} className={styles.dayName}>
              {name}
            </span>
          ))}
        </div>
        <div className={styles.dayGrid}>{cells}</div>
      </div>
    );
  };

  // Second month
  const nextMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const nextYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      {/* Nav arrows — positioned at container level, aligned with month headers */}
      <button
        className={`${styles.navBtn} ${styles.navBtnPrev}`}
        onClick={handlePrev}
        disabled={!canGoPrev}
        type="button"
        aria-label="Previous month"
        style={{ opacity: canGoPrev ? 1 : 0.3 }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className={`${styles.navBtn} ${styles.navBtnNext}`}
        onClick={handleNext}
        type="button"
        aria-label="Next month"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={styles.months}>
        {renderMonth(baseYear, baseMonth)}
        {renderMonth(nextYear, nextMonth)}
      </div>
      <div className={styles.footer}>
        <button className={styles.footerBtn} onClick={onClear} type="button">
          Clear dates
        </button>
        <button className={styles.footerBtn} onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
}
