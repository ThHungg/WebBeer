const express = require('express')
const router = express.Router()
const homePageController = require('../../controllers/viewsController/homepageController')
const upload = require('../../middleware/upload')
const { authMiddleware, roleMiddleware } = require('../../middleware/authMiddleware')

router.post('/createdataHP', homePageController.createDataHP)
router.get('/getHome', homePageController.getHome)

module.exports = router