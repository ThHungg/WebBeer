import { Icon } from "@iconify/react/dist/iconify.js";
import { memo, useEffect, useState } from "react";
import * as userService from "../../../services/userService";
import { getUserId } from "../../../utils/getUserId";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState("account");
  const [user, setUser] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const id = getUserId();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userService.getDetailUser(id);
      if (res?.data) {
        setUser(res.data);
      }
    };
    fetchUser();
  }, [id]);

  const handleLogout = async () => {
    localStorage.removeItem("access_token");
    await userService.logoutUser();
    dispatch(resetUser());
    navigate("/");
    window.location.reload();
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "account":
        return (
          <>
            {/* Tiêu đề 2 phần ngang hàng */}
            <div className="flex items-center mb-8 space-x-12">
              <h2 className="text-xl font-semibold">Thông tin tài khoản</h2>
              <h3 className="text-lg font-semibold">Đổi mật khẩu</h3>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-12">
              {/* Cột Thông tin cá nhân */}
              <div className="flex-1 max-w-md space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nhập tên"
                    value={user?.name || ""}
                    onChange={handleUserChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={user?.email || ""}
                    onChange={handleUserChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={user?.phone || ""}
                    onChange={handleUserChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>
              </div>

              {/* Cột Đổi mật khẩu */}
              <div className="flex-1 max-w-md space-y-6 mt-10 md:mt-0">
                <div>
                  <label
                    htmlFor="currentPass"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mật khẩu hiện tại
                  </label>
                  <input
                    id="currentPass"
                    name="currentPass"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    value={passwordData.currentPass}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPass"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    id="newPass"
                    name="newPass"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={passwordData.newPass}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmNewPass"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    id="confirmNewPass"
                    name="confirmNewPass"
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    value={passwordData.confirmNewPass}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#302006] focus:border-[#302006] transition"
                    required
                  />
                </div>
              </div>
            </div>
          </>
        );

      case "orders":
        return (
          <>
            <h2 className="text-xl font-semibold mb-4">Đơn hàng đã đặt</h2>
            <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-20 pt-10 my-10">
      <h1 className="text-2xl font-bold mb-6">
        {selectedTab === "account"
          ? "Thông tin tài khoản"
          : selectedTab === "orders"
          ? "Đơn hàng đã đặt"
          : ""}
      </h1>

      <div className="grid grid-cols-6 gap-10">
        {/* Sidebar */}
        <div className="col-span-1">
          <ul className="flex flex-col space-y-4 bg-white p-4 rounded-xl shadow-md">
            <li
              onClick={() => setSelectedTab("account")}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${
                selectedTab === "account"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-sm">Thông tin tài khoản</span>
              <Icon icon="bxs:user" className="text-lg text-gray-600" />
            </li>
            <li
              onClick={() => setSelectedTab("orders")}
              className={`flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all ${
                selectedTab === "orders"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="text-sm">Đơn hàng đã đặt</span>
              <Icon
                icon="si-glyph:trolley-arrow-down"
                className="text-lg text-gray-600"
              />
            </li>
            <li
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLogout();
              }}
              className="flex justify-between items-center p-2 rounded-lg cursor-pointer transition-all text-red-600 hover:text-red-800"
            >
              <span className="text-sm">Đăng xuất</span>
              <Icon icon="material-symbols:logout" className="text-lg" />
            </li>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="col-span-5 bg-white rounded-xl shadow-md p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default memo(ProfilePage);
