import { Router } from "express";
import * as authService from './auth.service.js'
import { validation } from "../../validation/global.validation.js";
import { changePassword, refreshToken, sendAnotherOpt, sendOpt, signInValidate, signUpValidate } from "../../validation/auth.validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authorization } from "../../utils/authorization.js";

export const authRouter = Router();

authRouter.get("/getAllUsers", authorization, asyncHandler(authService.getAllUsers));
authRouter.post("/signUp", validation(signUpValidate), asyncHandler(authService.signUp));
authRouter.post("/signIn", validation(signInValidate), asyncHandler(authService.signIn));
authRouter.post("/verifyAccount", validation(sendOpt), asyncHandler(authService.verifyAccount));
authRouter.post("/tryAnotherOtp", validation(sendAnotherOpt), asyncHandler(authService.tryAnotherOtp));
authRouter.post("/changePassword", validation(changePassword), asyncHandler(authService.changePassword));
authRouter.post("/refreshToken", validation(refreshToken), asyncHandler(authService.refreshToken));