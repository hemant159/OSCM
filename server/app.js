import express from "express";
import userRoute from './routes/user.js'
import chatRoute from './routes/chat.js'
import adminRoute from './routes/admin.js'
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

dotenv.config({
    path: "./.env"
})

connectDB(process.env.MONGO_URI);
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ITSA";

const userSocketIDs = new Map();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// createSingleChats(10);
// createGroupChats(10);
// createMessageInChat("678ff06e207f9501a5bbaed8", 50)

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
})

// createUser(10);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("Hello, world from home")
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

io.use((socket, next) => {
    cookieParser()(
       socket.request, 
       socket.request.res, 
       async (err) => await socketAuthenticator(err, socket, next)
   );
});

io.on("connection", (socket) => {

    const user = socket.user;

    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({chatId, members, messages }) => {
        
        const messageForRealTime = {
            content: messages,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const membersSockets = getSockets(members);
        io.to(membersSockets).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime
        });
        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, { chatId })

        const messageForDB = {
            content: messages,
            sender: user._id,
            chat: chatId
        }
        
        try {
            await Message.create(messageForDB);
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("disconnect", () => {
        userSocketIDs.delete(user._id.toString());
    })
})

app.use(errorMiddleware); 

server.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT || 3000} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs }