import Joi from "joi";
import { Types } from "mongoose";

// helper to check id correct because mongoose return it as an objectId but joi not validate objectId
// const objectId = Joi.string().hex().length(24);

export const addOrderValidate = Joi.object({
    user_id: Joi.custom((v, h) => {
        if (Types.ObjectId.isValid(v)) return v;
        return h.message("invalid user id try again")
    }).required(),
    product: Joi.custom((v, h) => {
        if (Types.ObjectId.isValid(v)) return v;
        return h.message("invalid product id try again")
    }).required(),
    total_amount: Joi.number(),
    status: Joi.string(),
}).required()