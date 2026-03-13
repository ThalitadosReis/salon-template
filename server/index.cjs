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
      to: process.env.SALON_EMAIL || "dosreistha@gmail.com",
      replyTo: email,
      subject: `New Appointment Request — ${service || "General"} — ${formattedDate} ${time}`,
      html: renderEmailHtml(`
        <div class="email-shell">
          <h2 class="email-title email-title-with-border">
            New Appointment Request
          </h2>
          <table class="email-table">
            <tr><td class="email-label email-cell">Name</td><td class="email-cell">${name}</td></tr>
            <tr><td class="email-label email-cell">Email</td><td class="email-cell">${email}</td></tr>
            <tr><td class="email-label email-cell">Phone</td><td class="email-cell">${phone || "—"}</td></tr>
            <tr><td class="email-label email-cell">Service</td><td class="email-cell">${service || "—"}</td></tr>
            <tr><td class="email-label email-cell">Date</td><td class="email-cell">${formattedDate}</td></tr>
            <tr><td class="email-label email-cell">Time</td><td class="email-cell">${time}</td></tr>
            <tr><td class="email-label email-cell">Message</td><td class="email-cell">${message || "—"}</td></tr>
          </table>
        </div>
      `),
    });

    // Acknowledgement to client
    await transporter.sendMail({
      from: `"Salon Hair & Beauty" <${smtpUser || "your@email.com"}>`,
      to: email,
      subject: "Your appointment request has been received",
      html: renderEmailHtml(`
        <div class="email-shell">
          <h2 class="email-title">Thank you, ${name}!</h2>
          <p class="email-body">
            We've received your appointment request for <strong>${service || "a service"}</strong>
            on <strong>${formattedDate} at ${time}</strong>. We'll be in touch shortly to confirm.
          </p>
          <p class="email-body">Looking forward to seeing you!</p>
          <p class="email-footnote">
            Salon Hair & Beauty · Bahnhofstrasse 12, 6010 Kriens · +41 41 123 45 67
          </p>
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
