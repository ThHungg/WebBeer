const aboutService = require('../../services/viewsService/aboutService')

const createAbout = async (req, res) => {
    try {
        const { banner, description, carouselImages, estDate } = req.body
        const aboutData = {
            banner, description, carouselImages, estDate
        }
        const response = await aboutService.createAbout(aboutData)
        return res.status(200).json(response)
    } catch (e) {
        res.status(500).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!',
        });
    }
}

module.exports = {
    createAbout
}