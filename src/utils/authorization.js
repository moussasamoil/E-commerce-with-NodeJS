import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";


export const authorization = async (req, res, next) => {

    let bearerToken = req?.headers?.authorization;
    if (!bearerToken) return next(new Error('token not found login first ', { cause: 403 }));

    let token = bearerToken.split(" ")[1];
    if (!token) return next(new Error('invalid token', { cause: 400 }));

    let decode = await jwt.decode(token, process.env.JWT_PRIVATE_KEY);
    if (!decode) return next(new Error('can not decode the token, invalid token ', { cause: 400 }));

    if (decode?.verify == false) return next(new Error('this email did not verify yet', { cause: 400 }));

    let checkExistUser = await userModel.findById(decode?.id);
    if (!checkExistUser) return next(new Error("this user not found ", { cause: 404 }));

    req.token = decode;
    next();
}