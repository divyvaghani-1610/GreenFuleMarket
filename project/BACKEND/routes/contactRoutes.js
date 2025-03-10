const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Import Contact model
const nodemailer = require("nodemailer");

// POST request to handle contact form submission
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Save message to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "divyvaghani1610@gmail.com", // Replace with your email
        pass: "zurtreooxfeowkez", // Use App Passwords if using Gmail
      },
    });

    const mailOptions = {
      from: email,
      to: "divyvaghani1610@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    console.log(mailOptions);
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;



