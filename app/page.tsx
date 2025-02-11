// app/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Carousel from "./ui/Carousel";

export const metadata: Metadata = {
  title: "Handcrafted Haven - Homepage",
  description: "Welcome to Handcrafted Haven",
};

// Embedded placeholder data
const accounts = [
  {
    account_id: "0754fa5d-1be7-4cd9-b876-143b59d4db81",
    account_type: "Admin",
    firstName: "Admin",
    lastName: "Account",
    businessName: "Admin Account",
    tax_id: null,
    address: "123 Admin Street, Some City, UT, 54321",
    phone: "111-111-1111",
    email: "[email protected]",
    password: "Abc12345",
  },
  {
    account_id: "96f9a579-4021-4a7a-8fbe-8032cdfde673",
    account_type: "Seller",
    firstName: "Seller",
    lastName: "Account",
    businessName: "My Small Business",
    tax_id: 1234567890,
    address: "456 Seller Street, Somewhere, UT, 12345",
    phone: "222-222-2222",
    email: "[email protected]",
    password: "Abc12345",
  },
];

const products = [
  {
    product_id: "b481438a-7dba-4aaa-8bd5-bccc03d2eb31",
    account_id: accounts[1].account_id,
    productName: "Ceramic Flower Vase",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Pottery",
    color: "White",
    price: 30.0,
    imageSRC: "/prod_images/vase.webp",
  },
  {
    product_id: "67657788-d579-43d9-a92e-e8754b02f7e2",
    account_id: accounts[1].account_id,
    productName: "Book Nerd T-Shirt",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Clothing",
    color: "Green",
    price: 20.0,
    imageSRC: "/prod_images/book_shirt.webp",
  },
  {
    product_id: "6fe17217-d5ff-40f6-90ae-deb69d778eff",
    account_id: accounts[1].account_id,
    productName: "Amethyst Necklace",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Jewelry",
    color: "Purple",
    price: 250.0,
    imageSRC: "/prod_images/necklace.webp",
  },
  {
    product_id: "7940b624-cf63-4a86-bd27-34e72a1cab32",
    account_id: accounts[1].account_id,
    productName: "Dragon Sticker",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Stickers",
    color: "Multi",
    price: 5.0,
    imageSRC: "/prod_images/dragon_sticker.webp",
  },
  {
    product_id: "f005a76d-094e-4f88-a498-3b43da59c1b0",
    account_id: accounts[1].account_id,
    productName: "Wood Memory Box",
    productDesc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ...",
    category: "Woodworking",
    color: "Brown",
    price: 75.0,
    imageSRC: "/prod_images/memory_box.webp",
  },
];

export default function HomePage() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center text-center py-20 px-6">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif">
        Handcrafted Haven
      </h1>
      <p className="text-lg text-dark-brown/70 mb-6">Custom Creations</p>
      <div className="flex space-x-4">
        {/* Login Button */}
        <Link href="/dashboard/auth/login">
          <button className="border border-dark-brown text-dark-brown px-6 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
            Login
          </button>
        </Link>

        {/* Register Button*/}
        <Link href="/dashboard/auth/signup">
          <button className="bg-dark-brown text-cream px-6 py-2 rounded hover:bg-light-brown hover:text-white transition-colors">
            Register
          </button>
        </Link>
      </div>

      {/* Two Carousels in a 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-10">
        <Carousel
          images={[
            {
              src: products[1].imageSRC, // Book Nerd T-Shirt
              id: products[1].product_id,
            },
            {
              src: products[3].imageSRC, // Dragon Sticker
              id: products[3].product_id,
            },
          ]}
          interval={3000}
        />

        <Carousel
          images={[
            {
              src: products[0].imageSRC, // Ceramic Flower Vase
              id: products[0].product_id,
            },
            {
              src: products[2].imageSRC, // Amethyst Necklace
              id: products[2].product_id,
            },
            {
              src: products[4].imageSRC, // Wood Memory Box
              id: products[4].product_id,
            },
          ]}
          interval={4000}
        />
      </div>
    </section>
  );
}
