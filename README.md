# OceanOPS Report Card - GOOS Status Report 2025

Interactive web application presenting the Global Ocean Observing System (GOOS) Status Report 2025. Built with React, TypeScript, and modern web technologies to deliver an engaging, multilingual experience showcasing ocean observing networks and their contributions to climate, operational services, and ocean health.

## Features

- 🌊 **30+ Custom Components** - Modular architecture for data visualization, media galleries, and interactive content
- 🎨 **GOOS Design System** - Complete color palette with 45 custom Tailwind colors
- 🌍 **Multilingual Support** - Full internationalization in English, Spanish, and French
- ⚡️ **Fast Performance** - Vite build tool with Hot Module Replacement (HMR)
- 🎬 **Smooth Animations** - GSAP-powered entrance effects and scroll triggers
- 📊 **Data Visualization** - Interactive tables, stats panels, and network cards
- 🖼️ **Rich Media** - Image galleries, video modals, and carousel components
- 📱 **Fully Responsive** - Mobile-first design adapting to all screen sizes

## Technologies

- **React 18** - UI library with hooks and functional components
- **TypeScript 5** - Type safety and enhanced developer experience
- **Vite 5** - Lightning-fast build tool and dev server
- **Tailwind CSS 3** - Utility-first styling with custom GOOS theme
- **react-i18next 14** - Internationalization framework
- **GSAP** - Professional-grade animation library
- **Embla Carousel** - Smooth, performant carousels
- **Roboto Fonts** - Typography via @fontsource

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/OceanOPS/oceanops-report-card.git
cd oceanops-report-card

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will start at different URLs depending on your branch:
- **staging** or **feature branches**: `http://localhost:5173/` (root deployment)
- **main**: `http://localhost:5173/demos/report-card/` (subdirectory deployment)

Both use the same code with `asset()` helper - only `vite.config.ts` differs.

### Local embedded map

