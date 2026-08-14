# HM Coding

Official website for HM Coding, a software studio that builds websites, web apps, mobile apps, AI integrations, and business systems.

Live site: https://hm-coding.vercel.app  
Canonical domain: https://hmcoding.com

## Tech stack

- React 19
- TypeScript
- Vite 7
- React Router
- Tailwind CSS 3
- Framer Motion
- Supabase Auth + PostgreSQL
- Vercel (static SPA)

There is no Express, MongoDB, or Render backend in this repository.

## Local setup

```bash
npm install
cp .env.example .env
```

Fill `.env` with your Supabase project URL and anon key, then:

```bash
npm run dev
```

Other commands:

```bash
npm run lint
npm run build
npm run preview
npm run test:e2e
```

## Environment variables

Frontend variables (Vite, must be prefixed with `VITE_`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |

Never put a Supabase service-role key in frontend code or Vercel `VITE_*` settings.

For production, set the same variables in the Vercel project.

## Data and admin

Supabase tables used by the app:

- `jobs` — public careers listings
- `reviews` — testimonials, shown only when approved
- `contact_messages` — contact, internship, startup, and demo inquiries
- `profiles` — admin authorization (`role = admin` or `user`)

Apply SQL from `supabase/migrations/20260814_production_security.sql`, then promote an Auth user:

```sql
update public.profiles
set role = 'admin', updated_at = now()
where id = '<auth-user-uuid>';
```

See `supabase/README.md` for the access model.

Admin portal: `/hm-portal-admin-dashboard`  
Shortcut on the public site: `Ctrl+Shift+H`

Route guards are UX only. Row Level Security is authoritative.

Job applications use each listing's external `apply_url`. Internship and startup inquiries are stored as contact messages.

## Public routes

- `/` Home
- `/about`
- `/services`
- `/projects`
- `/projects/:slug` product demos or project pages
- `/careers`
- `/terms`
- `/privacy`

Unknown routes render a branded 404 page.

## Project structure

```
src/                 React application
src/admin/           Admin portal
src/components/      Shared UI
src/pages/           Public routes
src/lib/             Supabase client, auth, validation
supabase/migrations  Versioned SQL
public/              Static assets, robots.txt, sitemap.xml
```

## Deployment

Vercel builds with `npm run build` (`tsc -b && vite build`) and publishes `dist`.

`vercel.json` rewrites all paths to `index.html` so React Router deep links work.

## Design

The site is a dark premium interface. There is no light-mode toggle.

## License

Private project — HM Coding
