import multer from "multer";

const multerUpload = multer({
    Limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

const singleAvatar = multerUpload.single("avatar")

export { singleAvatar };