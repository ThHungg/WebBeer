import { memo, useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import Quantity from "../../../component/Quantity";
import { getUserId } from "../../../utils/getUserId";
import * as cartService from "../../../services/cartService";
import { useQuery } from "@tanstack/react-query";
import { getFullImageUrl } from "../../../utils/getFullImg";
import formatter from "../../../utils/formatter.js";
import { toast, ToastContainer } from "react-toastify";

const CartPage = () => {
  const id = getUserId();
  const [quantity, setQuantity] = useState({});

  const fetchCart = async () => {
    const res = await cartService.getCart(id);
    return res;
  };
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCart,
  });

  const handleQuantityChange = async (productId, newQuantity) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: Number(newQuantity) || 1,
    }));
    const res = await cartService.updateCart(id, productId, newQuantity);
    refetch();
    return res;
  };

  const handleRemove = async (productId) => {
    try {
      const res = await cartService.removeItemCart(id, productId);
      if (res.status === "Ok") {
        toast.success(res.message);
        refetch();
      } else {
        toast.error(res.message);
      }
      return res;
    } catch (e) {
      const errMsg = e?.response?.data?.message || "Xóa sản phẩm thất bại!";
      toast.error(errMsg);
      return null;
    }
  };

  return (
    <>
      <div className="bg-[#F6F6F6] py-10 px-6 text-left">
        <h2 className="uppercase text-[#302006] font-semibold text-lg md:text-xl">
          Our Wines
        </h2>
        <p className="text-[#302006] mb-6 font-normal mt-5 text-sm md:text-base max-w-xl">
          Explore our wine store and discover your favourite drops of Fowles
          wine!
        </p>
      </div>

      <div className="container w-full mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* DANH SÁCH SẢN PHẨM */}
          <div className="lg:col-span-3 col-span-full">
            <div className="bg-white rounded-lg shadow-lg border p-6">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-[#302006] mb-6">
                <ShoppingCart className="w-5 h-5" />
                Sản phẩm trong giỏ hàng ({cart?.data?.products?.length ?? 0})
              </h2>

              {/* Bảng sản phẩm (hiện trên md+) */}
              <div className="overflow-x-auto hidden md:block">
                <table className="w-full min-w-[650px] border-collapse">
                  <thead>
                    <tr
                      className="border-b-2"
                      style={{ borderColor: "#302006" }}
                    >
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Hình ảnh
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Sản phẩm
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Số lượng
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Đơn Giá
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Thành tiền
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold"
                        style={{ color: "#302006" }}
                      >
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.data?.products?.map((cartItem, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-4 px-4">
                          <div
                            className="w-20 h-20 rounded-lg border-2 bg-gray-200 flex items-center justify-center"
                            style={{ borderColor: "#302006" }}
                          >
                            <img
                              src={getFullImageUrl(cartItem.productId.image[0])}
                              alt={cartItem.productId.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <h3
                            className="font-semibold text-base md:text-lg truncate"
                            style={{ color: "#302006" }}
                            title={cartItem.productId.name}
                          >
                            {cartItem.productId.name}
                          </h3>
                        </td>
                        <td className="py-4 px-4">
                          <Quantity
                            quantity={cartItem.quantity}
                            setQuantity={(newQty) =>
                              handleQuantityChange(
                                cartItem.productId._id,
                                newQty
                              )
                            }
                          />
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="font-semibold text-base md:text-lg"
                            style={{ color: "#302006" }}
                          >
                            {formatter(cartItem.price)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className="font-bold text-base md:text-lg"
                            style={{ color: "#302006" }}
                          >
                            {formatter(cartItem.price * cartItem.quantity)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleRemove(cartItem.productId._id)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {!cart?.data?.products?.length && (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          Giỏ hàng của bạn đang trống.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Danh sách dạng card trên mobile */}
              <div className="md:hidden space-y-4">
                {cart?.data?.products?.map((cartItem, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex gap-4">
                      <div
                        className="w-24 h-24 rounded-lg border-2 bg-gray-200 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: "#302006" }}
                      >
                        <img
                          src={getFullImageUrl(cartItem.productId.image[0])}
                          alt={cartItem.productId.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className="font-semibold text-base"
                            style={{ color: "#302006" }}
                          >
                            {cartItem.productId.name}
                          </h3>
                          <div className="text-gray-500 text-sm mt-1">
                            Đơn giá: {formatter(cartItem.price)}
                          </div>
                          <div className="text-gray-500 text-sm">
                            Thành tiền:{" "}
                            {formatter(cartItem.price * cartItem.quantity)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Quantity
                            quantity={cartItem.quantity}
                            setQuantity={(newQty) =>
                              handleQuantityChange(
                                cartItem.productId._id,
                                newQty
                              )
                            }
                          />
                          <button
                            onClick={() => handleRemove(cartItem.productId._id)}
                            className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                            aria-label="Xóa sản phẩm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!cart?.data?.products?.length && (
                  <div className="text-center text-gray-500 py-10">
                    Giỏ hàng của bạn đang trống.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TỔNG KẾT ĐƠN HÀNG */}
          <div className="lg:col-span-1 col-span-full mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg border     p-6">
              <h2 className="text-xl font-semibold text-[#302006] mb-6">
                Tổng kết đơn hàng
              </h2>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold mb-2">
                    ⚠️ Lưu ý quan trọng
                  </div>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Chỉ bán cho người từ đủ 18 tuổi trở lên</li>
                    <li>
                      • Uống có trách nhiệm, không lái xe khi đã uống rượu bia
                    </li>
                    <li>• Cần xuất trình CMND/CCCD khi nhận hàng</li>
                  </ul>
                </div>

                <div className="space-y-3 text-gray-700 text-base">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatter(cart?.data?.totalPrice || 0)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-[#302006]">
                      {formatter(cart?.data?.totalPrice || 0)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="bg-gray-100 text-center py-2 px-4 rounded text-sm">
                    🚚 Miễn phí vận chuyển cho đơn hàng trên 300.000₫
                  </div>
                  <div className="border text-center py-2 px-4 rounded text-sm">
                    🔒 Thanh toán an toàn & bảo mật
                  </div>
                </div>

                <button className="w-full bg-[#302006] hover:bg-[#46330b] text-white py-3 rounded-lg text-base font-semibold transition duration-300">
                  Chuyển đến thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default memo(CartPage);
