import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const updatePassword: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400).json({ message: "Email e nuova password sono obbligatorie." });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const utentiCollection = db.collection("Utenti"); 

    const utente = await utentiCollection.findOne({ email });

    if (!utente) {
      res.status(404).json({ message: "Utente non trovato." });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await utentiCollection.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    res.status(200).json({ message: "Password aggiornata con successo." });
  } catch (error) {
    console.error("Errore durante l'aggiornamento della password:", error);
    res.status(500).json({ message: "Errore interno del server." });
  } finally {
    await client.close();
  }
};
