import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderPendingEmail = (req: Request, res: Response): void => {
  const { email, codiceOrdine } = req.body;

  if (!email || !codiceOrdine) {
    console.log('Email o codice ordine non forniti');
    res.status(400).json({ message: "Email e codice ordine sono obbligatori" });
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Ordine in Attesa - Vallauri Bar',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c3e50;">Abbiamo ricevuto il tuo ordine</h2>
          <p style="color: #34495e;">Il tuo ordine (<strong>${codiceOrdine}</strong>) è stato registrato ed è in attesa di elaborazione.</p>
          <p style="color: #34495e;">Riceverai un'email di conferma appena sarà pronto per il ritiro.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #7f8c8d;">Grazie per aver ordinato da Vallauri Bar!</p>
        </div>
      </div>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Errore nell\'invio email ordine:', error);
      res.status(500).json({ message: "Errore nell'invio dell'email", error });
      return;
    }
    console.log('Email conferma ordine inviata:', info.response);
    res.status(200).json({ message: 'Email conferma ordine inviata con successo' });
  });
};
