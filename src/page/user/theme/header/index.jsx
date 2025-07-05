import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getUserRole } from "../../../../utils/getUserRole";

const Header = ({ isCartOpen, setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menus = [
    {
      name: "Trang chủ",
      path: ROUTERS.USER.HOME,
    },
    {
      name: "Sản phẩm",
      path: ROUTERS.USER.PRODUCTPAGE,
    },
    {
      name: "News & Events",
      path: ROUTERS.USER.NEWS,
    },
    {
      name: "Contact",
      path: ROUTERS.USER.CONTACTPAGE,
    },
    {
      name: "Về chúng tôi",
      path: ROUTERS.USER.ABOUTPAGE,
    },
  ];

  const role = getUserRole();
  return (
    <>
      <div className="sm:px-10 md:px-16 lg:px-16 xl:px-18 px-5 mb-3 bg-white">
        <div className="relative flex justify-center lg:justify-between items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute left-0 text-3xl text-black "
          >
            <Icon icon="mdi:menu" />
          </button>
          <Link to={ROUTERS.USER.HOME}>
            <img
              src="https://img.ws.mms.shopee.vn/vn-11134004-7r98o-lpp0zz7jc52x81"
              alt=""
              className="w-[180px] h-[100px] object-contain"
            />
          </Link>
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
            {menus.map((menu, idx) => (
              <Link to={menu.path} key={idx}>
                <li>{menu.name}</li>
              </Link>
            ))}
            {/* <Link to={ROUTERS.USER.HOME}>
              <li>
                <a href="">Trang chủ</a>
              </li>
            </Link>
            <li>
              <a href="/product">Sản phẩm</a>
            </li>
            <li>
              <a href="/news">News &amp; Events</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li> */}
            <div className="flex items-center gap-2">
              {/* <Link to={ROUTERS.USER.CART}> */}
              <button
                className="px-[16px] py-[10px] text-white"
                onClick={() => setIsCartOpen(true)}
              >
                <Icon
                  icon="dashicons:cart"
                  className="text-[#302006] text-4xl"
                />
              </button>
              {/* </Link> */}
              {role ? (
                <Link to={ROUTERS.USER.PROFILE}>
                  <button
                    className="px-[16px] py-[10px]"
                    // onClick={handleLogout}
                  >
                    <Icon
                      icon="whh:profile"
                      className="text-[#302006] text-3xl"
                    />
                  </button>
                </Link>
              ) : (
                <Link to={ROUTERS.USER.LOGINPAGE}>
                  <button className="px-[16px] py-[10px] rounded-[5px] bg-[#302006] text-white">
                    Đăng nhập
                  </button>
                </Link>
              )}
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
    }
    h-screen`}
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
              <a href="/news">News &amp; Events</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
