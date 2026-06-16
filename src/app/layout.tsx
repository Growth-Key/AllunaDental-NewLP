import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO(launch): update to the final landing-page domain (e.g. spa.allunadental.com)
  metadataBase: new URL("https://allunadental.com"),
  title: "Alluna Dental — Spa-Inspired Cosmetic Dentistry in Studio City, LA",
  description:
    "Veneers, smile makeovers, and implant artistry in a Studio City studio designed to feel nothing like a dental office. 5.0 stars across 170+ Google reviews. Reserve a free smile design session.",
  // Paid-traffic angle test — keep out of organic search until promoted to a permanent page.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Alluna Dental — Spa-Inspired Cosmetic Dentistry",
    description:
      "Spa-level comfort, master-level dentistry. Reserve your free smile design session in Studio City.",
    type: "website",
    images: [{ url: "/media/hero-poster-teal.jpg", width: 1920, height: 1080 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6fbfa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
