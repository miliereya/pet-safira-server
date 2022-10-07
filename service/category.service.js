const CategoryModel = require('../models/category.model')

class CategoryService {
    async getCategories(){
        const categoryData = await CategoryModel.find()
        return categoryData
    }
    
    async addCategory(name){
        const newCategory = new CategoryModel({
            name
        })
        await newCategory.save()
        return newCategory.name
    }  
}

module.exports = new CategoryService()