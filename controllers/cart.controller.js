const userService = require('../service/user.service')

require('dotenv').config()

class CartController {
    async AddItem(req, res, next) {
        try {
            const { item } = req.body
            const cart = await userService.AddCartItem(req.user.id, item)
            return res.json(cart)
        } catch (e) {
            next(e)
        }
    }
    async DeleteItem(req, res, next) {
        try {
            const { item } = req.body
            const cart = await userService.DeleteCartItem(req.user.id, item)
            return res.json(cart)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CartController()