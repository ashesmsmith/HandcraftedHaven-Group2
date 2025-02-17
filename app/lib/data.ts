// Import dependencies
import { sql } from '@vercel/postgres';
import { SellerAccountsTable, ProductsTable, OrdersTable, Review } from './definitions';

// Fetch Individual Seller Account Data by ID
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
export async function fetchProductById(product_id: string): Promise<ProductsTable | null> {
    try {
        
        const data = await sql<ProductsTable>`
            SELECT 
                product_id, 
                account_id, 
                "productName", 
                "productDesc", 
                category, 
                price::double precision AS price, 
                "imageSRC"
            FROM products
            WHERE product_id = ${product_id}
            LIMIT 1;
        `;

        if (!data.rows.length) {
            console.warn(`⚠️ No product found for ID: ${product_id}`);
            return null;  // Explicitly handle cases where no product is found
        }

        return data.rows[0];
    } catch (error) {
        console.error("Error fetching product by ID:", error);
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

  // Fetch Reviews for a Product
export async function fetchReviewsByProductId(product_id: string): Promise<Review[]> {
    try {
        const result = await sql<Review>`
            SELECT product_id, account_id, stars, review, date
            FROM reviews
            WHERE product_id = ${product_id}
            ORDER BY date DESC;
        `;

        return result.rows;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
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



// Fetch all product IDs for `generateStaticParams`
export async function fetchAllProducts(): Promise<{ product_id: string }[]> {
  try {
    const result = await sql<{ product_id: string }>`SELECT product_id FROM products`;
    return result.rows;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}


