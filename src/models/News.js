const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    mainImageUrl: { type: String },    
    summary: { type: String },      
    sections: [
        {
            text: { type: String, required: true },  
            imageUrl: { type: String }              
        }
    ],
    author: { type: String, default: 'Admin' },
    publishedAt: { type: Date, default: Date.now }
})


const News = mongoose.model("News", newsSchema)
module.exports = News