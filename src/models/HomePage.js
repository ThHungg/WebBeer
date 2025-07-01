const mongoose = require('mongoose')

const homePageSchema = new mongoose.Schema({
    banner: {
        image: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        button: {
            text: { type: String },
            link: { type: String }
        }
    },
    sections: [
        {
            imageUrl: { type: String },
            title: { type: String, required: true },
            description: { type: String },
            button: {
                text: { type: String },
                link: { type: String }
            },
            imagePosition: {
                type: String,
                enum: ['left', 'right'],
                default: 'left' // quy định vị trí ảnh (trái/phải)
            }
        }
    ],
    carouselImages: [String]

})

const HomePage = mongoose.model("HomePage", homePageSchema)
module.exports = HomePage