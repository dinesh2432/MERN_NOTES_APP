// const nodemailer = require('nodemailer')
// require('dotenv').config()
// const transporter = nodemailer.createTransport({
//   service:"gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, 
//   auth: {
//     user: process.env.SENDER_MAIL,
//     pass: process.env.SENDER_APP_PASS
//   },
// });

// module.exports=transporter

// sendMail.js
import * as brevo from "@getbrevo/brevo";
import dotenv from "dotenv";

dotenv.config();

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications.apiKey.apiKey = process.env.SMTP_PASSWORD

export const sendMail = async (to, subject, htmlContent) => {
  const email = new brevo.SendSmtpEmail();

  email.to = [{ email: to }];
  email.sender = {
    email: process.env.SENDER_MAIL,
    name: "Notes App",
  };
  email.subject = subject;
  email.htmlContent = htmlContent;

  return apiInstance.sendTransacEmail(email);
};
