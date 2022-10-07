const PostModel = require('../models/post.model')

class PostService {
    async getPost(id){
        const postData = await PostModel.findById(id)
        return postData
    }
    async getPosts(title, limit, order){
        let queries = {}
        const sortParams = {}
        order === 'asc' ? order = 'asc' : order = 'desc'
        if (title !== '') {
            queries = {
                $text: {$search: `/${title}/`}
            }
        }
        sortParams.date = order

        const postsData = await PostModel.find(queries).sort(sortParams).limit(limit)
        return postsData
    }
}

module.exports = new PostService()