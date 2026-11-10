# Production deployment — GOOS Report Card

How to publish the report to **https://www.ocean-ops.org/goosreport/** (site root and yearly editions).

## Before you build

1. **Embedded map** — production builds must use the hosted map URL, not `localhost`:
   - Committed default: [`.env.production`](.env.production) (`VITE_MAP_SRC=…`)
   - Local override (gitignored): `.env.production.local` for Netlify preview tests
   - Do **not** put `VITE_MAP_SRC` in `.env.local` (Vite loads that file during build too).

2. **Partner data** (if needed before release):
   ```bash
   npm run export:partners
   ```

3. From the `oceanops-report-card` repo root:
   ```bash
   npm install
   ```

## Build

| Command | Vite `base` | Local output |
|---------|-------------|--------------|
| `npm run build` | `/goosreport/` only | contents of `dist/` |
| `npm run build -- 2026` | `/goosreport/` **and** `/goosreport/2026/` | `dist/` + `dist-edition/` |

Replace `2026` with the current edition year.

Example for the 2026 edition (staging under `/2026/` plus root build ready for launch day):

```bash
npm run build -- 2026
```

- `dist/index.html`, `dist/assets/…` → **https://www.ocean-ops.org/goosreport/**
- `dist-edition/index.html`, `dist-edition/assets/…` → **https://www.ocean-ops.org/goosreport/2026/**

The build script rejects invalid years and fails if any bundle still references `localhost`.

Optional local check:

```bash
npm run preview
```

## Deploy to the OceanOPS server

### Current edition (e.g. 2026)

1. SSH: `tmignon@vsessionidm` (use your **extranet** password).
2. Go to the edition folder:
   ```bash
   cd /home/oceanops-webapps-data-ro/static_resources/www/goosreport/2026
   ```
3. Upload the **contents** of `dist-edition/` (from `npm run build -- 2026`):
   - `index.html`
   - `assets/`
   - any other files at the build root (`favicon`, etc.)
4. Check in the browser: [https://www.ocean-ops.org/goosreport/2026/](https://www.ocean-ops.org/goosreport/2026/)

**From your machine (example):**

```bash
cd oceanops-report-card
npm run build -- 2026
scp -r dist-edition/* tmignon@vsessionidm:/home/oceanops-webapps-data-ro/static_resources/www/goosreport/2026/
```

Adjust user / host if needed.

### Launch day — official root (`/goosreport/`)

On launch day, also publish the same edition at the **parent** folder, **without removing** past edition directories (`/2025`, `/2026`, …) so history stays available:

1. SSH as above.
2. Parent folder:
   ```bash
   cd /home/oceanops-webapps-data-ro/static_resources/www/goosreport
   ```
3. Upload the contents of **`dist/`** (root `/goosreport/` build) here — files sit **next to** `2025`, `2026`, etc., not inside a year subfolder.
4. Verify: [https://www.ocean-ops.org/goosreport/](https://www.ocean-ops.org/goosreport/)

Recommended order:

1. Test under `/goosreport/2026/` (or the current year) first.
2. On launch day, copy `dist/*` into `/goosreport/` while keeping previous year subfolders.

## Server path summary

| Local build output | Server path | Public URL |
|--------------------|-------------|------------|
| `dist-edition/*` | `…/goosreport/2026/` | `/goosreport/2026/` |
| `dist/*` (root) | `…/goosreport/` | `/goosreport/` |

Older editions remain at `…/goosreport/2025/`, `…/goosreport/2026/`, and so on.

## Troubleshooting

- **Blank map on the live site** — wrong `VITE_MAP_SRC` or `localhost` baked into the bundle → check `.env.production` and rebuild.
- **404 on assets** — wrong deploy target (upload **dist-edition/** into the server `2026/` folder, **dist/** into the server root — do not swap them).
- **Broken links** — do not mix a root-only build with a year build (different Vite bases); use `npm run build -- <year>` to produce both outputs in one go.
