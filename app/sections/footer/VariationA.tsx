import styles from "./VariationA.module.css";

const COLUMNS = [
  {
    title: "Contact & Help",
    links: [
      { label: "FAQ", href: "https://pages.numastays.com/faq" },
      { label: "Chat on WhatsApp (24/7 Support)", href: "https://wa.me/+4915735992293" },
      { label: "Call +49 30 3119 6117", href: "tel:+493031196117" },
      { label: "Book a business or group stay", href: "https://corporate.numastays.com" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Business Travel", href: "https://corporate.numastays.com" },
      { label: "Member Benefits", href: "https://pages.numastays.com/offers" },
      { label: "Best Price Guarantee", href: "https://promo.numastays.com/mg-claim-process-conditions" },
      { label: "Sustainability", href: "https://esg.numastays.com/" },
    ],
  },
  {
    title: "Numa",
    links: [
      { label: "Our Story", href: "https://numastays.com/our-story" },
      { label: "Development", href: "https://partner.numastays.com/" },
      { label: "Press", href: "https://partner.numastays.com/presscenter" },
      { label: "Blog", href: "https://numastays.com/blog" },
      { label: "Careers", href: "https://numastays.com/careers" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/numastays/", icon: "/footer/1713808203-instagram.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/@numastays", icon: "/footer/1715673562-tiktok-svgrepo-com-1.svg" },
  { label: "Facebook", href: "https://www.facebook.com/numastays/", icon: "/footer/1713808318-facebook.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/numa-stays/", icon: "/footer/1713808289-linkedin.svg" },
];

const PAYMENT = [
  { label: "PayPal", icon: "/footer/1712825625-paypal.svg" },
  { label: "Apple Pay", icon: "/footer/1712825952-applepay.svg" },
  { label: "Google Pay", icon: "/footer/1715674421-google-pay.svg" },
  { label: "Mastercard", icon: "/footer/1712825905-mastercard.svg" },
  { label: "Visa", icon: "/footer/1712825917-visa.svg" },
  { label: "Amex", icon: "/footer/1712825931-amex.svg" },
  { label: "Other", icon: "/footer/1728385415-size-24.svg" },
];

export default function FooterSection() {
  return (
    <footer className={styles.footer}>
      {/* Top section: link columns */}
      <div className={styles.contentWidth}>
        <div className={styles.columns}>
          {COLUMNS.map((col) => (
            <div key={col.title} className={styles.column}>
              <span className={styles.columnTitle}>{col.title}</span>
              <ul className={styles.columnLinks}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.columnLink}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Fourth column: social, app, payment */}
          <div className={styles.rightColumn}>
            <div className={styles.subSection}>
              <span className={styles.columnTitle}>Stay social</span>
              <div className={styles.socialRow}>
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialItem}
                    aria-label={s.label}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt={s.label} />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.subSection}>
              <span className={styles.columnTitle}>Download the Numa App</span>
              <div className={styles.badgeRow}>
                <a href="https://apps.apple.com/us/app/numa-travel-with-soul/id6464678134" target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/footer/1712683534-applestore.svg" alt="Download on App Store" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.numa.numamobile" target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/footer/1712683603-google_play_store.svg" alt="Get it on Google Play" />
                </a>
              </div>
            </div>

            <div className={styles.subSection}>
              <span className={styles.columnTitle}>Pay with</span>
              <div className={styles.payRow}>
                {PAYMENT.map((p) => (
                  <div key={p.label} className={styles.payItem}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.icon} alt={p.label} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo section */}
      <div className={styles.contentWidth}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/numa-logo-tagline.svg"
          alt="numa — We do the room. You do the city."
          className={styles.numaLogo}
        />
      </div>

      {/* Copyright bar */}
      <div className={styles.contentWidth}>
        <div className={styles.copyrightBar}>
          <ul className={styles.termsLinks}>
            <li><a href="https://numastays.com/terms">Terms &amp; Conditions</a></li>
            <li><a href="https://numastays.com/privacy">Privacy policy</a></li>
            <li><a href="https://numastays.com/imprint">Imprint</a></li>
          </ul>
          <span className={styles.copyright}>
            &copy; numa group SE. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
