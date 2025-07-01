// const multer = require('multer')
// const { CloudinaryStorage } = require('multer-storage-cloudinary')
// const cloudinary = require('../config/cloudinaryConfig')

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'WebBeerImg',
//         allowedFormats: ['jpg', 'jpeg', 'png']
//     }
// })

// const parser = multer({ storage })

// module.exports = parser

const multer = require('multer')

const storage = multer.memoryStorage()

const upload = multer({ storage })

module.exports = upload