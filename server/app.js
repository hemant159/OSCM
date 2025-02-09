import express from "express";
import userRoute from './routes/user.js'
import chatRoute from './routes/chat.js'
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./.env"
})

connectDB(process.env.MONGO_URI);
const app = express();

// createUser(10);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello, world from home")
})

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use(errorMiddleware); 

console.log(process.env.PORT)
app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT || 3000}`);
});