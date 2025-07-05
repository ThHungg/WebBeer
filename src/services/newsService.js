const News = require('../models/News')  // đường dẫn đúng tới file schema News của bạn

const createNews = async (data) => {
    try {
        const news = new News({
            title: data.title,
            mainImageUrl: data.mainImageUrl,
            summary: data.summary,
            sections: data.sections,
            author: data.author || 'Admin',
            publishedAt: new Date()
        })

        const savedNews = await news.save()
        return savedNews
    } catch (error) {
        console.error('Error creating news:', error)
        throw error
    }
}

module.exports = {
    createNews
}
