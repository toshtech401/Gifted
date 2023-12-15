const UserModel= require('../Model/User');
const nodemailer = require('nodemailer');

const contactForm =  async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.my_email,
          pass: process.env.my_password,
        },
    });

    const mailOptions = {
      from: "process.env.my_email",
      to:  email.UserModel,
      subject: subject || 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { contactForm };
