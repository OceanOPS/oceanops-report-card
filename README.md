# OceanOPS Report Card - GOOS Status Report 2024

Interactive web application presenting the Global Ocean Observing System (GOOS) Status Report 2024. Built with React, TypeScript, and modern web technologies to deliver an engaging, multilingual experience showcasing ocean observing networks and their contributions to climate, operational services, and ocean health.

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
- **staging**: `http://localhost:5173/` (root deployment for Netlify)
- **main**: `http://localhost:5173/demos/report-card/` (subdirectory deployment for production)

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

## Project Structure

```
oceanops-report-card/
├── public/                    # Static assets
│   ├── backgrounds/          # Background images
│   ├── icons/               # Network, physics, and biology icons
│   ├── images/              # Content images
│   ├── logos/               # Partner and organization logos
│   └── videos/              # Video files
├── src/
│   ├── components/          # 30+ React components
│   ├── locales/            # Translation files (en, es, fr)
│   ├── utils/              # Utility functions (asset path helpers)
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

**Important**: `staging` and `main` have different configurations:
- `staging`: Deploys to root URL (`/`) for Netlify
- `main`: Deploys to subdirectory (`/demos/report-card/`) for production

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
2. Develop and test locally
3. Create PR to `staging` for testing
4. After approval, merge `staging` to `main` for production

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
