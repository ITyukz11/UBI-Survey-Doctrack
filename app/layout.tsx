import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nidoramas",
  description: "Ulticon Builders Inc. (UBI) Document Tracking System for Survey Engineer Department",
};

export default function RootLayout({
  children,
  pageProps,
}: Readonly<{
  children: React.ReactNode;
  pageProps: any; // Assuming you are passing pageProps to RootLayout
}>) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
           {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
