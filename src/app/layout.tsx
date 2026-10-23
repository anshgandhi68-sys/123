import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For My Favourite Bhaiya ♡ | From Radhee",
  description: "A little birthday universe, created with love by Radhee for her favourite Bhaiya.",
};

export const viewport: Viewport = {
  themeColor: "#10172D",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="lock">{children}</body>
    </html>
  );
}
