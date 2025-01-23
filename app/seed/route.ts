import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { sellers, products, reviews } from '../lib/placeholder-data';

const client = await db.connect();

async function seedSellers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS sellers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        businessName VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
    `;

    const insertedSellers = await Promise.all(
        sellers.map(async (seller) => {
        const hashedPassword = await bcrypt.hash(seller.password, 10);
        return client.sql`
            INSERT INTO sellers (id, firstName, lastName, businessName, email, password)
            VALUES (${seller.id}, ${seller.firstName}, ${seller.lastName}, ${seller.businessName}, ${seller.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
        }),
    );

    return insertedSellers;
}

async function seedProducts() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        productName VARCHAR (255) NOT NULL,
        productDesc TEXT NOT NULL,
        amount INT NOT NULL,
        imageSRC TEXT NOT NULL
        );
    `;

    const insertedInvoices = await Promise.all(
        invoices.map(
        (invoice) => client.sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedInvoices;
}

async function seedCustomers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
        );
    `;

    const insertedCustomers = await Promise.all(
        customers.map(
        (customer) => client.sql`
            INSERT INTO customers (id, name, email, image_url)
            VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
            ON CONFLICT (id) DO NOTHING;
        `,
        ),
    );

    return insertedCustomers;
}

async function seedRevenue() {
    await client.sql`
        CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
        );
    `;

    const insertedRevenue = await Promise.all(
        revenue.map(
        (rev) => client.sql`
            INSERT INTO revenue (month, revenue)
            VALUES (${rev.month}, ${rev.revenue})
            ON CONFLICT (month) DO NOTHING;
        `,
        ),
    );

    return insertedRevenue;
}

export async function GET() {
        try {
        await client.sql`BEGIN`;
        await seedUsers();
        await seedCustomers();
        await seedInvoices();
        await seedRevenue();
        await client.sql`COMMIT`;
    
        return Response.json({ message: 'Database seeded successfully' });
        } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
        }
}