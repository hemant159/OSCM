import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);
app.get("/my", getMyChats);


export default app;