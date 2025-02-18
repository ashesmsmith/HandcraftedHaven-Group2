"use server";

import { z } from 'zod';
import { sql } from "@vercel/postgres";
import { Review } from "@/lib/definitions";

// Define schema validation
const ReviewSchema = z.object({
  product_id: z.string().uuid(),
  stars: z.number().min(1).max(5),
  review: z.string().min(3, "Review must be at least 3 characters long"),
  account_id: z.string().uuid().nullable().optional(),
  date: z.string().optional(),
});

// Fetch Reviews from Database
export async function fetchReviewsByProductId(productId: string): Promise<Review[]> {
    console.log(`Fetching reviews for product: ${productId}`);
    try {
        const { rows } = await sql<Review>`
            SELECT * FROM reviews WHERE product_id = ${productId} ORDER BY date DESC;
        `;
        return rows;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
}

// Add a Review to the Database
export async function addReview(
  prevState: Record<string, unknown>,
  formData: FormData
): Promise<{ success?: boolean; message?: string; errors?: Record<string, string[]>; review?: Review }> {
  
  const validatedFields = ReviewSchema.safeParse({
    product_id: formData.get("product_id"),
    stars: Number(formData.get("stars")),
    review: formData.get("review"),
    account_id: formData.get("account_id") || null,
    date: formData.get("date") || new Date().toISOString(),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Submission failed due to invalid input",
    };
  }

  const { product_id, stars, review, account_id } = validatedFields.data;

  try {
    console.log("Adding Review:", { product_id, stars, review, account_id });

    const result = await sql<Review>`
      INSERT INTO reviews (product_id, account_id, stars, review, date)
      VALUES (${product_id}, ${account_id}, ${stars}, ${review}, NOW()) 
      RETURNING product_id, account_id, stars, review, date;
    `;

    if (!result.rows.length || !result.rows[0].date) {
      throw new Error("Failed to retrieve inserted review with a valid date.");
    }

    console.log("Review Added Successfully:", result.rows[0]);

    return {
      success: true,
      message: "Review added successfully!",
      review: result.rows[0],
    };
  } catch (error) {
    console.error(" Database Error Adding Review:", error);
    return { message: "Database error occurred while adding the review." };
  }
}
