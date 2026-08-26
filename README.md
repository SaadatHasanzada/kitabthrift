# Kitabthrift

Your reading life, organized. A Next.js book app, fully localized in English and
Azerbaijani.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **next-intl 4** for internationalization — `en` / `az`
- **Tailwind CSS 4** with shadcn/ui and Base UI primitives
- **Fraunces** via `next/font`

## Architecture decisions

Why the project is built this way, not how to run it. Full walkthrough of the i18n
setup with diagrams: [docs/next-intl.md](docs/next-intl.md).

### `next/root-params` instead of `setRequestLocale`

next-intl 4.13 deprecates `setRequestLocale`, which had to be called by hand at the top
of every layout and page — miss one and static rendering silently breaks. Root params
(Next 16.3) let `i18n/request.ts` read the `[locale]` segment directly, so pages take no
`params` prop and there is no setter to forget. All locale routes still prerender as
static HTML.

### `localePrefix: "as-needed"`

The default locale serves clean URLs (`/my-books`); every other locale is always
prefixed (`/az/my-books`). It's enforced both directions — a redundant `/en/my-books`
redirects back to `/my-books` — so every page has exactly one canonical URL per
language.

The alternative, `always`, is more uniform and doesn't privilege one language, at the
cost of a redirect on `/` and a prefix on the primary market's URLs. Chose the clean
URL, accepting that changing `defaultLocale` later would move which URLs are canonical.

### Locale-free URLs and message keys in `lib/constants.ts`

Nav items store `url: "/my-books"` and `key: "myBooks"` — never a prefixed URL, never
display text. `Link` adds the prefix on the way out and `usePathname` strips it on the
way back (both from `@/i18n/navigation`), so the active-link comparison holds in every
language. Adding a language touches no component code.

### Pages call `useTranslations`, not `getTranslations`

Pages stay synchronous, so a page can gain `"use client"` later without rewriting its
translation calls — `useTranslations` works on both sides of the boundary.
`getTranslations` is reserved for where hooks are illegal, which here is only
`generateMetadata`.

## Project structure

```
app/[locale]/        every page lives inside the locale segment
i18n/                routing config, request config, navigation helpers
messages/            en.json · az.json
components/layout/   logo, nav links, mobile nav
components/ui/       shadcn/ui primitives
lib/                 constants and helpers
proxy.ts             locale negotiation (middleware, renamed in Next 16)
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be served `/` in English, or
redirected to `/az` if your browser prefers Azerbaijani.

Pages live under `app/[locale]/` — the home page is `app/[locale]/page.tsx`. Text comes
from `messages/`, never from the component itself.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build — prerenders every route in every locale |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
