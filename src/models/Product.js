const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priceType: { type: String, enum: ['fixed', 'contact'] },
    price: { type: Number, required: function () { return this.priceType === 'fixed' } },
    description: { type: String, required: true },
    image: [{ type: String, required: false }],
    specifications: [{
        title: { type: String },
        text: { type: String }
    }]
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)
module.exports = Product


// categoryId: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
// category: { type: String, required: true },