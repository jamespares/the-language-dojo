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

// Landing page — AI Test Prep Coming Soon
app.get("/", async (c) => {
  const user = c.get("user");
  if (user) {
    return c.redirect("/dashboard");
  }

  return c.html(
    <Layout title="AI Mock Tests — Coming Soon">
      <div class="test-hero">
        <div class="coming-badge">🚀 Coming Soon</div>
        <h1>
          AI Mock Tests.<br />
          <span class="accent">Rubric Feedback.</span><br />
          Pass Probability.
        </h1>
        <p class="tagline">Guaranteed Pass.</p>
        <p class="subtitle">
          The only platform that generates standardized mock exams, scores them against official rubrics,
          maps your weak spots, and tells you exactly when you're ready to pass.
        </p>
      </div>

      <div class="exam-grid">
        <div class="exam-card">
          <div class="exam-icon">🇬🇧</div>
          <h3>IELTS</h3>
          <p>Academic & General Training</p>
        </div>
        <div class="exam-card">
          <div class="exam-icon">🇺🇸</div>
          <h3>TOEFL</h3>
          <p>iBT & Essentials</p>
        </div>
        <div class="exam-card">
          <div class="exam-icon">🇫🇷</div>
          <h3>DALF / DELF</h3>
          <p>A1–C2 All Levels</p>
        </div>
        <div class="exam-card">
          <div class="exam-icon">🇨🇳</div>
          <h3>HSK</h3>
          <p>HSK 1–6 & HSKK</p>
        </div>
      </div>

      <div class="waitlist-cta">
        <a href="/login" class="btn btn-primary">Join the Waitlist</a>
        <p class="waitlist-note">Create a free account. Be first to access mock tests when they launch.</p>
      </div>

      <div class="guarantee-box">
        <h3>🎯 The 100% Pass Promise</h3>
        <p>
          Complete mock tests until your pass probability hits 100%. We guarantee you'll pass the real exam.
          No other platform dares to make this promise.
        </p>
      </div>

      <div class="how-it-works">
        <h2>How It Works</h2>
        <div class="features-row">
          <div class="feature-pill">
            <div class="feature-num">1</div>
            <h3>Generate</h3>
            <p>AI creates a full mock test instantly — timed, realistic, exam-grade.</p>
          </div>
          <div class="feature-pill">
            <div class="feature-num">2</div>
            <h3>Simulate</h3>
            <p>Exam conditions. Same pressure. No surprises on test day.</p>
          </div>
          <div class="feature-pill">
            <div class="feature-num">3</div>
            <h3>Score</h3>
            <p>Detailed feedback aligned to official exam rubrics — not generic praise.</p>
          </div>
          <div class="feature-pill">
            <div class="feature-num">4</div>
            <h3>Map</h3>
            <p>Every test is saved. Weak spots identified automatically.</p>
          </div>
          <div class="feature-pill">
            <div class="feature-num">5</div>
            <h3>Drill</h3>
            <p>Short, targeted AI activities fix exactly what's broken.</p>
          </div>
          <div class="feature-pill">
            <div class="feature-num">6</div>
            <h3>Pass</h3>
            <p>Repeat until your probability hits 100%. Then walk into the exam with confidence.</p>
          </div>
        </div>
      </div>

      <div class="social-proof">
        <div class="stats-row">
          <div class="stat-item">
            <h3>10M+</h3>
            <p>Annual test takers worldwide</p>
          </div>
          <div class="stat-item">
            <h3>$12B+</h3>
            <p>Addressable test-prep market</p>
          </div>
          <div class="stat-item">
            <h3>0</h3>
            <p>Platforms that guarantee a pass</p>
          </div>
        </div>
      </div>

      <div class="early-access">
        <h2>🎁 Free Grammar Training — Available Now</h2>
        <p>
          While you wait for mock tests, sharpen your French grammar with our AI-powered training modules.
          Free for all waitlist members.
        </p>
        <a href="/login" class="btn btn-secondary">Start Free French Training</a>
      </div>

      <div class="landing-footer-cta">
        <h2>Don't study harder. Study smarter.</h2>
        <p>Join the waitlist and be first to access the only AI test prep platform with a pass guarantee.</p>
        <a href="/login" class="btn btn-primary">Join the Waitlist</a>
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
