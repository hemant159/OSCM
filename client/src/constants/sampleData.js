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

export const dashboardData = {
    users: [
        {
            name: "john Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "john_doe",
            friends: 20,
            groups: 5 
        },
        {
            name: "john Boi",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "john_boi",
            friends: 20,
            groups: 5 
        }
    ],

    chats: [
        {
            name: "Code-ex",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [{_id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, {_id: "21", avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Doe",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            }
        },
        {
            name: "Finance",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [{_id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png"}, {_id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png"}],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Doe",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            }
        }
    ],

    messages: [
        {
            attachments: [
                {
                    public_id: "asdasd 2",
                    url: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            content: "hi there",
            _id: "qwert",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Radha"
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2025-02-12T10:41:30.6302",
        },
        {
            attachments: [
                {
                    public_id: "asdasd 2",
                    url: "https://www.w3schools.com/howto/img_avatar.png"
                }
            ],
            content: "hi there baby",
            _id: "qwerty",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Radha"
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2025-02-12T10:41:30.6302",
        }
    ]

}