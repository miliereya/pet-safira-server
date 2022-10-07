module.exports = class UserDto {
    email
    id
    isActivated
    cart
    role

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.cart = model.cart
        this.role = model.role
    }
}