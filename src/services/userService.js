const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService')
const nodemailer = require('nodemailer')
const otpStore = new Map()

const OTP_EXPIRE_TIME = 5 * 60 * 1000;

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

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { account, passWord } = userLogin;
        try {
            const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const isCheckEmail = reg.test(account)
            let user;
            if (isCheckEmail) {
                user = await User.findOne({ email: account })
            } else {
                user = await User.findOne({ phone: account })
            }
            if (!user) {
                return resolve({
                    status: "Err",
                    message: "Tài khoản không tồn tại"
                })
            }

            const comparePass = bcrypt.compareSync(passWord, user.passWord)
            if (!comparePass) {
                return resolve({
                    status: "Err",
                    message: "Mật khẩu không đúng!"
                })
            }

            const access_token = await genneralAccessToken({
                id: user.id,
                role: user.role
            })
            const refresh_token = await genneralRefreshToken({
                id: user.id,
                role: user.role
            })
            console.log("refresh_token: ", refresh_token)
            resolve({
                status: "Ok",
                message: "Đăng nhập thành công",
                access_token,
                refresh_token,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (userId, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(userId)
            if (!checkUser) {
                return resolve({
                    status: "Err",
                    message: "Người dùng không xác định"
                })
            }

            if (updateData.passWord) {
                updateData.passWord = bcrypt.hashSync(updateData.passWord, 10)
            }

            const update = await User.findByIdAndUpdate(userId, updateData, { new: true })
            resolve({
                status: "Ok",
                message: "Cập nhật thành công",
                data: update
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: "Ok",
                message: "lấy danh sách tài khoản thành công",
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(userId)
            resolve({
                status: "Ok",
                message: "Sucess",
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

const sendOtp = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ email })
            if (!user) {
                return resolve({
                    status: "Err",
                    message: "Email không tồn tại!",
                });
            }
            const now = Date.now()

            const otp = Math.floor(100000 + Math.random() * 900000)
            otpStore.set(email, otp)
            otpStore.set(`${email}_timestamp`, now)

            setTimeout(() => {
                otpStore.delete(email)
                otpStore.delete(`${email}_timestamp`)
            }, OTP_EXPIRE_TIME)

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            })
            await transporter.sendMail({
                from: "dth052k4@gmail.com",
                to: email,
                subject: "OTP xác thực",
                text: `Mã OTP của bạn là: ${otp}. Mã có hiệu lực trong 5 phút`
            })

            resolve({
                status: "Ok",
                message: "OTP đã được gửi qua mail của bạn"
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUser,
    getDetailUser,
    sendOtp
}