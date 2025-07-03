import { memo, useState } from "react";
import { useMutationHooks } from "../../hooks/useMutation";
import * as userServices from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passWord: "",
    confirmPass: "",
    phone: "",
  });

  const mutation = useMutationHooks((data) => userServices.registerUser(data), {
    onSuccess: (data) => {
      if (data.status === "Ok") {
        toast.success(data.message);
        setTimeout(() => {
          window.location.reload();
        }, [2000]);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      const errMsg =
        error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại";
      toast.error(errMsg);
    },
  });

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <form className="w-2/3" onSubmit={handleRegister}>
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">Họ tên</h3>
        <input
          type="text"
          name="name"
          className="w-full h-[44px] mt-[8px] py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.name}
          onChange={handleOnChange}
          required
        />
      </div>
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">Email</h3>
        <input
          type="email"
          name="email"
          className="w-full h-[44px] mt-[8px] py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.email}
          onChange={handleOnChange}
          required
        />
      </div>
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">
          Số điện thoại
        </h3>
        <input
          type="tel"
          name="phone"
          pattern="[0-9]*"
          inputMode="numeric"
          className="w-full h-[44px] mt-[8px] py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.phone}
          onChange={handleOnChange}
          required
        />
      </div>
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">Mật khẩu</h3>
        <input
          type="password"
          name="passWord"
          className="w-full h-[44px] mt-[8px] py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.passWord}
          onChange={handleOnChange}
          required
        />
      </div>
      <div>
        <h3 className="font-avant font-light text-[20px] mt-5">
          Xác nhận mật khẩu
        </h3>
        <input
          type="password"
          name="confirmPass"
          className="w-full h-[44px] mt-[8px] py-[10px] px-[12px] border border-gray-300 focus:outline-none"
          value={formData.confirmPass}
          onChange={handleOnChange}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-5 bg-[#231F20] text-xl text-white px-[30px] py-[12px]"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Đang gửi..." : "Đăng ký"}
      </button>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default memo(RegisterForm);
