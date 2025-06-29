const User = require('../models/User')
const bcrypt = require('bcryptjs')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, passWord, phone } = newUser
        try {
            const checkUser = await User.findOne({ email })
            if (checkUser) {
                return resolve({
                    status: "Err",
                    message: "Email đã tồn tại"
                })
            }
            const hash = bcrypt.hashSync(passWord, 10)

            const createUser = await User.create({
                name, email, passWord: hash, phone
            })

            if (createUser) {
                resolve({
                    status: "Ok",
                    message: "Tạo tài khoản thành công",
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}