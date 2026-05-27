# Project Dashboard

Vanilla JS performance report generator. No build step — open `index.html` in browser.

## Files
| File | Purpose |
|------|---------|
| `index.html` | App shell, sidebar, CDN scripts |
| `script.js` | All logic (~3000 lines) |
| `style.css` | All styles + CSS vars |
| `intercom-report-generator/` | Separate sub-tool (PDF from Intercom exports) |

## Key Architecture

**Clients** (5): `Client SJ (C1)`, `Client WC (C10)`, `Client JE (C11)`, `Client PK`, `Client FC (C15)`

**State** lives in `clientStore[clientName]` — per-client isolated data.  
Active client set via `switchClient(navId, clientName)`.

**Theme system** (`CLIENT_THEMES` map → `applyClientTheme(name)`):
- Sets CSS vars on `:root` (`--primary`, `--sl-bg`, etc.)
- `tc1(alpha)` / `tc2(alpha)` → rgba helpers using active `THEME`
- Add new theme: add entry to `CLIENT_THEMES`, add sidebar nav link

**Data flow**: Upload CSV/XLSX → PapaParse/XLSX → `state.rawData` → `processData()` → slides rendered.

**Slides** (9+): Each slide has a `renderSlideN()` function. Slide data pulled from `state.processed`.

**Charts**: Chart.js v4. All chart instances stored in `state.charts` — destroy before re-render.

**PDF export**: html2canvas → jsPDF. Renders each slide div to canvas then stacks as pages.

## CDN Dependencies (index.html)
- PapaParse 5.5.3, XLSX 0.18.5, Chart.js 4.4.7, chartjs-plugin-datalabels 2.2.0, jsPDF 2.5.2, html2canvas 1.4.1

## CSS Conventions
- CSS vars: `--primary`, `--sidebar-bg`, `--sl-bg`, `--sl-panel`, `--sl-panel-border`
- Slide vars prefixed `--sl-`; app vars unprefixed
- Dark mode via `.dark` on `<body>`

## Non-Obvious Gotchas
- `getTheme()` reads `#sidebarProjectName` text to resolve active theme — must match `CLIENT_THEMES` key exactly
- `CIRCLE_MAP`: state code → full name for circle labels
- `intercom-report-generator/` has its own `node_modules` (pdf-parse, pdfjs-dist) — run separately
- No TypeScript, no bundler, no tests
