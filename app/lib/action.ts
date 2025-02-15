
'use server';
import { sql } from '@vercel/postgres';
import { Review } from "@/app/lib/definitions";

console.log("🛠️ POSTGRES_URL (from actions.ts):", process.env.POSTGRES_URL); // Debugging

export async function addReview(product_id: string, stars: number, review: string): Promise<Review | null> {
    try {

        console.log("🛠️ Checking POSTGRES_URL in action file:", process.env.POSTGRES_URL || "❌ NOT SET");

        // Check if the environment variable is undefined
        if (!process.env.POSTGRES_URL) {
            throw new Error("❌ POSTGRES_URL is not set!");
        }

        const result = await sql<Review>`
            INSERT INTO reviews (product_id, account_id, stars, review)
            VALUES (${product_id}, 'guest', ${stars}, ${review})
            RETURNING product_id, account_id, stars, review;
        `;

        return result.rows.length > 0 ? result.rows[0] : null; // ✅ Return inserted review
    } catch (error) {
        console.error("❌ Error adding review:", error);
        return null;
    }
}
