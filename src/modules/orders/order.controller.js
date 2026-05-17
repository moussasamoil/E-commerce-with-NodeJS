import { Router } from "express";
import { authorization } from "../../utils/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import *as orderMethods from "./order.service.js";


export const orderRouter = Router();

orderRouter.get("/getAllOrders" , authorization , asyncHandler(orderMethods.getAllOrder));
orderRouter.post("/addOrder" , authorization , asyncHandler(orderMethods.addOrder));
orderRouter.get("/getOrderById/:id" ,authorization ,asyncHandler(orderMethods.getOrderById));
orderRouter.get("/confirmOrder/:id" ,authorization , asyncHandler(orderMethods.confirmOrder))