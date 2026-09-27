# Siga Siga

A small browser game for practising Greek vocabulary and grammar in a supermarket.

The original prototype was created in Figma Make. This repository is the cleaned, maintainable version of that prototype.

## Stack

- React 19
- TypeScript
- Vite
- Plain CSS
- Browser Speech Synthesis API for Greek pronunciation when supported

No backend, database, Tailwind, or Figma runtime is required.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Controls

- Arrow keys: move around the market
- Enter: open the highlighted aisle
- Escape: close the current panel
- Mouse/touch: all main actions can also be clicked

## Game structure

```text
src/
├── components/      Reusable UI and game illustrations
├── data/            Vocabulary, products, categories and mission data
├── game/            Main market scene
├── panels/          Grammar, notebook, progress, aisle and checkout panels
├── styles/          Game styling
├── utils/           Browser helpers such as Greek speech synthesis
├── App.tsx          Main game state and keyboard controls
├── main.tsx         React entry point
└── types.ts         Shared TypeScript types
```

## GitHub Pages

A GitHub Actions workflow is included in `.github/workflows/deploy.yml`.

After pushing the repository to GitHub:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main` again if needed.
4. The `Deploy to GitHub Pages` workflow will build and publish the game.

The Vite config uses relative asset paths so the build can work from a GitHub Pages project URL.

## Notes

- Greek pronunciation relies on the browser's available speech voices. If a Greek voice is unavailable, the rest of the game still works.
- The learning progress screen currently contains demo progress data, matching the prototype behavior.
