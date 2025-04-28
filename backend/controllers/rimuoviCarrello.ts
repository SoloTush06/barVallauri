import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const rimuoviCarrello: RequestHandler = async (req, res): Promise<void> => {
  const { email, nome } = req.body;  // L'email dell'utente e il nome del prodotto da rimuovere

  if (!email || !nome) {
    res.status(400).send({ message: "Dati mancanti" });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const carrelloCollection = db.collection("carrello");

    const carrello = await carrelloCollection.findOne({ email });

    if (!carrello) {
      res.status(404).send({ message: "Carrello non trovato" });
      return;
    }

    // Rimuoviamo il prodotto dal carrello
    carrello.carrello = carrello.carrello.filter((item: any) => item.nome !== nome);

    await carrelloCollection.updateOne(
      { email },
      { $set: { carrello: carrello.carrello, aggiornatoIl: new Date() } }
    );

    res.status(200).send({ message: "Prodotto rimosso dal carrello" });
  } catch (err) {
    console.error("Errore nella rimozione del prodotto:", err);
    res.status(500).send({ message: "Errore nel server" });
  } finally {
    await client.close();
  }
};
