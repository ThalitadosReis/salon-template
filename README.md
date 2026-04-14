# Salon Template

A modern salon website template built with React, Vite, and Tailwind CSS. Ships a polished marketing site, service pages, a booking/contact flow with date and time selection, multilingual content, and an Express plus Nodemailer backend for reservation emails.

## Live Preview
https://template-salon.netlify.app/

## Tech Stack
- **Vite** · React · JavaScript
- **React Router** · Tailwind CSS
- **Motion** · Phosphor Icons
- **Express** · Nodemailer

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/services` | Services overview and treatment details |
| `/contact` | Reservation form with calendar and time selection |
| `/impressum` | Legal notice page |
| `/privacy` | Privacy policy page |

## Booking API
The template sends reservation requests to `/api/contact` through the local Express server in `server/index.cjs`.

## Getting Started
```bash
npm install
npm run dev
npm run server
```

## Environment Variables
Copy `.env.example` to `.env` and configure:

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SALON_EMAIL=
PORT=3001
```

## Scripts
```bash
npm run dev      # local frontend dev server
npm run build    # production build
npm run preview  # preview the production build
npm run server   # local Express email API server
```
