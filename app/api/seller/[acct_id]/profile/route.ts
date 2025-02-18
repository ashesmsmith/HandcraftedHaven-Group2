import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ acct_id?: string | undefined }> }
) {
  const resolvedParams = await params; 
  const acct_id = resolvedParams.acct_id;

  if (!acct_id) {
    return NextResponse.json(
      { error: "Seller ID is required" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const { firstName, lastName, businessName, story_heading, story, image } = body;

    console.log("Updating seller profile for acct_id:", acct_id, body);

    // Make sure parameters are properly typed and used in queries
    const accountsResult = await sql`
      UPDATE accounts
      SET "firstName" = ${firstName},
          "lastName" = ${lastName},
          "businessName" = ${businessName}
      WHERE account_id = ${acct_id}
    `;
    console.log("Accounts update result:", accountsResult.rowCount);

    // Make sure seller_profiles update
    const profilesResult = await sql`
      UPDATE seller_profiles
      SET story_heading = ${story_heading},
          story = ${story},
          image = ${image}
      WHERE account_id = ${acct_id}
    `;
    console.log("Seller profiles update result:", profilesResult.rowCount);

    if (accountsResult.rowCount === 0 && profilesResult.rowCount === 0) {
      return NextResponse.json(
        { error: "No rows were updated. Verify the account exists and data is correct." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating seller profile:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed. Please try again." },
      { status: 500 }
    );
  }
}
