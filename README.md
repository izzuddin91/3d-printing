# IZ 3D Printing Website

Marketing and lead-capture website for a 3D printing business, built with Next.js App Router.

## Features

- Conversion-focused homepage with services, process, portfolio preview, and FAQ
- Dedicated pages for `services`, `pricing`, `portfolio`, `quote`, and `contact`
- Interactive pricing estimator on the pricing page
- Quote request form powered by a Server Action (`app/quote/actions.ts`)
- Local quote persistence to `data/quotes.json` for quick MVP storage
- SEO basics with `app/sitemap.ts`, `app/robots.ts`, and metadata in `app/layout.tsx`

## Project Structure

- `app/page.tsx`: Homepage
- `app/quote/page.tsx`: Quote form page
- `components/*`: Reusable UI sections
- `lib/site-data.ts`: Business content (services, materials, FAQ, portfolio)
- `lib/quote-store.ts`: Quote storage adapter

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Environment

Set your production URL for canonical metadata and sitemap links:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Notes

This MVP stores quotes in a local JSON file. For production, replace the storage layer in `lib/quote-store.ts` with a database (for example PostgreSQL, Supabase, or SQLite via Prisma).
