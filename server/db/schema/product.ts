import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    product_id:     {type: Number, required: true},
    name:           {type: String, required: true},
    description:    {type: String, required: true},
    stock:          {type: Number, required: true},
    price:          {type: Number, required: true},
    category:       {type: String, required: true},
    image_url:      {type: String},
})

export const Product = mongoose.model('Product', ProductSchema)