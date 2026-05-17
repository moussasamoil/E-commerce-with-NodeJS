import { orderModel } from "../../models/order.model.js"
import { productModel } from "../../models/product.model.js";

// get all orders 
export const getAllOrder = async (req, res, next) => {
    let orders = await orderModel.find();
    res.status(200).json({ message: 'get all orders ', orders: orders })
}

// add order 
export const addOrder = async (req, res, next) => {
    let userId = req?.token?.id;
    let { product } = req.body;
    //console.log(product)
    if (Array.isArray(product)) {
        return next(new Error('you should add only one product', { cause: 400 }))
    }
    // check id order still exist and stock !=0
    let checkProductStock = await productModel.findById(product);
    //console.log(checkProductStock)
    if (!checkProductStock || checkProductStock.stock <= 0) {
        return next(new Error('this product sold out , not available ', { cause: 400 }))
    }
    let userCart = await orderModel.findOne({ user_id: userId, status: 'in_process' });
    //console.log(userCart)
    // create new cart
    if (!userCart) {
        userCart = await orderModel.create({ user_id: userId, products: [{ productId: product, count: 1 }], total_amount: checkProductStock.price });
    }
    else {
        // check if product already exists in cart
        const existingProduct = userCart.products.find(item => item.productId.toString() === product);
        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            userCart.products.push({ productId: product, count: 1 });
        }
        // update total
        userCart.total_amount += checkProductStock.price;
        await userCart.save();
    }
    // decrease stock
    checkProductStock.stock -= 1;
    await checkProductStock.save();
    return res.status(201).json({ message: 'product added successfully', order: userCart });




}

// get order by id 
export const getOrderById = async (req, res, next) => {
    let orderId = req?.params?.id;
    // console.log(orderId)
    let order = await orderModel.findById(orderId);
    res.status(200).json({ message: 'get order successfully ', order: order })
}

// complete order 
export const confirmOrder = async (req, res, next) => {
    let userId = req?.token?.id;
    let orderId = req?.params?.id;
    if (!orderId) {
       return  next(new Error('please insert an order'))
    }
    let checkOrderAndStatus = await orderModel.findOne({ _id:orderId, user_id: userId });
    if (checkOrderAndStatus && checkOrderAndStatus.status == "in_process") {
        checkOrderAndStatus.status = "sold";
        await checkOrderAndStatus.save();
        return res.status(200).json({ message: 'order executed successfully', info: checkOrderAndStatus })
    }
    else {
        return next(new Error('this product not found in_progress status for this user'))
    }
}