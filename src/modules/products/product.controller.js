import { Router } from "express";
import * as productMethods from "./product.service.js";
import { authorization } from "../../utils/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const productRouter = Router();

productRouter.post("/addProduct", authorization, asyncHandler(productMethods.addProduct));
productRouter.get("/getAllProducts" , authorization , asyncHandler(productMethods.getAllProduct));
productRouter.get("/findById/:id" , authorization , asyncHandler(productMethods.getProductById))
productRouter.put("/updateProduct/:id" , authorization , asyncHandler(productMethods.updateProduct));
productRouter.delete("/deleteProduct/:id" , authorization , asyncHandler(productMethods.deleteProduct));