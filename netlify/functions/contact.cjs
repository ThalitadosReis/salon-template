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

  const salonBrand = "Salon Hair & Beauty";
  const salonAddress = "Bahnhofstrasse 12, 6010 Kriens";
  const salonPhone = "+41 64 123 45 67";
  const salonEmail = process.env.SALON_EMAIL || "hello@yoursalon.ch";
  const salonHours = "Mon - Fri 9:00 - 19:00 | Sat 9:00 - 17:00 | Sun Closed";

  try {
    await transporter.sendMail({
      from: `"${escapeHtml(name)}" <${smtpUser}>`,
      to: salonEmail,
      replyTo: email,
      subject: `New Appointment Request - ${service || "General"} - ${formattedDate} ${time}`,
      html: renderEmailHtml(`
        <div class="email-shell">
          <div class="email-inner">
            <div class="email-brand">
              <p class="email-kicker">New Booking</p>
              <h1 class="email-brand-name">${salonBrand}</h1>
            </div>

            <h2 class="email-title">Appointment Request Received</h2>
            <p class="email-body">
              A new request was submitted through the website contact form.
            </p>

            <div class="email-panel">
              <table class="email-table">
                <tr class="email-row"><td class="email-label">Name</td><td class="email-cell">${escapeHtml(name)}</td></tr>
                <tr class="email-row"><td class="email-label">Email</td><td class="email-cell">${escapeHtml(email)}</td></tr>
                <tr class="email-row"><td class="email-label">Phone</td><td class="email-cell">${escapeHtml(phone || "-")}</td></tr>
                <tr class="email-row"><td class="email-label">Service</td><td class="email-cell">${escapeHtml(service || "-")}</td></tr>
                <tr class="email-row"><td class="email-label">Preferred Date</td><td class="email-cell">${escapeHtml(formattedDate)}</td></tr>
                <tr class="email-row"><td class="email-label">Preferred Time</td><td class="email-cell">${escapeHtml(time)}</td></tr>
                <tr class="email-row"><td class="email-label">Message</td><td class="email-cell">${escapeHtml(message || "-")}</td></tr>
              </table>
            </div>

            <p class="email-footnote">
              Reply directly to this email to respond to the client.
            </p>
          </div>
        </div>
      `),
    });

    await transporter.sendMail({
      from: `"${salonBrand}" <${smtpUser}>`,
      to: email,
      subject: "Appointment request received - Salon Hair & Beauty",
      html: renderEmailHtml(`
        <div class="email-shell">
          <div class="email-inner">
            <div class="email-brand">
              <p class="email-kicker">Booking Confirmation</p>
              <h1 class="email-brand-name">${salonBrand}</h1>
            </div>

            <h2 class="email-title">Thank you, ${escapeHtml(name)}.</h2>
            <p class="email-body">
              We've received your appointment request and our team will confirm it shortly.
            </p>

            <div class="email-panel">
              <table class="email-table">
                <tr class="email-row"><td class="email-label">Service</td><td class="email-cell">${escapeHtml(service || "-")}</td></tr>
                <tr class="email-row"><td class="email-label">Preferred Date</td><td class="email-cell">${escapeHtml(formattedDate)}</td></tr>
                <tr class="email-row"><td class="email-label">Preferred Time</td><td class="email-cell">${escapeHtml(time)}</td></tr>
              </table>
            </div>

            <ul class="email-list">
              <li>We'll review availability and get back to you by email or phone.</li>
              <li>If you need to update your request, reply to this email.</li>
            </ul>

            <p class="email-footnote">
              ${salonBrand}<br />
              ${salonAddress}<br />
              ${salonPhone} · ${salonEmail}<br />
              ${salonHours}
            </p>
          </div>
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
