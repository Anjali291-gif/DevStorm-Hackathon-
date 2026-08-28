import type { Metadata, Viewport } from "next";
import "./globals.css";

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
      <body className="font-body bg-background text-on-surface min-h-screen antialiased selection:bg-primary-container selection:text-white relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
