// const HomePage = require('../../models/HomePage');

// const createOrUpdateHomePage = async (data) => {
//     try {
//         const homePage = await HomePage.findOne();
//         if (homePage) {
//             homePage.banner = data.banner;
//             homePage.sections = data.sections;
//             homePage.carouselImages = data.carouselImages;
//             const updated = await homePage.save();
//             return { status: "Ok", message: "Cập nhật thành công", data: updated };
//         } else {
//             const newHomePage = new HomePage(data);
//             const saved = await newHomePage.save();
//             return { status: "Ok", message: "Tạo mới thành công", data: saved };
//         }
//     } catch (error) {
//         throw error;
//     }
// };

// const getHomePage = async () => {
//     try {
//         const homePage = await HomePage.findOne();
//         return { status: "Ok", message: "Lấy thông tin thành công", data: homePage };
//     } catch (error) {
//         throw error;
//     }
// };

// const deleteFile = (filePath) => {
//     const fullPath = path.join(__dirname, '../../public', filePath);
//     fs.unlink(fullPath, (err) => {
//         if (err) {
//             console.error('Lỗi xóa file:', fullPath, err.message);
//         } else {
//             console.log('Đã xóa file:', fullPath);
//         }
//     });
// };
// const deleteHomePage = async () => {
//     try {
//         const homePage = await HomePage.findOne();
//         if (!homePage) {
//             return { status: "Err", message: "Không tìm thấy HomePage để xóa" };
//         }

//         // Xóa ảnh banner nếu có
//         if (homePage.banner?.image) {
//             deleteFile(homePage.banner.image);
//         }

//         // Xóa ảnh trong từng section nếu có
//         if (homePage.sections && homePage.sections.length > 0) {
//             homePage.sections.forEach(section => {
//                 if (section.imageUrl) {
//                     deleteFile(section.imageUrl);
//                 }
//             });
//         }

//         // Xóa carousel images nếu có
//         if (homePage.carouselImages && homePage.carouselImages.length > 0) {
//             homePage.carouselImages.forEach(imgPath => {
//                 deleteFile(imgPath);
//             });
//         }

//         // Xóa document HomePage trong db
//         await HomePage.deleteOne({ _id: homePage._id });
//         return { status: "Ok", message: "Xóa HomePage thành công" };
//     } catch (error) {
//         throw error;
//     }
// };
// module.exports = {
//     createOrUpdateHomePage,
//     getHomePage,
//     deleteHomePage,
// };


const HomePage = require('../../models/HomePage');

const createHomePage = async (data) => {
    try {
        const existed = await HomePage.findOne();
        if (existed) {
            return { status: "Err", message: "Trang chủ đã tồn tại. Vui lòng dùng chức năng cập nhật." };
        }
        const created = await new HomePage(data).save();
        return { status: "Ok", message: "Tạo trang chủ thành công", data: created };
    } catch (e) {
        throw e;
    }
};

const updateHomePage = async (id, data) => {
    try {
        const updated = await HomePage.findByIdAndUpdate(id, data, { new: true });
        if (!updated) return { status: "Err", message: "Không tìm thấy để cập nhật" };
        return { status: "Ok", message: "Cập nhật thành công", data: updated };
    } catch (e) {
        throw e;
    }
};

const deleteHomePage = async (id) => {
    try {
        const deleted = await HomePage.findByIdAndDelete(id);
        if (!deleted) return { status: "Err", message: "Không tìm thấy để xóa" };
        return { status: "Ok", message: "Xóa thành công" };
    } catch (e) {
        throw e;
    }
};

const getHomePage = async () => {
    try {
        const homePage = await HomePage.findOne();
        return { status: "Ok", message: "Lấy thành công", data: homePage };
    } catch (e) {
        throw e;
    }
};

const getRawHomePage = async () => {
    return HomePage.findOne().exec();
};

module.exports = {
    createHomePage,
    updateHomePage,
    deleteHomePage,
    getHomePage,
    getRawHomePage
};
