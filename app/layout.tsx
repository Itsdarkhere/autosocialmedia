import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyLinkedin, easily grow your social reach",
  description: "Our AI post automation tool allows you to create fantastic content, specific to your industry, with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
