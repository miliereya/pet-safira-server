const postService = require('../service/post.service')


require('dotenv').config()

class postController {
    async getPost(req, res, next) {
        try {
            const {id} = req.query
            const post = await postService.getPost(id)
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
    async getPosts(req, res, next) {
        try {
            const {title, limit, order} = req.query
            const posts = await postService.getPosts(title, limit, order)
            return res.json(posts)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new postController()