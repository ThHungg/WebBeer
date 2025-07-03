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
// export const refreshToken = async () => {
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/refresh_token`, {
//         withCredentials: true,
//     });
//     return res.data;
// };

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/refresh_token`,
      {},
      {
        withCredentials: true, // bắt buộc để gửi cookie
      }
    );
    const { access_token } = res.data; // giả sử server trả access_token ở đây
    if (access_token) {
      localStorage.setItem("access_token", access_token); // lưu token mới vào localStorage
    }
    return access_token;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
};
// src/services/userService.js
        
        // export const getAllUser = async (axiosInstance = axiosJwt) => {
            //     const res = await axiosInstance.get(
                //         `${import.meta.env.VITE_API_URL}/user/getAllUser`,
                //         {
                    //             withCredentials: true, // Gửi cookie refresh token nếu có
                    //         }
                    //     );
                    //     return res.data;
                    // };
                    
                    // export const refreshToken = async () => {
                        //     const res = await axios.post(
                            //         `${import.meta.env.VITE_API_URL}/user/refresh_token`,
                            //         null,
                            //         {
                                //             withCredentials: true,
                                //         }
                                //     );
                                //     return res.data;
                                // };
                                
                                // }
                                
                                // export const getAllUser = async (axiosInstance) => {
                                //     const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/user/getAllUser`);
                                //     return res.data;
                                // };
