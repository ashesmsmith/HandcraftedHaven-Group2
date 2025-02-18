import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📩 Received Signup Request:", body);

    const { email, password, account_type, firstName, lastName, businessName } = body;

    if (!email || !password || !firstName || !lastName) {
      console.error("Missing required fields!");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    const query = `
      INSERT INTO accounts
        (account_id, account_type, "firstName", "lastName",
         "businessName", tax_id, address, phone, email, password)
      VALUES
        (uuid_generate_v4(), $1, $2, $3, $4, null, 'N/A', 'N/A', $5, $6)
      RETURNING account_id, account_type
    `;
    const values = [account_type, firstName, lastName, businessName, email, hashedPassword];

    console.log("Inserting into DB...");
    const { rows } = await db.query(query, values);
    console.log("Inserted Account:", rows);

    // If Seller, insert into seller_profiles
    if (account_type === "Seller") {
      console.log("🏪 Creating Seller Profile...");
      const sellerProfileQuery = `
        INSERT INTO seller_profiles
          (profile_id, account_id, story_heading, story, image)
        VALUES
          (uuid_generate_v4(), $1, $2, $3, $4)
      `;
      const sellerProfileValues = [rows[0].account_id, "", "", "/default_profile.webp"];
      await db.query(sellerProfileQuery, sellerProfileValues);
      console.log("Seller Profile Created!");
    }

    return NextResponse.json({
      message: "Registration successful",
      acct_id: rows[0].account_id,
      account_type: rows[0].account_type
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
