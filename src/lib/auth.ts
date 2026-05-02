import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export type AppUser = {
  id: number;
  username: string;
  email: string | null;
};

const authCache = new WeakMap<object, ReturnType<typeof betterAuth>>();

export function createAuth(env: { DB: D1Database; BETTER_AUTH_SECRET: string; BETTER_AUTH_URL: string; SEND_EMAIL?: SendEmail }) {
  const cached = authCache.get(env);
  if (cached) return cached;

  const auth = betterAuth({
    database: drizzleAdapter(getDb(env.DB), { provider: "sqlite" }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }) => {
        if (!env.SEND_EMAIL) {
          console.warn("SEND_EMAIL binding is missing. Cannot send reset password email.");
          return;
        }

        let EmailMessage: any;
        try {
          const mod = await import("cloudflare:email");
          EmailMessage = mod.EmailMessage;
        } catch {
          console.warn("cloudflare:email module not available. Cannot send reset password email.");
          return;
        }

        const boundary = "boundary-" + crypto.randomUUID();
        const mimeMessage = [
          `To: ${user.email}`,
          `From: noreply@thelanguagedojo.com`,
          `Subject: Reset your password`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/plain; charset="utf-8"`,
          ``,
          `Click the following link to reset your password: ${url}`,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset="utf-8"`,
          ``,
          `<p>Click <a href="${url}">here</a> to reset your password.</p>`,
          ``,
          `--${boundary}--`,
        ].join("\r\n");

        const msg = new EmailMessage(
          "noreply@thelanguagedojo.com",
          user.email,
          mimeMessage
        );

        try {
          await env.SEND_EMAIL.send(msg);
        } catch (e: any) {
          console.error("Failed to send reset password email:", e?.message);
        }
      },
    },
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
  });

  authCache.set(env, auth);
  return auth;
}

export async function getCurrentUser(c: Context): Promise<AppUser | null> {
  const db = getDb(c.env.DB);

  try {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session?.user?.email) return null;

    // Look up bridge user in our app table
    const legacyUser = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .get();

    if (legacyUser) {
      return {
        id: legacyUser.id,
        username: legacyUser.username,
        email: legacyUser.email || session.user.email,
      };
    }

    // Auto-create bridge user for new better-auth accounts
    const username = session.user.name || session.user.email.split("@")[0];
    const [newUser] = await db
      .insert(users)
      .values({
        username,
        email: session.user.email,
        passwordHash: "",
      })
      .returning();

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email || session.user.email,
    };
  } catch {
    return null;
  }
}

export async function logout(c: Context) {
  deleteCookie(c, "better-auth.session_token");
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
