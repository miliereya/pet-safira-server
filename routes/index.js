const Router = require('express').Router
const userController = require('../controllers/user.controller')
const cartController = require('../controllers/cart.controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')
const categoryController = require('../controllers/category.controller')
const adPosterController = require('../controllers/adPoster.controller')
const postController = require('../controllers/post.controller')
const productController = require('../controllers/product.controller')

// User 
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 24 }),
    userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)


//Cart 
router.post('/cart/add', authMiddleware, cartController.AddItem)
router.post('/cart/delete', authMiddleware, cartController.DeleteItem)


//Categories
router.get('/category/get', categoryController.getCategories)
router.post('/category/add', adminMiddleware, categoryController.addCategory)


//Ad Posters
router.get('/adposters/get', adPosterController.getAdPosters)


//Posts
router.get('/post', postController.getPost)
router.get('/posts', postController.getPosts)


//Products
router.get('/product', productController.getProduct)
router.get('/products', productController.getProducts)
router.post('/product/add', adminMiddleware, productController.addProduct)


module.exports = router