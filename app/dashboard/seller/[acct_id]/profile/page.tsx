"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SellerProfileEditablePage() {
  const { acct_id } = useParams() as { acct_id: string };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [storyHeading, setStoryHeading] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const res = await fetch(`/api/seller/${acct_id}`);
        if (!res.ok) {
          throw new Error(`Profile load failed: ${await res.text()}`);
        }
        const sellerData = await res.json();
        console.log("🔍 Loaded Seller Data:", sellerData);

        setFirstName(sellerData.firstname || "");
        setLastName(sellerData.lastname || "");
        setBusinessName(sellerData.businessname || "");
        setStoryHeading(sellerData.story_heading || "");
        setStory(sellerData.story || "");
        setImage(sellerData.image || "/default_profile.webp");
      } catch (err) {
        setStatusMsg(
          err instanceof Error ? err.message : "Error loading profile."
        );
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [acct_id]);

  async function handleSave() {
    try {
      setStatusMsg("");

      const updateData = {
        firstName,
        lastName,
        businessName,
        story_heading: storyHeading,
        story,
        image,
      };

      console.log("📤 Sending update request:", updateData);

      const res = await fetch(`/api/seller/${acct_id}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const responseBody = await res.json();
      console.log("📩 API Response:", responseBody);

      if (!res.ok) {
        throw new Error(`Update failed: ${responseBody.error}`);
      }

      setStatusMsg("Profile updated successfully!");
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : "An error occurred.");
    }
  }

  if (loading) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold font-serif text-dark-brown mb-4">
        Edit Profile for {firstName} {lastName}
      </h1>

      {statusMsg && <div className="mb-4 text-red-600">{statusMsg}</div>}

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* First Name */}
        <div>
          <label className="block mb-1 font-semibold">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-semibold">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-1 font-semibold">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Story Heading */}
        <div>
          <label className="block mb-1 font-semibold">Story Heading</label>
          <input
            type="text"
            value={storyHeading}
            onChange={(e) => setStoryHeading(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Story */}
        <div>
          <label className="block mb-1 font-semibold">Your Story</label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={5}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* New: Profile Picture URL */}
        <div>
          <label className="block mb-1 font-semibold">Profile Picture URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL or leave blank for default"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-dark-green text-white px-4 py-2 rounded hover:bg-dark-brown transition"
        >
          Save
        </button>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => router.push(`/dashboard/seller/${acct_id}`)}
          className="ml-4 border border-dark-brown px-4 py-2 rounded hover:bg-dark-brown hover:text-white transition"
        >
          Back to Dashboard
        </button>
      </div>
    </section>
  );
}
