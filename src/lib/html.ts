export const layout = (title: string, body: string, user?: { username: string } | null) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — The Language Dojo</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav class="navbar">
    <a href="/" class="brand">🥋 The Language Dojo</a>
    ${user ? `
      <div class="nav-user">
        <span>${user.username}</span>
        <form method="post" action="/auth/logout" class="logout-form">
          <button type="submit" class="btn-small">Logout</button>
        </form>
      </div>
    ` : ""}
  </nav>
  <main class="container">
    ${body}
  </main>
</body>
</html>
`;

export const gameLayout = (title: string, body: string, user?: { username: string } | null) => layout(title, `
  <div class="game-header">
    <a href="/french" class="back-link">← Back to Modules</a>
    <h1>${title}</h1>
  </div>
  ${body}
`, user);
