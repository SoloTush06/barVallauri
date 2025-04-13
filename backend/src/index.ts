import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { login } from "../controllers/auth.controller";
import { getMenuCibo } from "../controllers/menu.controller";
import { sendResetPasswordLink } from "../controllers/resetPassword.controller";
import { updatePassword } from "../controllers/updatePassword.controller";
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

app.get("/menuCibo", getMenuCibo);

app.post("/login/reset-password", sendResetPasswordLink);

app.post("/login/update-password", updatePassword);

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
