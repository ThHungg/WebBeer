import { memo, useEffect, useState, useRef } from "react";
import Footer from "../footer";
import Header from "../header";
import { Icon } from "@iconify/react";
import "../../../../assets/styte/front.css";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";

const MasterLayout = ({ children, ...props }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false); // ẩn khi cuộn xuống
      } else {
        setShowHeader(true); // hiện khi cuộn lên
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div {...props}>
        {/* HEADER */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            transition: "transform 0.3s ease",
            transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[1001]"
            onClick={() => setIsCartOpen(false)}
          ></div>
        )}
        <div
          className={`fixed top-0 right-0 h-screen w-3/5 lg:w-1/5 bg-white z-[1002] shadow-lg
    transform transition-transform duration-500 ease-in-out
    ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Giỏ hàng</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-2xl text-gray-600"
              >
                <Icon icon="mdi:close" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <p className="text-sm">Không có sản phẩm nào trong giỏ.</p>
              <Link to={ROUTERS.USER.CART}>
                <p>View Cart</p>
              </Link>
            </div>
          </div>
        </div>
        {/* NỘI DUNG TRANG */}
        <main style={{ marginTop: "100px" }}>{children}</main>
        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
};

export default memo(MasterLayout);
