import Joi from "joi";


export const productValidate = Joi.object({
    title:Joi.string().required().min(3).max(100),
    category:Joi.string().required().min(3).max(100),
    price:Joi.number().required().min(3),
    stock:Joi.number().required().min(0),
}).required();