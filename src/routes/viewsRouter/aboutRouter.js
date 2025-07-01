const express = require('express')
const router = express.Router()
const aboutController = require('../../controllers/viewsController/aboutController')

router.post('/createAbout', aboutController.createAbout)

module.exports = router