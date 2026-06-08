import mongoose from "mongoose";
import bcrypt from 'bcrypt'

export const role = ['user' ,'admin']
export const provider = {system:"system" , google:"google"}
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
        required:function() {
            return this.provider === provider.google ? false :true
        }
    },
    age: {
        type: Number,
    },
    role: {
        type: String,     
        enum: role,
        default:role.at(0)
    },
    verify: {
        type: Boolean,
        default: false
    },
    provider:{
        type:String,
        enum : Object.values(provider),
        default : provider.system
    },
    profilePic :{
        type:[String],
        default:[]
    }

}, { timestamps: true });

userSchema.pre("save", function () {
    console.log(this.password);
    if (!this.isModified("password")) return;
    this.password = bcrypt.hashSync(this.password, 7, process.env.HASH_KEY);
})

export const userModel = mongoose.model('user', userSchema);