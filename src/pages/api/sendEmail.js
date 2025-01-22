import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text, html } = req.body;

    // Create a transporter using your email service's settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like 'smtp', 'sendgrid', etc.
      auth: {
        user: process.env.EMAIL_USER,  // Set your email here
        pass: process.env.EMAIL_PASS,  // Set your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender address
      to: process.env.EMAIL_TO,                            // Receiver address
      subject,                       // Subject line
      text,                          // Plain text body
      html,                          // HTML body
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
