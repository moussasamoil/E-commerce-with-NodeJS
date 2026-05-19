import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
import { buildEmailTemplate } from "./templateHtml.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS,
    },
})

export const verifyAddedEmail = async (email, subject, otp, name) => {
    try {
        const info = await transporter.sendMail({
            from: `<${process.env.SENDER_EMAIL}>`, // sender address
            to: email, // list of recipients
            subject: subject, // subject line
            html: buildEmailTemplate(otp, name), // HTML body
        });
        console.log("message send successfully");
    } catch (err) {
        console.log("message send failed");
        throw new Error(err.message);
    }
}