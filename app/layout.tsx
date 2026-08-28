import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "FRIDGEWISE - AI Smart Kitchen & Culinary Intelligence",
  description:
    "Know what's in your fridge. Cook what expires first. An AI-powered smart kitchen platform designed to eliminate food waste and elevate daily cooking.",
  keywords: [
    "Smart Fridge",
    "Food Waste Prevention",
    "AI Kitchen",
    "Recipe Discovery",
    "Smart Cooking",
    "Three.js 3D Fridge",
  ],
  authors: [{ name: "FridgeWise AI" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${sora.variable} ${hanken.variable} ${jetbrains.variable} font-body bg-background text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-white relative overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
