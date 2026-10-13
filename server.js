const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper getters for robust env variable resolution
const getSmtpPass = () => {
  const pass = process.env.SMTP_APP_PASSWORD || process.env.SMTP_PASS || '';
  return pass.replace(/\s+/g, '');
};

const getSmtpUser = () => {
  return process.env.SMTP_USER || '';
};

const getRecipient = () => {
  return process.env.RECEIVER_EMAIL || process.env.MAIL_TO || process.env.SMTP_USER || 'drsolav1@gmail.com';
};

// Create Nodemailer Transporter
const createTransporter = () => {
  const user = getSmtpUser();
  const pass = getSmtpPass();

  if (process.env.SMTP_HOST && process.env.SMTP_HOST !== 'smtp.gmail.com') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
      auth: { user, pass },
    });
  }

  // Default Gmail configuration (works with Gmail App Password)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
};

const sendMail = async (options) => {
  const user = getSmtpUser();
  const pass = getSmtpPass();

  if (!user || !pass) {
    throw new Error('SMTP credentials missing. Please add SMTP_USER and SMTP_APP_PASSWORD to your Vercel Environment Variables.');
  }

  const activeTransporter = createTransporter();
  return await activeTransporter.sendMail(options);
};

// Verify connection on startup (for local development)
if (getSmtpUser() && getSmtpPass()) {
  createTransporter().verify((error, success) => {
    if (error) {
      console.warn('⚠️ SMTP Transporter Warning:', error.message);
      console.warn('👉 Please update SMTP_USER and SMTP_APP_PASSWORD in your .env file with your Gmail address and 16-character App Password.');
    } else {
      console.log('✅ SMTP Transporter is ready to send emails!');
    }
  });
}

// Helper for professional email styling
const getEmailWrapper = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f1fb; margin: 0; padding: 20px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #0e1a6b, #1b3593); padding: 28px 24px; color: #ffffff; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.85; }
    .badge { display: inline-block; background-color: #3b7a24; color: #ffffff; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
    .body { padding: 28px 24px; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table td { padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table tr:last-child td { border-bottom: none; }
    .label { font-weight: 700; color: #0e1a6b; width: 35%; }
    .value { color: #334155; }
    .highlight-box { background-color: #f8fafc; border-left: 4px solid #3b7a24; padding: 12px 16px; border-radius: 4px; margin-top: 16px; font-size: 13.5px; color: #334155; }
    .footer { padding: 20px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Spect Lab Nuclear Medicine Services</h1>
      <p>${title}</p>
      <span class="badge">NABH ACCREDITED</span>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      This is an automated notification from the Spect Lab Nuclear Medicine Services website.<br>
      Sr. No. 268, Behind Crystal Honda Showroom, Bavdhan, Pune - 411021
    </div>
  </div>
</body>
</html>
`;

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 1. Contact Form Endpoint
app.post(['/api/contact', '/contact'], async (req, res) => {
  try {
    const { name, email, phone, date, gender, age, scan, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const recipient = getRecipient();

    const emailContent = `
      <h2 style="font-size: 17px; margin: 0 0 16px; color: #0e1a6b;">New Contact & Inquiry Request</h2>
      <table class="table">
        <tr><td class="label">Patient Name:</td><td class="value"><strong>${name}</strong></td></tr>
        <tr><td class="label">Email:</td><td class="value"><a href="mailto:${email}" style="color: #3b7a24;">${email}</a></td></tr>
        <tr><td class="label">Phone:</td><td class="value"><a href="tel:${phone}" style="color: #3b7a24;">${phone}</a></td></tr>
        <tr><td class="label">Preferred Date:</td><td class="value">${date || 'Not specified'}</td></tr>
        <tr><td class="label">Gender:</td><td class="value">${gender || 'Not specified'}</td></tr>
        <tr><td class="label">Age:</td><td class="value">${age || 'Not specified'}</td></tr>
       
      </table>
      ${message ? `
        <div class="highlight-box">
          <strong>Patient Message:</strong><br>${message.replace(/\n/g, '<br>')}
        </div>
      ` : ''}
    `;

    const mailOptions = {
      from: `"Spect Lab Website" <${process.env.SMTP_USER || 'noreply@spectlab.com'}>`,
      to: recipient,
      replyTo: email,
      subject: `New Contact Inquiry: ${name}${scan ? ` (${scan})` : ''}`,
      html: getEmailWrapper('New Contact Form Submission', emailContent),
    };

    const info = await sendMail(mailOptions);
    console.log('📬 Contact email sent:', info.messageId);

    res.json({
      success: true,
      message: 'Inquiry submitted successfully! We will contact you soon.',
    });
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    res.status(500).json({
      error: 'Failed to send email. Please check server SMTP configuration.',
      details: error.message,
    });
  }
});

// 2. Appointment Form Endpoint
app.post(['/api/appointment', '/appointment'], async (req, res) => {
  try {
    const { name, email, phone, date, time, tests, message, chargeType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone number are required.' });
    }

    const recipient = getRecipient();

    const emailContent = `
      <h2 style="font-size: 17px; margin: 0 0 16px; color: #0e1a6b;">New Appointment Booking Request</h2>
      <table class="table">
        <tr><td class="label">Patient Name:</td><td class="value"><strong>${name}</strong></td></tr>
        <tr><td class="label">Email:</td><td class="value"><a href="mailto:${email}" style="color: #3b7a24;">${email}</a></td></tr>
        <tr><td class="label">Phone:</td><td class="value"><a href="tel:${phone}" style="color: #3b7a24;">${phone}</a></td></tr>
        <tr><td class="label">Preferred Date:</td><td class="value"><strong>${date || 'Not specified'}</strong></td></tr>
        <tr><td class="label">Preferred Time:</td><td class="value">${time || 'Standard Working Hours'}</td></tr>
        <tr><td class="label">Requested Test/Scan:</td><td class="value"><span style="color: #3b7a24; font-weight: bold;">${tests || 'General Consultation'}</span></td></tr>
        ${chargeType ? `<tr><td class="label">Booking Type:</td><td class="value">${chargeType}</td></tr>` : ''}
      </table>
      ${message ? `
        <div class="highlight-box">
          <strong>Patient Concern / Notes:</strong><br>${message.replace(/\n/g, '<br>')}
        </div>
      ` : ''}
    `;

    const mailOptions = {
      from: `"Spect Lab Website" <${process.env.SMTP_USER || 'noreply@spectlab.com'}>`,
      to: recipient,
      replyTo: email,
      subject: `New Appointment Booking: ${name} - ${tests || 'Consultation'}`,
      html: getEmailWrapper('New Appointment Request', emailContent),
    };

    const info = await sendMail(mailOptions);
    console.log('📅 Appointment email sent:', info.messageId);

    res.json({
      success: true,
      message: 'Appointment request submitted successfully! We will confirm your visit soon.',
    });
  } catch (error) {
    console.error('❌ Error sending appointment email:', error);
    res.status(500).json({
      error: 'Failed to send appointment request. Please check server SMTP configuration.',
      details: error.message,
    });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Spect Lab SMTP Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