The Operational Platforms globe is an iframe to [oceanops-simple-map](https://github.com/OceanOPS/oceanops-simple-map). By default it loads the production URL. To test map changes locally, create a `.env.local` file (gitignored):

```bash
VITE_MAP_SRC=http://localhost:5174/demos/simple-arcgis-map/
```

Then run both apps:

```bash
# Terminal 1 — map (port 5174)
cd ../oceanops-simple-map && npm run dev

# Terminal 2 — report card (port 5173)
npm run dev
```

Restart the report card dev server after creating or editing `.env.local`. Remove the file (or unset `VITE_MAP_SRC`) to use the production map again.

### Build for Production

```bash
# Type-check and build
npm run build

# Preview production build
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Type-check with TypeScript and build for production
- `npm run lint` - Run ESLint on all TypeScript files
- `npm run preview` - Preview production build locally
- `npm run export:partners` - Regenerate `src/data/partnerCountries.ts` from OceanOPS
- `npm run export:partners:dry-run` - Print exported data without writing the file

### Partner country export (build-time)

Platform counts in the **Our Partners** modal can be regenerated from OceanOPS instead of hand-editing `src/data/partnerCountries.ts`.

```bash
# Requires OceanOPS API (local docker or internal URL)
OCEANOPS_API_URL=http://localhost:8080/data npm run export:partners

# Preview output
npm run export:partners:dry-run

# Force public ArcGIS REST fallback (no Java API needed)
node scripts/export-partner-countries.mjs --source=arcgis --dry-run
```

**Data sources (auto-detected):**

1. **OceanOPS Java API** (preferred) — uses operational platform queries with `program.country.code2` attribution, matching how partner statistics are compiled internally.
2. **ArcGIS REST** (fallback) — uses the public `PtfLocations` latest-locations layer when the API is unavailable (e.g. CI).

**GO-SHIP / SOT exception:** These networks are monitored via design lines, not platforms. Per-country counts come from PostgreSQL (`line_program → program.country`) for manually selected line names in `exportConfig.mjs`.

**Tsunami buoys:** API filter uses platform type `Tsunameter Buoy` (not `Tsunameter`).

**HF radars:** All platforms of type HF Radar (no status filter).

**OceanSITES exception:** Counts include `OPERATIONAL` and `INACTIVE` platforms.

**FVON / AniBOS / OceanGliders:** Layer-table statuses (REGISTERED, OPERATIONAL, INACTIVE, CLOSED). The script tries Postgres first to apply `latest_loc_date` cutoffs; if the DB has no matching rows (common on dev dumps), it falls back to the API without the date filter and logs `no DB date rows — API status-only`.

**OceanSITES exception:** Counts include `OPERATIONAL` and `INACTIVE` platforms.

Set `PARTNER_EXPORT_EDITION` to label the run in the criteria summary (e.g. `2026-report-card`).

### Configuring export criteria

Edit **`scripts/partner-export/exportConfig.mjs`** before each edition:

- **`GO_SHIP_SELECTED_LINE_NAMES`** — manual GO-SHIP line list (same workflow as your colleague’s `WHERE name IN (...)` SQL). Set to `null` to count all GO-SHIP lines with `line_program`.
- **`SOT_SELECTED_LINE_NAMES`** — manual SOOP XBT line list for the `sot` network. Set to `null` to count all SOOP XBT lines with `line_program`.
- **`OCEAN_GLIDERS_MIN_LAST_LOC_DATE`**, **`ANIBOS_MIN_LAST_LOC_DATE`**, **`FVON_MIN_LAST_LOC_DATE`** — latest location cutoffs for the 2025 layer table.
- **`NETWORK_CRITERIA`** — human-readable summary + SQL hints per network (mirrors the colleague’s `ptf_loc_n` / `goship_design_goship_1` queries).
- **`EXPORT_EDITION_LABEL`** — default edition label (overridable via `PARTNER_EXPORT_EDITION`).

After every run (including `--dry-run`), the script prints an **Export criteria summary** to stderr: per-network totals, criteria description, SQL hint, and the full GO-SHIP line name list in use.

Network filter definitions live in `scripts/partner-export/networkFilters.mjs`. Editorial metadata (e.g. EU description) is preserved from the existing file and `scripts/partner-export/countryMeta.mjs`.

**Note:** Map sidebar counts in the embedded ArcGIS iframe are computed live by `ocean-ops.org/demos/simple-arcgis-map/` and are not part of this export.

## Storybook Documentation

Interactive component documentation is available via Storybook. It includes:

- 📚 **30+ Component Stories** - Complete documentation for all React components
- 🎨 **Figma Integration** - Embedded Figma designs for each component
- 🎭 **Live Examples** - Interactive component variants and use cases
- 📐 **Design System** - Complete GOOS color palette and typography reference
- 🖼️ **Design Prototypes** - Interactive prototypes of the full report

### Running Storybook

```bash
# Navigate to docs folder
cd docs

# Install dependencies (first time only)
npm install

# Start Storybook
npm run storybook
```

Storybook will start at `http://localhost:6006`

### Storybook Structure

- **01. Introduction** - Project overview, complete report layout, and credits
- **02. Design System** - Figma designs and interactive prototypes
- **03. Foundation** - Colors, typography, spacing, and icons
- **04. Brand** - GOOS logo and partner logos
- **05. Components** - All 30+ React components with Figma designs
- **06. Layout** - Layout modules and carousels

Each component story includes:
- Embedded Figma design
- Interactive controls to test props
- Multiple variants and use cases
- Links to open designs directly in Figma

## Project Structure

```
oceanops-report-card/
├── docs/                      # Storybook documentation (isolated)
│   ├── .storybook/           # Storybook configuration
│   ├── stories/              # Component stories with Figma embeds
│   ├── package.json          # Storybook dependencies
│   └── tailwind.config.js    # Storybook-specific Tailwind config
├── public/                    # Static assets
│   ├── backgrounds/          # Background images
│   ├── icons/               # Network, physics, and biology icons
│   ├── images/              # Content images
│   ├── logos/               # Partner and organization logos
│   └── videos/              # Video files
├── src/
│   ├── components/          # 30+ React components
│   ├── locales/            # Translation files (en, es, fr)
│   ├── utils/              # Utility functions
│   │   └── assets.ts       # asset() helper for base URL resolution
│   ├── App.tsx             # Main application
│   ├── main.tsx            # Application entry point
│   ├── i18n.ts             # i18next configuration
│   └── index.css           # Global styles with Tailwind
├── tailwind.config.js      # Tailwind + GOOS color configuration
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Branch Strategy

The project uses a two-branch workflow:

```
feature-branches → staging (testing/preview) → main (production)
```

- **staging** - Default branch for development and testing (deployed to Netlify)
- **main** - Production branch (deployed to subdirectory)

### Unified Codebase with Divergent Configuration

Both branches use **identical code** with the `asset()` helper function for all asset paths. The only difference is the `vite.config.ts` configuration:

**staging** (`vite.config.ts`):
```ts
export default defineConfig({
  plugins: [react()],
  // No base path - deploys to root
})
```
- `BASE_URL` = `/`
- `asset('/images/photo.jpg')` → `/images/photo.jpg`
- Deployed to: `https://oceanops-report-card.netlify.app/`

**main** (`vite.config.ts`):
```ts
export default defineConfig({
  plugins: [react()],
  base: '/demos/report-card/',
})
```
- `BASE_URL` = `/demos/report-card/`
- `asset('/images/photo.jpg')` → `/demos/report-card/images/photo.jpg`
- Deployed to: `https://oceanops.org/demos/report-card/`

This approach allows seamless cherry-picking of commits between branches without manual path adjustments.

## Deployment

### Staging (Netlify)
- **Branch**: `staging`
- **URL**: Deployed to root path
- **Purpose**: Testing and preview environment

### Production
- **Branch**: `main`
- **URL**: Deployed to `/demos/report-card/` subdirectory
- **Purpose**: Live production site

## Key Components

### Layout & Structure
- **Preloader** - Loading screen with progress indicator
- **CoverModule** - Hero section with background media
- **ContentModule** - Flexible content sections
- **Spacer** - Consistent vertical spacing

### Data Display
- **StatsGrid** - 2×2 statistics grid
- **DataTable** - Configurable data tables
- **IconTable** - Tables with icons and legends
- **DataCard** - Individual data cards
- **MapStatsPanel** - Map/iframe with optional stats

### Network Components
- **NetworkCard** - Network information with ratings
- **NetworkCarousel** - Horizontal scrolling network cards
- **EmergingNetworkCard** - Media-rich emerging network cards
- **EmergingNetworkCarousel** - Carousel for emerging networks

### Media Components
- **ImageGallery** - Carousel with navigation
- **VideoModal** - YouTube and local video player
- **ContentModal** - Flexible modal overlay
- **ImageGrid** - Responsive image grids

### Interactive
- **Button** - Multi-variant button (link, video, modal)
- **Tooltip** - Hover tooltips
- **LanguageSwitcher** - Language toggle

## Internationalization

The application supports three languages:
- 🇬🇧 **English** (default)
- 🇪🇸 **Spanish**
- 🇫🇷 **French**

All user-facing text uses translation keys from `src/locales/` JSON files.

### Adding Translations

1. Update `src/locales/en.json` with new keys
2. Translate to Spanish in `src/locales/es.json`
3. Translate to French in `src/locales/fr.json`
4. Use keys in components via `useTranslation()` hook

## GOOS Color Palette

Custom Tailwind colors with 9 shades each (100-900):
- **Blue** (`goos-blue`) - Primary brand color
- **Cyan** (`goos-cyan`) - Light blue accent
- **Orange** (`goos-orange`) - Attention and highlights
- **Green** (`goos-green`) - Success and environment
- **Gray** (`goos-gray`) - Neutral and text

Usage:
```tsx
<div className="bg-goos-blue-700 text-white">
  <h2 className="text-goos-orange-500">Title</h2>
</div>
```

## Development Guidelines

### Code Standards
- Use TypeScript for all components
- Follow existing component patterns
- Use translation keys (never hardcode text)
- Implement responsive design (mobile-first)
- Add JSDoc comments to all components

### Git Workflow
1. Create feature branch from `staging`
2. Develop and test locally (use `asset()` for all asset paths)
3. Create PR to `staging` for testing
4. After approval, cherry-pick commits to `main` (no manual edits needed!)

**Note**: Since both branches use `asset()`, cherry-picking commits from `staging` to `main` requires no manual path adjustments. Only `vite.config.ts` differs between branches.

### Commit Messages
Use clear, descriptive commit messages:
```bash
git commit -m "Add NetworkCarousel component with Embla integration"
git commit -m "Fix TypeScript errors in Button component"
```

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### Missing Dependencies
If you encounter import errors, ensure all dependencies are installed:
```bash
npm install
```

### HMR Not Working
Restart the dev server:
```bash
# Press Ctrl+C to stop
npm run dev
```

### Build Errors
Run type-check before building:
```bash
npx tsc --noEmit
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b _featureName`)
3. Commit your changes
4. Push to the branch (`git push origin _featureName`)
5. Open a Pull Request to `staging` branch

---

**Built with** ⚛️ React • ⚡️ Vite • 🔷 TypeScript • 🎨 Tailwind CSS
