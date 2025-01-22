import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats, getMyGroups } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);
app.get("/my", getMyChats);
app.get("/myGroups", getMyGroups);


export default app;