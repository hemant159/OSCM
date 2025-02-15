import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js"


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
        return next(new ErrorHandler("Invalid Username or Password", 404));
    }

    const isMatch = await compare(password, user.password);

    if(!isMatch) {
        return next(new ErrorHandler("Invalid Password or Password", 404));
    }

    sendToken(res, user, 200, `Welcome Back, ${user.name}`);
}); 

const getMyProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user);

    res.status(200).json({
        success: true,
        user,
    })
})

const logout = TryCatch(async (req, res) => {

    return res
    .status(200)
    .cookie("test-token", "", {...cookieOption, maxAge: 0})
    .json({
        success: true,
        message: "logged out successfully",
    });
});

const searchUser = TryCatch(async (req, res) => {
    const { name = "" } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user });

    // all users from my chat i'e friends 
    const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

    // all users who are not my friends
    const allUsersExceptMeAndFriends = await User.find({
        _id: { $nin: allUsersFromMyChats },
        name: { $regex: name, $options: "i"}
    })

    const users = allUsersExceptMeAndFriends.map((_id, name, avatar)=>({
        _id,
        name,
        avatar: avatar.url
    }))

    return res
    .status(200)
    .json({
        success: true,
        users

    });
});


export { login, newUser, getMyProfile, logout, searchUser }