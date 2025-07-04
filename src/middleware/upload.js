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

// const multer = require('multer')

// const storage = multer.memoryStorage()

// const upload = multer({ storage })

// module.exports = upload


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({ storage: storage })

module.exports = upload