import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_NAME = "VallauriBar";
const connectionString = process.env.connectionStringLocal || "mongodb://localhost:27017";

app.use(cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 200
}));

app.options("*", cors());

app.use(express.json({}));

app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nel server Vallauri Bar!</h1>");
});

app.post("/login", async (req: Request, res: Response) => {
    const { password, email } = req.body;

    const client = new MongoClient(connectionString);
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
        await client.close(); // Usa await per chiudere correttamente la connessione
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
