# Moroii

Frontend for Moroii — 80's horror-inspired darksynth. React + TypeScript + Vite, Tailwind for
styling, Zustand for UI state, TanStack Query + Zod for data (currently backed by local mock
data), Framer Motion for animation.

```
npm install
npm run dev
```

## Debug query params

Tour/gallery/merch data is mocked but fetched through the same TanStack Query + Zod path a real
API would use, with simulated latency. To exercise the loading/error/empty states while the site
is running:

- `?debugDelay=4000` — force a specific artificial delay (ms) on all fetchers
- `?debugError=tour,merch` — force those sections' fetchers to reject
- `?debugEmpty=gallery` — force those sections' fetchers to resolve with no items

## Swapping in a real API

Each section's data flows through `src/lib/fetchers.ts` → a Zod schema in `src/schemas/` → a
`useQuery` hook in `src/hooks/`. To wire up a real backend, replace the body of the relevant
fetcher in `fetchers.ts` with a real `fetch(...)` call — the validation, hooks, and UI states
don't need to change.
