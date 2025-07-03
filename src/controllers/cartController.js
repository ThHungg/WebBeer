const { create } = require('../models/Cart')
const cartService = require('../services/cartService')

const createCart = async (req, res) => {
    try {
        const { userId, products } = req.body;
        if (!userId || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng nhập đầy đủ thông tin"
            });
        }

        // for (const item of products) {
        //     if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        //         return res.status(400).json({
        //             status: "Err",
        //             message: "Số lượng phải lớn hơn 0 và là số hợp lệ"
        //         });
        //     }
        //     if (!item.productId || !item.price) {
        //         return res.status(400).json({
        //             status: "Err",
        //             message: "Mỗi sản phẩm phải có productId và price"
        //         });
        //     }
        // }

        const response = await cartService.createCart({ userId, products });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        });
    }
}


const getCart = async (req, res) => {
    try {
        const userId = req.params.userId
        if (!userId) {
            return res.status(400).json({
                status: "Err",
                message: "Không tìm thấy người dùng"
            })
        }
        const response = await cartService.getCart(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        })
    }
}

const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body
        if (!userId || !productId) {
            return res.status(400).json({
                status: "Err",
                message: "Không nhận được userId và productId"
            })
        }
        const response = await cartService.removeItem(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống vui lòng thử lại sau"
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                status: "Err",
                message: "Vui lòng cung cấp đầy đủ userId, productId và quantity hợp lệ (>=0)"
            });
        }
        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).json({
                status: "Err",
                message: "Số lượng phải lớn hơn 0"
            });
        }

        const response = await cartService.updateCart({ userId, productId, quantity });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: "Err",
            message: "Lỗi hệ thống, vui lòng thử lại sau"
        });
    }
};

module.exports = {
    createCart,
    getCart,
    removeItem,
    updateCart
}