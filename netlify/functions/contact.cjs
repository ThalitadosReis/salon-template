const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

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

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const emailCssPath = path.join(__dirname, "../../server/email.css");
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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (!smtpUser || !smtpPass) {
    console.error("Missing SMTP credentials. Set SMTP_USER and SMTP_PASS.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing SMTP credentials" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { name, email, phone, service, date, time, message } = payload;
  const formattedDate = formatDateForEmail(date);

  if (!name || !email || !date || !time) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields" }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${escapeHtml(name)}" <${smtpUser}>`,
      to: process.env.SALON_EMAIL || smtpUser,
      replyTo: email,
      subject: `New Appointment Request - ${service || "General"} - ${formattedDate} ${time}`,
      html: renderEmailHtml(`
        <div class="email-shell">
          <h2 class="email-title email-title-with-border">New Appointment Request</h2>
          <table class="email-table">
            <tr><td class="email-label email-cell">Name</td><td class="email-cell">${escapeHtml(name)}</td></tr>
            <tr><td class="email-label email-cell">Email</td><td class="email-cell">${escapeHtml(email)}</td></tr>
            <tr><td class="email-label email-cell">Phone</td><td class="email-cell">${escapeHtml(phone || "-")}</td></tr>
            <tr><td class="email-label email-cell">Service</td><td class="email-cell">${escapeHtml(service || "-")}</td></tr>
            <tr><td class="email-label email-cell">Date</td><td class="email-cell">${escapeHtml(formattedDate)}</td></tr>
            <tr><td class="email-label email-cell">Time</td><td class="email-cell">${escapeHtml(time)}</td></tr>
            <tr><td class="email-label email-cell">Message</td><td class="email-cell">${escapeHtml(message || "-")}</td></tr>
          </table>
        </div>
      `),
    });

    await transporter.sendMail({
      from: `"Salon Hair & Beauty" <${smtpUser}>`,
      to: email,
      subject: "Your appointment request has been received",
      html: renderEmailHtml(`
        <div class="email-shell">
          <h2 class="email-title">Thank you, ${escapeHtml(name)}!</h2>
          <p class="email-body">
            We've received your appointment request for <strong>${escapeHtml(service || "a service")}</strong>
            on <strong>${escapeHtml(formattedDate)} at ${escapeHtml(time)}</strong>. We'll be in touch shortly to confirm.
          </p>
          <p class="email-body">Looking forward to seeing you!</p>
          <p class="email-footnote">
            Salon Hair & Beauty · Bahnhofstrasse 12, 6010 Kriens · +41 41 123 45 67
          </p>
        </div>
      `),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};
