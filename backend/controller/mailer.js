import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SERVER_EMAIL,
      pass: process.env.SERVER_APP_PASSWORD
    }
});

const mailer = async (recipient, title, context) => {
    const mailOptions = {
        from: 'playreminder2023@gmail.com',
        to: recipient,
        subject: title,
        html: context
    };
    await transporter.sendMail(mailOptions);
}

export default mailer;
