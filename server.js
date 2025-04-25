const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('./'));

// API endpoint for sending emails
app.post('/api/send-email', async (req, res) => {
  try {
    // Check for SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'SendGrid API key not configured' 
      });
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Create email message
    const msg = {
      to: email, // Send to the visitor's email (for confirmation)
      from: 'noreply@dataanalyst-portfolio.com', // You should verify this domain in SendGrid
      subject: `Thank you for contacting me: ${subject}`,
      text: `
        Hi ${name},
        
        Thank you for contacting me through my portfolio website. I have received your message and will get back to you soon.
        
        Your message:
        "${message}"
        
        Best regards,
        Your Data Analyst
      `,
      html: `
        <h3>Thank you for your message</h3>
        <p>Hi ${name},</p>
        <p>Thank you for contacting me through my portfolio website. I have received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong><br> "${message}"</p>
        <p>Best regards,<br>Your Data Analyst</p>
      `,
    };
    
    // Also send a copy to yourself
    const notificationMsg = {
      to: 'YOUR_EMAIL@gmail.com', // Replace with the user's actual Gmail address
      from: 'noreply@dataanalyst-portfolio.com', // Same verified sender
      subject: `New Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h3>New contact from your portfolio website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send both emails
    await sgMail.send(msg);
    await sgMail.send(notificationMsg);

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});