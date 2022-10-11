const CategoryModel = require('../models/category.model')
const CategoryDto = require('../dtos/category.dto')

class CategoryService {
    async getCategories(){
        const categories = await CategoryModel.find()
        const categoryData = []
        for(let i = 0; i < categories.length; i++){
            categoryData.push(new CategoryDto(categories[i]))
        }
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