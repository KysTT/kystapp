import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { getUser } from '../kinde.ts'
import { User } from "../db/schema/user"
import { Cart } from "../db/schema/cart"
import { Product } from "../db/schema/product"
import {mongo} from "mongoose";

const productSchema = z.object({
    product_id: z.number(),
    name: z.string(),
    description: z.string(),
    stock: z.number().int().nonnegative(),
    price: z.number().int().positive(),
    category: z.string(),
    image_url: z.string(),
})

const productPostSchema = productSchema.omit({ product_id: true })

const cartPostSchema = z.any()

async function getUserProductId(product_id: any, user_id: any) {
    const mongoUser = await User.findOne({user_id: user_id})
    let _id
    const product = await Product.findOne({product_id: product_id})
    try{
        _id = product!._id
    } catch (e) {
        return {product_id: null, user_id: null}
    }
    return {product_id: _id, user_id: mongoUser!._id}
}

export const storeRoutes = new Hono()
    .get('/', async (c) => {
        const products = await Product.find()
        return c.json({products: products})
    })
    .post('/', getUser, zValidator('json', productPostSchema), async (c) => {
        const data = c.req.valid('json')
        let new_product_id = 1
        const get_product_id = await Product.find({},'product_id').sort({ product_id: -1 }).limit(1)
        if (get_product_id.length !== 0){
            new_product_id = get_product_id[0].product_id + 1
        }
        const product = new Product({
            product_id: new_product_id,
            name: data.name,
            description: data.description,
            stock: data.stock,
            price: data.price,
            category: data.category,
            image_url: data.image_url
        })
        try{
            await product.save()
            c.status(201)
        }catch(err){
            c.status(401)
        }
        return c.json(product)
    })
    .get('/:id{[0-9]+}',getUser, async (c) => {
        const _id = Number(c.req.param('id'))
        const product = await Product.findOne({product_id: _id})
        if (!product){
            c.status(400)
            return c.json({})
        }
        return c.json({product: product})
    })
    .put('/:id{[0-9]+}', getUser, zValidator('json', productPostSchema), async(c)=>{
        const data = c.req.valid('json')
        const product_id = Number(c.req.param('id'))
        const filter = {product_id: product_id}
        const update = {
            name: data.name,
            description: data.description,
            stock: data.stock,
            price: data.price,
            category: data.category,
            image_url: data.image_url
        }
        const product = await Product.findOneAndUpdate(filter, update, { new: true })
        return c.json({product: product})
    })
    .get('/cart', getUser, async (c) => {
        const mongoUser = await User.findOne({user_id: c.var.user.id})
        let cart = await Cart.findOne({user_id: mongoUser!._id})
        if (!cart) {
            cart = new Cart()
            cart.user_id = mongoUser!._id
        }
        let resultCart: Object[] = []
        for (const p of cart.products) {
            const product = await Product.findOne({_id: p.product_id})
            if (product) resultCart.push({product: product, quantity: p.quantity})
        }
        return c.json(resultCart)
    })
    .put('/checkout', getUser, zValidator('json', cartPostSchema), async(c)=>{
        const cart = c.req.valid('json')
        for (const i in cart){
            const product = await Product.findOne({_id: cart[i].product._id})
            if (product) {
                product.stock -= cart[i].quantity
                try{
                    await product.save()
                } catch(err){
                    c.status(400)
                    return c.json({})
                }
            }
        }

        const mongoUser = await User.findOne({user_id: c.var.user.id})
        try{
            await Cart.findOneAndDelete({user_id: mongoUser!._id})
        }
        catch(err){
            c.status(400)
            return c.json({})
        }

        const mongoCart = new Cart()
        mongoCart.user_id = mongoUser!._id
        return c.json([])
    })
    .put('/addToCart', getUser, zValidator('json', cartPostSchema), async (c) => {
        const _id = c.req.valid('json')
        const {product_id, user_id} = await getUserProductId(_id, c.var.user.id)
        if (product_id === null || user_id === null){
            c.status(400)
            return c.json({})
        }

        let cart = await Cart.findOne({user_id: user_id})
        if (!cart) {
            cart = new Cart()
            cart.user_id = user_id
        }

        const existingProduct = cart.products.find((p)=> p.product_id.toString() === product_id.toString())
        if (existingProduct) {
            existingProduct.quantity! += 1
        } else{
            cart.products.push({product_id: product_id, quantity: 1})
        }

        try{
            await cart.save()
            c.status(201)
        }catch (err){
            c.status(401)
            return c.json({})
        }
        let resultCart: Object[] = []
        for (const p of cart.products) {
            const product = await Product.findOne({_id: p.product_id})
            if (product) resultCart.push({product: product, quantity: p.quantity})
        }

        return c.json(resultCart)
    })
    .put('/subtractFromCart', getUser, zValidator('json', cartPostSchema), async (c) => {
        const _id = c.req.valid('json')
        const {product_id, user_id} = await getUserProductId(_id, c.var.user.id)
        if (product_id === null || user_id === null){
            c.status(400)
            return c.json({})
        }

        let cart = await Cart.findOne({user_id: user_id})
        if (!cart) {
            c.status(400)
            return c.json({})
        }

        const existingProduct = cart.products.find((p)=> p.product_id.toString() === product_id.toString())
        if (existingProduct) {
            existingProduct.quantity! -= 1
        } else{
            c.status(400)
            return c.json({})
        }

        try{
            await cart.save()
            c.status(201)
        }catch (err){
            c.status(401)
            return c.json({})
        }
        let resultCart: Object[] = []
        for (const p of cart.products) {
            const product = await Product.findOne({_id: p.product_id})
            if (product) resultCart.push({product: product, quantity: p.quantity})
        }

        return c.json(resultCart)
    })
    .delete('/removeFromCart', getUser, zValidator('json', cartPostSchema), async (c) => {
        const _id = c.req.valid('json')
        const {product_id, user_id} = await getUserProductId(_id, c.var.user.id)
        if (product_id === null || user_id === null){
            c.status(400)
            return c.json({})
        }

        let cart = await Cart.findOne({user_id: user_id})
        if (!cart) {
            c.status(400)
            return c.json({})
        }

        const existingProduct = cart.products.find((p)=> p.product_id.toString() === product_id.toString())
        if (existingProduct) {
            existingProduct.deleteOne()
        } else{
            c.status(400)
            return c.json({})
        }

        try{
            await cart.save()
            c.status(201)
        }catch (err){
            c.status(401)
            return c.json({})
        }

        let resultCart: Object[] = []
        for (const p of cart.products) {
            const product = await Product.findOne({_id: p.product_id})
            if (product) resultCart.push({product: product, quantity: p.quantity})
        }

        return c.json(resultCart)
    })