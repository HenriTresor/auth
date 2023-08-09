import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const sendEmail = async (email, subject, text) => {
    try {
        const transporter =  nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: true,
            // service:'gmail',
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USERNAME,
            to: email,
            subject: subject,
            text: text,
        });
       return true
    } catch (error) {
        return error.message
    }
};

export default sendEmail