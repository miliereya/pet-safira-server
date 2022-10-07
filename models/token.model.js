const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TokenSchema = new Schema({
    user:           { type: Schema.Types.ObjectId, ref: 'User'  },
    refreshToken:   { type: String,  require: true              }
    
})

module.exports = mongoose.model('Token', TokenSchema)