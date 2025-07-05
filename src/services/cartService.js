import axios from "axios";

export const createCart = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/cart/createCart`, data)
    return res.data
}

export const getCart = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/getCart/${id}`)
    return res.data
}

export const updateCart = async (id, productId, quantity) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/cart/updateCart`, {
        id, productId, quantity
    })
    return res.data
}

export const removeItemCart = async (id, productId) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
        data: {
            id,
            productId,
        },
    });
    return res.data;
};
