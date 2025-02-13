// Functions to fetch data from database

import { sql } from '@vercel/postgres';
import { 
    SellerAccountsTable,
    ProductsTable,
    OrdersTable
} from './definitions';

// Fetch Individual Seller Account Data from Database
export async function fetchSellerAccountById(account_id: string) {
    try {
        const data = await sql<SellerAccountsTable>`
            SELECT * FROM accounts 
            JOIN seller_profiles ON accounts.account_id = seller_profiles.account_id
            WHERE account_type = 'Seller' AND account_id = ${account_id}
        `;

        return data.rows;
    } catch (error) {
        console.log('Error with fetchSellerAccountById: ', error);
    }
}

// Fetch Individual Product Data from Database
export async function fetchProductById(product_id: string) {
    try {
        const data = await sql<ProductsTable>`
            SELECT * FROM products 
            JOIN reviews ON products.product_id = reviews.product.id
            WHERE product_id = ${product_id}
        `;

        return data.rows;
    } catch (error) {
        console.log('Error with fetchProductById: ', error);
    }
}

// Fetch Individual Order Data from Database
export async function fetchOrderById(order_id: string) {
    try {
        const data = await sql<OrdersTable>`
            SELECT * FROM orders 
            JOIN order_products ON order.order_id = order_products.order_id
            WHERE order_id = ${order_id}
        `;

        return data.rows;
    } catch (error) {
        console.log('Error with fetchOrderById: ', error);
    }
}
