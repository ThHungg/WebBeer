import axios from 'axios'

const axiosJwt = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`, data, {
        withCredentials: true
    })
    return res.data
}

export const registerUser = async (data) => {
    console.log(data)
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/createUser`, data)
    return res.data
}


export const getDetailUser = async (id) => {
    const res = await axiosJwt.get(`${import.meta.env.VITE_API_URL}/user/getDetailUser/${id}`)
    return res.data
}

export const getAllUser = async () => {
    const res = await axiosJwt.get(`${import.meta.env.VITE_API_URL}/user/getAllUser`);
    return res.data;
};
export const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/refresh_token`, {
        withCredentials: true,
    });
    return res.data;
};

