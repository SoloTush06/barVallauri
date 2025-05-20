import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const getOrdiniAccettati: RequestHandler = async (req, res): Promise<void> => {
  const email = req.params.email;

  if (!email) {
    res.status(400).send({ message: "Email mancante" });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const ordiniCollection = db.collection("ordiniAccettati");

    const ordini = await ordiniCollection.find({ email }).toArray();
    console.log("Ordini trovati:", ordini);

    if (!ordini.length) {
      res.status(404).send({ message: "Nessun ordine trovato" });
      return;
    }

    res.status(200).send(ordini);
  } catch (err) {
    console.error("Errore nel recupero degli ordini:", err);
    res.status(500).send({ message: "Errore del server" });
  } finally {
    await client.close();
  }
};
