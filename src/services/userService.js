import axios from 'axios'

export const axiosJWT = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-in`, data, {
    withCredentials: true
  })
  return res.data
}

export const logoutUser = async () => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/log-out`)
  return res.data
}

export const registerUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/createUser`, data)
  return res.data
}

export const updateUser = async (id, data) => {
  const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/updateUser/${id}`, data)
  return res.data
}


export const getDetailUser = async (id) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/user/getDetailUser/${id}`)
  return res.data
}

export const getAllUser = async () => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_API_URL}/user/getAllUser`);
  return res.data;
};
export const refreshToken = async () => {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/refresh_token`, {}, {
    withCredentials: true,
  });
  return res.data;
};

