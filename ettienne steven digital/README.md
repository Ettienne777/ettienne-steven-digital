# By Ettienne — Studio Website

An immersive, editorial portfolio site for **By Ettienne**, a digital studio based
in South Africa. Built with React, TypeScript and Vite, with a scroll-driven
Three.js atmosphere, GSAP + Framer Motion choreography, Lenis smooth scrolling and
a bespoke cursor.

> _Digital experiences designed to be felt, not simply viewed._

---

## Getting started

You'll need **Node 18+** (you have v24 installed, which is perfect).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173**).

### Other commands

```bash
npm run build     # type-check + production build into /dist
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

> **Note on the folder name:** the folder is `ettienne steven digital` (with spaces).
> That's completely fine for Node/Vite. If you ever prefer, you can rename it to
> `ettienne-steven-digital` — nothing inside depends on the folder name.

> **Fonts:** Cormorant Garamond and Inter load from Google Fonts, so the first run
> needs an internet connection to fetch them. Everything else runs locally.

---

## Project structure

```
src/
  components/
    cursor/        Bespoke two-part cursor (dot + trailing ring)
    layout/        Loader, Nav, Footer
    sections/      Hero, Philosophy, About, FeaturedProjects, Services, Process, Contact
    three/         WebGL atmosphere — Canvas, particles, marble form, shaders
    ui/            MagneticButton, RevealText, Reveal (reusable motion primitives)
  data/
    projects.ts    The three concept case studies (edit these to add your own)
  hooks/           useLenis, useMediaQuery
  lib/             gsap, scroll, viewport, utils
  pages/           Home, ProjectPage
  App.tsx          Root: loader gate, routes, cursor, smooth scroll
  main.tsx         Entry point
  index.css        Tailwind layers + global styling
```

---

## Where to customise

| You want to…                    | Edit this                                              |
| ------------------------------- | ------------------------------------------------------ |
| Change the case studies         | `src/data/projects.ts`                                 |
| Adjust brand colours / fonts    | `tailwind.config.js` and `src/index.css`               |
| Edit the About / studio copy    | `src/components/sections/About.tsx`                    |
| Edit contact details            | `src/components/sections/Contact.tsx` & `Footer.tsx`   |
| Tune the 3D atmosphere          | `src/components/three/Atmosphere.tsx` & `Particles.tsx`|

### Making the contact form actually send

Right now the form is a polished front-end demo — it validates input and shows a
success state, but doesn't deliver anywhere yet. To make it live, open
`src/components/sections/Contact.tsx`, find the `onSubmit` handler, and replace the
simulated `setTimeout` with a real request. The simplest option is a service like
[Formspree](https://formspree.io) or [Resend](https://resend.com):

```ts
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(form),
})
```

---

## Accessibility & performance notes

- All motion respects `prefers-reduced-motion` — the site calms itself for users
  who ask for less movement.
- The WebGL scene is lazy-loaded and scales its particle count to the device, so
  first paint stays fast and phones don't overheat.
- The bespoke cursor only appears on fine-pointer (mouse) devices; touch devices
  keep their native behaviour.

---

Crafted with intention. 🤍
