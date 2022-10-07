const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adPosterSchema = new Schema ({
    title:  { type: String, required: true  },
    text:   { type: String, required: true  },
    img:    { type: String, required: true  },
    link:   { type: String, required: true  }
})

const AdPoster = mongoose.model('AdPoster', adPosterSchema)

module.exports = AdPoster