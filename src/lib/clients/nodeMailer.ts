import * as nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});
