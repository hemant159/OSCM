import mongoose from "mongoose"
import jwt from "jsonwebtoken";

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true
}

const connectDB = (uri) => {
    mongoose
    .connect(uri, { dbName: "auth" })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
        throw err;
    });
}

console.log("feature.js")

const sendToken = (res, user, code, message) => {

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("test-token", token, cookieOption).json({
        sucess: true,
        message
    });
};

const emitEvent = (req, event, users, data) => {
    console.log("Emiting Event", event);
}

export { connectDB, sendToken, cookieOption, emitEvent }