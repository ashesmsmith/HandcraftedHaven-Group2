"use client";

import Link from "next/link";

export default function SellerDashboard() {
  return (
    <section className="container mx-auto px-4 py-10">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif text-dark-brown">
          Welcome, Seller!
        </h1>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* View Profile */}
        <Link href="/dashboard/seller/profile">
          <div className="bg-light-green p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-green hover:text-white transition">
            <h2 className="text-xl font-semibold">👩 View Profile</h2>
            <p className="text-sm">Manage your personal and business details.</p>
          </div>
        </Link>

        {/* View Listings */}
        <Link href="/dashboard/seller/listings">
          <div className="bg-light-brown p-6 rounded-lg shadow-md cursor-pointer hover:bg-dark-brown hover:text-white transition">
            <h2 className="text-xl font-semibold">📦 View Listings</h2>
            <p className="text-sm">Check all your active product listings.</p>
          </div>
        </Link>

        {/* Edit Listings */}
        <Link href="/dashboard/seller/listings/edit">
          <div className="bg-dark-green text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-light-green hover:text-dark-brown transition">
            <h2 className="text-xl font-semibold">✏️ Edit Listings</h2>
            <p className="text-sm">Modify your existing product details.</p>
          </div>
        </Link>

        {/* Add New Listing */}
        <Link href="/dashboard/seller/listings/add-listing">
          <div className="bg-dark-brown text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-light-brown hover:text-dark-brown transition">
            <h2 className="text-xl font-semibold">➕ Add Listing</h2>
            <p className="text-sm">Create a new product listing for sale.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
