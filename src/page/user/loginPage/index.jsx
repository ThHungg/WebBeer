import { useState } from "react";
import { memo } from "react";
import RegisterForm from "../../../component/Register";
import LoginForm from "../../../component/Login";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // true = login, false = register

  return (
    <div className="sm:px-10 md:px-16 lg:px-16 xl:px-18 pt-3 mt-10">
      <div className="flex gap-2 relative w-fit">
        <h1
          onClick={() => setIsLogin(true)}
          className={`font-avant font-light text-3xl cursor-pointer ${
            isLogin ? "text-black" : "text-gray-400"
          }`}
        >
          Đăng nhập
        </h1>
        <h1 className="text-4xl font-light font-avant text-gray-400">/</h1>
        <h1
          onClick={() => setIsLogin(false)}
          className={`font-avant font-light text-3xl cursor-pointer ${
            !isLogin ? "text-black" : "text-gray-400"
          }`}
        >
          Đăng ký
        </h1>
        <div
          className={`absolute bottom-[-6px] h-[1.5px] bg-[#231F20] transition-all duration-300 ${
            isLogin ? "left-0 w-[130px]" : "left-[170px] w-[100px]"
          }`}
        />
      </div>
      <div className="flex justify-between gap-3">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="w-2/3">
          <img
            src="http://tranhtuongsaigongiare.com/Upload_Files/tranh%20phong%20canh%20thien%20nhien%2030.jpg"
            className="w-full rounded-tl-[500px] rounded-bl-[100px] object-cover"
            alt="Ảnh nền"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
