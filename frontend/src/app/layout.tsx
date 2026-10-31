import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/general.css";
import "@/styles/icons.css";
import "@/styles/index.css";
import "@/styles/responsive.css";

const inter = Inter({ subsets: ["latin"], display: "swap", axes: ["opsz"] });

export const metadata: Metadata = {
  title: "Fluenseafy - Interact, Learn and Improve",
  description:
    "Master English with expert-led courses in listening, speaking, writing, and reading. Learn at your own pace with interactive lessons designed to build confidence and fluency.",
  icons: { icon: "/img/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
