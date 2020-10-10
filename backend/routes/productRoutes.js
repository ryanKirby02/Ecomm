import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// desc: Fetches all products
// route: used: GET /api/products
// access: Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// desc: Fetches one product
// route used: GET /api/products/:id
// access: Public
router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error(' Error 404: Product not found')
    }
}))

export default router