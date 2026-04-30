/** @jsxImportSource hono/jsx */
import type { FC, PropsWithChildren } from "hono/jsx";

export type AppUser = {
  id: number;
  username: string;
  email: string | null;
};

export const Layout: FC<PropsWithChildren<{ title?: string; user?: AppUser | null }>> = ({
  children,
  title,
  user,
}) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title ? `${title} — The Language Dojo` : "The Language Dojo"}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <nav class="navbar">
        <a href="/" class="brand">🥋 The Language Dojo</a>
        {user && (
          <div class="nav-user">
            <span>{user.username}</span>
            <a href="/logout" class="btn-small">Logout</a>
          </div>
        )}
      </nav>
      <main class="container">{children}</main>
    </body>
  </html>
);

export const GameLayout: FC<PropsWithChildren<{ title: string; user?: AppUser | null }>> = ({
  children,
  title,
  user,
}) => (
  <Layout title={title} user={user}>
    <div class="game-header">
      <a href="/french" class="back-link">← Back to Modules</a>
      <h1>{title}</h1>
    </div>
    {children}
  </Layout>
);
