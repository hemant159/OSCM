import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";


//create a new user and same it ti the data base and save the cookie
const newUser = async(req, res) => {

    const {name, username, password} = req.body;

    const avatar = {
        public_id: "qwertyuiop",
        url: "asdasdasdasdasdasd",
    };

    const user = await User.create({
        name,
        username,
        password,
        avatar, 
    });
    
    sendToken(res, user, 201, "user created sucessfully")
};

const login = TryCatch(async (req, res, next) => {

    const { username, password } = req.body;
        
    const user = await User.findOne({ username }).select("+password");

    if(!user) {
        return next(new Error("Invalid Username"));
    }

    const isMatch = await compare(password, user.password);

    if(!isMatch) {
        return next(new Error("Invalid Password"));
    }

    sendToken(res, user, 200, `Welcome Back, ${user.name}`);
}); 

const getMyProfile = (req, res) => {

}

export { login, newUser, getMyProfile }