export const allowFiles = {
    img: [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/x-png"
    ],
    video: [
        "video/mp4",
        "video/ogg",
        "video/webm"
    ],
    pdf: [
        "application/pdf"
    ]
}

export const fileFilter = function (allowFiles = []) {
    return (req, file, cb) => {
        const isAllowed = allowFiles.includes(file.mimetype);
        if (!isAllowed) {
           return cb(new Error("invalid file type "),false)
        }
        cb(null,true)
    }
}