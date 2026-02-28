# Cloud 9 Inflatables

Next.js website for Cloud 9 Inflatables (bouncy house / inflatable rentals).

## Quick Start

Requirements:
- Node.js v24.13.1 
- npm 

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Environment Variables

The inquiry flow posts to `POST /api/inquiry` (see `pages/api/inquiry.js`) which sends email via EmailJS.

Create a `.env.local` (or set these in your hosting provider):

```bash
EMAILJS_SERVICE_ID=...
EMAILJS_TEMPLATE_ID=...
EMAILJS_PUBLIC_KEY=...

# Optional (only if your EmailJS REST setup requires it)
EMAILJS_PRIVATE_KEY=...
```

Notes:
- `pages/api/inquiry.js` will also read `NEXT_PUBLIC_EMAILJS_*` as a fallback for `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY`, but private keys should stay server-only.

## Mock API (Local Development)

This project uses an Axios mock adapter for local/demo data. It is loaded globally in `pages/_app.jsx` via `import "../src/__server__";`.

Relevant mock endpoints used by the site:
- Rentals: `GET /api/rentals/products`
- Rentals: `GET /api/rentals/main-carousel`, `GET /api/rentals/services`
- Products: `GET /api/products/slug-list`, `GET /api/products/slug`, `GET /api/products/search`

## Project Layout

- `pages/`: Next.js routes (UI routes + API routes)
- `src/pages-sections/`: Page section components for routes
- `src/utils/__api__/`: Frontend API client wrappers (Axios)
- `src/__server__/`: Local mock server (Axios Mock Adapter + mock DB)
