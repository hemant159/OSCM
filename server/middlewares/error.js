import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {

    err.message ||= "Internal server Error";
    err.statusCode ||= 500;

    if(err.code === 11000) {
        const error = Object.keys(err.keyPattern).join(", ")
        err.message = `Duplicate field - ${error}`;
        err.statusCode = 400
    }

    if(err.name === "CastError") {
        const errorPath = err.path
        err.message = `Invalid Format of ${errorPath}`;
        err.statusCode = 400
    }
    return res.status(err.statusCode).json({
        success: false,
        message: envMode === "DEVELOPMENT" ? err :  err.message,
    });
};

const TryCatch = (passedFunction) => async (req, res, next) => {
    try {
        await passedFunction(req, res, next);
    } catch (error) {
        next(error);
    }
}

export { errorMiddleware, TryCatch };