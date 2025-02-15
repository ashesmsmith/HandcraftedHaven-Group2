// File: app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres"; // Or your existing import
import bcrypt from "bcrypt";

// Minimal example. For production, you'd add more checks, handle duplicates, etc.
export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      account_type,   // e.g. "Seller" or "Customer"
      firstName,
      lastName,
      businessName
    } = await request.json();

    // 1. Hash the plaintext password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert row into "accounts"
    // NOTE: "accounts.account_id" must be qualified if you do a join,
    // but here we just do a single table insert.
    // Also ensure your schema columns match these. If your table has "firstname" and not "firstName", adjust as needed.
    const query = `
      INSERT INTO accounts
        (account_id, account_type, firstname, lastname,
         businessname, tax_id, address, phone, email, password)
      VALUES
        (uuid_generate_v4(), $1, $2, $3,
         $4, null, 'N/A', 'N/A', $5, $6)
      RETURNING account_id, account_type
    `;
    const values = [account_type, firstName, lastName, businessName, email, hashedPassword];
    const { rows } = await db.query(query, values);
    const inserted = rows[0];

    return NextResponse.json({
      message: "Registration successful",
      acct_id: inserted.account_id,
      account_type: inserted.account_type
    });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
