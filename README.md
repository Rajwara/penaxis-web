# Penaxis — Landing Page

A Next.js 14 (App Router) landing page for Penaxis, built from the company
profile deck: 3D hero animation in vanilla Three.js, scroll/entrance
animation with GSAP, and a few hand-rolled vanilla-JS interactions
(magnetic buttons, animated stat counters, map pins).

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Structure

- `app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/` — one component per section (Hero, About, Coverage,
  Services, Industries, WhyUs, Team, CTA, Footer) plus shared helpers
  (`Reveal`, `CountStat`, `MagneticButton`, `Hero3D`)
- `lib/data.ts` — all copy and data pulled from the company profile, in
  one place so it's easy to edit without touching component code

## Editing content

Everything text-based (stats, services, industries, team, contact info)
lives in `lib/data.ts`. Update it there and the whole site reflects the
change.

## Notes

- The hero's 3D "Growth Axis" animation is plain Three.js (no
  react-three-fiber) rendered into a `<canvas>` inside `Hero3D.tsx`. It's
  mouse-reactive and respects `prefers-reduced-motion`.
- Swap the team-member circles for real headshots by replacing the
  initials avatar in `Team.tsx` with an `<Image>`/`<img>` once you have
  photo assets.
- Replace the map in `Coverage.tsx` with a real world-map SVG/GeoJSON if
  you want geographic accuracy beyond the stylized dot layout.

## Deploy on Vercel

1. Vercel → **Add New… → Project** → import `Rajwara/penaxis-web`.
   Framework is auto-detected as Next.js; keep the default build settings.
2. **Environment Variables** (Settings → Environment Variables), from `.env.example`:
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.
3. Deploy.

## Search-engine indexing (currently OFF)

The site is **noindexed** by default: every response carries
`X-Robots-Tag: noindex, nofollow` and every page has a
`<meta name="robots" content="noindex, nofollow">` tag. The sitemap is not
advertised in `robots.txt`.

To allow Google later: add `ALLOW_INDEXING` = `true` in Vercel's
Environment Variables (Production only) and redeploy. The switch lives in
`lib/indexing.mjs`.
