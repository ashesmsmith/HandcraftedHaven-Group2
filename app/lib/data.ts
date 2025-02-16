// app/lib/data.ts

// Import dependencies
import { sql } from '@vercel/postgres';
import { SellerAccountsTable, ProductsTable, OrdersTable, Review } from './definitions';

// Fetch Individual Seller Account Data from Database
export async function fetchSellerAccountById(account_id: string) {
    try {
        const data = await sql<SellerAccountsTable>`
            SELECT * FROM "accounts"
            JOIN "seller_profiles" ON "accounts".account_id = "seller_profiles".account_id
            WHERE "accounts".account_type = 'Seller' AND "accounts".account_id = ${account_id}
        `;
        return data.rows;
    } catch (error) {
        console.error('❌ Error with fetchSellerAccountById:', error);
        throw error;
    }
}

// Fetch Individual Product Data from Database
export async function fetchProductById(product_id: string): Promise<ProductsTable | null> {
    try {
        console.log(`🛠 Fetching product from database with ID: ${product_id}`);
        const data = await sql<ProductsTable>`
          SELECT product_id, account_id, "productName", "productDesc", category, price::double precision AS price, "imageSRC"
          FROM products
          WHERE product_id = ${product_id}
          LIMIT 1;
        `;
        return data.rows[0] ?? null; // Return the first row or null if no product is found
    } catch (error) {
        console.error("❌ Error fetching product by ID:", error);
        throw error;
    }
}

// Fetch Reviews for a Product
export async function fetchReviewsByProductId(product_id: string): Promise<Review[]> {
    try {
        const data = await sql<Review>`
            SELECT product_id, account_id, stars, review
            FROM reviews
            WHERE product_id = ${product_id}
            ORDER BY stars DESC;
        `;
        return data.rows.length > 0 ? data.rows : []; // Returns an array of reviews (without date)
    } catch (error) {
        console.error("❌ Error fetching reviews:", error);
        return [];
    }
}

// Fetch Individual Order Data from Database
export async function fetchOrderById(order_id: string) {
    try {
        const data = await sql<OrdersTable[]>`
            SELECT * FROM "orders"
            JOIN "order_products" ON "orders".order_id = "order_products".order_id
            WHERE "orders".order_id = ${order_id}
        `;
        return data.rows;
    } catch (error) {
        console.error('❌ Error with fetchOrderById:', error);
        throw error;
    }
}

// Fetch Average Rating for a Product
export async function calculateAverageRating(product_id: string): Promise<number> {
    try {
        const data = await sql`
            SELECT AVG(stars) AS average FROM "reviews"
            WHERE product_id = ${product_id};
        `;
        const result = data.rows[0]?.average; // Extract the average rating
        return result !== null && result !== undefined ? parseFloat(result) : 0; // Ensure a number is returned
    } catch (error) {
        console.error("❌ Error calculating average rating:", error);
        throw error;
    }
}
