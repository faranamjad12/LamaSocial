import { customAlphabet } from "nanoid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const generateOTP = () => {
  const nanoid = customAlphabet("1234567890abcdef", 8);
  const otp = nanoid(); //=> "_ _ _ _ _ _ _"
  return otp;
};

export const sendEmail = async (to, subject, html) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"LamaSocial Team" <${process.env.EMAIL_USER}>`, // sender address
      to: to,
      subject: subject, // subject line
      html: html, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("ERR:", error);
  }
};
