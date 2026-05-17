import mongoose from "mongoose";

export const status = ['sold', 'in_process']

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
        isNull: false
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'product',
                required: true
            },
            count: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ],
    total_amount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: status,
        default: 'in_process'
    },
}, { timestamps: true });

export const orderModel = mongoose.model('order', orderSchema);