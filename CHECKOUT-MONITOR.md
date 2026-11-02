# Azaan Bakers checkout monitor

Activated on the existing Azaan Bakers Vercel project on 1 November 2026. Upstash Redis is connected on its free plan with automatic upgrades disabled. The dashboard is `/checkout-monitor.html`.

The tracker counts validated contact/checkout form submissions that invoke the WhatsApp handoff. It does not count generic WhatsApp links, gift inquiries, abandoned carts, confirmed orders, or payments. Browser popup blocking, ad blockers, offline devices, and deliberate automated requests can affect counts. There is no historical backfill.

## Activate on Vercel

1. Connect the existing `abdulwahabkhn/azaan-bakery-website` Vercel project. Do not create a second bakery website.
2. Connect an Upstash Redis database through the project's Storage/Marketplace settings. Use a separate database or keep the `azaan:checkout:v1:` key namespace isolated. Choose a plan deliberately; do not accept a paid upgrade automatically.
3. Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` as server-only production environment variables. Existing `KV_REST_API_URL` / `KV_REST_API_TOKEN` names are also supported. Do not use a read-only token for ingestion.
4. Generate a random private key of at least 32 characters and set `CHECKOUT_MONITOR_TOKEN` in the production environment. Never prefix these variables with `VITE_`, commit them, or put the monitor key in a URL.
5. `CHECKOUT_ALLOWED_ORIGINS` defaults to `https://www.azaanbaker.com,https://azaanbaker.com`. For preview testing, explicitly allow only the selected preview origin in that preview environment and use separate test Redis storage.
6. Deploy the changed source to Vercel. The routing configuration serves real static files and API functions before falling back to the React app.
7. Open `/checkout-monitor.html` on the deployed bakery domain. Enter the monitor key. A successful connection with no events shows zero; missing or failed storage shows an error.
8. Test a valid checkout on a preview deployment with test storage. Confirm one event is recorded, a rapid double click is suppressed, and a later submission counts. Check that WhatsApp still opens with the same message. Avoid adding synthetic events to production.

## Data and access

From 2 November 2026, new submissions send an event ID, customer name, order details and matching cart items to the API. The server assigns the time in `Asia/Karachi`, calculates item totals and derives order types from product categories. Phone numbers, addresses and optional messages are not separately collected. Free-text order details may contain whatever the customer types. The checkout form explains the collection and 90-day retention. The hosting provider's normal request logging remains separate.

Cart prices are customer-submitted estimates, not verified sales amounts. If the customer edits the prefilled order text or submits a custom request, the monitor shows the typed details and "Price to be confirmed" rather than a stale cart total. Old count-only attempts remain in totals; names, prices and details cannot be recovered retrospectively.

The API exposes counts and customer records only with the monitor key in an Authorization header. The static dashboard page is publicly reachable but contains no customer records or embedded key. It holds the entered key in page memory, supports Lock, and refreshes every 60 seconds while visible. Closing the page clears the key. Customer text is rendered as plain text. The same private access key remains valid after this update.

Detailed records expire after 90 days. Daily counters are retained for 400 days; the lifetime total and first-event timestamp remain. Event IDs expire after 7 days; existing detailed records also prevent duplicate counts for their 90-day lifetime. A Redis Lua script deduplicates retries and writes counters, customer records and the index together. A sorted index supports 25 records per page with stable cursors even when timestamps match. Reads exclude expired records, and writes prune old index entries. Rapid browser submissions within 5 seconds are suppressed. A new submission after that interval is another attempt, including from a returning customer.

The collector is public, as required for website visitors. Origin validation and strict input validation prevent accidental cross-site use but are not proof of a human checkout; fabricated requests can inflate attempts. Do not use these counts for billing or confirmed sales reports.

## Verification

Run `node --test tests/checkout-*.test.mjs` and `npm run build`.

2 November update: 18 unit tests passed and the normal production build passed. Tests cover detail validation, unrequested-field rejection, total calculation, custom pricing, backwards compatibility for older count-only clients, pagination, failure isolation, access control, plain-text rendering and clearing customer details on Lock. An isolated real Redis check verified record contents, calculated totals, 90-day TTL, pagination and duplicate rejection without changing production records.

The staged API also verified name, category, full text, quantities, selected variants, unit prices and totals end to end. Private reads required the existing access key. A synthetic record was accepted once, rejected on retry and then removed together with its counter contribution before publication.

Local results: 11 tests passed and TypeScript compilation passed. The normal Vite build hit a Windows sandbox EPERM error during native realpath resolution. The production bundle then built successfully with Vite's `resolve.preserveSymlinks` option enabled for that verification run only. No source build configuration was changed for the workaround.

Release verification on 1 November 2026: the normal production build passed without the earlier sandbox workaround. Real Redis recording and duplicate rejection passed. The staged Vercel API returned `recorded: true` for an anonymous test event and `recorded: false` for its retry; daily and lifetime counts were both one. That synthetic test event and its count were removed before publication. Unauthenticated summary reads returned 401.

Unit tests cover the client event payload, double-click suppression, retries and failure isolation; and the API's Pakistan date boundary, access control, input rejection, command structure, summary aggregation, and storage failure states. Redis responses are mocked. Real Redis execution and the deployed Vercel routing require an integration check after account access is connected.

No recurring chat automation is active yet. The dashboard refreshes while open; unattended checks can be connected after the live deployment and a secure read path are verified.
