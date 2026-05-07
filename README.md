# Cade Stories

Cade Stories is a single-page, newspaper-style web app that generates a whimsical fictional front page from one button press (with an optional prompt). The UI is the product: clear typography, multi-column layout, pull quotes, sidebars, and playful absurdist tone.

## Quick Start

```bash
npm install
npm run dev
```

Optional Story Engine endpoint:

```bash
cp .env.example .env
```

Set `VITE_STORY_ENGINE_URL` when you want live generation from the external engine. Without it, the app uses a local mock generator based on the Cade lore pack.

## Architecture

The project uses clean boundaries so generation logic, page composition, and rendering are independently replaceable:

```text
src/
  engine/      # layout/template engine for section placement
  models/      # strict TS domain types + lore + JSON schemas
  services/    # Story Engine client (API + mock fallback)
  components/  # reusable UI building blocks
  routes/      # route-level composition (SPA front page route)
  utils/       # shared tiny helpers
```

### Module Responsibilities

- `src/models/types.ts`: canonical typed data model for `Headline`, `Article`, `QuoteItem`, `WeatherReport`, `ClassifiedItem`, and `NewspaperPageData`.
- `src/models/schemas/*.schema.json`: JSON Schemas for every content entity and final page payload.
- `src/engine/newspaperLayoutEngine.ts`: front-page template (`front-page-v1`) with section-to-column mapping and min heights.
- `src/services/storyEngineClient.ts`:
  - `generateNewspaper(prompt?)`
  - `regenerateSection(current, section, prompt?)`
  - live API call when `VITE_STORY_ENGINE_URL` exists
  - deterministic local mock generation fallback
- `src/routes/HomeRoute.tsx`: application state and orchestration.
- `src/components/NewspaperPage.tsx`: newspaper rendering and section-level regenerate actions.
- `src/components/GenerateControls.tsx`: top controls for prompt + full regeneration.

## Data Contract

High-level output shape:

```json
{
  "headline": { "title": "", "summary": "" },
  "articles": [{ "id": "", "title": "", "body": "", "pullQuote": "" }],
  "quotes": [{ "id": "", "speaker": "", "quote": "" }],
  "weather": { "forecast": "", "temperature": "" },
  "classifieds": [{ "id": "", "title": "", "description": "" }]
}
```

JSON schema files:

- `src/models/schemas/headline.schema.json`
- `src/models/schemas/article.schema.json`
- `src/models/schemas/quote.schema.json`
- `src/models/schemas/weather.schema.json`
- `src/models/schemas/classified.schema.json`
- `src/models/schemas/newspaper-page.schema.json`

## Story Engine Integration

Current service contract assumes a `POST` endpoint:

- URL: `${VITE_STORY_ENGINE_URL}/newspaper/generate`
- Body:
  - Full generate: `{ "prompt": "optional prompt" }`
  - Section regenerate: `{ "prompt": "optional prompt", "section": "quotes" }`

Expected response: `NewspaperPageData`.

If your external Story Engine differs, update only `src/services/storyEngineClient.ts` and keep the rest of the app unchanged.

## Current Features

- Newspaper masthead and structured front page.
- Main headline, three article slots, quotes, weather, and classifieds.
- Optional prompt before generation.
- One-click full generation.
- Per-section regeneration.
- Placeholder illustration panels for future sprite integration.
- Responsive collapse to single-column on narrow screens.

## Future Expansion Roadmap

### Phase 1 (Now Complete)

- Base SPA scaffold (Vite + React + TypeScript)
- Domain models and schema files
- Layout engine v1 (`front-page-v1`)
- Story engine service abstraction
- Newspaper UI skeleton + section regeneration

### Phase 2 (Template System)

- Add `front-page-v2` and runtime template switch in engine only
- Introduce section style presets (headline-heavy, quote-heavy)
- Add explicit layout registry and template metadata

### Phase 3 (Output and Publishing)

- Export front page as image/PDF
- Print stylesheet for physical newspaper mode
- Issue metadata (date, volume, issue number)

### Phase 4 (Illustrations)

- Integrate sprite-engine for generated art panels
- Add optional image slots in schema
- Fallback placeholders when art generation is unavailable

### Phase 5 (Interactive Modes)

- Kids submit headline mode
- Guided prompt packs by theme
- Safe content moderation pass before render

## Notes

- Non-goals are intentionally excluded: multi-page issues, accounts, persistence, story-type chooser, comic workflow.
- This codebase is intentionally modular for later evolution while keeping current UX very simple: generate, read, regenerate section.
