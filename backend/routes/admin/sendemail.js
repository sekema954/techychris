//send email to subscribers
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send/email", async (req, res) => {
  const { email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"TechyChris" <${process.env.VITE_EMAIL_USER}>`,
      to: email,
      subject: "Message from Admin",
      text: message,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

module.exports = router;
