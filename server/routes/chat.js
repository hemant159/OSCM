import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);
app.get("/my", getMyChats);
app.get("/myGroups", getMyGroups);
app.put("/addMembers", addMembers);
app.delete("/removeMember", removeMember);
app.delete("/leave/:id", leaveGroup);


export default app;