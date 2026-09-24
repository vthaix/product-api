const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    pid: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    pname: {
        type: String,
        require: true,
        trim: true
    },

    price: {
        type: Number,
        require: true,
        min: 0
    },

    quantity: {
        type: Number,
        require: true,
        min: 0
    },
},

    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)