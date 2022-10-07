const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name:           { type: String, required: true, unique: true    },
    description:    { type: String, required: true,                 },
    price:          { type: Number, required: true                  },
    oldprice:       { type: Number | null, required: false          },
    img:            { type: String, required: true                  },
    date:           { type: Date, required: true                    },
    quantity:       { type: Number, required: true                  },
    category:       { type: String, required: true                  },
    rating:         { type: Number, required: true                  },
    company:        { type: String, required: true                  },

    //For example: Deal of the week, Best Sellers, MostviewProducts
    indexes: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product