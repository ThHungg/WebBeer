import axios from "axios";

export const getHomePage = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/viewHome/getHome`)
    return res.data
}