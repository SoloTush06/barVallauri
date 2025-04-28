import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const getCarrello: RequestHandler = async (req, res): Promise<void> => {
  const email = req.params.email;

  if (!email) {
    res.status(400).send({ message: "Email mancante" });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const carrelloCollection = db.collection("carrello");

    const result = await carrelloCollection.findOne({ email });
    console.log("Carrello trovato:", result);

    if (!result) {
      res.status(404).send({ message: "Carrello non trovato" });
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    console.error("Errore nel recupero del carrello:", err);
    res.status(500).send({ message: "Errore del server" });
  } finally {
    await client.close();
  }
};
