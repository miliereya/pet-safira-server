const userService = require('../service/user.service')
const ApiError = require('../exceptions/api-error')
const categoryService = require('../service/category.service')

class CategoryController {
    async getCategories(req, res, next) {
        try {
            const categoriesData = await categoryService.getCategories()
            return res.json(categoriesData)
        } catch (e) {
            next(e)
        }
    }
    async addCategory(req, res, next) {
        try {
            const {name} = req.body
            const categoryName = await categoryService.addCategory(name)
            return res.json(categoryName)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CategoryController()