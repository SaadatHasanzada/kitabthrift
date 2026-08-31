# KitabThrift — project notes for Claude

Bilingual (`en` / `az`) book app. Next 16 App Router, next-intl 4, Supabase, Tailwind 4 + shadcn/ui.

## Supabase skills

Official Supabase agent skills are installed at `.agents/skills/` (not `.claude/skills/`, so
they don't auto-load — read them as files):

- `supabase/SKILL.md` — general Supabase guidance
- `supabase-postgres-best-practices/references/` — 30+ files covering RLS performance,
  index strategy, N+1, connection pooling, pagination, schema design

**Consult these before writing SQL, RLS policies, or schema changes.**

## i18n rules

`i18n/routing.ts` is the single source of truth for locales. Everything derives from it.

- **Navigation must come from `@/i18n/navigation`** — `Link`, `redirect`, `permanentRedirect`,
  `usePathname`, `useRouter`, `getPathname`. Importing these from `next/navigation` or
  `next/link` silently drops the locale prefix and breaks active-link matching. This fails with
  no error.
- Exception: `notFound`, `useSearchParams`, `useParams` still come from `next/navigation`.
  So does `redirect` when the target is an **external** URL (e.g. handing off to Google) —
  the i18n version only builds internal paths.
- **Every page lives under `app/[locale]/`.** Outside it there's no root param and the locale
  can't be resolved.
- The locale comes from `next/root-params` via `i18n/request.ts`. Pages take **no `params` prop**
  and never call `setRequestLocale` (deprecated).
- `useTranslations` for sync components (server or client). `getTranslations` only where hooks
  are illegal — async functions and `generateMetadata`.
- **Every message key must exist in both `messages/en.json` and `messages/az.json`.** A missing
  key does **not** throw — next-intl logs an error and renders the key path (`Auth.signOut`) as
  visible text, in that locale only. The build still passes.
- Never render an API's or a library's English error string. Map it to a message key.

## Supabase / auth rules

- **Use `getClaims()`, never `getSession()`, in server code.** `getSession()` reads storage
  without revalidating the JWT — trusting it in the proxy or a Server Component is an auth
  bypass.
- `proxy.ts` must have **one default export** composing both middlewares: next-intl creates the
  response, then `updateSession(request, response)` writes Supabase's cookies onto it. A named
  `export function proxy()` compiles and never runs.
- `lib/supabase/proxy.ts` deliberately **takes** the response instead of calling
  `NextResponse.next()` — building its own would discard next-intl's rewrite/redirect.
- **Do not change the proxy matcher.** `api` must stay excluded: the auth callback lives at
  `app/api/auth/callback/route.ts`, and a locale prefix would 404 every Google sign-in and
  confirmation email.
- Env vars use the current key naming: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, not `ANON_KEY`.
  The secret key and Google client secret never leave the server.

## File layout

- `app/` holds **routes only** — pages, layouts, route handlers. Nothing else.
- `lib/` holds shared server code: `lib/supabase/` (clients + proxy helper),
  `lib/actions/` (Server Actions), constants, utils.
- Colocate an action next to its page only when exactly one page uses it.
- Every `"use server"` export is a callable HTTP endpoint. The proxy does **not** protect it —
  Server Functions are POSTs to the route they're used on, so a matcher exclusion silently skips
  them. Verify auth inside each action.

## Database rules

- **RLS: `(select auth.uid())`, not bare `auth.uid()`.** Wrapped in a subquery it's evaluated
  once; unwrapped it runs per row. Supabase measures 100x on large tables.
- **Index every foreign key column.** Postgres doesn't do it automatically, and both JOINs and
  `ON DELETE CASCADE` fall back to full table scans.
- RLS on every public table. It default-denies, so a missing policy fails loudly — a missing
  `enable row level security` leaks silently.

## Book data

- **Open Library is the only API we store data from.** Google's API terms prohibit building
  databases from their content or translating it, so Google Books may only be used at display
  time if at all.
- Search hits the API live; a book is copied into our own `books` table only when a user
  shelves it. We don't mirror the catalog.
- Azerbaijani coverage in every public API is poor. Don't design as though an API will populate
  the catalog.

## Verifying

`npx next build` — it typechecks and prerenders every route in every locale, so it catches
missing message keys and broken locale routing that `tsc` alone won't.
