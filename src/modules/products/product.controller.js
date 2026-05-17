import { Router } from "express";
import * as productMethods from "./product.service.js";
import { authorization } from "../../utils/authorization.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { validation } from "../../validation/global.validation.js";
import { productValidate } from "../../validation/product.validate.js";



export const productRouter = Router();

productRouter.post("/addProduct", authorization,validation(productValidate), asyncHandler(productMethods.addProduct));
productRouter.get("/getAllProducts" , authorization , asyncHandler(productMethods.getAllProduct));
productRouter.get("/findById/:id" , authorization , asyncHandler(productMethods.getProductById))
productRouter.put("/updateProduct/:id" , authorization , asyncHandler(productMethods.updateProduct));
productRouter.delete("/deleteProduct/:id" , authorization , asyncHandler(productMethods.deleteProduct));