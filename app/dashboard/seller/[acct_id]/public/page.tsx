"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SellerProfilePublicPage() {
  const { acct_id } = useParams() as { acct_id: string };
  const [sellerName, setSellerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [storyHeading, setStoryHeading] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("/default_profile.webp");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          throw new Error(`Failed: ${await res.text()}`);
        }
        const data = await res.json();
        setSellerName(`${data.firstname} ${data.lastname}`);
        setBusinessName(data.businessname || "Independent Seller");
        setStoryHeading(data.story_heading || "");
        setStory(data.story || "");
        setImage(data.image || "/default_profile.webp");
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [acct_id]);

  if (loading) return <div className="p-4">Loading public profile...</div>;

  return (
    <section className="container mx-auto px-6 py-10">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={`${sellerName} profile picture`}
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      {/* Seller Name and Business */}
      <h1 className="text-3xl font-bold font-serif mb-2">{sellerName}</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{businessName}</h2>

      {/* Story Section */}
      <div className="bg-white p-6 rounded shadow space-y-4">
        <h3 className="text-xl font-semibold">{storyHeading}</h3>
        <p className="whitespace-pre-wrap">{story}</p>
      </div>

      {/* View Listings Button */}
      <div className="mt-6">
        <Link href={`/dashboard/seller/${acct_id}/listings`}>
          <button className="bg-dark-brown text-white px-4 py-2 rounded hover:bg-light-brown transition">
            View Seller&apos;s Listings
          </button>
        </Link>
      </div>
    </section>
  );
}
