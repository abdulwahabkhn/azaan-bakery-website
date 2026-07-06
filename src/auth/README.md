# Auth Extension Point

Authentication is intentionally not implemented yet.

When auth is added:

- Prefer httpOnly, SameSite, Secure cookies for session or refresh tokens.
- Avoid storing JWTs in localStorage by default because scripts can read them after an XSS event.
- Keep access tokens short-lived and scoped to the least privilege needed.
- Add typed auth state, route guards, and API token providers here.
- Keep sign-in, sign-out, refresh, and user-profile services isolated from UI components.
