import styles from "./VariationB.module.css";

const AMENITIES = [
  { name: "Air conditioning",   icon: "ac_unit" },
  { name: "Accessible",         icon: "accessible" },
  { name: "Pets allowed",       icon: "pets" },
  { name: "Luggage storage",    icon: "luggage" },
  { name: "Lift",               icon: "elevator" },
  { name: "Highchair",          icon: "chair_alt" },
  { name: "Essentials closet",  icon: "dry_cleaning" },
  { name: "Coworking space",    icon: "laptop_mac" },
  { name: "Baby bed",           icon: "crib" },
  { name: "Yoga mats",          icon: "sports_gymnastics" },
  { name: "Breakfast box",      icon: "bakery_dining" },
  { name: "Shared laundry room", icon: "local_laundry_service" },
];

export default function AmenitiesVariationB() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
      <h2 className={styles.headline}>Amenities</h2>
      <ul className={styles.grid}>
        {AMENITIES.map((amenity) => (
          <li key={amenity.name} className={styles.item}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              {amenity.icon}
            </span>
            <span className={styles.name}>{amenity.name}</span>
          </li>
        ))}
      </ul>
      <button className={styles.showAll}>Show all</button>
      </div>
    </section>
  );
}
