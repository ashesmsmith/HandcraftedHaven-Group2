// app/lib/products.ts
import { sql } from "@vercel/postgres";

export type Product = {
  product_id: string;
  account_id: string; // seller's account id (matches accounts.account_id)
  productName: string;
  productDesc: string;
  price: number;
  imageSRC: string;
  category: string;
  color?: string;
};

export type Review = {
  review_id: string;
  product_id: string;
  customer_id: string;
  stars: number;
  review: string;
  date: string;
};

export async function fetchProductById(product_id: string): Promise<Product | undefined> {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM products
      WHERE product_id = ${product_id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Error with fetchProductById:", error);
    return undefined;
  }
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM products
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM products
      WHERE category = ${category}
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function fetchProductsBySeller(seller_id: string): Promise<Product[]> {
  try {
    const data = await sql<Product>`
      SELECT *
      FROM products
      WHERE account_id = ${seller_id}
    `;
    return data.rows;
  } catch (error) {
    console.error("Error fetching products by seller:", error);
    return [];
  }
}
