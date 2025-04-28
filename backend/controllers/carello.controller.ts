import { RequestHandler } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const addCarrello: RequestHandler = async (req, res) => {
  const { email, carrello } = req.body;

  if (!email || !carrello || !Array.isArray(carrello)) {
    res.status(400).send({ message: "Dati mancanti o non validi" });
    return;
  }

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const carrelloCollection = db.collection("carrello");

    const existingCart = await carrelloCollection.findOne({ email });

    if (existingCart) {
      const updatedCart = existingCart.carrello;

      carrello.forEach(item => {
        const existingItem = updatedCart.find((existingItem: any) => existingItem.nome === item.nome);
        if (existingItem) {
          existingItem.quantita += item.quantita;
        } else {
          updatedCart.push(item);
        }
      });

      await carrelloCollection.updateOne(
        { email },
        { $set: { carrello: updatedCart, aggiornatoIl: new Date() } }
      );
    } else {
      await carrelloCollection.insertOne({
        email,
        carrello,
        aggiornatoIl: new Date(),
      });
    }

    res.status(200).send({ message: "Carrello salvato correttamente" });
  } catch (err) {
    console.error("Errore nel salvataggio del carrello:", err);
    res.status(500).send({ message: "Errore del server" });
  } finally {
    await client.close();
  }
};
