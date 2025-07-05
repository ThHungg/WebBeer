const Product = require('../models/Product')

const createProduct = (newProduct) => {
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

const updateProduct = (productId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(productId)
            if (!checkProduct) {
                return resolve({
                    status: "Err",
                    message: 'Sản phẩm không xác định'
                })
            }
            if (data.priceType === 'contact') {
                data.price = null
            }

            if (data.priceType === 'fixed') {
                if (data.price === null || isNaN(data.price)) {
                    return resolve({
                        status: "Err",
                        message: "Phải nhập giá hợp lệ khi priceType là fixed"
                    })
                }
            }

            if (!data.priceType || !['fixed', 'contact'].includes(data.priceType)) {
                return resolve({ status: "Err", message: "Loại giá không hợp lệ" })
            }

            const updateProduct = await Product.findByIdAndUpdate(productId, data, { new: true })
            resolve({
                status: "Ok",
                message: "Cập nhật thành công",
                data: updateProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateProductImage = async (productId, imageUrls) => {
    try {
        await Product.findByIdAndUpdate(productId, { image: imageUrls })
    } catch (e) {
        throw e
    }
}

const deleteProduct = async (productId) => {
    try {
        const product = await Product.findById(productId)

        await Product.findByIdAndDelete(productId)

        // if (product.image && product.image.length > 0) {
        //     product.image.forEach(imageUrl => {
        //         const publicId = getPublicIdFromUrl(imageUrl)
        //         deleteImg(publicId).catch(console.error)
        //     })
        // }

        return {
            status: "Ok",
            message: "Xóa sản phẩm thành công"
        }
    } catch (e) {
        throw e
    }
}

const getAllProduct = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(page, limit)
            const skip = (page - 1) * limit
            const [products, total] = await Promise.all([Product.find().skip(skip).limit(limit),
            Product.countDocuments()
            ])
            // const allProduct = await Product.find()
            resolve({
                status: "Ok",
                message: "Lấy danh sách sản phẩm thành công",
                data: products,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getRandomProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await Product.aggregate([{ $sample: { size: 5 } }])
            resolve({
                status: "Ok",
                message: "Lấy danh sách sản phẩm thành công",
                data: products
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
    updateProductImage,
    updateProduct,
    getRandomProduct
}