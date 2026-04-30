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
      <div class="hero">
        <h1>🥋 The Language Dojo</h1>
        <p>There are no shortcuts. Step into the Dojo.</p>
        <div class="auth-form">
          <div class="form-card" id="login-card">
            <h2>Sign In</h2>
            <form id="login-form" class="flex flex-col gap-3">
              <input type="email" id="login-email" class="input" placeholder="Email" required />
              <input type="password" id="login-password" class="input" placeholder="Password" required />
              <div id="login-error" class="hidden error-box"></div>
              <button type="submit" id="login-btn" class="btn btn-primary">Sign In</button>
            </form>
            <p class="auth-toggle">
              Don't have an account?{" "}
              <a href="#" onclick="showRegister();return false;">Register</a>
            </p>
            <p class="auth-toggle" style="margin-top:0.5rem">
              <a href="#" onclick="showLegacy();return false;" style="font-size:0.8rem;color:var(--base-text-muted)">
                Legacy login (existing users)
              </a>
            </p>
          </div>

          <div class="form-card hidden" id="register-card">
            <h2>Create Account</h2>
            <form id="register-form" class="flex flex-col gap-3">
              <input type="email" id="reg-email" class="input" placeholder="Email" required />
              <input type="password" id="reg-password" class="input" placeholder="Password" required minlength={6} />
              <div id="reg-error" class="hidden error-box"></div>
              <button type="submit" id="reg-btn" class="btn btn-primary">Create Account</button>
            </form>
            <p class="auth-toggle">
              Already have an account?{" "}
              <a href="#" onclick="showLogin();return false;">Sign In</a>
            </p>
          </div>

          <div class="form-card hidden" id="legacy-card">
            <h2>Legacy Login</h2>
            <form method="post" action="/auth/login" class="flex flex-col gap-3">
              <input type="text" name="username" class="input" placeholder="Username" required />
              <input type="password" name="password" class="input" placeholder="Password" required />
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <p class="auth-toggle">
              <a href="#" onclick="showLogin();return false;">Back to email login</a>
            </p>
          </div>
        </div>

        <div class="mt-10 text-center">
          <p class="font-fun text-lg">Built by James Pares</p>
          <div class="flex justify-center gap-5 mt-4">
            <a href="https://www.linkedin.com/in/james-p-ba7653207/" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent transition-colors" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/jamespareslfg" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent transition-colors" aria-label="X">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://github.com/jamespares" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-accent transition-colors" aria-label="GitHub">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
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
