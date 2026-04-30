/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { getDb } from "../db/client";
import { nouns } from "../content/nouns";
import { GameLayout } from "../components/Layout";
import { recordAnswer, getMistakeItemIds, seededShuffle, shuffleArray } from "../lib/game";
import type { AppUser } from "../lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings; Variables: { user: AppUser } }>();

// Mode selection
app.get("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  return c.html(
    <GameLayout title="Noun Gender" user={user}>
      <div class="mode-selection">
        <p class="instructions">Choose your training mode:</p>
        <div class="modes">
          <a href="/french/nouns/play?mode=regular" class="mode-btn">
            <h3>Regular Nouns</h3>
            <p>Nouns that follow the gender suffix rules</p>
          </a>
          <a href="/french/nouns/play?mode=exceptions" class="mode-btn">
            <h3>Exceptions</h3>
            <p>The most commonly mistaken nouns</p>
          </a>
          <a href="/french/nouns/play?mode=review" class="mode-btn">
            <h3>Review Mistakes</h3>
            <p>Items you need to review (must get right twice)</p>
          </a>
        </div>
      </div>
    </GameLayout>
  );
});

// Play game
app.get("/play", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const mode = c.req.query("mode") || "regular";
  const index = parseInt(c.req.query("index") || "0", 10);

  let pool = nouns;
  if (mode === "regular") pool = nouns.filter((n) => n.type === "regular");
  else if (mode === "exceptions") pool = nouns.filter((n) => n.type === "exception");
  else if (mode === "review") {
    const db = getDb(c.env.DB);
    const mistakeIds = await getMistakeItemIds(db, user.id, "nouns");
    pool = nouns.filter((n) => mistakeIds.includes(n.id));
    if (pool.length === 0) {
      return c.html(
        <GameLayout title="Noun Gender" user={user}>
          <div class="game-complete">
            <h2>🎉 No mistakes to review!</h2>
            <p>You've cleared all your review items. Great job!</p>
            <a href="/french/nouns" class="btn btn-primary">Back to Modes</a>
          </div>
        </GameLayout>
      );
    }
  }

  const seed = user.id + (mode === "regular" ? 1 : mode === "exceptions" ? 2 : 3);
  const shuffled = seededShuffle(pool, seed);

  const item = shuffled[index % shuffled.length];
  const total = shuffled.length;

  return c.html(
    <GameLayout title="Noun Gender" user={user}>
      <div class="game-progress">
        Question {index + 1} of {total} — Mode: {mode}
      </div>
      <div class="question-card">
        <h2 class="noun">{item.noun}</h2>
        <p class="prompt">Which phrase is correct?</p>
        <form method="post" action="/french/nouns/answer" class="options">
          {shuffleArray(item.options).map((opt) => (
            <button type="submit" name="answer" value={opt} class="option-btn">
              {opt}
            </button>
          ))}
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="mode" value={mode} />
          <input type="hidden" name="index" value={String(index)} />
        </form>
      </div>
    </GameLayout>
  );
});

// Submit answer
app.post("/answer", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  const body = await c.req.parseBody();
  const itemId = String(body.itemId);
  const answer = String(body.answer);
  const mode = String(body.mode);
  const index = parseInt(String(body.index), 10);

  const item = nouns.find((n) => n.id === itemId);
  if (!item) return c.redirect("/french/nouns");

  const correct = answer === item.phrase;
  const db = getDb(c.env.DB);
  await recordAnswer(db, user.id, "nouns", itemId, correct);

  return c.html(
    <GameLayout title="Noun Gender" user={user}>
      <div class={`feedback ${correct ? "correct" : "incorrect"}`}>
        <div class="feedback-icon">{correct ? "✅" : "❌"}</div>
        <h2>{correct ? "Correct!" : "Not quite"}</h2>
        <p class="the-phrase">{item.phrase}</p>
        <p class="gender-tag">
          {item.gender === "m" ? "Masculine" : "Feminine"} — {item.type === "regular" ? "Regular" : "Exception"}
        </p>
        <div class="rule-box">
          <strong>Rule:</strong> {item.rule}
        </div>
        <div class="actions">
          <a href={`/french/nouns/play?mode=${mode}&index=${index + 1}`} class="btn btn-primary">
            Next Question →
          </a>
          <a href="/french/nouns" class="btn btn-secondary">
            Change Mode
          </a>
        </div>
      </div>
    </GameLayout>
  );
});

export default app;
