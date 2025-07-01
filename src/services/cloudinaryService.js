const cloudinary = require('../config/cloudinaryConfig')

const deleteImg = async (imgId) => {
    try {
        const response = await cloudinary.uploader.destroy(imgId)
        return response
    } catch (e) {
        return e
    }
}

module.exports = {
    deleteImg
}