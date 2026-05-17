import Joi from "joi";
import { role } from "../models/user.model.js";

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