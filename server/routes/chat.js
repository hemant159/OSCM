import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { attachmentMalter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator,  newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/newGroup", newGroupValidator(), validateHandler, newGroup);
app.get("/my", getMyChats);
app.get("/myGroups", getMyGroups);
app.put("/addMembers",addMemberValidator(), validateHandler, addMembers);
app.delete("/removeMember",removeMemberValidator(), validateHandler, removeMember);
app.delete("/leave/:id",chatIdValidator(), validateHandler, leaveGroup);
app.post("/message", attachmentMalter, sendAttachmentsValidator(), validateHandler, sendAttachments)
app.route("/:id").get(chatIdValidator(), validateHandler, getChatDetails).put(renameValidator(), validateHandler, renameGroup).delete(chatIdValidator(), validateHandler, deleteChat);
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages)


export default app;