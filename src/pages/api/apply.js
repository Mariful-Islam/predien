import nodemailer from 'nodemailer';
import multer from 'multer';

// Set up multer for file upload handling
const upload = multer({ dest: 'uploads/' }); // The uploaded files will be stored in the "uploads" folder

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser to handle file uploads manually
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Use multer to parse the form-data, including the file
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'File upload failed', details: err });
      }

      const { to, subject, text, html } = req.body;
      const resume = req.file; // This is the file that was uploaded

      // Create a transporter using your email service's settings
      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like 'smtp', 'sendgrid', etc.
        auth: {
          user: process.env.EMAIL_USER,  // Set your email here
          pass: process.env.EMAIL_PASS,  // Set your email password or app password
        },
      });

      // Define the email options
      const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: process.env.EMAIL_TO,      // Receiver address (or use the dynamic "to" from request)
        subject,                      // Subject line
        text,                         // Plain text body
        html,                         // HTML body
        attachments: [
          {
            filename: resume.originalname,  // Use the original file name
            path: resume.path,              // Path to the file (saved by multer)
          },
        ],
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
      } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
