# Portfolio — Aldrian Loberiano

A high-performance, dark-first portfolio web application showcasing design, branding, and development work. Built with React 18, Vite, Tailwind CSS 4, Three.js, and Supabase Edge Functions.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Edge%20Functions-3ECF8E?logo=supabase)](https://supabase.com)

---

## Features

- **Animated Hero** — Three.js light beam background effect (`@react-three/fiber`)
- **Project Showcase** — Featured and categorized work with detailed case studies
- **Services Section** — Product design, brand identity, web development, creative direction
- **Testimonials** — Client feedback with animated counters and stats
- **Contact Form** — Math CAPTCHA, full validation, and email delivery via Resend
- **Search** — Fast project/page search with `Ctrl+K` shortcut and animated modal
- **Navbar** — Scroll-aware, animated mobile menu, Home/Work/About/Contact links
- **Admin & Seed** — Idempotent demo data seeding via Supabase KV store
- **Radix UI Components** — Accordion, dialog, dropdown, tooltip, and 40+ more
- **Dark-first Design** — Space Grotesk + Inter typography, polished transitions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite 6 |
| Styling | Tailwind CSS 4, Motion (Framer Motion API) |
| 3D | Three.js 0.174, @react-three/fiber 8, @react-three/drei 9 |
| UI Primitives | Radix UI, MUI |
| Backend | Supabase Edge Functions (Deno + Hono) |
| Database | Supabase KV store |
| Email | Resend |
| Routing | React Router v7 |

---

## Project Structure

```
portfolio_design/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/          # Hero, Beams, FeaturedWork, MarqueeText, etc.
│   │   │   ├── layout/        # Navbar, Footer, PageLayout
│   │   │   ├── shared/        # ProjectCard, SearchModal, AnimatedCounter
│   │   │   └── ui/            # 40+ Radix-based UI primitives
│   │   ├── context/           # ThemeContext
│   │   ├── data/              # Static project / service data
│   │   ├── hooks/             # useApi, useDataInit, useDataSeed
│   │   ├── lib/               # api.ts — centralized fetch client
│   │   └── pages/             # Home, Work, WorkDetail, About, Contact, Admin
│   └── styles/                # index.css, tailwind.css, theme.css, fonts.css
├── supabase/
│   └── functions/
│       ├── server/            # Source Edge Function (edit here)
│       └── make-server-fcdd5d30/  # Deployed copy (keep in sync)
├── utils/
│   └── supabase/info.tsx      # Reads VITE_ env vars
├── .env.example               # Template — copy to .env.local
├── .env.local                 # Your secrets — gitignored, never commit
└── vite.config.ts
```

---

## Getting Started

### 1. Clone and install

```sh
git clone https://github.com/AldrianLoberiano/portfolio_design.git
cd portfolio_design
npm install
```

### 2. Set up environment variables

```sh
cp .env.example .env.local
```

Open `.env.local` and fill in your own values:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Find these in: **Supabase Dashboard → Project Settings → API**

### 3. Set Edge Function secrets (one-time)

```sh
npx supabase link --project-ref your_project_id
npx supabase secrets set RESEND_API_KEY=your_resend_key
```

### 4. Start development server

```sh
npm run dev
```

App will be available at `http://localhost:5173`.

### 5. Build for production

```sh
npm run build
```

---

## Deploying the Edge Function

Any time you edit `supabase/functions/server/`, sync and redeploy:

```sh
# Windows
Copy-Item supabase/functions/server/index.tsx supabase/functions/make-server-fcdd5d30/index.ts

# Deploy (no Docker required)
npx supabase functions deploy make-server-fcdd5d30 --no-verify-jwt --use-api
```

---

## Environment Variables Reference

| Variable | Where it is used | How to set |
|----------|-----------------|------------|
| `VITE_SUPABASE_PROJECT_ID` | Frontend (`utils/supabase/info.tsx`) | `.env.local` |
| `VITE_SUPABASE_ANON_KEY` | Frontend (`utils/supabase/info.tsx`) | `.env.local` |
| `RESEND_API_KEY` | Edge Function — email sending | `npx supabase secrets set` |

> **Never commit `.env.local`** — it is listed in `.gitignore`.

---

## Contact Form

The `/contact` page includes:
- Client-side field validation (name, email, message length)
- **Math CAPTCHA** — randomised arithmetic question blocks bots without third-party services
- Two emails sent on submission via Resend:
  1. Owner notification → `loberianorian@gmail.com`
  2. Auto-reply confirmation → submitter's email

---

## Security Notes

- All secrets live in `.env.local` (gitignored) or Supabase's encrypted secret store
- The Supabase anon key is a read-only public key — safe in the browser, but still managed via env vars for portability
- `RESEND_API_KEY` is never exposed to the frontend — accessible only inside the Deno Edge Function via `Deno.env.get()`
- No hardcoded API key fallbacks remain in any source file

---

## License

MIT © [Aldrian Loberiano](https://github.com/AldrianLoberiano)
