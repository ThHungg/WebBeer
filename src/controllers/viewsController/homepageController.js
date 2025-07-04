// const homePageService = require('../../services/viewsService/homePageService');

// const createOrUpdateHomePage = async (req, res) => {
//     try {
//         let { banner, sections, carouselImages } = req.body;

//         // Parse JSON an toàn
//         try {
//             if (typeof banner === 'string') banner = JSON.parse(banner);
//         } catch {
//             return res.status(400).json({ status: "Err", message: "banner không phải JSON hợp lệ" });
//         }

//         try {
//             if (typeof sections === 'string') sections = JSON.parse(sections);
//         } catch {
//             return res.status(400).json({ status: "Err", message: "sections không phải JSON hợp lệ" });
//         }

//         try {
//             if (typeof carouselImages === 'string') carouselImages = JSON.parse(carouselImages);
//         } catch {
//             return res.status(400).json({ status: "Err", message: "carouselImages không phải JSON hợp lệ" });
//         }

//         // Xử lý ảnh banner
//         if (req.files?.bannerImage && req.files.bannerImage.length === 1) {
//             banner = banner || {};
//             banner.image = `/uploads/${req.files.bannerImage[0].filename}`;
//         }

//         // Xử lý ảnh sections
//         if (req.files?.sectionImages && req.files.sectionImages.length > 0) {
//             sections = sections || [];
//             req.files.sectionImages.forEach((file, idx) => {
//                 if (sections[idx]) {
//                     sections[idx].imageUrl = `/uploads/${file.filename}`;
//                 }
//             });
//         }

//         // Xử lý ảnh carouselImages
//         if (req.files?.carouselImages && req.files.carouselImages.length > 0) {
//             carouselImages = req.files.carouselImages.map(f => `/uploads/${f.filename}`);
//         }

//         const data = { banner, sections, carouselImages };

//         const response = await homePageService.createOrUpdateHomePage(data);
//         return res.status(200).json(response);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             status: "Err",
//             message: "Lỗi hệ thống, vui lòng thử lại sau!",
//         });
//     }
// };

// const getHomePage = async (req, res) => {
//     try {
//         const response = await homePageService.getHomePage();
//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(500).json({
//             status: "Err",
//             message: "Lỗi hệ thống, vui lòng thử lại sau!",
//         });
//     }
// };

// const deleteHomePage = async (req, res) => {
//     try {
//         const response = await homePageService.deleteHomePage();
//         if (response.status === "Err") {
//             return res.status(404).json(response);
//         }
//         return res.status(200).json(response);
//     } catch (error) {
//         console.error('Lỗi xóa HomePage:', error);
//         return res.status(500).json({
//             status: "Err",
//             message: "Lỗi hệ thống, vui lòng thử lại sau!",
//         });
//     }
// };

// module.exports = {
//     createOrUpdateHomePage,
//     getHomePage,
//     deleteHomePage,
// };
const fs = require('fs');
const path = require('path');
const homePageService = require('../../services/viewsService/homePageService');


