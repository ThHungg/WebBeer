import axios from "axios";

export const sendContact = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/contact/sendContact`, data)
    return res.data
}