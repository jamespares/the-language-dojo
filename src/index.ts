import { Hono } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

import { getDb } from "./db/client";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword, createSessionToken, parseSessionToken } from "./lib/auth";
import { layout } from "./lib/html";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import nounRoutes from "./routes/nouns";
import subjunctiveRoutes from "./routes/subjunctive";
import verbRoutes from "./routes/verbs";
import reflexiveRoutes from "./routes/reflexive";
import auxiliaryRoutes from "./routes/auxiliary";

export type Env = {
  Bindings: {
    DB: D1Database;
    SESSION_SECRET: string;
  };
  Variables: {
    user: { id: number; username: string } | null;
  };
};

const app = new Hono<Env>();

// Auth middleware
app.use("*", async (c, next) => {
  const token = getCookie(c, "session");
  c.set("user", null);
  if (token) {
    const userId = parseSessionToken(token);
    if (userId) {
      const db = getDb(c.env.DB);
      const user = await db.select().from(users).where(eq(users.id, userId)).get();
      if (user) {
        c.set("user", { id: user.id, username: user.username });
      }
    }
  }
  await next();
});

import { css } from "./css";

// Static files
app.get("/style.css", (c) => {
  return c.text(css, 200, { "Content-Type": "text/css" });
});

// Mount routes
app.route("/auth", authRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/french/nouns", nounRoutes);
app.route("/french/subjunctive", subjunctiveRoutes);
app.route("/french/verbs", verbRoutes);
app.route("/french/reflexive", reflexiveRoutes);
app.route("/french/auxiliary", auxiliaryRoutes);

// Landing page
app.get("/", async (c) => {
  const user = c.get("user");
  if (user) {
    return c.redirect("/dashboard");
  }
  return c.html(layout("Welcome", `
    <div class="hero">
      <h1>🥋 The Language Dojo</h1>
      <p>master languages through high intensity, language hacking methods</p>
      <div class="auth-form">
        <div class="form-card" id="login-form">
          <h2>Login</h2>
          <form method="post" action="/auth/login">
            <input type="text" name="username" placeholder="Username" required class="input" />
            <input type="password" name="password" placeholder="Password" required class="input" />
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <p class="auth-toggle">Don't have an account? <a href="#" onclick="document.getElementById('login-form').style.display='none';document.getElementById('register-form').style.display='block';return false;">Register</a></p>
        </div>
        <div class="form-card" id="register-form" style="display:none">
          <h2>Register</h2>
          <form method="post" action="/auth/register">
            <input type="text" name="username" placeholder="Username" required class="input" />
            <input type="password" name="password" placeholder="Password" required class="input" />
            <button type="submit" class="btn btn-secondary">Register</button>
          </form>
          <p class="auth-toggle">Already have an account? <a href="#" onclick="document.getElementById('register-form').style.display='none';document.getElementById('login-form').style.display='block';return false;">Login</a></p>
        </div>
      </div>
    </div>
  `));
});

// French module selection
app.get("/french", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");
  
  return c.html(layout("French Modules", `
    <div class="modules-grid">
      <h1>French Training Modules</h1>
      <div class="modules">
        <a href="/french/nouns" class="module-card">
          <div class="module-icon">🎭</div>
          <h2>Noun Gender</h2>
          <p>Master masculine and feminine nouns through contextual phrases. Regular rules and tricky exceptions.</p>
        </a>
        <a href="/french/subjunctive" class="module-card">
          <div class="module-icon">🧠</div>
          <h2>Subjunctive Tense</h2>
          <p>Recognise when to use the subjunctive with sentence starters and full contextual options.</p>
        </a>
        <a href="/french/verbs" class="module-card">
          <div class="module-icon">🔗</div>
          <h2>À vs De Verbs</h2>
          <p>Learn which prepositions go with which verbs. See them in context with en, y, and full sentences.</p>
        </a>
        <a href="/french/reflexive" class="module-card">
          <div class="module-icon">🪞</div>
          <h2>Reflexive Verbs</h2>
          <p>Know when a verb needs a reflexive pronoun. True reflexive, idiomatic, and reciprocal uses.</p>
        </a>
        <a href="/french/auxiliary" class="module-card">
          <div class="module-icon">⚡</div>
          <h2>Être vs Avoir</h2>
          <p>Master auxiliary verbs in compound tenses. DR MRS VANDERTRAMP, reflexives, and ambiguous cases.</p>
        </a>
      </div>
    </div>
  `, user));
});

export default app;
