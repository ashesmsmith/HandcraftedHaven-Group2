// File: app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres"; 
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      account_type,  
      firstName,
      lastName,
      businessName
    } = await request.json();

    // Hash the plaintext password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert row into "accounts"
    // Adjust column names if needed (e.g. use lowercase if your DB folds unquoted identifiers)
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

    // If the account_type is Seller, also insert a default seller profile
    if (account_type === "Seller") {
      const sellerProfileQuery = `
        INSERT INTO seller_profiles
          (profile_id, account_id, story_heading, story, image)
        VALUES
          (uuid_generate_v4(), $1, $2, $3, $4)
      `;
      // Provide default (or empty) values for story_heading and story; image will default if desired.
      const sellerProfileValues = [inserted.account_id, "", "", "/default_profile.webp"];
      await db.query(sellerProfileQuery, sellerProfileValues);
    }

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
