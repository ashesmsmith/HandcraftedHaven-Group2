import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

type ProfileRouteContext = {
  params: Promise<{ acct_id: string }>;
};

export async function PUT(request: Request, { params }: ProfileRouteContext) {
  // Await the dynamic params
  const { acct_id } = await params;

  try {
    if (!acct_id) {
      return NextResponse.json({ error: "Missing account ID." }, { status: 400 });
    }

    const body = await request.json();
    const { firstName, lastName, businessName, story_heading, story, image } = body;

    // Validate required fields 
    if (!firstName || !lastName || !businessName || !story_heading || !story) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    console.log("Updating seller profile for:", acct_id);
    console.log("Data received:", body);

    // Determine the image URL (if none provided, use default)
    const imageURL =
      image && image.trim() !== "" ? image : "/default_profile.webp";

    // Begin manual transaction
    await sql`BEGIN`;

    // Update accounts table
    await sql`
      UPDATE accounts
      SET
        firstname    = ${firstName},
        lastname     = ${lastName},
        businessname = ${businessName}
      WHERE account_id = ${acct_id};
    `;

    // Update seller_profiles table
    const result = await sql`
      UPDATE seller_profiles
      SET
        story_heading = ${story_heading},
        story         = ${story},
        image         = ${imageURL}
      WHERE account_id = ${acct_id}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      await sql`ROLLBACK`;
      return NextResponse.json(
        { error: "No matching seller profile found." },
        { status: 404 }
      );
    }

    await sql`COMMIT`;

    return NextResponse.json(
      { message: "Profile updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating seller profile:", error);
    await sql`ROLLBACK`;
    return NextResponse.json(
      { error: "Update failed. Please try again." },
      { status: 500 }
    );
  }
}
