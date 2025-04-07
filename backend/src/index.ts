import express, { Request, Response } from "express";
import { MongoClient, ServerApiVersion  } from "mongodb";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = "VallauriBar";
const connectionString = process.env.CONNECTION_STRING || "mongodb://localhost:27017";

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

const client = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});

app.get("/", (req, res) => {
    console.log("GET /");
    res.send({status: 'ok'});
});

app.post("/login", async (req: Request, res: Response) => {
    console.log("POST /login");
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
});

app.get("/menuCibo", async (req: Request, res: Response) => {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const menuCollection = db.collection("menuCibo");
        const menu = await menuCollection.find({}).toArray();
        res.status(200).send(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Errore del server" });
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