const createHomePage = async (req, res) => {
    try {
        let { banner, sections, carouselImages } = req.body;

        // Parse JSON
        if (typeof banner === 'string') {
            try {
                banner = JSON.parse(banner);
            } catch {
                return res.status(400).json({ status: "Err", message: "banner không đúng định dạng JSON" });
            }
        }

        if (typeof sections === 'string') {
            try {
                sections = JSON.parse(sections);
            } catch {
                return res.status(400).json({ status: "Err", message: "sections không đúng định dạng JSON" });
            }
        }

        if (typeof carouselImages === 'string') {
            try {
                carouselImages = JSON.parse(carouselImages);
            } catch {
                return res.status(400).json({ status: "Err", message: "carouselImages không đúng định dạng JSON" });
            }
        }

        // Xử lý ảnh
        if (req.files?.bannerImage?.length === 1) {
            banner = banner || {};
            banner.image = `/uploads/${req.files.bannerImage[0].filename}`;
        }

        if (req.files?.sectionImages) {
            req.files.sectionImages.forEach((file, idx) => {
                if (sections[idx]) {
                    sections[idx].imageUrl = `/uploads/${file.filename}`;
                }
            });
        }

        if (req.files?.carouselImages) {
            carouselImages = req.files.carouselImages.map(f => `/uploads/${f.filename}`);
        }

        const data = { banner, sections, carouselImages };
        const response = await homePageService.createHomePage(data);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};

const updateHomePage = async (req, res) => {
    try {
        const homePage = await homePageService.getRawHomePage();
        if (!homePage) {
            return res.status(404).json({ status: "Err", message: "Không tìm thấy HomePage để cập nhật" });
        }

        let { banner, sections, carouselImages } = req.body;

        // Parse JSON
        if (typeof banner === 'string') {
            try {
                banner = JSON.parse(banner);
            } catch {
                return res.status(400).json({ status: "Err", message: "banner không đúng định dạng JSON" });
            }
        }

        if (typeof sections === 'string') {
            try {
                sections = JSON.parse(sections);
            } catch {
                return res.status(400).json({ status: "Err", message: "sections không đúng định dạng JSON" });
            }
        }

        if (typeof carouselImages === 'string') {
            try {
                carouselImages = JSON.parse(carouselImages);
            } catch {
                return res.status(400).json({ status: "Err", message: "carouselImages không đúng định dạng JSON" });
            }
        }

        // Xử lý ảnh banner
        if (req.files?.bannerImage?.length === 1) {
            if (homePage.banner?.image) {
                const oldPath = path.join(__dirname, '../../../public', homePage.banner.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            banner = banner || {};
            banner.image = `/uploads/${req.files.bannerImage[0].filename}`;
        } else {
            banner = banner || homePage.banner;
        }

        // Xử lý sectionImages
        if (req.files?.sectionImages) {
            req.files.sectionImages.forEach((file, idx) => {
                const oldImg = homePage.sections?.[idx]?.imageUrl;
                if (oldImg) {
                    const oldPath = path.join(__dirname, '../../../public', oldImg);
                    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                }

                if (sections[idx]) {
                    sections[idx].imageUrl = `/uploads/${file.filename}`;
                }
            });
        } else {
            sections = sections || homePage.sections;
        }

        // Xử lý carouselImages
        if (req.files?.carouselImages) {
            if (Array.isArray(homePage.carouselImages)) {
                homePage.carouselImages.forEach(img => {
                    const imgPath = path.join(__dirname, '../../../public', img);
                    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
                });
            }
            carouselImages = req.files.carouselImages.map(f => `/uploads/${f.filename}`);
        } else {
            carouselImages = carouselImages || homePage.carouselImages;
        }

        const data = { banner, sections, carouselImages };
        const response = await homePageService.updateHomePage(homePage._id, data);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};

const deleteHomePage = async (req, res) => {
    try {
        const current = await homePageService.getRawHomePage();
        if (!current) {
            return res.status(404).json({ status: "Err", message: "Không tìm thấy HomePage để xóa" });
        }

        // Xóa ảnh
        if (current.banner?.image) {
            const bannerPath = path.join(__dirname, '../../../public', current.banner.image);
            if (fs.existsSync(bannerPath)) fs.unlinkSync(bannerPath);
        }

        current.sections?.forEach(sec => {
            if (sec.imageUrl) {
                const pathSec = path.join(__dirname, '../../../public', sec.imageUrl);
                if (fs.existsSync(pathSec)) fs.unlinkSync(pathSec);
            }
        });

        current.carouselImages?.forEach(img => {
            const pathImg = path.join(__dirname, '../../../public', img);
            if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
        });

        const response = await homePageService.deleteHomePage(current._id);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

const getHomePage = async (req, res) => {
    try {
        const response = await homePageService.getHomePage();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

module.exports = {
    createHomePage,
    updateHomePage,
    deleteHomePage,
    getHomePage
};

