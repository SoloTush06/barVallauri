import { Request, Response } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const login = async (req: Request, res: Response) => {
    const { password, email } = req.body;

    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const utentiCollection = db.collection("Utenti");

        const utente = await utentiCollection.findOne({ password, email });

        if (utente) {
            res.status(200).send({ message: "Login successful" });
        } else {
            res.status(401).send({ message: "Credenziali errate" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Errore del server" });
    } finally {
        await client.close();
    }
};
