const userService = require('../services/userService')
const jwtService = require('../services/jwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, passWord, confirmPass, phone } = req.body
        const regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
        const regPhone = /^(0|\+84)(\d{9})$/;


        const isCheckEmail = regEmail.test(email)
        const isCheckPass = regPass.test(passWord)
        const isCheckPhone = regPhone.test(phone)

        if (!name || !email || !passWord || !phone) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập email đúng định dạng"
            })
        } else if (!isCheckPass) {
            return res.status(400).json({
                status: "Err",
                message: "Mật khẩu phải có ít nhất 6 ký tự, gồm ít nhất 1 chữ thường, 1 chữ in hoa, 1 số và 1 ký tự đặc biệt."
            })
        } else if (!isCheckPhone) {
            return res.status(400).json({
                status: "Err",
                message: "Số điện thoại không hợp lệ."
            });
        }
        if (passWord !== confirmPass) {
            return res.status(400).json({
                status: "Err",
                message: "Mật khẩu xác nhận không trùng khớp"
            })
        }
        const response = await userService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, passWord } = req.body

        if (!email || !passWord) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            })
        }
        const response = await userService.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'none',
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json({
            status: 'Ok',
            message: 'Đăng xuất thành công'
        });
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const currentUser = req.user
        const updateData = req.body
        console.log(currentUser.id, "ANd", userId)
        if (currentUser.role !== "admin" && currentUser.id !== userId) {
            return res.status(400).json({
                status: "Err",
                message: "Bạn không có quyền chỉnh sửa thông tin của người khác"
            })
        }

        if (currentUser.role !== "admin") {
            delete updateData.role
            delete updateData.email
            delete updateData.passWord
        }
        const response = await userService.updateUser(userId, updateData)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: "Err",
                message: 'Người dùng không xác định'
            })
        }
        const response = await userService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!'
        });
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(400).json({
                status: "Err",
                message: "Không tìm thấy token"
            })
        }
        const response = await jwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!'
        });
    }
}

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập email!"
            })
        }
        const response = await userService.sendOtp(email);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: 'Lỗi hệ thống, vui lòng thử lại sau!'
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUser,
    getDetailUser,
    logoutUser,
    refreshToken,
    sendOtp
}