import nodemailer from "nodemailer";
import { template } from "./nodeMailer.js";

const MAIL = String(process.env.MAIL);

export const buildAndSendEmail = async (
  receiverEmail: string,
  name: string,
  subject: string,
  number: string
) => {
    console.log('receiverEmail:', receiverEmail, 'number:',  number);
    
  const html = template(name, subject, number);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "sgsdeveloper2000@gmail.com",
      pass: MAIL,
    },
  });

  await transporter.sendMail({
    from: "sgsdeveloper2000@gmail.com",
    to: receiverEmail,
    subject,
    html,
  });

  console.log('Se construyo se mando el correo de manera exitosa!')
};
