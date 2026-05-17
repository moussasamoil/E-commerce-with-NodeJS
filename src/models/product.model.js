import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        isNull:false,
    },
    category: {
        type: String,
        required: true,
        isNull: false
    },
    price: {
        type: Number,
        required: true,
        isNull: false
    },
    stock: {
        type: Number,
        required: true,
        isNull: false
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

export const productModel = mongoose.model('product', productSchema)