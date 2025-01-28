// app/page.tsx
import { Metadata } from "next";
import Image from "next/image";

/**
 * Next.js 13+ recommended approach for <head>:
 * define metadata for your page here.
 */
export const metadata: Metadata = {
  title: "Handcrafted Haven - Homepage",
  description: "Welcome to Handcrafted Haven",
};

export default function HomePage() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 px-6">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">
        Handcrafted Haven
      </h1>
      <p className="text-lg text-dark-brown/70 mb-6">
        Custom Creations
      </p>
      <div className="flex space-x-4">
        <button className="border border-dark-brown text-dark-brown px-6 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
          Button
        </button>
        <button className="bg-dark-brown text-cream px-6 py-2 rounded hover:bg-light-brown hover:text-white transition-colors">
          Button
        </button>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        {/* First placeholder with small logo */}
        <div className="bg-light-brown h-48 flex items-center justify-center">
          <Image
            src="/sm-logo.webp"
            alt="Handcrafted Haven Small Logo"
            width={80}
            height={80}
          />
        </div>
        {/* Second placeholder, just text */}
        <div className="bg-dark-green h-48 flex items-center justify-center">
          <span className="text-white">Image Placeholder</span>
        </div>
      </div>
    </section>
  );
}
