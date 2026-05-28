import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password:
    process.env.IRON_SESSION_PASSWORD ||
    "fallback_password_change_this_in_production",
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
