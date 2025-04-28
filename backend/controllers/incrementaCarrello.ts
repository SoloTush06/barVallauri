import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const incrementaCarrello: RequestHandler = async (req, res): Promise<void> => {
  const { email, nome } = req.body;

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

    const prodotto = carrello.carrello.find((item: any) => item.nome === nome);
    if (prodotto) {
      prodotto.quantita += 1; // Incrementiamo la quantità
    } else {
      res.status(404).send({ message: "Prodotto non trovato nel carrello" });
      return;
    }

    await carrelloCollection.updateOne(
      { email },
      { $set: { carrello: carrello.carrello, aggiornatoIl: new Date() } }
    );

    res.status(200).send({ message: "Quantità del prodotto aggiornata" });
  } catch (err) {
    console.error("Errore nell'incremento del prodotto:", err);
    res.status(500).send({ message: "Errore nel server" });
  } finally {
    await client.close();
  }
};
