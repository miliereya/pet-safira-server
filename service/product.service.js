const ProductModel = require('../models/product.model')

class ProductService {
    async getProduct(id, index){
        if(index !== '') {
            const productByIndex = await ProductModel.findOne({index})
            if(productByIndex){
                return productByIndex
            }
        }
        const productById = await ProductModel.findById(id)
        return productById
    }
    async getProducts(name, sort, order, indexes, category, sale){
        const sortParams = {}
        let queries = {}

        switch (sort) {
            case 'rating':
                sortParams.rating = order
                break;

            case 'name':
                sortParams.name = order
                break;

            case 'date':
                sortParams.date = order
                break;
            case 'price':
                sortParams.price = order
                break;
        }

        if (name !== '') {
            queries = {
                $text: {$search: `/${name}/`}
            }
        }

        if (indexes !== '') queries.indexes = indexes
        if (category !== '') queries.category = category
        if (sale === 'true') queries.oldprice = {$ne: null}

        const productData = await ProductModel.find(queries).sort(sortParams)
        return productData
    }
    async AddProduct(name, description, price, oldprice, sale, img, quantity, category, rating, company, indexes){
        const date = new Date

        const newProduct = new ProductModel({
            name,
            description,
            date,
            price,
            oldprice,
            sale,
            quantity,
            category,
            rating,
            company,
            img,
            indexes
        })

        await newProduct.save()
        return 'Added ' + newProduct.name

    }
}

module.exports = new ProductService()