import { Hono } from "hono";
import { layout } from "../lib/html";
import type { Env } from "../index";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");
  
  return c.html(layout("Dashboard", `
    <div class="dashboard">
      <h1>Welcome back, ${user.username}!</h1>
      <p class="subtitle">Choose a language to practice:</p>
      <div class="language-grid">
        <a href="/french" class="language-card">
          <div class="flag">🇫🇷</div>
          <h2>French</h2>
          <p>5 modules available</p>
        </a>
        <div class="language-card disabled">
          <div class="flag">🇨🇳</div>
          <h2>Chinese</h2>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  `, user));
});

export default app;
