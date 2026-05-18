import mongoose from "mongoose";

export const role = ['admin' ,'user']

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        notNull: true,
    },
    email: {
        type: String,
        notNull: true,
        required: true,
        index:true,
        unique:true
    },
    password: {
        type: String,
        notNull: true,
        required: true,
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        notNull: true,
        required: true,
        enum:role,
    },
    verify:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

export const userModel = mongoose.model('user',userSchema);