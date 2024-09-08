import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beta World",
  description: "do some crazy things here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
