/** @jsxImportSource hono/jsx */
import { Hono } from "hono";
import { getDb } from "./db/client";
import { createAuth, getCurrentUser } from "./lib/auth";
import { Layout } from "./components/Layout";
import authRoutes from "./routes/auth";
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

  return c.html(
    <Layout title="Welcome">
      <div class="auth-page">
        <div class="auth-form">
          <div class="form-card" id="login-card">
            <div class="auth-header">
              <h1>Welcome Back</h1>
              <p class="auth-subtitle">Sign in to your account</p>
            </div>
            <form id="login-form" class="auth-form-inner">
              <label class="auth-label" for="login-email">Email</label>
              <input type="email" id="login-email" class="input" placeholder="you@example.com" required />
              <div class="auth-label-row">
                <label class="auth-label" for="login-password">Password</label>
                <a href="#" class="auth-forgot">Forgot password?</a>
              </div>
              <input type="password" id="login-password" class="input" placeholder="••••••••" required />
              <div id="login-error" class="hidden error-box"></div>
              <button type="submit" id="login-btn" class="btn btn-primary btn-full">Sign In</button>
            </form>
            <div class="auth-divider" />
            <p class="auth-terms">
              By signing in or creating an account, you agree to the{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
            <p class="auth-toggle">
              Don't have an account?{" "}
              <a href="#" onclick="showRegister();return false;">Sign up</a>
            </p>
            <p class="auth-toggle">
              <a href="#" onclick="showLegacy();return false;" class="auth-legacy-link">
                Legacy login (existing users)
              </a>
            </p>
          </div>

          <div class="form-card hidden" id="register-card">
            <div class="auth-header">
              <h1>Create Account</h1>
              <p class="auth-subtitle">Sign up to get started</p>
            </div>
            <form id="register-form" class="auth-form-inner">
              <label class="auth-label" for="reg-email">Email</label>
              <input type="email" id="reg-email" class="input" placeholder="you@example.com" required />
              <label class="auth-label" for="reg-password">Password</label>
              <input type="password" id="reg-password" class="input" placeholder="••••••••" required minlength={6} />
              <div id="reg-error" class="hidden error-box"></div>
              <button type="submit" id="reg-btn" class="btn btn-primary btn-full">Create Account</button>
            </form>
            <div class="auth-divider" />
            <p class="auth-terms">
              By signing in or creating an account, you agree to the{" "}
              <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
            <p class="auth-toggle">
              Already have an account?{" "}
              <a href="#" onclick="showLogin();return false;">Sign in</a>
            </p>
          </div>

          <div class="form-card hidden" id="legacy-card">
            <div class="auth-header">
              <h1>Legacy Login</h1>
              <p class="auth-subtitle">For existing username-based accounts</p>
            </div>
            <form method="post" action="/auth/login" class="auth-form-inner">
              <label class="auth-label" for="legacy-username">Username</label>
              <input type="text" id="legacy-username" name="username" class="input" placeholder="Username" required />
              <label class="auth-label" for="legacy-password">Password</label>
              <input type="password" id="legacy-password" name="password" class="input" placeholder="Password" required />
              <button type="submit" class="btn btn-primary btn-full">Login</button>
            </form>
            <p class="auth-toggle">
              <a href="#" onclick="showLogin();return false;">Back to email login</a>
            </p>
          </div>
        </div>
      </div>

      <script type="module" dangerouslySetInnerHTML={{
        __html: `
          import { createAuthClient } from "https://esm.sh/better-auth@1.1.1/client";
          const client = createAuthClient({ baseURL: window.location.origin });

          window.showLogin = () => {
            document.getElementById('login-card').classList.remove('hidden');
            document.getElementById('register-card').classList.add('hidden');
            document.getElementById('legacy-card').classList.add('hidden');
          };
          window.showRegister = () => {
            document.getElementById('login-card').classList.add('hidden');
            document.getElementById('register-card').classList.remove('hidden');
            document.getElementById('legacy-card').classList.add('hidden');
          };
          window.showLegacy = () => {
            document.getElementById('login-card').classList.add('hidden');
            document.getElementById('register-card').classList.add('hidden');
            document.getElementById('legacy-card').classList.remove('hidden');
          };

          document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorBox = document.getElementById('login-error');
            const btn = document.getElementById('login-btn');
            errorBox.classList.add('hidden');
            btn.disabled = true;
            btn.textContent = 'Signing in...';

            const { data, error } = await client.signIn.email({
              email: document.getElementById('login-email').value,
              password: document.getElementById('login-password').value,
            });

            if (error) {
              errorBox.textContent = error.message || 'Invalid credentials';
              errorBox.classList.remove('hidden');
              btn.disabled = false;
              btn.textContent = 'Sign In';
            } else {
              window.location.href = '/dashboard';
            }
          });

          document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorBox = document.getElementById('reg-error');
            const btn = document.getElementById('reg-btn');
            errorBox.classList.add('hidden');
            btn.disabled = true;
            btn.textContent = 'Creating account...';

            const { data, error } = await client.signUp.email({
              email: document.getElementById('reg-email').value,
              password: document.getElementById('reg-password').value,
            });

            if (error) {
              errorBox.textContent = error.message || 'Failed to create account';
              errorBox.classList.remove('hidden');
              btn.disabled = false;
              btn.textContent = 'Create Account';
            } else {
              window.location.href = '/dashboard';
            }
          });
        `
      }} />
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
