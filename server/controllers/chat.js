import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.js";

const newGroup = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;

    if(members.length < 2) {
        return next(
            new ErrorHandler("Group chat must have at least 3 members", 400)
        );
    }

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members); 

    return res.status(201).json({
        sucess: true,
        emitEvent: "Group created"
    })
});

const getMyChats = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({ members: req.user }).populate(
        "members",
        "name avatar"
    );
    
    const transformedChats = chats.map(({ _id, name, members, groupChat }) => {

        const otherMember = getOtherMember(members, req.user);

        return {
            _id,
            groupChat,
            avatar: groupChat 
            ? members.slice(0, 3).map(({ avatar }) => avatar.url)
            : [otherMember.avatar.url],
            name: groupChat ? name : otherMember.name,
            members: members.reduce((prev, curr) => {
                if(curr._id.toString() !== req.user.toString()) {
                    prev.push(curr._id);
                }
                return prev;
            }, []),
        };
    })

    return res.status(200).json({
        sucess: true,
        chats: transformedChats 
    })
});

const getMyGroups = TryCatch(async (req, res, next) => {
    
    const chats = await Chat.find({
        members: req.user,
        groupChat: true,
        creator: req.user,
    }).populate("members", "name avatar");

    console.log(chats)

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
        _id, 
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url)
    }));

    console.log(groups)

    res.status(200).json({
        success: true,
        groups,
    });
})

const addMembers = TryCatch(async (req, res, next) => {
    
    const { chatId, members } = req.body;

    console.log(members)

    if(!members || members.length < 1) {
        return next(new ErrorHandler("Please provide members", 400));   
    }

    const chat = await Chat.findById(chatId);

    if(!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not group chat", 400));
    }

    if(chat.creator.toString() !== req.user.toString()) {
        return next(new ErrorHandler("You are not allowed to add members", 403));
    }

    const allNewMembersPromise = members.map( i => User.findById(i, "name"));

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers
        .filter((i) => !chat.members.includes(i._id.toString()))
        .map((i) => i._id);

    chat.members.push(...uniqueMembers);

    if (chat.members.lenght > 10) {
        return next(new ErrorHandler("Group members limit reached", 400));
    }
    
    await chat.save();
    const allUserName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${allUserName} has been added in the group`
    )

    emitEvent(req, REFETCH_CHATS, chat.members)


    res.status(200).json({
        success: true,
        message: "members added successfully",
    });
})

const removeMember = TryCatch(async (req, res, next) => {
    const { userId, chatId} = req.body;

    const [chat, userThatWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, "name"),
    ]);

    if(!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not group chat", 400));
    }

    if(chat.creator.toString() !== req.user.toString()) {
        return next(new ErrorHandler("You are not allowed to add members", 403));
    }

    if(chat.members.length <= 3) {
        return next(new ErrorHandler("Group must have atleast 3 members", 400));
    }

    chat.members = chat.members.filter(
        (members) => members.toString() !== userId.toString()
    );

    await chat.save();

    emitEvent(
        req,
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed from the group`
    )

    emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        sucess: true,
        message: "Member removed successfully"
    })

})

const leaveGroup = TryCatch(async (req, res, next) => {
    const chatId = req.params.id;

    console.log(chatId)

    const chat = await Chat.findById(chatId);

    if(!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    if(!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }

    const remainingMembers = chat.members.filter(
        (member) => member.toString() !== req.user.toString()
    )

    if(remainingMembers.length < 3) {
        return next(new ErrorHandler("Group must have atleast 3 members", 400));
    }

    if(chat.creator.toString() === req.user.toString()) {
        const randomElement = Math.floor(Math.random() * remainingMembers.length);

        const newCreator = remainingMembers[randomElement]

        chat.creator = newCreator

    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([User.findById(req.user, "name"), chat.save()]);

    emitEvent(
        req,
        ALERT,
        chat.members,
        `User ${user.name} has left the group`
    )

    // emitEvent(req, REFETCH_CHATS, chat.members);

    return res.status(200).json({
        sucess: true,
        message: "Member removed successfully"
    })

})
export { newGroup, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup };