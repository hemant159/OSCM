import express from "express";
import userRoute from './routes/user.js'
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'

dotenv.config({
    path: "./.env"
})

connectDB(process.env.MONGO_URI);
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, world from home")
})
app.use("/user", userRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});