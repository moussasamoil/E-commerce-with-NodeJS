import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export const role = ['admin', 'user']

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        notNull: true,
    },
    email: {
        type: String,
        notNull: true,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,

    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        notNull: true,
        required: true,
        enum: role,
    },
    verify: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

userSchema.pre("save", function () {
    //console.log(this.password);
    if (!this.isModified("password")) return;
    this.password = bcrypt.hashSync(this.password, 7, process.env.HASH_KEY);
})

export const userModel = mongoose.model('user', userSchema);