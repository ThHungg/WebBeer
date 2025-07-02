const mongoose = require('mongoose')
const { link } = require('../routes/userRouter')

const navigateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    navigate: [{
        imageUrl: { type: String },
        title: { type: String },
        button: {
            text: { type: String },
            link: { type: String }
        }
    }]
})

const Navigate = mongoose.model("Navigate", navigateSchema)
module.exports = Navigate