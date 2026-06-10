import styles from "./layout.module.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Badges from "@/components/Badges/Badges";

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Magic Marble Foundation",
    default: "Magic Marble Foundation",
  },
  description:
    "Empowering communities, promoting animal welfare, and championing environmental activism. Join us in creating a compassionate global community.",
  openGraph: {
    title: "Magic Marble Foundation",
    description: "Mobilize Empathy For All Species And The World We Share.",
    siteName: "Magic Marble Foundation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <main className={styles.main}>
          <Badges/>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
