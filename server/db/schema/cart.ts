import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{
        product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true},
    }]
})
export const Cart = mongoose.model('Cart', CartSchema)