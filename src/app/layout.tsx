import BottomNavBar from "../components/bottomNavbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* <link rel="manifest" href="/manifest.ts" /> */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        

        {children}

        <BottomNavBar />
      </body>
    </html>
  );
}
