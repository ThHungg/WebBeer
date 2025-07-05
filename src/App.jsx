import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import { useEffect } from "react";
import { isJsonString } from "./utils/isJsonString";
import { jwtDecode } from "jwt-decode";
import * as userServices from "./services/userService";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  userServices.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await userServices.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id) => {
    const res = await userServices.getDetailUser(id);
    dispatch(updateUser({ ...res?.data }));
  };

  useEffect(() => {
    const { decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
