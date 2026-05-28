import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ authenticated: false });
    const session = await getIronSession<SessionData>(request, response, sessionOptions);

    return NextResponse.json({
      authenticated: !!session.user?.isAdmin,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}