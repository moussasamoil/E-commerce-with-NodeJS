import Joi from "joi";
import { role } from "../models/user.model.js";
import { causeForOtp } from "../models/otp.model.js";

export const signUpValidate = Joi.object({
    name: Joi.string().min(3).max(50),
    password: Joi.string().min(3).max(20).required(),
    age: Joi.number().integer().min(18).max(100),
    role: Joi.string().valid(...role).required(),
    email: Joi.string().email().required()
}).required();

export const signInValidate = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required()
}).required();

export const sendOpt = Joi.object({
    email:Joi.string().required(),
    otp:Joi.string().required(),
}).required(true);

export const sendAnotherOpt = Joi.object({
    email:Joi.string().required(),
    cause:Joi.string().valid(...Object.values(causeForOtp)).required(),
}).required(true);

export const changePassword = Joi.object({
    email:Joi.string().required(),
    newPass:Joi.string().required().min(6).max(20),
    otp:Joi.string().required(),
}).required(true);

export const refreshToken = Joi.object({
    refreshToken:Joi.string().required()
}).required(true);