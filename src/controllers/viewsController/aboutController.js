const aboutService = require('../../services/viewsService/aboutService')

const fs = require('fs');
const path = require('path');   

const createAbout = async (req, res) => {
    try {
        let { banner, description, carouselImages, estDate } = req.body;

        // Parse banner JSON nếu banner là chuỗi
        if (typeof banner === "string") {
            try {
                banner = JSON.parse(banner);
            } catch {
                return res.status(400).json({ status: "Err", message: "Banner không đúng định dạng JSON" });
            }
        }

        if (!req.files?.bannerImage || req.files.bannerImage.length !== 1) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng tải lên đúng 1 ảnh banner"
            });
        }

        // Xử lý file upload
        if (req.files) {
            const bannerFiles = req.files['bannerImage'];
            if (bannerFiles && bannerFiles.length > 0) {
                banner = banner || {};
                banner.image = `/uploads/${bannerFiles[0].filename}`;
            }

            const carouselFiles = req.files['carouselImages'];
            if (carouselFiles && carouselFiles.length > 0) {
                carouselImages = carouselFiles.map(f => `/uploads/${f.filename}`);
            }
        }

        if (!banner || !banner.image) {
            return res.status(400).json({ status: "Err", message: "Vui lòng tải lên ảnh banner" });
        }

        if (!carouselImages || carouselImages.length === 0) {
            return res.status(400).json({ status: "Err", message: "Vui lòng tải lên ít nhất một ảnh carousel" });
        }

        const aboutData = { banner, description, carouselImages, estDate };
        const response = await aboutService.createAbout(aboutData);

        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Lỗi hệ thống, vui lòng thử lại sau!' });
    }
};


const updateAbout = async (req, res) => {
    try {
        const aboutId = req.params.id;
        let { banner, description, carouselImages, estDate } = req.body;

        if (!aboutId) {
            return res.status(400).json({ status: "Err", message: "Thiếu ID About" });
        }

        const currentAbout = await aboutService.getAboutById(aboutId);
        if (!currentAbout) {
            return res.status(404).json({ status: "Err", message: "Không tìm thấy About" });
        }

        if (typeof banner === "string") {
            try {
                banner = JSON.parse(banner);
            } catch {
                return res.status(400).json({ status: "Err", message: "Banner không đúng định dạng JSON" });
            }
        }

        // Xử lý ảnh banner mới
        if (req.files?.bannerImage && req.files.bannerImage.length === 1) {
            if (currentAbout.banner?.image) {
                const oldBannerPath = path.join(__dirname, '../../../public', currentAbout.banner.image);
                if (fs.existsSync(oldBannerPath)) {
                    fs.unlinkSync(oldBannerPath);
                }
            }
            banner = banner || {};
            banner.image = `/uploads/${req.files.bannerImage[0].filename}`;
        } else {
            banner = banner || currentAbout.banner;
        }

        // Xử lý ảnh carousel mới
        if (req.files?.carouselImages && req.files.carouselImages.length > 0) {
            if (Array.isArray(currentAbout.carouselImages)) {
                currentAbout.carouselImages.forEach(imgPath => {
                    const fullPath = path.join(__dirname, '../../../public', imgPath);
                    if (fs.existsSync(fullPath)) {
                        fs.unlinkSync(fullPath);
                    }
                });
            }
            carouselImages = req.files.carouselImages.map(f => `/uploads/${f.filename}`);
        } else {
            carouselImages = carouselImages || currentAbout.carouselImages;
        }

        const updateData = {
            banner,
            description: description || currentAbout.description,
            carouselImages,
            estDate: estDate || currentAbout.estDate,
        };

        const response = await aboutService.updateAbout(aboutId, updateData);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};

const deleteAbout = async (req, res) => {
    try {
        const aboutId = req.params.id;
        if (!aboutId) {
            return res.status(400).json({ status: "Err", message: "Thiếu ID About" });
        }

        const about = await aboutService.getAboutById(aboutId);
        if (!about) {
            return res.status(404).json({ status: "Err", message: "Không tìm thấy About" });
        }

        // Xóa ảnh banner
        if (about.banner?.image) {
            const bannerPath = path.join(__dirname, '../../../public', about.banner.image);
            if (fs.existsSync(bannerPath)) {
                fs.unlinkSync(bannerPath);
            }
        }

        // Xóa ảnh carousel
        if (Array.isArray(about.carouselImages)) {
            about.carouselImages.forEach(imgPath => {
                const fullPath = path.join(__dirname, '../../../public', imgPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            });
        }

        const response = await aboutService.deleteAbout(aboutId);
        return res.status(200).json(response);

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại sau!" });
    }
};


const getAbout = async (req, res) => {
    try {
        const response = await aboutService.getAbout()
        return res.status(200).json(response)
    } catch (e) {

    }
}

module.exports = {
    createAbout,
    getAbout,
    updateAbout,
    deleteAbout
}