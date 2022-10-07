const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:          { type: String, unique: true, required: true    },
    password:       { type: String, required: true                  },
    role:           { type: String, required: true, default: 'user' },
    isActivated:    { type: Boolean, default: false                 },
    activationLink: { type: String,                                 },
    cart:           { type: Array                                   }
})

module.exports = mongoose.model('User', UserSchema)