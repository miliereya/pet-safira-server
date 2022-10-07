const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api-error')

class UserService {

    //Util for user data
    async returnUser(user){ 
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async registration(email, password) {
        const candidate = await UserModel.find({ email })
        if(candidate.length !== 0) {
            throw ApiError.BadRequest(`User with the specified email ${ email } is already exist`)
        }

        const hashedPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({ email, password: hashedPassword, activationLink })
        await mailService.sendActivationMail( email, `${process.env.API_URL}/api/activate/${activationLink}` )

        const data = await this.returnUser(user)
        return data
    }
    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest('Wrong activation link')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email, password){
        const user = await UserModel.findOne({ email })
        if(!user){
            throw ApiError.BadRequest(`No user was found with email ${email}`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest('Wrong password')
        }
        const data = await this.returnUser(user)
        return data
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)

        return token
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validationRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const data = await this.returnUser(user)
        return data
    }
    async AddCartItem(id, item) {
        const user = await UserModel.findById(id)
        const helpArr = user.cart
        const cart = []
        if(helpArr.length!==0){
            let i = 0
            let checker = true
            while(i < helpArr.length) {
                if(helpArr[i].id === item.id){
                    cart.push({
                        id: item.id,
                        name: item.name,
                        quantity: (parseInt(item.quantity) + parseInt(helpArr[i].quantity)).toString(),
                        img: item.img,
                        price: item.price
                    })
                    checker = false
                } else {
                    cart.push(helpArr[i])
                }
                i++
            }
            if(checker) {
                cart.push(item)
            }
        } else {
            cart.push(item)
        }
 
        user.cart = cart
        user.save()

        return user.cart
    }
    async DeleteCartItem(id, item) {
        const user = await UserModel.findById(id)
        const helpArr = user.cart
        const cart = []

        let i = 0
        while(i < helpArr.length) {
            if(helpArr[i].id !== item.id){
                cart.push(helpArr[i])
            }
            i++
        }

        user.cart = cart
        user.save()
        return user.cart
    }
}

module.exports = new UserService()