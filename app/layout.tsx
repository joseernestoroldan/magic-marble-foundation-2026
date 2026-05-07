import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

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
        <main className="relative">
          {/* <Badge mode="layout"/> */}
          <Navbar />
          <div className="w-full">{children}</div>
          {/* <Footer name={name} /> */}
        </main>
      </body>
    </html>
  );
}
