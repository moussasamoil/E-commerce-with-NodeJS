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

export const fileFilter = function (allowFormat = []) {
    return (req, file, cb) => {

        const fileName = file.mimetype;
        console.log(file);
        const isAllowed = allowFormat.includes(fileName);
        if (!isAllowed) {
            return cb(new Error("invalid file type "), false)
        }
        cb(null, true)
    }
}