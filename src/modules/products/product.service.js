import mongoose from "mongoose";
import { productModel } from "../../models/product.model.js";
import { userModel } from "../../models/user.model.js";

// add product
export const addProduct = async (req, res, next) => {
    let { title, category, price, stock } = req.body;
    // receive id from token
    let userCreator = req.token.id;
    if (!userCreator) {
        return next(new Error('can not extract id from provided token , invalid token', { cause: 400 }))
    }
    // check if id token and title already added or not 
    let checkExistProduct = await productModel.findOne({ title, creatorId: userCreator });
    if (checkExistProduct) {
        return next(new Error('this product already added by this user you can updated it ', { cause: 400 }))
    }
    let addProduct = await productModel.create({ title, category, price, stock, creatorId: req.token.id });
    return res.status(201).json({ message: 'product added successfully', info: addProduct })
}

// get all product
export const getAllProduct = async (req, res, next) => {
    let products = await productModel.find().populate("creatorId" , ['name','email']);
    return res.status(200).json({ message: 'get all product successfully ', products: products })
}

// retrieve product by id 
export const getProductById = async (req, res, next) => {
    let id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error('invalid product id', { cause: 400 }))
    }
    let product = await productModel.findById(id);
   // console.log(product)
    if (product) {
        return res.status(200).json({ message: 'product found successfully ', product: product });
    }
    return next(new Error('can not found this product', { cause: 400 }))
}

// update product 
export const updateProduct = async (req, res, next) => {
    let { id } = req.params; // get id of product 
    let userId = req.token.id;
    let { title, category, price, stock } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error('invalid product id', { cause: 400 }))
    }
    let product = await productModel.findById(id);
    if (product) {
        if (product.creatorId.toString() == userId) {
            let updateProduct = await productModel.updateOne({ _id: product.id }, { title, category, price, stock }, { runValidators: true });
            return res.status(201).json({ message: 'product updated successfully ', info: updateProduct })
        }
        return next(new Error('this user not allowed to update others product', { cause: 404 }))
    }
    return next(new Error('can not found this product', { cause: 400 }))
}

// delete product 
export const deleteProduct = async (req, res, next) => {
    let { id } = req.params; // get id of product 
    let userId = req.token.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error('invalid product id', { cause: 400 }))
    }
    let product = await productModel.findById(id);
    if (product) {
        if (product.creatorId.toString() == userId) {
            let updateProduct = await productModel.deleteOne({ _id: id })
            return res.status(201).json({ message: 'product deleted successfully ', info: updateProduct })
        }
        return next(new Error('this user not allowed to delete others product', { cause: 404 }))
    }
    return next(new Error('can not found this product', { cause: 400 }))
}

