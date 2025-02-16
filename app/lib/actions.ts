"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Schema for Adding & Editing Listings
const ListingSchema = z.object({
  product_id: z.string().optional(), // Not required for adding new products
  account_id: z.string(),
  productName: z.string(),
  productDesc: z.string(),
  category: z.enum([
    "Pottery",
    "Clothing",
    "Jewelry",
    "Stickers",
    "Woodworking",
    "Other",
  ]),
  color: z.enum([
    "Black",
    "White",
    "Gray",
    "Brown",
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Pink",
    "Multi",
  ]),
  price: z.coerce.number(),
  imageSRC: z.string(),
});

/** 
 * Fetch a product by ID
 */
export async function fetchProductById(product_id: string) {
  try {
    console.log(`🔍 Fetching product with ID: ${product_id}`);

    const result = await sql`
      SELECT product_id, "productName", "productDesc", category, color, price, "imageSRC", account_id
      FROM products
      WHERE product_id = ${product_id}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      console.warn(`Product with ID ${product_id} not found.`);
      return null;
    }

    console.log(`Found product:`, result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/** 
 * Add a new listing
 */
export async function addListing(formData: FormData) {
  try {
    const parsedData = ListingSchema.parse({
      account_id: formData.get("account_id") as string,
      productName: formData.get("productName") as string,
      productDesc: formData.get("productDesc") as string,
      category: formData.get("category") as string,
      color: formData.get("color") as string,
      price: formData.get("price") as string,
      imageSRC: formData.get("imageSRC") as string,
    });

    const { account_id, productName, productDesc, category, color, price, imageSRC } = parsedData;
    const newProductId = crypto.randomUUID(); // Generate a new UUID

    console.log(`Adding new product with ID: ${newProductId}`);

    await sql`
      INSERT INTO products (product_id, account_id, "productName", "productDesc", category, color, price, "imageSRC")
      VALUES (${newProductId}, ${account_id}, ${productName}, ${productDesc}, ${category}, ${color}, ${price}, ${imageSRC})
    `;

    console.log("Product added successfully");

    revalidatePath(`/dashboard/seller/${account_id}/listings`);
    redirect(`/dashboard/seller/${account_id}/listings`);
  } catch (error) {
    console.error("Error with addListing:", error);
    return { message: "An error occurred while adding the listing." };
  }
}

/** 
 * 🔹 Edit an existing listing
 */
export async function editListing(formData: FormData) {
  try {
    console.log("🔄 Processing editListing...");

    const parsedData = ListingSchema.parse({
      product_id: formData.get("product_id") as string,
      account_id: formData.get("account_id") as string,
      productName: formData.get("productName") as string,
      productDesc: formData.get("productDesc") as string,
      category: formData.get("category") as string,
      color: formData.get("color") as string,
      price: formData.get("price") as string,
      imageSRC: formData.get("imageSRC") as string,
    });

    const { product_id, account_id, productName, productDesc, category, color, price, imageSRC } = parsedData;

    console.log(`Updating product ID: ${product_id} for account: ${account_id}`);

    const result = await sql`
      UPDATE products
      SET "productName" = ${productName}, "productDesc" = ${productDesc}, category = ${category}, color = ${color}, price = ${price}, "imageSRC" = ${imageSRC}
      WHERE product_id = ${product_id} AND account_id = ${account_id}
      RETURNING *
    `;

    if (result.rowCount === 0) {
      throw new Error(`No rows updated. Verify that product_id ${product_id} exists and belongs to account_id ${account_id}.`);
    }

    console.log("Product updated successfully:", result.rows[0]);

    revalidatePath(`/dashboard/seller/${account_id}/listings`);
    redirect(`/dashboard/seller/${account_id}/listings`);
  } catch (error) {
    console.error("Error in editListing:", error);
    return { message: "An error occurred while updating the listing." };
  }
}

/** 
 * Delete a listing
 */
export async function deleteListing(prod_id: string, acct_id: string) {
  try {
    console.log(`Deleting product ID: ${prod_id}`);

    const result = await sql`
      DELETE FROM products WHERE product_id = ${prod_id} AND account_id = ${acct_id}
    `;

    if (result.rowCount === 0) {
      console.warn(`No rows deleted. Verify product ID ${prod_id} exists and belongs to account ID ${acct_id}.`);
      return { message: "No product found to delete." };
    }

    console.log(`Deleted product ID: ${prod_id}`);

    revalidatePath(`/dashboard/seller/${acct_id}/listings`);
    redirect(`/dashboard/seller/${acct_id}/listings`);
  } catch (error) {
    console.error("Error with deleteListing:", error);
    return { message: "An error occurred while deleting the listing." };
  }
}

/** 
 * Fetch all products for a seller
 */
export async function fetchProductsBySeller(account_id: string) {
  try {
    console.log(`🔍 Fetching products for seller ID: ${account_id}`);

    const result = await sql`
      SELECT product_id, "productName", "productDesc", category, color, price, "imageSRC"
      FROM products
      WHERE account_id = ${account_id}
    `;

    console.log(`Found ${result.rows.length} products for seller ${account_id}`);
    return result.rows;
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    return [];
  }
}
