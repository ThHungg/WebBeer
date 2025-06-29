const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware')

// POST
router.post('/createUser', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.post('/log-out', userController.logoutUser)
router.post('/refresh_token', userController.refreshToken)
router.post('/send_OTP', userController.sendOtp)

// GET
router.get('/getAllUser', authMiddleware, roleMiddleware(['admin']), userController.getAllUser)
router.get('/getDetailUser/:id', userController.getDetailUser)

// PUT
router.put('/updateUser/:id', authMiddleware, userController.updateUser)

module.exports = router