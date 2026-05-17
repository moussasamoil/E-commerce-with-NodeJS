import { Router } from "express";
import { authorization } from "../../utils/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as reportMethods from "./aggregate.service.js";



export const reportRouter = Router();

reportRouter.get("/salesSummary" , authorization , asyncHandler(reportMethods.salesSummary));
reportRouter.get("/SalesByCategory" , authorization , asyncHandler(reportMethods.SalesByCategory));
reportRouter.get("/topSellingProducts" , authorization , asyncHandler(reportMethods.topSellingProducts));
reportRouter.get("/userPurchaseStats" ,authorization , asyncHandler(reportMethods.userPurchaseStats))