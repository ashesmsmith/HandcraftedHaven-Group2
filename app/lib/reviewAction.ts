'use server';

import { z } from 'zod';
import { sql } from "@vercel/postgres";
import type { Review } from "@/lib/definitions";

// ✅ Define schema validation using Zod
const ReviewSchema = z.object({
  product_id: z.string().uuid(),
  stars: z.number().min(1).max(5),
  review: z.string().min(3, "Review must be at least 3 characters long"),
  account_id: z.string().uuid().nullable().optional(),
  date: z.string().optional(),
});

// ✅ Fetch all reviews by product ID
export async function fetchReviewsByProductId(productId: string): Promise<Review[]> {
    try {
        const { rows } = await sql<Review>`
            SELECT * FROM reviews WHERE product_id = ${productId} ORDER BY date DESC;
        `;
        return rows;
    } catch (error) {
        console.error("Error fetching reviews:", error instanceof Error ? error.message : error);
        return [];
    }
}

// ✅ Add a new review with validation
export async function addReview(
  prevState: Record<string, unknown>,
  formData: FormData
): Promise<{ success?: boolean; message?: string; errors?: Record<string, string[]>; review?: Review }> {
  // Validate input fields
  const validatedFields = ReviewSchema.safeParse({
    product_id: formData.get("product_id"),
    stars: Number(formData.get("stars")),
    review: formData.get("review"),
    account_id: formData.get("account_id") || null,
    date: formData.get("date") || new Date().toISOString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Submission failed due to invalid input",
    };
  }

  const { product_id, stars, review, account_id } = validatedFields.data;

  try {
    const result = await sql<Review>`
      INSERT INTO reviews (product_id, account_id, stars, review, date)
      VALUES (${product_id}, ${account_id}, ${stars}, ${review}, NOW()) 
      RETURNING product_id, account_id, stars, review, date;
    `;

    if (!result.rows.length || !result.rows[0].date) {
      throw new Error("Failed to retrieve inserted review with a valid date.");
    }

    return {
      success: true,
      message: "Review added successfully!",
      review: result.rows[0],
    };
  } catch (error) {
    console.error("Error adding review:", error);
    return { message: "Database error occurred while adding the review." };
  }
}
