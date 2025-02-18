import { sql } from "@vercel/postgres";
import type { Review } from "@/lib/definitions";

// ✅ Fetch reviews for a given product
export async function fetchReviewsByProductId(productId: string): Promise<Review[]> {
    try {
        const { rows } = await sql<Review>`
            SELECT * FROM reviews WHERE product_id = ${productId} ORDER BY date DESC;
        `;
        return rows;
    } catch (error: unknown) {
        console.error("Error fetching reviews:", error instanceof Error ? error.message : error);
        return [];
    }
}

// ✅ Add a new review to the database
export async function addReview(productId: string, stars: number, review: string) {
    try {
        await sql`
            INSERT INTO reviews (product_id, stars, review, date)
            VALUES (${productId}, ${stars}, ${review}, NOW());
        `;
        return { success: true };
    } catch (error: unknown) {
        console.error("Error adding review:", error instanceof Error ? error.message : error);
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}
