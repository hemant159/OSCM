import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats, getMyGroups, addMembers } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);
app.get("/my", getMyChats);
app.get("/myGroups", getMyGroups);
app.put("/addMembers", addMembers);


export default app;