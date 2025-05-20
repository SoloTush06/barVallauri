import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { login } from "../controllers/auth.controller";
import { getMenuCibo } from "../controllers/menu.controller";
import { sendResetPasswordLink } from "../controllers/resetPassword.controller";
import { updatePassword } from "../controllers/updatePassword.controller";
import { getMenuBevande } from "../controllers/menuDrink.controller";
import { addCarrello } from "../controllers/carello.controller";
import { getCarrello } from "../controllers/getCarrello";
import { incrementaCarrello } from "../controllers/incrementaCarrello";
import { decrementaCarrello } from "../controllers/decrementaCarrello";
import { rimuoviCarrello } from "../controllers/rimuoviCarrello";
import { addOrdineInAttesa } from "../controllers/ordiniAttesa";
import { sendOrderPendingEmail } from "../controllers/sendOrderPendingEmail";
import { getOrdiniAccettati } from "../controllers/ordiniAccettati";
import { getClassificaMensile } from "../controllers/classificaMensile";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET /");
    res.send({ status: 'ok' });
});

app.post("/login", login);

app.get("/food/menu-cibo", getMenuCibo);

app.get("/food/menu-bevande", getMenuBevande);

app.post("/login/reset-password", sendResetPasswordLink);

app.post("/login/update-password", updatePassword);

app.post("/carrello", addCarrello);
app.get("/carrello/:email", getCarrello);

app.put("/carrello/incrementa", incrementaCarrello);
app.put("/carrello/decrementa", decrementaCarrello);
app.delete("/carrello/rimuovi", rimuoviCarrello);

app.post("/ordini/aggiungi", addOrdineInAttesa);
app.post("/ordini/email-in-attesa", sendOrderPendingEmail);
app.get("/ordiniAccettati/:email", getOrdiniAccettati);
app.get("/classifica-mensile", getClassificaMensile);

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
