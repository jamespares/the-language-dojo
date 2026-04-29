import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { getDb } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword, createSessionToken } from "../lib/auth";
import type { Env } from "../index";

const app = new Hono<Env>();

app.post("/login", async (c) => {
  const body = await c.req.parseBody();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  
  if (!username || !password) {
    return c.text("Username and password required", 400);
  }
  
  const db = getDb(c.env.DB);
  const user = await db.select().from(users).where(eq(users.username, username)).get();
  
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return c.text("Invalid credentials", 401);
  }
  
  const token = createSessionToken(user.id, c.env.SESSION_SECRET);
  setCookie(c, "session", token, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 60 * 60 * 24 * 7 });
  
  return c.redirect("/dashboard");
});

app.post("/register", async (c) => {
  const body = await c.req.parseBody();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  
  if (!username || !password || password.length < 4) {
    return c.text("Username required and password must be at least 4 characters", 400);
  }
  
  const db = getDb(c.env.DB);
  const existing = await db.select().from(users).where(eq(users.username, username)).get();
  
  if (existing) {
    return c.text("Username already taken", 409);
  }
  
  const passwordHash = await hashPassword(password);
  const result = await db.insert(users).values({ username, passwordHash }).returning().get();
  
  const token = createSessionToken(result.id, c.env.SESSION_SECRET);
  setCookie(c, "session", token, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 60 * 60 * 24 * 7 });
  
  return c.redirect("/dashboard");
});

app.post("/logout", async (c) => {
  deleteCookie(c, "session");
  return c.redirect("/");
});

export default app;
