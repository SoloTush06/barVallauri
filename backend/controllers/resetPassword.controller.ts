import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

export const sendResetPasswordLink = (req: Request, res: Response): void => {
    const { email } = req.body;

    if (!email) {
        console.log('Email non fornita');
        res.status(400).json({ message: "Email is required" });
        return;
    }

    console.log(`Password reset requested for email: ${email}`);

    const resetLink = `https://vallauribar.connectify.it/reset-password?email=${email}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #2c3e50;">Hai richiesto un reset della password</h2>
                    <p style="color: #34495e;">Clicca il pulsante qui sotto per reimpostare la tua password:</p>
                    <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; margin-top: 20px; color: white; background-color: #3498db; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">Se non hai richiesto il reset, ignora questa email.</p>
                </div>
            </div>
        `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending reset password email:', error);  
            res.status(500).json({ message: "Failed to send email", error });
            return;
        }
        console.log('Reset password email sent:', info.response);  
        res.status(200).json({ message: 'Reset password email sent successfully' });
    });
};

