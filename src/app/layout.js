import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (fixed paths)
export const metadata = {
  title: "Netflix",
  description: "Netflix clone built with Next.js",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type:"image/ico"}, // ✅ directly in public/
      { url: "/favicon.png", type: "image/png" }, // ✅ directly in public/
      { url: "/img/favicon-96x96.png", sizes: "96x96", type: "image/png" }, // ✅ inside img/
    ],
    apple: "/img/apple-touch-icon.png", // ✅ inside img/
  },
  manifest: "/site.webmanifest", // ✅ directly in public/
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
