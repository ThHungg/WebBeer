const Product = require('../models/Product')
const { deleteImg } = require('./cloudinaryService')
const { getPublicIdFromUrl } = require('../utils/cloudinaryUtils')

const createProduct = (newProduct, imgUrls = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ name: newProduct.name })
            if (checkProduct) {
                return resolve({
                    status: "Err",
                    message: "Sản phẩm đã tồn tại"
                })
            }
            const product = await Product.create(newProduct)
            resolve({
                status: "Ok",
                message: "Tạo sản phẩm mới thành công",
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateProductImage = async (productId, imageUrls) => {
    try {
        await Product.findByIdAndUpdate(productId, { image: imageUrls })
        console.log('Cập nhật ảnh thành công!');
    } catch (e) {
        throw e
    }
}

const deleteProduct = async (productId) => {
    try {
        const product = await Product.findById(productId)

        await Product.findByIdAndDelete(productId)

        if (product.image && product.image.length > 0) {
            product.image.forEach(imageUrl => {
                const publicId = getPublicIdFromUrl(imageUrl)
                deleteImg(publicId).catch(console.error)
            })
        }

        return {
            status: "Ok",
            message: "Xóa sản phẩm thành công"
        }
    } catch (e) {
        throw e
    }
}

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find()
            resolve({
                status: "Ok",
                message: "Lấy danh sách sản phẩm thành công",
                data: allProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const detailProduct = await Product.findById(productId)
            resolve({
                status: "Ok",
                message: "Lấy thông tin sản phẩm thành công",
                data: detailProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    deleteProduct,
    getAllProduct,
    getDetailProduct,
    updateProductImage
}