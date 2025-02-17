// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Unique handmade crafts and gifts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased min-h-screen flex flex-col bg-cream text-dark-brown">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
