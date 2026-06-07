import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model.js"
import bcrypt from 'bcrypt'
import randomstring from "randomstring";
import { verifyAddedEmail } from "../../utils/sendEmail.js";
import { causeForOtp, otpModel } from "../../models/otp.model.js";
import { generateOtp } from "../../utils/generateOTP.js";

// get all users 
export const getAllUsers = async (req, res, next) => {
    let users = await userModel.find();
    res.status(200).json({ message: 'get users successfully', users: users });
}

// sign up for first time
export const signUp = async (req, res, next) => {
    let { email, name, password, age, role } = req.body;

    let checkExistEmail = await userModel.findOne({ email });
    if (checkExistEmail) return next(new Error('Conflict this email already used', { cause: 409 }));

    let newUser = new userModel({ email, name, password,age, role });
    await newUser.save();

    let otp = await generateOtp();
    console.log(otp)

    let sendEmail = await verifyAddedEmail(email, 'Verify Account On E-commerce', otp, name);

    const saveOtp = await otpModel.create({ email, otp, cause: causeForOtp.verify });

    res.status(201).json({ message: 'user created successfully, Check your email to verify account', saveOtp: saveOtp });
}

// sign in method
export const signIn = async (req, res, next) => {
    let { email, password } = req.body;

    let checkExistEmail = await userModel.findOne({ email });
    if (!checkExistEmail) return next(new Error('this email not found please insert it correct or sign up first', { cause: 400 }));

    if (!checkExistEmail.verify) return next(new Error('this email did not verify yet', { cause: 400 }))

    let comparePass = bcrypt.compareSync(password, checkExistEmail?.password, process.env.HASH_KEY);
    if (!comparePass) return next(new Error('wrong password try again', { cause: 400 }));

    let access_token = jwt.sign({ email, id: checkExistEmail?._id, role: checkExistEmail?.role }, process.env.JWT_PRIVATE_ACCESS_KEY, { expiresIn: "10M" });
    let refresh_token = jwt.sign({ email, id: checkExistEmail?._id, role: checkExistEmail?.role }, process.env.JWT_PRIVATE_REFRESH_KEY, { expiresIn: "7d" });
    res.status(200).json({ message: 'login successfully', access_token,refresh_token })
    
}
// verify account by sending otp after register
export const verifyAccount = async (req, res, next) => {
    let { email, otp } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (!checkUser) return res.status(404).json({ message: "user not found sign up first" });
    if (checkUser.verify == true) return res.status(400).json({ message: 'user already verified' });
    const checkOtp = await otpModel.findOne({ email, otp });
    if (checkOtp && Date.now() > checkOtp.expireDate) {
        await checkOtp.deleteOne()
        return res.status(400).json({ message: 'this otp expired try another one' })
    }
    if (!checkOtp) return res.status(400).json({ message: 'this otp for this email not found try new one' })
    checkUser.verify = true;
    await checkUser.save();
    await checkOtp.deleteOne();
    return res.status(200).json({ message: 'user verified successfully now you could login' })
}
// send opt to verify or change password
export const tryAnotherOtp = async (req, res, next) => {
    let { email, cause } = req.body;

    let checkUser = await userModel.findOne({ email });
    if (!checkUser) return next(new Error('this user did not found try correct email or sign up first', { cause: 404 }));

    if (cause == causeForOtp.verify) {
        if (checkUser.verify == true) return next(new Error('this user already verified'));
    }

    let otp = await generateOtp();
    let sendEmail = await verifyAddedEmail(email, 'Verify Account On E-commerce', otp, checkUser?.name);
    const saveOtp = await otpModel.create({ email, otp, cause: cause });
    res.status(200).json({ message: 'otp send successfully', otpInfo: saveOtp })
}
// change password 
export const changePassword = async (req, res, next) => {
    let { email, otp, newPass } = req.body;
    let checkUser = await userModel.findOne({ email });
    if (!checkUser) return next(new Error('this user did not found try correct email or sign up first', { cause: 404 }));

    let checkOtp = await otpModel.findOne({ email, otp });
    if (!checkOtp) return next(new Error('this otp not found for this email'));

    if (checkOtp.cause !== causeForOtp.changePassword) return next(new Error('cause should be changePassword', { cause: 400 }));

    let hashPass = bcrypt.hashSync(newPass, 7, process.env.HASH_KEY);
    checkUser.password = hashPass;
    await checkUser.save();
    await checkOtp.deleteOne();
    res.status(200).json({ message: "password changed successfully " });
}

export const refreshToken = async (req, res, next) => {
    let { refreshToken  } = req.body;
    let user = jwt.verify(refreshToken,process.env.JWT_PRIVATE_REFRESH_KEY);
    let checkUser = await userModel.findById(user?.id);
    if(!checkUser)return next(new Error('this user not found'));
    let access_token = jwt.sign({id:checkUser._id,email:checkUser.email , role:checkUser.role},process.env.JWT_PRIVATE_ACCESS_KEY,{expiresIn:"10m"});
    let refresh_token = jwt.sign({id:checkUser._id,email:checkUser.email , role:checkUser.role}, process.env.JWT_PRIVATE_REFRESH_KEY ,{expiresIn:"7d"});
    res.status(200).json({message:"user refresh token successfully" , access_token,refresh_token})
}