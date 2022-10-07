const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title:  { type: String, required: true, },
    text:   { type: String, required: true, },
    date:   { type: Date, required: true    },
    img:    { type: String, required: true  },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post