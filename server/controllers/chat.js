import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";

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
    )
    
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
                if(curr._id.toString() !== req.user) {
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

export { newGroup, getMyChats };