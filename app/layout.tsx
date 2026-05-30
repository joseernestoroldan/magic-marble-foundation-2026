import styles from "./layout.module.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSansFont.className}>
        <main className={styles.main}>
          {/* <Badge mode="layout"/> */}
          <Navbar />
          <div className={styles.content}>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
