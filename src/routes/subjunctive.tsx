/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { getDb } from "../db/client";
import { subjunctiveItems } from "../content/subjunctive";
import { GameLayout } from "../components/Layout";
import { recordAnswer } from "../lib/game";
import type { AppUser } from "../lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings; Variables: { user: AppUser } }>();

app.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const index = parseInt(c.req.query("index") || "0", 10);
  const seed = user.id + 100;
  const shuffled = [...subjunctiveItems].sort((a, b) => {
    const hashA = (a.id.charCodeAt(0) * seed) % 1000;
    const hashB = (b.id.charCodeAt(0) * seed) % 1000;
    return hashA - hashB;
  });

  const item = shuffled[index % shuffled.length];
  const total = shuffled.length;

  return c.html(
    <GameLayout title="Subjunctive Tense" user={user}>
      <div class="game-progress">Question {index + 1} of {total}</div>
      <div class="question-card">
        <h2 class="starter">{item.starter} ...</h2>
        <p class="prompt">Which sentence is correct?</p>
        <form method="post" action="/french/subjunctive/answer" class="options">
          {item.options.map((opt) => (
            <button type="submit" name="answer" value={opt} class="option-btn sentence-option">
              {opt}
            </button>
          ))}
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="index" value={String(index)} />
        </form>
      </div>
    </GameLayout>
  );
});

app.post("/answer", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const body = await c.req.parseBody();
  const itemId = String(body.itemId);
  const answer = String(body.answer);
  const index = parseInt(String(body.index), 10);

  const item = subjunctiveItems.find((s) => s.id === itemId);
  if (!item) return c.redirect("/french/subjunctive");

  const correct = answer === item.correct;
  const db = getDb(c.env.DB);
  await recordAnswer(db, user.id, "subjunctive", itemId, correct);

  return c.html(
    <GameLayout title="Subjunctive Tense" user={user}>
      <div class={`feedback ${correct ? "correct" : "incorrect"}`}>
        <div class="feedback-icon">{correct ? "✅" : "❌"}</div>
        <h2>{correct ? "Correct!" : "Not quite"}</h2>
        <p class="starter">{item.starter}</p>
        <p class="the-phrase">{item.correct}</p>
        <p class="category-tag">Category: {item.category}</p>
        <div class="actions">
          <a href={`/french/subjunctive?index=${index + 1}`} class="btn btn-primary">
            Next Question →
          </a>
        </div>
      </div>
    </GameLayout>
  );
});

export default app;
