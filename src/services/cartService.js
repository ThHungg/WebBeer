const Cart = require('../models/Cart')
const Product = require('../models/Product')

const createCart = async ({ userId, products }) => {
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [], totalPrice: 0 });
        }

        for (const item of products) {
            const { productId, quantity, price } = item;

            const product = await Product.findById(productId);
            if (!product) {
                return {
                    status: "Err",
                    message: `Không tìm thấy sản phẩm với id: ${productId}`
                };
            }

            const existingItem = cart.products.find(p => p.productId.equals(productId));
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity, price });
            }
        }

        cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();

        return {
            status: "OK",
            message: "Thêm vào giỏ hàng thành công",
            data: cart
        };
    } catch (e) {
        throw e;
    }
}

const getCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId }).populate({ path: 'products.productId', select: 'name image' })
            resolve({
                status: "OK",
                message: "Lấy danh sách giỏ hàng thành công",
                data: cart
            })
        } catch (e) {
            reject(e)
        }
    })
}

const removeItem = (cartInfo) => {
    return new Promise(async (resolve, reject) => {
        const { userId, productId } = cartInfo
        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return reject({
                    status: 'Err',
                    message: "Giỏ hàng không tồn tại"
                });
            }
            const updatedProducts = cart.products.filter(item => item.productId.toString() !== productId);
            if (updatedProducts.length === cart.products.length) {
                return reject({
                    status: "Err",
                    message: "Sản phẩm không có trong giỏ hàng"
                });
            }
            cart.products = updatedProducts;

            cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

            await cart.save();
            resolve({
                status: "OK",
                message: "Xóa sản phẩm",
                data: cart
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateCart = ({ userId, productId, quantity }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return resolve({
                    status: "Err",
                    message: "Giỏ hàng không tồn tại"
                })
            }

            const item = cart.products.find(p => p.productId.equals(productId));
            if (!item) {
                return resolve({
                    status: "Err",
                    message: "Sản phẩm không có trong giỏ hàng"
                })
            }

            if (quantity === 0) {
                cart.products = cart.products.filter(p => !p.productId.equals(productId));
            } else {
                item.quantity = quantity;
            }

            cart.totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

            await cart.save();

            return resolve({
                status: "OK",
                message: "Cập nhật giỏ hàng thành công",
                data: cart
            })
        } catch (e) {
            reject(e)
        }
    })
};

module.exports = {
    createCart,
    getCart,
    removeItem,
    updateCart
}