import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model.js"
import bcrypt from 'bcrypt'

// get all users 
export const getAllUsers = async (req, res, next) => {
    let users = await userModel.find();
    res.status(200).json({ message: 'get users successfully', users: users });
}

// sign up for first time
export const signUp = async (req, res, next) => {
    let { email, name, password, age, role } = req.body;
    let checkExistEmail = await userModel.findOne({ email });
    if (checkExistEmail) {
        return next(new Error('Conflict this email already used', { cause: 409 }))
    }
    const hashPassword = bcrypt.hashSync(password, 7, process.env.HASH_KEY);
    let save = await userModel.create({ email, name, password: hashPassword, age, role });
    res.status(201).json({ message: 'user created successfully ', info: save });
}

// sign in method
export const signIn = async (req, res, next) => {
    let { email, password } = req.body;
    let checkExistEmail = await userModel.findOne({ email });
    if (!checkExistEmail) {
        return next(new Error('this email not found please insert it correct or sign up first', { cause: 400 }))
    }
    let comparePass = bcrypt.compareSync(password,checkExistEmail?.password, process.env.HASH_KEY);
    if(!comparePass){
        return next(new Error('wrong password try again' , {cause:400}));
    }
    let token = jwt.sign({email,id:checkExistEmail?._id , role:checkExistEmail?.role} , process.env.JWT_PRIVATE_KEY)
    res.status(200).json({message:'login successfully' , token:token})
}