import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import RecordNav from "@/components/layout/RecordNav";
import RecordFooter from "@/components/layout/RecordFooter";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingReportIssue from "@/components/golden-village/FloatingReportIssue";
import Snow from "@/components/effects/Snow";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Golden Village OS | Sunaray Gaon",
  description:
    "A daily operating system for Sunaray Gaon in Lamahatta, Darjeeling: alerts, issues, marketplace, schemes, talent, and partnerships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <LanguageProvider>
          <RecordNav />
          <main>{children}</main>
          <FloatingReportIssue />
          <RecordFooter />
          <Snow />
        </LanguageProvider>
      </body>
    </html>
  );
}
