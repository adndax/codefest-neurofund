import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { WalletProvider } from "./wallet-provider"; // ⬅️ Tambahkan ini

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "NeuroFund",
  description: "NeuroFund",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${openSans.variable} antialiased`}>
        <WalletProvider> {/* ✅ Tambahkan ini */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
