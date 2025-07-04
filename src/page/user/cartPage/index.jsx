import { memo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Quantity from "../../../component/Quantity";

const CartPage = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "Bia Saigon Special",
      price: 18000,
      quantity: 6,
      image:
        "https://media.thuonghieucongluan.vn/uploads/2024/02/06/4-1707200352.jpg",
      volume: "330ml",
      abv: "4.9%",
      type: "Lager",
    },
    {
      id: 2,
      name: "Heineken Premium",
      price: 25000,
      quantity: 4,
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltadve76v2kkff",
      volume: "330ml",
      abv: "5.0%",
      type: "Premium Lager",
    },
    {
      id: 3,
      name: "Tiger Crystal",
      price: 22000,
      quantity: 2,
      image:
        "https://vn-live-01.slatic.net/p/f04c590e5683e586aa791c96c556e53b.jpg",
      volume: "330ml",
      abv: "5.0%",
      type: "Crystal Lager",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 300000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return (
    <>
      <div className="bg-gradient-to-r from-[#F6F6F6] to-[#ece8dd] py-10 px-10 text-center rounded-md">
        <h2 className="uppercase text-[#302006] font-bold text-3xl tracking-wider">
          Our Wines
        </h2>
        <p className="text-[#302006] text-lg mt-4 max-w-2xl mx-auto">
          Explore our wine store and discover your favourite drops of Fowles
          wine!
        </p>
      </div>

      <div className="container lg:max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* DANH SÁCH SẢN PHẨM */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border">
              <div className="p-6 border-b">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-[#302006]">
                  <ShoppingCart className="w-5 h-5" />
                  Sản phẩm trong giỏ hàng ({cartItems.length})
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="grid grid-cols-[96px_1fr] gap-4 p-4 rounded-lg border bg-gray-50/70">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md border hover:scale-105 transition-transform"
                      />
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                          <span>Dung tích: {item.volume}</span>
                          <span>Độ cồn: {item.abv}</span>
                          <span>Loại: {item.type}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">
                            Số lượng:
                          </span>
                          <Quantity />
                        </div>
                        <div className="text-sm text-gray-600">
                          Đơn giá: {item.price.toLocaleString("vi-VN")} ₫
                        </div>
                        <div className="text-base font-semibold text-[#302006]">
                          Thành tiền:{" "}
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <hr className="my-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TỔNG KẾT ĐƠN HÀNG */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border sticky top-24">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-[#302006]">
                  Tổng kết đơn hàng
                </h2>
              </div>
              <div className="p-6 space-y-4">
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
                    <span>{subtotal.toLocaleString("vi-VN")} ₫</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{shippingFee === 0 ? "Miễn phí" : "30.000 ₫"}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-[#302006]">
                      {total.toLocaleString("vi-VN")} ₫
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
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CartPage);
