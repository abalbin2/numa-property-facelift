import type { Metadata } from "next";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";

const lausanne = localFont({
  src: [
    { path: "./fonts/TWKLausanne-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/TWKLausanne-600.woff",  weight: "600", style: "normal" },
  ],
  variable: "--font",
});

export const metadata: Metadata = {
  title: "Numa Berlin Torstraße – Numa",
  description: "At Numa Berlin Torstraße, you're dialed into Mitte's blend of galleries, street eats, and late-night hangouts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lausanne.variable}>
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <Agentation endpoint="http://localhost:4747" />}
      </body>
    </html>
  );
}
