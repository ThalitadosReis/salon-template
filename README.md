# [ Salon Template ](https://template-salon.netlify.app/)

Modern salon website template built with React, Vite, Tailwind CSS v4, and a small Express + Nodemailer backend for reservation emails.

Live site: `https://template-salon.netlify.app/`

## Stack

- React 18
- React Router 6
- Vite 5
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion`)
- Phosphor Icons (`@phosphor-icons/react`)
- Express + Nodemailer (email API)

## Run Locally

```bash
npm install
npm run dev      # frontend (Vite)
npm run server   # backend email API (Express)
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SALON_EMAIL`
- `PORT`

### Gmail notes

If you use Gmail SMTP, use an App Password (requires 2FA). Regular account passwords will fail authentication.

## Routes

- `/` → `src/pages/Home.jsx`
- `/services` → `src/pages/Services.jsx`
- `/contact` → `src/pages/Contact.jsx`

## Content & Customization

- Navigation/section text/translations:
  - `src/i18n/translations/en.js`
  - `src/i18n/translations/de.js`
- Language provider: `src/i18n/LangContext.jsx`
- Global styles and tokens: `src/index.css`
- Hero/gallery/services/contact content: page files in `src/pages/`
- Footer contact/map: `src/components/Footer.jsx`

## Build

```bash
npm run build
npm run preview
```
