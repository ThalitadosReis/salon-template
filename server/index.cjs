const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());

function loadEnvFile() {
  const envPath = path.join(__dirname, "../.env");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

function formatDateForEmail(input) {
  if (!input) return input;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}.${month}.${year}`;
  }

  const parsed = new Date(input);
  if (!Number.isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return input;
}

const emailCssPath = path.join(__dirname, "email.css");
const emailCss = fs.existsSync(emailCssPath)
  ? fs.readFileSync(emailCssPath, "utf8")
  : "";

function renderEmailHtml(content) {
  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>${emailCss}</style>
      </head>
      <body>${content}</body>
    </html>
  `;
}

// Serve built frontend
app.use(express.static(path.join(__dirname, "../dist")));

// ── Email configuration ──────────────────────────────────
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();

if (!smtpUser || !smtpPass) {
  console.error(
    "Missing SMTP credentials. Set SMTP_USER and SMTP_PASS in .env",
  );
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: smtpUser || "your@email.com",
    pass: smtpPass || "yourpassword",
  },
});

const salonBrand = "Maison Hair & Beauty";
const salonAddress = "Bahnhofstrasse 12, 6010 Kriens";
const salonPhone = "+41 64 123 45 67";
const salonEmail = process.env.SALON_EMAIL || "hello@yoursalon.ch";
const salonHours =
  "Mon – Fri  9:00 – 19:00  ·  Sat  9:00 – 17:00  ·  Sun  Closed";

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, date, time, message } = req.body;
  const formattedDate = formatDateForEmail(date);

  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Email to salon owner
    await transporter.sendMail({
      from: `"${name}" <${smtpUser || "your@email.com"}>`,
      to: salonEmail,
      replyTo: email,
      subject: `New Appointment Request — ${service || "General"} · ${formattedDate} ${time}`,
      html: renderEmailHtml(`
        <div class="email-shell">
          <div class="email-header">
            <p class="email-kicker">New Booking</p>
            <p class="email-brand-name">Maison</p>
            <p class="email-brand-sub">Hair &amp; Beauty Studio</p>
          </div>

          <div class="email-body-wrap">
            <p class="email-section-label">Appointment Request</p>
            <h1 class="email-title">New booking<br>received</h1>
            <p class="email-text">A new reservation request was submitted through the website. Reply directly to this email to reach the client.</p>

            <div class="email-panel">
              <table class="email-table">
                <tr class="email-row"><td class="email-label">Name</td><td class="email-value">${name}</td></tr>
                <tr class="email-row"><td class="email-label">Email</td><td class="email-value">${email}</td></tr>
                <tr class="email-row"><td class="email-label">Phone</td><td class="email-value">${phone || "—"}</td></tr>
                <tr class="email-row"><td class="email-label">Service</td><td class="email-value">${service || "—"}</td></tr>
                <tr class="email-row"><td class="email-label">Date</td><td class="email-value">${formattedDate}</td></tr>
                <tr class="email-row"><td class="email-label">Time</td><td class="email-value">${time}</td></tr>
                <tr class="email-row"><td class="email-label">Message</td><td class="email-value">${message || "—"}</td></tr>
              </table>
            </div>

          </div>

          <div class="email-footer">
            <p class="email-footer-brand">Maison Hair &amp; Beauty Studio</p>
            <p class="email-footer-text">${salonAddress} · ${salonPhone}</p>
          </div>
        </div>
      `),
    });

    // Acknowledgement to client
    await transporter.sendMail({
      from: `"${salonBrand}" <${smtpUser || "your@email.com"}>`,
      to: email,
      subject: `Your appointment request — Maison Hair & Beauty`,
      html: renderEmailHtml(`
        <div class="email-shell">
          <div class="email-header">
            <p class="email-kicker">Booking Received</p>
            <p class="email-brand-name">Maison</p>
            <p class="email-brand-sub">Hair &amp; Beauty Studio</p>
          </div>

          <div class="email-body-wrap">
            <p class="email-section-label">Confirmation</p>
            <h1 class="email-title">Thank you,<br>${name}.</h1>
            <p class="email-text">We've received your request and look forward to welcoming you. Our team will be in touch shortly to confirm your appointment.</p>

            <div class="email-panel">
              <table class="email-table">
                <tr class="email-row"><td class="email-label">Service</td><td class="email-value">${service || "—"}</td></tr>
                <tr class="email-row"><td class="email-label">Date</td><td class="email-value">${formattedDate}</td></tr>
                <tr class="email-row"><td class="email-label">Time</td><td class="email-value">${time}</td></tr>
              </table>
            </div>

            <ul class="email-notes">
              <li>We'll confirm availability and reach out by email or phone.</li>
              <li>Need to make a change? Simply reply to this email.</li>
            </ul>
          </div>

          <div class="email-footer">
            <p class="email-footer-brand">Maison Hair &amp; Beauty Studio</p>
            <p class="email-footer-text">
              ${salonAddress}<br>
              ${salonPhone} · ${salonEmail}<br>
              ${salonHours}<br><br>
              A place to feel beautiful.
            </p>
          </div>
        </div>
      `),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Fallback to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
