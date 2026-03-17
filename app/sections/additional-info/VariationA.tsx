"use client";

import { useState } from "react";
import styles from "./VariationA.module.css";

const GROUPS = [
  {
    title: "Good to know",
    items: [
      {
        title: "Contact details",
        body: "Reach us anytime via the Numa app or email hello@numastays.com.",
      },
      {
        title: "Pet policy",
        body: "Small pets are welcome at no extra charge. Please let us know in advance.",
      },
      {
        title: "Smoking policy",
        body: "Smoking is not permitted inside the apartment. Designated areas are available outside.",
      },
      {
        title: "Party policy",
        body: "To respect other guests, parties and loud gatherings are not allowed on the premises.",
      },
    ],
  },
  {
    title: "FAQ",
    items: [
      {
        title: "What benefits do I get when booking as a Numa member?",
        body: "Members enjoy early access to deals, flexible check-in times, and exclusive loyalty discounts.",
      },
      {
        title: "Why do I need to check in before my arrival?",
        body: "Pre-check-in lets us prepare your apartment and send your access code before you arrive.",
      },
      {
        title: "How can I contact the online reception?",
        body: "Use the in-app chat for instant support, available around the clock.",
      },
      {
        title: "What is Numa's cleaning policy?",
        body: "All apartments are professionally cleaned before each stay with hospital-grade products.",
      },
      {
        title: "How does the check-out work?",
        body: "Simply leave the keys inside and close the door. No front desk visit needed.",
      },
      {
        title: "How can I request an early check-in or a late check-out?",
        body: "Contact us via the app at least 24 hours in advance and we'll do our best to accommodate.",
      },
    ],
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.icon} ${open ? styles.open : ""}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
        fill="#191919"
      />
    </svg>
  );
}

function AccordionGroup({
  title,
  items,
  openKeys,
  onToggle,
  prefix,
}: {
  title: string;
  items: { title: string; body: string }[];
  openKeys: Set<string>;
  onToggle: (key: string) => void;
  prefix: string;
}) {
  return (
    <div className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      <div className={styles.list}>
        {items.map((item, i) => {
          const key = `${prefix}-${i}`;
          const isOpen = openKeys.has(key);
          return (
            <div key={key} className={styles.item}>
              <button
                className={styles.trigger}
                onClick={() => onToggle(key)}
                aria-expanded={isOpen}
              >
                <span className={styles.itemTitle}>{item.title}</span>
                <PlusIcon open={isOpen} />
              </button>
              <div className={`${styles.body} ${isOpen ? styles.open : ""}`}>
                <div className={styles.bodyInner}>
                  <p className={styles.bodyText}>{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdditionalInfoSection() {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.topDivider} />

      {GROUPS.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && <div className={styles.groupDivider} />}
          <AccordionGroup
            title={group.title}
            items={group.items}
            openKeys={openKeys}
            onToggle={toggle}
            prefix={`g${gi}`}
          />
        </div>
      ))}
    </section>
  );
}
