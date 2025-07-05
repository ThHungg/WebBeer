const express = require('express')
const router = express.Router()
const newsController = require('../controllers/newsController')
const upload = require('../middleware/upload')

router.post('/createNews', upload.fields([
    { name: 'mainImageUrl'},
    { name: 'sectionImages' }
]), newsController.createNews)

module.exports = router