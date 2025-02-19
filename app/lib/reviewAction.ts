"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { Review } from "@/lib/definitions";

//  Ensure database connection is set
if (!process.env.POSTGRES_URL) {
  console.error("Missing database connection string. Set POSTGRES_URL in .env.local or Vercel.");
  throw new Error("Database connection error: POSTGRES_URL is not set.");
}

// Review Schema Validation
const ReviewSchema = z.object({
  product_id: z.string().uuid(),
  stars: z.number().min(1).max(5),
  review: z.string().min(3, "Review must be at least 3 characters long"),
  account_id: z.string().uuid().nullable().optional(),
  date: z.string().optional(),
});

// Fetch Reviews from Database
export async function fetchReviewsByProductId(productId: string): Promise<Review[]> {
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
  
  console.log("Received formData:", {
    product_id: formData.get("product_id"),
    stars: formData.get("stars"),
    review: formData.get("review"),
    account_id: formData.get("account_id"),
  });

  // Validate input fields
  const validatedFields = ReviewSchema.safeParse({
    product_id: formData.get("product_id"),
    stars: Number(formData.get("stars")),
    review: formData.get("review"),
    account_id: formData.get("account_id") || null,
    date: new Date().toISOString(),
  });

  if (!validatedFields.success) {
    console.error("Validation Error:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Submission failed due to invalid input",
    };
  }

  const { product_id, stars, review, account_id } = validatedFields.data;

  try {
    console.log("Attempting to insert review into database...");
    const result = await sql<Review>`
      INSERT INTO reviews (product_id, account_id, stars, review, date)
      VALUES (${product_id}, ${account_id}, ${stars}, ${review}, NOW()) 
      RETURNING *;
    `;

    if (!result.rows.length) {
      console.error(" Error: No rows returned from INSERT query.");
      return { success: false, message: "Database error occurred while adding the review." };
    }

    console.log(" Review added successfully:", result.rows[0]);

    // Revalidate cache to show new review immediately
    revalidatePath(`/products/${product_id}`);

    return {
      success: true,
      message: "Review added successfully!",
      review: result.rows[0],
    };
  } catch (error) {
    console.error("Database Error Adding Review:", error);
    return { success: false, message: "Database error occurred while adding the review." };
  }
}
