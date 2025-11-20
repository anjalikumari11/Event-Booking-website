import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// create transporter
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASS
    }
});

// send mail to receiver
export const sendEmail = async (to,subject,htmlContent) => {
    try {
        await transporter.sendMail({
            from:`PartyPass <${process.env.EMAIL}>`,
            to,
            subject,
            html:htmlContent
        })
         console.log("Email sent successfully");
    } catch (error) {
        console.log("Email error: ", error);
    }
}