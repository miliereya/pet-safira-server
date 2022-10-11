module.exports = class CategoryDto {
    name
    id

    constructor(model) {
        this.name = model.name
        this._id = model._id
    }
}