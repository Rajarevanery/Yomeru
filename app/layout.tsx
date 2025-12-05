import type { Metadata } from "next";
import { Comfortaa, Poppins, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins-variable",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa-variable",
});

const mplusrounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-mplusrounded-variable",
});

export const metadata: Metadata = {
  title: "言葉Kotoba",
  description: "Learn japanese faster by doing and learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${poppins.variable} ${mplusrounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
