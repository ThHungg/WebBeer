import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = ({ isCartOpen, setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <div className="sm:px-10 md:px-16 lg:px-16 xl:px-18 pt-3 bg-white">
        <div className="relative flex justify-center lg:justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute left-0 text-3xl text-black "
          >
            <Icon icon="mdi:menu" />
          </button>
          <img
            src="https://www.fowleswine.com/wp-content/uploads/2024/08/fowles-logo.png"
            alt=""
            className="w-[180px] h-[80px]"
          />
          <div className="absolute right-0 flex items-center gap-3 lg:hidden">
            <button
              className="text-2xl text-black"
              onClick={() => setIsCartOpen(true)}
            >
              <Icon icon="mdi:cart" className="text-[#302006] text-3xl" />
            </button>
            <Link to={ROUTERS.USER.LOGINPAGE}>
              <button className="text-2xl text-black">
                <Icon icon="mdi:account" className="text-[#302006] text-3xl" />
              </button>
            </Link>
          </div>
          <ul className="hidden lg:flex gap-10 items-center">
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/product">Sản phẩm</a>
            </li>
            <li>
              <a href="">News &amp; Events</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <div className="flex gap-2">
              <button
                className="px-[16px] py-[10px] bg-[#302006] text-white"
                onClick={() => setIsCartOpen(true)}
              >
                Cart
              </button>
              <Link to={ROUTERS.USER.LOGINPAGE}>
                <button className="px-[16px] py-[10px] bg-[#302006] text-white">
                  Đăng nhập
                </button>
              </Link>
            </div>
          </ul>
        </div>

        {/* Menu mobile */}
        <div
          className={`fixed inset-0 z-50 p-6 lg:hidden
            bg-[rgba(64,42,24,0.9)] backdrop-blur-sm
            transition-transform duration-300 ease-in-out
            ${
              isOpen
                ? "translate-x-0 opacity-100 pointer-events-auto"
                : "-translate-x-full opacity-0 pointer-events-none"
            }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-3xl text-white"
          >
            <Icon icon="mdi:close" />
            <p className="text-xs">Close</p>
          </button>

          <ul className="flex flex-col gap-6 mt-16 text-lg font-medium text-white">
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="">Sản phẩm</a>
            </li>
            <li>
              <a href="">News &amp; Events</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
