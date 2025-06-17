const nodemailer = require("nodemailer");

const recipientEmail = process.env.EMAIL_RECEIVER || "contact.zager@gmail.com";
const senderEmail = {
  user: process.env.EMAIL_USER || "contact.zager@gmail.com",
  pass: process.env.EMAIL_PASS || "abcdxyzabc",
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: senderEmail.user,
      pass: senderEmail.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const createContact = async (req, res) => {
  try {
    const { name, companyName, email, phone, message } = req.body;
    if (!name || !companyName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const htmlContent = `
      <h2>New Contact Us Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `;

    const transporter = createTransporter();

    const mailOptions = {
      from: senderEmail.user,
      to: recipientEmail,
      subject: "New Contact Us Submission",
      html: htmlContent,
      replyTo: email, // <--reply directly to the user's email from inbox:
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while sending your message",
    });
  }
};

module.exports = { createContact };