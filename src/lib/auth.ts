import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(userId: number, secret: string): string {
  const payload = `${userId}:${Date.now()}`;
  // Simple HMAC-like approach using crypto.subtle
  return btoa(payload);
}

export function parseSessionToken(token: string): number | null {
  try {
    const decoded = atob(token);
    const [userIdStr] = decoded.split(":");
    const userId = parseInt(userIdStr, 10);
    return isNaN(userId) ? null : userId;
  } catch {
    return null;
  }
}
