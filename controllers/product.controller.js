const productService = require('../service/product.service')


require('dotenv').config()

class productController {
    async getProduct(req, res, next) {
        try {
            const {id, index} = req.query
            const product = await productService.getProduct(id, index)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }
    async getProducts(req, res, next) {
        try {
            const { name, sort, order, indexes, category, sale }  = req.query
            const products = await productService.getProducts(name, sort, order, indexes, category, sale)
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }
    async addProduct(req, res, next) {
        try {
            const { name, description, price, oldprice, sale, img, quantity, category, rating, company, indexes } = req.body
            const productName = await productService.AddProduct(name, description, price, oldprice, sale, img, quantity, category, rating, company, indexes)
            return res.json(productName)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new productController()