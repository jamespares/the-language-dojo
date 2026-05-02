# The Language Dojo — Agent Guide

## Project Overview

The Language Dojo is a server-rendered language learning web application. Users log in and practise grammar through multiple-choice quiz games. French is live with 5 modules. Chinese and English are planned. The app runs on Cloudflare Workers with a D1 SQLite database. All HTML is generated server-side using Hono's JSX renderer — there is no client-side JavaScript framework.

### Available French Modules

| Module | Path | Description |
|--------|------|-------------|
| Noun Gender | `/french/nouns` | Masculine vs feminine nouns. Regular rules, exceptions, and a review mode for mistakes. |
| Subjunctive Tense | `/french/subjunctive` | Sentence starters — pick the grammatically correct completion. |
| À vs De Verbs | `/french/verbs` | Choose the correct preposition for a given verb in context. |
| Reflexive Verbs | `/french/reflexive` | Decide whether a verb needs a reflexive pronoun. |
| Être vs Avoir | `/french/auxiliary` | Pick the correct auxiliary verb in compound tenses. |

## Technology Stack

- **Runtime:** Cloudflare Workers (Wrangler v3)
- **Web Framework:** Hono v4 with built-in JSX (`hono/jsx`)
- **Database:** Cloudflare D1 (SQLite)
- **ORM:** Drizzle ORM v0.30 + Drizzle Kit v0.20
- **Language:** TypeScript 5.4 (target ES2022, module ESNext, bundler resolution)
- **Auth:** [better-auth](https://www.better-auth.com/) v1.1 — email & password only
- **Styling:** Hand-written CSS, light theme, served from `/style.css`

## Build, Dev and Deploy Commands

All commands are defined in `package.json`:

```bash
# Local development (uses Wrangler dev server with local D1)
npm run dev

# Deploy to Cloudflare Workers
npm run deploy

# Database migrations
npm run db:generate   # Generate Drizzle migration SQL files
npm run db:migrate    # Apply migrations to the D1 database
npm run db:studio     # Open Drizzle Studio to inspect data
```

No test runner, linter or formatter is currently configured.

## Project Structure

```
├── src/
│   ├── index.tsx             # Entry point. Creates Hono app, auth middleware, mounts routes
│   ├── css.ts                # Inline CSS string exported for /style.css endpoint
│   ├── db/
│   │   ├── client.ts         # `getDb(d1)` wrapper returning Drizzle client with schema
│   │   └── schema.ts         # Drizzle table definitions (users, userProgress, mistakes)
│   ├── lib/
│   │   ├── auth.ts           # better-auth setup, getCurrentUser, logout, authMiddleware
│   │   └── game.ts           # recordAnswer, getMistakeItemIds, getStats
│   ├── components/
│   │   └── Layout.tsx        # Shared page layout (navbar + footer)
│   ├── routes/
│   │   ├── login.tsx         # Better-auth email sign-in / sign-up page
│   │   ├── dashboard.ts      # Language selection (French / Chinese / English placeholder)
│   │   ├── nouns.ts          # Noun gender game with mode selection & review
│   │   ├── subjunctive.ts    # Subjunctive quiz
│   │   ├── verbs.ts          # À vs De verb quiz
│   │   ├── reflexive.ts      # Reflexive verb quiz
│   │   └── auxiliary.ts      # Être vs Avoir quiz
│   └── content/
│       ├── nouns.ts          # NounItem dataset (~630 lines)
│       ├── subjunctive.ts    # SubjunctiveItem dataset
│       ├── verbs.ts          # VerbItem dataset
│       ├── reflexive.ts      # ReflexiveItem dataset
│       └── auxiliary.ts      # AuxiliaryItem dataset
├── migrations/
│   ├── 0000_init.sql         # D1 migration creating users, user_progress, mistakes
│   └── 0001_better_auth.sql  # Adds email column + better-auth tables (user, session, account, verification)
├── public/
│   └── style.css             # Static CSS file (mirrors src/css.ts)
├── wrangler.jsonc            # Worker config, D1 binding, env vars
├── drizzle.config.ts         # Drizzle Kit configuration
└── tsconfig.json             # TypeScript config (includes @cloudflare/workers-types)
```

## Database Schema

### `users`
- `id` — auto-increment primary key
- `username` — unique, required
- `email` — optional, used to link to better-auth `user` table
- `password_hash` — kept for schema compatibility; always empty string for better-auth users
- `created_at` — timestamp

This table acts as a **bridge** so that game progress (`user_progress`, `mistakes`) can continue to reference integer `user_id`s while better-auth manages its own `user` table with UUID text IDs.

### `user_progress`
- Tracks every answer per user, module and content item.
- Columns: `id`, `user_id`, `module`, `item_id`, `correct_count`, `incorrect_count`, `last_reviewed`.
- Unique constraint on `(user_id, module, item_id)`.

### `mistakes`
- Tracks items the user got wrong.
- Columns: `id`, `user_id`, `module`, `item_id`, `mistake_count`, `review_count`, `last_mistake_at`, `created_at`.
- Unique constraint on `(user_id, module, item_id)`.
- `review_count` must reach `2` before the item is considered cleared.

### better-auth tables
Migration `0001_better_auth.sql` also creates `user`, `session`, `account`, and `verification` tables managed by better-auth's Drizzle adapter.

## Authentication & Session Flow

1. **better-auth** handles registration, login, password hashing, and session management via the `/api/auth/*` endpoints.
2. The client-side auth form (`/login`) uses the better-auth CDN client to call `signIn.email()` and `signUp.email()`.
3. A global middleware (`src/index.tsx`) reads the better-auth session cookie on every request, looks up the corresponding row in the app's `users` bridge table by email, and stores the result in Hono's context variable `user`.
4. If a better-auth user has no bridge row, one is auto-created (`username` = email prefix, `passwordHash` = `""`).
5. Logout deletes the better-auth session cookie and redirects home.

### Important Security Notes

- `BETTER_AUTH_SECRET` must be set via `wrangler secret put BETTER_AUTH_SECRET` — do **not** commit secrets.
- `SESSION_SECRET` in `wrangler.jsonc` is a leftover from the old legacy auth system and is **no longer consumed** by any code. It can be removed from `wrangler.jsonc` if desired.

## Game Mechanics

- Each module presents a question as a multiple-choice form (3 options).
- The user submits an answer via `POST`, which is checked against the dataset.
- `recordAnswer()` in `src/lib/game.ts` updates `user_progress` and `mistakes` accordingly.
- If the answer is correct and a mistake record exists, `review_count` is incremented.
- If the answer is incorrect, a mistake record is created or its `mistake_count` is incremented.
- The **Noun Gender** module has three modes:
  - `regular` — nouns that follow gender suffix rules.
  - `exceptions` — commonly mistaken nouns.
  - `review` — only items with `review_count < 2` from the `mistakes` table.
- Other modules present all items in a deterministic per-user shuffle (seeded by `user.id + offset`).

## Content Data Conventions

All quiz data lives in `src/content/*.ts` as statically exported typed arrays. Each file exports:

- A type alias (e.g., `NounItem`, `SubjunctiveItem`).
- A `makeOptions(correct, wrong1, wrong2)` helper that shuffles three strings.
- A large const array with every question/answer.

**Adding new items:** append to the relevant array in the content file, ensuring `id` is unique within that module. The options array must contain the correct answer plus two plausible distractors.

## Environment & Configuration

### `wrangler.jsonc`
```toml
name = "the-language-dojo"
main = "src/index.tsx"
compatibility_date = "2024-04-29"

[[d1_databases]]
binding = "DB"
database_name = "language-dojo-db"
database_id = "a4750795-88e2-4616-92bd-6ea3c8ff9887"

send_email = [
  { name = "SEND_EMAIL" }
]

[vars]
BETTER_AUTH_URL = "https://the-language-dojo.pages.dev"
```

- `DB` is the D1 binding injected into `c.env.DB` at runtime.
- `BETTER_AUTH_URL` is the public URL of the app (used by better-auth for callbacks).
- `BETTER_AUTH_SECRET` should be set via `wrangler secret put BETTER_AUTH_SECRET`.
- `send_email` binding is configured in `wrangler.jsonc`. All emails send from `hey@jamespares.me`.

### `drizzle.config.ts`
- Schema path: `./src/db/schema.ts`
- Output path: `./migrations`
- Driver: `d1`

## CSS & Styling

Styles are defined in two places (they should be kept in sync):
1. `src/css.ts` — exported string served at the `/style.css` endpoint.
2. `public/style.css` — static file (appears to be a copy).

The design is a light-themed card UI using CSS custom properties (`:root` variables). Accent colour is blue (`#2563eb`). Auth inputs and primary buttons use pill shapes (`border-radius: 9999px`). There is no CSS build step — it is plain hand-written CSS.

## Things to Be Aware Of

- **No tests:** There is no test suite. If you add one, Jest/Vitest with `miniflare` or `wrangler` test environments are common choices for Workers projects.
- **No linting/formatting:** ESLint and Prettier are not configured.
- **Duplicate CSS:** `src/css.ts` and `public/style.css` contain the same styles. The app serves `src/css.ts` at runtime (`/style.css` route in `src/index.tsx`).
- **Hardcoded D1 database ID:** The `database_id` in `wrangler.jsonc` is specific to the developer's Cloudflare account. New contributors will need to create their own D1 database and update the ID.
- **Mistake review threshold:** The review mode filters items where `reviewCount < 2`. Changing this threshold requires updating both `src/lib/game.ts` (`getMistakeItemIds`) and any UI copy.
