const express = require('express');
const router = express.Router();
const aboutController = require('../../controllers/viewsController/aboutController');
const { authMiddleware, roleMiddleware } = require('../../middleware/authMiddleware');
const upload = require('../../middleware/upload');

// Tạo About mới
router.post('/createAbout', upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'carouselImages', maxCount: 10 }
]), aboutController.createAbout);

// Lấy About
router.get('/getAbout', aboutController.getAbout);

// Cập nhật About theo id
router.put('/updateAbout/:id',  upload.fields([
    { name: 'bannerImage', maxCount: 1 },
    { name: 'carouselImages', maxCount: 10 }
]), aboutController.updateAbout);

// Xóa About theo id
router.delete('/deleteAbout/:id', aboutController.deleteAbout);

module.exports = router;
