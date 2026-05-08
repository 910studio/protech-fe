import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { VariantSwitcher } from "./_components/VariantSwitcher";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Protech — Built for Mongolia's enterprises",
  description: "B2B technology procurement, beautifully made.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        {children}
        <VariantSwitcher />
      </body>
    </html>
  );
}
