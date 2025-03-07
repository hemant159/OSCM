import { Attachment } from "@mui/icons-material"

export const sampleChats = [{
        avatar: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5L-I9zx7e7olL6l2KabBhBPZQSTH92J4oA&s"],
        name: "Hemant",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjOnYMxTQUdiJF-fziuNXxIFUHunPE5JY0yA&s"],
        name: "Radha",
        _id: "2",
        groupChat: false,
        members: ["1", "2"],
    }
]

export const sampleUsers = [
    {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Doe",
    _id: "1"
    },
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "John Boi",
    _id: "2"
    }
]

export const sampleNotification = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Doe",
        },
        _id: "1"
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Boi",
        },
        _id: "2"
    },
]

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "asdasd",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "",
        _id: "nvdjkanvvcjksn",
        sender: {
            _id: "asasdsdsds",
            name: "hemant",
        },
        chat: "chatId",
        createdAt: ""
    },
    {
        attachments: [ ],
        content: "hiiii",
        _id: "nvdjkann",
        sender: {
            _id: "users._id",
            name: "hemant",
        },
        chat: "chatId",
        createdAt: ""
    }
];