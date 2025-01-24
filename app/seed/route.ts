import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { sellers, products, customers, orders, reviews } from '../lib/placeholder-data';

const client = await db.connect();

async function seedSellers() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS sellers (
        seller_id PRIMARY KEY NOT NULL AUTO_INCREMENT,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        businessName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
    `;

    const insertedSellers = await Promise.all(
        sellers.map(async (seller) => {
        const hashedPassword = await bcrypt.hash(seller.password, 10);
        return client.sql`
            INSERT INTO sellers (id, firstName, lastName, businessName, email, password)
            VALUES (${seller.seller_id}, ${seller.firstName}, ${seller.lastName}, ${seller.businessName}, ${seller.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    return insertedSellers;
}

async function seedProducts() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        productName VARCHAR (255) NOT NULL,
        productDesc TEXT NOT NULL,
        price INT NOT NULL,
        imageSRC TEXT NOT NULL
        );
    `;

    const insertedProducts = await Promise.all(
        products.map(
        (product) => client.sql`
            INSERT INTO products (id, productName, productDesc, price, imageSRC)
            VALUES (${product.id}, ${product.productName}, ${product.productDesc}, ${product.price}, ${product.imageSRC})
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedProducts;
}

async function seedReviews() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        prodId NOT NULL,
        customerName VARCHAR(255) NOT NULL,
        stars INT NOT NULL,
        date VARCHAR(255) NOT NULL
        );
    `;

    const insertedReviews = await Promise.all(
        reviews.map(
        (review) => client.sql`
            INSERT INTO customers (id, prodId, customerName, stars, review, date)
            VALUES (${review.id}, ${review.prodId}, ${review.customerName}, ${review.stars}, ${review.review}, ${review.date})
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedReviews;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedSellers();
        await seedProducts();
        await seedReviews();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}
