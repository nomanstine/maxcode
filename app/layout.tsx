import type { Metadata } from "next";
import {
  Amiri_Quran,
  Aref_Ruqaa_Ink,
  Fraunces,
  Gulzar,
  Lalezar,
  Lateef,
  Manrope,
  Noto_Kufi_Arabic,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
  Mirza,
  Reem_Kufi_Fun,
  Reem_Kufi_Ink,
} from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-ui",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-naskh",
  weight: ["400", "700"],
});

const amiriQuran = Amiri_Quran({
  subsets: ["arabic"],
  variable: "--font-arabic-amiri-quran",
  weight: ["400"],
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-kufi",
  weight: ["400", "700"],
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-arabic-nastaliq",
  weight: ["400", "500", "600", "700"],
});

const reemFun = Reem_Kufi_Fun({
  subsets: ["arabic"],
  variable: "--font-arabic-reem-fun",
  weight: ["400", "500", "700"],
});

const reemInk = Reem_Kufi_Ink({
  subsets: ["arabic"],
  variable: "--font-arabic-reem-ink",
  weight: ["400"],
});

const arefInk = Aref_Ruqaa_Ink({
  subsets: ["arabic"],
  variable: "--font-arabic-aref-ink",
  weight: ["400", "700"],
});

const mirza = Mirza({
  subsets: ["arabic"],
  variable: "--font-arabic-mirza",
  weight: ["400", "500", "700"],
});

const lalezar = Lalezar({
  subsets: ["arabic"],
  variable: "--font-arabic-lalezar",
  weight: ["400"],
});

const gulzar = Gulzar({
  subsets: ["arabic"],
  variable: "--font-arabic-gulzar",
  weight: ["400"],
});

const lateef = Lateef({
  subsets: ["arabic"],
  variable: "--font-arabic-lateef",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Quran Explorer",
  description: "Browse surahs, read ayahs, and search translations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arabic-font="naskh">
      <body
        className={`${manrope.variable} ${fraunces.variable} ${notoNaskh.variable} ${amiriQuran.variable} ${notoKufi.variable} ${nastaliq.variable} ${reemFun.variable} ${reemInk.variable} ${arefInk.variable} ${mirza.variable} ${lalezar.variable} ${gulzar.variable} ${lateef.variable} bg-slate-50 text-slate-900 antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
