import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Xtreme Kids Academy - Learn with Park the Teddy Bear",
  description: "An magical educational experience for children. Meet Park, your child's AI-powered learning companion.",
  keywords: ["education", "kids learning", "AI tutor", "children app", "Park the bear"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
