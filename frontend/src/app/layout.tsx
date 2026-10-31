import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalCursor } from "@/components/layout/cursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fluenseafy - Interact, Learn and Improve",
  description:
    "Master English with expert-led courses in listening, speaking, writing, and reading. Learn at your own pace with interactive lessons designed to build confidence and fluency.",
  icons: { icon: "/img/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <GlobalCursor />
      </body>
    </html>
  );
}
