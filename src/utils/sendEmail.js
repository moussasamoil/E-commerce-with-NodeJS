import nodemailer from "nodemailer"
import { buildVerifyEmailTemplate } from "./templateVerifyAccount.js";

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
            from: `${process.env.SENDER_EMAIL}`, // sender address
            to: email, // list of recipients
            subject: subject, // subject line
            html: buildVerifyEmailTemplate(otp, name), // HTML body
        });
        console.log("message send successfully");
    } catch (err) {
        return { success: false, error: err.message , sender:process.env.SENDER_EMAIL ,pass:process.env.SENDER_EMAIL_PASS };
    }
}