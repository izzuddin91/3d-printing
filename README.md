# IZ 3D Printing Website

Marketing and lead-capture website for a 3D printing business, built with Next.js App Router.

## Features

- Conversion-focused homepage with services, process, portfolio preview, and FAQ
- Dedicated pages for `services`, `pricing`, `portfolio`, `quote`, and `contact`
- Interactive pricing estimator on the pricing page
- Quote request form powered by a Server Action (`app/quote/actions.ts`)
- Local quote persistence to `data/quotes.json` for quick MVP storage
- Admin login at `/admin/login` and request table at `/admin/requests`
- Firebase auth wiring via `lib/firebase.ts` with temporary bypass toggle
- SEO basics with `app/sitemap.ts`, `app/robots.ts`, and metadata in `app/layout.tsx`

## Project Structure

- `app/page.tsx`: Homepage
- `app/quote/page.tsx`: Quote form page
- `components/*`: Reusable UI sections
- `lib/site-data.ts`: Business content (services, materials, FAQ, portfolio)
- `lib/quote-store.ts`: Quote storage adapter
- `lib/firebase-credentials.ts`: Firebase placeholder credentials and bypass flag

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

# Firebase placeholders (replace when ready)
NEXT_PUBLIC_FIREBASE_API_KEY=demo-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:demoappid12345

# Keep true while Firebase auth is not enforced yet
NEXT_PUBLIC_ADMIN_BYPASS_AUTH=true
```

You can copy `.env.example` to `.env.local` and update values.

## Notes

This MVP stores quotes in a local JSON file. For production, replace the storage layer in `lib/quote-store.ts` with a database (for example PostgreSQL, Supabase, or SQLite via Prisma).

When you are ready to enforce real admin auth, set `NEXT_PUBLIC_ADMIN_BYPASS_AUTH=false` and use a valid Firebase admin account.

