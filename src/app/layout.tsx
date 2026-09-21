import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SAN-D | Engineering the Future at the Smallest Scale",
  description: "A next-generation semiconductor technology company. Advancing computing through atomic-scale engineering.",
  keywords: ["semiconductor", "technology", "engineering", "chip design", "nanotechnology", "transistor", "SAN-D"],
  authors: [{ name: "SAN-D" }],
  creator: "SAN-D",
  publisher: "SAN-D",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://san-d.tech",
    title: "SAN-D | Engineering the Future at the Smallest Scale",
    description: "A next-generation semiconductor technology company.",
    siteName: "SAN-D",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAN-D | Engineering the Future at the Smallest Scale",
    description: "A next-generation semiconductor technology company.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}