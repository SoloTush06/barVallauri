import { RequestHandler } from "express";
import client from "../database/mongo";
import { startOfMonth, endOfMonth } from "date-fns";

const DB_NAME = "VallauriBar";

export const getClassificaMensile: RequestHandler = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const ordiniCollection = db.collection("ordiniAccettati");

    const oggi = new Date();
    const inizioMese = startOfMonth(oggi);
    const fineMese = endOfMonth(oggi);

    const classifica = await ordiniCollection.aggregate([
      {
        $match: {
          creatoIl: {
            $gte: inizioMese,
            $lte: fineMese,
          },
        },
      },
      {
        $group: {
          _id: "$email",
          numeroOrdini: { $sum: 1 },
        },
      },
      { $sort: { numeroOrdini: -1 } },
      { $limit: 3 }
    ]).toArray();

    res.status(200).json(classifica);
  } catch (error) {
    console.error("Errore nella classifica mensile:", error);
    res.status(500).send({ message: "Errore nel recupero della classifica" });
  } finally {
    await client.close();
  }
};
