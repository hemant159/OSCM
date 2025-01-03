import { User } from "../models/user.js";

//create a new user and same it ti the data base and save the cookie
const newUser = async(req, res) => {

    const {name, username, password} = req.body;

    const avatar = {
        public_id: "qwertyuiop",
        url: "asdasdasdasdasdasd",
    };

    await User.create({
        name,
        username,
        password,
        avatar, 
    });
    
    res.status(201).json({ message: "user created sucessfully "});
};

const login = (req, res) => {
    res.send("Hello, world");
};


export { login, newUser }