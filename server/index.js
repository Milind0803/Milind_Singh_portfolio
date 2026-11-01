import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5000;

// CLIENT_URL = tumhari GitHub Pages site, e.g. https://username.github.io
const allowed = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((s) => s.trim());

app.use(cors({ origin: allowed }));
app.use(express.json({ limit: "10kb" }));

// Spam se bachne ke liye: ek IP se 15 min me 5 messages
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

app.get("/", (_req, res) => res.json({ status: "ok" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", limiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email." });
  }
  if (name.length > 100 || message.length > 2000) {
    return res.status(400).json({ error: "Input too long." });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("Contact message (SMTP not configured):", { name, email, message });
    return res.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err.message);
    res.status(500).json({ error: "Could not send message right now." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
