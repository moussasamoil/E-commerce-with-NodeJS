import Joi from "joi";

// helper to check id correct because mongoose return it as an objectId but joi not validate objectId
const objectId = Joi.string().hex().length(24);

export const addOrderValidate = Joi.object({
    user_id: objectId.required(),
     product: objectId.required().messages({
        'any.required': 'product is required',
        'string.base': 'you should add only one product id',
        'string.hex': 'invalid product id',
        'string.length': 'invalid product id'
    }),
    total_amount: Joi.number(),
    status: Joi.string(),
}).required()