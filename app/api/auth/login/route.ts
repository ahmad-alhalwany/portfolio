import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, verifyPassword } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/security-server";

export async function POST(request: NextRequest) {
  try {
    const rate = await enforceRateLimit(request, "login");
    if (!rate.ok) {
      return NextResponse.json(
        { success: false, message: rate.message },
        { status: 429 }
      );
    }

    const { password } = await request.json();

    if (!password || typeof password !== "string" || password.length > 256) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const isValid = await verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    const session = await getIronSession<SessionData>(request, response, sessionOptions);

    session.user = {
      id: "admin",
      isAdmin: true,
    };

    await session.save();

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
