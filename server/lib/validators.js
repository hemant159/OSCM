import { body, validationResult, param, check } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(" & "); 

    if (errors.isEmpty()) return next();

    else next(new ErrorHandler(errorMessages, 400))
};

const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username", "Please Enter User Name").notEmpty(),
    body("password", "Please Enter Password").notEmpty()
]; 

const loginValidator = () => [
    body("username", "Please Enter User Name").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
]; 

const newGroupValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 2, max: 100 })
        .withMessage("members must be in between 2 - 100"),
];

const addMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 1, max: 97 })
        .withMessage("members must be in between 2 - 97"),
];

const removeMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("userId", "Please Enter User ID").notEmpty()
];

const sendAttachmentsValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    check("files")
        .notEmpty()
        .withMessage("Please Upload Attachments")
        .isArray({ min: 1, max: 5})
        .withMessage("Max Attachments 1-5")
];

const chatIdValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty()
];

const renameValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
    body("name", "Please Enter name").notEmpty()  
];

const sendRequestValidator = () => [  
    body("userId", "Please Enter User ID").notEmpty()  
];

const acceptRequestValidator = () => [  
    body("requestId", "Please Enter Request ID").notEmpty(),
    body("accept")
        .notEmpty()
        .withMessage("Please Add Accept")
        .isBoolean()
        .withMessage("Accept must be a boolean")
];

const adminLoginValidator = () => [  
    body("secretKey", "Please Enter Request ID").notEmpty(),
];

export { 
    registerValidator, 
    validateHandler, 
    loginValidator, 
    newGroupValidator, 
    addMemberValidator,
    removeMemberValidator,
    sendAttachmentsValidator,
    chatIdValidator,
    renameValidator,
    sendRequestValidator,
    acceptRequestValidator,
    adminLoginValidator
}