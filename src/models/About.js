const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    banner: {
        image: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        button: {
            text: { type: String },
            link: { type: String }
        }
    },
    description: { type: String, required: true },
    carouselImages: [String],
    estDate: { type: String }
})

const About = mongoose.model("About", aboutSchema)
module.exports = About

