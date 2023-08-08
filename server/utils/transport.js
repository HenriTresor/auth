import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()

const sendEmail = async (email, subject, text) => {
    try {
        const transporter =  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service:'gmail',
            auth: {
                user: 'shimwamahenritresor@gmail.com',
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: 'shimwamanahenritresor@gmail.com',
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