import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const benguiat = localFont({
  src: "../public/fonts/BenguiatBold.ttf",
  variable: "--font-benguiat",
});

const strangerOutline = localFont({
  src: "../public/fonts/StrangerThingsOutlined.ttf",
  variable: "--font-stranger-outline",
});

export const metadata: Metadata = {
  title: "Stranger Things | The Upside Down",
  description: "Explore the parallel dimension beneath our world. Season 5 - Now Streaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${benguiat.variable} ${strangerOutline.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
