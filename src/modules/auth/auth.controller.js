import { Router } from "express";
import * as authService from './auth.service.js'
import { validation } from "../../validation/global.validation.js";
import { signInValidate, signUpValidate } from "../../validation/auth.validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authorization } from "../../utils/authorization.js";

export const authRouter = Router();

authRouter.get("/getAllUsers" ,authorization, asyncHandler(authService.getAllUsers));
authRouter.post("/signUp" ,validation(signUpValidate) , asyncHandler(authService.signUp));
authRouter.post("/signIn" ,validation(signInValidate), asyncHandler(authService.signIn))