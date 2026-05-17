import { Router } from "express";
import { authorization } from "../../utils/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import *as orderMethods from "./order.service.js";
import { validation } from "../../validation/global.validation.js";
import { addOrderValidate } from "../../validation/order.validate.js";


export const orderRouter = Router();

orderRouter.get("/getAllOrders" , authorization , asyncHandler(orderMethods.getAllOrder));
orderRouter.post("/addOrder" , authorization ,validation(addOrderValidate), asyncHandler(orderMethods.addOrder));
orderRouter.get("/getOrderById/:id" ,authorization ,asyncHandler(orderMethods.getOrderById));
orderRouter.get("/confirmOrder/:id" ,authorization , asyncHandler(orderMethods.confirmOrder))