# Portfolio Design – Aldrian Loberiano

A modern portfolio web application showcasing design, branding, and development projects. Built with React, Vite, Tailwind CSS, Radix UI, and Supabase. Designed for performance, accessibility, and a seamless user experience.

## Features

- **Project Showcase:** Display featured and categorized projects with detailed case studies (challenge, solution, results).
- **Services Section:** Highlight product design, brand identity, web development, and creative direction, each with unique features.
- **Testimonials:** Show client feedback and impact.
- **Search & Navigation:** Fast project and page search, animated transitions, and responsive layouts.
- **Admin & Data Seed:** Easily seed demo data and manage content via Supabase functions.
- **UI Components:** Extensive set of reusable UI elements (cards, modals, accordions, tables, etc.) using Radix UI and custom styles.
- **Dark Mode:** Beautiful dark-first design with theme support.
- **Performance:** Optimized for speed and accessibility.

## Technologies Used

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Radix UI**
- **Supabase**
- **TypeScript**
- **Motion (Framer Motion-like)**
- **MUI (Material UI)**

## Folder Structure

```
src/
  app/
    components/      # UI and page components
    data/            # Project, service, testimonial data
    hooks/           # Custom React hooks
    lib/             # API and utility functions
    pages/           # Main pages (Home, Work, About, Contact, Admin)
    styles/          # CSS and theme files
supabase/
  functions/server/  # Supabase Edge Functions (API, seed, kv store)
utils/
  supabase/          # Supabase config helpers
```

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```
4. **Seed demo data:**
   ```sh
   npm run seed