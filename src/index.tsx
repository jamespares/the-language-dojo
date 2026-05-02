/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { getDb } from "./db/client";
import { createAuth, getCurrentUser, logout } from "./lib/auth";
import { Layout } from "./components/Layout";
import loginRoutes from "./routes/login";
import dashboardRoutes from "./routes/dashboard";
import nounRoutes from "./routes/nouns";
import subjunctiveRoutes from "./routes/subjunctive";
import verbRoutes from "./routes/verbs";
import reflexiveRoutes from "./routes/reflexive";
import auxiliaryRoutes from "./routes/auxiliary";

const app = new Hono<{ Bindings: CloudflareBindings }>();

// Auth middleware
app.use("*", async (c, next) => {
  const user = await getCurrentUser(c);
  c.set("user", user);
  await next();
});

// Better Auth API routes
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

// Static CSS
import { css } from "./css";
app.get("/style.css", (c) => {
  return c.text(css, 200, { "Content-Type": "text/css" });
});

// Mount routes
app.route("/login", loginRoutes);
app.route("/dashboard", dashboardRoutes);
app.route("/french/nouns", nounRoutes);
app.route("/french/subjunctive", subjunctiveRoutes);
app.route("/french/verbs", verbRoutes);
app.route("/french/reflexive", reflexiveRoutes);
app.route("/french/auxiliary", auxiliaryRoutes);

// Logout
app.get("/logout", async (c) => {
  await logout(c);
  return c.redirect("/");
});

// Landing page
app.get("/", async (c) => {
  const user = c.get("user");
  if (user) {
    return c.redirect("/dashboard");
  }

  return c.html(
    <Layout title="Welcome">
      <div class="landing-hero">
        <h1>
          Master French, Chinese &amp; English.<br />
          <span class="accent">One round at a time.</span>
        </h1>
        <p>
          Step into the Dojo and practise grammar through contextual, multiple-choice
          training. No shortcuts — just focused repetition that sticks.
        </p>
        <div class="landing-cta">
          <a href="/login" class="btn btn-primary">Get Started</a>
          <a href="#modules" class="btn btn-secondary">Explore Modules</a>
        </div>
      </div>

      <div class="languages-preview">
        <h2>Choose your language</h2>
        <div class="language-row">
          <a href="/login" class="language-preview-card">
            <div class="flag">🇫🇷</div>
            <h3>French</h3>
            <p>5 training modules live</p>
            <span class="badge">Available now</span>
          </a>
          <div class="language-preview-card disabled">
            <div class="flag">🇨🇳</div>
            <h3>Chinese</h3>
            <p>Coming soon</p>
          </div>
          <div class="language-preview-card disabled">
            <div class="flag">🇬🇧</div>
            <h3>English</h3>
            <p>Coming soon</p>
          </div>
        </div>
      </div>

      <div class="features-grid" id="modules">
        <h2>French Training Modules</h2>
        <div class="modules">
          <a href="/login" class="module-card">
            <div class="module-icon">🎭</div>
            <h2>Noun Gender</h2>
            <p>Master masculine and feminine nouns through contextual phrases. Regular rules and tricky exceptions.</p>
          </a>
          <a href="/login" class="module-card">
            <div class="module-icon">🧠</div>
            <h2>Subjunctive Tense</h2>
            <p>Recognise when to use the subjunctive with sentence starters and full contextual options.</p>
          </a>
          <a href="/login" class="module-card">
            <div class="module-icon">🔗</div>
            <h2>À vs De Verbs</h2>
            <p>Learn which prepositions go with which verbs. See them in context with en, y, and full sentences.</p>
          </a>
          <a href="/login" class="module-card">
            <div class="module-icon">🪞</div>
            <h2>Reflexive Verbs</h2>
            <p>Know when a verb needs a reflexive pronoun. True reflexive, idiomatic, and reciprocal uses.</p>
          </a>
          <a href="/login" class="module-card">
            <div class="module-icon">⚡</div>
            <h2>Être vs Avoir</h2>
            <p>Master auxiliary verbs in compound tenses. DR MRS VANDERTRAMP, reflexives, and ambiguous cases.</p>
          </a>
        </div>
      </div>

      <div class="steps">
        <h2>How it works</h2>
        <div class="steps-row">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Choose</h3>
            <p>Pick a language and a grammar module that matches your level.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Practise</h3>
            <p>Answer contextual multiple-choice questions and learn from every round.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Review</h3>
            <p>Mistakes are saved for review mode. Clear them by getting them right twice.</p>
          </div>
        </div>
      </div>

      <div class="landing-footer-cta">
        <h2>Ready to train?</h2>
        <p>Create a free account and start practising today.</p>
        <a href="/login" class="btn btn-primary">Get Started</a>
      </div>
    </Layout>
  );
});

// French module selection
app.get("/french", async (c) => {
  const user = c.get("user");
  if (!user) return c.redirect("/");

  return c.html(
    <Layout title="French Modules" user={user}>
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
    </Layout>
  );
});

export default app;
