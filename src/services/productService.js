import axios from "axios";

export const getAllProduct = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getAllProduct`)
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/getDetailProduct/${id}`)
    return res.data
}