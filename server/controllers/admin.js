import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOption } from "../utils/features.js";
import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";

const adminLogin = TryCatch(async (req, res, next) => {

    const { secretKey } = req.body;

    const isMatched = secretKey === adminSecretKey

    if(!isMatched) return netx(new ErrorHandler("Invalid Secret Key", 401));

    const token = jwt.sign(secretKey, process.env.JWT_SECRET);

    return res
        .status(200)
        .cookie("test-admin-token", token, {
            ...cookieOption,
            maxAge: 1000 * 60 * 15
        }).json({
            success: true, 
            message: "Authenticated Successfully, Welcome BOSS"
        })
});

const adminLogout = TryCatch(async (req, res, next) => {

    return res
        .status(200)
        .cookie("test-admin-token","", {
            ...cookieOption,
            maxAge: 0
        }).json({
            success: true, 
            message: "Logged out Successfully"
        })
});

const getAdminData = TryCatch(async (req, res, next) => {

    return res.status(200).json({
        admin: true
    })
});

const allUsers = TryCatch(async (req, res) => {
    
    const users = await User.find({});

    const transformedUsers = await Promise.all(
        users.map(
            async ({ name, username, avatar, _id }) => {
                const [groups, friends] = await Promise.all([
                    Chat.countDocuments({ groupChat: true, members: _id }),
                    Chat.countDocuments({ groupChat: false, members: _id }),
                ]);
    
                return {
                    name,
                    username,
                    avatar: avatar.url,
                    _id,
                    groups,
                    friends
                }
            }
        )
    )
    
    return res.status(200).json({
        status: "success",
        transformedUsers,
    })
});

const allChats = TryCatch(async (req, res) => {
    const chats = await Chat.find({})
        .populate("members", "name avatar")
        .populate("creator", "name avatar");

    const transformedChats = await Promise.all(
        chats.map(async ({ members, _id, groupChat, name, creator }) => {

            const totalMessages = await Message.countDocuments({ chat: _id });

            return {
                _id,
                groupChat,
                name,
                avatar: members.slice(0, 3).map((member) => member.avatar.url),
                members: members.map(({ _id, name, avatar }) => ({
                    _id,
                    name,
                    avatar: avatar.url
                })),
                creator: {
                    name: creator?.name || "None",
                    avatar: creator?.avatar.url || "",
                },
                totalMembers: members.length,
                totalMessages
            };
        })
    );

    return res.status(200).json({
        status: "success",
        chats: transformedChats,
    })
});

const allMessages = TryCatch(async (req, res) => {
    const messages = await Message.find({})
        .populate("sender", "name avatar")
        .populate("chat", "groupChat");

    const transformedMessages = messages.map(
        ({ content, attachments, _id, sender, createAt, chat }) => ({
            _id,
            attachments,
            content,
            createAt,
            chat: chat?._id || null,  // Check if chat exists
            groupChat: chat?.groupChat || false,  // Avoid undefined errors
            sender: sender
                ? {
                    _id: sender._id,
                    name: sender.name,
                    avatar: sender.avatar?.url || null
                }
                : null // Handle missing sender gracefully
        })
    );

    return res.status(200).json({
        success: true,
        message: transformedMessages
    });
});

const getDashboardStats = TryCatch(async (req, res) => {
    
    const [groupsCount, usersCount, messagesCount, totalChatsCount] = await Promise.all([
        Chat.countDocuments({ groupChat: true}),
        User.countDocuments(),
        Message.countDocuments(),
        Chat.countDocuments()
    ]);

    const today = new Date();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        }
    }).select("createdAt");

    const messages = new Array(7).fill(0);
    const daysInMilliSeconds = 1000 * 60 * 60 * 24;

    last7DaysMessages.forEach(messages => {
        const indexApprox = (today.getTime() - messages.createdAt.getTime()) / daysInMilliSeconds;
        const index = Math.floor(indexApprox)

        messages[6 - index]++;
    })

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatsCount,
        messagesChart: messages
    }

    return res.status(200).json({
        success: true,
        stats
    });
});

export { allUsers, allChats, allMessages, getDashboardStats, adminLogin, adminLogout, getAdminData };