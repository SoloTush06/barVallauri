import { Request, Response } from "express";
import client from "../database/mongo";

const DB_NAME = "VallauriBar";

export const getMenuBevande = async (req: Request, res: Response) => {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const menuCollection = db.collection("menuBevande");

        const menu = await menuCollection.find({}).toArray();
        res.status(200).send(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Errore del server" });
    } finally {
        await client.close();
    }
};
