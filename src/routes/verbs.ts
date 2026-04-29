import { Hono } from "hono";
import { getDb } from "../db/client";
import { verbItems } from "../content/verbs";
import { gameLayout } from "../lib/html";
import { recordAnswer } from "../lib/game";
import type { Env } from "../index";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const index = parseInt(c.req.query("index") || "0", 10);
  const seed = user.id + 200;
  const shuffled = [...verbItems].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * seed) % 1000;
    const hashB = (b.id.charCodeAt(0) * seed) % 1000;
    return hashA - hashB;
  });

  const item = shuffled[index % shuffled.length];
  const total = shuffled.length;

  return c.html(gameLayout("À vs De Verbs", `
    <div class="game-progress">Question ${index + 1} of ${total}</div>
    <div class="question-card">
      <h2 class="verb">${item.verb}</h2>
      <p class="context">${item.context}</p>
      <p class="prompt">Which sentence is correct?</p>
      <form method="post" action="/french/verbs/answer" class="options">
        ${item.options.map((opt, i) => `
          <button type="submit" name="answer" value="${opt}" class="option-btn sentence-option">
            ${opt}
          </button>
        `).join("")}
        <input type="hidden" name="itemId" value="${item.id}" />
        <input type="hidden" name="index" value="${index}" />
      </form>
    </div>
  `, user));
});

app.post("/answer", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const body = await c.req.parseBody();
  const itemId = String(body.itemId);
  const answer = String(body.answer);
  const index = parseInt(String(body.index), 10);

  const item = verbItems.find(v => v.id === itemId);
  if (!item) return c.redirect("/french/verbs");

  const correct = answer === item.correct;
  const db = getDb(c.env.DB);
  await recordAnswer(db, user.id, "verbs", itemId, correct);

  return c.html(gameLayout("À vs De Verbs", `
    <div class="feedback ${correct ? "correct" : "incorrect"}">
      <div class="feedback-icon">${correct ? "✅" : "❌"}</div>
      <h2>${correct ? "Correct!" : "Not quite"}</h2>
      <p class="verb">${item.verb}</p>
      <p class="the-phrase">${item.correct}</p>
      <p class="category-tag">Category: ${item.category}</p>
      <div class="actions">
        <a href="/french/verbs?index=${index + 1}" class="btn btn-primary">Next Question →</a>
      </div>
    </div>
  `, user));
});

export default app;
