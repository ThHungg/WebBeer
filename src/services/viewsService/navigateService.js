const Navigate = require('../../models/Navigate')

const createNavigate = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const naviPage = await Navigate.findOne()
            if (naviPage) {
                naviPage.title = data.title
                naviPage.description = data.description
                naviPage.navigate = data.navigate
                const updated = await naviPage.save()
                resolve({
                    status: "Ok",
                    message: "Cập nhật thành công",
                    data: updated
                })
            } else {
                const newNavi = new Navigate(data)
                const saved = await newNavi.save()
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

const getNavigate = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const navi = await Navigate.find()
            resolve({
                status: "Ok",
                message: "Lấy thông tin about thành công",
                data: navi
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNavigate,
    getNavigate
}