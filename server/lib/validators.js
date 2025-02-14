import { body, validationResult, check } from "express-validator";
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
    body("password", "Please Enter Password").notEmpty(),
    check("avatar", "Please Upload Avatar").notEmpty()
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

export { registerValidator, validateHandler, loginValidator, newGroupValidator }