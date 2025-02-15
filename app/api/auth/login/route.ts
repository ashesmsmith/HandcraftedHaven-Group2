// File: app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1. Query the user by email
    const query = `SELECT * FROM accounts WHERE email = $1 LIMIT 1`;
    const { rows } = await db.query(query, [email]);
    if (!rows.length) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    const user = rows[0];
    // user.password => the hashed password in DB

    // 2. Compare typed plaintext with hashed
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // 3. On success, respond with acct_id + account_type
    // (In production, you'd set an HttpOnly cookie or JWT for session)
    return NextResponse.json({
      message: "Login successful",
      acct_id: user.account_id,
      account_type: user.account_type
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
