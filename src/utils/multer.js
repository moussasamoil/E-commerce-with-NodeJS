import multer from 'multer';
import { allowFiles, fileFilter } from './multer-validation.js';

export const storageType = {
    memory: "memory",
    disk: "disk"
}

export const uploadFile = (type = storageType.memory, allowFormats = allowFiles.img, fileSize = 5) => {
    const storage = type == storageType.memory ? multer.memoryStorage() : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../pic")
        },
        filename: function (req, file, cb) {
          cb(null,Date.now()+file.originalname);
        }
    })
    return multer({storage,fileFilter:fileFilter(allowFormats),limits:{fileSize:fileSize*1024*1024}})
}