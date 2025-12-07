import "./globals.css";
import type { ReactNode } from "react";
import { Baloo_2, Noto_Sans_Devanagari } from "next/font/google";

export const metadata = {
  title: "बर्फ का महल | Rajasthan Ice Palace Tale",
  description:
    "राजस्थान की तपती धरती पर दादी और बंदर द्वारा बनाए गए जादुई बर्फ के महल की कहानी एक AI कार्टून शैली में।"
};

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo"
});

const notoSans = Noto_Sans_Devanagari({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hi">
      <body className={`${baloo.variable} ${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
