import { SessionOptions } from "iron-session";

export function getIronSessionPassword(): string {
  return (
    process.env.IRON_SESSION_PASSWORD?.trim() ||
    "fallback_password_change_this_in_production"
  );
}

export function validateIronSessionPassword(): string | null {
  const password = getIronSessionPassword();
  if (password.length < 32) {
    return "IRON_SESSION_PASSWORD must be at least 32 characters on the server.";
  }
  if (password === "fallback_password_change_this_in_production") {
    return "IRON_SESSION_PASSWORD is not configured on the server.";
  }
  return null;
}

export const sessionOptions: SessionOptions = {
  password: getIronSessionPassword(),
  cookieName: "portfolio_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  },
};

export interface SessionData {
  user?: {
    id: string;
    isAdmin: boolean;
  };
}
