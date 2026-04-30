import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { getCookie, deleteCookie } from "hono/cookie";
import { parseSessionToken } from "./legacy-auth";

export type AppUser = {
  id: number;
  username: string;
  email: string | null;
};

export function createAuth(env: { DB: D1Database; BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string }) {
  return betterAuth({
    database: drizzleAdapter(getDb(env.DB), { provider: "sqlite" }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
  });
}

export async function getCurrentUser(c: Context): Promise<AppUser | null> {
  const db = getDb(c.env.DB);

  // Try Better Auth session first
  try {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (session?.user) {
      const [legacyUser] = await db.select().from(users).where(eq(users.email, session.user.email));
      if (legacyUser) {
        return { id: legacyUser.id, username: legacyUser.username, email: legacyUser.email };
      }
      // Create legacy user for this Better Auth user
      const [newUser] = await db.insert(users).values({
        username: session.user.email,
        email: session.user.email,
        passwordHash: "",
      }).returning();
      return { id: newUser.id, username: newUser.username, email: newUser.email };
    }
  } catch {
    // Fall through to legacy
  }

  // Legacy session fallback
  const token = getCookie(c, "session");
  if (!token) return null;

  const userId = parseSessionToken(token);
  if (!userId) return null;

  const user = await db.select().from(users).where(eq(users.id, userId)).get();
  if (!user) return null;

  return { id: user.id, username: user.username, email: user.email };
}

export async function logout(c: Context) {
  deleteCookie(c, "better-auth.session_token");
  deleteCookie(c, "session");
}

export function authMiddleware() {
  return async (c: Context, next: () => Promise<void>) => {
    const user = await getCurrentUser(c);
    if (!user) {
      return c.redirect("/");
    }
    c.set("user", user);
    await next();
  };
}

declare module "hono" {
  interface ContextVariableMap {
    user: AppUser | null;
  }
}
