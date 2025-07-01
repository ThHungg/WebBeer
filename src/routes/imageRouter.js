const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')
const upload = require('../middleware/upload')

router.post('/upload', upload.array('image', 5), imageController.uploadImages)

module.exports = router