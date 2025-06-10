import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tony Tong Wang - Senior Full-Stack Developer",
  description: "Senior Full-Stack Developer with 14+ years of experience in React, Node.js, and cloud architecture. Available for hire in Vancouver, BC.",
  keywords: ["Tony Wang", "Full-Stack Developer", "React", "Node.js", "TypeScript", "Vancouver", "Software Developer", "Resume"],
  authors: [{ name: "Tony Tong Wang" }],
  creator: "Tony Tong Wang",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }
    ],
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: "Tony Tong Wang - Senior Full-Stack Developer",
    description: "Senior Full-Stack Developer with 14+ years of experience in React, Node.js, and cloud architecture.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tony Tong Wang - Senior Full-Stack Developer",
    description: "Senior Full-Stack Developer with 14+ years of experience in React, Node.js, and cloud architecture.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e40af",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
