import mongoose from "mongoose";

export const causeForOtp = {
    verify: "verify",
    forgetPass: "forgetPassword"
}

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    cause: {
        type: String,
        enum: Object.values(causeForOtp),
        required: true,
    },
    expireDate:{
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000),
    }
}, { timestamps: true });

export const otpModel = mongoose.model("otp", otpSchema);