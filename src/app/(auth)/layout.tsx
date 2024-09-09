import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "react-quill/dist/quill.snow.css";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/provider/Provider";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beta World",
  description: "do some crazy things here!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
