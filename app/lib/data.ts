// File: app/lib/data.ts
// Purpose: Functions to fetch data from database via @vercel/postgres

import { sql } from "@vercel/postgres";
import {
  SellerAccountsTable,
  ProductsTable,
  OrdersTable,
} from "./definitions";

// Fetch an individual Seller Account by ID
export async function fetchSellerAccountById(account_id: string) {
  try {
    // Fully qualify columns: “accounts.account_id” instead of just “account_id”
    const data = await sql<SellerAccountsTable>`
      SELECT *
      FROM accounts
      JOIN seller_profiles ON accounts.account_id = seller_profiles.account_id
      WHERE accounts.account_type = 'Seller'
        AND accounts.account_id = ${account_id}
    `;

    return data.rows;
  } catch (error) {
    console.log("Error with fetchSellerAccountById: ", error);
    throw error; 
  }
}

// Fetch an individual Product by ID
export async function fetchProductById(product_id: string) {
  try {
    // Use “reviews.product_id” to match “products.product_id”
    // Also fully qualify the WHERE clause: “WHERE products.product_id = ${product_id}”
    const data = await sql<ProductsTable>`
      SELECT *
      FROM products
      JOIN reviews ON products.product_id = reviews.product_id
      WHERE products.product_id = ${product_id}
    `;

    return data.rows;
  } catch (error) {
    console.log("Error with fetchProductById: ", error);
    throw error;
  }
}

// Fetch an individual Order by ID
export async function fetchOrderById(order_id: string) {
  try {
    // Fully qualify references to “orders.order_id”
    const data = await sql<OrdersTable>`
      SELECT *
      FROM orders
      JOIN order_products ON orders.order_id = order_products.order_id
      WHERE orders.order_id = ${order_id}
    `;

    return data.rows;
  } catch (error) {
    console.log("Error with fetchOrderById: ", error);
    throw error;
  }
}
