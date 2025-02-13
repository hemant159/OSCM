import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { attachmentMalter } from "../middlewares/multer.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroup);
app.get("/my", getMyChats);
app.get("/myGroups", getMyGroups);
app.put("/addMembers", addMembers);
app.delete("/removeMember", removeMember);
app.delete("/leave/:id", leaveGroup);
app.post("/message", attachmentMalter, sendAttachments)
app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);
app.get("/message/:id", getMessages)


export default app;