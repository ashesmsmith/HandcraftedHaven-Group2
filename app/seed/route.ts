import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { accounts, products, orders, reviews } from '../lib/placeholder-data';

const client = await db.connect();

async function seedAccounts() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS accounts (
        account_id PRIMARY KEY AUTO_INCREMENT NOT NULL,
        account_type ENUM('Admin', 'Seller', 'Customer') NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        businessName VARCHAR(255),
        address TEXT NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        );
    `;

    const insertedAccounts = await Promise.all(
        accounts.map(async (account) => {
        const hashedPassword = await bcrypt.hash(account.password, 10);
        return client.sql`
            INSERT INTO sellers (id, account_type, firstName, lastName, businessName, address, phone, email, password)
            VALUES (
                ${account.account_id},
                ${account.account_type},
                ${account.firstName}, 
                ${account.lastName}, 
                ${account.businessName}, 
                ${account.address},
                ${account.phone},
                ${account.email}, 
                ${hashedPassword}
            )
            ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    return insertedAccounts;
}

async function seedProducts() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS products (
        product_id PRIMARY KEY NOT NULL AUTO_INCREMENT,
        account_id INT NOT NULL,
        productName VARCHAR(255) NOT NULL,
        productDesc TEXT NOT NULL,
        category ENUM('Pottery', 'Clothing', 'Jewelry', 'Stickers', 'Woodworking') NOT NULL,
        color ENUM('Black', 'White', 'Gray', 'Brown', 'Red', Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink') NOT NULL,
        price DECIMAL(65,2) NOT NULL,
        imageSRC TEXT NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(account_id)
        );
    `;

    const insertedProducts = await Promise.all(
        products.map(
        (product) => client.sql`
            INSERT INTO products (product_id, account_id, productName, productDesc, category, color, price, imageSRC)
            VALUES (
                ${product.product_id}, 
                ${product.account_id},
                ${product.productName}, 
                ${product.productDesc}, 
                ${product.category},
                ${product.color},
                ${product.price}, 
                ${product.imageSRC},
            )
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedProducts;
}

async function seedOrders() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS orders (
        order_id PRIMARY KEY NOT NULL AUTO_INCREMENT,
        account_id INT NOT NULL,
        date DATE NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        total DECIMAL(65,4) NOT NULL,
        shipping DECIMAL(65,2),
        tax DECIMAL(65,2),
        final_total DECIMAL(65,2) NOT NULL,
        status ENUM('processed', 'shipped', 'canceled') NOT NULL,
        FOREIGN KEY (account_id) REFERENCES accounts(account_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        );
    `;

    const insertedOrders = await Promise.all(
        orders.map(
        (order) => client.sql`
            INSERT INTO customers (order_id, account_id, date, product_id, quantity, shipping, tax, final_total, status)
            VALUES (
                ${order.order_id}, 
                ${order.account_id}, 
                ${order.date}, 
                ${order.product_id},
                ${order.quantity},
                ${order.shipping},
                ${order.tax},
                ${order.final_total},
                ${order.status},
            )
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedOrders;
}

async function seedReviews() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS reviews (
        review_id PRIMARY KEY NOT NULL AUTO_INCREMENT,
        product_id INT NOT NULL,
        account_id INT NOT NULL,
        stars INT NOT NULL,
        review TEXT,
        date DATE NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (account_id) REFERENCE accounts(account_id),
        );
    `;

    const insertedReviews = await Promise.all(
        reviews.map(
        (review) => client.sql`
            INSERT INTO customers (review_id, product_id, account_id, stars, review, date)
            VALUES (
                ${review.review_id}, 
                ${review.product_id},
                ${review.account_id},
                ${review.stars}, 
                ${review.review}, 
                ${review.date}
            )
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedReviews;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedAccounts();
        await seedProducts();
        await seedOrders();
        await seedReviews();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}
