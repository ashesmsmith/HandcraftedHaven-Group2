import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { accounts, products, orders, reviews, order_products } from '../lib/placeholder-data';

const client = await db.connect();

async function checkIfTypeExists(typeName: string, typeDefinition: string): Promise<void> {
  await client.sql`
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = ${typeName}) THEN
            EXECUTE 'CREATE TYPE ' || ${typeName} || ' AS ENUM (' || ${typeDefinition} || ')';
        END IF;
    END;
    $$;
  `;
}

async function seedAccounts() {
  await checkIfTypeExists('acct-type', "'Admin', 'Seller', 'Customer'");

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Use DEFAULT 'Customer' instead of DEFAULT('Customer')
  await client.sql`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      account_type acct_type NOT NULL DEFAULT 'Customer',
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      businessName VARCHAR(255) NULL,
      tax_id INT NULL,
      address TEXT NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedAccounts = await Promise.all(
    accounts.map(async (account) => {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      return client.sql`
        INSERT INTO accounts(
          account_id, 
          account_type, 
          firstName, 
          lastName, 
          businessName, 
          tax_id, 
          address, 
          phone, 
          email, 
          password
        )
        VALUES (
          ${account.account_id},
          ${account.account_type},
          ${account.firstName},
          ${account.lastName},
          ${account.businessName},
          ${account.tax_id},
          ${account.address},
          ${account.phone},
          ${account.email},
          ${hashedPassword}
        )
        ON CONFLICT (account_id) DO NOTHING;
      `;
    }),
  );

  return insertedAccounts;
}

async function seedProducts() {
  await checkIfTypeExists('category_type', "'Pottery', 'Clothing', 'Jewelry', 'Stickers', 'Woodworking', 'Other'");
  await checkIfTypeExists('color_type', "'Black', 'White', 'Gray', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Pink', 'Multi'");

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Use DEFAULT 'Other' and DEFAULT 'White'
  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      product_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      account_id UUID NOT NULL,
      productName VARCHAR(255) NOT NULL,
      productDesc TEXT NOT NULL,
      category category_type NOT NULL DEFAULT 'Other',
      color color_type NOT NULL DEFAULT 'White',
      price DECIMAL(20,2) NOT NULL,
      imageSRC TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
  `;

  const insertedProducts = await Promise.all(
    products.map((product) => client.sql`
      INSERT INTO products (
        product_id,
        account_id,
        productName,
        productDesc,
        category,
        color,
        price,
        imageSRC
      )
      VALUES (
        ${product.product_id},
        ${product.account_id},
        ${product.productName},
        ${product.productDesc},
        ${product.category},
        ${product.color},
        ${product.price},
        ${product.imageSRC}
      )
      ON CONFLICT (product_id) DO NOTHING;
    `),
  );

  return insertedProducts;
}

async function seedOrders() {
  await checkIfTypeExists('status_type', "'Processed', 'Shipped', 'Canceled'");

  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Use DEFAULT 'Processed'
  await client.sql`
    CREATE TABLE IF NOT EXISTS orders (
      order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      account_id UUID NOT NULL,
      date DATE DEFAULT CURRENT_DATE,
      shipping DECIMAL(20,2),
      tax DECIMAL(20,2),
      final_total DECIMAL(20,2) NOT NULL,
      status status_type NOT NULL DEFAULT 'Processed',
      FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
  `;

  const insertedOrders = await Promise.all(
    orders.map((order) => client.sql`
      INSERT INTO orders (
        order_id,
        account_id,
        date,
        shipping,
        tax,
        final_total,
        status
      )
      VALUES (
        ${order.order_id},
        ${order.account_id},
        ${order.date}::DATE,
        ${order.shipping},
        ${order.tax},
        ${order.final_total},
        ${order.status}
      )
      ON CONFLICT (order_id) DO NOTHING;
    `),
  );

  return insertedOrders;
}

async function seedOrder_Products() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS order_products (
      order_id UUID NOT NULL,
      product_id UUID NOT NULL,
      price DECIMAL(20,2),
      quantity INT NOT NULL,
      total DECIMAL(20,2),
      PRIMARY KEY (order_id, product_id),
      FOREIGN KEY (order_id) REFERENCES orders(order_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `;

  const insertedOrder_Products = await Promise.all(
    order_products.map((order_product) => client.sql`
      INSERT INTO order_products (
        order_id,
        product_id,
        price,
        quantity,
        total
      )
      VALUES (
        ${order_product.order_id},
        ${order_product.product_id},
        ${order_product.price},
        ${order_product.quantity},
        ${order_product.total}
      )
      ON CONFLICT (order_id, product_id) DO NOTHING;
    `),
  );

  return insertedOrder_Products;
}

async function seedReviews() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      product_id UUID NOT NULL,
      account_id UUID NOT NULL,
      stars INT NOT NULL,
      review TEXT,
      date DATE NOT NULL,
      PRIMARY KEY (product_id, account_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id),
      FOREIGN KEY (account_id) REFERENCES accounts(account_id)
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map((review) => client.sql`
      INSERT INTO reviews (
        product_id,
        account_id,
        stars,
        review,
        date
      )
      VALUES (
        ${review.product_id},
        ${review.account_id},
        ${review.stars},
        ${review.review},
        ${review.date}::DATE
      )
      ON CONFLICT (product_id, account_id) DO NOTHING;
    `),
  );

  return insertedReviews;
}

export async function GET() {
  try {
    // Start transaction
    await client.sql`BEGIN`;
    await seedAccounts();
    await seedProducts();
    await seedOrders();
    await seedOrder_Products();
    await seedReviews();
    // Commit transaction
    await client.sql`COMMIT`;

    return new Response(
      JSON.stringify({ message: 'Database seeded successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error Seeding Database: ', error);
    // Roll back transaction
    await client.sql`ROLLBACK`;

    return new Response(JSON.stringify({ error, status: 500 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}