const userService = require('../services/userService')

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
        return res.status(404).json({
            message: "Lỗi hệ thống vui lòng thử lại sau!"
        })
    }
}

module.exports = {
    createUser
}