const About = require('../../models/About')

const createAbout = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const aboutPage = await About.findOne()
            if (aboutPage) {
                aboutPage.banner = data.banner
                aboutPage.description = data.description
                aboutPage.carouselImages = data.carouselImages
                aboutPage.estDate = data.estDate
                const updated = await aboutPage.save()
                resolve({
                    status: "Ok",
                    message: "Cập nhật thành công",
                    data: updated
                })
            } else {
                const newAbout = new About(data)
                const saved = await newAbout.save()
                resolve({
                    status: "Ok",
                    message: "Tạo mới thành công",
                    data: saved
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAbout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const about = await About.find()
            resolve({
                status: "Ok",
                message: "Lấy thông tin about thành công",
                data: about
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAboutById = async (id) => {
    return About.findById(id).exec();
};

const updateAbout = async (id, updateData) => {
    try {
        const updated = await About.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) {
            return { status: "Err", message: "Không tìm thấy About để cập nhật" };
        }
        return { status: "Ok", message: "Cập nhật About thành công", data: updated };
    } catch (error) {
        throw error;
    }
};

const deleteAbout = async (id) => {
    try {
        const deleted = await About.findByIdAndDelete(id);
        if (!deleted) {
            return { status: "Err", message: "Không tìm thấy About để xóa" };
        }
        return { status: "Ok", message: "Xóa About thành công" };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createAbout,
    getAbout,
    getAboutById,
    updateAbout,
    deleteAbout,
}