export const validation = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const errors = [];
        let validate = schema.validate(data, { abortEarly: false });
        if (validate.error) {
            errors.push(validate?.error?.details?.map(err => err.message));
            return next(new Error(errors, { cause: 400 }))
        }
        return next();
    }
}