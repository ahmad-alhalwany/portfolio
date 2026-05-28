import bcrypt from "bcryptjs";
export { sessionOptions, type SessionData } from "./session";

export async function verifyPassword(inputPassword: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  const isHashed = /^\$2[aby]\$.{56}$/.test(adminPassword);
  if (isHashed) {
    return bcrypt.compare(inputPassword, adminPassword);
  }

  return inputPassword === adminPassword;
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}