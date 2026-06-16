import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('connection success to db')
    } catch (error) {
        return error
    }
}