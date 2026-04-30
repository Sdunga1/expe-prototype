import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import { DemoNav } from "@/components/demo-nav";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expe-demo.vercel.app"),
  title: "Expe - your in-stay concierge",
  description:
    "An AI concierge for every property a guest stays in. Hosts configure once, guests scan a QR and get a Jarvis-like in-stay experience for the duration of their booking.",
  openGraph: {
    title: "Expe - your in-stay concierge",
    description:
      "AI concierge for hotels and short-term rentals. Guests scan a QR, get answers for the entire stay.",
    type: "website",
    siteName: "Expe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expe - your in-stay concierge",
    description:
      "AI concierge for hotels and short-term rentals. QR-scan, session-only, no app.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <body className="font-sans relative">
        <DemoNav />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
