import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "./session";

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  try {
    const response = NextResponse.next();
    const session = await getIronSession<SessionData>(request, response, sessionOptions);
    return Boolean(session.user?.isAdmin);
  } catch {
    return false;
  }
}
