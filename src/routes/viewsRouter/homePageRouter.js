const express = require('express')
const router = express.Router()
const homePageController = require('../../controllers/viewsController/homepageController')
const upload = require('../../middleware/upload')

router.post('/createdataHP', upload.array('image', 10), homePageController.createDataHP)

module.exports = router