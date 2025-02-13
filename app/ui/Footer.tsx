// app/ui/Footer.tsx

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-dark-brown/20 bg-light-green">
      <div className="container mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Image src="/sm-logo.webp" alt="Handcrafted Haven Small Logo" width={30} height={30} />
            <div className="font-bold text-xl font-serif">Handcrafted Haven</div>
            <div className="flex space-x-2">By Group 2</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 text-sm">
            <Link href="#" className="hover:text-dark-green">Facebook</Link>
            <Link href="#" className="hover:text-dark-green">Instagram</Link>
            <Link href="#" className="hover:text-dark-green">LinkedIn</Link>
          </div>
          <p className="text-sm text-dark-brown mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
