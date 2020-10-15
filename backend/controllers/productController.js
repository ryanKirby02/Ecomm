import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// desc: Fetches all products
// route: used: GET /api/products
// access: Public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// desc: Fetches one product
// route used: GET /api/products/:id
// access: Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error(' Error 404: Product not found')
    }
})

export {getProducts, getProductById}