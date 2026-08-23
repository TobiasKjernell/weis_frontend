# Moroii — Artist Website (Frontend Build Prompt)

## Context
Build the **frontend-only** website for an artist named **Moroii**. Moroii plays **80's horror-inspired darksynth / electronic music**. The site should feel **dark, cinematic, and modern** — not a generic "dark mode" template, but something that stands out and reflects the genre (VHS/retro-futurism, neon glow, synthwave grid horizon, analog grain, CRT scanlines — pick a direction and commit to it).

This is step one of the project: **frontend only**, no real backend yet. Data fetching should be wired up with TanStack Query against mock/local data or placeholder endpoints now, structured so real API calls can be swapped in later with minimal rework.

---

## Tech Stack (required)
- **TypeScript** — strict mode on
- **TailwindCSS** — for all styling, custom theme tokens for the dark/synth palette
- **Zustand** — for global/local client state (e.g. UI state, audio player state if added, menu/modal state)
- **TanStack Query** — for all data fetching, even against mock data for now. Must include solid error/loading/empty states since real endpoints come later
- **Zod** — for schema validation of all data shapes (validate mock/fetched data through Zod schemas so swapping to a real API later just means changing the fetcher, not the validation)
- **One animation library** — choose one (e.g. Framer Motion, GSAP, or Motion One) and use it consistently across the whole site. Do not mix animation libraries.

---

## Assets
- Use assets from the `artist_assets` folder wherever they fit (logo, photos, textures, etc.)
- If nothing suitable exists for a given spot, use **clearly-marked placeholders** (placeholder images/icons) so they're easy to swap out later — don't block on missing assets.

---

## Global Design Direction
- **Theme:** dark, moody, horror-synth aesthetic — but modern and polished, not cheesy or dated. Think: neon magenta/cyan accents on near-black backgrounds, subtle grain/noise texture, glow effects, sharp modern typography contrasted with a retro display font for headers.
- **Consistency:** define a Tailwind theme (colors, fonts, spacing, radii) once and reuse it everywhere — no one-off inline styling.
- **Responsiveness:** fully responsive, mobile-first.
- **Motion:** motion should reinforce the mood (slow fades, glitch/flicker effects, parallax) — not just generic fade-ins. Respect `prefers-reduced-motion`.

---

## Intro Animation
- A **full-page intro animation** that plays on load, before revealing the site.
- Use an asset from `artist_assets` as the centerpiece (e.g. logo reveal, glitch-in effect, VHS static transition into the hero).
- Should be skippable and not replay on every route change (only on first load / session).

---

## Sections

### 1. Hero / Intro Section
- Full-viewport landing area introducing Moroii (name/logo, tagline, maybe a short bio teaser).
- Strong visual moment — this is the first impression after the intro animation.

### 2. About / Introduction
- Short artist bio/introduction section — who Moroii is, style, influences (darksynth, 80's horror soundtracks, etc.)

### 3. Gallery
- Grid/masonry-style photo gallery pulling from `artist_assets`.
- Lightbox or expanded view on click.
- Placeholder images where real assets are missing.

### 4. Tour Section
- List/grid of tour dates, each with:
  - Date
  - City/Place
  - Venue
  - "Tickets" link (external URL)
- Fetched via TanStack Query (mock data for now, validated with Zod), with proper **loading, error, and empty states**.

### 5. Merch Section
- Placeholder product grid (image, name, price) — no real checkout/cart logic needed yet, just UI placeholders ready to be wired to a store later.

### 6. Footer
- Social links, contact, copyright.

---

## State & Data Handling Notes
- **Zustand:** use for UI-level state (intro-played flag, mobile nav open/closed, lightbox state, etc.) — not for server data.
- **TanStack Query:** use for anything resembling "fetched" data (tour dates, gallery items, merch items), even if currently sourced from local mock JSON. Structure query hooks (e.g. `useTourDates`, `useGalleryItems`, `useMerchItems`) so swapping the fetcher to a real API later is a one-line change.
- **Zod:** define schemas for TourDate, GalleryItem, MerchItem, etc. Parse/validate data at the query layer and surface validation errors through the same error-handling path as network errors.
- **Error handling:** every data-driven section needs a clear loading skeleton, a graceful error state (with retry), and an empty state — this matters more here since real fetching comes later and we want it robust from day one.

---

## Suggested Project Structure
```
src/
  assets/            # references/imports from artist_assets
  components/
    intro/
    hero/
    about/
    gallery/
    tour/
    merch/
    footer/
    ui/              # shared/reusable UI primitives
  hooks/             # tanstack query hooks
  schemas/           # zod schemas
  store/             # zustand stores
  lib/               # fetchers, mock data, utils
  styles/            # tailwind config/theme
```

---

## Deliverables / Acceptance Criteria
- [ ] Full-page intro animation using an asset from `artist_assets`, plays once per session
- [ ] Cohesive dark/darksynth visual theme applied consistently via Tailwind theme tokens
- [ ] One animation library chosen and used throughout
- [ ] Hero, About, Gallery, Tour, Merch, and Footer sections implemented
- [ ] Gallery uses real assets where available, placeholders elsewhere
- [ ] Tour section fetches via TanStack Query with loading/error/empty states, data validated with Zod
- [ ] Merch section as placeholder UI, structured for future real data
- [ ] Zustand used for relevant UI state
- [ ] Fully responsive, respects `prefers-reduced-motion`
- [ ] TypeScript strict, no `any` left unaddressed

---

## Open Questions / Assumptions (adjust before building)
- Assuming no routing library is needed yet since this is a single-page marketing-style site — confirm if multi-page routing is wanted.
- Assuming ticket links are external (no in-house checkout).
- Assuming merch has no cart/checkout logic yet — display only.
- Font choices, exact color palette, and animation library are left to implementation discretion within the "dark, modern, darksynth" brief unless you want to specify these upfront.
