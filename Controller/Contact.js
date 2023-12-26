require('dotenv').config();
const ContactModel= require('../Model/User');
const nodemailer = require('nodemailer');
const UserModel = require('../Model/User')

const contactForm =  async (req, res) => {
  try {
    const {username, email, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.my_email,
          pass: process.env.my_password,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.my_email,
        subject: `Subject: ${subject}`,
        text: `Name: ${username}\n Email: ${email}\n Message:${message}`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { contactForm };
