import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);


export default app;