# React + Vite + TypeScript + Tailwind CSS + i18n

A minimal React application with Vite, TypeScript, Tailwind CSS, and multilingual support (i18n).

## Features

- ⚡️ **Vite** - Fast build tool with HMR (Hot Module Replacement)
- ⚛️ **React 18** - Latest React version
- 🔷 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🌍 **i18next** - Internationalization (English & Spanish)
- 📏 **ESLint** - Code linting with recommended rules

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173/` (or another port if 5173 is busy).

### Verify HMR

1. Open the app in your browser
2. Edit `src/App.tsx` or any component
3. Save the file
4. Changes will appear instantly without full page reload

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/       # React components (currently empty)
├── locales/         # Translation files
│   ├── en.json      # English translations
│   └── es.json      # Spanish translations
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── i18n.ts          # i18next configuration
└── index.css        # Global styles with Tailwind directives
```

## Changing Language

Click the "English" or "Spanish" buttons in the app to switch between languages.

## Adding New Languages

1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Add translations with the same keys as `en.json`
3. Import and register it in `src/i18n.ts`

## Technologies Used

- React 18.2
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- react-i18next 14
- ESLint 8
