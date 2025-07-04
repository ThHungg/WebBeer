// src/components/LoginForm.jsx
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutation";
import * as userServices from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
  });

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mutation = useMutationHooks((data) => userServices.loginUser(data), {
    onSuccess: (data) => {
      if (data.status === "Ok") {
        toast.success(data.message);
        navigate("/");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        const access_token = localStorage.getItem("access_token");
        const token = JSON.parse(access_token);
        const decoded = jwtDecode(token);
        setRole(decoded?.role);
        if (decoded?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        dispatch(
          updateUser({
            email: formData.email,
            passWord: formData.passWord,
          })
        );
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau";
      toast.error(message);
      console.error(error);
    },
  });

  const handleLogin = () => {
    mutation.mutate({
      email: formData.email,
      passWord: formData.passWord,
    });
  };

  return (
    <div className="w-2/3">
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">Email</h3>
        <input
          type="text"
          name="email"
          style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
          className="w-full h-[44px] mt-[8px] bg-white py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.email}
          onChange={handleOnChange}
        />
      </div>

      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">Password</h3>
        <div className="relative mt-[8px]">
          <input
            type={showPass ? "text" : "password"}
            name="passWord"
            style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
            className="w-full h-[44px] pr-10 bg-white py-[10px] px-[12px] border border-gray-300 focus:outline-none"
            value={formData.passWord}
            onChange={handleOnChange}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Icon
              icon={
                showPass
                  ? "fluent:eye-show-12-filled"
                  : "fluent:eye-off-32-filled"
              }
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-[16px] h-[18px] pt-[2px] rounded-2xl border border-amber-500 focus:outline-none"
          />
          <p className="font-inter text-[14px] ml-2">Lưu đăng nhập</p>
        </div>
        <button
          className="bg-[#231F20] text-xl text-white px-[30px] py-[12px]"
          onClick={() => handleLogin()}
        >
          Đăng nhập
        </button>
        <p className="underline text-base">Bạn quên mật khẩu?</p>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LoginForm;
