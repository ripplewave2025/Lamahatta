import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import RecordNav from "@/components/layout/RecordNav";
import RecordFooter from "@/components/layout/RecordFooter";
import { LanguageProvider } from "@/context/LanguageContext";

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
  title: "Seemana Gaon | A Living Record",
  description: "A living record of a small village in Lamahatta, Darjeeling. 22 houses. 93 people. One story.",
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
          <RecordFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
