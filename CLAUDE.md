@AGENTS.md

# Sahal Shaikh — Personal Portfolio

A premium personal-brand & consulting site for **Sahal Shaikh**, an independent product
engineer. The goal of every page is to **attract and convert high-quality international
clients** and book qualified calls. Positioning: _"I turn ambiguous ideas into websites and
products that move the business, end to end."_ Tagline: **"Clarity, shipped."**

Voice: confident but warm, business-outcome-first, plain English. Avoid jargon, hype, and
generic-freelancer clichés. Clarity is the brand — the writing itself must be clear.

## ⚠️ Read these first

1. **Next.js docs gotcha (see `@AGENTS.md`)** — this is a modified Next.js (v16). Read the
   relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code.
2. **Never add a universal `* { margin:0; padding:0 }` reset to `globals.css`.** Tailwind v4
   keeps utilities in `@layer`, and an **unlayered** universal rule overrides every spacing
   utility site-wide (`mx-auto`, `px-*`, `py-*`, card/button padding). This previously made the
   whole site look unstyled. Tailwind's preflight already handles resets.
3. **Integrity rule — never ship fabricated proof.** No invented testimonials, client names,
   logos, metrics, or employers under Sahal's name. Keep all placeholders clearly marked.
   Exception: the Veylix Staffing testimonial (id: `wt-shivam`) and the Fairpath Healthcare
   testimonial (id: `wt-fairpath`) are **real, approved** testimonials — do not remove or
   re-anonymize them. (The experience timeline is also real —
   see "Imagery & placeholders" below. Don't re-anonymize it either.)
4. **No em dashes in site copy.** Standing rule from Sahal: never use an em dash (`—`) in any
   user-facing content on any page. Recast with a period, comma, colon, parentheses, or a pipe
   (for titles). This applies to copy in `src/data/`, `src/config/site.ts`, page metadata, and
   JSX text — not to internal docs/comments like this file.
5. **Author source in straight ASCII quotes.** Curly/smart punctuation (`' ' " "`) pasted into
   `.ts`/`.tsx` breaks the TypeScript/JSX parser and has caused build failures. For strings that
   contain an apostrophe, use double quotes (`"it's"`) rather than escaping inside single quotes.

## Tech stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4** — JS config loaded via `@config` from `src/app/globals.css`
- **next-themes** — light/dark, follows system, `data-theme` attribute
- **Fonts:** Geist Sans (body, via `geist` pkg) + **Bricolage Grotesque** (display face, via
  `next/font/google`, mapped to the `font-serif` token — see "Homepage v2 redesign" below for
  why this replaced Fraunces).
- **framer-motion** — hero entrance choreography (clip-wipe portrait reveal, staggered type,
  scroll parallax) + restrained scroll reveals elsewhere via `Reveal`.
- **react-hook-form + zod** — the contact/qualifying-brief form
- **mongoose** (lead storage, Atlas) + **resend** (email) — both best-effort, behind env checks
- **Calendly** — inline widget via `widget.js` (optional; only loads when `NEXT_PUBLIC_CALENDLY_URL` is set)
- **Google reCAPTCHA v3** — invisible bot check on the contact form (see "Spam protection" below)
- **CookieYes** — cookie consent banner (see "Cookie consent" below)
- **Google Analytics 4** — via `@next/third-parties/google`, env-gated (see "Analytics" below)
- **lucide-react** for icons (note: brand glyphs like `Linkedin` are NOT exported in this
  version — LinkedIn uses an inline SVG in `Footer.tsx`)

## Design system

Defined in `src/app/globals.css` (CSS variables) + `tailwind.config.ts` (token mapping).

- **Theme = "warm premium"**, not cold/SaaS. Light is warm paper, dark is warm black.
- Colors (use the Tailwind tokens, not raw hex): `bg`, `bg-secondary`, `surface`,
  `text-primary` (ink), `text-secondary` (stone), `text-muted`, `accent` (honey amber — the
  ONE accent, used sparingly), `accent-soft`, `on-accent`, `border`, `border-strong`.
- Type: `font-serif` (Bricolage Grotesque, despite the token name) for headings/display,
  `font-sans` (Geist) for everything else. Headings use `tracking-tight`; global
  `text-wrap: balance` on h1–h4, `pretty` on `p`.
- Motion: intentional, not decorative. Hero uses a real entrance sequence (clip-wipe reveal on
  the portrait, staggered headline/subhead/CTA, scroll parallax); everywhere else uses
  restrained fades/rises via `Reveal`. Respect `prefers-reduced-motion` everywhere. No custom
  cursors, command palettes, glass, or gradient surfaces (deliberately removed).
- Radius tokens: `rounded-card`, `rounded-input`, `rounded-pill`. **`rounded-card` is reserved
  for photos/media** (see "Homepage v2 redesign" below) — content cards are flat, not boxed.

### Shared UI primitives (`src/components/ui/`)

- `Container` — centered max-width (`max-w-content`) + responsive padding. **Always wrap page
  content in this** (its `mx-auto` is what centers the site).
- `Section` — semantic `<section>` with vertical rhythm (`py-24 md:py-32`) + `scroll-mt`.
- `SectionHeading` — serif title + optional intro. Takes an `eyebrow` prop for backwards
  compatibility but **does not render it** — see "Homepage v2 redesign" below for why.
- `Card` — a flat editorial block: hairline top border only, warms to `accent` on hover. **Not**
  a bordered box with hover-lift; that look was deliberately removed (see below). Use for all
  content cards.
- `CtaButton` — canonical link-button (primary = inverting ink; ghost). Arrow nudges on hover.
- `PageHeader` — page hero. Pass a `media` node to get the split-hero layout (heading + visual
  with a warm glow + bottom border) used on `/work` and `/services`.
- `ImagePlaceholder` — image slot that displays its generation **prompt** until a real `src` is
  set. Use this for every not-yet-real image (see "Imagery & placeholders").
- `Reveal`, `DynIcon` (string→lucide map; extend the map when adding icons).

## Homepage v2 redesign — read before touching Hero/Card/SectionHeading

The homepage was deliberately rebuilt (PR #7, `redesign/homepage-v2`) to stop reading as
"AI-generated." If you're touching the hero, section headings, or content cards, know the
reasoning so you don't regress it:

- **Font swap: Fraunces → Bricolage Grotesque.** Fraunces is a recognized AI-default display
  serif; keeping it was actively working against the "not-AI" goal. Bricolage is wired as
  `--font-display` in `layout.tsx` and mapped to the existing `--font-serif` CSS var / `font-serif`
  Tailwind token, so no markup had to change, just the font backing the token.
- **No section eyebrows.** The small uppercase tracked kicker above every section ("WHAT I DO",
  "SELECTED RESULTS", etc.) is one of the most recognizable AI/template tells. `SectionHeading`
  still accepts an `eyebrow` prop (call sites still pass it) but silently ignores it. Don't
  re-add eyebrow rendering; if a section genuinely needs a category label, find a different,
  less-templated treatment.
- **No boxed content cards.** The old `Card` (rounded border, background surface, hover lift +
  shadow) is another AI/SaaS-template tell. It's now a flat block: a hairline top border that
  warms to `accent` on hover, no background fill, no box shadow. `Services.tsx` also dropped
  its rounded icon tile above each heading (also an explicit anti-pattern) in favor of a small
  amber outcome label above the title.
- **`rounded-card` is now reserved for photography/media**, not content boxes — e.g. the hero
  portrait (`rounded-2xl` + soft shadow) and `PageHeader`/`Showcase` imagery. Rounding a real
  photo reads as an intentional framing choice; rounding a text card reads as a template.
- **Section titles are capped smaller** (`clamp(1.875rem,3.4vw,2.75rem)`, was up to `3.25rem`)
  with `text-balance`, specifically so multi-word titles don't wrap to 3 lines and look
  unfinished. If a title still wants to wrap awkwardly, shorten the title and move the rest into
  the section's `intro` line rather than growing the heading.
- **Hero uses real choreography, not a uniform fade-up.** Masthead meta row draws its hairline
  in via `scaleX`; the portrait reveals via `clipPath` inset + a slight scale-settle (1.08 → 1),
  with a subtle scroll parallax (`useScroll`/`useTransform`) as you scroll past. This is
  deliberately more elaborate than the rest of the site's `Reveal`-based fades — the hero is the
  one place that earns it.
- **Design context lives in `PRODUCT.md`** (repo root) — written for the `impeccable` design
  skill's `init` flow. It documents the register (brand), audience, anti-references (explicitly
  lists the AI tells above), and the current design direction. Keep it in sync if the direction
  shifts again; `impeccable` and future redesign passes read it first.

## Structure

```
src/app/
  layout.tsx              # root: fonts, ThemeProvider, metadata (driven by siteConfig)
  (portfolio)/            # route group with Navbar + Footer + MobileCtaBar + WhatsAppButton shell
    layout.tsx            # the visible chrome
    page.tsx              # homepage — composes sections in conversion order
    work|services|about|contact|blog/  # inner pages
  api/contact/route.ts    # validates + best-effort persist (mongoose) + email (resend)
src/components/
  layout/                 # Navbar, Footer, MobileCtaBar
  sections/               # one file per page section (Hero, Services, FeaturedWork,
                          #   Trajectory, Showcase, LatestPosts, VideoTestimonials, ...)
  features/               # ThemeToggle, ContactForm, ContactTabs, CalendlyWidget,
                          #   AwardsGallery, WhatsAppButton (floating chat button, all pages),
                          #   CookieYesBanner, ReCaptchaProvider
  seo/                    # JsonLd (inlines <script type="application/ld+json">)
  ui/                     # the primitives above
src/config/   site.ts (brand/identity), navigation.ts (nav + primaryCta)
src/data/     services, process, differentiators, faq, outcomes, testimonials, products,
              fit, principles, experience, showcase, skills, blog  ← all content lives here
src/lib/      validations (zod + budget/timeline options), email, db, rate-limit, seo, utils,
              recaptcha (server-side token verification)
src/types/    shared interfaces
PRODUCT.md    design context for the `impeccable` design skill (register, audience,
              anti-references, current direction) — see "Homepage v2 redesign" above
```

**Content is data-driven:** edit files in `src/data/` and `src/config/site.ts` — sections read
from them. The homepage section order encodes the conversion funnel; don't reorder casually.

## Conventions

- Server components by default; add `'use client'` only when needed (Navbar, ContactForm,
  ContactTabs, Hero, Reveal, ThemeToggle, CalendlyWidget).
- Style with Tailwind tokens; reach for the `ui/` primitives before writing bespoke markup.
- The single primary CTA is **"Book a call" → `/contact`** (from `navigation.ts`). Keep it
  consistent everywhere; never reword it.
- App Router `params` are async — `await params` in dynamic pages (see `blog/[slug]`).

## Contact (tabbed: form OR calendar)

`src/components/features/ContactTabs.tsx` is the entry point on `/contact`. It wraps two
panels in a tabbed card so the visitor picks their own path:

1. **Send a brief** — the form (`ContactForm.tsx`): name, email, phone (optional, digits only,
   exactly 10 digits when filled), project description, budget, timeline. Required fields
   marked with `*`. Submit button is the canonical primary (ink fill, lifted shadow,
   arrow-nudge on hover, explicit `cursor-pointer`). On success the confirmation card offers
   an "Or pick a time now" link that switches the tab to the calendar (via an `onPreferCall`
   prop, so the form's success state can drive the tab state).
2. **Book a call** — the Calendly inline widget (`CalendlyWidget.tsx`).

Both panels use a **lazy keep-alive** pattern: the form mounts from the start, Calendly
mounts on first open of the call tab (so it sizes correctly inside a visible container), and
both stay mounted after first visit (form state and Calendly state survive tab switches).
When `NEXT_PUBLIC_CALENDLY_URL` is not set, the tabs collapse to just the form (no second
tab to switch to).

## Work showcase (case-study grid)

`src/components/sections/Showcase.tsx` is shared between `/work` and `/services` via a
`variant?: 'grid' | 'cases'` prop:

- `variant="grid"` (default) — original 3-up mood/thumb band, used on `/services`.
- `variant="cases"` — 2-up big case-study cards, used on `/work`. Whole-card clickable
  (opens the live site in a new tab), supports image OR video on each entry via the
  `video`/`videoPoster` fields on `ShowcaseItem`, and shows: category eyebrow → serif label
  → caption → "View live site" CTA with arrow nudge. Hover lifts the card and scales the
  media `1.02`. `urlDisabled` entries render as muted "Link unavailable" with a lock icon.

Media area uses `aspect-[21/10]`. Every current asset (Veylix, Fairpath, Vallorex, Foxera
screenshots AND their MP4 screen recordings) is captured at ~2.08–2.10 ratio, so
`object-cover` fits all of them with effectively zero crop or letterbox.

Videos autoplay muted/looped/playsInline. To add a video to any entry: drop an `.mp4` into
`/public/videos/work/` and set `video: '/videos/work/foo.mp4'` on the entry. Keep `src` set
too so it serves as the poster.

All four `/work` entries (Veylix, Fairpath, Vallorex, Foxera) are real client work with both
poster + screen-recording wired up. Order is Veylix → Fairpath → Vallorex → Foxera. There
are no placeholder showcase items on `/work`.

## Testimonials

`src/data/testimonials.ts` — the `WrittenTestimonial` type supports `companyUrl?` and
`location?` fields for company-attributed quotes. When `author` is empty the component shows
the linked company name as the primary attribution line and `location` as a muted sub-line.
The contact page pulls `writtenTestimonials[0]` for the inline quote in the left column.

## Spam protection (reCAPTCHA v3 + honeypot)

The contact form has two independent layers, both fail-open in dev:

1. **Honeypot field** — `website` in `src/lib/validations.ts`, a `z.string().max(0).optional()`
   field that's invisible to real users but bots fill in. Rejected server-side if non-empty.
2. **Google reCAPTCHA v3** — `ReCaptchaProvider.tsx` wraps the app in `layout.tsx` and loads the
   script only when `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set (no-op otherwise, so dev works
   without keys). `ContactForm.tsx` calls `useReCaptcha().executeRecaptcha('contact_submit')`
   on submit and sends the token to the API route; `src/lib/recaptcha.ts` verifies it
   server-side against Google using `RECAPTCHA_SECRET_KEY`. Both env vars are required together;
   set neither to disable in a given environment. `recaptcha.google.com` /
   `www.google.com` / `www.gstatic.com` are allowlisted in the CSP (`script-src`, `style-src`,
   `frame-src`, `connect-src`) in `next.config.ts` for this.

## Cookie consent (CookieYes)

`CookieYesBanner.tsx` loads the CookieYes client script (`strategy="beforeInteractive"`,
required so it initializes before other scripts) and renders unconditionally at the top of
`<body>` in `layout.tsx` — it's always on, not env-gated (the site ID is embedded in the script
URL). `cdn-cookieyes.com` / `log.cookieyes.com` are allowlisted in the CSP. The privacy policy
(`src/data/legal.ts`) documents it. **Consent Mode v2 is not wired up** — Google Analytics
currently fires regardless of the visitor's cookie choice; the banner is present but doesn't
yet gate GA. Wiring that up is a real gap if EU/UK compliance matters, not just cosmetic.

## Analytics (Google Analytics 4)

`GoogleAnalytics` from `@next/third-parties/google`, rendered in `layout.tsx` only when
`NEXT_PUBLIC_GA_ID` is set (no-op in dev/preview unless configured). `googletagmanager.com` /
`google-analytics.com` / `analytics.google.com` are allowlisted in the CSP. See "Cookie
consent" above re: Consent Mode not being wired up yet.

## Blog (Sanity-backed)

The blog is live on **Sanity**. The app only **reads** published content; it ships
no Studio code. Read-side lives in `src/sanity/` (`env.ts`, `lib/client.ts`,
`lib/live.ts` (Live Content API), `lib/image.ts`, `lib/queries.ts`, `types.ts`).
`/blog` is paginated (`?page=`), `/blog/[slug]` renders Portable Text + SEO/JSON-LD.

Blog post detail page layout: editorial hero (centered title + excerpt + meta + featured image
at `max-w-5xl`) then a two-column body grid (`max-w-6xl`): article prose on the left (`max-w-2xl`)

- sticky right-rail Table of Contents (`TableOfContents`, hidden on mobile, only shown when
  2+ headings exist). Share buttons (X, LinkedIn, Facebook, WhatsApp, copy-link) appear after
  the article. A "Read next" strip with 2 related posts sits below.

The homepage has a **`LatestPosts`** section (just before `FinalCta`) that fetches the 3 most
recent posts via `LATEST_POSTS_QUERY` and renders them in a 3-column grid.

**Freshness / caching (read before touching blog fetching).** Blog reads use **tag-based
on-demand revalidation** (the Sanity + Next best practice for a mostly-static blog), NOT
`defineLive`'s `sanityFetch`. `sanityFetch` pins every fetch to `revalidate: false` and only
invalidates via a mounted `<SanityLive />`; this app doesn't mount it, so published posts stayed
frozen at build time until a redeploy (they resolved by direct slug, but the homepage and
`/blog` lists never updated). Now every read goes through
`client.fetch(QUERY, params, blogFetchOptions)` (`sanity/lib/client.ts`), tagged `'post'`
(`BLOG_CACHE_TAG`) with an **hourly** fallback `revalidate` (`BLOG_REVALIDATE = 3600`), and the
homepage + `/blog/[slug]` segments mirror `export const revalidate = 3600`. The primary refresh
path is a **Sanity GROQ webhook → `POST /api/revalidate`**: `parseBody` (from
`next-sanity/webhook`) verifies the signature against `SANITY_REVALIDATE_SECRET`, then
`revalidateTag('post', 'max')` purges all blog reads for a near-instant update on publish/edit. So there
is **no per-minute polling** — content refetches only when something actually changes (or once an
hour as a safety net). To make instant updates work in a given environment, set
`SANITY_REVALIDATE_SECRET` and add the matching webhook in Sanity Manage → API → Webhooks
(URL `https://<site>/api/revalidate`, filter `_type == "post"`, same secret). Don't switch these
reads back to `sanityFetch` unless you also mount `<SanityLive />`. `lib/live.ts` is kept but
unused (its comment explains why).

- **The Studio is a separate project, NOT in this repo** — it lives in the sibling
  folder `../sahal-studio` and is deployed to Sanity hosting (`*.sanity.studio`).
  Edit schema there, then `npm run deploy`. Keep its field names in sync with
  `src/sanity/lib/queries.ts`. Do not re-add an embedded `/studio` route here.
- `next.config.ts` must keep `cdn.sanity.io` in `images.remotePatterns` and the
  `*.sanity.io` / `wss://*.api.sanity.io` entries in the CSP `connect-src`
  (the latter for `<SanityLive />` browser updates). Calendly also requires entries in
  `script-src` (`assets.calendly.com`), `style-src`, `connect-src`, and `frame-src`.
- `scripts/seed-first-post.mjs` (`npm run seed:blog`) seeds content via a write
  token; not needed at runtime.

## SEO

Search-engine plumbing lives in three places:

1. **App Router conventions** (`src/app/`):
   - `sitemap.ts` — static routes + Sanity blog slugs, `revalidate = 3600` so new posts surface
     without a deploy. Renders at `/sitemap.xml`.
   - `robots.ts` — allows everything except `/api/`, references the sitemap. Renders at `/robots.txt`.
   - `manifest.ts` — PWA manifest with brand colors + icons. Renders at `/manifest.webmanifest`.

2. **Root metadata** (`src/app/layout.tsx`): `metadataBase`, title template, default OG/Twitter,
   `viewport` (color-scheme + themeColor per light/dark), `robots` directives, `appleWebApp`,
   keywords, formatDetection. The homepage title includes role + audience (not just the brand
   tagline) so search snippets say what Sahal does: `"Sahal Shaikh | Product Engineer for
Founders & Small Teams"`. The root layout also injects the site-wide JSON-LD `@graph` (Person
   - WebSite, linked via `@id`) via the `JsonLd` component.
   - **Favicon:** `src/app/icon.png` (via Next's file convention, generates the `<link
rel="icon">`) plus `public/favicon.ico` (multi-size 16/32/48, generated with `sharp`) at the
     conventional root URL so crawlers that hard-code `/favicon.ico` don't 404.
   - **OG image:** `public/images/og-image.jpg` is a real 1200×630 generated share-preview
     image (not a placeholder). If you regenerate it, verify the actual file dimensions match
     the `og:image:width`/`height` meta tags in `layout.tsx`, they've been wrong before.

3. **Per-page metadata + structured data** — use the helpers in `src/lib/seo.ts`:
   - `pageMetadata({ title, description, path })` builds canonical + per-page OG/Twitter on top
     of root. Use it on every page so canonicals are explicit.
   - `breadcrumbJsonLd([...])` for BreadcrumbList on inner pages.
   - `professionalServiceJsonLd()` + `faqJsonLd(faqs)` on `/services`.
   - Inject any of the above into the JSX with `<JsonLd data={...} />` (or array of objects)
     from `src/components/seo/JsonLd.tsx`.

The blog post detail page (`/blog/[slug]`) emits both `BlogPosting` and `BreadcrumbList`. To add
a new page: export `metadata = pageMetadata(...)` and render `<JsonLd data={breadcrumbJsonLd(...)} />`
at the top of the page JSX. That's the whole pattern.

## Lead emails (Resend)

`src/lib/email.ts` sends two emails on a successful contact submission:

1. **Owner notification** to `CONTACT_EMAIL`, with `replyTo` set to the lead. Subject
   includes name, budget, and timeline so the inbox view qualifies at a glance.
2. **Lead autoresponder** to the submitter, with `replyTo` set to `CONTACT_EMAIL`. Only
   fires when `RESEND_FROM` is set (a verified domain sender). The Resend sandbox sender
   (`onboarding@resend.dev`) can only deliver to the account owner, so the autoresponder
   would silently bounce without a verified domain.

Both emails are inlined-style HTML + plain-text fallback, using the brand palette as hex
(email clients ignore CSS variables). Voice matches the rest of the site: warm, plain,
no em dashes. No `react-email` dependency, just template literals, deliberately.

The whole flow is best-effort: the API route catches and logs send failures so a missing
or rate-limited Resend doesn't block the form response.

## Database (MongoDB Atlas)

Lead storage via Mongoose. Connection is managed in `src/lib/db.ts` with a cached global
to survive Next.js hot reloads. Key details:

- **Database name:** `sahal-portfolio` — hardcoded as `dbName` in the connect options so it
  always uses the right database regardless of what the URI string specifies.
- **Collection name:** `leads` — set explicitly in the `ContactSubmission` schema options.
- The API route (`src/app/api/contact/route.ts`) only imports and connects when `MONGODB_URI`
  is present; missing env = graceful no-op, not a crash.
- Atlas setup: add your server IP (or `0.0.0.0/0` for Vercel) under Network Access.

## Environment (`.env.local` — see `.env.example`)

- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_CALENDLY_URL` — full Calendly URL with color params; omit to hide the widget
- `MONGODB_URI` — Atlas connection string (database name is overridden by `dbName` in code)
- `RESEND_API_KEY` + `CONTACT_EMAIL` — notification to the owner on new leads
- `RESEND_FROM` — verified-domain sender (e.g. `Sahal Shaikh <hello@sahalshaikh.com>`).
  Required to also fire the lead-side autoresponder; without it, only the owner
  notification goes out via Resend's sandbox sender.
- `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` (public; blog reads)
- `NEXT_PUBLIC_GA_ID` — GA4 measurement ID (e.g. `G-XXXXXXXXXX`); omit to disable analytics
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` — reCAPTCHA v3; both required
  together, omit both to disable

The contact flow works without env in dev (it logs and no-ops persistence/email).

## Commands

- `npm run dev` — dev server (preview uses `.claude/launch.json`)
- `npm run build` — production build (verify before declaring done)
- `npm run lint` — ESLint
- `npx tsc --noEmit` — typecheck

## Imagery & placeholders

Every not-yet-real image renders through **`ImagePlaceholder`** (`src/components/ui/`): a styled
frame that shows an **"Image prompt"** block until you set `src`. To make one real — generate art
from the shown prompt, drop the file in `/public/images`, then set `src` (+ `alt`) on that item.
Prompts live in data/markup, so they're easy to find and edit:

- Hero visuals on `/work` and `/services` → inline `prompt` in each page's `PageHeader media`
- `/services` showcase band (mood imagery for strategy/build/launch) → `src/data/showcase.ts`
  (`servicesShowcase`). The `/work` showcase entries are now all real, no placeholders.
- Product screenshots → `image` / `imagePrompt` on `src/data/products.ts`
- Portrait & candid photos → now REAL photos in `/public/images/portraits/` (see Real assets below)

### Real assets already in the repo (NOT placeholders — don't anonymize or delete)

- **Experience timeline** — `Trajectory.tsx` + `src/data/experience.ts`: Sahal's real, dated
  career history (Vallorex → Reveation Labs → GrabTheSite). Real company logos in
  `/public/images/logos/` (rendered on a white chip in both themes so dark-text logos stay legible).
- **Award certificates** — `/public/images/awards/`: real Reveation Labs recognitions, shown in
  the timeline's "Recognition" block and opened full-size via the `AwardsGallery` lightbox.
- **Veylix Staffing testimonial** — `id: wt-shivam` in `src/data/testimonials.ts`: real,
  client-approved quote. Do not remove or rewrite.
- **Client website work** — `/public/images/work/` (PNG posters) + `/public/videos/work/`
  (MP4 screen recordings) for all four `/work` entries: Veylix, Fairpath, Vallorex, Foxera.
  Both still + motion versions per entry. The videos are heavy (~60 MB combined); re-encode
  with `ffmpeg -c:v libx264 -crf 28 -preset slow -vf scale=1280:-2 -an` before public launch
  if they haven't been optimized yet. (These videos currently load eagerly; see Roadmap.)
- **Portraits** — `/public/images/portraits/`: real photos/generated portraits of Sahal.
  `sahal-hero` (homepage hero, a temporary photo to be swapped for the founder intro video
  later), `sahal-candid` (homepage "short version"), `sahal-services` (/services hero, AI
  generated to match the reference photos), `sahal-headshot` (/about portrait), `sahal-desk`
  (/work hero). `sahal-candid-grey` is an unused alternate. Don't swap back to placeholders.
- **Brand icon set** — `src/app/icon.png` (favicon), `src/app/apple-icon.png`,
  `public/icon-maskable.png`, and `public/favicon.ico`: the amber "S." tile, generated from one
  source. Referenced by `manifest.ts` (`display: 'browser'`, not `'standalone'`, so Chrome/Edge
  don't prompt visitors to "install" a portfolio site as an app).
- **OG share image** — `public/images/og-image.jpg`: real 1200×630 generated preview, on-brand.
- **Client video testimonials** — two real, client-provided on-camera testimonials in
  `/public/videos/testimonials/`: `foxera-testimonial.mp4` (Foxera Studio, landscape 16:9,
  re-encoded 118MB → ~4MB) and `fairpath-testimonial.mp4` (Fairpath Healthcare, portrait
  9:16 phone video, 9.7MB → ~5MB). Each has a `-poster.jpg`. `VideoTestimonials.tsx` is a
  real click-to-play player (poster + `preload="none"`, so video bytes only download on
  play); it renders every entry in `src/data/testimonials.ts` with a non-empty `src` and
  hides itself when there are none (the old `ENABLED` flag is gone). The `orientation` field
  (`'portrait' | 'landscape'`) drives each clip's frame; on `lg` the clips share a fixed
  height so a wide and a tall video sit on the same baseline without cropping, and they stack
  on mobile. Never crop a portrait clip into a landscape frame. Ledger section `01` on the
  homepage, deliberately right after the hero (trust before pitch); unnumbered on `/work`.
  To add another: re-encode with ffmpeg (`-c:v libx264 -crf 26 -preset slow -c:a aac -b:a
128k`, add `-vf scale=1280:-2` only for oversized landscape sources, never upscale a small
  portrait clip; keep the audio), drop video + a poster frame in, add a data entry with the
  right `orientation`. Never invent a pull-quote or name the person on camera without
  client approval.

### Content placeholders still to replace (clearly marked in code)

- 2 real product names / links / screenshots → `src/data/products.ts` (verify both live
  links resolve before launch)

## Legal pages (`/privacy`, `/terms`)

Both are live. Content is data-driven in `src/data/legal.ts` (`privacyDoc`, `termsDoc`)
and rendered by the shared `src/components/sections/LegalDoc.tsx` (PageHeader + prose).
Paragraph/list strings support markdown-style links: `[label](/internal)`,
`[label](https://x)`, or `[label](mailto:you@x)`. The `LAST_UPDATED` constant and the
governing-law clause (currently India) live in `legal.ts`. The copy is plain-English,
accurate to actual data practices (contact form to MongoDB, Resend email, Calendly,
WhatsApp, theme stored locally, no tracking cookies). Both routes are in the route group
(so they get the Navbar/Footer shell), in `sitemap.ts`, and linked from `footerLinks.legal`.
Not professionally reviewed legal advice; have a lawyer check before relying on them.

## Roadmap / not yet built

- **Lazy-load the `/work` case-study videos.** They are `<video autoPlay>` in `Showcase.tsx`
  (`CaseMedia`), so all four (~63 MB) download eagerly when `/work` loads. Render the poster
  first and only load/play each video when it scrolls into view (IntersectionObserver), pausing
  off-screen. Re-encode the MP4s too (see Imagery).
- Swap the homepage hero photo for the founder intro video when the edit is ready (`Hero.tsx`).
- **Wire Google Consent Mode v2** into the CookieYes + GA integration so GA actually respects
  the visitor's cookie choice instead of firing unconditionally (see "Cookie consent" above).
- Carry the Homepage v2 redesign language (flat cards, no eyebrows, Bricolage type) into the
  remaining homepage sections and inner pages that haven't been touched yet, and revisit
  `FinalCta.tsx` (still the older inked-box treatment).
- Multilingual (EN-only at launch; architecture intended to be i18n-ready later)

The site is live at https://www.sahalshaikh.com (deployed on Vercel).
