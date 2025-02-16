// app/api/seller/[acct_id]/profile/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(
  request: Request,
  { params }: { params: { acct_id: string } }
) {
  const { acct_id } = params;
  try {
    const body = await request.json();
    const { firstName, lastName, businessName, story_heading, story, image } = body;
    
    console.log("Updating seller profile for acct_id:", acct_id, body);

    // Note the quoted column names for accounts
    const accountsResult = await sql`
      UPDATE accounts
      SET "firstName" = ${firstName},
          "lastName" = ${lastName},
          "businessName" = ${businessName}
      WHERE account_id = ${acct_id}
    `;
    console.log("Accounts update result:", accountsResult.rowCount);

    // Update the seller_profiles table (assuming these columns are stored in lowercase)
    const profilesResult = await sql`
      UPDATE seller_profiles
      SET story_heading = ${story_heading},
          story = ${story},
          image = ${image}
      WHERE account_id = ${acct_id}
    `;
    console.log("Seller profiles update result:", profilesResult.rowCount);

    if (accountsResult.rowCount === 0 || profilesResult.rowCount === 0) {
      throw new Error("No rows were updated. Verify the account exists and data is correct.");
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating seller profile:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed. Please try again." },
      { status: 500 }
    );
  }
}
