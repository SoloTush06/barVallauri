import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const addOrdineInAttesa: RequestHandler = async (req, res) => {
  const { email, cartItems, totale, codiceOrdine } = req.body;

  if (!email || !cartItems || !Array.isArray(cartItems) || !totale || !codiceOrdine) {
    res.status(400).send({ message: "Dati mancanti o non validi" });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const ordiniCollection = db.collection("ordiniInAttesa");

    await ordiniCollection.insertOne({
      email,
      cartItems,
      totale,
      codiceOrdine,
      stato: "In attesa",
      creatoIl: new Date()
    });

    res.status(200).send({ message: "Ordine in attesa salvato correttamente" });
  } catch (err) {
    console.error("Errore nel salvataggio dell'ordine:", err);
    res.status(500).send({ message: "Errore del server" });
  } finally {
    await client.close();
  }
};
