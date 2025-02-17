import bcrypt from "bcryptjs";
import { db } from "@vercel/postgres";
import { accounts, products, orders, order_products } from "@/lib/placeholder-data";

// Connect once (for this route)
const client = await db.connect();

await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

/**
 * CREATE TYPE acct_type AS ENUM ('Admin','Seller','Customer')
 */
async function checkIfTypeExists(typeName: string, typeDefEscaped: string) {
  const sql = `
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${typeName}') THEN
        EXECUTE 'CREATE TYPE ${typeName} AS ENUM (${typeDefEscaped})';
      END IF;
    END;
    $$;
  `;
  await client.query(sql);
}

async function seedAccounts() {
  await checkIfTypeExists("acct_type", "''Admin'',''Seller'',''Customer''");

  await client.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      account_type acct_type NOT NULL DEFAULT 'Customer',
      "firstName" VARCHAR(100) NOT NULL,  -- Enforced Case Sensitivity
      "lastName" VARCHAR(100) NOT NULL,
      "businessName" VARCHAR(255) NULL,
      tax_id INT NULL,
      address TEXT NOT NULL,
      phone VARCHAR(15) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  for (const account of accounts) {
    const hashedPassword = await bcrypt.hash(account.password, 10);
    await client.query(
      `INSERT INTO accounts (account_id, account_type, "firstName", "lastName", "businessName", tax_id, address, phone, email, password)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (account_id) DO NOTHING;`,
      [account.account_id, account.account_type, account.firstName, account.lastName, account.businessName, account.tax_id, account.address, account.phone, account.email, hashedPassword]
    );
  }
}
